import { call, put, fork, take} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import { Creators as EventsActions } from '../../store/ducks/events';
const Events = require("../../store/firestore/events");

//ex. https://medium.com/rumors/redux-firebase-and-the-saga-in-between-c2bd5adf6de1
// https://redux-saga-firebase.js.org/reference/dev/firestore
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)
import { db } from '../../services/db';
import api from '../../services/api';
import CONSTANTS from '../../utils/CONSTANTS';

export function* requestAllEvents() {
  try {

    if (CONSTANTS.RNF) {
      const data = yield Events.getEvents();
      console.log('rnf  Events.getEvents() events:',JSON.stringify(data))
      yield put(EventsActions.requestAllEventsSuccess(data));

    } else {
       const { data } = yield call(api.get, '/event');
       console.log('api events:',JSON.stringify(data))
       yield put(EventsActions.requestAllEventsSuccess(data));
    }

  } catch (err) {
    console.log('err',err)
    yield put(EventsActions.requestAllEventsFailure());   
  }
}

export function* requestEventDetails(action) {
  try {
    const { id } = action.payload;

    if (CONSTANTS.RNF) {
      const event = yield Events.getEvent(id)
      const restaurants = yield Events.getRestaurants() 
    
      var data  = {
        restaurants:restaurants,
        event: event
      }

      yield put(
        EventsActions.requestEventDetailsSuccess({
          restaurants: data.restaurants,
          details: data.event,
        }),
      );


    } else {
      const { data } = yield call(api.get, `/event/${id}`);  //Hämtar event OCH dess restaurants
      console.log('api event:',data)

      yield put(
        EventsActions.requestEventDetailsSuccess({
          restaurants: data.restaurants,
          details: data.event,
        }),
      );

    }

  } catch (err) {
    console.log('err in requestEventDetails()',err)
    yield put(EventsActions.requestEventDetailsFailure());
  }
}