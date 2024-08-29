import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TeacherSidebar from "../Teacher/TeacherSidebar";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";

const baseURL = "http://127.0.0.1:8000/api/";

const EditChapter = () => {
  const [chapterData, SetchapterData] = useState({
    course: "",
    title: "",
    description: "",
    prev_video: "",
    video: "",
    remarks: "",
  });

  const handleChange = (event) => {
    SetchapterData({
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    SetchapterData({
      ...chapterData,
      [event.target.name]: event.target.files[0],
    });
  };
  const { chapter_id } = useParams();

  //form submit..

  const submitForm = (event) => {
    event.preventDefault();

    const courseFormData = new FormData();

    courseFormData.append("course", chapterData.course);
    courseFormData.append("title", chapterData.title);
    courseFormData.append("description", chapterData.description);
    if (chapterData.video !== "") {
      courseFormData.append("video", chapterData.video, chapterData.video.name);
    }
    courseFormData.append("remarks", chapterData.remarks);

    try {
      axios
        .put(baseURL + "chapter/" + chapter_id, courseFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            Swal.fire({
              title: "Data has been updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }

          // window.location.href = "/addchapter/1";
        });
    } catch (error) {
      console.log(error);
    }
  };

  //get the data......

  useEffect(() => {
    try {
      document.title = "Course chapters";

      axios.get(baseURL + "chapter/" + chapter_id).then((res) => {
        SetchapterData({
          course: res.data.course,
          title: res.data.title,
          description: res.data.description,
          prev_video: res.data.prev_video,
          remarks: res.data.remarks,
          video: "",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Update Chapters</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                  <input
                    value={chapterData.title}
                    type="text"
                    onChange={handleChange}
                    name="title"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                  <textarea
                    value={chapterData.description}
                    onChange={handleChange}
                    name="description"
                    type="text"
                    className="form-control"
                    style={{ width: "100%" }}
                  ></textarea>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Video</label>
                <div className="col-sm-10">
                  <input
                    name="video"
                    onChange={handleFileChange}
                    type="file"
                    className="form-control"
                  />
                  {chapterData.prev_video && (
                    <video
                      controls
                      width={"100%"}
                      height={"240"}
                      className="mt-2"
                    >
                      <source src={chapterData.prev_video} type="video/webm" />
                      <source src={chapterData.prev_video} type="video/mp4" />
                      Download the
                      <a href="/media/cc0-videos/flower.webm">WEBM</a>
                      or
                      <a href="/media/cc0-videos/flower.mp4">MP4</a>
                      video.
                    </video>
                  )}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Remarks</label>
                <div className="col-sm-10">
                  <textarea
                    value={chapterData.remarks}
                    onChange={handleChange}
                    name="remarks"
                    placeholder="This video is focused on basic introduction"
                    type="text"
                    className="form-control"
                    style={{ width: "100%" }}
                  ></textarea>
                </div>
              </div>
              <hr />
              <button
                type="button"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditChapter;
