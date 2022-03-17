import {
	GET_USERS_LOADING,
	GET_USERS_SUCCESS,
	GET_USERS_ERROR,
	GET_ROWS_LOADING,
	GET_ROWS_SUCCESS,
	GET_ROWS_ERROR
} from './types'

const initialState = {
	loading: false,
	users: {
		info: { results: 0 },
		results: []
	},
	rows: [],
	filters: {
		page: 1,
		gender: 'all',
		keyword: '',
		limit: 10,
	},
	total: null,
	error: ''
};

const users = (state = initialState, action) => {
	switch(action.type){
		case GET_USERS_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.payload.users,
				rows: action.payload.rows,
				total: action.payload.users.info.results
			};
		case GET_USERS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case GET_ROWS_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_ROWS_SUCCESS:
			const { page, gender, keyword, limit } = action.payload;
			let filters = {
				page: page || state.filters.page,
				gender: gender || state.filters.gender,
				keyword: keyword || state.filters.keyword,
				limit: limit || state.filters.limit,
			};

			let tempData = [];
			let rows = [];
			let isFilter = false;

			// keyword && !all
			if (keyword !== '' && gender !== 'all') {
				console.log(`Filters 1 == keyword: ${keyword} | gender : ${gender}`)
				tempData = state.users.results.filter((el) => 
					(el.login.username == keyword ||
					el.name.title == keyword ||
					el.name.first == keyword ||
					el.name.last == keyword ||
					el.email == keyword) &&
					el.gender === gender);
				rows = tempData.slice((page - 1) * limit, page * limit);
				isFilter = true;

			// keyword && all
			} else if (keyword !== '' && gender === 'all') {
				console.log(`Filters 2 == keyword: ${keyword} | gender : ${gender}`)
				tempData = state.users.results.filter((el) => 
					el.login.username == keyword ||
					el.name.title == keyword ||
					el.name.first == keyword ||
					el.name.last == keyword ||
					el.email == keyword);
				rows = tempData.slice((page - 1) * limit, page * limit);
				isFilter = true;

			// !keyword && all
			} else if (keyword === '' && gender === 'all') {
				console.log(`Filters 3 == keyword: ${keyword} | gender : ${gender}`)
				rows = state.users.results.slice((page - 1) * limit, page * limit);

			// !keyword && !all
			} else {
				console.log(`Filters 4 == keyword: ${keyword} | gender : ${gender}`)
				tempData = state.users.results.filter((el) => el.gender === gender);
				rows = tempData.slice((page - 1) * limit, page * limit);
				isFilter = true;

			}

			return {
				...state,
				loading: false,
				rows,
				filters,
				total: isFilter ? tempData.length : state.users.info.results
			};
		case GET_ROWS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			};
		default: 
			return state;
	}
};

export default users;