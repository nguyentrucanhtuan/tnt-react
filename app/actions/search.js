export const SEARCH_OPEN = 'SEARCH_OPEN'
export const SEARCH_CLOSE = 'SEARCH_CLOSE'
export const SEARCH_TOGGLE = 'SEARCH_TOGGLE'

export const openSearch = () => {
  return {
    type: SEARCH_OPEN
  }
}

export const closeSearch = () => {
  return {
    type: SEARCH_CLOSE
  }
}

export const toggleSearch = () => {
  return {
    type: SEARCH_TOGGLE
  }
}
