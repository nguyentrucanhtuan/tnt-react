import {
  AUTH_TOGGLE,
  AUTH_OPEN,
  AUTH_CLOSE,
  AUTH_SET
} from '../actions/auth'

const initState = {
  isOpen : false,
  authType : 'login'
}

export default (state = initState, action) => {
  switch (action.type) {

    case AUTH_TOGGLE: {
      return {...state,
            isOpen: !state.isOpen
      }
    }
    case AUTH_OPEN: {
      return { ...state,
            isOpen: true
      }
    }
    case AUTH_CLOSE: {
      return {...state,
            isOpen: false
      }
    }

    case AUTH_SET: {
      return { ...state,
            isOpen: true,
            authType : action.authType
      }
    }
    default: {
      return state
    }
  }
}
