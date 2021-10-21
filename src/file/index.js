import express from "express"
import multer from "multer"

const filesRouter = express.Router()

filesRouter.post("/uploadSingle", multer().single("profilePic"), async (req, res, next) => {
  try {
    console.log(req.file)

    await saveStudentsPictures(req.file.originalname, req.file.buffer)
    res.send("ok")
  } catch (error) {
    next(error)
  }
})

filesRouter.post("/uploadMultiple", multer().array("profilePic"), async (req, res, next) => {
  try {
    console.log(req.files)

    const arrayOfPromises = req.files.map(file => saveStudentsPictures(file.originalname, file.buffer))
    await Promise.all(arrayOfPromises)
    res.send("OK")
  } catch (error) {
    next(error)
  }
})

export default filesRouter
