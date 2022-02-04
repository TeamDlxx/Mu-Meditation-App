import React, { useState } from "react";
import PropTypes from "prop-types";
import TrackPlayer from "react-native-track-player";
import NonEmpty from './images/NonEmpty.jpeg';

import localTrack from './sample_audio.mp3'

import whiteCross from '../assets/icons/whiteCross.png'
import Flower from '../assets/icons/download.jpeg'
import HeartIcon from '../assets/icons/hearticon.png'
import RightRound from '../assets/icons/rightRound.png'
import LeftRound from '../assets/icons/leftRound.png'
import playIcon from '../assets/icons/play.png'
import pauseIcon from '../assets/icons/pause.png'

let currentPosition= "";
let playbackState = "";
let duration = 0.75;

import {useTrackPlayerEvents, useTrackPlayerProgress, usePlaybackState} from 'react-native-track-player/lib/hooks';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from "react-native";

function ProgressBar() {
  const progress = useTrackPlayerProgress();


  return (
    <View style={styles.progress}>
        <View style={{ flex: progress.position, backgroundColor: "red" }} />
          <View
            style={{
                flex: progress.duration - progress.position,
                backgroundColor: "grey"
              }}
            />
    </View>

  );
}

function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}


async function togglePlayback() {

    console.log(currentPosition, duration)
    console.log("called")
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack == null) {
      console.log("null part")
      await TrackPlayer.reset();
      // await TrackPlayer.add(playlistData);
      await TrackPlayer.add({
        id: "1111",
        url: localTrack,
        title: "Longing",
        artist: "David Chavez",
        artwork: "https://picsum.photos/200",
        duration : duration*60
      });
      await TrackPlayer.play();
    } else {
      console.log("else part")
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      }

      else {
        await TrackPlayer.pause();
      }
      if(currentPosition == duration){

        await TrackPlayer.play();
      }
      
    }
}




ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default function Player(props) {
   playbackState = usePlaybackState();
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtwork, setTrackArtwork] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  useTrackPlayerEvents(["playback-track-changed"], async event => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setTrackTitle("title");
      setTrackArtist("artist");
      setTrackArtwork("artwork");
    }
  });

  const { style, onNext, onPrevious, onTogglePlayback } = props;

  var middleButtonText = "Play";

  console.log(playbackState, "playbackstate")

  let { position, bufferedPosition, duration } = useTrackPlayerProgress()

  position = position/60;
  duration = duration/60;
  position = position.toFixed(2)
  duration = duration.toFixed(2);

  currentPosition = position;
  

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonText = "Pause";
  }

  return (
    // <View style={[styles.card, style]}>
    //   <Image style={styles.cover} source={NonEmpty} />

    // <View style={{flexDirection:"row"}}>
    // <Text>{position}</Text> 
    //         <ProgressBar />
    //   <Text>{duration}</Text>

    // </View>
    //   <Text style={styles.title}>{trackTitle}</Text>
    //   <Text style={styles.artist}>{trackArtist}</Text>
    //   <View style={styles.controls}>
    //       <ControlButton title={"<<"} onPress={onPrevious} />
    //       <ControlButton title={middleButtonText} onPress={togglePlayback} />
    //       <ControlButton title={">>"} onPress={onNext} />
    //   </View>
    // </View>



    <View style={styles.container}>



            <View style={{flex:3.5}}>


                  <ImageBackground 
           
           imageStyle={{resizeMode: 'stretch'}}
           source={oval} style={{ alignItems:"center", height:950}}>



                    <TouchableOpacity onPress={this.BackFunction}>
                    <Image style={{height:30, width:30, marginRight:330, marginTop:40}} source={whiteCross}/>

                    </TouchableOpacity>
                
            
           </ImageBackground> 


            </View>




            <View style={{flex:6.5}}>

                {/* square image */}

                <View style={{marginTop:-120}}>

                    <View style={{
                        marginBottom: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        shadowColor: 'gray',
                        shadowOffset: { width: 0, height: 9 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 3,
                        backgroundColor: "#0000",
                        height:200
                    }}
                    >
                        <Image style={{height:190, width:200,  borderRadius:20}} source={Flower} />

                    </View> 

            {/* square image */}



             {/* text views */}
                    <View style={{padding:12}}>
                            <View style={{flexDirection:"row",  alignItems:"center"}}>
                                
                                <View style={{flex:5}}>
                                        <Text style={styles.headingTxt}>Midnight Relax</Text>
                                        <Text style={{fontSize:15,paddingTop:6, color:"#CDD1D9", fontFamily:"Gotham-Bold"}}>Meditation ||</Text>
                                </View>
                                    
                                <Image source={HeartIcon}  style={{height:54, width:54}}/>
                            </View> 



                            <View style={{marginTop:20}}>
                                <Text style={{fontSize:17,fontStyle:"normal"}}>
                                    It's a special place where each and every moment is momentous. When we medidate we venture into the workings of our minds.
                                </Text>
                            </View>


                    </View> 


                 {/* text views */}




{/* three play buttons */}
            <View style={{alignItems:"center", justifyContent:"center", flexDirection:"row", padding:30, marginTop:40}}>

                    <Image source={LeftRound} style={{height:40, width:40, marginRight:30}} resizeMode="contain"/>




                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        shadowColor: '#F75200',
                        shadowOffset: { width: 0, height: 9 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 3,
                        backgroundColor: "#0000",

                    }}
                >

                    <TouchableOpacity onPress={this.togglePlayback}>
                        <Image source={playIcon} style={{height:75, width:75}} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>

                    <Image source={RightRound} style={{height:40, width:40, marginLeft:30}} resizeMode="contain"/>

            </View> 

       
        {/* three play buttons */}
        </View>

    </View>
      

 </View>
  );



  
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired
};

Player.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  card: {
    width: "80%",
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: "center",
    shadowColor: "black",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 1 }
  },
  cover: {
    width: 150,
    height: 150,
    marginTop: 20,
    backgroundColor: "grey"
  },
  progress: {
    height: 1,
    width: "70%",
    margin: 10,
    flexDirection: "row",
    
  },
  title: {
    marginTop: 10
  },
  artist: {
    fontWeight: "bold"
  },
  controls: {
    marginVertical: 20,
    flexDirection: "row"
  },
  controlButtonContainer: {
    flex: 1
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: "center"
  },

  container:{
    flex:1,

},
headingTxt: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "Gotham-Bold",
    alignItems:"center",
   paddingBottom:6

},
});