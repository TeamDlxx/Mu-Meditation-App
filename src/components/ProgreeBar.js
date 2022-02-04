import React, { Component } from 'react';
import TrackPlayer from 'react-native-track-player';
import { Text, View, StyleSheet } from 'react-native';
import Slider from 'react-native-slider';
var i = 0;
export default class TrackSlider extends TrackPlayer.ProgressComponent {
  state = {
    duration: 0,
    position: 0,
    isSeeking: false,
    seek: 0
  };

  shouldComponentUpdate(nextProps, nextState) {


    const {
      duration: prevDuration,
      position: prevPosition,
      bufferedPosition: prevBufferedPosition
    } = this.state;

    const {
      duration: nextDuration,
      position: nextPosition,
      bufferedPosition: nextBufferedPosition
    } = nextState;
    if (
      prevDuration !== nextDuration ||
      prevPosition !== nextPosition ||
      prevBufferedPosition !== nextBufferedPosition
    ) {
      return true;
    }
    return false;
  }

  formatTime = timeInSec => {
    if( this.state.duration!==0 &&this.state.position!==0 &&   parseInt(this.state.duration ) === parseInt(this.state.position) ){

      console.log("kya true hui condition", i)

      if(i === 0){
          console.log("equale");
          if(this.props.i === false){
            this.props.resetPlayer();
          }
          
          i++;
      }
      else{
        i = 0
      }
     
    }

    let mins = parseInt(timeInSec / 60);
    let secs = parseInt(Math.round((timeInSec % 60) * 100) / 100);
    if (mins < 10) {
      mins = '0' + mins;
    }
    if (secs < 10) {
      secs = '0' + secs;
    }
    return mins + ':' + secs;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.position}>{this.formatTime(this.state.position)}</Text>
        <Slider
          style={styles.slider}
          value={this.state.isSeeking ? this.state.position : this.state.position}

            thumbTintColor="#497CF0"
            minimumTrackTintColor="#497CF0"
            maximumTrackTintColor="#DDE6F8"
            minimumValue={0}
            thumbStyle={{ width: 11, height: 11,  shadowOpacity: 0.9,shadowColor:"#497CF0",elevation:1,
            shadowOffset: {
              width: 0,
              height: 0,
            }, }}
          animationType='timing'
          maximumValue={this.state.duration}

          onValueChange={val => {
            console.log(val,"on changing");
            TrackPlayer.pause();
            this.setState({ isSeeking: true, seek: val });
          }}
          onSlidingComplete={val => {
            console.log(val, "onslidingcomplete");
            this.props.moveTo(val);
            this.setState({ value: val });
           
            
          }}
        />

<Text style={styles.duration}>{this.formatTime(this.state.duration)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    flexDirection:"row",
    alignItems:"center",
    width:"100%",
    paddingRight:28,
    paddingLeft:28
  },
  position: {

   color: 'gray', 
   fontSize: 12,
  
   

  },
  duration: {
      
   color: 'gray', 
   fontSize: 12,
   
  
  },
  timeContainer: {
    alignItems: 'center',
    color: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  
  },
  slider: {
    marginLeft: 5,
    marginRight: 5,
    width:"75%"
  }
});