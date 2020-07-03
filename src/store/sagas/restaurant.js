import { call, put } from 'redux-saga/effects';
import { Creators as RestaurantActions } from '../../store/ducks/restaurant';
import api from '../../services/api';
const Restaurants = require("../../store/firestore/restaurants");
import CONSTANTS from '../../utils/CONSTANTS';

export function* requestRestaurantDetail(action) {
  try {
    const { userLocation, id } = action.payload;

    const headers = {
      userLatitude: userLocation.latitude,
      userLongitude: userLocation.longitude,
    };


    if (CONSTANTS.RNF) {
      const restaurant = yield Restaurants.getRestaurant(id);
      const menuDishes = yield Restaurants.getMenuDishes(id, 'Homemade');
  
      const data = {
        restaurant: restaurant,
        menu: menuDishes
      }
  
      yield put(RestaurantActions.requestRestaurantDetailSuccess(data));


    } else {
      // id2 = "5d978c622404105d46f0f4d4"
      // console.log('restaurants, on id2:',id2)
      const response = yield call(api.get, `/restaurant/${id}`, { headers });
      console.log('response',response)
      
      yield put(RestaurantActions.requestRestaurantDetailSuccess(response.data));


    }


  } catch (err) {
    console.log('err',err)
    yield put(RestaurantActions.requestRestaurantDetailFailure());
  }
}


