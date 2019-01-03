const initialState = {
  month: new Date(),
  organizations: [],
  categories: [],
  locations: [],
  changed_view: false,
}

const calReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeToDetails':
      console.log('Reduced cal')
      console.log('Month: ' + action.payload.month)
      return action.payload
    default:
      return state
  }
}

export default calReducer