import React, { useEffect, useState, Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  ImageBackground,
  TouchableWithoutFeedback,
  Platform,
  PermissionsAndroid,
  Picker,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  SafeAreaView,
  BackHandler,
  ScrollView,
  AppState,
  Alert,
  

} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import LoadingGif from "../assets/loadinggif.gif";

let bgSoundsArray = [];
let bgSoundsArrayOffline = [];

import TrackPlayer from 'react-native-track-player';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
var Sound = require('react-native-sound');
import { Navigation } from 'react-native-navigation';
import RNFetchBlob from "rn-fetch-blob";
import BackgroundTimer from 'react-native-background-timer';
import NetInfo from "@react-native-community/netinfo";

import localTrack from '../assets/sample_audio.mp3';
import LeftArrow from '../assets/icons/LeftArrow.png';
import ProgressBar from '../components/ProgreeBar';
import whiteCross from '../assets/icons/whiteCross.png';
import Flower from '../assets/icons/download.jpeg';
import HeartIcon from '../assets/icons/hearticon.png';
import RightRound from '../assets/icons/rightRound.png';
import LeftRound from '../assets/icons/leftRound.png';
import playIcon from '../assets/icons/play.png';
import pauseIcon from '../assets/icons/pause.png';
import ArrowUp from '../assets/icons/arrow_up.png'
import oval from '../assets/icons/blue_bg.png';
import BlueHeart from '../assets/icons/blueheart.png';
import SplashScreen from 'react-native-splash-screen';
import Modal from "react-native-modal";
import DeviceInfo from 'react-native-device-info';

import CustomMarker from '../components/customMarker';
import CustomMarkerRain from '../components/customMarkerRain';
import CustomMarkerFire from '../components/customMarkerFire';
import CustomMarkerLeaves from '../components/customMarkerLeaves';
import CustomMarkerRiver from '../components/customMarkerFireRiver';
import CustomMarkerBirds from '../components/customMarkerBirds';
import CustomMarkerSnow from '../components/customMarkerSnow';

import DownloadIcon from '../assets/icons/downloadIcon.png';
import checkedIcon from '../assets/icons/checked.png';
import RNPickerSelect from 'react-native-picker-select';

import DownArrow from '../assets/icons/downArrow.png'

import firebase from "react-native-firebase";

import { domain } from '../components/utilities'


import NextIcon from "../assets/icons/next.png";
import PreviousIcon from "../assets/icons/previous.png";
import WebView from 'react-native-webview';

var i = 0;
var sliderLength = 325;
var musicEffect;
var rainEffect;
var fireEffect;
var leavesEffect;
var riverEffect;
var birdsEffect;
var snowEffect;

let favoriteTracksAsync = [];



const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


export default class PlayScreen extends Component {

  constructor() {

    super();

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);


    this.inputRefs = {};
    this.state = {

      hasReachedLockedTrack: false,
      switchValue: "",
      purchase: "",
      trackDescription: "",
      disableNextButton: false,
      disablePreviousButton: false,
      isSongLoaded: false,
      appState: AppState.currentState,
      delayEndingTime: 60,
      isAnimating: false,
      isDisabled: false,
      pauseOrPlay: playIcon,
      FavoritIcon: HeartIcon,
      isModalVisible: false,
      showPlayScreen: true,
      showBgEffectsScreen: false,
      trackImage: "",
      trackName: "",
      playListName: "",
      trackUrl: "",
      img: "",
      downloadedSong: "",
      isdownloaded: DownloadIcon,
      alreadyDownloaded: false,
      isSongFvrt: false,
      language: "5 min",

      musicEffectValue: 0,
      rainEffectValue: 0,
      fireEffectValue: 0,
      leavesEffectValue: 0,
      riverEffectValue: 0,
      birdsEffectValue: 0,
      snowEffectValue: 0,

      musicEffectPercentage: 0,
      rainEffectPercentagee: 0,
      fireEffectPercentage: 0,
      leavesEffectPercentage: 0,
      riverEffectPercentage: 0,
      birdsEffectPercenateg: 0,
      snowEffectPercentage: 0,
      indicator: false,
      songTime: 0,
      remainingTrackTime: 0,


      selectedTime: "1 Min",
      items: [

        {
          label: '2 Min',
          value: '2 Min',
        },
        {
          label: '3 Min',
          value: '3 Min',
        },
        {
          label: '4 Min',
          value: '4 Min',
        },
        {
          label: '5 Min',
          value: '5 Min',
        },
        {
          label: '6 Min',
          value: '6 Min',
        },
        {
          label: '7 Min',
          value: '7 Min',
        },
        {
          label: '8 Min',
          value: '8 Min',
        },
        {
          label: '9 Min',
          value: '9 Min',
        },
        {
          label: '10 Min',
          value: '10 Min',
        },
        {
          label: '11 Min',
          value: '11 Min',
        },
        {
          label: '12 Min',
          value: '12 Min',
        },
        {
          label: '13 Min',
          value: '13 Min',
        },
        {
          label: '14 Min',
          value: '14 Min',
        },
        {
          label: '15 Min',
          value: '15 Min',
        },
        {
          label: '16 Min',
          value: '16 Min',
        },
        {
          label: '17 Min',
          value: '17 Min',
        },
        {
          label: '18 Min',
          value: '18 Min',
        },
        {
          label: '19 Min',
          value: '19 Min',
        },
        {
          label: '20 Min',
          value: '20 Min',
        },
        {
          label: '21 Min',
          value: '21 Min',
        },
        {
          label: '22 Min',
          value: '22 Min',
        },
        {
          label: '23 Min',
          value: '23 Min',
        },
        {
          label: '24 Min',
          value: '24 Min',
        },
        {
          label: '25 Min',
          value: '25 Min',
        },
        {
          label: '26 Min',
          value: '26 Min',
        },
        {
          label: '27 Min',
          value: '27 Min',
        },
        {
          label: '28 Min',
          value: '28 Min',
        },
        {
          label: '29 Min',
          value: '29 Min',
        },
        {
          label: '30 Min',
          value: '30 Min',
        },
        {
          label: '31 Min',
          value: '31 Min',
        },
        {
          label: '32 Min',
          value: '32 Min',
        },
        {
          label: '33 Min',
          value: '33 Min',
        },
        {
          label: '34 Min',
          value: '34 Min',
        },
        {
          label: '35 Min',
          value: '35 min',
        },
        {
          label: '36 min',
          value: '36 Min',
        },
        {
          label: '37 Min',
          value: '37 Min',
        },
        {
          label: '38 Min',
          value: '38 Min',
        },
        {
          label: '39 Min',
          value: '39 Min',
        },
        {
          label: '40 Min',
          value: '40 Min',
        },

        {
          label: '41 Min',
          value: '41 Min',
        },
        {
          label: '42 Min',
          value: '42 Min',
        },
        {
          label: '43 Min',
          value: '43 Min',
        },

        {
          label: '44 Min',
          value: '44 Min',
        },
        {
          label: '45 Min',
          value: '45 Min',
        },
        {
          label: '46 Min',
          value: '46 Min',
        },
        {
          label: '47 Min',
          value: '47 Min',
        },
        {
          label: '48 Min',
          value: '48 Min',
        },
        {
          label: '49 Min',
          value: '49 Min',
        },
        {
          label: '50 Min',
          value: '50 Min',
        },
        {
          label: '51 Min',
          value: '51 Min',
        },
        {
          label: '52 Min',
          value: '52 Min',
        },
        {
          label: '53 Min',
          value: '53 Min',
        },
        {
          label: '54 Min',
          value: '54 Min',
        },
        {
          label: '55 Min',
          value: '55 Min',
        },
        {
          label: '56 Min',
          value: '56 Min',
        },
        {
          label: '57 Min',
          value: '57 Min',
        },
        {
          label: '58 Min',
          value: '58 Min',
        },
        {
          label: '59 Min',
          value: '59 Min',
        },
        {
          label: '60 Min',
          value: '60 Min',
        },


      ],
      bgSoundsArrayOffline: [],
      tracksArrayRecieved: [],
      currentPlayingIndex: "",
      currentTab:'audio',

    };
  }





  cancelButnModal = () => {
    this.setState({ selectedTime: "5 Min" });
    this.toggleModal()
  }


  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }


  extention = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }




  checkPermissionForDownload = async ()=>{


      // permssions to write to storage
      if (Platform.OS == "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Asking for Permissions',
            message:
              'Poised meditation App needs access to your External storage ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the storage");
          this.downloadFunction();

        } else {
          console.log("WRITE_EXTERNAL_STORAGE permission denied");
        }


        
      }
      else{

        this.downloadFunction();


      }
      // permssions to write to storage


    this.downloadFunction();
  }


  downloadFunction = async () => {

    console.log(this.state.alreadyDownloaded, "lklaklkakkkll");

    if (this.state.indicator === "downloading") {

      alert("The track is being downloaded");
      return;

    }

    this.setState({ indicator: "downloading" })


    if (this.state.isInternetConnected === false) {
      alert("You are not connected to internet");
      return;
    }

    // await  this.setState({isAnimating:true, isDisabled:true});
    var date = new Date();
    var url = domain + this.props.track.songUrl;
    var ext = this.extention(url);
    let options = "";
    const { config, fs } = RNFetchBlob
    let PictureDir = fs.dirs.PictureDir
    ext = "." + ext[0];

    if (Platform.OS == "android") {

      options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          // path:  RNFetchBlob.fs.dirs.DocumentDir + '/courseSections/file'+this.props.track._id+ext,
          description: 'Downloading file.',
          // path:  RNFetchBlob.fs.dirs.DocumentDir+this.props.track._id+ext,
          path: PictureDir + "/Sound_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        }
      }

    }
    else {
      options = {
        fileCache: true,
        path: RNFetchBlob.fs.dirs.DocumentDir + '/courseSections/file' + this.props.track._id + ext,
      }
    }
    if (this.state.alreadyDownloaded === true) {

      console.log("is already downloaded true")

      await this.setState({ isDisabled: false, isAnimating: false, indicator: true });

    }

    else {

      console.log("is already downloaded false")

      let offlineArray = [];
      let abc = "";

      let myTrack = this.props.track;
      let base64Str = "";
      if (this.props.track.imgUrl !== null && this.props.track.imgUrl !== "" && this.props.track.imgUrl !== undefined) {

        if (this.props.track.imgUrl.includes("data:image/png;base64")) {


        }
        else {

          RNFetchBlob.fetch('GET', domain + this.props.track.imgUrl, {
            Authorization: '',
          })
            .then((res) => {
              let status = res.info().status;
              if (status == 200) {

                base64Str = res.base64();
                abc = base64Str;
                console.log("data:image/png;base64," + base64Str, "image into sabe64 string");
                myTrack.imgUrl = "data:image/png;base64," + base64Str;
              }
            })
            .catch((errorMessage, statusCode) => {
              console.log(errorMessage)
            })

        }
      }

      else {
        console.log("no image")
      }
      if (myTrack.songUrl !== undefined && myTrack.songUrl !== "" && myTrack.songUrl !== null) {

        if (myTrack.songUrl.includes("file:///")) {
          //add to offlie songs
          let ar = [];
          let abc = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
          if (abc !== "" && abc !== undefined && abc !== null) {
            ar = abc;
          }
          ar.push(myTrack);
          await AsyncStorage.setItem("OfflineSongs", JSON.stringify(ar));
          // alert("Success Downloaded");

          this.setState({ isdownloaded: checkedIcon, isDisabled: false, isAnimating: false, indicator: true });
          //add to offlie songs

        }
        else {

          var date = new Date();
          var url = domain + this.props.track.songUrl;
          // var url       = domain+"/media/audio_files/sample_audio.mp3";
          var ext = this.extention(url);
          ext = "." + ext[0];
          const { config, fs } = RNFetchBlob
          let PictureDir = fs.dirs.PictureDir

          config(options).fetch('GET', url).then(async (res) => {
            console.log(res.data, "success downloaded");
            myTrack.songUrl = "file://" + res.data;


            //add to offlie songs
            let ar = [];
            let abc = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
            if (abc !== "" && abc !== undefined && abc !== null) {
              ar = abc;
            }
            ar.push(myTrack);
            await AsyncStorage.setItem("OfflineSongs", JSON.stringify(ar));
            // alert("Success Downloaded");

            this.setState({ isdownloaded: checkedIcon, isDisabled: false, isAnimating: false, indicator: true });
            //add to offlie songs

          });

        }

      }
      else {
        console.log("no song");
      }


      await offlineArray.push(myTrack);
      console.log(abc, "before adding to async qwerty");


    }

  }



  toggleScreens = () => {
    this.setState({
      showBgEffectsScreen: !this.state.showBgEffectsScreen,
      showPlayScreen: !this.state.showPlayScreen
    });

    // if(this.state.showBgEffectsScreen === true && Platform.OS == "android"){

    //   StatusBar.setBarStyle('light-content');
    //   StatusBar.setBackgroundColor("#6B98F8");

    // }

    // if(this.state.showPlayScreen == true){

    //     StatusBar.setBarStyle('dark-content');
    //     StatusBar.setBackgroundColor("white");


    // }
  }

  resetTheTrack = async () => {

    console.log("reset the track is calling")
    await AsyncStorage.setItem("currenteplayingtrack", JSON.stringify(""));

    if (this.state.switchValue === true) {
      this.moveToNextSong();
    }

    else {

      this.setState({ pauseOrPlay: playIcon });

      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: '1',
        // url: 'file:///var/mobile/Containers/Data/Application/AD31F327-2BC2-431F-80DF-6CB1870C7E9B/Documents/courseSections/file6.mp4',
        url: this.state.trackUrl,
        // "url":localTrack,
        // title: this.state.trackName,
        // artist: this.state.playListName,
        artwork: this.state.trackImage,

        title: this.state.trackName,
        artist: this.state.playListName,
        album: '',
        genre: 'Progressive House, Electro House',
      });

    }


  }



  setPlayicon = () => {

    console.log('play icon set called');
    this.setState({ pauseOrPlay: playIcon });
    funCalled = true;
    TrackPlayer.reset();
    TrackPlayer.add({
      id: '2',
      // url: 'file:///var/mobile/Containers/Data/Application/AD31F327-2BC2-431F-80DF-6CB1870C7E9B/Documents/courseSections/file6.mp4',
      url: this.state.trackUrl,
      // "url":localTrack,
      title: this.state.trackName,
      artist: this.state.playListName,
      album: '',
      genre: 'Progressive House, Electro House',
      artwork: this.state.trackImage,
    });
  };

  setPlayicon2 = () => {
    this.setState({ pauseOrPlay: pauseIcon });
  };


  moveTo = async (val) => {


    const duration = await TrackPlayer.getDuration();
    const postion = await TrackPlayer.getPosition();
    const difference = duration - postion;

    var matches = this.state.selectedTime.match(/(\d+)/);
    let timeInSeconds = matches[0] * 60;

    let newTime = difference + timeInSeconds;




    this.setState({ delayEndingTime: newTime });

    console.log(this.state.delayEndingTime, "lsodiuudhhgg")


    if (this.state.pauseOrPlay === playIcon) {
      this.setState({ pauseOrPlay: pauseIcon })
    }

    await TrackPlayer.seekTo(val);
    await TrackPlayer.play();
    // console.log(val, "val recieved from progress component")


  }


  musicEffectPlayingFunc = () => {

    // if(flag==0)
    // {
    console.log('playsound 1 chala qwerty');

    musicEffect.play((success) => {
      if (success) {

        // this.musicEffectPlayingFunc();

      } else {
        console.log('playback failed due to audio decoding errors');
      }


    });
    musicEffect.setNumberOfLoops(-1);
  }

  // flag=1
  // }






  rainEffectPlayingFunc = () => {


    rainEffect.play((success) => {
      if (success) {

        // this.rainEffectPlayingFunc();

      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
    rainEffect.setNumberOfLoops(-1);

  }


  fireEffectPlayingFunc = () => {

    fireEffect.play((success) => {
      if (success) {

        // this.fireEffectPlayingFunc()
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    fireEffect.setNumberOfLoops(-1);

  }

  leavesEffectPlayingFunc = () => {
    leavesEffect.play((success) => {
      if (success) {
        console.log("finished playing")
        // this.leavesEffectPlayingFunc()
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    leavesEffect.setNumberOfLoops(-1);

  }




  riverEffectPlayingFunc = () => {

    riverEffect.play((success) => {
      if (success) {

        // this.riverEffectPlayingFunc()
      } else {
        console.log('playback failed due to audio decoding errors');
      }

    });

    riverEffect.setNumberOfLoops(-1);

  }




  birdsEffectPlayingFunc = () => {

    birdsEffect.play((success) => {
      if (success) {

        // this.birdsEffectPlayingFunc();
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    birdsEffect.setNumberOfLoops(-1);

  }



  snowEffectPlayingFunc = () => {

    snowEffect.play((success) => {
      if (success) {

        // this.snowEffectPlayingFunc()
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    snowEffect.setNumberOfLoops(-1);

  }



  loadBgSounds = async () => {

    //   sound 1
    musicEffect = new Sound("music.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + musicEffect.getDuration() + 'number of channels: ' + musicEffect.getNumberOfChannels());
    });
    //   sound 1


    // sound 2
    rainEffect = new Sound("rain.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + rainEffect.getDuration() + 'number of channels: ' + musicEffect.getNumberOfChannels());
    });
    // sound 2



    //  sound 3
    fireEffect = new Sound("fire.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + fireEffect.getDuration() + 'number of channels: ' + musicEffect.getNumberOfChannels());
    });
    //  sound 3


    //  sound 4
    leavesEffect = new Sound("leaves.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + leavesEffect.getDuration() + 'number of channels: ' + musicEffect.getNumberOfChannels());
    });
    //  sound 4



    //  sound 5
    riverEffect = new Sound("river.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + riverEffect.getDuration() + 'number of channels: ' + musicEffect.getNumberOfChannels());
    });
    //  sound 5



    //  sound 6
    birdsEffect = new Sound("birds.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + birdsEffect.getDuration() + 'number of channels: ' + musicEffect.getNumberOfChannels());
    });
    //  sound 6


    //  sound 7
    snowEffect = new Sound("snow.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + snowEffect.getDuration() + 'number of channels: ' + musicEffect.getNumberOfChannels());
    });
    //  sound 7

  }


  _handleAppStateChange = async (nextAppState) => {

    const state = await TrackPlayer.getState();


    console.log(nextAppState, "current app state");


    if (nextAppState === "active") {

      if (state === TrackPlayer.STATE_PAUSED) {

        this.setState({ pauseOrPlay: playIcon });

      }

      else if (state === TrackPlayer.STATE_PLAYING) {

        this.setState({ pauseOrPlay: pauseIcon });

      }
    }



    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {


      console.log('App has come to the foreground!');


    }
    this.setState({ appState: nextAppState });
  }


  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  handleBackButtonClick() {


    this.BackFunction();


  }


  checkIfTheSongIsFvrtOrDownloaded = async (track) => {

    let abc = false;
    let abc2 = false;
    // song is  downloaded?
    let offlineSongs = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
    if (offlineSongs !== null && offlineSongs !== undefined && offlineSongs !== "") {
      for (let i = 0; i < offlineSongs.length; i++) {
        if (track._id === offlineSongs[i]._id) {
          abc = true;
          this.setState({ isdownloaded: checkedIcon, alreadyDownloaded: true, downloadedSong: offlineSongs[i] });
        }


        // else{
        //   this.setState({isdownloaded:DownloadIcon})
        // }
      }

      if (abc === false) {
        console.log("is ne false krdia ?")

        await this.setState({ isdownloaded: DownloadIcon, alreadyDownloaded: false })

      }
    }

    // song is  downloaded?

    // is song favorite?

    favoriteTracksAsync = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
    if (favoriteTracksAsync !== null && favoriteTracksAsync !== "" && favoriteTracksAsync !== undefined) {
      console.log(favoriteTracksAsync, "djkshdyssw");
      for (let i = 0; i < favoriteTracksAsync.length; i++) {
        if (track._id === favoriteTracksAsync[i]._id) {
          abc2 = true;
          this.setState({ FavoritIcon: BlueHeart, isSongFvrt: true, alreadyDownloaded: true, isdownloaded: checkedIcon });
        }
      }
      if (abc2 === false) {
        this.setState({ isSongFvrt: false, FavoritIcon: HeartIcon, alreadyDownloaded: false, isdownloaded: DownloadIcon })
      }
    }

    // is song favorite?    
  }


  moveToNextSong = async () => {

    if (this.state.indicator === "downloading") {
      alert("Please wait a few seconds, the track is being downloaded.");
      return
    }
    let songUrl = "";
    await this.setState({ currentPlayingIndex: this.state.currentPlayingIndex + 1, isSongLoaded: false });
    console.log(this.state.currentPlayingIndex, "moveToNextSong");
    if (this.state.currentPlayingIndex < this.state.tracksArrayRecieved.length) {
      let track = this.state.tracksArrayRecieved[this.state.currentPlayingIndex];

      this.checkIfTheSongIsFvrtOrDownloaded(track);

      if (track.lock === false || this.state.purchase !== "" || this.props.FromFavorites !== undefined) {

        if (track.songUrl.includes("file:///")) {
          songUrl = track.songUrl
        }
        else {
          songUrl = domain + track.songUrl
        }

        if (this.props.FromFavorites !== undefined) {
          await this.setState({ trackImage: track.imgUrl })
        }

        else {

          await this.setState({ trackImage: domain + track.imgUrl })

        }

        await this.setState({ trackName: track.name, trackDescription: track.description, })

        await TrackPlayer.reset();

        await TrackPlayer.add({
          id: track._id,
          // url: 'file:///var/mobile/Containers/Data/Application/AD31F327-2BC2-431F-80DF-6CB1870C7E9B/Documents/courseSections/file6.mp4',
          url: songUrl,
          // "url":localTrack,
          title: track.name,
          artist: this.state.playListName,
          album: '',
          genre: 'Progressive House, Electro House',
          artwork: this.state.trackImage,
        });

        await TrackPlayer.play();


        setTimeout(() => {
          this.setState({ isSongLoaded: true, pauseOrPlay: pauseIcon, disablePreviousButton: false })
        }, 1000);



      }
      else {

        await this.setState({ currentPlayingIndex: this.state.currentPlayingIndex - 1, isSongLoaded: true });



        Alert.alert(
          'Upgrade to premium',
          "Please upgrade to premium to enjoy more tracks.",
          [
            {
              text: 'Cancel', onPress: () => {
                console.log("user canceled")
              }
            },
            {
              text: 'Upgrade', onPress: async () => {

                this.gotoUpgradeScreen()
              }
            },
          ],
          { cancelable: false }
        )
        await TrackPlayer.reset();
        await TrackPlayer.add({
          id: '1',
          // url: 'file:///var/mobile/Containers/Data/Application/AD31F327-2BC2-431F-80DF-6CB1870C7E9B/Documents/courseSections/file6.mp4',
          url: this.state.trackUrl,
          // "url":localTrack,
          // title: this.state.trackName,
          // artist: this.state.playListName,
          artwork: this.state.trackImage,

          title: this.state.trackName,
          artist: this.state.playListName,
          album: '',
          genre: 'Progressive House, Electro House',
        });

        await TrackPlayer.play();
        await this.setState({ hasReachedLockedTrack: true });


      }



    }

    else {
      // alert("no more tracks");
      await this.setState({ disableNextButton: true, disablePreviousButton: false, isSongLoaded: true, currentPlayingIndex: this.state.currentPlayingIndex - 1 });

    }


  }

  moveToPreviousSong = async () => {


    await this.setState({ hasReachedLockedTrack: false })

    if (this.state.indicator === "downloading") {
      alert("Please wait a few seconds, the track is being downloaded.");
      return
    }



    let songUrl = "";

    await this.setState({ currentPlayingIndex: this.state.currentPlayingIndex - 1, isSongLoaded: false });
    console.log(this.state.currentPlayingIndex, "moveToPreviousSong");

    if (this.state.currentPlayingIndex > 0 || this.state.currentPlayingIndex === 0) {
      let track = this.state.tracksArrayRecieved[this.state.currentPlayingIndex];

      this.checkIfTheSongIsFvrtOrDownloaded(track);
      if (track.lock === false || this.state.purchase !== "" || this.props.FromFavorites !== undefined) {

        if (track.songUrl.includes("file:///")) {
          songUrl = track.songUrl
        }
        else {
          songUrl = domain + track.songUrl
        }

        if (this.props.FromFavorites !== undefined) {
          await this.setState({ trackImage: track.imgUrl })
        }

        else {
          await this.setState({ trackImage: domain + track.imgUrl })
        }

        await this.setState({ trackName: track.name, trackDescription: track.description })

        await TrackPlayer.reset();

        await TrackPlayer.add({
          id: track._id,
          // url: 'file:///var/mobile/Containers/Data/Application/AD31F327-2BC2-431F-80DF-6CB1870C7E9B/Documents/courseSections/file6.mp4',
          url: songUrl,
          // "url":localTrack,
          title: track.name,
          artist: this.state.playListName,
          album: '',
          genre: 'Progressive House, Electro House',
          artwork: this.state.trackImage,
        });

        await TrackPlayer.play();

        setTimeout(() => {
          this.setState({ isSongLoaded: true, pauseOrPlay: pauseIcon })
        }, 1000);


        console.log(track, this.state.currentPlayingIndex, "next extracted track...");
        //then add to TrackPlayer
      }
      else {
        this.setState({ isSongLoaded: true })
        this.gotoUpgradeScreen();
        console.log("go to subscirption screen")
      }

    }

    else {

      // no more tracks
      await this.setState({ disablePreviousButton: true, disableNextButton: false, isSongLoaded: true, currentPlayingIndex: this.state.currentPlayingIndex + 1 });
    }

  }

  gotoUpgradeScreen = () => {

    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.upgradeScreen',
        passProps: {
          refresh: this.refresh,
        },

        options: {
          bottomTabs: { visible: false, popGesture: false },
        }
      }
    });

  }

  refresh = async () => {

    let currentPurchase = JSON.parse(await AsyncStorage.getItem('ActiveOffer'));
    if (currentPurchase !== null && currentPurchase !== "" && currentPurchase !== undefined) {
      await this.setState({ purchase: currentPurchase })
    }

  }


  didMountCode = async () => {

    firebase.analytics().logEvent("Play_Screen");
    firebase.analytics().setCurrentScreen("Play_Screen", "Play_Screen");


    if (this.props.tracksArray.length === 1) {
      await this.setState({ switchValue: false })
    }
    else {

      let switchValue = JSON.parse(await AsyncStorage.getItem('SwitchValue'));
      await this.setState({ switchValue: switchValue });

    }




    // console.log(this.state.switchValue, "switch value is")
    // console.log(this.props.track, "the track recieved is")


    let currentPurchase = JSON.parse(await AsyncStorage.getItem('ActiveOffer'));

    if (currentPurchase !== null && currentPurchase !== "" && currentPurchase !== undefined) {
      await this.setState({ purchase: currentPurchase })
    }

    await this.setState({ tracksArrayRecieved: this.props.tracksArray, trackDescription: this.props.track.description });
    if (this.props.tracksArray.length === 1) {
      await this.setState({ disableNextButton: true, disablePreviousButton: true });
    }
    let myindex = this.state.tracksArrayRecieved.findIndex(x => x.name === this.props.track.name);
    await this.setState({ currentPlayingIndex: myindex });


    AppState.addEventListener('change', this._handleAppStateChange);



    // if(Platform.OS == "android"){

    //       StatusBar.setBarStyle('light-content');
    //       StatusBar.setBackgroundColor("#6B96F8");

    //   }


    try {

      // // permssions to write to storage
      // if (Platform.OS == "android") {
      //   const granted = await PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //     {
      //       title: 'Asking for Permissions',
      //       message:
      //         'Poised meditation App needs access to your External storage ',
      //       buttonNeutral: 'Ask Me Later',
      //       buttonNegative: 'Cancel',
      //       buttonPositive: 'OK',
      //     },
      //   );
      //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //     console.log("You can use the storage");
      //   } else {
      //     console.log("WRITE_EXTERNAL_STORAGE permission denied");
      //   }


        
      // }
      // // permssions to write to storage



      // song is  downloaded?
      let offlineSongs = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
      if (offlineSongs !== null && offlineSongs !== undefined && offlineSongs !== "") {
        for (let i = 0; i < offlineSongs.length; i++) {
          if (this.props.track._id === offlineSongs[i]._id) {
            this.setState({ isdownloaded: checkedIcon, alreadyDownloaded: true, downloadedSong: offlineSongs[i] });
          }
          // else{
          //   this.setState({isdownloaded:DownloadIcon})
          // }
        }
      }

      // song is  downloaded?



      // is song favorite?

      // console.log(this.props.track, "this . props.track is")
      favoriteTracksAsync = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
      if (favoriteTracksAsync !== null && favoriteTracksAsync !== "" && favoriteTracksAsync !== undefined) {
        // console.log(favoriteTracksAsync, "djkshdyssw");
        for (let i = 0; i < favoriteTracksAsync.length; i++) {
          if (this.props.track._id === favoriteTracksAsync[i]._id) {
            this.setState({ FavoritIcon: BlueHeart, isSongFvrt: true, });
          }
        }
      }
      // is song favorite?




      // check for internet 
      const unsubscribe = NetInfo.addEventListener(async state => {
        // console.log("Connection type", state.type);
        // console.log("Is connected?", state.isConnected);
        await this.setState({ isInternetConnected: state.isConnected });
        if (state.isConnected === false) {
          if (this.state.isSongFvrt === false && this.state.alreadyDownloaded === false) {
            alert("You are offline, Please connect to your internet or listen to favorite or offline songs.");
            this.setState({ pauseOrPlay: playIcon })
          }

        }
        else {

          // console.log("inernet is hai")

        }
      })
      // check for internet 
      const DeviceToken = JSON.parse(await AsyncStorage.getItem('DeviceToken'));
      await this.setState({ deviceToken: DeviceToken });
      console.log(this.state.deviceToken, "dvtoken");


      this.loadBgSounds();


      if (this.props.FromFavorites !== undefined) {
        let PlayListName = JSON.parse(await AsyncStorage.getItem('PlayListName'));
        console.log("111 includes")


        this.setState({
          trackImage: this.props.track.imgUrl,
          trackName: this.props.track.name,
          playListName: PlayListName,
          trackUrl: this.props.track.songUrl
        })
      }
      else if (this.props.playListName !== undefined) {

        if (this.state.alreadyDownloaded === true) {
          console.log("222 includes")
          this.setState({
            playListName: this.props.playListName,
            trackName: this.props.track.name,
            trackUrl: this.state.downloadedSong.songUrl,
            trackImage: this.state.downloadedSong.imgUrl,
          })

        }
        else {
          console.log("333 includes")

          if (this.props.track.imgUrl.includes("data:image/png;base64")) {
            this.setState({ trackImage: this.props.track.imgUrl, })
          }
          else {
            this.setState({ trackImage: domain + this.props.track.imgUrl, })
          }

          this.setState({
            playListName: this.props.playListName,
            trackName: this.props.track.name,
            trackUrl: domain + this.props.track.songUrl,

          })
        }



      }
      else {

        if (this.state.alreadyDownloaded === true) {

          console.log("alreadyDownloaded is true")
          this.setState({
            trackImage: this.state.downloadedSong.imgUrl,
            trackName: this.props.track.name,
            playListName: this.props.track.playlist[0].name,
            trackUrl: this.state.downloadedSong.songUrl
          })
        }

        else {

          console.log("555", this.props.track.songUrl)

          if (this.props.track.songUrl.includes("data:image/png;base64")) {
            console.log("555 includes")
            this.setState({ trackImage: this.props.track.imgUrl })
          } else {
            this.setState({ trackImage: domain + this.props.track.imgUrl, })
          }

          await this.setState({
            trackName: this.props.track.name,
            playListName: this.props.track.playlist[0].name,
            trackUrl: domain + this.props.track.songUrl
          })
        }



      }

      console.log(this.state.trackImage, "track ki picture")
      this.loadTheSound();

      console.log(this.state.playListName, "playlist name khahahah")

      await AsyncStorage.setItem("PlayListName", JSON.stringify(this.state.playListName));

      BackgroundTimer.runBackgroundTimer(() => {

        var time = this.state.delayEndingTime;
        time = time - 1;

        this.setState({ songTime: this.state.songTime - 1 })
        this.setState({ delayEndingTime: time });

        if (this.state.delayEndingTime == 0) {
          this.stopBgSounds();
          this.setState({ musicEffectValue: 0, musicEffectPercentage: 0, rainEffectValue: 0, rainEffectPercentagee: 0, fireEffectValue: 0, fireEffectPercentage: 0, leavesEffectValue: 0, riverEffectValue: 0, riverEffectPercentage: 0, leavesEffectPercentage: 0, birdsEffectValue: 0, birdsEffectPercenateg: 0, snowEffectValue: 0, snowEffectPercentage: 0, });
          BackgroundTimer.stopBackgroundTimer();
        }

        // console.log(time,"timer is "+this.state.delayEndingTime);
      },
        1000);


        console.log(this.state.trackUrl , "track url is")

    }
    catch (e) {
      console.log(e, "issue in didmount code")
    }


    // console.log(this.state.trackName,'this.state.trackName....qqww');
    let name = this.state.trackName;
    name = name.replace(/\s+/g, '_');
    name = name.replace('&', '_');

    // console.log(name,"name...qqww2");

    
    firebase.analytics().logEvent("Playing_"+name);
    // firebase.analytics().setCurrentScreen("Home_Screen", "Home_Screen")


  }


  loadTheSound = async () => {

    const state = await TrackPlayer.getState();

    const cirrenttrack = JSON.parse(await AsyncStorage.getItem('currenteplayingtrack'));

    console.log("load the sound called")
    if (state === "STATE_PLAYING" || state == 3 && cirrenttrack === this.state.trackUrl) {

      await this.setState({ pauseOrPlay: pauseIcon });

    }

    else {

      await TrackPlayer.reset();

      await TrackPlayer.add({
        id: '3',
        url: this.state.trackUrl,
        // "url":localTrack,
        // url: 'file:///var/mobile/Containers/Data/Application/AD31F327-2BC2-431F-80DF-6CB1870C7E9B/Documents/courseSections/file6.mp4',
        title: this.state.trackName,
        artist: this.state.playListName,
        album: '',
        genre: 'Progressive House, Electro House',
        artwork: this.state.trackImage,
      });

      await AsyncStorage.setItem("currenteplayingtrack", JSON.stringify(this.state.trackUrl));
      //  setTimeout(() => {
      await this.setState({ isSongLoaded: true })


      if (this.state.isInternetConnected === true) {

        await TrackPlayer.play();
        setTimeout(async () => {
          await this.setState({ pauseOrPlay: pauseIcon })

        }, 1000);


      }

      setTimeout(async () => {

        let time = await TrackPlayer.getDuration();

        await this.setState({ songTime: time, delayEndingTime: this.state.delayEndingTime + time });

        console.log(this.state.songTime, "sdfwhfnwqwyyaouwyyyr34yyur")
      }, 2000);



      //  }, 3000); 
    }

  }

  doneButnModal = async () => {

    this.toggleModal();
    let time = this.state.selectedTime;
    var matches = time.match(/(\d+)/);
    let timeInSeconds = matches[0] * 60;
    await this.setState({ delayEndingTime: timeInSeconds + this.state.songTime })
    console.log(this.state.delayEndingTime, "numeric part of string");

  }


  async componentDidMount() {

    this.didMountCode();
  }



  BackFunction = async () => {




    try{

  
    await this.props.refresh();

    if (this.props.FromFavorites === undefined) {
      await this.props.refresh();
    }
    console.log(this.state.indicator, "indicator is at")
    if (this.state.indicator === true || this.state.indicator === false) {
      await this.stopBgSounds();
      await AsyncStorage.setItem("currenteplayingtrack", JSON.stringify(""));
      let offlineSongs = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
      console.log(offlineSongs, "offline songs... qwerty")
      await TrackPlayer.reset();
      if (this.props.FromFavorites !== undefined) {
        await this.props.refresh()
      }
      Navigation.pop(this.props.componentId);
    }
    else if (this.state.indicator === "downloading") {
      alert("Please wait a few seconds, the track is being downloaded.")
    }


  }catch(e){
    console.log("favourtieiei", e)
  }

  }




  stopBgSounds = () => {
    musicEffect.stop();
    rainEffect.stop();
    fireEffect.stop();
    leavesEffect.stop();
    riverEffect.stop();
    birdsEffect.stop();
    snowEffect.stop();
  }



  checkPermissionForFavoriteFunction = async () => {

    // permssions to write to storage

    if (Platform.OS == "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Asking for Permissions',
          message:
            'Poised meditation App needs access to your External storage ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the storage");
        this.favoriteFunction();

      } else {
        console.log("WRITE_EXTERNAL_STORAGE permission denied");
      }


      
    }
    else{
      this.favoriteFunction();
      
    }


  }


  favoriteFunction = async () => {

    if (this.state.indicator === "downloading") {

      alert("The track is being downloaded");
      return;

    }

    this.setState({ indicator: "downloading" })

    if (this.state.isInternetConnected === false) {
      alert("You are not connected to internet");
      return;
    }

    else {


      var date = new Date();
      var url = domain + this.props.track.songUrl;
      var ext = this.extention(url);
      let options = "";
      const { config, fs } = RNFetchBlob
      let PictureDir = fs.dirs.PictureDir
      ext = "." + ext[0];

      if (Platform.OS == "android") {

        options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            // path:  RNFetchBlob.fs.dirs.DocumentDir + '/courseSections/file'+this.props.track._id+ext,
            description: 'Downloading file.',
            // path:  RNFetchBlob.fs.dirs.DocumentDir+this.props.track._id+ext,
            path: PictureDir + "/Sound_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
          }
        }

      }
      else {
        options = {
          fileCache: true,
          path: RNFetchBlob.fs.dirs.DocumentDir + '/courseSections/file' + this.props.track._id + ext,
        }


      }

      let myTrack = this.props.track;


      if (this.state.isSongFvrt === true) {

        // remove from favrts
        this.setState({ indicator: true })

        let favoriteTracksAsync = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
        this.setState({ isSongFvrt: false });
        let arr = [];
        this.setState({ FavoritIcon: HeartIcon });

        console.log(favoriteTracksAsync, "wqxe1u347iw fx2b63ynxty3")
        if (favoriteTracksAsync !== null && favoriteTracksAsync !== undefined && favoriteTracksAsync !== "") {
          for (let i = 0; i < favoriteTracksAsync.length; i++) {
            if (this.props.track._id === favoriteTracksAsync[i]._id) {
            }
            else {
              arr.push(favoriteTracksAsync[i])
            }
          }
          console.log(arr, "after defavoriting")
          await AsyncStorage.setItem("FavoriteTracks", JSON.stringify(arr));
        }
        // remove from favrts



        // remove from offline array
        let arr2 = [];
        let offlineSongs = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
        console.log(offlineSongs, "ooooopp");
        for (let i = 0; i < offlineSongs.length; i++) {
          if (this.props.track._id === offlineSongs[i]._id) {
          }
          else {
            arr2.push(offlineSongs[i])
          }
        }
        console.log(arr2, "arr after removed");
        this.setState({ offlineSongs: arr2, isdownloaded: DownloadIcon, alreadyDownloaded: false })
        await AsyncStorage.setItem("OfflineSongs", JSON.stringify(arr2));
        // remove from offline array

        this.setState({ isAnimating: false, isDisabled: false })
      }

      else {

        // this.setState({isAnimating:true, isDisabled:true})

        this.setState({ FavoritIcon: BlueHeart });

        let base64Str = "";
        let favoriteTracks = [];

        if (this.props.track.imgUrl !== null && this.props.track.imgUrl !== "" && this.props.track.imgUrl !== undefined) {

          if (this.props.track.imgUrl.includes("data:image/png;base64")) {

          }
          else {

            RNFetchBlob.fetch('GET', domain + this.props.track.imgUrl, {
              Authorization: '',
            })
              .then((res) => {
                let status = res.info().status;
                if (status == 200) {
                  base64Str = res.base64();
                  // abc = base64Str;
                  console.log("data:image/png;base64," + base64Str, "image into sabe64 string");
                  this.props.track.imgUrl = "data:image/png;base64," + base64Str;
                }
              })
              .catch((errorMessage, statusCode) => {
                console.log(errorMessage, "error in img testinggggg")
              })
          }

        }



        else {
          console.log("no image")
        }


        if (this.props.track.songUrl !== undefined && this.props.track.songUrl !== "" && this.props.track.songUrl !== null) {

          if (this.props.track.songUrl.includes("file:///")) {

            // add to offline

            let ar2 = [];
            let offlineSongs = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
            console.log(offlineSongs, this.props.track, "jsaxusayudbadywdwy");
            var dontAdd = false;

            if (offlineSongs !== null && offlineSongs !== undefined && offlineSongs !== "") {
              for (let i = 0; i < offlineSongs.length; i++) {
                if (offlineSongs[i]._id === this.props.track._id) {

                  dontAdd = true

                }
              }

            }

            if (dontAdd === false) {

              if (offlineSongs !== null && offlineSongs !== undefined && offlineSongs !== "") {

                ar2 = offlineSongs
              }


              ar2.push(this.props.track);
              await AsyncStorage.setItem("OfflineSongs", JSON.stringify(ar2));
              console.log(offlineSongs, "kkkkk")


            }



            // add to offline


            //  add to favorites

            let ar = [];
            let abc = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));

            console.log(abc, "pichli array");
            if (abc !== null && abc !== undefined && abc !== "") {
              ar = abc
            }
            ar.push(this.props.track);
            console.log(ar, "add krne k bad")
            await AsyncStorage.setItem("FavoriteTracks", JSON.stringify(ar));
            this.saveTrackToFvrtsAPI();

            this.setState({ isSongFvrt: true, alreadyDownloaded: true, isdownloaded: checkedIcon });
            //  add to favorites

          }

          else {


            var date = new Date();
            var url = domain + this.props.track.songUrl;
            // var url       = domain+"/media/audio_files/sample_audio.mp3";
            var ext = this.extention(url);

            const { config, fs } = RNFetchBlob
            let PictureDir = fs.dirs.PictureDir

            config(options).fetch('GET', url).then(async (res) => {

              console.log(res.data, "success downloaded");
              this.props.track.songUrl = "file://" + res.data;



              // add to offline

              let ar2 = [];
              let offlineSongs = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
              console.log(offlineSongs, this.props.track, "jsaxusayudbadywdwy");
              var dontAdd = false;

              if (offlineSongs !== null && offlineSongs !== undefined && offlineSongs !== "") {
                for (let i = 0; i < offlineSongs.length; i++) {
                  if (offlineSongs[i]._id === this.props.track._id) {

                    dontAdd = true

                  }
                }

              }

              if (dontAdd === false) {

                if (offlineSongs !== null && offlineSongs !== undefined && offlineSongs !== "") {
                  ar2 = offlineSongs;

                }


                ar2.push(this.props.track);
                await AsyncStorage.setItem("OfflineSongs", JSON.stringify(ar2));
                console.log(offlineSongs, "kkkkk")


              }



              // add to offline

              //  add to favorites

              let ar = [];
              let abc = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
              console.log(abc, "pichli array");
              if (abc !== null && abc !== undefined && abc !== "") {
                ar = abc
              }
              ar.push(this.props.track);
              console.log(ar, "add krne k bad")
              await AsyncStorage.setItem("FavoriteTracks", JSON.stringify(ar));
              this.saveTrackToFvrtsAPI();

              this.setState({ isSongFvrt: true, alreadyDownloaded: true, isdownloaded: checkedIcon })

            });

          }



        }


      }


    }


  };


  saveTrackToFvrtsAPI = () => {


    console.log("api called fvrts wali")

    const url = domain + "/api/favorites/";
    const favrtTrack = {
      "track_id": this.props.track._id,
      "deviceToken": DeviceInfo.getUniqueId()
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-sh-auth': this.state.deviceToken
      },

      body: JSON.stringify(favrtTrack)
    }).then((response) => response.text())
      .then(async (responseText) => {

        console.log(responseText, "response text from save favorite api");
        let responseData = JSON.parse(responseText);
        console.log(responseData);
        await this.setState({ isDisabled: false, isAnimating: false, indicator: true });
      })
      .catch(async (error) => {




        await this.setState({ isDisabled: false, isAnimating: false, });

        console.log("error from save favorite API", error);

      });

  }




  togglePlayback = async () => {

    try {
      const state = await TrackPlayer.getState();
      console.log('toggle playback called');
     
      // {
      console.log('track not null');

      //  let currentState= await TrackPlayer.getState();

      if (state === "ready") {
        await TrackPlayer.play();
        this.setState({ pauseOrPlay: pauseIcon });

      }

      else if (state === TrackPlayer.STATE_PAUSED) {

        console.log("state paused")
        await TrackPlayer.play();
        this.setState({ pauseOrPlay: pauseIcon });

      }
      else {
        await TrackPlayer.pause();
        this.setState({ pauseOrPlay: playIcon });
      }


      // }

    }


    catch (e) {
      console.log(e, "error from toggle play back")
    }

  }

  skipToNext = async () => {



    const duration = await TrackPlayer.getDuration();
    const postion = await TrackPlayer.getPosition();

    const difference = duration - postion;


    var matches = this.state.selectedTime.match(/(\d+)/);
    let timeInSeconds = matches[0] * 60;
    let newTime = difference + timeInSeconds;
    this.setState({ delayEndingTime: newTime });

    console.log(newTime, "newTime is...")


    console.log("difference is", difference);

    this.setState({ remainingTrackTime: difference })

    if (difference < 3) {

      console.log("do nothing");

    }

    else if (difference > 3 && difference < 15) {


      const positionToSeek = (await TrackPlayer.getDuration()) - 3;
      console.log(positionToSeek);
      await TrackPlayer.seekTo(positionToSeek);

      console.log("bring to 3 seconds");


    }
    else {

      const positionToSeek = (await TrackPlayer.getPosition()) + 15;
      console.log(positionToSeek);
      await TrackPlayer.seekTo(positionToSeek);
      console.log("normal seek");

    }
  };




  

  skipToPrevious = async () => {

    const duration = await TrackPlayer.getDuration();
    const position = await TrackPlayer.getPosition();

    const difference = duration - position;

    var matches = this.state.selectedTime.match(/(\d+)/);
    let timeInSeconds = matches[0] * 60;
    let newTime = difference + timeInSeconds;
    this.setState({ delayEndingTime: newTime });

    this.setState({ remainingTrackTime: difference })

    if (difference < 3 && duration === position) {

      console.log('do nothing');
      const positionToSeek = (await TrackPlayer.getDuration()) - 15;
      await TrackPlayer.seekTo(positionToSeek);
      await TrackPlayer.play();

    }

    else if (position > 3 && position < 15) {
      await TrackPlayer.seekTo(3);
      console.log('bring to 3 seconds');

    }

    else {

      console.log('normal seek');
      const positionToSeek = (await TrackPlayer.getPosition()) - 15;
      await TrackPlayer.seekTo(positionToSeek);

    }

  };

  changeCurrentTab=async(item)=>{
    console.log(item,'item')

    await this.setState({currentTab:item})
    if (this.state.currentTab=='video' && this.state.pauseOrPlay==pauseIcon)
    {
      console.log('video tab press')
      this.togglePlayback()
    }
    
  }
  render() {



    return (

      <View style={styles.container} pointerEvents={this.state.isDisabled ? "none" : "auto"}>




        {this.state.isAnimating &&

          <Modal isVisible={this.state.isAnimating} transparent={true}>

            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{ width: "45%", height: 100, borderRadius: 6, backgroundColor: "white", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                <ActivityIndicator size="large" color="#a1863e" animating={this.state.isAnimating} />
                <Text>Downloading...</Text>

              </View>
            </View>

          </Modal>


        }

        {this.state.showPlayScreen === true &&

          <View style={{ flex: 1 }}>


            {Platform.OS == "ios" &&
              <View>

                <MyStatusBar backgroundColor="#D2A33A" barStyle="light-content" />
                <View style={styles.appBar} />
              </View>

            }




            <View style={{ flex: 4, backgroundColor: "white" }}>

              <ImageBackground
                source={oval}
                style={{ height: "95%", width: "100%" }}
                imageStyle={{height:'100%'}}
                resizeMode={"stretch"}
              >
                {/* white cross */}
                <View style={{ flexDirection: 'row', marginTop: 25, }}>
                  <View style={{ flex: 0.6 }}></View>
                  <View style={{ flex: 1, }}>
                    <TouchableOpacity onPress={this.BackFunction}>
                      <Image style={{ height: 30, width: 30 }} source={whiteCross} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 5.5 }}></View>

                  <View style={{ flex: 2, alignItems: "center" }}>

                    <TouchableOpacity onPress={this.checkPermissionForDownload}>
                      <Image source={this.state.isdownloaded} style={{ height: 22, width: 22 }} />
                    </TouchableOpacity>


                  </View>
                </View>
                {/* white cross */}



                {/* square image */}

                {this.state.trackImage !== "" &&
                  <View
                    style={{
                      marginBottom: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: 'gray',
                      shadowOffset: { width: 0, height: 7 },
                      shadowOpacity: 0.2,
                      shadowRadius: 2,
                      elevation: 3,
                      backgroundColor: '#0000',
                      height: 150,
                    }}>
                    <Image
                      style={{ height: 150, width: 160, borderRadius: 20 }}
                      resizeMode="stretch"
                      source={(this.state.isInternetConnected === true) ? { uri: this.state.trackImage } : require('../assets/icons/music_icon.jpg')}
                    // source={{uri:this.state.trackImage}}
                    />
                  </View>
                }

                {/* square image */}

              </ImageBackground>
            </View>
            <View style={{ flexDirection:'row',marginTop:10}}>
              <TouchableOpacity onPress={()=>{this.changeCurrentTab('audio')}} style={(this.state.currentTab=='audio')?{flex:1,backgroundColor:'#D2A33A',alignItems:'center',justifyContent:'center',marginHorizontal:20,borderRadius:20}:{flex:1,alignItems:'center',justifyContent:'center',marginHorizontal:20,borderRadius:20}}>
                <Text style={(this.state.currentTab=='audio')?{alignSelf:'center',justifyContent:'center',fontSize:14,fontWeight:'bold',color:'white',paddingVertical:10}:{alignSelf:'center',justifyContent:'center',fontSize:14,fontWeight:'bold',color:'gray',paddingVertical:10}}>Audio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.changeCurrentTab('video')}} style={(this.state.currentTab=='video')?{flex:1,backgroundColor:'#D2A33A',alignItems:'center',justifyContent:'center',marginHorizontal:20,borderRadius:20}:{flex:1,alignItems:'center',justifyContent:'center',marginHorizontal:20,borderRadius:20}}>
              <Text style={(this.state.currentTab=='video')?{alignSelf:'center',justifyContent:'center',fontSize:14,fontWeight:'bold',color:'white',paddingVertical:10}:{alignSelf:'center',justifyContent:'center',fontSize:14,fontWeight:'bold',color:'gray',paddingVertical:10}}>Video</Text>
              </TouchableOpacity>
            </View>


            {(this.state.currentTab=='audio') &&
            <View style={{ flex: 6 }}>



              {this.state.isSongLoaded === false &&
                <View style={{ alignItems: "center", justifyContent: "center" }, styles.loading}>
                  <Image source={LoadingGif} style={{ height: 180, width: 180 }} />
                </View>

              }




              {/* text views */}

              {
                this.state.isSongLoaded === true &&
                <View style={{ paddingLeft: 28, paddingRight: 28, marginTop: 30 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 4, marginRight: 5, marginTop: 20 }}>
                      <Text style={styles.headingTxt}>{this.state.trackName}</Text>
                      <Text style={{ fontSize: 15, color: '#CDD1D9', fontFamily: 'Gotham-Bold' }}>{this.state.playListName}</Text>
                    </View>

                    <TouchableOpacity onPress={this.checkPermissionForFavoriteFunction}>
                      <Image resizeMode="contain" source={this.state.FavoritIcon} style={{ height: 45, width: 40 }} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 9, minHeight: 65 }}>
                    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    <Text style={{ fontSize: 16, fontStyle: 'normal' }}>
                      {this.state.trackDescription}
                      {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard */}
                    </Text>
                    {/* </ScrollView> */}

                  </View>

                </View>
              }
              {/* text views */}



              {this.state.isSongLoaded === true &&
                <View>
                  <ProgressBar i={this.state.hasReachedLockedTrack} resetPlayer={this.resetTheTrack} moveTo={(val) => { this.moveTo(val) }} />
                </View>
              }





              {/* three play buttons */}

              {
                this.state.isSongLoaded === true &&



                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>


                  {/* Back song */}
                  <TouchableOpacity onPress={this.moveToPreviousSong} disabled={this.state.disablePreviousButton}>
                    <Image
                      source={PreviousIcon}
                      style={{ height: 30, width: 30, marginRight: 15 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  {/* Back song */}




                  {/* 15 seconds back */}
                  <TouchableOpacity onPress={this.skipToPrevious}>
                    <Image
                      source={LeftRound}
                      style={{ height: 40, width: 40, marginRight: 30 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  {/* 15 seconds back */}


                  {/* play button */}

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#a1863e',
                      shadowOffset: { width: 0, height: 9 },
                      shadowOpacity: 0.2,
                      shadowRadius: 2,
                      elevation: 3,
                      backgroundColor: '#0000',
                    }}>
                    <TouchableOpacity onPress={this.togglePlayback}>
                      <Image
                        source={this.state.pauseOrPlay}
                        style={{ height: 78, width: 78 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* play button */}

                  {/* 15 seconds forward */}

                  <TouchableOpacity onPress={this.skipToNext}>
                    <Image
                      source={RightRound}
                      style={{ height: 40, width: 40, marginLeft: 30 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  {/* 15 seconds forward */}


                  {/* Next song */}
                  <TouchableOpacity onPress={this.moveToNextSong} disabled={this.state.disableNextButton}>
                    <Image
                      source={NextIcon}
                      style={{ height: 30, width: 30, marginLeft: 15 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  {/* Next song */}




                </View>
              }
              {/* three play buttons */}

            </View>
            }

            {(this.state.currentTab=='video') &&
            <View style={{ flex: 7 }}>
              <View style={{ alignItems: "center", justifyContent: "center", width: Dimensions.get("window").width, height: '100%', marginTop: 20 }}>
                                <WebView
                                    source={{ uri: encodeURI('https://vimeo.com/253989945') }}
                                    style={{ width: 360, height: '100%', backgroundColor: "black",marginBottom:30 }}
                                    resizeMode="contain"
                                    allowsFullscreenVideo={true}
                                    startInLoadingState={true}
                                />
                            </View>
              </View>
            }


            {/* background effects */}

            {/* {this.props.track.background_music === true && */}
            {this.state.currentTab=='audio' &&
            <View style={{
              flex: 1,
              shadowColor: "silver",
              shadowOpacity: 0.85,
              shadowRadius: 5,
              shadowOffset: { height: 0, width: 0, },
              flexDirection: "row", justifyContent: "center", borderTopColor: "#F3F3F3", borderTopWidth: 1
            }}>
              <TouchableOpacity onPress={this.toggleScreens} style={{ backgroundColor: "white", width: "100%", alignItems: "center" }}>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <Text style={{ fontFamily: "Gotham-Bold", fontSize: 17, marginRight: 6 }}>Background Effects</Text>

                  <View
                    style={{
                      shadowColor: '#a1863e',
                      shadowOffset: { width: 0, height: 5 },
                      shadowOpacity: 0.2,
                      shadowRadius: 2,
                      elevation: 3,
                      backgroundColor: '#0000',
                    }}>

                    <Image source={ArrowUp} style={{ height: 26, width: 26, marginLeft: 6 }} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            }

            {/* } */}




            {/* background effects */}

          </View>

        }


        {this.state.showBgEffectsScreen === true && this.state.currentTab=='audio' &&


          <View style={{ flex: 1 }}>

            <View style={(Platform.OS === "ios") ? { paddingTop: 33 } : {}}>


              <Modal isVisible={this.state.isModalVisible} transparent={true}>

                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <View style={{
                    width: "100%",
                    height: 300,
                    borderRadius: 6,
                    backgroundColor: "white"

                  }}>

                    <View style={{ flex: 2.5, alignItems: "center", justifyContent: "center", borderBottomWidth: 1, borderBottomColor: "#EAEBEE" }}>
                      <Text style={{ fontFamily: "Gotham-Bold", fontSize: 20 }}>Delay Ending</Text>
                    </View>

                    <View style={{ flex: 6, padding: 20, alignItems: "center", }}>
                      <Text style={{ fontFamily: "Gotham-Bold", fontSize: 15 }}>How long would you like background sound to continue after the main track ends?</Text>


                      <RNPickerSelect
                        placeholder={{
                          label: "1 Min",
                          value: "1 Min",

                        }}
                        useNativeAndroidPickerStyle={false}
                        placeholderTextColor="white"
                        items={this.state.items}
                        onValueChange={(value) => {
                          this.setState({
                            selectedTime: value,
                          });
                        }}

                        // ...pickerSelectStyles
                        style={{ ...pickerSelectStyles }}
                        value={this.state.selectedTime}
                        ref={(el) => {
                          this.inputRefs.picker = el;
                        }}

                        Icon={() => {

                          if (Platform.OS == "ios") {
                            return <Image source={DownArrow} style={{ height: 25, width: 25, marginRight: 90, marginTop: 32 }} />;
                          } else {
                            return <Image source={DownArrow} style={{ height: 25, width: 25, marginTop: 25, marginRight: -140, marginLeft: -50, position: "absolute" }} />;
                          }

                        }}
                      />





                    </View>


                    <View style={{ flex: 2, flexDirection: "row", justifyContent: "space-around" }}>
                      <TouchableOpacity onPress={this.cancelButnModal}>
                        <Text style={{ fontFamily: "Gotham-Bold", color: "#8C8B8F", fontSize: 17 }}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={this.doneButnModal}>
                        <Text style={{ fontFamily: "Gotham-Bold", color: "#a1863e", fontSize: 17 }}>Done</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>

              </Modal>

            </View>


            <View style={{ marginTop: 13, paddingRight: 12, paddingLeft: 12, paddingTop: 7 }} >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={this.toggleScreens} style={{ alignItems: "center", flexDirection: "row", paddingRight: 10, justifyContent: "center" }}>
                  <Image source={LeftArrow} style={{ height: 16, width: 10 }} />
                  <Text style={styles.headingTxt2}>Background Effects</Text>
                </TouchableOpacity>
              </View>
            </View>





            <View style={{ flex: 8.5, paddingTop: 30, paddingBottom: 20 }}>

              <ScrollView >



                <View style={{ alignItems: "center" }} >







                  <View style={styles.item}>
                    <Text style={styles.effectname}>Music Effect</Text>

                    <MultiSlider
                      values={[this.state.musicEffectValue]}
                      style={styles.slider}
                      min={0}
                      max={30}
                      onValuesChangeStart={val => {

                        console.log(val, "onValuesChangeStart");


                      }}

                      onValuesChange={val => {

                        this.musicEffectPlayingFunc()

                        musicEffect.setVolume(val[0] / 10);
                        this.setState({ musicEffectValue: val[0] });




                        let abc = Math.floor((val[0] / 30) * 100);
                        this.setState({ musicEffectPercentage: abc });

                      }}

                      onValuesChangeFinish={val => {
                        console.log(val[0], "onValuesChangeFinish");
                      }}

                      selectedStyle={{
                        backgroundColor: '#a1863e',
                      }}
                      unselectedStyle={{
                        backgroundColor: '#DDE6F8',
                      }}


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

                    <Text style={{ marginTop: -10, fontSize: 12, color: "#989AA1", marginLeft: this.state.musicEffectValue * 9.6, fontFamily: "Gotham-Bold" }}>{this.state.musicEffectPercentage + "%"}</Text>

                  </View>
                  <View style={styles.item}>
                    <Text style={styles.effectname}>Rain Effect</Text>

                    <MultiSlider
                      values={[this.state.rainEffectValue]}
                      style={styles.slider}
                      min={0}
                      max={30}

                      selectedStyle={{
                        backgroundColor: '#a1863e',
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



                      }}

                      onValuesChange={val => {

                        try {

                          this.rainEffectPlayingFunc()

                          rainEffect.setVolume(val[0] / 10);
                          this.setState({ rainEffectValue: val[0] })

                          let abc = Math.floor((val[0] / 30) * 100);
                          this.setState({ rainEffectPercentagee: abc });

                        } catch (e) {
                          console.log("error onvalue change", e)
                        }
                      }}

                      onValuesChangeFinish={val => {

                        console.log(val[0], "onValuesChangeFinish");
                      }}
                    />
                    <Text style={{ marginTop: -15, color: "#989AA1", marginLeft: this.state.rainEffectValue * 9.6, fontSize: 12, fontFamily: "Gotham-Bold" }}>{this.state.rainEffectPercentagee + "%"}</Text>
                  </View>

                  <View style={styles.item}>
                    <Text style={styles.effectname}>Fire Effect</Text>

                    <MultiSlider
                      min={0}
                      max={30}
                      values={[this.state.fireEffectValue]}

                      onValuesChangeStart={val => {
                        console.log(val, "onValuesChangeStart");



                      }}

                      onValuesChange={val => {

                        this.fireEffectPlayingFunc()

                        fireEffect.setVolume(val[0] / 10);
                        this.setState({ fireEffectValue: val[0] })


                        let abc = Math.floor((val[0] / 30) * 100);
                        this.setState({ fireEffectPercentage: abc });


                      }}

                      onValuesChangeFinish={val => {

                        console.log(val[0], "onValuesChangeFinish");
                      }}
                      style={styles.slider}

                      selectedStyle={{
                        backgroundColor: '#a1863e',
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


                    <Text style={{ marginTop: -15, color: "#989AA1", marginLeft: this.state.fireEffectValue * 9.6, fontSize: 12, fontFamily: "Gotham-Bold" }}>{this.state.fireEffectPercentage + "%"}</Text>


                  </View>
                  <View style={styles.item}>
                    <Text style={styles.effectname}>Rusting Leaves Effect</Text>

                    <MultiSlider

                      min={0}
                      max={30}
                      values={[this.state.leavesEffectValue]}
                      style={styles.slider}

                      selectedStyle={{
                        backgroundColor: '#a1863e',
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

                      onValuesChange={val => {

                        this.leavesEffectPlayingFunc()

                        leavesEffect.setVolume(val[0] / 10);
                        this.setState({ leavesEffectValue: val[0] })


                        let abc = Math.floor((val[0] / 30) * 100);
                        this.setState({ leavesEffectPercentage: abc });


                      }}

                      onValuesChangeStart={val => {
                        console.log(val, "onValuesChangeStart");



                      }}

                      onValuesChangeFinish={val => {


                      }}
                    />


                    <Text style={{ marginTop: -15, color: "#989AA1", marginLeft: this.state.leavesEffectValue * 9.6, fontSize: 12, fontFamily: "Gotham-Bold" }}>{this.state.leavesEffectPercentage + "%"}</Text>


                  </View>
                  <View style={styles.item}>
                    <Text style={styles.effectname}>River Effect</Text>

                    <MultiSlider

                      values={[this.state.riverEffectValue]}

                      min={0}
                      max={30}
                      style={styles.slider}
                      selectedStyle={{
                        backgroundColor: '#a1863e',
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

                      onValuesChange={val => {

                        this.riverEffectPlayingFunc()

                        riverEffect.setVolume(val[0] / 10);
                        this.setState({ riverEffectValue: val[0] })


                        let abc = Math.floor((val[0] / 30) * 100);
                        this.setState({ riverEffectPercentage: abc });


                      }}


                      onValuesChangeStart={val => {
                        console.log(val, "onValuesChangeStart");



                      }}

                      onValuesChangeFinish={val => {


                      }

                      }

                    />


                    <Text style={{ marginTop: -15, color: "#989AA1", marginLeft: this.state.riverEffectValue * 9.6, fontSize: 12, fontFamily: "Gotham-Bold" }}>{this.state.riverEffectPercentage + "%"}</Text>
                  </View>
                  <View style={styles.item}>
                    <Text style={styles.effectname}>Birds Effect</Text>
                    <MultiSlider
                      min={0}
                      max={30}
                      style={styles.slider}
                      values={[this.state.birdsEffectValue]}

                      selectedStyle={{
                        backgroundColor: '#a1863e',
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

                      onValuesChange={val => {

                        this.birdsEffectPlayingFunc()

                        birdsEffect.setVolume(val[0] / 10);
                        this.setState({ birdsEffectValue: val[0] })


                        let abc = Math.floor((val[0] / 30) * 100);
                        this.setState({ birdsEffectPercenateg: abc });


                      }}

                      onValuesChangeStart={val => {
                        console.log(val, "onValuesChangeStart");



                      }}

                      onValuesChangeFinish={val => {



                      }}
                    />


                    <Text style={{ marginTop: -15, color: "#989AA1", fontSize: 12, marginLeft: this.state.birdsEffectValue * 9.6, fontFamily: "Gotham-Bold" }}>{this.state.birdsEffectPercenateg + "%"}</Text>

                  </View>




                  <View style={styles.item}>
                    <Text style={styles.effectname}>Snow Storm Effect</Text>

                    <MultiSlider
                      min={0}
                      max={30}
                      style={styles.slider}
                      values={[this.state.snowEffectValue]}
                      minimumValue={0}
                      selectedStyle={{
                        backgroundColor: '#a1863e',
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

                      onValuesChange={val => {

                        this.snowEffectPlayingFunc()
                        snowEffect.setVolume(val[0] / 10);
                        this.setState({ snowEffectValue: val[0] })


                        let abc = Math.floor((val[0] / 30) * 100);
                        this.setState({ snowEffectPercentage: abc });


                      }}

                      onValuesChangeStart={val => {
                        console.log(val, "onValuesChangeStart");



                      }}

                      onValuesChangeFinish={val => {

                      }}
                    />
                    <Text style={{ marginTop: -15, color: "#989AA1", marginLeft: this.state.snowEffectValue * 9.6, fontSize: 12, fontFamily: "Gotham-Bold" }}>{this.state.snowEffectPercentage + "%"}</Text>


                  </View>
                </View>

              </ScrollView>

            </View>


            <View style={{
              flex: 1.2,

              shadowColor: "silver",
              shadowOpacity: 0.85,
              shadowRadius: 5,
              shadowOffset: {
                height: 0, width: 0,

              }

            }}>


              <View style={{ borderTopColor: "#F3F3F3", borderTopWidth: 1, backgroundColor: "white", height: "100%" }}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15, }}>

                  <View style={{ marginRight: 19 }}>
                    <Text style={{ fontFamily: "Gotham-Bold", fontSize: 17, }}>Delay Ending</Text>
                  </View>



                  {/* time and icon */}


                  <TouchableOpacity onPress={this.toggleModal}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: 19, }}>
                      <Text style={{ fontFamily: "Gotham-Light", paddingRight: 7 }}>{this.state.selectedTime}</Text>
                      <View
                        style={{
                          shadowColor: '#a1863e',
                          shadowOffset: { width: 0, height: 5 },
                          shadowOpacity: 0.2,
                          shadowRadius: 2,
                          elevation: 3,
                          backgroundColor: '#0000',
                        }}>

                        <Image source={ArrowUp} style={{ height: 26, width: 26 }} />
                      </View>
                    </View>
                  </TouchableOpacity>


                  {/* time and icon */}

                </View>

              </View>

            </View>


          </View>




        }


      </View>
    );
  }
}



const STATUSBAR_HEIGHT = Platform.OS === "android" ? 8 : 20;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 0 : 56;




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingTxt: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Gotham-Bold',
    alignItems: 'center',
    paddingBottom: 11,
  },

  headingTxt2: {
    fontSize: 23,
    fontWeight: "800",
    fontFamily: "Gotham-Black",
    marginLeft: 10



  },

  effectname: {
    fontFamily: "Gotham-Light",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: -3

  },

  item: {
    marginTop: 25,

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

  inputAndroid: {
    backgroundColor: "blue"
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',

  },

  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#a1863e',
    height: APPBAR_HEIGHT,
    flexDirection: 'row',
    width: "100%",
    alignItems: "center"
  },


});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 16,
    paddingHorizontal: 25,
    paddingBottom: 16,
    borderRadius: 28,
    backgroundColor: '#a1863e',
    color: 'white',
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 80,
    marginTop: 20,
    shadowColor: '#a1863e',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    fontFamily: "Gotham-Bold"
  },
  inputAndroid: {
    fontSize: 14,
    color: 'white',
    backgroundColor: '#a1863e',
    shadowColor: '#a1863e',
    borderRadius: 28,
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    fontFamily: "Gotham-Bold",
    width: 140,
    marginTop: 25,
    paddingLeft: 20

    // width:"50%",
    // marginLeft:80,

    // alignItems:"center",
    // justifyContent:"center"
    // to ensure the text is never behind the icon
  },




});