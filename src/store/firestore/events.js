import { call, put, fork, take} from 'redux-saga/effects';
import { db } from '../../services/db';
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)

export function* getEvents() {
    const snapshot = yield call(rsf.firestore.getCollection, 'events');
    let events = [];
    snapshot.forEach(event => {
      events.push(event.data());
    });
  
    eventCollection = {
      events: events
    }  
  
    return eventCollection;
  }

export function* getEvent(id) {
    let events = [];
    const snapshot = yield call(
      rsf.firestore.getCollection,
      db.collection('events').where('id', '==', id)
    )
    snapshot.forEach(event => {
      events.push(event.data());
    }); 
  
    return events[0];
}
  
export function* getRestaurants() {
    const snapshot = yield call(rsf.firestore.getCollection, 'restaurants');
    let restaurants = [];
    snapshot.forEach(restaurant => {
      restaurants.push(restaurant.data());
    });
  
    return restaurants;
}