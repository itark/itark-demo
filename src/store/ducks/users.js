import Immutable from 'seamless-immutable';

export const Types = {
  GET_ALL_USERS_REQUEST: 'users/GET_ALL_USERS_REQUEST',
  GET_ALL_USERS_SUCCESS: 'users/GET_ALL_USERS_SUCCESS',
  GET_ALL_USERS_FAILURE: 'users/GET_ALL_USERS_FAILURE',
};

const initialState = Immutable({
  isDishesEmpty: false,
  loading: false,
  dishDetail: {},
  error: false,
  dishes: [],
});

export const Creators = {
  requestAllUsers: () => ({
    type: Types.GET_ALL_USERS_REQUEST,
  }),

  requestAllUsersSuccess: data => ({
    type: Types.GET_ALL_USERS_SUCCESS,
    payload: { data },
  }),

  requestAllUsersFailure: () => ({
    type: Types.GET_ALL_USERS_FAILURE,
  }),  

};

const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isDishesEmpty: false,
        loading: true,
        error: false,
      };

    case Types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isDishesEmpty: payload.data.length === 0,
        dishes: payload.data,
        loading: false,
      };

    case Types.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };


    default:
      return state;
  }
};

export default users;
