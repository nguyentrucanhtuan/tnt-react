/**
 * Created by Luan on 10/26/2016.
 */
import {
  SELECT_CATEGORY_ORDER,
  REQUEST_CATEGORIES_ORDER,
  RECEIVE_CATEGORIES_ORDER,
  CATEGORIES_FAILURE_ORDER
} from './actions'

function categoryOrderReducer(state = {}, action) {
  switch (action.type) {
      case SELECT_CATEGORY_ORDER:
          return Object.assign({}, state, {
              selectedCategoryId: action.selectedCategoryId,
              selectedCategoryName: action.selectedCategoryName
          })
      case REQUEST_CATEGORIES_ORDER:
          return Object.assign({}, state, {
              isFetching: true,
          })
      case RECEIVE_CATEGORIES_ORDER:
          return Object.assign({}, state, {
              isFetching: false,
              categories: [
                  ...state.categories,
                  ...action.categories
              ]
          })
      case CATEGORIES_FAILURE_ORDER:
          return Object.assign({}, state, {
              isFetching: false,
              error: action.error,
          })
      default:
          return state
  }
}

export default function CategoryOrder(state = {
    isFetching: false,
    categories: [],
    selectedCategoryId: undefined,
    selectedCategoryName: ''
}, action) {
    return categoryOrderReducer(state, action);
}
