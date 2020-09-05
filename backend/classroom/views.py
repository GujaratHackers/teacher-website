from django.shortcuts import render
from django.contrib.auth import login

from rest_framework.response import Response
from rest_framework import generics, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from .serializers import SignUpSerializer, UserSerializer, StudentSerializer, ClassroomSerializer
from .models import Student, Teacher, Class

# class Login(generics.GenericAPIView):
#     """
#     View for logging in a user
#     """

#     serializer_class = LoginSerializer

#     def post(self, request, format=None):
#         serializer = self.get_serializer(data=request.data)
#         user = serializer.is_valid(raise_exception=True)

#         login(request, user)

#         return Response("Successfully authenticated")


# Create your views here.
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
        Class.objects.filter(teacher=user.teacher)

    def perform_create(self, serializer):
        """
        modifying perform_create for all the views to get Student
        instance from request
        """

        teacher = self.request.user.teacher
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

  

