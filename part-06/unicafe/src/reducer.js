const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)

  const incrementProp = (key) => {
    return {...state, [key]: state[key] + 1}
  }

  switch (action.type) {
    case 'GOOD':
      return incrementProp('good')
    case 'OK':
      return incrementProp('ok')
    case 'BAD':
      return incrementProp('bad')
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
