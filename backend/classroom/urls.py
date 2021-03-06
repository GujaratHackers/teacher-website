from django.urls import path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from classroom.views import SignUp, ClassroomViewset, StudentViewset, UserInfo, QuizViewset, receive_sms, StudyMaterialViewset

router = routers.SimpleRouter()
router.register(r'student', StudentViewset, basename='student')
router.register(r'class', ClassroomViewset, basename='class')
router.register(r'quiz', QuizViewset, basename='quiz')
router.register(r'study_material', StudyMaterialViewset, basename="study_material")

urlpatterns = [
    path('signup', SignUp.as_view()),
    path('login', obtain_auth_token, name="login"),
    path('user', UserInfo.as_view()),
    path('receive_sms', receive_sms)
]

urlpatterns += router.urls  