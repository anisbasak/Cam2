import React from 'react';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';


export default class APICallScreen extends React.Component {
  static navigationOptions = {
    title: 'API Call',
  };

  state = {
    time: 0,
    moviesList: null
  };

  getMoviesFromApi = async () => {
    try {
      startTime = new Date();
      let response = await fetch('https://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      endTime = new Date();
      var timeDiff = endTime - startTime; //in ms
      timeDiff /= 1000;
      var seconds = Math.round(timeDiff);
      this.setState({ 
        time: timeDiff,
        moviesList: responseJson.movies
      });
      console.log(timeDiff + " seconds");
    } catch (error) {
      console.error(error);
    }
  }
  
  createTable = () => {
    let table = []

    for (let index = 0; index < this.state.moviesList.length; index++) {
      table.push(
        <Text key={index}
          style={{ fontSize: 18, marginBottom: 20, marginTop: 20 }}>
          Name: {this.state.moviesList[index].title}, Release Year: {this.state.moviesList[index].releaseYear}
        </Text>
      );
    }
    return table
  }

  getTime = () => {
    let table = []

    for (let index = 0; index < this.state.moviesList.length; index++) {
      table.push(
        <Text key={index}
          style={{ fontSize: 18, marginBottom: 20, marginTop: 20 }}>
          Name: {this.state.moviesList[index].title}, Release Year: {this.state.moviesList[index].releaseYear}
        </Text>
      );
    }
    return table
  }

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Button
            onPress={this.getMoviesFromApi}
            title="Call API"
            color="#841584"
          />
          <Text
            style={{ fontSize: 18, marginBottom: 20, marginTop: 20 }}>
            Time taken to make API call:  {this.state.time > 0 ? this.state.time : 'API not called'}
          </Text>
          <Text
            style={{ fontSize: 18, marginBottom: 20, marginTop: 20 }}>
            List of Movies
          </Text>
          <View>
            {this.state.moviesList ? this.createTable() : <Text>No Data Yet</Text>}
          </View>

        </View>
      );
  }
}