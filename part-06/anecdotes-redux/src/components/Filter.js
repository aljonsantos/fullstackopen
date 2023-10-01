import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      filter
      <input
        type="text"
        onChange={({ target }) => dispatch(filterChange(target.value))}
      />
    </div>
  )
}

export default Filter