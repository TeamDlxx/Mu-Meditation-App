/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, useEffect} from 'react';
import { Navigation } from "react-native-navigation";
import {registerScreens} from './src/screens/screens';
import startMainTabs from './src/screens/StartMainTabs'



registerScreens();


import TrackPlayer from "react-native-track-player";

import righticon from "./src/assets/icons/rightRound.png"
import AsyncStorage from '@react-native-community/async-storage';

let startScreen = "IntroSwiperScreen";
// let startScreen = "LoginScreen";

// let startScreen = "Swiper";
// let startScreen = "testScreen";
// let startScreen = "playScreen"
// let startScreen = "backgroundEffects"
// let startScreen = "favouritesScreen"
// let startScreen = "termOfUse"

TrackPlayer.setupPlayer({waitForBuffer: false}).then(() => {
    TrackPlayer.updateOptions({
        // Whether the player should stop running when the app is closed on Android
        stopWithApp: true,
        jumpInterval: 15,
       
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_STOP,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SEEK_TO,
            TrackPlayer.CAPABILITY_JUMP_FORWARD,
            TrackPlayer.CAPABILITY_JUMP_BACKWARD
        ],
        // An array of capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_STOP,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SEEK_TO,
            TrackPlayer.CAPABILITY_JUMP_FORWARD,
            TrackPlayer.CAPABILITY_JUMP_BACKWARD
        ]
    })
})

  Navigation.events().registerAppLaunchedListener(async() => {
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        drawBehind: true,
        animated: true
      },
      statusBar: {
        backgroundColor: '#a1863e',
        style:"dark-content",
      },

    
    });



 let mainScreen = "";




 let firestTimeUser = JSON.parse(await AsyncStorage.getItem('FirstTimeUser'));
 let isLogin = JSON.parse(await AsyncStorage.getItem('isLogin'));



 if(firestTimeUser == "" || firestTimeUser == null || firestTimeUser == undefined){
  //  startScreen = "Swiper"
   startScreen = "IntroSwiperScreen"

   
 }
//  if(isLogin == "" || isLogin == null || isLogin == undefined){
//   //  startScreen = "Swiper"
//    startScreen = "LoginScreen"
//   //  startScreen = "ChangePasswordScreen"


   
//  

    if (startScreen === "") {

  startMainTabs();



      
    }

    else{

      mainScreen = startScreen;
      Navigation.setRoot({


        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'poisedAthleteMeditation.' + mainScreen
                }

              }
            ],
          }
        }
      });
    }





  });


