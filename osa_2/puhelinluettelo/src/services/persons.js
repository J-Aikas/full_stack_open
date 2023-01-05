import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl)

const create = newObject => axios.post(baseUrl, newObject)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`)

const personService = { getAll, create, update, deletePerson }

export default personService