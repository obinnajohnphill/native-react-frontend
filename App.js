import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MenuComponent  from './components/MenuComponent';
import CheckoutComponent from './components/CheckoutComponent';

function MenuScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MenuComponent/>
      </View>
  );
}

function CheckoutScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CheckoutComponent/>
      </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            tabBarOptions={{
              labelStyle: { fontSize: 12 },
              tabStyle: { width: 100 },
              style: { backgroundColor: 'white'},
            }}
           >
          <Tab.Screen name="Menu" component={MenuScreen} />
          <Tab.Screen name="Checkout" component={CheckoutScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
