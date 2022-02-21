import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Swiper from 'react-native-swiper';
import SplashScreen from 'react-native-splash-screen';
import slider1 from '../assets/icons/maditation.png';
import slider2 from '../assets/icons/track.png';
import slider3 from '../assets/icons/results.png';
const {Navigation} = require('react-native-navigation');
import startTabs from './StartMainTabs';


export default class IntroSwiperScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newIndex: '0',
      swiperIndex: '',
    };
  }

  async componentDidMount() {
     
    
        SplashScreen.hide();
    
  }

  gotoMainTabs=async()=>{
    await AsyncStorage.setItem("FirstTimeUser", JSON.stringify("NotFirstTime"));

    startTabs();
  }

  
  // move next screen on swiper screens
  swiperincrease = () => {
    this.refs.swiper.scrollBy(1);
  };
  // move previose screen on swiper screens
  swiperdecrease = () => {
    this.refs.swiper.scrollBy(-1);
  };
  // Skip all the process and Navigate to SelectLocation screen
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 8}}>
         

          <Swiper
            style={styles.wrapper}
            ref="swiper"
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(200,200,200,.6)',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 0,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#a1863e',
                  width: 11,
                  height: 11,
                  borderRadius: 6,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 0,
                }}
              />
            }
            loop={false}
            onIndexChanged={index => this.setState({swiperIndex: index})}>
            <View style={styles.slider}>
              <View style={styles.sliderItemcontainer}>
                <Image
                  style={styles.image}
                  source={slider1}
                  resizeMode="contain"></Image>
              </View>
              <View style={{flex: 2, width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 22,
                    marginTop: 0,
                  }}>
                  Meditaion
                </Text>
                <Text
                  style={{
                    color: '#b1b1b1',
                    fontSize: 15,
                    marginTop: 10,
                    textAlign: 'center',
                    marginHorizontal: 30,
                  }}>
                     Meditation brings wisdom! lack of meditation leaves ignorance. Know well what leads you forward and what hold you back, and choose the path that leads to wisdom.
                </Text>
              </View>
            </View>

            <View style={styles.slider}>
              <View style={styles.sliderItemcontainer}>
                <Image
                  style={styles.image}
                  source={slider2}
                  resizeMode="contain"></Image>
              </View>
              <View style={{flex: 2, width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 22,
                    marginTop: 0,
                  }}>
                  Learn Life Changing Skills!
                </Text>
                <Text
                  style={{
                    color: '#b1b1b1',
                    fontSize: 15,
                    marginTop: 10,
                    textAlign: 'center',
                    marginHorizontal: 30,
                  }}>
                 Music can have a profound effect on mood, including confidence level or how relaxed you are.
                </Text>
              </View>
            </View>

            <View style={styles.slider}>
              <View style={styles.sliderItemcontainer}>
                <Image
                  style={styles.image}
                  source={slider3}
                  resizeMode="contain"></Image>
              </View>
              <View style={{flex: 2, width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 22,
                    marginTop: 0,
                  }}>
                  Nourished Inside and Out!
                </Text>
                <Text
                  style={{
                    color: '#b1b1b1',
                    fontSize: 15,
                    marginTop: 10,
                    textAlign: 'center',
                    marginHorizontal: 30,
                  }}>
                  If you focus on results, you will never change. If you focus
                  on change, you will get results.
                </Text>
              </View>
            </View>
          </Swiper>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1, width: '100%'}}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 50,
              }}>
              <View
                style={{width: '25%', height: '100%', alignItems: 'center'}}>
                {this.state.swiperIndex > 0 && (
                  <TouchableOpacity
                    style={{
                      width: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (this.state.swiperIndex > 0) {
                        this.refs.swiper.scrollBy(-1);
                      }
                    }}>
                    <Text
                      style={
                        this.state.swiperIndex == 0
                          ? {color: '#B1B1B1', padding: 5}
                          : {color: '#a1863e', padding: 5}
                      }>
                      Previous
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{width: '50%', height: '100%'}}></View>
              <View
                style={{width: '25%', height: '100%', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.state.swiperIndex == 2
                      ? this.gotoMainTabs()
                      : this.refs.swiper.scrollBy(1);
                  }}>
                  <Text style={{color: '#a1863e', padding: 5}}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('myproject', () => IntroSwiperScreen);

const styles = StyleSheet.create({
  wrapper: {},
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 100,
    width: 300,
    height: 300,
  },
  sliderItemcontainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textDesign: {
    color: '#B1B1B1',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 10,
  },
});
