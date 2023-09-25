import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingImg from "../assets/img/loadings.gif";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [studentData, setStudentData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewStudent, setViewStudent] = useState([])

  const getStudetsData = async () => {
    setLoading(true);
    try {
      const resData = await axios.get(
        "http://localhost:3001/api/view-all-student"
      );
      setFilteredUsers(resData.data.Data);
      if (resData.status >= 201 && resData.status < 301) {
        if (resData.data.Data) {
          setStudentData(resData.data.Data);
        }
      } else {
        console.log("Server returned an error:");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deletStudentData = async (id) => {
    const studentData = id;
    try {
      const resData = await axios.post(
        `http://localhost:3001/api/delete-student/${studentData}`
      );
      if (resData.status >= 201 && resData.status < 301) {
        getStudetsData();
      } else {
        console.log("Server returned an error:");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewDetailes = async (studentId) =>{
    try {
      const res = await axios.get(`http://localhost:3001/api/view-student/${studentId}`);
      if (res.status >= 201 && res.status < 301) {
        setViewStudent(res.data.Data)
      } else {
        console.log("Server returned an error:");
      }
    } catch (error) {
      console.log(error)
    }
   
  }



  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const searchStudentData = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = studentData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery)
    );
    setFilteredUsers(filteredData);
  };

  const formattedDate = (e) => {
    var d = new Date(e),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("/");
  };

  useEffect(() => {
    getStudetsData();
  }, []);





  return (
    <>
      <div className="mainPageSection">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-12 m-auto mt-5 mb-2">
              <div className="topBarSec">
                <div className="topBarhdng">
                  <h2>
                    All Students <span>({studentData.length})</span>
                  </h2>
                </div>
                <div className="topBarAction">
                  <input
                    type="search"
                    placeholder="Search students..."
                    onChange={searchStudentData}
                  />
                  <Link to="/add-student" className="addBtn">
                    <i className="fa fa-plus" aria-hidden="true"></i> Add
                    Student
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-12 m-auto  mb-5">
              <div className="mainSection">
                <table>
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Email ID</th>
                      <th>Date of Birth</th>
                      <th>Qualificatios</th>
                      <th>Residence Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td
                          style={{ textAlign: "center" }}
                          className="loadingIm"
                        >
                          <img src={LoadingImg} alt="loading" />
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{ textAlign: "center" }}>
                          <h5>Error trying to retrieve students data!.</h5>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    ) : (
                      filteredUsers.map((val, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="userdata" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>viewDetailes(val.id)} >
                                <div className="userImg">
                                  <img
                                    src={`http://localhost:3001${val.student_img}`}
                                    alt="user"
                                  />
                                </div>
                                {val.name}
                              </div>
                            </td>
                            <td>{val.email}</td>
                            <td>{formattedDate(val.dob)}</td>
                            <td>{val.qualification}</td>
                            <td className="addressCls"><p>{val.address}</p></td>
                            <td>
                            <Link to={`/update-student/${val.id}`}>
                                <i
                                  className="fa fa-pencil-square-o"
                                  aria-hidden="true"
                                ></i>
                             </Link>
                              <button onClick={() => deletStudentData(val.id)}>
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                View Students Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >X</button>
            </div>
            <div className="modal-body">
           
            {viewStudent.map((value, index)=>{
                return(
                  <div className="row" key={index}>
                    <div className="col-md-4">
                      <div className="studentImage">
                        <img src={`http://localhost:3001${value.student_img}`} alt={value.name}/>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="studentDetailes">
                        <ul>
                          <li style={{textTransform: "capitalize"}}><span>Name:</span> {value.name}</li>
                          <li><span>Email ID:</span> {value.email}</li>
                          <li><span>Date of Birth:</span> {formattedDate(value.dob)}</li>
                          <li><span>Qualificatios:</span> {value.qualification}</li>
                          <li><span>Residence Address:</span> {value.address}</li>
                        </ul>
                      </div>
                    </div>
              </div>
                )
              })}
          

            <div className="modal-footer">
            {viewStudent.map(vals => {return <a key={vals} href={`http://localhost:3001${vals.student_marksheet}`} className="addBtn" target="_blank" rel="noreferrer">View File</a>})}
          
            {/* {viewStudent.map((vals, id)=>{
              return(
              <a key={id} href={`http://localhost:3001${vals.student_marksheet}`} className="addBtn" target="_blank" rel="noreferrer">View File</a>)}
              )
            } */}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default MainPage;
