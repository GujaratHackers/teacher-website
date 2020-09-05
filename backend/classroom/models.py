from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.
class Student(models.Model):
    """
    Stores information about a student
    """
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10)
    standard = models.CharField(max_length=100, null=True)


class Teacher(models.Model):
    """
    Stores information about a teacher
    """
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Class(models.Model):
    """
    Store information about a class
    """
    name = models.CharField(max_length=100)
    teacher = models.ForeignKey(to=Teacher, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, related_name='classes', related_query_name='classes')

class Quiz(models.Model):
    """
    Store information about a quiz
    """
    name = models.CharField(max_length=100)
    class_name = models.ForeignKey(Class, on_delete=models.CASCADE)
    

class StudyMaterial(models.Model):
    """
    Store study material information
    """
    pass

class Question(models.Model):
    """
    Store info about a question
    """
    detail = models.CharField(max_length=150) # Set max length as 150 characters, with additional spacing for question number

class Answer(models.Model):
    """
    Store the answer for a question
    """
    detail = models.CharField(max_length=150) # Set max length as 150 characters, with additional spacing for answer number
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

class AnswerSheet(models.Model):
    """
    Answer sheet for a quiz by a student
    """
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    answers = models.ManyToManyField(Answer)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        token = Token.objects.create(user=instance)
