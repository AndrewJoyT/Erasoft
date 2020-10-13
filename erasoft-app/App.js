/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login,Register,Article, DetailArticle, Profile, Home, FormArticle} from './src/pages';

const Stack = createStackNavigator()

const App = () => {
  return (
    <>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" headerMode="none">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="formArticle" component={FormArticle} />
        <Stack.Screen name="article" component={Article} />
        <Stack.Screen name="detailArticle" component={DetailArticle} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>

    </>
  );
};

export default App;