import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = ({course}) => {
    const baseurl = "http://127.0.0.1:8081/api/v1/student"
    const onSubmit = ()=>{
        axios.post(baseurl+"/add", values).then((resp)=>{
            console.log(resp)
            toast("Success", {
                position: "bottom-right",
                type: 'success',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }).catch((err)=>{
            console.log(err)
            toast(err.response.data.message, {
                position: "bottom-right",
                type: 'error',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        })
    }

    const { values, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: {
            name: '',
            courseId: course.id,
            institutionId: course.institution.id
        },
        onSubmit
    })
  return (
    <form className="pop-up-form">
        <ToastContainer/>
      <h5>Add Student</h5>
      <div>
        <input 
            type="text" 
            className="form-control"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={values.name}
        />
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default AddStudent;
