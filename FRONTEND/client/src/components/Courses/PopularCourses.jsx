import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import logo from "../../assets/pys.jpg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const PopularCourses = () => {
  const [courseData, SetcourseData] = useState([]);
  useEffect(() => {
    try {
      axios.get(baseURL + "popular-courses/?all=1").then((res) => {
        SetcourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    document.title = "Popular courses";
  }, []);
  return (
    <div className="container mt-4">
      <h3 className=" pb-1 mb-4 mt-5">Popular Courses</h3>
      <div className="row">
        {courseData.map((row, index) => (
          <div key={index} className="col-md-3 mb-4">
            <Card style={{ width: "16rem" }}>
              <Link to={`detail/${row.course.id}`}>
                <Card.Img variant="top" src={row.course.featured_img} />
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link to={`detail/${row.course.id}`}>{row.course.title}</Link>
                </Card.Title>
              </Card.Body>
              <Card.Footer>
                <span>Rating: {row.rating}/5</span>
                <span className="float-end">Views:748873</span>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
      {/* end popular courses */}
    </div>
  );
};

export default PopularCourses;
