import { call, put } from 'redux-saga/effects';

import { Creators as HomeActions } from '../../store/ducks/home';
import api from '../../services/api';
import { db } from '../../services/db';
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)
import CONSTANTS from '../../utils/CONSTANTS';

export function* homeRequest() {
  try {

    const almstrandsgatan = {
      latitude: '57.7216984',
      longitude: '11.907689'
    }


    const userLocation = almstrandsgatan;

  //  console.log('userLocation',JSON.stringify(userLocation));

  if (CONSTANTS.RNF) {
    console.log('RNF is true')
    const inYourCityEvents = yield getCollection('events');
    const youMightLikeDishes =  yield getCollection('dishes');
    const popularDishes = youMightLikeDishes;

    const responseData = {
      userLocation: userLocation,
      inYourCityEvents: inYourCityEvents,
      youMightLikeDishes: youMightLikeDishes,
      popularDishes: popularDishes
    }
    yield put(HomeActions.getHomeSuccess(responseData));


  } else {
    console.log('RNF is false')
    const response = yield call(api.get, '/home');
    console.log('response.data',response.data);

    yield put(HomeActions.getHomeSuccess(response.data));
  }

  } catch (err) {
    yield put(HomeActions.getHomeFailure());
  }
}

function* getCollection(typ) {
  const snapshot = yield call(rsf.firestore.getCollection, typ);
  let rows = [];
  snapshot.forEach(row => {
    rows.push(row.data());
  });

  return rows;
}
