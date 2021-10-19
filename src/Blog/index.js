
import express from "express"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

const blogRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const blogJsonPath = join(parentFolderPath,"blog.json")

// post
blogRouter.post("/", (req, res) => {
    
    console.log(req.body)
  
    const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() }
    console.log(newAuthor)
  
    // 2. Read the file content obtaining the students array
    const authors = JSON.parse(fs.readFileSync(blogJsonPath))
  
    // 3. Add new student to the array
    students.push(newStudent)
  
    // 4. Write the array back to the file
    fs.writeFileSync(studentsJSONPath, JSON.stringify(students))
  
    // 5. Send back a proper response
  
    res.status(201).send({ id: newStudent.id })
  })
  


export default blogRouter