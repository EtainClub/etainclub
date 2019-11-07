import React, { useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const LocationForm = (props) => {
  // to check the main item
  const [checked, setCheck] = useState(false);
  const [location, setLocation] = useState(props.item);
  // id to show at front
  const id = props.id + 1;

  const updateLocation = (value) => {
    console.log('[LocationForm] value', value);
    setLocation(value);
    props.handleStateChange(props.id, value);
  }

  const onSearchPress = async () => {
    // get location permission for android device
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) { 
          if (__DEV__) Alert.alert("Location Permission Granted.");
          // navigate to the location screen
          props.navigation.navigate('LocationVerify', { id: props.id })
        }
        else {
          Alert.alert("Location Permission Not Granted");
        }
      } catch (err) {
        console.warn(err)
      }  
    }
  };

  showLocationWithPlaceholder = (id) => {
    return (
        <Input
          placeholder={props.placeholder}
          containerStyle={{ flex: 1 }}
          value={location}
          disabled
          onChangeText={updateLocation}
          autoCapitalize="none"
          autoCorrect={false}
          rightIcon={
            <Icon name='search' size={20} color='black' 
              onPress={onSearchPress} 
            />
          }
        />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.id}>{id}</Text>
      {showLocationWithPlaceholder(id)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  id: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  }
});

export default LocationForm;