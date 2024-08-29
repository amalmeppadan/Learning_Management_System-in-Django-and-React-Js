import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import logos from "/src/assets/pys.jpg";
import axios from "axios";
const baseURL = "http://127.0.0.1:8000/api/";

const AllCourses = () => {
  const [courseData, SetcourseData] = useState([]);

  //fetch all course data,,
  useEffect(() => {
    try {
      axios.get(baseURL + "course/").then((res) => {
        SetcourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    document.title = "All courses";
  }, []);
  return (
    <div className="container mt-4">
      {/* latest courses */}
      <h3 className=" pb-1 mb-4">Latest Courses</h3>
      <div className="row">
        {courseData &&
          courseData.map((course, index) => (
            <div key={index} className="col-md-3 mb-4">
              <Card style={{ width: "16rem" }}>
                <Link to={`/detail/${course.id}`}>
                  <Card.Img
                    variant="top"
                    src={course.featured_img}
                    alt={course.title}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>
                    <a href="#">
                      <Link to={`/detail/${course.id}`}> {course.title} </Link>
                    </a>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllCourses;
