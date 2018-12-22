const initialState = {
  display_date: new Date()
}

const calReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeToDetails':
      console.log('Reduced cal')
      console.log('Display date: ' + action.payload.display_date)
      return action.payload
    default:
      return state
  }
}

export default calReducer