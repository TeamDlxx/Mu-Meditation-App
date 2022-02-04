/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Platform
} from 'react-native';



import Background from "../assets/icons/beauty_background.jpg";

import LeftArrow from '../assets/icons/back_arrow_white.png'

import { Navigation } from "react-native-navigation"
import startTabs from './StartMainTabs';
import { domain } from '../components/utilities';

import DeviceInfo from 'react-native-device-info';

import AsyncStorage from "@react-native-community/async-storage"




export default class Greetings extends Component {

  componentDidMount(){
    console.log(JSON.stringify(this.props.menifestArray), "in finish screen is this")
  }
  flatListRef = null

  constructor() {
    super();
    this.state = {
      selectedSmiley: "",
      currentSelectedMood: ""
    }
  }



  saveMenifestToServer = async () => {

    const url = domain + "/api/manifest/update_manifest_v1/";
    let device_token = await DeviceInfo.getUniqueId()

    console.log(device_token, "device token is this")


    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-sh-auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcxYmJiYmMxNzdjZDIxNTgxYzg2YTIiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTYwMTI4OTcxNH0.qdlEFgv2Q6V0GGopBp4VZobhfu95ajGSVDSKfXH0A1I"
      },
      body: JSON.stringify(this.props.menifestArray)

    }).then((response) => response.text())
      .then(async (responseText) => {

        console.log("response from edit menifest Api", responseText);
        let responseData = JSON.parse(responseText);
        console.log(responseData, "response from edit menifest Api ");

      })
      .catch((error) => {
        console.log("error from device_tokens API", error);
      });

  }






  nextButtonAction = async () => {

    console.log(this.props.menifestArray, "in finishing screen");

    let menifest_editing = JSON.parse(await AsyncStorage.getItem('ManifestEditing'));


    if (menifest_editing === true) {

      await this.saveMenifestToServer()

    }

    startTabs()

  }



  BackFunction = () => {

    Navigation.pop(this.props.componentId);

  }





  render() {
    return (

      <ImageBackground source={Background} style={{ flex: 1, paddingHorizontal: 12, }}>


        <TouchableOpacity style={{ width: 50, height: 50, marginTop: 40 }} onPress={this.BackFunction}>
          <Image source={LeftArrow} style={{ width: 20, height: 20, marginTop: 20, marginLeft: 5, resizeMode: "contain" }}>
          </Image>
        </TouchableOpacity>




        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }}>
          <TouchableOpacity onPress={this.nextButtonAction} style={{ width: 180, backgroundColor: "#FFFFFF", height: 50, borderRadius: 12, alignItems: "center", justifyContent: "center", alignSelf: "center", }}>
            <Text style={{ color: "#4A7EEC", fontWeight: "700", fontSize: 19 }}>Great Job!</Text>
          </TouchableOpacity>

          <Text style={{ color: "white", fontWeight: "400", fontSize: 22, textAlign: "center", marginTop: 20 }}>Keep Manifesting {"\n"} Your Desires!</Text>
        </View>


        <TouchableWithoutFeedback onPress={this.nextButtonAction}>


          <View style={[styles.buttonView, Platform.OS === "android" ? { marginBottom: 35 } : {}]}>

            <Text style={{ position: 'absolute', color: "#447CEC", padding: 5, fontWeight: "bold", fontSize: 18, marginLeft: 0 }}>Next</Text>

          </View>

        </TouchableWithoutFeedback>

      </ImageBackground>
    )
  }
}



const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : 0;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  // appBar: {
  //     backgroundColor: 'black',
  //     height: APPBAR_HEIGHT,
  // },
  buttonView: {
    height: 55, width: "80%", position: "absolute",
    // right: "2%",
    bottom: Platform.OS === 'ios' ? 10 : 60,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 30,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: 'center',

    shadowColor: "#000",
    bottom: "4%",

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,

  }

});