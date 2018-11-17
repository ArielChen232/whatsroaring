const initialEventState = {
  title: '', 
  start: null, 
  end: null,
  desc: '',
  location: '',
  website: '',
  org: '',
  is_free: false
}

const eventReducer = (state = initialEventState, action) => {
  switch (action.type) {
    case 'changeToDetails':
      console.log('Reduced event')
      console.log('Event title: ' + action.payload.title)
      return action.payload
    default:
      return state
  }
}

export default eventReducer