/** @format */

import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

const authorsRouter = express.Router()

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
)
console.log("TARGET: ", authorsJSONPath)

// POST /authors => create a new author
authorsRouter.post("/", (req, res) => {
  console.log("BODY: ", req.body)

  const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() }
  console.log("New Author: ", newAuthor)

  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  authorsArray.push(newAuthor)

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

  res.status(201).send({ id: newAuthor.id })
})

authorsRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(authorsJSONPath)
  const authorsArray = JSON.parse(fileContent)
  res.send(authorsArray)
})
// GET /authors/123 => returns a single author
authorsRouter.get("/:Id", (req, res) => {
  const authorID = req.params.Id
  console.log(authorID)
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
  const foundAuthor = authorsArray.find((author) => author.id === authorID)
  res.send(foundAuthor)
})

// PUT /authors/123 => edit the author with the given id
authorsRouter.put("/:Id", (req, res) => {
  // 1. Read the file obtaining an array
  const authorArray = JSON.parse(fs.readFileSync(authorsJSONPath))
  const index = authorArray.findIndex((user) => user.id === req.params.Id)
  const oldAuthor = authorArray[index]
  const updateAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() }
  authorArray[index] = updateAuthor

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorArray))

  res.send(updateAuthor)
})
// DELETE /authors/123 => delete the author with the given id
authorsRouter.delete("/:Id", (req, res) => {
  const authorArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  const remainingAuthors = authorArray.filter(
    (author) => author.id !== req.params.Id
  )

  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))

  res.status(204).send()
})

export default authorsRouter
