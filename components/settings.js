import React, { useState } from 'react'; // Import useState
import { View, Text, StyleSheet } from 'react-native'; // Import StyleSheet and Text
import { Picker } from '@react-native-picker/picker'; // Correct Picker import

export default function Settings(props) { // Add props argument
  const [selectedType, setSelectedType] = useState(props.mapType); // Access props correctly

  return (
    <View style={styles.settingsArea}>
      <Text style={styles.heading}>Map type</Text>
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue) => {
          setSelectedType(itemValue);
          props.setMapType(itemValue); // Access props correctly
        }}
      >
        <Picker.Item label="Standard" value="standard" />
        <Picker.Item label="Terrain" value="terrain" />
        <Picker.Item label="Satellite" value="satellite" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
    settingsArea: {
      marginTop: 32,
      marginLeft: 16,
    },
    heading: {
      textTransform: 'uppercase',
    },
  });