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
  Alert
} 
from 'react-native';


import Background from "../assets/icons/background.jpg";


import CheckedIcon from "../assets/icons/selected.png";
import UnCheckedIcon from "../assets/icons/un_selected.png";
import Modal from "react-native-modal";

import Bad from "../assets/icons/bad_day.png";
import ExtraHappy from "../assets/icons/extra_happy_day.png";
import Happy from "../assets/icons/happy_day.png";
import Normal from "../assets/icons/normal_day.png";
import Sad from "../assets/icons/sad_day.png";
import LeftArrow from '../assets/icons/back_arrow_white.png'
import { Navigation } from 'react-native-navigation';

import DeviceInfo from "react-native-device-info"
import { domain } from '../components/utilities';


import AsyncStorage from "@react-native-community/async-storage"
import firebase from "react-native-firebase";


const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class Greetings extends Component {

  flatListRef = null

  constructor() {
    super();
    this.state = {

      smileysArray: [

        { "icon": Bad, "isSelected": false, "mood": "Bad" },
        { "icon": Sad, "isSelected": false, "mood": "Sad" },
        { "icon": Normal, "isSelected": false, "mood": "Emotion Less" },
        { "icon": Happy, "isSelected": false, "mood": "Happy" },
        { "icon": ExtraHappy, "isSelected": false, "mood": "Very Happy" },

      ],
      selectedSmiley: "",
      currentSelectedMood: "",
      menifestArray: "",

    }
  }


  componentDidMount() {

    this.setState({ menifestArray: this.props.menifestArray });

    for (let i = 0; i < this.state.smileysArray.length; i++) {

      if (this.props.menifestArray.manifest_mood === this.state.smileysArray[i].mood) {

        this.state.smileysArray[i].isSelected = true
        this.setState({ selectedSmiley: this.state.smileysArray[i], currentSelectedMood: this.state.smileysArray[i].mood, smileysArray: this.state.smileysArray });

      }


    }


  }




  BackFunction = () => {
    Navigation.pop(this.props.componentId);
  }

  smileyAction = async (item, index) => {



    if (this.state.smileysArray[index].isSelected === true) {

      this.state.smileysArray[index].isSelected = false;
      this.setState({ selectedSmiley: "", currentSelectedMood: "" })
    }

    else {

      this.state.smileysArray.forEach(function (item, index) {
        item.isSelected = false
      })
      this.state.smileysArray[index].isSelected = true;
      this.setState({ selectedSmiley: item, currentSelectedMood: item.mood })

    }

    await this.setState({ smileysArray: this.state.smileysArray });
    console.log(this.state.selectedSmiley, "selected greetings are")


  }

  saveEveningMenifestToServer = async () => {

    const url = domain + "/api/manifest/add_manifest_v1/";



    
    let device_token = await DeviceInfo.getUniqueId()

    console.log(device_token, url,"device token is this")

    firebase.analytics().logEvent("Evening_Manifest_completed");


    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-sh-auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcxYmJiYmMxNzdjZDIxNTgxYzg2YTIiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTYwMTI4OTcxNH0.qdlEFgv2Q6V0GGopBp4VZobhfu95ajGSVDSKfXH0A1I"
      },
      body: JSON.stringify(this.state.menifestArray)


    }).then((response) => response.text())
      .then(async (responseText) => {

        console.log("response from save evening menifest Api", responseText);
        let responseData = JSON.parse(responseText);
        console.log(responseData, "response from save menifest Api");

      })
      .catch((error) => {
        console.log("error from device_tokens API", error);
      });

  }


  nextButtonAction = async () => {

    if (this.state.selectedSmiley === "") {
      alert("Please choose a smiley")
      return
    }


    this.state.menifestArray.manifest_mood = this.state.currentSelectedMood;

    let menifest_editing = JSON.parse(await AsyncStorage.getItem('ManifestEditing'));

    if (menifest_editing !== true) {

      await this.saveEveningMenifestToServer()


    }



    // this.state.menifestArray.push({ "how_was_day": this.state.selectedSmiley })

    console.log(this.state.menifestArray, "menifest array ")
    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.FinishScreen',
        passProps: {
          menifestArray: this.state.menifestArray,
          refresh: this.refresh

        },
        options: {
          bottomTabs: { visible: true },
          popGesture: false
        }

      }
    });

  }



  saveManifest = async () => {


    //grateful things 

    let new_grateful_things = [];
    for (let i = 0; i < this.props.menifestArray.grateful_thing.length; i++) {
      if (this.props.menifestArray.grateful_thing[i].server_item === true) {
        new_grateful_things.push({
          "grateful_thing_id": this.props.menifestArray.grateful_thing[i].grateful_thing,
          "server_item": true
        })

      }
      else {
        new_grateful_things.push({
          "grateful_thing_title": this.props.menifestArray.grateful_thing[i].grateful_thing_title,
          "grateful_thing_icon": "happy.jpg",
          "server_item": false
        })
      }
    }

    // burning desire ends
    this.props.menifestArray.grateful_thing = new_grateful_things;

    //ends




  // universe action 
  let new_universe_actions = []
  for (let i = 0; i < this.props.menifestArray.universe_action.length; i++) {
    if (this.props.menifestArray.universe_action[i].server_item === true) {
      new_universe_actions.push(
        {
          "universe_action_id": this.props.menifestArray.universe_action[i].universe_action,
          "server_item": true
        }
      )
    }
    else {

      new_universe_actions.push(
        {
          "universe_action_title": this.props.menifestArray.universe_action[i].universe_action_title,
          "server_item": false
        }
      )

    }
  }

  this.props.menifestArray.universe_action = new_universe_actions;

  // universe action ends





    // burning desire starts

    // let new_burning_desire = [];
    // for (let i = 0; i < this.props.menifestArray.burning_desire.length; i++) {
    //   if (this.props.menifestArray.burning_desire[i].server_item === true) {
    //     new_burning_desire.push({
    //       "burning_desire_id": this.props.menifestArray.burning_desire[i].burning_desire,
    //       "server_item": true
    //     })

    //   }
    //   else {
    //     new_burning_desire.push({
    //       "burning_desire_title": this.props.menifestArray.burning_desire[i].burning_desire_title,
    //       "burning_desire_icon": "happy.jpg",
    //       "server_item": false
    //     })
    //   }
    // }

    // burning desire ends
    this.props.menifestArray.burning_desire = new_burning_desire;

    if (this.state.selectedSmiley === "") {
      alert("Please choose a smiley")
      return
    }


    this.props.menifestArray.manifest_mood = this.state.currentSelectedMood;

    this.setState({ menifestArray: this.props.menifestArray })
    
    console.log(this.state.menifestArray, "menifest array is now this")


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
      body: JSON.stringify(this.state.menifestArray)

    }).then((response) => response.text())
      .then(async (responseText) => {

        console.log("response from edit menifest Apimxncmxnmxn", responseText);
        let responseData = JSON.parse(responseText);

        if (responseData.code === 200) {
          await this.props.refresh();
          Navigation.pop(this.props.componentId)

        }

        else
        {
          Alert.alert("Could not save changes")
          Navigation.pop(this.props.componentId)
        }




        console.log(responseData, "response from edit menifest Api.... ");

      })
      .catch((error) => {
        console.log("error from device_tokens API", error);
      });

  }





  render() {
    return (

      <ImageBackground source={Background} style={{ flex: 1, backgroundColor: "#61C4FB", paddingHorizontal: 12, alignItems: "center", justifyContent: "center" }}>

        <MyStatusBar backgroundColor="#63C5FC" barStyle="dark-content" />


        <View style={{ flexDirection: 'row', height: 50 }}>

          <TouchableWithoutFeedback onPress={this.BackFunction}  >
            <View style={{ flex: 0.2, flexDirection: "row", alignItems: "center" }}>
              <Image source={LeftArrow} style={{ height: 16, width: 10 }} />
              {/* <Text style={styles.headingTxt}>Upgrade</Text> */}
            </View>
          </TouchableWithoutFeedback>

          <View style={{ flex: 1, flexDirection: 'row' }}></View>
          <View style={{ flex: 0.3, flexDirection: 'row' }}></View>

        </View>



        {/* greeetings */}
        <View style={{ flex: 1, marginBottom: 10, alignItems: "center", justifyContent: "center", width: "100%" }}>

          <Text style={{ color: "white", fontSize: 24, fontWeight: "900" }}>How was your day?</Text>


          <View style={{ backgroundColor: "#2E77ED", borderRadius: 20, alignItems: "center", justifyContent: "center", height: 330, width: "100%", marginTop: 10, padding: 15 }}>


            <FlatList
              data={this.state.smileysArray}
              numColumns={3}
              style={{ width: "100%" }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (


                <TouchableWithoutFeedback onPress={() => { this.smileyAction(item, index) }} style={[{ alignItems: "center", justifyContent: "center", flex: 1, marginTop: 10 }]} >
                  <View style={{ alignItems: "center", justifyContent: "center", flex: 1, marginTop: 10 }}>
                    <Image source={item.icon} style={{ height: 100, width: 100, resizeMode: "contain" }} />
                    <Image source={item.isSelected === true ? CheckedIcon : UnCheckedIcon} style={{ height: 22, width: 22, resizeMode: "contain", marginTop: 15 }} />
                  </View>
                </TouchableWithoutFeedback>


              )}
            />

          </View>

          <View style={{ height: 60, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "400" }}>{this.state.currentSelectedMood}</Text>

          </View>


        </View>
        {/* greeetings */}



        <TouchableWithoutFeedback onPress={this.props.editingDirectly !== undefined ? this.saveManifest : this.nextButtonAction}>
          <View style={styles.buttonView}>
            <Text style={{ position: 'absolute', color: "#447CEC", padding: 5, fontWeight: "bold", fontSize: 18, marginLeft: 0 }}>{this.props.editingDirectly !== undefined ? "Save" : "Next"}</Text>
          </View>
        </TouchableWithoutFeedback>

      </ImageBackground>
    )
  }
}



const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : 0;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 40;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },

  buttonView: {
    height: 55, width: "80%", position: "absolute",
    bottom: Platform.OS === 'ios' ? 10 : 60,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 30,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: 'center',

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,

  }

})

