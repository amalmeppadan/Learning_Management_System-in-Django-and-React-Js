import React from "react";
import Home from "./components/Home";
import Navbars from "./components/Navbars";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import CourseDetail from "./components/Courses/CourseDetail";

import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Dashboard from "./components/User/Dashboard";
import MyCourses from "./components/Courses/MyCourses";
import RecomdCourse from "./components/Courses/RecomdCourse";
import ProfileSettings from "./components/User/ProfileSettings";
import ChangePassword from "./components/User/ChangePassword";

import TeacherLogin from "./components/Teacher/TeacherLogin";
import TeacherReg from "./components/Teacher/TeacherReg";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import TeacherCourses from "./components/Teacher/TeacherCourses";
import TeacherAddCourses from "./components/Teacher/TeacherAddCourses";
import Userlist from "./components/Teacher/Userlist";
import TeacherProfileSetting from "./components/Teacher/TeacherProfileSetting";
import TeacherChangePassword from "./components/Teacher/TeacherChangePassword";
import TeacherDetail from "./components/Teacher/TeacherDetail";
import AllCourses from "./components/Courses/AllCourses";
import PopularCourses from "./components/Courses/PopularCourses";
import PopularTeacher from "./components/Courses/PopularTeacher";
import CategoryCourses from "./components/Courses/CategoryCourses";
import TeacherLogout from "./components/Teacher/TeacherLogout";
import Addchapter from "./components/Teacher/Addchapter";
import Allchapter from "./components/Courses/CourseChapter";
import EditChapter from "./components/Courses/EditChapter";
import EditCourse from "./components/Courses/EditCourse";
import UserLogout from "./components/User/UserLogout";
import EnrolledUser from "./components/User/EnrolledUser";
import WelcomePage from "./components/User/WelcomePage";

const App = () => {
  return (
    <div>
      <Router>
        <Navbars />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:course_id" element={<CourseDetail />} />
          <Route path="/user-login" element={<Login />} />
          <Route path="/user-logout" element={<UserLogout />} />
          <Route path="/user-register" element={<Register />} />
          <Route path="/user-dashboard" element={<Dashboard />} />
          <Route path="/welcome-page" element={<WelcomePage />} />
          <Route path="/mycourses" element={<MyCourses />} />
          <Route path="/recommended-courses" element={<RecomdCourse />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher-logout" element={<TeacherLogout />} />
          <Route path="/teacher-register" element={<TeacherReg />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher-courses" element={<TeacherCourses />} />
          <Route path="/teacher-addcourse" element={<TeacherAddCourses />} />
          <Route path="/all-chapters/:course_id" element={<Allchapter />} />
          <Route path="/addchapter/:course_id" element={<Addchapter />} />
          <Route path="/teacher-myusers" element={<Userlist />} />
          <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
          <Route path="/edit-course/:course_id" element={<EditCourse />} />
          <Route
            path="/enrolled-students/:course_id"
            element={<EnrolledUser />}
          />
          <Route
            path="/teacher-profile-settings"
            element={<TeacherProfileSetting />}
          />
          <Route
            path="/teacher-changepassword"
            element={<TeacherChangePassword />}
          />
          <Route
            path="/teacher-detail/:teacher_id"
            element={<TeacherDetail />}
          />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="/popular-courses" element={<PopularCourses />} />
          <Route path="/popular-teacher" element={<PopularTeacher />} />
          <Route
            path="/category/:category_slug"
            element={<CategoryCourses />}
          />
        </Routes>

        {/* <Carousals /> */}
        <Footer />
      </Router>
    </div>
  );
};

export default App;
