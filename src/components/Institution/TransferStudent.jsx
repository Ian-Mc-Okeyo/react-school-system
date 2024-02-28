import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransferStudent = ({ student }) => {
  const baseurl = "http://127.0.0.1:8081/api/v1/student";
  const [institutions, setInstitutions] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8081/api/v1/institution/get").then((resp) => {
        console.log(resp.data)
        setInstitutions(resp.data)
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
      institutionId: ""
    },
    onSubmit,
  });
  return (
    <form className="pop-up-form">
      <ToastContainer />
      <h5>Change Course</h5>
      <div>
        <select className="form-select" aria-label="Select Course" name="institutionId" value={values.institutionId} onChange={handleChange}>
          <option selected></option>
          {
            institutions.map((inst, index)=>{
                return(
                    <option value={inst.id} key={index}>{inst.name}</option>
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

export default TransferStudent;
