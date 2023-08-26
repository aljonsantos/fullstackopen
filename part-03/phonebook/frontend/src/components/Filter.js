const Filter = ({ value, handleChange }) => {
  return (
    <div>
      search: <input type="text" value={value} onChange={handleChange}/>
    </div>
  )
}

export default Filter;