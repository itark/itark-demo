import { call, put, fork, take} from 'redux-saga/effects';
import { db } from '../../services/db';
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)

const Restaurants = require("../../store/firestore/restaurants");

export function* getDishes() {
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

export function* getDish(id) {
    let dishes = [];
    const snapshot = yield call(
      rsf.firestore.getCollection,
      db.collection('dishes').where('id', '==', id)
    )
    snapshot.forEach(dish => {
        dishes.push(dish.data());
    }); 

    //fusk
    const restaurant = yield Restaurants.getRestaurant(id);
    const reviews = {};

    data = {
        restaurant,
        reviews:reviews,
        dish: dishes[0]
      };

    return data;
}