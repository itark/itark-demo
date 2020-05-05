import { call, put } from 'redux-saga/effects';

import { Creators as DishActions } from '../../store/ducks/dish';
import api from '../../services/api';

import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)

export function* requestDishDetail(action) {
  try {
    const { id } = action.payload;

    const response = yield call(api.get, `/dish/${id}`);

    yield put(DishActions.requestDishDetailSuccess(response.data));
  } catch (err) {
    yield put(DishActions.requestDishDetailFailure());
  }
}

export function* requestAllDishes() {
  try {
    const response = yield call(api.get, '/dish');
    const dishes = yield getCollection();

    console.log('dishes',dishes);

    yield put(DishActions.requestAllDishesSuccess(response.data.dishes));
  } catch (err) {
    yield put(DishActions.requestAllDishesFailure());
  }
}

function* getCollection() {
  const snapshot = yield call(rsf.firestore.getCollection, 'dishes');
  let dishes = [];
  snapshot.forEach(dish => {
    dishes.push(dish.data());
  });

  dishCollection = {
    dishes: dishes
  }  

  return dishCollection;
}

function* getDish(id) {
  const snapshot = yield call(rsf.firestore.getCollection.where('id', '==', id), 'dishes')
  let dishes = [];
  snapshot.forEach(dish => {
    dishes.push(dish.data());
  });

  dishCollection = {
    dishes: dishes
  }  

  return dishCollection;
}


