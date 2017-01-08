export const AUTH_OPEN = 'AUTH_OPEN'
export const AUTH_CLOSE = 'AUTH_CLOSE'
export const AUTH_TOGGLE = 'AUTH_TOGGLE'
export const AUTH_SET = 'AUTH_SET'

export const setAuth = authType => {
  return {
    type: AUTH_SET,
    authType : authType
  }
}
export const openAuth = () => {
  return {
    type: AUTH_OPEN
  }
}

export const closeAuth = () => {
  return {
    type: AUTH_CLOSE
  }
}

export const toggleAuth = () => {
  return {
    type: AUTH_TOGGLE
  }
}
