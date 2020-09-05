from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import generics, viewsets, permissions

from .serializers import SignUpSerializer, UserSerializer

class Login(generics.GenericAPIView):
    """
    View for logging in a user
    """
    pass


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

        return Response({
            "user": UserSerializer(user).data
        })
    