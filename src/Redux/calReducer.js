const initialState = {
  display_date: new Date(),
  organizations_selected: [],
  categories_selected: [],
  locations_selected: [],
  checked_free: false,
  checked_fav: false,
  changed_view: false,
  view: 'month'
}

const calReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeToDetails':
      return action.payload
    default:
      return state
  }
}

export default calReducer