import axios from "axios";
const baseUrl = 'api/persons';

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then(res => res.data);
}

const create = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then(res => res.data);
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const update = (id, changedPerson) => {
  const req = axios.put(`${baseUrl}/${id}`, changedPerson);
  return req.then(res => res.data);
}

const personService = {
  getAll,
  create,
  remove,
  update
}

export default personService;