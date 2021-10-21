import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors";
import { notFound, forbidden, catchAllErrorHandler } from "./new blog/errorHandle.js"
import blogRouter from "./blog/index.js"
import router from "./new blog/index.js";

const server = express()
const port = 3001



server.use(express.json()) 
server.use(cors());

server.use("/authors", blogRouter) 
server.use("/blogs", router)


server.use(notFound);

server.use(forbidden);

server.use(catchAllErrorHandler);



console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server running on port:", port)
})
