from django.shortcuts import render
from .serializer import *
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import permissions
from .models import *
from django.db.models import Q


# csrf added
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse


# Create your views here.

# all teachers


class TeacherList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if "popular" in self.request.GET:
            sql = "SELECT *,COUNT(c.id) as total_course FROM main_teacher as t INNER JOIN main_course as c ON c.teacher_id=t.id GROUP BY t.id ORDER BY total_course desc"
            return Teacher.objects.raw(sql)


# teacher details for profile
class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]


# student details for profile


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


# teacher login


@csrf_exempt
def teacher_login(request):
    email = request.POST["email"]
    password = request.POST["password"]
    try:
        # if exisist or not
        teacherdata = Teacher.objects.get(email=email, password=password)
    except Teacher.DoesNotExist:
        teacherdata = None
    if teacherdata:
        return JsonResponse({"bool": True, "teacher_id": teacherdata.id})
    else:
        return JsonResponse({"bool": False})


# Category


class CategoryList(generics.ListCreateAPIView):
    queryset = CourseCatagory.objects.all()
    serializer_class = CategorySerializer


# course detail


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


# Course
class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if "result" in self.request.GET:
            limit = int(self.request.GET["result"])
            qs = Course.objects.all().order_by("-id")[:limit]

        # Filter courses based on the student's interested categories
        if "studentId" in self.kwargs:
            student_id = self.kwargs.get("studentId")
            student = Student.objects.get(pk=student_id)

            # Assuming 'intrested_categories' is a string, convert it to a list
            interested_categories = student.intrested_categories.split(",")

            # Create a Q object for each interested category
            query = Q()
            for category in interested_categories:
                query |= Q(techs__icontains=category.strip())

            qs = qs.filter(query)

        return qs

        # return StudentCourseEnrollment.objects.filter(
        #     course__techs__icontains=student.intrested_categories


# Specific teacher courses for delete..


class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


# Specific teacher courses


class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        teacher_id = self.kwargs["teacher_id"]
        # teacher = Teacher.objects.get(pk=teacher_id)
        # return Course.objects.filter(teacher=teacher)
        return Course.objects.filter(teacher_id=teacher_id)


# Chapter
class ChapterList(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer


# specific course chapter


class CourseChapterList(generics.ListCreateAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        course_id = self.kwargs["course_id"]
        course = Course.objects.get(pk=course_id)
        return Chapter.objects.filter(course=course)


# specific chapter for update and delete


class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer


# student details


class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = [permissions.IsAuthenticated]


# student login


@csrf_exempt
def student_login(request):
    email = request.POST["email"]
    password = request.POST["password"]
    try:
        # if exisist or not
        studentdata = Student.objects.get(email=email, password=password)
    except Student.DoesNotExist:
        studentdata = None
    if studentdata:
        return JsonResponse({"bool": True, "student_id": studentdata.id})
    else:
        return JsonResponse({"bool": False})


# enroll
class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset = StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    # permission_classes = [permissions.IsAuthenticated]


# fetch enroll status....


def student_enroll_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    enrollStatus = StudentCourseEnrollment.objects.filter(
        course=course, student=student
    ).count()

    if enrollStatus:
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


# fetch enrolled student....


class EnrolledStudentList(generics.ListAPIView):
    queryset = StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

    def get_queryset(self):
        if "course_id" in self.kwargs:
            course_id = self.kwargs["course_id"]
            course = Course.objects.get(pk=course_id)
            return StudentCourseEnrollment.objects.filter(course=course)
        elif "teacher_id" in self.kwargs:
            teacher_id = self.kwargs["teacher_id"]
            teacher = Teacher.objects.get(pk=teacher_id)
            return StudentCourseEnrollment.objects.filter(
                course__teacher_id=teacher
            ).distinct()
        elif "student_id" in self.kwargs:
            student_id = self.kwargs["student_id"]
            student = Student.objects.get(pk=student_id)
            return StudentCourseEnrollment.objects.filter(student=student).distinct()


class RatingCourseList(generics.ListCreateAPIView):
    queryset = CourseRating.objects.all()
    serializer_class = CourseRatingSerializer

    def get_queryset(self):
        if "popular" in self.request.GET:
            sql = "SELECT *,AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN  main_course as c ON cr.course_id = c.id GROUP BY c.id ORDER BY avg_rating desc LIMIT 4"
            return CourseRating.objects.raw(sql)
        if "all" in self.request.GET:
            sql = "SELECT *, AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c ON cr.course_id = c.id GROUP BY c.id ORDER BY avg_rating desc"
            return CourseRating.objects.raw(sql)

    # fetch rating status....


def student_rating_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    ratingStatus = CourseRating.objects.filter(course=course, student=student).count()

    if ratingStatus:
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


# teacher forgot password...


@csrf_exempt
def teacher_change_password(request, teacher_id):

    password = request.POST["password"]
    try:
        # if exisist or not
        teacherData = Teacher.objects.get(id=teacher_id)
    except Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        teacherData = Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


# student forgot password...


@csrf_exempt
def student_change_password(request, student_id):

    password = request.POST["password"]
    try:
        # if exisist or not
        studentData = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        studentData = None
    if studentData:
        studentData = Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


# dashboard for teachers...
class TeacherDashboardList(generics.RetrieveAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer
