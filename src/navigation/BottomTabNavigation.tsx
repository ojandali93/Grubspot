import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';

import SignupScreen from '../screens/SignupScreen';
import AddListScreen from '../screens/AddListScreen';
import { ListCollectionScreen } from '../screens/ListCollectionScreen';
import ViewListScreen from '../screens/ViewListScreen';
import AddPlaceScreen from '../screens/AddPlaceScreen';
import AddListMemberScreen from '../screens/AddListMemberScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PasswordForgetScreen from '../screens/PasswordForgetScreen';

const BottomTabNavigation = () => {

  const StackNav = createStackNavigator();

  return (
    <NavigationContainer>
      <StackNav.Navigator screenOptions={{headerShown: false}}>
        <StackNav.Screen name="ListCollectionScreen" component={ListCollectionScreen} />
        <StackNav.Screen name="AddListScreen" component={AddListScreen} />
        <StackNav.Screen name="ViewListScreen" component={ViewListScreen} />
        <StackNav.Screen name="GroupInfoScreen" component={GroupInfoScreen} />
        <StackNav.Screen name="AddPlacesScreen" component={AddPlaceScreen} />
        <StackNav.Screen name="AddMemberScreen" component={AddListMemberScreen} />
        <StackNav.Screen name="ProfileScreen" component={ProfileScreen} />
        <StackNav.Screen name="LoginScreen" component={LoginScreen} />
        <StackNav.Screen name="SignupScreen" component={SignupScreen} />
        <StackNav.Screen name="PasswordForgotScreen" component={PasswordForgetScreen} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigation;
