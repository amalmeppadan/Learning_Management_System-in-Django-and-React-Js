import React, { useEffect, useState } from "react";
import Sidebar from "../User/Sidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const RecomdCourse = () => {
  const [courseData, SetcourseData] = useState([]);
  const studentId = localStorage.getItem("studentId"); //need studentid

  //fetch all students when page load.....

  useEffect(() => {
    try {
      axios
        .get(baseURL + "fetch_recommended_course/" + studentId)
        .then((res) => {
          // console.log(res.course.teacher.full_name);

          SetcourseData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    document.title = "Student Mycourses";
  }, []);
  useEffect(() => {
    document.title = "Recommanded Courses";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Recommended Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Technologies</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((row, index) => (
                    <tr key={index}>
                      <td>
                        {/* to={`/detail/${row.course.id}`} */}
                        <Link to={`/detail/${row.id}`}>{row.title}</Link>
                      </td>
                      <td>{row.techs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecomdCourse;
