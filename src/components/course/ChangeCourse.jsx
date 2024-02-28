import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangeCourse = ({ student }) => {
  const baseurl = "http://127.0.0.1:8081/api/v1/student";
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8081/api/v1/course/get?id=" + student.institution.id).then((resp) => {
        console.log(resp.data)
        setCourses(resp.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [baseurl]);

  const onSubmit = () => {
    axios
      .put(baseurl + "/edit-course", values)
      .then((resp) => {
        console.log(resp);
        toast("Success", {
          position: "bottom-right",
          type: "success",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data.message, {
          position: "bottom-right",
          type: "error",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const { values, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      courseId: "",
      studentId: student.id,
      institutionId: student.institution.id
    },
    onSubmit,
  });
  return (
    <form className="pop-up-form">
      <ToastContainer />
      <h5>Change Course</h5>
      <div>
        <select className="form-select" aria-label="Select Course" name="courseId" value={values.courseId} onChange={handleChange}>
          <option selected></option>
          {
            courses.map((course, index)=>{
                return(
                    <option value={course.id} key={index}>{course.name}</option>
                )
            })
          }
        </select>
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default ChangeCourse;
