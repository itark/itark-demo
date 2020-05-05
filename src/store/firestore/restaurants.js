import { call, put, fork, take} from 'redux-saga/effects';
import { db } from '../../services/db';
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from '@react-native-firebase/app';
const rsf = new ReduxSagaFirebase(firebase)

const dishesTypes = () => {
 
    let types = []
 
    types.push( "Homemade") 
    types.push( "Barbecue") 
    types.push( "Fast-Food") 
    types.push( "Pasta") 
    types.push( "Pizza") 
    types.push( "Dessert") 
    types.push( "Japanese") 
    types.push( "Salad") 
    types.push( "Seafood") 

    return types  
}

export function* getRestaurant(id) {
    console.log('getRestaurant, id',id)

    let restaurants = [];
    const snapshot = yield call(
      rsf.firestore.getCollection,
      db.collection('restaurants').where('id', '==', id)
    )
    snapshot.forEach(restaurant => {
      restaurants.push(restaurant.data());
    }); 
  
    const distanceBetweenCoordinates = 9
  
    restaurant = {
      ...restaurants[0],
      id: id,
      distance: distanceBetweenCoordinates,
      isOpen: true
    }  
  
    return restaurant;
  }
  
export function* getMenuDishes(id, dishType) {
    console.log('getMenu, id',id)
    let dishes = [];
    const snapshot = yield call(
      rsf.firestore.getCollection,
      db.collection('dishes').where('type', '==', dishType)
    )
    snapshot.forEach(dish => {
      dishes.push(dish.data());
    }); 
  
    const allReviews = [];  //TODO fill, hämta

    const menuDishes = _getMenuDishes(allReviews, dishes, dishType);

    const menu = [];

    menu.push({
        type: dishType,
        dishes: menuDishes
      });
  
    return menu;

  }

  const MAX_DISHES_MENU = 10;

  const _getMenuDishes = (allReviews, allDishes, dishType) => {
    const dishesFilteredByType = allDishes.filter(
      dishe => dishe.type === dishType
    );
    const shuffledDishes = shuffleArray(dishesFilteredByType);
    const dishes = shuffledDishes.slice(0, MAX_DISHES_MENU);
  
    const menu = dishes.map(dish => {
      const userReviews = _getDishReviews(allReviews, dish.reviews);
      return {
        ...dish,
        userReviews
      };
    });
  
    return menu;
  };

  const _getDishReviews = (allReviews, numberOfReviews) => {
    const shuffledReviews = shuffleArray(allReviews);
  
    return shuffledReviews.slice(0, numberOfReviews);
  };

  const shuffleArray = array => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  };


