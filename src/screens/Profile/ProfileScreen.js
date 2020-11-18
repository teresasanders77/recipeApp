
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, Dimensions, Button, Image } from "react-native";
import * as Permissions from 'expo-permissions';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  _getPhotoLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

  }

  render() {
    const { image, hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />
    }
    else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }
    else {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={styles.activeImageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={{ flex: 1 }} />
            ) : (
                <View />
              )}
          </View>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
              onPress={this._getPhotoLibrary.bind(this)}
              title="Choose a new profile picture"
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  activeImageContainer: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").height / 4,
    backgroundColor: "#eee",
    borderBottomWidth: 0.5,
    borderColor: "#fff"
  },
});
