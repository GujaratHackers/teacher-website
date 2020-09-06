from django.shortcuts import render
from django.contrib.auth import login

from rest_framework.response import Response
from rest_framework import generics, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse

from .messaging import initiate_client

from .serializers import (
    SignUpSerializer,
    UserSerializer,
    StudentSerializer,
    ClassroomSerializer,
    QuizSerializer,
    QuizDetailSerializer,
    QuestionSerializer,
    StudyMaterialSerializer
)
from .models import Student, Teacher, Class, Quiz, Question, StudyMaterial


account_sid = "AC70e9be3234128ec3260475aab61ce889"
auth_token = "be938c0cf8e8ce86448b265ea6331941"
client = Client(account_sid, auth_token)

# message = client.messages.create(
#     body="Hello there",
#     from_="+12318282128",
#     to="+919068833712"
# )

# print(message.sid)
class SignUp(generics.GenericAPIView):
    """
    View for signing up a new student or teacher
    """

    serializer_class = SignUpSerializer

    def post(self, request, format=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        teacher = Teacher.objects.create(user=user)
        teacher.save()
        return Response({"user": UserSerializer(user).data})


class UserInfo(generics.GenericAPIView):
    """
    Return information about the user
    """

    permission_classes = [
        IsAuthenticated
    ]  # Only requests with the auth token are processed

    def get(self, request, format=None):
        user = request.user
        return Response({"user": UserSerializer(user).data})


class StudentViewset(viewsets.ModelViewSet):
    """
    View all the students in the website who are registered
    """

    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    permission_classes = [IsAuthenticated]

class QuestionViewset(viewsets.ModelViewSet):
    """
    View details about a question
    """

    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    permission_classes = [IsAuthenticated]


class ClassroomViewset(viewsets.ModelViewSet):

    queryset = Class.objects.all()
    serializer_class = ClassroomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        teacher = Teacher.objects.get(user=user)
        return Class.objects.filter(teacher=teacher)

    def perform_create(self, serializer):
        """
        modifying perform_create for all the views to get Student
        instance from request
        """

        user = self.request.user
        teacher = Teacher.objects.get(user=user)
        serializer.save(teacher=teacher)

    @action(detail=True, methods=["post"])
    def add_student(self, request, pk=None):
        student_id = request.data["student_id"]
        teacher = request.user.teacher
        class_id = request.data["class_id"]

        student = Student.objects.get(id=student_id)
        student_class = Class.objects.get(id=class_id)

        student_class.students.add(student)
        student_class.save()

        # send sms CLASS>CLASS_NAME after saving student to class
        endpoint = student.phone_number
        cname = student_class.name
        client = initiate_client()

        client.publish(
        PhoneNumber='+91'+endpoint,
        Message='CLASS>'+cname)

        s = self.get_serializer(student_class)

        return Response(s.data)

    @action(detail=True, methods=["post"])
    def remove_student(self, request, pk=None):
        student_id = request.data["student_id"]
        teacher = request.user.teacher
        class_id = request.data["class_id"]

        student = Student.objects.get(id=student_id)
        student_class = Class.objects.get(id=class_id)

        student_class.students.remove(student)
        student_class.save()

        s = self.get_serializer(student_class)

        return Response(s.data)


class QuizViewset(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == "retrieve" or self.request.query_params.get("quiz_id", None) != None:
            return QuizDetailSerializer # Returns all the information in the case of viewing answers
        return QuizSerializer

    def get_queryset(self):
        user = self.request.user
        if(self.request.query_params.get("quiz_id", None) != None):
            return Quiz.objects.filter(id=self.request.query_params["quiz_id"])
        class_id = self.request.query_params["class_id"]
        class_name = Class.objects.get(id=class_id)
        return Quiz.objects.filter(class_name=class_name)

    def perform_create(
        self, serializer
    ):  # The quizzes are created here, so sns should be called from here, to every member in that quiz's class
        print(self.request.data)
        class_name = Class.objects.get(id=self.request.data["class_id"])
        instance = serializer.save(class_name=class_name)
        for question in self.request.data["question_list"]:
            qobj = Question.objects.create(detail=question, quiz=instance)
            qobj.save()
        
        client = initiate_client()

        registered_students = class_name.students.all()
        cname = class_name.name
        questions = Question.objects.filter(quiz=instance)
        questions.order_by('id')

        i = 0
        for question in questions:
            i+=1
            print(question, i)
            quest = question.detail
            quiz_name = question.quiz.name
            message = 'QUIZ>' + cname + '|' + quiz_name + '|' + str(i) + '|' + quest

            for registered_student in registered_students:
                phno = '+91' + registered_student.phone_number
                client.publish(PhoneNumber=phno, Message=message)

class AnswersheetViewset(viewsets.ModelViewSet):
    def get_serializer_class(self):
        return 

class StudyMaterialViewset(viewsets.ModelViewSet):
    serializer_class = StudyMaterialSerializer
    def get_queryset(self):
        try:
            class_id = self.request.query_params['class_id']
        except:
            return []
        return StudyMaterial.objects.filter(class_name=class_id)
    
    def perform_create(self, serializer):
        """
        Override the create method to attach the class and also send the sms
        """
        class_room = Class.objects.get(id=self.request.data["class_id"])
        instance = serializer.save(class_name=class_room)

        study_material = instance # For creating sms messages from the instance

@api_view(('GET', 'POST'))
@renderer_classes((JSONRenderer,))
def receive_sms(request):
    """
    Responds to messages sent to the twilio number
    """
    print(request.data)
    resp = MessagingResponse()
    message = request.data['Body']
    from_number = request.data['From'][2:] # Ignore +91

    student = Student.objects.get(phone_number=from_number)
    # Need to figure out quiz id, question ids, and answers
    quiz_name = ''
    class_name = ''
    try:
        quiz_instance = Quiz.objects.get(class_name__name=class_name, name=quiz_name)
    except Quiz.DoesNotExist:
        pass
    answers = []
    for answer in answers:
        question_id = ''
        detail = ''
    # Create an answersheet with this

    return Response(str(resp))