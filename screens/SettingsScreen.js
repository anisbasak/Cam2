import React from 'react';
import list from './technologies.json';
import { Text, View, TouchableOpacity, Button, Image, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
}
  static navigationOptions = {
    title: 'Display Table',
  };

  state = {
    time: 0,
    technologyList: []
  };

  getTechnologyFromList() {
    try {
      for (i = 0; i < list.technologies.length; i++){
        console.log('list.technologies[i].name', list.technologies[i].name)
        this.data.push([list.technologies[i].name, list.technologies[i].summary, list.technologies[i].company])
      }

    this.setState({
      technologyList: this.data
    });
    } catch (error) {
      console.error(error);
    }
  }

  createTable = () => {
    console.log('hellllooooo');
    let head = ['NAME', 'SUMMARY', 'COMPANY'];
    startTime = new Date();

    let table = (
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={head} style={styles.head} textStyle={styles.text}/>
        <ScrollView style={styles.dataWrapper}>
          <Rows data={this.state.technologyList} textStyle={styles.text}/>
        </ScrollView>
      </Table>
    )
    endTime = new Date();
    time = endTime - startTime;
    console.log('time:', time)
    // this.setState({
    //   time: time
    // });

    return table;
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Button
          onPress={this.getTechnologyFromList.bind(this)}
          title="Display Table"
          color="#841584"
        />
        <Text
          style={{ fontSize: 18, marginBottom: 20, marginTop: 20 }}>
          Time taken to display table:  {this.state.time > 0 ? this.state.time : 'Table not displayed yet'}
        </Text>
        <Text
          style={{ fontSize: 18, marginBottom: 20, marginTop: 20 }}>
          List of Technologies {this.state.technologyList.length}
        </Text>
        <View>
          {this.state.technologyList.length > 0 ? this.createTable() : <Text>No Data</Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, width: 380, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  dataWrapper: {margin: -1}
});