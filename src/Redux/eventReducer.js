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
      console.log('Reduced event')
      console.log('Event title: ' + action.payload.title)
      console.log('Event location: ' + action.payload.loc)
      return action.payload
    default:
      return state
  }
}

export default eventReducer