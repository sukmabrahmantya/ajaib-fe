

export function getUsers() {
  return dispatch => {
    dispatch({ type: 'GET_USERS_PENDING' })
  }
}