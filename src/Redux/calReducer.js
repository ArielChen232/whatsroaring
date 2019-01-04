const initialState = {
  month: new Date(),
  organizations_selected: [],
  categories_selected: [],
  locations_selected: [],
  checked_free: false,
  checked_fav: false,
  changed_view: false,
}

const calReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeToDetails':
      console.log('Reduced cal')
      console.log('Selected: ' + action.payload.categories_selected)
      return action.payload
    default:
      return state
  }
}

export default calReducer