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
} from 'react-native';


import Background from "../assets/icons/background.jpg";

import FamilyIcon from "../assets/icons/family.png"
import FriendsIcon from "../assets/icons/friends.png"
import HealthIcon from "../assets/icons/health.png"
import JobIcon from "../assets/icons/job.png"
import FoodIcon from "../assets/icons/food.png"
import HomeIcon from "../assets/icons/home.png"
import WeatherIcon from "../assets/icons/weather.png"
import LifeIcon from "../assets/icons/life.png";
import PetsIcon from "../assets/icons/pets.png";
import TechnologyIcon from "../assets/icons/technology.png";
import ComfortIcon from "../assets/icons/comfort.png";
import AddOtherIcon from "../assets/icons/add.png";

import ThreeDots from "../assets/icons/menu.png"
import DeviceInfo from 'react-native-device-info'

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { domain } from '../components/utilities';

import LeftArrow from '../assets/icons/back_arrow_white.png'

import CheckedIcon from "../assets/icons/selected.png";
import UnCheckedIcon from "../assets/icons/un_selected.png";
import Modal from "react-native-modal";
import Cross from "../assets/icons/close.png";
import { Navigation } from 'react-native-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AsyncStorage from "@react-native-community/async-storage";




const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);



export default class GrateFullForTodayScreen extends Component {

  flatListRef = null;
  _menu = null;


  constructor() {
    super();
    this.state = {

      greetingsArray: [],
      selectedGreetings: [],
      modalVisible: false,
      greetingName: "",
      isEditing: false,
      selectedItem: "",
      morning_selected: "",
      menifestArray: "",


    }
  }



  threeDotsAction = () => {
    alert("three dots");
  }

  setMenuRef = ref => {
    this._menu = ref;
  };


  hideMenu = async (value) => {
    this._menu.hide();
  }


  showMenu = async (value) => {
    this._menu.show();
  }


  async componentDidMount() {





    let initApiResponse = JSON.parse(await AsyncStorage.getItem('initApiResponse'));

    console.log(initApiResponse, "init api response");
    this.setState({ greetingsArray: initApiResponse.grateful_thing });

    for (let i = 0; i < this.state.greetingsArray.length; i++) {
      this.state.greetingsArray[i].isSelected = false
    }





    this.setState({ menifestArray: this.props.menifestArray });




    console.log(this.props.menifestArray, "this.props.menifestArray.grateful_thing")


    for (let i = 0; i < this.props.menifestArray.grateful_thing.length; i++) {
      this.props.menifestArray.grateful_thing[i]._id = this.props.menifestArray.grateful_thing[i].grateful_thing

      if (this.props.menifestArray.grateful_thing[i].server_item === false) {
        this.state.greetingsArray.push({ "grateful_thing_icon": "media/manifest/07735f40-046d-11eb-a4e6-91f7f30c2f9e.png", "grateful_thing_status": false, "grateful_thing_title": this.props.menifestArray.grateful_thing[i].grateful_thing_title, "server_item": false, _id: this.props.menifestArray.grateful_thing[i]._id, "isSelected": true });

      }
    }

    this.state.greetingsArray.push({ "grateful_thing_icon": "media/manifest/07735f40-046d-11eb-a4e6-91f7f30c2f9e.png", "grateful_thing_status": false, "grateful_thing_title": "Add Other", "server_item": true, "_id": "5f72b9fa0a569b0258125b1a", "isSelected": false });


    this.setState({ selectedGreetings: this.props.menifestArray.grateful_thing });

    for (let i = 0; i < this.props.menifestArray.grateful_thing.length; i++) {

      for (let j = 0; j < this.state.greetingsArray.length; j++) {
        if (this.props.menifestArray.grateful_thing[i].grateful_thing === this.state.greetingsArray[j]._id) {
          this.state.greetingsArray[j].isSelected = true
        }
      }

    }


    await this.setState({ greetingsArray: this.state.greetingsArray })

    console.log(this.state.selectedGreetings, "this.state.greetings array")
  }

  greetingAction = async (item, index) => {

    if (this.state.greetingsArray[index].isSelected === true) {

      this.state.greetingsArray[index].isSelected = false;

      let res = this.state.selectedGreetings.filter((item2) => item2._id !== item._id);

      await this.setState({ selectedGreetings: res });

    }
    else {

      if (this.state.selectedGreetings.length === 3) {
        alert("Maximum 3 greetings are allowed");
        return
      }

      this.state.greetingsArray[index].isSelected = true;
      this.state.selectedGreetings.push(item);

    }

    await this.setState({ greetingsArray: this.state.greetingsArray, selectedGreetings: this.state.selectedGreetings });


    console.log(this.state.selectedGreetings, "selected greetings array")

  }


  deleteAction = async (item) => {

    let indexOfItem = this.state.greetingsArray.indexOf(item);

    let indexFromSelectedArray = this.state.selectedGreetings.indexOf(item);
    if (indexFromSelectedArray !== -1) {
      this.state.selectedGreetings.splice(indexFromSelectedArray, 1);
    }
    this.state.greetingsArray.splice(indexOfItem, 1);
    await this.setState({ greetingsArray: this.state.greetingsArray });

  }


  nextButtonAction = () => {

    let selectedItemsArrayForServer = []

    if (this.state.selectedGreetings.length > 3) {
      alert("Maximum 3 greetings are allowed");
      return
    }

    if (this.state.selectedGreetings.length < 1) {
      alert("You have to choose minimum 1 greetings");
      return
    }


    for (let i = 0; i < this.state.selectedGreetings.length; i++) {

      if (this.state.selectedGreetings[i].server_item === false) {
        selectedItemsArrayForServer.push({
          "grateful_thing_title": this.state.selectedGreetings[i].grateful_thing_title,
          "grateful_thing_icon": "icon for grateful",
          "server_item": false
        })
      }
      else {
        selectedItemsArrayForServer.push(
          {
            "grateful_thing_id": this.state.selectedGreetings[i]._id,
            "server_item": true
          })
      }
    }

    console.log(selectedItemsArrayForServer, "for server array");

    this.state.menifestArray.grateful_thing = selectedItemsArrayForServer;

    console.log(this.state.menifestArray, "menifest array ");


    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.ServeUniverseScreen',
        passProps: {

          menifestArray: this.state.menifestArray,
          // connected:this.state.isInternetConnected

        },
        options: {
          bottomTabs: { visible: true },
        }

      }
    })

  }


  addNewGreeting = async () => {

    if (this.state.greetingName === "") {
      alert("Greeting name can't be empty");
      return;
    }

    this.state.greetingsArray.splice(this.state.greetingsArray.length - 1, 1);

    this.state.greetingsArray.push({ "grateful_thing_icon": "media/manifest/07735f40-046d-11eb-a4e6-91f7f30c2f9e.png", "grateful_thing_status": false, "grateful_thing_title": this.state.greetingName, "server_item": false, _id: "5f72b9fa0a569b0258125b1a", "isSelected": false });
    this.state.greetingsArray.push({ "grateful_thing_icon": "media/manifest/07735f40-046d-11eb-a4e6-91f7f30c2f9e.png", "grateful_thing_status": false, "grateful_thing_title": "Add Other", "server_item": true, "_id": "5f72b9fa0a569b0258125b1a", "isSelected": false });

    await this.setState({ greetingsArray: this.state.greetingsArray, modalVisible: false, greetingName: "" });
    this.flatListRef.scrollToEnd({ animated: true })

  }


  AddOtherGreetingAction = () => {
    this.setState({ modalVisible: !this.state.modalVisible, })
  }

  editFunction = () => {

    if (this.state.greetingName === "") {
      alert("name can't be empty");
      return;
    }

    this.setState({ modalVisible: !this.state.modalVisible });
    let indexOfItem = this.state.greetingsArray.indexOf(this.state.selectedItem);
    this.state.greetingsArray[indexOfItem].grateful_thing_title = this.state.greetingName;
    this.setState({ greetingsArray: this.state.greetingsArray, isEditing: false, greetingName: "" });

  }



  BackFunction = async () => {

    Navigation.pop(this.props.componentId);

  }


  saveManifest = async () => {


    //grateful things 
    let selectedItemsArrayForServer = []

    if (this.state.selectedGreetings.length > 3) {
      alert("Maximum 3 greetings are allowed");
      return
    }

    if (this.state.selectedGreetings.length < 1) {
      alert("You have to choose minimum 1 greetings");
      return
    }


    for (let i = 0; i < this.state.selectedGreetings.length; i++) {

      if (this.state.selectedGreetings[i].server_item === false) {
        selectedItemsArrayForServer.push({ "grateful_thing_title": this.state.selectedGreetings[i].grateful_thing_title, "grateful_thing_icon": "icon for grateful", "server_item": false })
      }
      else {
        selectedItemsArrayForServer.push({ "grateful_thing_id": this.state.selectedGreetings[i]._id, "server_item": true })
      }
    }

    console.log(selectedItemsArrayForServer, "for server array");

    this.state.menifestArray.grateful_thing = selectedItemsArrayForServer;


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

    let new_burning_desire = [];
    for (let i = 0; i < this.props.menifestArray.burning_desire.length; i++) {
      if (this.props.menifestArray.burning_desire[i].server_item === true) {
        new_burning_desire.push({
          "burning_desire_id": this.props.menifestArray.burning_desire[i].burning_desire,
          "server_item": true
        })

      }
      else {
        new_burning_desire.push({
          "burning_desire_title": this.props.menifestArray.burning_desire[i].burning_desire_title,
          "burning_desire_icon": "happy.jpg",
          "server_item": false
        })
      }
    }

    // burning desire ends
    this.props.menifestArray.burning_desire = new_burning_desire;







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

        else {
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


      <ImageBackground source={Background} style={{ flex: 1, paddingLeft: 12, paddingRight: 12 }}>


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




        {this.state.modalVisible &&

          <Modal isVisible={this.state.modalVisible} >
            <View style={{ flex: 1, flexDirection: 'column', marginBottom: 100, justifyContent: 'center', overflow: "hidden" }}>


              <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enabled
              >
                <ImageBackground source={Background} style={{ backgroundColor: "white", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", borderRadius: 15, overflow: "hidden", }}>

                  {/* cross icon */}
                  <TouchableOpacity onPress={() => { this.setState({ isEditing: false }); this.AddOtherGreetingAction() }} style={{ width: "100%", alignItems: "flex-end", padding: 10 }}>
                    <Image source={Cross} style={{ height: 23, width: 23, }} />
                  </TouchableOpacity>
                  {/* cross icon */}

                  <Text style={{ color: "white", fontWeight: "700", fontSize: 25.5, marginTop: 15, textAlign: "center", marginHorizontal: 10 }}>What else are you Grateful for?</Text>
                  <Text style={{ color: "white", fontSize: 13, fontWeight: "500", marginTop: 10, textAlign: "center" }}>Add a custom item of what you're grateful for!</Text>



                  <View style={{ padding: 10, width: "100%" }}>

                    <View style={{ width: "100%" }}>
                      <TextInput
                        style={{ borderRadius: 10, height: 40, marginTop: 13, paddingHorizontal: 8, backgroundColor: "white", width: "93%", alignSelf: "center" }}
                        onChangeText={(text) => { this.setState({ greetingName: text }) }}
                        placeholder="Greeting name"
                        placeholderTextColor="silver"
                        value={this.state.greetingName}
                      />

                    </View>

                    <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 5, width: "100%", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                      <TouchableOpacity onPress={this.state.isEditing === true ? this.editFunction : this.addNewGreeting} style={{ backgroundColor: "white", height: 45, width: "60%", borderRadius: 10, alignItems: "center", justifyContent: "center" }} >
                        <Text style={{ fontWeight: "700", color: "white", color: "#3679EC", fontSize: 17 }}>Save</Text>
                      </TouchableOpacity>
                    </View>

                  </View>

                </ImageBackground>

              </KeyboardAwareScrollView>

              {this.state.isAnimating &&
                <ActivityIndicator size="large" color="#FFBD2F" animating={this.state.isAnimating} style={styles.loading} />
              }
            </View>

          </Modal>
        }



        {/* heading */}
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontWeight: "700", color: "white", fontSize: 24 }}>
            <Text style={{ fontSize: 44, fontWeight: "900", fontFamily: "Gotham-Black" }}>3 </Text>Things
            </Text>
          <Text style={{ color: "white", fontSize: 24.5, fontWeight: "400", fontFamily: "Gotham-Black" }}>You're Grateful for Today</Text>
        </View>
        {/* heading */}



        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          // contentContainerStyle={styles.container}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >


          <View>





            {/* greeetings */}
            <View style={{ marginTop: 30, width: "100%", paddingHorizontal: 5, alignItems: "center", flex: 1 }}>
              <FlatList
                ref={(ref) => { this.flatListRef = ref; }}

                data={this.state.greetingsArray}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                style={{ marginBottom: Platform.OS === 'ios' ? 120 : 120 }}
                renderItem={({ item, index }) => (

                  <TouchableWithoutFeedback onPress={() => { this.greetingAction(item, index) }} style={{ borderRadius: 20, marginTop: 5, width: "30%", height: 120, backgroundColor: "#3182F0", margin: 5 }}>

                    {item.grateful_thing_title !== "Add Other" ?
                      <View style={{ borderRadius: 20, marginTop: 5, width: "30%", height: 120, backgroundColor: "#3182F0", margin: 5 }}>
                        {/* check icon */}
                        <View style={{ flex: 3, justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 7, paddingTop: 3, flexDirection: "row" }}>


                          {item.server_item === false &&
                            <View style={{ justifyContent: "center" }}>
                              <Menu
                                ref={ref => (this[`menu${index}`] = ref)}
                                button={
                                  <TouchableOpacity onPress={() => {
                                    this[`menu${index}`].show();
                                  }}>
                                    <Image source={ThreeDots} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                                  </TouchableOpacity>
                                }
                              >
                                <MenuItem onPress={() => {

                                  setTimeout(() => {
                                    this.setState({ selectedItem: item, greetingName: item.grateful_thing_title, modalVisible: !this.state.modalVisible, isEditing: true });
                                  }, 500);

                                  this[`menu${index}`].hide();


                                }}>Edit</MenuItem>

                                <MenuDivider />
                                <MenuItem onPress={() => {

                                  setTimeout(async () => {
                                    this.deleteAction(item)
                                  }, 500);

                                  this[`menu${index}`].hide();
                                }}>Delete</MenuItem>
                                <MenuDivider />
                              </Menu>
                            </View>

                          }





                          <View style={{ flex: 1 }}></View>
                          <Image source={item.isSelected === true ? CheckedIcon : UnCheckedIcon} style={{ height: 22, width: 22, resizeMode: "contain" }} />

                        </View>
                        {/* check icon */}

                        <View style={{ flex: 7, justifyContent: "flex-end", padding: 13 }}>
                          <Image source={{ uri: domain + item.grateful_thing_icon }} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                          <Text style={{ color: "white", marginTop: 5, fontSize: 13 }}>{item.grateful_thing_title}</Text>
                        </View>
                      </View>

                      :

                      <TouchableOpacity onPress={this.AddOtherGreetingAction} style={{ borderRadius: 20, marginTop: 5, width: "30%", height: 120, backgroundColor: "#1C4EE1", margin: 5, alignItems: "center", justifyContent: "center", borderStyle: "dashed", borderColor: "white", borderWidth: 1.5 }}>
                        <Image source={AddOtherIcon} style={{ height: 37, width: 37, resizeMode: "contain" }} />
                        <Text style={{ color: "white", marginTop: 5, fontSize: 13, marginTop: 10 }}>Add Others</Text>
                      </TouchableOpacity>
                    }

                  </TouchableWithoutFeedback>
                )}
              />
            </View>
            {/* greeetings */}

          </View>

        </KeyboardAwareScrollView>





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

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,

  }

});


