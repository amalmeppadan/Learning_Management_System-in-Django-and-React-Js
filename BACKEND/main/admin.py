from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Teacher)
admin.site.register(Course)
admin.site.register(CourseCatagory)
admin.site.register(Chapter)
admin.site.register(Student)
admin.site.register(StudentCourseEnrollment)
admin.site.register(CourseRating)
