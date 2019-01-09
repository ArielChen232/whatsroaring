const initialEventState = {
  title: '', 
  start: null, 
  end: null,
  desc: '',
  loc: '',
  website: '',
  is_free: false,
  cat: null
}

const eventReducer = (state = initialEventState, action) => {
  switch (action.type) {
    case 'changeToDetails':
      return action.payload
    default:
      return state
  }
}

export default eventReducer