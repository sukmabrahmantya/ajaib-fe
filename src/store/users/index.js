import {
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_ROWS_LOADING,
  GET_ROWS_SUCCESS
} from './types';
import axios from 'axios'

export const getUsers = ({ page, limit }) => {
  return dispatch => {
    dispatch({ type: GET_USERS_LOADING });

    axios
      .get(`https://randomuser.me/api/?results=100&inc=login,name,email,gender,registered`)
      .then(({ data }) => {
        const rows = data.results.slice((page - 1) * limit, page * limit);
        dispatch({ 
          type: GET_USERS_SUCCESS, 
          payload: {
            users: data,
            rows: rows
          } 
        });
      }).catch(err => {
        dispatch({ 
          type: GET_USERS_ERROR, 
          error: err.message 
        })
      })
  }
}

export const getRowsUsers = (filters) => {
	return dispatch => {
		dispatch({ type: GET_ROWS_LOADING });
		setTimeout(() => {
			dispatch({ 
				type: GET_ROWS_SUCCESS, 
				payload: filters
			});
		}, 2000)
	}
}