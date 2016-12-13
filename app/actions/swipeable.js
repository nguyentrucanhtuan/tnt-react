
export const MENU_SWIPEABLE_SET = 'MENU_SWIPEABLE_SET'
export const MENU_SWIPEABLE_RESET = 'MENU_SWIPEABLE_RESET'

export const setSwipeable = swipeable => {
  return {
    type: MENU_SWIPEABLE_SET,
    swipeable
  }
}

export const resetSwipeable = () => {
  return {
    type: MENU_SWIPEABLE_RESET
  }
}
