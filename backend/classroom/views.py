from django.shortcuts import render
from django.contrib.auth import login

from rest_framework.response import Response
from rest_framework import generics, viewsets, permissions
from rest_framework.permissions import IsAuthenticated

from .serializers import SignUpSerializer, UserSerializer, StudentSerializer
from .models import Student, Teacher

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
        return Response({
            "user": UserSerializer(user).data
        })


class StudentViewset(viewsets.ModelViewSet):
    """
    View all the students in the website who are registered
    """

    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    permission_classes = [IsAuthenticated]