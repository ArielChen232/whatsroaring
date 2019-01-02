const initialState = {
  display_date: new Date(),
  organizations: [],
  categories: [],
  changed_view: false,
}

const calReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeToDetails':
      console.log('Reduced cal')
      console.log('changed view: ' + action.payload.changed_view)
      return action.payload
    default:
      return state
  }
}

export default calReducer