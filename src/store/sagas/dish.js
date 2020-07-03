import { call, put } from 'redux-saga/effects';

import { Creators as DishActions } from '../../store/ducks/dish';
import api from '../../services/api';
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)
const Dish = require("../../store/firestore/dish");
import CONSTANTS from '../../utils/CONSTANTS';

export function* requestDishDetail(action) {
  try {
    const { id } = action.payload;

    if (CONSTANTS.RNF) {
      const dishes = yield Dish.getDish(id);
      yield put(DishActions.requestDishDetailSuccess(dishes));

    } else {
      const response = yield call(api.get, `/dish/${id}`);
      yield put(DishActions.requestDishDetailSuccess(response.data));

    }


  } catch (err) {
    yield put(DishActions.requestDishDetailFailure());
  }
}

export function* requestAllDishes() {
  try {
    if (CONSTANTS.RNF) {
      const data = yield Dish.getDishes();
      yield put(DishActions.requestAllDishesSuccess(data.dishes));
    } else {
      const response = yield call(api.get, '/dish');
      yield put(DishActions.requestAllDishesSuccess(response.data.dishes));

    }
  } catch (err) {
    console.err('err',err)
    yield put(DishActions.requestAllDishesFailure());
  }
}


