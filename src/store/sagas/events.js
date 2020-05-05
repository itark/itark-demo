import { call, put, fork, take} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'

import { Creators as EventsActions } from '../../store/ducks/events';
//import api from '../../services/api';

//ex. https://medium.com/rumors/redux-firebase-and-the-saga-in-between-c2bd5adf6de1
// https://redux-saga-firebase.js.org/reference/dev/firestore
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)

import { db } from '../../services/db';

export function* requestAllEvents() {
  try {
    // const { data } = yield call(api.get, '/event');
    // console.log('api events:',JSON.stringify(data))

    const data = yield getEvents();
    console.log('rnf events:',JSON.stringify(data))

    yield put(EventsActions.requestAllEventsSuccess(data));

  } catch (err) {
    yield put(EventsActions.requestAllEventsFailure());
  }
}

export function* requestEventDetails(action) {
  try {
    const { id } = action.payload;
    // const { data } = yield call(api.get, `/event/${id}`);  //Hämtar event OCH dess restaurants
    // console.log('api event:',data)

    const event = yield getEvent(id)
    //console.log('rnf, event(id):',event)
    const restaurants = yield getRestaurants() 
    //console.log('rnf, restaurants:',restaurants) 
  
    var data  = {
      restaurants:restaurants,
      event: event
    }
    console.log('rnf event:',data) 

    yield put(
      EventsActions.requestEventDetailsSuccess({
        restaurants: data.restaurants,
        details: data.event,
      }),
    );
  } catch (err) {
    console.log('err in requestEventDetails()',err)
    yield put(EventsActions.requestEventDetailsFailure());
  }
}

function* getEvents() {
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

function* getRestaurants() {
  const snapshot = yield call(rsf.firestore.getCollection, 'restaurants');
  let restaurants = [];
  snapshot.forEach(restaurant => {
    restaurants.push(restaurant.data());
  });

  return restaurants;
}

function* getDocument2(collection, id) {
  try {
    const snapshot = yield call(
      rsf.firestore.getCollection,
      db.collection(collection).where('id', '==', id)
      ,{
        successActionCreator: syncMessages,
        failureActionCreator: errorAction
      }  
    )

    console.log('getDocument2 snapshot',snapshot);


  } catch (err) {
    console.log("WTF",err)
  }


}

function* syncEvents() {
 const channel = rsf.firestore.channel('events');
 //const channel = rsf.firestore.channel( db.collection('events').where('restaurantsParticipating', '==', 18)  )

  while(true) {
    const channelData = yield take(channel);
    const data = transformer(channelData)
    console.log('data',data)
    yield put(EventsActions.requestAllEventsSuccess(data));
  }
}


const transformer = channelData => {
  const res = []
  channelData.forEach(doc =>
    res.push({
      id: doc.id,
      ...doc.data(),
    }),
  )

  eventCollection = {
    events: res
  }  

  return eventCollection;  

}

function* getEvent(id) {
  console.log('getEvent, id',id)
  let events = [];
  const snapshot = yield call(
    rsf.firestore.getCollection,
    db.collection('events').where('id', '==', id)
  )
  snapshot.forEach(event => {
    events.push(event.data());
  }); 

  console.log('events',events);

  return events[0];
}


function* getEventLabb(id) {
  // Will only synchronise users for which the `isAdmin` key is `true`:

  //https://stackoverflow.com/questions/50668964/what-is-the-proper-way-of-connecting-firebase-with-redux-sagas

  //misc rename : https://medium.com/the-react-native-log/how-to-rename-a-react-native-app-dafd92161c35
  yield fork(
    rsf.firestore.syncCollection,
    db.collection('events').where('id', '==', id),{ 
      successActionCreator: syncMessages,
      failureActionCreator: errorAction
    }
  )
}