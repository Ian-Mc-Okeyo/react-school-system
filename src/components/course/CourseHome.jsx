import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import Popup from "reactjs-popup";
import axios from "axios";
import AddStudent from "./AddStudent";
import EditStudentName from "./EditStudentName";
import SearchStudent from "./SearchStudent";
import ChangeCourse from "./ChangeCourse";
import { Link } from "react-router-dom";

const CourseHome = () => {
    const [students, setStudents] = useState([]);
    const baseurl = "http://127.0.0.1:8081/api/v1/student";
    const [sort, setSort] = useState(true);
    const [fetch, setFetch] = useState(true);
    const location = useLocation();
    const course = location.state;
    useEffect(() => {
        axios
            .get(baseurl + "/course-students?courseId=" + course.id)
            .then((resp) => {
                console.log(resp.data);
                setStudents(resp.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [fetch]);

    const sortRequest = () => {
        setSort(!sort);
        var url = "desc";
        if (sort) {
            url = "asc";
        }

        axios
            .get(baseurl + "/get-order-" + url, {
                params: {
                    id: inst.id
                }
            })
            .then((resp) => {
                setCourses(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteStudent = (index) => {
        alert("Are you sure you want to delete this student?")
        axios
            .delete(baseurl + "/delete?id=" + students[index].id)
            .then((resp) => {
                setFetch(!fetch);
                console.log(resp);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };
    return (
        <>
            <NavBar />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Popup
                        trigger={<button className="btn btn-outline-primary">Add +</button>}
                        position="top center"
                        contentStyle={{ width: "350px" }}
                        onClose={() => setFetch(!fetch)}
                    >
                        <div>
                            <AddStudent course={course} />
                        </div>
                    </Popup>
                </div>
                <div className="col-md-6">
                    <Popup
                        trigger={
                            <button className="btn btn-outline-primary">Search</button>
                        }
                        position="top center"
                        contentStyle={{ width: "350px" }}
                    >
                        <div>
                            <SearchStudent courseId={course.id} />
                        </div>
                    </Popup>
                </div>
            </div>

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">
                            <button className="sort-btn" onClick={sortRequest}>
                                Name
                            </button>
                        </th>
                        <th scope="col">
                            {" "}
                            <h3>{course.name} Students</h3>
                        </th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => {
                        return (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>
                                    <Popup
                                        trigger={
                                            <button className="btn btn-outline-primary">
                                                Edit Name
                                            </button>
                                        }
                                        position="top center"
                                        contentStyle={{ width: "350px" }}
                                        onClose={() => setFetch(!fetch)}
                                    >
                                        <div>
                                            <EditStudentName student={student} />
                                        </div>
                                    </Popup>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteStudent(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                <Popup
                                        trigger={
                                            <button className="btn btn-outline-primary">
                                                Change Course
                                            </button>
                                        }
                                        position="top center"
                                        contentStyle={{ width: "350px" }}
                                        onClose={() => setFetch(!fetch)}
                                    >
                                        <div>
                                            <ChangeCourse student={student} />
                                        </div>
                                    </Popup>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default CourseHome;
