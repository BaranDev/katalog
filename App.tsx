import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import ImageViewerScreen from './components/ImageViewerScreen';
import {colors, Texts} from './constants';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            title: Texts.HomeScreenTitle,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('AddProduct')}
                style={{marginRight: 10}}>
                <Icon
                  name="plus-circle"
                  size={30}
                  color={colors.ForegroundColor}
                />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: colors.BackgroundColor,
            },
            headerTintColor: colors.ForegroundColor,
          })}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{
            title: Texts.AddProductScreenTitle,
            headerStyle: {
              backgroundColor: colors.BackgroundColor,
            },
            headerTintColor: colors.ForegroundColor,
          }}
        />
        <Stack.Screen
          name="ImageViewer"
          component={ImageViewerScreen}
          options={{
            title: Texts.ImageViewerScreenTitle,
            headerStyle: {
              backgroundColor: colors.BackgroundColor,
            },
            headerTintColor: colors.ForegroundColor,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
