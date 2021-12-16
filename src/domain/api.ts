import axios from 'axios'
import { Comment, Post, User } from 'src/domain/types'
import { getRandomPhoto } from './utils'

const client = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })

export async function getUsers() {
  const response = await client.get<User[]>('/users')
  return response.data.map((user, index) => ({ ...user, photo: getRandomPhoto(index) }))
}

export async function getPosts(userId: number) {
  const response = await client.get<Post[]>(`/users/${userId}/posts`)
  return response.data
}

export async function getComments(postId: number) {
  const response = await client.get<Comment[]>(`/posts/${postId}/comments`)
  return response.data
}
