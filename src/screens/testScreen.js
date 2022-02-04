import React, {Component} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
    PermissionsAndroid,
    Platform
  } from 'react-native';

  import localTrack from '../assets/sample_audio.mp3';

  import TrackPlayer from 'react-native-track-player';

  // import TrackPlayer1 from 'react-native-track-player';

  import Navigation from "react-native-navigation"


  import SplashScreen from 'react-native-splash-screen'
  import RNFetchBlob from 'rn-fetch-blob'

  var Sound = require('react-native-sound');

  import firebase from "react-native-firebase";

  var i = 8;

  var song = null;

  export default class TestScreen extends Component{

    constructor(){
        super();
        this.state={
            filePath:''
        }
    }



   async componentDidMount(){
            SplashScreen.hide();  
            song = new Sound("sample_audio.mp3",  Sound.MAIN_BUNDLE, (error)=>{
              if(error){
                console.log("error while loading", error);
              }
            });
           
      
    }


    play = async() => {
      song.play((success) =>{
        if(!success){
          console.log("could not play sound", success)
        }
      })
    }



    crash = async() => {
     firebase.crashlytics().crash();
    }



    removeFiles = ()=>{


        RNFetchBlob.session('foo').dispose().then(() => { alert("removed")})


        // RNFetchBlob.fs.unlink('/var/mobile/Containers/Data/Application/40F7A0E7-DEB1-4CC5-9343-49838FA98C1E/Documents/courseSections/file8.mp4').then(() => { alert("removed")})

    }

    fetchBlob  =async()=>{


        if(Platform.OS === "android"){



            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: 'Asking for Permissions',
                  message:
                    'Cool Photo App needs access to your External storage ',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
    
              if (granted === PermissionsAndroid.RESULTS.GRANTED)
              {
    
                var date = new Date();
                var url  = "http://d3bpyhkr4uuyy0.cloudfront.net/content/entry/data/0/2/0_38m9ocmk_0_42kn77wv_2.mp4";
                var ext       = this.extention(url);
                ext = "."+ext[0];
                const { config, fs } = RNFetchBlob
                let PictureDir = fs.dirs.PictureDir
                let options = {
                  fileCache: true,
                  addAndroidDownloads : {
                    useDownloadManager : true,
                    notification : true,
                    path:  RNFetchBlob.fs.dirs.DocumentDir + '/courseSections/' + ext,
                    // description : 'Image'
                  }
                }
                config(options).fetch('GET', url).then((res) => {

                    RNFetchBlob.session('foo').add(res.data)
        
                    console.log(res.data, "reponse from blob")
                  Alert.alert("Success Downloaded");
                });
        
    
    
    
              }else{
                  alert("you don't have permission to store the file")
              }

        }

        else{

            var date = new Date();
            var url  = "https://d3bpyhkr4uuyy0.cloudfront.net/content/entry/data/0/2/0_38m9ocmk_0_42kn77wv_2.mp4";
            var ext       = this.extention(url);


            ext = "."+ext[0];

            console.log(ext, "extension of file is");
            const { config, fs } = RNFetchBlob
            let PictureDir = fs.dirs.PictureDir
            let options = {
              fileCache: true,

            //   addAndroidDownloads : {
            //     useDownloadManager : true,
            //     notification : true,
            //     path:  RNFetchBlob.fs.dirs.DocumentDir + '/courseSections/' + ext,
            //     // description : 'Image'
            //   },


              path:  RNFetchBlob.fs.dirs.DocumentDir + '/courseSections/file'+ i + ext,
            
            }
            config(options).fetch('GET', url).then(async(res) => {
            console.log(res.data, "reponse from blob");
              await RNFetchBlob.session('foo').add(res.data);
              i=i+1;
              Alert.alert("Success Downloaded");
            });
            
            console.log(options, "options and .....")
    



        }


       


    


    }

    extention(filename){
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
      }


    render(){
        return(
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Text onPress={this.gotonext} style={{margin:20}}>download file</Text>
                <Text onPress={this.removeFiles} style={{margin:20}}>Remove Files</Text>
                <Text onPress={this.play} style={{margin:20}}>Play button</Text>
                <Text onPress={this.crash} style={{margin:20}}>crash</Text>
{/* 

                <Text onPress={this.removeFiles}>Remove</Text> */}
            </View>
        )
    }

  }


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10
    },
})