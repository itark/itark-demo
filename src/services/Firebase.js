// @flow

import React, { Component } from 'react';
import { Text,FlatList,  StyleSheet, } from 'react-native';

import styled from 'styled-components';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const TopText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
`;


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});


var kalle = [];

class Firebase extends Component {
  componentDidMount() {
   var firebaseAuth = firebase.auth();
   console.log('firebaseAuth',firebaseAuth);

   var authD = auth();
   console.log('authD',authD);   

  //  let defaultFirestore = firebase.firestore();
  //  console.log('defaultFirestore',defaultFirestore);

  //  const users = defaultFirestore.collection('users').get();
  //  console.log('users',users);


    this.signIn('fredrik@blomsteraktoren.se', 'Fredrik10121');
    const user = auth().currentUser;
    console.log('user',user);

    this.getUsers();
  }

  getUsers = () => {
    var db = firebase.firestore();
    db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        kalle.push(doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    console.log('yesman',db.collection('users').get());

    console.log('kalle',kalle);


   };

 
  signIn(email, password) {
      try {
        auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        console.error(e.message);
      }
  }

  render() {
    return (
      <TopText>
        Ref, var är kalle:
        {this.kalle}
        <FlatList
         data={DATA}
         renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        />     
      </TopText>
    );
  }
}

export default Firebase;
