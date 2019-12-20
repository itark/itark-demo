import { call, put } from 'redux-saga/effects';

import { Creators as HomeActions } from '../../store/ducks/home';
import api from '../../services/api';
import db from '../../services/db';

export function* homeRequest() {
  try {
    const response = yield call(api.get, '/home');
    var kalle = [];
    console.log('response.data',response.data);

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

    console.log('kalle',kalle);

    yield put(HomeActions.getHomeSuccess(response.data));
  } catch (err) {
    yield put(HomeActions.getHomeFailure());
  }
}
