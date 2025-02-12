import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map(props) {
  const [markers, setMarkers] = useState([]); // Array to store multiple markers

  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate;

    setMarkers([...markers, coords]); // Add new marker to the array
  };

  return (
    <MapView
      style={styles.map}
      region={props.location}
      mapType={props.mapType}
      onLongPress={showMarker}
    >
      {markers.map((marker, index) => ( // Iterate through markers array
        <Marker
          key={index} // Important: Use a unique key for each marker
          title="My marker"
          coordinate={marker} // Use the current marker's coordinates
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});