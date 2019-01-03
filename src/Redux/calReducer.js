const initialState = {
  month: new Date(),
  organizations: [],
  categories: [],
  locations: [],
  checked_free: false,
  checked_fav: false,
  changed_view: false,
}

const calReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeToDetails':
      console.log('Reduced cal')
      console.log('Checked free: ' + action.payload.checked_free)
      return action.payload
    default:
      return state
  }
}

export default calReducer