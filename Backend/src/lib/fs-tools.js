/** @format */

import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs-extra"

const { readJSON, writeJSON, writeFile } = fs

//const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
console.log(dataFolderPath)
const authorsJSONPath = join(dataFolderPath, "authors.json")
const blogPostsJSONPath = join(dataFolderPath, "blogPost.json")
const authorsPublicFolderPath = join(
  process.cwd(),
  "../Backend/public/img/authors"
)
const blogPostsPublicFolderPath = join(
  process.cwd(),
  "../Backend/public/img/blogPosts"
)
console.log(authorsPublicFolderPath)
//export const getUsers = () => readJSON(usersJSONPath)
//export const writeUsers = (usersArray) => writeJSON(usersJSONPath, usersArray)
export const getPosts = () => readJSON(blogPostsJSONPath)
export const writePosts = (postArray) => writeJSON(blogPostsJSONPath, postArray)

export const saveAuthorsAvatars = (fileName, contentAsABuffer) =>
  writeFile(join(authorsPublicFolderPath, fileName), contentAsABuffer)
export const saveBlogPosts = (fileName, contentAsABuffer) =>
  writeFile(join(blogPostsPublicFolderPath, fileName), contentAsABuffer)
