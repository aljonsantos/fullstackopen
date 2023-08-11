import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    number: ''
  })
  const [filter, setFilter] = useState('');
  const [notif, setNotif] = useState({
    msg: null,
    type: ''
  });

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {...formData}
    const oldPerson = persons.find(person => person.name === newPerson.name);

    if (oldPerson) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, update the old number to with a new one?`)) {
        const changedPerson = {...oldPerson, number: newPerson.number}
        personService
          .update(oldPerson.id, changedPerson)
          .then(retPerson => {
            setPersons(persons.map(person => person.id === oldPerson.id ? retPerson : person))
            setNotif({ msg: `${retPerson.name} number updated`, type: 'success'})
            setFormData({
              name: '',
              number: ''
            })
          })
          .catch(err => {
            setNotif({ msg: `Information ${newPerson.name} has already been removed from the server`, type: 'error' })
            setPersons(persons.filter(person => person.id !== oldPerson.id))
          })
      }
      return;
    }
    else {
      personService
        .create(newPerson)
        .then(retPerson => {
          setPersons([...persons, retPerson])
          setNotif({ msg: `${retPerson.name} added to phonebook`, type: 'success'})
          setFormData({
            name: '',
            number: ''
          })
        })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then((res) => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const Header = ({ text }) => {
    return <h1>{text}</h1>
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Notification data={notif} setNotif={setNotif} />
      <Filter value={filter} handleChange={handleFilterChange}/>
      <br />
      <h3>Add a new</h3>
      <PersonForm key='form' formData={formData} handleSubmit={handleSubmit} handleChange={handleFormChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;
