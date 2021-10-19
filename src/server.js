import express from "express"
import listEndpoints from "express-list-endpoints"


import blogRouter from "./blog/index.js"

const server = express()

server.use(express.json()) // If I do NOT specify this line BEFORE the endpoints, all the requests' bodies will be UNDEFINED

// ************************ ENDPOINTS **********************

server.use("/authors", blogRouter) // all of the endpoints which are in the studentsRouter will have /students as a prefix

const port = 3001

console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server running on port:", port)
})
