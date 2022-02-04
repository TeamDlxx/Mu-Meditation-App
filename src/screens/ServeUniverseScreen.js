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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

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
import LeftArrow from '../assets/icons/back_arrow_white.png'
import DeviceInfo from 'react-native-device-info'

import CheckedIcon from "../assets/icons/selected.png";
import UnCheckedIcon from "../assets/icons/un_selected.png";
import Modal from "react-native-modal";
import Cross from "../assets/icons/close.png";
import { Navigation } from 'react-native-navigation';
import AsyncStorage from "@react-native-community/async-storage";

import ThreeDots from "../assets/icons/menu.png"
import { domain } from '../components/utilities';


const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);




export default class ServeUniverseScreen extends Component {

  flatListRef = null;
  _menu = null;




  async componentDidMount() {



    let initApiResponse = JSON.parse(await AsyncStorage.getItem('initApiResponse'));

    console.log(initApiResponse, "init api response");

    this.setState({ todaysTasksArray: initApiResponse.universe_action });

    for (let i = 0; i < this.state.todaysTasksArray.length; i++) {
      this.state.todaysTasksArray[i].isSelected = false
    }




    this.setState({ menifestArray: this.props.menifestArray });

    let morningSelected = JSON.parse(await AsyncStorage.getItem('MorningSelected'));
    this.setState({ morning_selected: morningSelected });




    for (let i = 0; i < this.props.menifestArray.universe_action.length; i++) {
      this.props.menifestArray.universe_action[i]._id = this.props.menifestArray.universe_action[i].universe_action;

      if (this.props.menifestArray.universe_action[i].server_item === false) {

        this.state.todaysTasksArray.push({ "server_item": false, "universe_action_status": false, "universe_action_title": this.props.menifestArray.universe_action[i].universe_action_title, "_id": this.props.menifestArray.universe_action[i]._id, "isSelected": true });

      }
    }



    this.state.todaysTasksArray.push({ "server_item": true, "universe_action_status": false, "universe_action_title": "Add Other", _id: "5f72bd170a569b0258125b25", "isSelected": false });


    this.setState({ selectedTasks: this.props.menifestArray.universe_action });

    for (let i = 0; i < this.props.menifestArray.universe_action.length; i++) {

      for (let j = 0; j < this.state.todaysTasksArray.length; j++) {
        if (this.props.menifestArray.universe_action[i].universe_action === this.state.todaysTasksArray[j]._id) {
          this.state.todaysTasksArray[j].isSelected = true
        }
      }

    }


    await this.setState({ todaysTasksArray: this.state.todaysTasksArray })

  }

  constructor() {
    super();
    this.state = {
      selectedItem: "",
      morning_selected: "",

      todaysTasksArray: [],
      selectedTasks: [],
      modalVisible: false,
      taskName: "",
      isEditing: false,
      selectedItem: "",
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

  deleteAction = async (item) => {

    let indexOfItem = this.state.todaysTasksArray.indexOf(item);
    let indexFromSelectedArray = this.state.selectedTasks.indexOf(item);

    if (indexFromSelectedArray !== -1) {
      this.state.selectedTasks.splice(indexFromSelectedArray, 1);
    }
    this.state.todaysTasksArray.splice(indexOfItem, 1);
    await this.setState({ todaysTasksArray: this.state.todaysTasksArray });

  }

  editFunction = () => {

    if (this.state.taskName === "") {
      alert("name can't be empty");
      return;
    }

    this.setState({ modalVisible: !this.state.modalVisible });
    let indexOfItem = this.state.todaysTasksArray.indexOf(this.state.selectedItem);
    this.state.todaysTasksArray[indexOfItem].universe_action_title = this.state.taskName;
    this.setState({ todaysTasksArray: this.state.todaysTasksArray, isEditing: false, taskName: "" });

  }

  taskAction = async (item, index) => {


    if (this.state.todaysTasksArray[index].isSelected === true) {

      let indexOfItem = this.state.selectedTasks.indexOf(item);
      this.state.todaysTasksArray[index].isSelected = false;
      this.state.selectedTasks.splice(indexOfItem, 1);

    }

    else {
      if (this.state.selectedTasks.length === 3) {
        alert("Maximum 3 actions allowed");
        return
      }

      this.state.todaysTasksArray[index].isSelected = true;
      this.state.selectedTasks.push(item);

    }


    console.log(this.state.selectedTasks, "selected tasks are these")

    await this.setState({ todaysTasksArray: this.state.todaysTasksArray, selectedTasks: this.state.selectedTasks });



  }





  nextButtonAction = () => {

    let selectedItemsArrayForServer = []


    if (this.state.selectedTasks.length > 3) {
      alert("Maximum 3 actions allowed");
      return
    }

    if (this.state.selectedTasks.length < 1) {
      alert("You have to choose minimum 1 tasks");
      return
    }


    for (let i = 0; i < this.state.selectedTasks.length; i++) {

      if (this.state.selectedTasks[i].server_item === false) {
        selectedItemsArrayForServer.push({ "universe_action_title": this.state.selectedTasks[i].universe_action_title, "server_item": false })
      }
      else {
        selectedItemsArrayForServer.push({ "universe_action_id": this.state.selectedTasks[i]._id, "server_item": true })
      }
    }

    this.state.menifestArray.universe_action = selectedItemsArrayForServer;

    console.log(this.state.menifestArray, "menifest array ");




    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.HowsDayScreen',
        passProps: {

          menifestArray: this.state.menifestArray,

          // playList: item,
          // connected:this.state.isInternetConnected

        },
        options: {
          bottomTabs: { visible: true },
        }

      }

    });






  }


  saveTaskAction = async () => {

    if (this.state.taskName === "") {
      alert("Greeting name can't be empty");
      return;
    }

    this.state.todaysTasksArray.splice(this.state.todaysTasksArray.length - 1, 1);

    this.state.todaysTasksArray.push({ "server_item": false, "universe_action_status": false, "universe_action_title": this.state.taskName, "_id": "5f72bd170a569b0258125b25", "isSelected": false });
    this.state.todaysTasksArray.push({ "server_item": true, "universe_action_status": false, "universe_action_title": "Add Other", _id: "5f72bd170a569b0258125b25", "isSelected": false });
    await this.setState({ todaysTasksArray: this.state.todaysTasksArray, modalVisible: false, taskName: "" });
    this.flatListRef.scrollToEnd({ animated: true })

  }


  AddTaskModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }


  BackFunction = async () => {
    Navigation.pop(this.props.componentId);

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
    let selectedItemsArrayForServer = []

    if (this.state.selectedTasks.length > 3) {
      alert("Maximum 3 actions allowed");
      return
    }

    if (this.state.selectedTasks.length < 1) {
      alert("You have to choose minimum 1 tasks");
      return
    }


    for (let i = 0; i < this.state.selectedTasks.length; i++) {

      if (this.state.selectedTasks[i].server_item === false) {
        selectedItemsArrayForServer.push({ "universe_action_title": this.state.selectedTasks[i].universe_action_title, "server_item": false })
      }
      else {
        selectedItemsArrayForServer.push({ "universe_action_id": this.state.selectedTasks[i]._id, "server_item": true })
      }
    }

    this.state.menifestArray.universe_action = selectedItemsArrayForServer;

    console.log(selectedItemsArrayForServer, "testing is thisss")
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

      <ImageBackground source={Background} style={{ flex: 1, backgroundColor: "#61C4FB", paddingLeft: 12, paddingRight: 12 }}>


        <MyStatusBar backgroundColor="#63C5FC" barStyle="dark-content" />


        <View style={{ flexDirection: 'row', height: 50 }}>

          <TouchableWithoutFeedback onPress={this.BackFunction}  >
            <View style={{ flex: 0.2, flexDirection: "row", alignItems: "center", }}>
              <Image source={LeftArrow} style={{ height: 16, width: 10 }} />
              {/* <Text style={styles.headingTxt}>Upgrade</Text> */}
            </View>
          </TouchableWithoutFeedback>


          <View style={{ flex: 1, flexDirection: 'row' }}></View>
          <View style={{ flex: 0.3, flexDirection: 'row' }}></View>

        </View>





        {this.state.modalVisible &&
          <Modal isVisible={this.state.modalVisible} >

            <View style={{ flex: 1, flexDirection: 'column', marginBottom: 100, justifyContent: 'center', overflow: "hidden", }}>


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
                  <TouchableOpacity onPress={() => { this.setState({ isEditing: false }); this.AddTaskModal() }} style={{ width: "100%", alignItems: "flex-end", padding: 10 }}>
                    <Image source={Cross} style={{ height: 23, width: 23, }} />
                  </TouchableOpacity>
                  {/* cross icon */}

                  <Text style={{ color: "white", fontWeight: "700", fontSize: 25.5, marginTop: 15 , marginHorizontal:10, textAlign:"center"}}>How else did you serve the universe?</Text>
                  <Text style={{ color: "white", fontSize: 13, fontWeight: "500", marginTop: 10, textAlign: "center" }}>Add another note for how you served the universe!</Text>



                  <View style={{ padding: 10, width: "100%" }}>

                    <View style={{ width: "100%" }}>
                      <TextInput
                        style={{ borderRadius: 10, height: 40, marginTop: 13, paddingHorizontal: 8, backgroundColor: "white", width: "93%", alignSelf: "center" }}
                        onChangeText={(text) => { this.setState({ taskName: text }) }}
                        placeholder="Greeting name"
                        placeholderTextColor="silver"
                        value={this.state.taskName}
                      />

                    </View>

                    <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 5, width: "100%", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                      <TouchableOpacity onPress={this.state.isEditing === true ? this.editFunction : this.saveTaskAction} style={{ backgroundColor: "white", height: 45, width: "60%", borderRadius: 10, alignItems: "center", justifyContent: "center" }} >
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
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white", fontSize: 19, fontWeight: "300" }}>How did you</Text>
          <Text style={{ fontWeight: "800", color: "white", fontSize: 21, fontFamily: "Gotham-Black" }}>Serve the Universe today?</Text>
        </View>
        {/* heading */}




        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          // contentContainerStyle={styles.container}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* greeetings */}
          <View style={{ marginTop: 30, width: "100%", flex: 1, }}>
            <FlatList
              ref={(ref) => { this.flatListRef = ref; }}
              data={this.state.todaysTasksArray}
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: Platform.OS === 'ios' ? 120 : 120 }}

              renderItem={({ item, index }) => (

                <TouchableWithoutFeedback onPress={() => { this.taskAction(item, index) }} style={{ borderRadius: 14, marginTop: 7, height: 120, backgroundColor: "#3182F0", margin: 5, width: "100%" }}>

                  {item.universe_action_title !== "Add Other" ?
                    <View style={{ borderRadius: 14, marginTop: 5, backgroundColor: "#3182F0", minHeight: 64, flexDirection: "row", width: "100%", alignItems: "center", paddingHorizontal: 25, }}>
                      <Text style={{ color: "white", flex: 9 }}>{item.universe_action_title}</Text>


                      <Image source={item.isSelected === true ? CheckedIcon : UnCheckedIcon} style={{ height: 20, width: 20, flex: 1, resizeMode: "contain" }} />

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
                                this.setState({ selectedItem: item, taskName: item.universe_action_title, modalVisible: !this.state.modalVisible, isEditing: true });
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

                    </View>

                    :

                    <TouchableOpacity onPress={this.AddTaskModal} style={{ alignItems: "center", height: 64, borderRadius: 14, marginTop: 5, backgroundColor: "#1C4EE1", alignItems: "center", justifyContent: "center", borderStyle: "dashed", borderColor: "white", borderWidth: 1.5, flexDirection: "row", marginTop: 7 }}>
                      <Image source={AddOtherIcon} style={{ height: 28, width: 28, resizeMode: "contain", marginRight: 10 }} />
                      <Text style={{ color: "white", fontSize: 13, }}>Add Others</Text>
                    </TouchableOpacity>
                  }

                </TouchableWithoutFeedback>
              )}
            />
          </View>
          {/* greeetings */}

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


