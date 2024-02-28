import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Popup from "reactjs-popup";
import CreateInst from "./CreateInst";
import SearchInst from "./SearchInst";
import EditInstName from "./EditInstName";
import { Link } from "react-router-dom";

const Home = () => {
  const [institutions, setInstitutions] = useState([]);
  const baseurl = "http://127.0.0.1:8081/api/v1/institution";
  const [sort, setSort] = useState(true);
  const [fetch, setFetch] = useState(true);
  useEffect(() => {
    axios
      .get(baseurl + "/get")
      .then((resp) => {
        console.log(resp.data);
        setInstitutions(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [fetch]);

  const sortRequest = () => {
    setSort(!sort);
    var url = "descending";
    if (sort) {
      url = "ascending";
    }

    axios
      .get(baseurl + "/get-all-" + url)
      .then((resp) => {
        setInstitutions(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteInst = (index) => {
    axios
      .delete(baseurl + "/delete?id=" + institutions[index].id)
      .then((resp) => {
        setFetch(!fetch);
        console.log(institutions);
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
            onClose={()=>setFetch(!fetch)}
          >
            <div>
              <CreateInst />
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
              <SearchInst />
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
              <h3>Institutions</h3>
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((inst, index) => {
            return (
              <tr key={index}>
                <td>{inst.name}</td>
                <td>
                  <Popup
                    trigger={
                      <button className="btn btn-outline-primary">
                        Edit Name
                      </button>
                    }
                    position="top center"
                    contentStyle={{ width: "350px" }}
                    onClose={()=>setFetch(!fetch)}
                  >
                    <div>
                      <EditInstName inst={inst}/>
                    </div>
                  </Popup>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteInst(index)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link className="btn btn-outline-primary" to={'/inst'} state={inst}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Home;
