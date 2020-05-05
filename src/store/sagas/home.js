import { call, put } from 'redux-saga/effects';

import { Creators as HomeActions } from '../../store/ducks/home';
import api from '../../services/api';
import { db } from '../../services/db';
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)

export function* homeRequest() {
  try {
    // const response = yield call(api.get, '/home');
    // console.log('response.data',response.data);

    const userLocation = {
      latitude: '-3.732947',
       longitude: '-38.497029'
    }
  //  console.log('userLocation',JSON.stringify(userLocation));

    const inYourCityEvents = yield getCollection('events');
    //console.log('inYourCityEvents',JSON.stringify(inYourCityEvents));

    const youMightLikeDishes =  yield getCollection('dishes');
    //console.log('youMightLikeDishes',JSON.stringify(youMightLikeDishes));

    const popularDishes = youMightLikeDishes;
    //console.log('popularDishes',JSON.stringify(popularDishes));

    const responseData = {
      userLocation: userLocation,
      inYourCityEvents: inYourCityEvents,
      youMightLikeDishes: youMightLikeDishes,
      popularDishes: popularDishes
    }

    console.log('responseData(rnf)',responseData);

    //yield put(HomeActions.getHomeSuccess(response.data));
    yield put(HomeActions.getHomeSuccess(responseData));

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
