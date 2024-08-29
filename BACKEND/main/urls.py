from django.urls import path
from . import views

urlpatterns = [
    # teacher
    path("teacher/", views.TeacherList.as_view()),
    path("teacher/dashboard/<int:pk>", views.TeacherDashboardList.as_view()),
    path("teacher/<int:pk>/", views.TeacherDetail.as_view()),
    path("teacher/change-password/<int:teacher_id>/", views.teacher_change_password),
    path("teacher-login", views.teacher_login),
    path("popular-teachers/", views.TeacherList.as_view()),
    # category
    path("category/", views.CategoryList.as_view()),
    # course
    path("course/", views.CourseList.as_view()),
    # course detail
    path("course/<int:pk>", views.CourseDetailView.as_view()),
    # chapter
    path("chapter/", views.ChapterList.as_view()),
    # specific course chapter
    path("course-chapters/<int:course_id>/", views.CourseChapterList.as_view()),
    # specific chapter
    path("chapter/<int:pk>", views.ChapterDetailView.as_view()),
    # teacher courses
    path("teacher-courses/<int:teacher_id>", views.TeacherCourseList.as_view()),
    # teacher course detail
    path("teacher-course-detail/<int:pk>", views.TeacherCourseDetail.as_view()),
    # student
    path("student/", views.StudentList.as_view()),
    # student change password
    path("student/change-password/<int:student_id>/", views.student_change_password),
    # student detail
    path("student/<int:pk>/", views.StudentDetail.as_view()),
    # studentlogin
    path("student-login", views.student_login),
    # enroll
    path("student-enroll-course/", views.StudentEnrollCourseList.as_view()),
    # fetch enroll status
    path(
        "student_enroll_status/<int:student_id>/<int:course_id>",
        views.student_enroll_status,
    ),
    # fetch enroll student with specific course
    path(
        "fetch_enroll_students/<int:course_id>",
        views.EnrolledStudentList.as_view(),
    ),
    # enroll all students based on their course
    path(
        "fetch_enroll_course/<int:student_id>",
        views.EnrolledStudentList.as_view(),
    ),
    path(
        "fetch_recommended_course/<int:studentId>",
        views.CourseList.as_view(),
    ),
    # fetch enroll  all students based on teacher
    path(
        "fetch-all-enroll_students/<int:teacher_id>",
        views.EnrolledStudentList.as_view(),
    ),
    # rating
    path("course-rating/", views.RatingCourseList.as_view()),
    # popular courses
    path("popular-courses/", views.RatingCourseList.as_view()),
    # rating status
    path(
        "fetch-rating-status/<int:student_id>/<int:course_id>",
        views.student_rating_status,
    ),
]
