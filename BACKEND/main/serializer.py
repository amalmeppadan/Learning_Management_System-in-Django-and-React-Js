from django.db.models import Avg
from .models import *
from rest_framework import serializers


# Course category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCatagory
        fields = "__all__"


# Chapter


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = "__all__"


#  Course


class CourseSerializer(serializers.ModelSerializer):
    course_chapter = ChapterSerializer(many=True, read_only=True)
    related_videos = serializers.SerializerMethodField()
    total_enrolled_students = serializers.SerializerMethodField()
    course_rating = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = "__all__"
        depth = 1

    def get_related_videos(self, obj):
        return obj.related_videos()

    def get_total_enrolled_students(self, obj):
        return StudentCourseEnrollment.objects.filter(course=obj).count()

    def get_course_rating(self, obj):
        course_rating = CourseRating.objects.filter(course=obj).aggregate(Avg("rating"))
        return course_rating["rating__avg"] if course_rating["rating__avg"] else 0

        # Nested methods....

    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class TeacherSerializer(serializers.ModelSerializer):
    teacher_course = CourseSerializer(many=True, read_only=True)
    total_teacher_courses = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = "__all__"
        depth = 1

        # Nested methods....

    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1

    def get_total_teacher_courses(self, obj):
        return obj.total_teacher_courses()


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = "__all__"


class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourseEnrollment
        fields = "__all__"

        # Nested methods....

    def __init__(self, *args, **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRating
        fields = "__all__"
        depth = 1

    # Nested methods....

    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class TeacherDashboardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Teacher
        fields = [
            "total_teacher_courses",
            "total_teacher_students",
            "total_teacher_chapters",
        ]
