import { call, put } from 'redux-saga/effects';

import { Creators as UsersActions } from '../ducks/users';
import api from '../../services/api';
import db from '../../services/db';

export function* usersRequest() {
  try {
    const response = yield call(api.get, '/home');
    var kalle = [];
    console.log('home response i users',response);


    db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        kalle.push(doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });


    console.log('users kalle',kalle);

    yield put(UsersActions.requestAllUsersSuccess(response.data));
  } catch (err) {
    yield put(UsersActions.requestAllUsersFailure());
  }
}
