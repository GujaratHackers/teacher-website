from django.urls import path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from classroom.views import SignUp

# router = routers.SimpleRouter()
# router.register(r'signup', SignUp, basename='signup')

urlpatterns = [
    path('signup', SignUp.as_view()),
    path('login', obtain_auth_token, name="login")
]