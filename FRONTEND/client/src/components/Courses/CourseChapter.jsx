import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TeacherSidebar from "../Teacher/TeacherSidebar";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";

const baseURL = "http://127.0.0.1:8000/api/";

const CourseChapter = () => {
  const [chapterData, SetchapterData] = useState([]);
  const [totalResult, SettotalResult] = useState(0);

  const { course_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseURL + "course-chapters/" + course_id).then((res) => {
        SettotalResult(res.data.length);
        SetchapterData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //delete data...

  const handleDelete = (chapter_id) => {
    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to delete this chapter?",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Log the delete attempt
        //console.log("Deleting chapter with ID:", chapter_id);

        axios
          .delete(baseURL + "chapter/" + chapter_id)
          .then((res) => {
            // Log the response
            // console.log("Delete response:", res);

            Swal.fire("Deleted!", "The chapter has been deleted.", "success");

            // Re-fetch the updated chapter list
            axios
              .get(baseURL + "course-chapters/" + course_id)
              .then((res) => {
                SettotalResult(res.data.length);
                SetchapterData(res.data);
              })
              .catch((error) => {
                console.error("Error fetching updated chapter list:", error);
              });
          })
          .catch((error) => {
            console.error("Error deleting chapter:", error);
            Swal.fire(
              "Error",
              "There was an error deleting the chapter.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">
              All Chapters ({totalResult}){" "}
              <Link
                className="btn btn-success float-end btn-sm"
                to={"/addchapter/" + course_id}
              >
                Add chapter
              </Link>{" "}
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Video</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {chapterData.map((chapter, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={"/edit/chapter" + chapter.id}>
                          {chapter.title}
                        </Link>
                      </td>
                      <td>
                        <video controls width="250">
                          <source src={chapter.video} type="video/webm" />
                          <source src={chapter.video} type="video/mp4" />
                          Download the
                          <a href="/media/cc0-videos/flower.webm">WEBM</a>
                          or
                          <a href="/media/cc0-videos/flower.mp4">MP4</a>
                          video.
                        </video>
                      </td>
                      {/* <td>
                        <img src={chapter.video} alt="" />
                      </td> */}
                      <td>{chapter.remarks}</td>
                      <td>
                        <Link to={"/edit-chapter/" + chapter.id}>
                          <FaEdit size={18} />
                        </Link>
                        <Link
                          onClick={() => handleDelete(chapter.id)}
                          className="ms-2"
                        >
                          <BsFillTrash3Fill size={18} color="red" />
                        </Link>
                      </td>
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

export default CourseChapter;
