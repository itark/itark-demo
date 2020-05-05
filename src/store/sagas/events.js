import { call, put } from 'redux-saga/effects';

import { Creators as EventsActions } from '../../store/ducks/events';
import api from '../../services/api';
import db from '../../services/db';


//ex. https://medium.com/rumors/redux-firebase-and-the-saga-in-between-c2bd5adf6de1
// https://redux-saga-firebase.js.org/reference/dev/firestore
import ReduxSagaFirebase from 'redux-saga-firebase';

import firebase from '@react-native-firebase/app';

const rsf = new ReduxSagaFirebase(firebase)

export function* requestAllEvents() {
  try {
    // const { data } = yield call(api.get, '/event');

    const events = yield getCollection();
    // console.log('data',JSON.stringify(data));
    // console.log('event',JSON.stringify(events));

    yield put(EventsActions.requestAllEventsSuccess(events));

  } catch (err) {
    yield put(EventsActions.requestAllEventsFailure());
  }
}

function* getCollection() {
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

export function* requestEventDetails(action) {
  try {
    const { id } = action.payload;

    const { data } = yield call(api.get, `/event/${id}`);

    yield put(
      EventsActions.requestEventDetailsSuccess({
        restaurants: data.restaurants,
        details: data.event,
      }),
    );
  } catch (err) {
    yield put(EventsActions.requestEventDetailsFailure());
  }
}
