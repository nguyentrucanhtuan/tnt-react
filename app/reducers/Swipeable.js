import {
  MENU_SWIPEABLE_SET,
  MENU_SWIPEABLE_RESET
} from '../actions/swipeable'

const initState = true

export default (state = initState, action) => {
  switch (action.type) {
    case MENU_SWIPEABLE_SET: {
      return action.swipeable
    }
    case MENU_SWIPEABLE_RESET: {
      return initState
    }
    default: {
      return state
    }
  }
}
