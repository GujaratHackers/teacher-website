from rest_framework import serializers
from django.contrib.auth.models import User
import django.contrib.auth.password_validation as validators
from django.core import exceptions

from django.contrib.auth.hashers import check_password

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
        user.save()
        errors = dict() 
        try:
            validators.validate_password(password=password, user=User)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        
        if errors:
            raise serializers.ValidationError(errors)

        user.set_password(password)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")

# class LoginSerializer(serializers.Serializer):
#     # username = serializers.CharField(max_length=100)
#     # password = serializers.CharField(max_length=100)

#     def is_valid(self, raise_exception=True):
#         name = self.initial_data['username']
#         password = self.initial_data['password']

#         try:
#             user = User.objects.get(username=name)
#         except User.DoesNotExist:
#             raise Exception("Authentication Failure no user found")
        
#         validated = check_password(password, encoded=user.password)
#         print(validated)
#         if validated:
#             return user
#         else:
#             raise Exception("Authentication Failure")

