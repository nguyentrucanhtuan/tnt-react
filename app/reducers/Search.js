import {
  SEARCH_TOGGLE,
  SEARCH_OPEN,
  SEARCH_CLOSE
} from '../actions/search'

const initState = false

export default (state = initState, action) => {
  switch (action.type) {
    case SEARCH_TOGGLE: {
      return !state
    }
    case SEARCH_OPEN: {
      return true
    }
    case SEARCH_CLOSE: {
      return false
    }
    default: {
      return state
    }
  }
}
