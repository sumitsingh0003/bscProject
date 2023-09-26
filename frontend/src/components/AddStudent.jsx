import { React, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();
  const [errData, setErrData] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldData, setFieldData] = useState({
    name: "",
    email: "",
    dob: "",
    qualification: "",
    address: "",
  });
  
  
  const [studnetImage, setStudentImage] = useState(null);
  const [studentPdf, setStudentPdf] = useState(null);

  

  const handleInput = (e) => {
    setFieldData({ ...fieldData, [e.target.name]: e.target.value });
  };

  const handleImgFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setStudentImage('')
      const fileSize = selectedFile.size / 1024; // in KB
      if (fileSize < 100 || fileSize > 1024) {
        return setErrorMessage("File size must be between 100KB and 1MB.");
      } else {
        setErrorMessage("");
      }
    }
    setStudentImage(selectedFile)
  };

  const handlePdfFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setStudentPdf('')
      const fileSize = selectedFile.size / 1024; // in KB
      if (fileSize < 100 || fileSize > 1024) {
        return setErrorMessage("File size must be between 100KB and 1MB.");
      } else {
        setErrorMessage("");
      }
    }
    setStudentPdf(selectedFile)
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const submitData = async (e) => {
    e.preventDefault();
    const { name, email, dob, qualification, address } = fieldData;
    if (
      !name ||
      !email ||
      !dob ||
      !qualification ||
      !address ||
      !studnetImage ||
      !studentPdf
    ) {
      return setErrData(true);
    }
    if (!isValidEmail(email)) {
      return setEmailError("Email is invalid");
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("dob", dob);
      formData.append("qualification", qualification);
      formData.append("address", address);
      formData.append("image", studnetImage);
      formData.append("pdf", studentPdf);
      
      const resData = await axios.post(
        "http://localhost:3001/api/add-student",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (resData.status >= 201 && resData.status < 301) {
        setFieldData({
          name: "",
          email: "",
          dob: "",
          qualification: "",
          address: ""
        });
        setEmailError("");
        navigate("/");
      } else {
        console.log("Server returned an error:", resData.data.message);
      }
    } catch (error) {
      if (error.response.data.message==="Student email already exists") {
        alert("This Student Allready Exist. Please Change the Email.")
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="addPageSection">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-6 m-auto mt-5 mb-5">
            <div className="registerFormHdng">
                <Link to="/" className="addBtn backBtn"><i className="fa fa-angle-left" aria-hidden="true"></i> Back to Home</Link>
              </div>
              <div className="registerFormHdng">
                <h2>Registration Form</h2>
              </div>
              <div className="formSection">
                {/* <h2>Add Student Detailes</h2> */}
                <form method="POST" encType="multipart/form-data">
                  <div className="fields">
                    <label htmlFor="name">
                      Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleInput}
                      value={fieldData.name}
                      required
                    />
                    {errData && fieldData.name.length === 0 ? (
                      <p className="errField">Please fill the field</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="fields">
                    <label htmlFor="email">
                      Email ID<span>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      onChange={handleInput}
                      value={fieldData.email}
                      required
                    />
                    {errData && fieldData.email.length === 0 ? (
                      <p className="errField">Please fill the field</p>
                    ) : (
                      ""
                    )}
                    <p className="errField">{emailError}</p>
                  </div>
                  <div className="fields">
                    <label htmlFor="dob">
                      Date of Birth<span>*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      onChange={handleInput}
                      value={fieldData.dob}
                      required
                    />
                    {errData && fieldData.dob.length === 0 ? (
                      <p className="errField">Please fill the field</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="fields">
                    <label htmlFor="qualification">
                      Qualifications<span>*</span>
                    </label>
                    <input
                      name="qualification"
                      id="qualification"
                      onChange={handleInput}
                      value={fieldData.qualification}
                      required
                    />
                    {errData && fieldData.qualification.length === 0 ? (
                      <p className="errField">Please fill the field</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="fields">
                    <label htmlFor="address">
                      Residence Address<span>*</span>
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      onChange={handleInput}
                      value={fieldData.address}
                    ></textarea>
                    {errData && fieldData.address.length === 0 ? (
                      <p className="errField">Please fill the field</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="fields">
                    <div className="files">
                      <div>
                        <label name="pdf-file" htmlFor="image">
                          Upload Student Profile <span>*</span>
                        </label>
                        <input
                          className="type_file"
                          name="image"
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImgFileInput}
                        />
                        {errData && studnetImage === null ? (
                          <p className="errField">Please select image</p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <label name="pdf-file" htmlFor="pdf">
                          Upload Marksheet <span>*</span>
                        </label>
                        <input
                          className="type_file"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          name="pdf"
                          id="pdf"
                          onChange={handlePdfFileInput}
                        />
                        {errData && studentPdf === null ? (
                          <p className="errField">Please select file</p>
                        ) : (
                          ""
                        )}
                        
                      </div>
                    </div>
                    <p className="errField upldMb"> {errorMessage}</p>
                  </div>

                  <div className="fields butn">
                    <button className="addBtn" onClick={submitData}>
                      Submit Form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
