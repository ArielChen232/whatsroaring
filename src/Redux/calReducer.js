const initialState = {
  display_date: new Date(),
  organizations: [],
  categories: [],
  locations: [],
  changed_view: false,
}

const calReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeToDetails':
      console.log('Reduced cal')
      return action.payload
    default:
      return state
  }
}

export default calReducer