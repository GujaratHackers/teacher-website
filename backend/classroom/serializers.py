from rest_framework import serializers
from django.contrib.auth.models import User
import django.contrib.auth.password_validation as validators
from django.core import exceptions

from django.contrib.auth.hashers import check_password

from classroom.models import Student, Class, Quiz, Question, Answer, AnswerSheet, StudyMaterial

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
        exclude = ("teacher", )

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id", "detail"]

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["id", "name", "questions"]
        read_only = ("questions")

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "detail", "question"]

class AnswerSheetSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = AnswerSheet
        fields = ["student", "answers"]

class QuizDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    answersheets = AnswerSheetSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ["id", "name", "questions", "answersheets"]
        read_only = ("questions")
        depth=3

class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyMaterial
        fields = ["id", "topic", "detail"]
        read_only = ("class_name")