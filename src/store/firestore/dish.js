import { call, put, fork, take} from 'redux-saga/effects';
import { db } from '../../services/db';
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)

export function* getDishes() {
    const snapshot = yield call(rsf.firestore.getCollection, 'dishes');
    let events = [];
    snapshot.forEach(event => {
      events.push(event.data());
    });
  
    eventCollection = {
      events: events
    }  
  
    return eventCollection;
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
  
    return dishes[0];
}