const db = require("../config/db");
const path = require("path");
require("dotenv").config({ path: "./.env" });

var StudentsData = function (data) {};

StudentsData.addStudent = async function (postdata, files) {
  return new Promise((resolve, reject) => {
    const studentImag = files.image[0];
    const studentPdfFile = files.pdf[0];
    const student_img = "/uploads/images/" + studentImag.filename;
    const student_marksheet = "/uploads/pdfs/" + studentPdfFile.filename;

    try {
      var insertdata = {
        name: postdata.name ? postdata.name : "",
        email: postdata.email ? postdata.email : "",
        dob: postdata.dob ? postdata.dob : "",
        address: postdata.address ? postdata.address : "",
        qualification: postdata.qualification ? postdata.qualification : "",
        student_img: student_img,
        student_marksheet: student_marksheet,
      };
      var checkQuery = "SELECT email FROM student_data WHERE email = ?";
      db.query(checkQuery, [insertdata.email], (err, rows) => {
        if (err) {
          return reject(err);
        }
        if (rows.length > 0) {
          return resolve("Student email already exists");
        } else {
          var insertQuery = "INSERT INTO student_data SET ?";
          db.query(insertQuery, insertdata, (err, res) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(res);
            }
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

StudentsData.deletedStudent = async function (postdata) {
  return new Promise((resolve, reject) => {
    const userId = postdata;
    const queryString = "DELETE FROM student_data WHERE id = ?";
    const filter = [userId];
    db.query(queryString, filter, function (err, res) {
      if (err) {
        return reject(err);
      } else {
        if (res.affectedRows === 0) {
          return reject("Data was not found");
        }
        return resolve(res);
      }
    });
  });
};

StudentsData.changeStudentData = async function (postdata, files) {
  return new Promise(async (resolve, reject) => {
    let student_img;
    let student_marksheet;
    
    if (files.image || files.pdf) {
      
      if (files?.image?.length > 0) {
        const studentImag = files?.image[0];
        student_img = "/uploads/images/" + studentImag.filename;
      }

      if (files?.pdf?.length > 0) {
        const studentPdfFile = files?.pdf[0];
        student_marksheet = "/uploads/pdfs/" + studentPdfFile.filename;
      }
    }
    var updatedvalues = {
      id: postdata.id,
      name: postdata.name,
      email: postdata.email,
      address: postdata.address,
      qualification: postdata.qualification,
      dob: postdata.dob,
    };
    if (student_img) {
      updatedvalues.student_img = student_img;
    }
    if (student_marksheet) {
      updatedvalues.student_marksheet = student_marksheet;
    }
    var queryString = "update student_data set ? where id = ?";
    var filter = [updatedvalues, postdata.id];
    db.query(queryString, filter, function (err, res) {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
};

module.exports = StudentsData;
