import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const PopularTeacher = () => {
  const [popularTeachers, setPopularTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "popular-teachers/?popular=1")
      .then((res) => {
        console.log("API response:", res.data);
        if (res.data && Array.isArray(res.data)) {
          setPopularTeachers(res.data);
        } else {
          console.log("Unexpected response structure:", res.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching popular teachers:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h3 className="pb-1 mb-4 mt-5">Our Featured Teachers</h3>
      <div className="row">
        {popularTeachers.length > 0 ? (
          popularTeachers.map((teacher) => (
            <div key={teacher.id} className="col-md-3">
              <Card style={{ width: "16rem" }}>
                <Link to={`teacher-detail/${teacher.id}`}>
                  <Card.Img
                    variant="top"
                    src={teacher.profile_img || "default-image-url.jpg"}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>
                    <Link to={`teacher-detail/${teacher.id}`}>
                      {teacher.full_name}
                    </Link>
                  </Card.Title>
                </Card.Body>
                <Card.Footer>
                  <span>
                    Total Courses: {teacher.total_teacher_courses || "N/A"}
                  </span>
                </Card.Footer>
              </Card>
            </div>
          ))
        ) : (
          <p>No popular teachers found.</p>
        )}
      </div>
    </div>
  );
};

export default PopularTeacher;
