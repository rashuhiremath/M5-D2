import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const blogRouter = express.Router();

const currentFilePath = fileURLToPath(import.meta.url);
const parentFolderPath = dirname(currentFilePath);
const blogJsonPath = join(parentFolderPath, "blog.json");

// post
blogRouter.post("/", (req, res) => {
  console.log(req.body);

  const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() };
  console.log(newAuthor);

  const authors = JSON.parse(fs.readFileSync(blogJsonPath));

  authors.push(newAuthor);

  fs.writeFileSync(blogJsonPath, JSON.stringify(authors));

  res.status(201).send({ id: newAuthor.id });
})

//delete

blogRouter.delete("/:authorId", (req, res) => {
    
    
    const authors = JSON.parse(fs.readFileSync(blogJsonPath))
  
   
    const remainingAuthor = authors.filter(author => author.id !== req.params.authorId) 
  
    
    fs.writeFileSync(blogJsonPath, JSON.stringify(remainingAuthor))
  
   
    res.status(204).send()
  })

  //get
  blogRouter.get("/",(req, res) => {
      const authors = fs.readFileSync(blogJsonPath)
      console.log(JSON.parse(authors))
      const authorsArray = JSON.parse(authors)
      res.send(authorsArray)
  })

  //get by id

  blogRouter.get("/:authorId", (req, res) =>{
      const authors = JSON.parse(fs.readFileSync(blogJsonPath))
      const author = authors.find(auth => auth.id === req.params.authorId)
      res.send(author)

  })
  
  // put
  blogRouter.put("/:authorId", (req, res) =>{
    const authors = JSON.parse(fs.readFileSync(blogJsonPath))
    const index = authors.findIndex(auth => auth.id === req.params.authorId)
    const editedAuthor = {...authors[index], ...req.body}
    authors[index] = editedAuthor
    fs.writeFileSync(blogJsonPath, JSON.stringify(authors))
    res.send(editedAuthor)
})
export default blogRouter
