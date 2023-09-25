var db = require("../config/db");
var studentsModel = require("../model/sudentsModel");

exports.addStudentData = async function (req, res) {
  try {
    db.beginTransaction();
    var data = await studentsModel.addStudent(req.body, req.files);
    if (data.insertId) {
      db.commit();
      res.status(201).json({ message: "Student Add Successfull", Data: req.body });

    } else if ("Student email already exists") {
      db.rollback();
      res.status(401).json({ message: "Student email already exists" });

    } else {
      db.rollback();
      res.status(404).json({ message: "failed to insert data", Data: req.body });
    }
  } catch (error) {
    db.rollback();
    res.status(500).json({ message: "operation failed" });
  }
};

exports.getAllStudentData = async (req, res) => {
  try {
    db.query("SELECT * FROM student_data ORDER BY id asc",
      function (err, data) {
        if (err) {
          res.status(500).send({ error: "Data not Found" });
        } else {
          res.status(201).send({ message: "All Students Data", Data: data });
        }
      }
    );
  } catch (error) {
    db.rollback();
    res.status(401).json({ error: "Data Error" });
  }
};

exports.getSingleStudentData = async (req, res) => {
  const studentId = req.params.id;
  try {
    db.query("SELECT * FROM student_data WHERE id = ?",
      [studentId],
      function (err, data) {
        if (err) {
          res.status(500).send({ error: "Data not Found" });
        } else {
          res.status(201).send({ message: "Students Data", Data: data });
        }
      }
    );
  } catch (error) {
    db.rollback();
    res.status(401).json({ error: "Data Error" });
  }
};

exports.deleteStudentdata = async (req, res) => {
  const studentId = req.params.id;
  try {
    db.beginTransaction();
    var deletedData = await studentsModel.deletedStudent(studentId);
    if (deletedData.affectedRows) {
      db.commit();
      res.status(201).json({ message: "Student Deleted Successfull" });
    } else {
      db.rollback();
      res.status(401).json({ error: "Datas Errorsssss" });
    }
  } catch (error) {
    db.rollback();
    res.status(401).json({ error: error });
  }
};

exports.updatedStudentData = async function (req, res) {
  try {
    db.beginTransaction();
    var studentData = await studentsModel.changeStudentData(req.body, req.files);
    if (studentData.affectedRows) {
      db.commit();
      res.status(201).json({message: "Student data has been changed successfull", data: req.body,});
    } else {
      db.rollback();
      res.status(401).json({ message: "Student Data has not updated" });
    }
  } catch (error) {
    db.rollback();
    res.status(401).json({ error: error });
  }
};
