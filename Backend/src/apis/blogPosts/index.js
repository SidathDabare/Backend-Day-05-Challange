/** @format */

import express from "express"
// import { fileURLToPath } from "url"
// import { dirname, join } from "path"
// import fs from "fs"
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { checkPostSchema, checkValidationResult } from "./validation.js"
import { getPosts, writePosts } from "../../lib/fs-tools.js"

const postsRouter = express.Router()

// const blogPostsJSONPath = join(
//   dirname(fileURLToPath(import.meta.url)),
//   "blogPost.json"
// )

// const getPosts = () => JSON.parse(fs.readFileSync(blogPostsJSONPath))
// const writePosts = (postsArray) =>
//   fs.writeFileSync(blogPostsJSONPath, JSON.stringify(postsArray))

postsRouter.post(
  "/",
  checkPostSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const newPosts = { ...req.body, createdAt: new Date(), id: uniqid() }
      const posts = await getPosts()

      posts.push(newPosts)
      await writePosts(posts)
      res.status(201).send({ id: newPosts.id })
    } catch (error) {
      next(error)
    }
  }
)

postsRouter.get("/", async (req, res, next) => {
  try {
    //console.log("QUERY: ", req.query)
    const posts = await getPosts()
    if (req.query && req.query.category) {
      const filterPosts = posts.filter(
        (post) =>
          post.category.toLowerCase() === req.query.category.toLowerCase()
      )
      res.send(filterPosts)
    } else {
      res.send(posts)
    }
  } catch (error) {
    next(error)
  }
})

postsRouter.get("/:Id", async (req, res, next) => {
  try {
    const posts = await getPosts()
    const foundPosts = posts.find((post) => post.id === req.params.Id)
    res.send(foundPosts)
  } catch (error) {
    next(error)
  }
})

postsRouter.put("/:Id", async (req, res, next) => {
  try {
    const posts = await getPosts()
    const index = posts.findIndex((post) => post.id === req.params.Id)
    const oldPost = posts[index]
    const updatedPost = { ...oldPost, ...req.body, updatedAt: new Date() }
    posts[index] = updatedPost
    await writePosts(posts)
    res.send(updatedPost)
  } catch (error) {
    next(createHttpError(404, `Post with id ${req.params.Id} not found!`))
  }
})

postsRouter.delete("/:Id", async (req, res, next) => {
  try {
    const posts = await getPosts()
    const remainingPosts = posts.filter((post) => post.id !== req.params.Id)
    await writePosts(remainingPosts)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default postsRouter
