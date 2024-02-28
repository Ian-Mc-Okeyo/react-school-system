import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import Popup from "reactjs-popup";
import axios from "axios";
import CreateCourse from "./CreateCourse";
import EditCourseName from "./EditCourseName";
import SearchCourse from "./SearchCourse";
import { Link } from "react-router-dom";
import TransferStudent from "./TransferStudent";

const Institution = () => {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([])
    const baseurl = "http://127.0.0.1:8081/api/v1/course";
    const [sort, setSort] = useState(true);
    const [fetch, setFetch] = useState(true);
    const location = useLocation();
    const inst = location.state;
    useEffect(() => {
        axios
            .get(baseurl + "/get?id=" + inst.id)
            .then((resp) => {
                console.log(resp.data);
                setCourses(resp.data);
                axios.get("http://127.0.0.1:8081/api/v1/student/get-inst-students?institutionId="+inst.id).then((resp)=>{
                    setStudents(resp.data)
                }).catch((err)=>{
                    console.error(err)
                })
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

    const deleteCourse = (index) => {
        axios
            .delete(baseurl + "/delete?id=" + courses[index].id)
            .then((resp) => {
                setFetch(!fetch);
                console.log(courses);
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
                            <CreateCourse instId={inst.id} />
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
                            <SearchCourse instId={inst.id} />
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
                            <h3>{inst.name} Courses</h3>
                        </th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => {
                        return (
                            <tr key={index}>
                                <td>{course.name}</td>
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
                                            <EditCourseName course={course} />
                                        </div>
                                    </Popup>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteCourse(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <Link
                                        className="btn btn-outline-primary"
                                        to={"/course"} state={course}
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

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
                            <h3>{inst.name} Students</h3>
                        </th>
                        
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
                                                Transfer
                                            </button>
                                        }
                                        position="top center"
                                        contentStyle={{ width: "350px" }}
                                        onClose={() => setFetch(!fetch)}
                                    >
                                        <div>
                                            <TransferStudent student={student} />
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

export default Institution;
