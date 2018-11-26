import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';


export default class GPSScreen extends React.Component {
  static navigationOptions = {
    title: 'GPS',
  };
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
    //   this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    this.setState({ location });
  };

  render() {
    // let text = 'Waiting..';
    let text ="";
    let lat = "";
    let lng = "";
    let altitude = "";
    let accuracy = "";
    let altAccuracy = "";
    let heading = "";
    let speed = "";
    if (this.state.errorMessage) {
      this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      lat = this.state.location.coords.latitude;
      lng = this.state.location.coords.longitude;
      altitude = this.state.location.coords.altitude;
      accuracy = this.state.location.coords.accuracy;
      altAccuracy = this.state.location.coords.altitudeAccuracy;
      heading = this.state.location.coords.heading;
      speed = this.state.location.coords.speed;

    //   lat = "Here";
    }

    return (
        


      <View style={styles.container}>
        <Button
        onPress={this._getLocationAsync}
        title="Get Current Location"
        color="#841584"
        />

        {/* <Text style={styles.paragraph}>
        {text}
        
        </Text> */}
        <Text style={styles.paragraph}>
        Latitude: {lat}
        </Text>

        <Text style={styles.paragraph}>
        Longitude: {lng}
        </Text>

        <Text style={styles.paragraph}>
        Accuracy: {accuracy}
        </Text>

        <Text style={styles.paragraph}>
        Altitude: {altitude}
        </Text>

        <Text style={styles.paragraph}>
        Altitude Accuracy: {altAccuracy}
        </Text>

        <Text style={styles.paragraph}>
        Heading: {heading}
        </Text>

        <Text style={styles.paragraph}>
        Speed: {speed}
        </Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
