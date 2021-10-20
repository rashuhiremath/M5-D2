import express from "express"
import listEndpoints from "express-list-endpoi

import blogRouter from "./blog/index.js"

const server = express()



server.use(express.json()) 

server.use("/authors", blogRouter) 
//server.use("/blogs", blogRouter)

const port = 3001

console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server running on port:", port)
})
