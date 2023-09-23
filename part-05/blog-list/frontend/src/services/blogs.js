import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const get = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const update = async (id, updatedBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return res.data
}

const like = async (id) => {
  const blog = await get(id)

  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  const res = update(id, updatedBlog)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { 
  get,
  getAll,
  create,
  update,
  like,
  remove,
  setToken,
}