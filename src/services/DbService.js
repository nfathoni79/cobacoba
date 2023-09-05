import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://cobacoba-cc24.restdb.io',
  headers: {
    Accept: 'application/json',
    'x-apikey': import.meta.env.VITE_DB_API_KEY || '', 
  },
})

const getTree = (id) => {
  return apiClient.get(`/rest/trees/${id}?metafields=true`)
}

const getTrees = () => {
  return apiClient.get('/rest/trees?metafields=true')
}

const createTree = (tree) => {
  return apiClient.post('/rest/trees', tree)
}

export default {
  getTree,
  getTrees,
  createTree,
}