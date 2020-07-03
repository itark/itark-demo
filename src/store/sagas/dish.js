import { call, put } from 'redux-saga/effects';

import { Creators as DishActions } from '../../store/ducks/dish';
import api from '../../services/api';
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)
const Dish = require("../../store/firestore/dish");

export function* requestDishDetail(action) {
  try {
    const { id } = action.payload;

    console.log('requestDishDetail, id',id)

    const response = yield call(api.get, `/dish/${id}`);


    const data = yield Dish.getDishes();
    console.log('rnf  Dish.getDishes(),data:',JSON.stringify(data))


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


