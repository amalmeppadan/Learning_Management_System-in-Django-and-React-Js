import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import logos from "/src/assets/pys.jpg";

const CategoryCourses = () => {
  return (
    <div className="container mt-4">
      {/* latest courses */}
      <h3 className=" pb-1 mb-4">Web Development Courses</h3>
      <div className="row">
        <div className="col-md-3 mb-4">
          <Card style={{ width: "16rem" }}>
            <Link to={"/detail/1"}>
              <Card.Img variant="top" src={logos} />
            </Link>
            <Card.Body>
              <Card.Title>
                <a href="#">
                  <Link to={"/detail/1"}> Course Title </Link>
                </a>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card style={{ width: "16rem" }}>
            <a href="#">
              <Card.Img variant="top" src={logos} />
            </a>
            <Card.Body>
              <Card.Title>
                <a href="#">Course Title</a>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card style={{ width: "16rem" }}>
            <a href="#">
              <Card.Img variant="top" src={logos} />
            </a>
            <Card.Body>
              <Card.Title>
                <a href="#">Course Title</a>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3">
          <Card style={{ width: "16rem" }}>
            <a href="#">
              <Card.Img variant="top" src={logos} />
            </a>
            <Card.Body>
              <Card.Title>
                <a href="#">Course Title</a>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3">
          <Card style={{ width: "16rem" }}>
            <a href="#">
              <Card.Img variant="top" src={logos} />
            </a>
            <Card.Body>
              <Card.Title>
                <a href="#">Course Title</a>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3">
          <Card style={{ width: "16rem" }}>
            <a href="#">
              <Card.Img variant="top" src={logos} />
            </a>
            <Card.Body>
              <Card.Title>
                <a href="#">Course Title</a>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3">
          <Card style={{ width: "16rem" }}>
            <a href="#">
              <Card.Img variant="top" src={logos} />
            </a>
            <Card.Body>
              <Card.Title>
                <a href="#">Course Title</a>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3">
          <Card style={{ width: "16rem" }}>
            <a href="#">
              <Card.Img variant="top" src={logos} />
            </a>
            <Card.Body>
              <Card.Title>
                <a href="#">Course Title</a>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
      {/* pagination start */}
      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CategoryCourses;
