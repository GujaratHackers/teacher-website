from django.urls import path
from rest_framework import routers

from classroom.views import SignUp, Login

# router = routers.SimpleRouter()
# router.register(r'signup', SignUp, basename='signup')

urlpatterns = [
    path('signup', SignUp.as_view()),
    path('login', Login.as_view())
]