import React from 'react';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    showCamera: false,
    imageUri: 'Your Picture Here'
  };
  toggleCancel = () => {
    this.setState({
      showCamera: true
    });
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  };
  render() {
    const { hasCameraPermission, showCamera } = this.state;
    if (showCamera) {
      if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1 }}>

            <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent'
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignItems: 'center'
                  }}
                  onPress={async () => {
                    console.log('go go')
                    startTime = new Date();
                    if (this.camera) {
                      let photo = await this.camera.takePictureAsync();
                      console.log('go go', photo);
                      endTime = new Date();
                      var timeDiff = endTime - startTime; //in ms
                      // strip the ms
                      timeDiff /= 1000;

                      // get seconds 
                      var seconds = Math.round(timeDiff);
                      console.log(timeDiff + " seconds");

                      this.setState({
                        showCamera: false,
                        imageUri: photo.uri
                      });
                    }
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    Capture
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
      }
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Button
            onPress={this.toggleCancel}
            title="Open Camera"
            color="#841584"
          />
          <Text
            style={{ fontSize: 18, marginBottom: 20, marginTop: 20 }}>
            Your Picture Below
          </Text>
          <Image
            style={{ height: 400, width: 400 }}
            source={{ uri: this.state.imageUri }}
          />
        </View>
      );
    }
  }
}