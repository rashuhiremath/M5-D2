import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors";
import { notFound, forbidden, catchAllErrorHandler } from "./new blog/errorHandle.js"
import blogRouter from "./blog/index.js"
import router from "./new blog/index.js";

const server = express()
const port = process.env.PORT


const whitelist = [process.env.FE_LOCAL_URL,process.env.FE_PROD_URL]// 
const corsOpts = {
  origin: function (origin, next) {
   
    console.log("CURRENT ORIGIN: ", origin)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      
      next(null, true)
    } else {
     
      next(new Error("CORS ERROR"))
    }
  },
}



server.use(express.json()) 
server.use(cors(corsOpts));

server.use("/authors", blogRouter) 
server.use("/blogs", router)


server.use(notFound);

server.use(forbidden);

server.use(catchAllErrorHandler);



console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server running on port:", port)
})
