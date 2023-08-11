const PersonForm = ({ formData, handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input key='name' name='name' value={formData.name} onChange={handleChange}/><br />
        number: <input key='number' name='number' value={formData.number} onChange={handleChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;