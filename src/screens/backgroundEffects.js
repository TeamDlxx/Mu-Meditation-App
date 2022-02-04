import React, { Component } from 'react';
var Sound = require('react-native-sound');


import {

    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Picker,
    ActivityIndicator
   
} from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LeftArrow from '../assets/icons/LeftArrow.png';
import ArrowUp from '../assets/icons/arrow_up.png'
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import Slider from 'react-native-slider';
import CustomMarker from '../components/customMarker';
import CustomMarkerRain from '../components/customMarkerRain';
import CustomMarkerFire from '../components/customMarkerFire';
import CustomMarkerLeaves from '../components/customMarkerLeaves';
import CustomMarkerRiver from '../components/customMarkerFireRiver';
import CustomMarkerBirds from '../components/customMarkerBirds';
import CustomMarkerSnow from '../components/customMarkerSnow';
import Modal from "react-native-modal";

import localTrack from '../assets/sample_audio.mp3';


var sliderLength=325;


var musicEffect;
var rainEffect;
var fireEffect;


export default class BgEffects extends Component {

    constructor(){
        super();
        Sound.setCategory('Playback', true)
        this.state={
          
            soundLevel1:0.0,
            soundLevel2:0,
            isModalVisible:false,
            language:"abc",
            isAnimating:false,
            isDisabled:false,
            
        }
    }

    toggleModal = () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
       
    }
   



   async componentDidMount(){


        SplashScreen.hide();

        // sound 1
         musicEffect = new Sound('http://dight310.byu.edu/media/audio/FreeLoops.com/2/2/Bubbling%20Cauldron%2002-6135-Free-Loops.com.mp3', '', (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return; 
            }
            // loaded successfully
            console.log('duration in seconds: ' + musicEffect.getDuration() + 'number of channels: ' + musicEffect.getNumberOfChannels());
            // Play the sound with an onEnd callback
          });
     //   sound 1

        

    // sound 2
        rainEffect = new Sound('http://s1download-universal-soundbank.com/mp3/sounds/4019.mp3', '', (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return; 
            }
            // loaded successfully
            console.log('duration in seconds: ' + rainEffect.getDuration() + 'number of channels: ' + musicEffect.getNumberOfChannels());
            // Play the sound with an onEnd callback
          });
    // sound 2



//  sound 3
        fireEffect = new Sound('http://www.newtquestgames.com/uploads/2015/02/sick-2.mp3', '', (error) => {
            if (error) {
            console.log('failed to load the sound', error);
            return; 
            }
            // loaded successfully
            console.log('duration in seconds: ' + fireEffect.getDuration() + 'number of channels: ' + musicEffect.getNumberOfChannels());
            // Play the sound with an onEnd callback
        });
//  sound 3
     
}





 

    BackFunction = ()=>{
        Navigation.pop(this.props.componentId)

       
    }

    playsound1 = ()=>{
        musicEffect.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
    }


    playsound2 = ()=>{
        rainEffect.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
    }


    playsound3 = ()=>{

        fireEffect.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
    }


    render(){
        return(
            <View style={styles.container} pointerEvents={this.state.isDisabled ? "none" : "auto"}>
  
        {this.state.isAnimating &&
             <ActivityIndicator size="large" color="#497CF0" animating={this.state.isAnimating}  style={styles.loading}/>
        }
         <View >


         <Modal isVisible={this.state.isModalVisible} transparent={true}>

         <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
            <View style={{
                width: "100%",
                height: 300,
                borderRadius:6,
                backgroundColor:"white"
                }}>

                    <View style={{flex:2.5, alignItems:"center",justifyContent:"center",borderBottomWidth:1,borderBottomColor:"#EAEBEE"}}>
                        <Text style={{fontFamily:"Gotham-Bold",fontSize:20}}>Delay Ending</Text>
                    </View>

                    <View style={{flex:6,padding:20}}>
                        <Text style={{fontFamily:"Gotham-Bold",fontSize:15}}>How long would you like background sound to continue after the main track ends?</Text>
                    </View>
                    <View style={{flex:2,flexDirection:"row",justifyContent:"space-around"}}>
                        <TouchableOpacity onPress={this.toggleModal}>
                            <Text style={{fontFamily:"Gotham-Bold",color:"#8C8B8F",fontSize:17}}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={{fontFamily:"Gotham-Bold",color:"#497CF0",fontSize:17}}>Done</Text>
                        </TouchableOpacity>
                    </View>
           
            </View>
        </View>

        </Modal>

        </View>

   
                <TouchableOpacity style={{marginTop:13,  padding:12}} onPress={this.BackFunction}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Image source={LeftArrow} style={{height:16, width:10}} />
                        <Text style={styles.headingTxt2}>Background Effects</Text>
                    </View>
                </TouchableOpacity>


                <View style={{flex:8.5,alignItems:"center", backgroundColor:"pink"}}>

                    <ScrollView>
                        
                  

                    <View >

                        

                        



                <View style={styles.item}>
                    <Text style={styles.effectname}>Music Effect</Text>

                    <MultiSlider
                        style={styles.slider}
                        min={0}
                        max={10}

                        onValuesChangeStart={val => {
                            console.log(val,"onValuesChangeStart");
                            // this.playsound1();

                            musicEffect.play((success) => {
                                if (success) {
                                  console.log('successfully finished playing');
                                } else {
                                  console.log('playback failed due to audio decoding errors');
                                }
                              });

                          }}

                          onValuesChange={val => {
                            console.log(val[0], "onValuesChange");
                            console.log(val[0]/10);
                            val = val[0]/10
                            this.setState({soundLevel1:val}) 
                          }}

                          onValuesChangeFinish={val => {
                            console.log(val[0], "onValuesChangeFinish");
                          }}

                        selectedStyle={{
                            backgroundColor: '#4778E8',
                        }}
                        unselectedStyle={{
                            backgroundColor: '#DDE6F8',
                        }}
                        // values={[5]}
                        containerStyle={{
                            height: 40,
                          
                        }}
                        trackStyle={{
                            height: 4,
                        
                        }}
                        touchDimensions={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            slipDisplacement: 40,
                        }}
                        customMarker={CustomMarker}
                        sliderLength={sliderLength}
                />

                </View>
                <View style={styles.item}>
                    <Text style={styles.effectname}>Rain Effect</Text>

                    <MultiSlider
                    style={styles.slider}
                    minimumValue={0}
                    selectedStyle={{
                        backgroundColor: '#4778E8',
                    }}
                    unselectedStyle={{
                        backgroundColor: '#DDE6F8',
                    }}
                    // values={[5]}
                    // containerStyle={{
                    //     height: 40,
                    // }}
                    trackStyle={{
                        height: 4,
                      
                    }}
                    touchDimensions={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        slipDisplacement: 40,
                    }}
                    customMarker={CustomMarkerRain}
                    sliderLength={sliderLength}

                    onValuesChangeStart={val => {
                        console.log(val,"onValuesChangeStart");
                        // this.playsound2();
                        rainEffect.play((success) => {
                            if (success) {
                              console.log('successfully finished playing');
                            } else {
                              console.log('playback failed due to audio decoding errors');
                            }
                          });
                      }}

                      onValuesChange={val => {
                        console.log(val[0], "onValuesChange");
                        console.log(val[0]/10);
                        val = val[0]/10
                        this.setState({soundLevel1:val}) 
                      }}

                      onValuesChangeFinish={val => {
                        console.log(val[0], "onValuesChangeFinish");
                      }}
                />

                </View>
                <View style={styles.item}>
                    <Text style={styles.effectname}>Fire Effect</Text>

                    <MultiSlider

                        onValuesChangeStart={val => {
                            console.log(val,"onValuesChangeStart");
                            // this.playsound3();

                            fireEffect.play((success) => {
                                if (success) {
                                  console.log('successfully finished playing');
                                } else {
                                  console.log('playback failed due to audio decoding errors');
                                }
                            });
                        }}

                        onValuesChange={val => {
                            console.log(val[0], "onValuesChange");
                            console.log(val[0]/10);
                            val = val[0]/10
                            this.setState({soundLevel1:val}) 
                        }}

                        onValuesChangeFinish={val => {
                            console.log(val[0], "onValuesChangeFinish");
                        }}
                        style={styles.slider}
                        minimumValue={0}
                        selectedStyle={{
                            backgroundColor: '#4778E8',
                        }}
                        unselectedStyle={{
                            backgroundColor: '#DDE6F8',
                        }}
                        // values={[5]}
                        // containerStyle={{
                        //     height: 40,
                        // }}
                        trackStyle={{
                            height: 4,
                        
                        }}
                        touchDimensions={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            slipDisplacement: 40,
                        }}
                        customMarker={CustomMarkerFire}
                        sliderLength={sliderLength}
                />

                </View>
                <View style={styles.item}>
                    <Text style={styles.effectname}>Rusting Leaves Effect</Text>

                    <MultiSlider
                        style={styles.slider}
                        minimumValue={0}
                        selectedStyle={{
                            backgroundColor: '#4778E8',
                        }}
                        unselectedStyle={{
                            backgroundColor: '#DDE6F8',
                        }}
                        // values={[5]}
                        // containerStyle={{
                        //     height: 40,
                        // }}
                        trackStyle={{
                            height: 4,
                        
                        }}
                        touchDimensions={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            slipDisplacement: 40,
                        }}
                        customMarker={CustomMarkerLeaves}
                        sliderLength={sliderLength}
                />

                </View>
                <View style={styles.item}>
                    <Text style={styles.effectname}>River Effect</Text>

                    <MultiSlider
                    style={styles.slider}
                    minimumValue={0}
                    selectedStyle={{
                        backgroundColor: '#4778E8',
                    }}
                    unselectedStyle={{
                        backgroundColor: '#DDE6F8',
                    }}
                    // values={[5]}
                    // containerStyle={{
                    //     height: 40,
                    // }}
                    trackStyle={{
                        height: 4,
                      
                    }}
                    touchDimensions={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        slipDisplacement: 40,
                    }}
                    customMarker={CustomMarkerRiver}
                    sliderLength={sliderLength}
                />

                </View>
                <View style={styles.item}>
                    <Text style={styles.effectname}>Birds Effect</Text>
                    <MultiSlider
                    style={styles.slider}
                    minimumValue={0}
                    selectedStyle={{
                        backgroundColor: '#4778E8',
                    }}
                    unselectedStyle={{
                        backgroundColor: '#DDE6F8',
                    }}
                    // values={[5]}
                    // containerStyle={{
                    //     height: 40,
                    // }}
                    trackStyle={{
                        height: 4,
                      
                    }}
                    touchDimensions={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        slipDisplacement: 40,
                    }}
                    customMarker={CustomMarkerBirds}
                    sliderLength={sliderLength}
                />
                </View>


                <View style={styles.item}>
                    <Text style={styles.effectname}>Snow Storm Effect</Text>

                    <MultiSlider
                    style={styles.slider}
                    minimumValue={0}
                    selectedStyle={{
                        backgroundColor: '#4778E8',
                    }}
                    unselectedStyle={{
                        backgroundColor: '#DDE6F8',
                    }}
                    // values={[5]}
                    // containerStyle={{
                    //     height: 40,
                    // }}
                    trackStyle={{
                        height: 4,
                      
                    }}
                    touchDimensions={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        slipDisplacement: 40,
                    }}
                    customMarker={CustomMarkerSnow}
                    sliderLength={sliderLength}
                />

                </View>


                
</View>

</ScrollView>


               

         </View>
         <View style={{ flex:1.2,
                   
                    shadowColor: "silver",
                    shadowOpacity: 0.85,
                    shadowRadius: 5,
                    shadowOffset: {height: 0,width: 0,
                    }
                    
                    }}>


<View style={{ borderTopColor:"#F3F3F3", borderTopWidth:1  ,backgroundColor:"white",height:"100%"}}>

<View style={{flexDirection:"row", alignItems:"center", justifyContent:"center",marginTop:15,}}>

    <View style={{ marginRight:19}}>
        <Text onPress={this.playsound1} style={{fontFamily:"Gotham-Bold", fontSize:17,}}>Delay Ending</Text>
    </View>
   


    {/* time and icon */}


    <TouchableOpacity onPress={this.toggleModal}>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginLeft:19,}}>
            <Text style={{fontFamily:"Gotham-Light",paddingRight:7}}>5 Min</Text>
            <View
                style={{
                shadowColor: '#497CF0',
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 3,
                backgroundColor: '#0000',
                }}>

                <Image source={ArrowUp} style={{height:26, width:26}} />
            </View>
        </View>
    </TouchableOpacity>


{/* time and icon */}

</View>

</View>

         </View>

           

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
      
    },
    headingTxt2: {
        fontSize: 23,
        fontWeight: "800",
        fontFamily: "Gotham-Black",
        paddingLeft:26,
    

    },
    effectname:{
        fontFamily:"Gotham-Light",
        fontSize:16,
        fontWeight:"bold"
     
    },
    
    item:{
        marginTop:5,
       
    },
    modal: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})