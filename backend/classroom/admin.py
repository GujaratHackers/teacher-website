from django.contrib import admin

# Register your models here.
from .models import Student, Teacher, Class, Quiz, Question

admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Class)
admin.site.register(Quiz)
admin.site.register(Question)
