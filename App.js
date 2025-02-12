import { StyleSheet, SafeAreaView } from 'react-native';
import Map from './screens/map';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MainAppbar from './components/MainAppBar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Settings from './components/settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const settings = {
  backgroundColor: '#00a484'
};

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
};

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_known);
  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [mapType, setMapType] = useState('standard');

  const getUserPosition = async () => {
    setIcon(icons.location_searching);
    let { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status !== 'granted') {
        console.log('Geolocation failed');
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Map"
        screenOptions={{header: (props) => 
        <MainAppbar {...props} 
        backgroundColor={settings.backgroundColor} 
        icon={icon} 
        getUserPosition={getUserPosition}/>}}
        >
          <Stack.Screen name="Map">
            {() =>
               <Map location={location} mapType={mapType}/>
               }
          </Stack.Screen>
          <Stack.Screen name="Settings">
            {() => (
          <Settings
            backgroundColor={settings.backgroundColor}
            mapType={mapType}
            setMapType={setMapType}
              />
             )}
        </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});