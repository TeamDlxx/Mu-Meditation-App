import React from 'react';
import { StyleSheet, Image } from 'react-native';
import arrow from '../assets/icons/fire.png'

class CustomMarker extends React.Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={arrow}
        // source={
        //   this.props.pressed ? require('./ruby.png') : require('./diamond.png')
        // }
        resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 25,
    marginLeft:16
  },
});

export default CustomMarker;