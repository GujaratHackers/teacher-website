from rest_framework import serializers
from django.contrib.auth.models import User
import django.contrib.auth.password_validation as validators
from django.core import exceptions

from django.contrib.auth.hashers import check_password

from classroom.models import Student, Class

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")

    def create(self, validated_data):
        password = validated_data.get('password')
        username = validated_data.get('username')

        
        user = User.objects.create(
            username=username
        )

        errors = dict() 
        try:
            validators.validate_password(password=password, user=User)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        
        if errors:
            raise serializers.ValidationError(errors)

        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = () # Include all the fields

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields =('_all_')