from django.db import models
from django.core import serializers

# Create your models here.

# teacher model


class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100, blank=True, null=True)
    qualification = models.CharField(max_length=200)
    profile_img = models.ImageField(upload_to="teacher_profile/", null=True)
    mobileno = models.CharField(max_length=200)
    skills = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "1.Teacher"

    def __str__(self):
        return self.full_name

    # creating three functions for teacher dashboard...

    # total teacher courses..

    def total_teacher_courses(self):
        total_courses = Course.objects.filter(teacher=self).count()
        return total_courses

    # total teacher chapter...

    def total_teacher_chapters(self):
        total_chapters = Chapter.objects.filter(course__teacher=self).count()
        return total_chapters

    # total teacher students...

    def total_teacher_students(self):
        total_students = StudentCourseEnrollment.objects.filter(
            course__teacher=self
        ).count()
        return total_students


# Course Catagory model


class CourseCatagory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "2.CourseCatagory"

    def __str__(self):
        return self.title


# Course model


class Course(models.Model):
    category = models.ForeignKey(CourseCatagory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(
        Teacher, on_delete=models.CASCADE, related_name="teacher_course"
    )
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    featured_img = models.ImageField(upload_to="course_imgs/", null=True)
    techs = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "3.Course"

    def related_videos(self):
        related_videos = Course.objects.filter(techs__icontains=self.techs)
        return serializers.serialize("json", related_videos)

    # enroll student total count....

    def total_enrolled_students(self):

        total_enrolled_students = StudentCourseEnrollment.objects.filter(
            course=self
        ).count()
        return total_enrolled_students

    # course rating....

    def course_rating(self):

        course_rating = Course.objects.filter(course=self).aggregate(
            models.Avg("rating")
        )
        return course_rating

    def __str__(self):
        return self.title


# Chapter model


class Chapter(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="course_chapter"
    )
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    videos = models.FileField(upload_to="chapter_videos/", null=True)
    remarks = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "4.Chapters"


# student model


class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100, null=True, blank=True)
    username = models.CharField(max_length=200)
    intrested_categories = models.TextField()

    class Meta:
        verbose_name_plural = "5.Student"

    def __str__(self):
        return self.full_name


# student course Enrollment...


class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="enrolled_courses"
    )
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="enrolled_student"
    )
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "6.Enrolled Courses"

    def __str__(self):
        return f"{self.course} {self.student}"


# Course rating and reviews


class CourseRating(models.Model):

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    rating = models.PositiveBigIntegerField(default=0)
    reviews = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.course}-{self.student}-{self.rating}"
