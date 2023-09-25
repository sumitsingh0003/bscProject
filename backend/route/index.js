const express = require("express");
const studentController = require("../controller/studentsController");
const studentValidaion = require("../validation/studentValidaion");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
var router = express.Router();

router.get("/", (req, res) => {
  res.send("api vala route");
});

// const ensureDirectoryExists = (directory) => {
//   const dir = path.join(__dirname, directory);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = file.fieldname === "image" ? "./public/uploads/images" : "./public/uploads/pdfs";
      // ensureDirectoryExists(folder);
    cb(null, `./${folder}`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
    files: 2,
  },
});

// All API's Routes
router.post(
  "/add-student",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  studentValidaion.addStudent,
  studentController.addStudentData
);

router.get("/view-all-student", studentController.getAllStudentData);
router.get("/view-student/:id", studentController.getSingleStudentData);
router.post("/delete-student/:id", studentController.deleteStudentdata);

router.post(
  "/updated-student",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  studentValidaion.addStudent,
  studentController.updatedStudentData
);

module.exports = router;
