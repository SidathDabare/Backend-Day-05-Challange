/** @format */

import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import { join } from "path"
import authorsRouter from "./apis/authors/index.js"
import postsRouter from "./apis/blogPosts/index.js"
import {
  badRequestHandler,
  notFoundHandler,
  unauthorizedHandler,
  genericServerErrorHandler,
} from "./errorHandlers.js"
import filesRouter from "./apis/files/index.js"

const server = express()
const port = 3001
const publicFolderPath = join(process.cwd(), "./public")

const loggerMiddleware = (req, res, next) => {
  console.log(
    `Request method: ${req.method} -- Request URL: ${req.url} -- ${new Date()}`
  )
  console.log("Req body: ", req.body)
  // const check = true
  // if (check) {
  //   res.status(400).send({ message: "ERRORRRRRRRRRRRRR" })
  // } else {
  //   next()
  // }
  next()
}
server.use(express.static(publicFolderPath))
server.use(cors()) // If you want to connect FE to this BE you must use cors middleware
server.use(loggerMiddleware) // GLOBAL MIDDLEWARE
server.use(express.json()) // GLOBAL MIDDLEWARE If you don't add this line BEFORE the endpoints all requests'bodies will be UNDEFINED

// server.use(express.json())
server.use("/authors", authorsRouter)
server.use("/posts", loggerMiddleware, postsRouter)
server.use("/file", filesRouter)

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericServerErrorHandler)

server.listen(port, () => {
  console.table(listEndpoints(server))
  console.log("port", port)
})
