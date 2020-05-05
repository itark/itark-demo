import { call, put } from 'redux-saga/effects';
import { Creators as RestaurantActions } from '../../store/ducks/restaurant';
import api from '../../services/api';
const Restaurants = require("../../store/firestore/restaurants");

export function* requestRestaurantDetail(action) {
  try {
    const { userLocation, id } = action.payload;

    const headers = {
      userLatitude: userLocation.latitude,
      userLongitude: userLocation.longitude,
    };

    // id2 = "5d978c622404105d46f0f4d4"
    // console.log('restaurants, on id2:',id2)
    // const response = yield call(api.get, `/restaurant/${id2}`, { headers });
    // console.log('response',response)

    const restaurant = yield Restaurants.getRestaurant(id);
    //console.log('Restaurants.getRestaurant, restaurant',restaurant)

    const menuDishes = yield Restaurants.getMenuDishes(id, 'Homemade');
    //console.log('Restaurants.getRestaurant, menu',menuDishes)

    const data = {
      restaurant: restaurant,
      menu: menuDishes
    }

    console.log('data',data)

    //yield put(RestaurantActions.requestRestaurantDetailSuccess(response.data));
    yield put(RestaurantActions.requestRestaurantDetailSuccess(data));
  } catch (err) {
    console.log('err',err)
    yield put(RestaurantActions.requestRestaurantDetailFailure());
  }
}


