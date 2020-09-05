from django.shortcuts import render
from django.contrib.auth import login

from rest_framework.response import Response
from rest_framework import generics, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from .serializers import SignUpSerializer, UserSerializer, StudentSerializer, ClassroomSerializer, QuizSerializer, QuizDetailSerializer
from .models import Student, Teacher, Class, Quiz, Question

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
    permission_classes = [IsAuthenticated] # Only requests with the auth token are processed

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

    @action(detail=True, methods = ['post'])
    def add_student(self, request):
        student_id = request.data['student_id']
        teacher = request.user.teacher
        class_id = request.data['class_id']
        
        student = Student.objects.get(id = student_id)
        student_class = Class.objects.get(id = class_id)
        
        student_class.students.add(student)
        student_class.save()

        s = self.get_serializer(student_class)

        return Response(s.data)

    @action(detail=True, methods = ['post'])
    def remove_student(self, request):
        student_id = request.data['student_id']
        teacher = request.user.teacher
        class_id = request.data['class_id']
        
        student = Student.objects.get(id = student_id)
        student_class = Class.objects.get(id = class_id)
        
        student_class.students.remove(student)
        student_class.save()

        s = self.get_serializer(student_class)

        return Response(s.data)

  
class QuizViewset(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.action == 'retrive':
            return QuizDetailSerializer
        return QuizSerializer
    
    def get_queryset(self):
        user = self.request.user
        class_id = self.request.query_params["class_id"]
        class_name = Class.objects.get(id=class_id)
        return Quiz.objects.filter(class_name=class_name)
    
    def perform_create(self, serializer): # The quizzes are created here, so sns should be called from here, to every member in that quiz's class
        print(self.request.data)
        class_name = Class.objects.get(id=self.request.data["class_id"])
        instance = serializer.save(class_name=class_name)
        for question in self.request.data["question_list"]:
            qobj = Question.objects.create(detail=question, quiz=instance)

