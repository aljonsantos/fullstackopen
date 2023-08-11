const Persons = ({ filter, persons, handleDelete }) => {
  return (
    <ul>
      {persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => 
          <li key={person.id}>
            <b>{person.name}</b> 
            {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </li>
      )}
    </ul>
  )
}

export default Persons;