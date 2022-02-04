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
  Alert,
  Keyboard,
  Platform,
  Dimensions
} from 'react-native';


import Background from "../assets/icons/background.jpg";

import happyIcon from "../assets/icons/happy.png"
import productive_white from "../assets/icons/productive_white.png"
import powerful_white from "../assets/icons/powerful_white.png"
import optomistic_white from "../assets/icons/optomistic_white.png"
import energetic_white from "../assets/icons/energetic_white.png"
import creative_white from "../assets/icons/creative_white.png"
import determined_white from "../assets/icons/determined_white.png"
import excited from "../assets/icons/excited.png";
import smart_white from "../assets/icons/smart_white.png";
import useful_white from "../assets/icons/useful_white.png";
import focused from "../assets/icons/focused.png";
import AddOtherIcon from "../assets/icons/add.png";



import LeftArrow from '../assets/icons/back_arrow_white.png'

import CheckedIcon from "../assets/icons/selected.png";
import UnCheckedIcon from "../assets/icons/un_selected.png";
import Modal from "react-native-modal";
import Cross from "../assets/icons/close.png";
import { Navigation } from 'react-native-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import ThreeDots from "../assets/icons/menu.png"

import AsyncStorage from "@react-native-community/async-storage"
import DeviceInfo from 'react-native-device-info'

import { domain } from "../components/utilities"

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);



export default class ActionsScreen extends Component {

  flatListRef = null

  constructor() {
    super();
    this.state = {

      menifestArray: [],

      actionsArray: [],
      selectedActions: [],
      modalVisible: false,
      actionName: "",
      isEditing: false,
      selectedItem: "",
      morning_selected: "",
      menifestArray: [],
      keyboard: false,
      keyboardSpace: 0


    }

  }


  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }


  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }


  _keyboardDidShow = () => {
    this.setState({ keyboard: true })
  }

  _keyboardDidHide = () => {
    this.setState({ keyboard: false })
  }


  async componentDidMount() {


    let initApiResponse = JSON.parse(await AsyncStorage.getItem('initApiResponse'));

    console.log(initApiResponse, "init api response");

    this.setState({ actionsArray: initApiResponse.feel_action });

    for (let i = 0; i < this.state.actionsArray.length; i++) {
      this.state.actionsArray[i].isSelected = false
    }


    this.setState({ menifestArray: this.props.menifestArray });





    for (let i = 0; i < this.props.menifestArray.feel_action.length; i++) {

      this.props.menifestArray.feel_action[i]._id = this.props.menifestArray.feel_action[i].feel_action;

      if (this.props.menifestArray.feel_action[i].server_item === false) {
        this.state.actionsArray.push({ "feel_action_icon": "media/manifest/5f0877c0-0474-11eb-8d43-b17686e7a57a.png", "feel_action_status": false, "feel_action_title": this.props.menifestArray.feel_action[i].feel_action_title, "server_item": false, "_id": this.props.menifestArray.feel_action[i]._id, "isSelected": true });

      }

    }

    this.state.actionsArray.push({ "feel_action_icon": "media/manifest/5f0877c0-0474-11eb-8d43-b17686e7a57a.png", "feel_action_status": false, "feel_action_title": "Add Other", "server_item": true, "_id": "5f72be5b0a569b0258125b2e", "isSelected": false });


    //agar koi aaye ga in case of edit to set hojaye ga warna empty hi rhy ga does not matter
    this.setState({ selectedActions: this.props.menifestArray.feel_action });


    for (let i = 0; i < this.props.menifestArray.feel_action.length; i++) {
      for (let j = 0; j < this.state.actionsArray.length; j++) {
        if (this.props.menifestArray.feel_action[i].feel_action === this.state.actionsArray[j]._id) {
          this.state.actionsArray[j].isSelected = true
        }


      }

    }


    await this.setState({ actionsArray: this.state.actionsArray })

    console.log(this.state.actionsArray, "this.state.actionsArray")

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

    let indexOfItem = this.state.actionsArray.indexOf(item);

    let indexFromSelectedArray = this.state.selectedActions.indexOf(item);
    if (indexFromSelectedArray !== -1) {
      this.state.selectedActions.splice(indexFromSelectedArray, 1);
    }

    this.state.actionsArray.splice(indexOfItem, 1);
    await this.setState({ actionsArray: this.state.actionsArray });

  }



  editFunction = () => {

    if (this.state.actionName === "") {
      alert("name can't be empty");
      return;
    }

    this.setState({ modalVisible: !this.state.modalVisible });
    let indexOfItem = this.state.actionsArray.indexOf(this.state.selectedItem);
    this.state.actionsArray[indexOfItem].feel_action_title = this.state.actionName;
    this.setState({ actionsArray: this.state.actionsArray, isEditing: false, actionName: "" });

  }



  actionPressedFunc = async (item, index) => {

    if (this.state.actionsArray[index].isSelected === true) {
      this.state.actionsArray[index].isSelected = false;
      let res = this.state.selectedActions.filter((item2) => item2.feel_action_title !== item.feel_action_title);
      await this.setState({ selectedActions: res });


    }
    else {

      if (this.state.selectedActions.length === 3) {
        alert("Maximum 3 actions are allowed");
        return
      }
      this.state.actionsArray[index].isSelected = true;
      this.state.selectedActions.push(item);
    }

    await this.setState({ actionsArray: this.state.actionsArray, selectedActions: this.state.selectedActions });
    console.log(this.state.selectedActions, "selected actions are");

  }





  nextButtonAction = () => {

    let selectedItemsArrayForServer = []

    if (this.state.selectedActions.length > 3) {
      alert("Maximum 3 actions are allowed");
      return
    }
    if (this.state.selectedActions.length < 1) {
      alert("You have to choose minimum 1 action");
      return
    }
    for (let i = 0; i < this.state.selectedActions.length; i++) {

      if (this.state.selectedActions[i].server_item === false) {
        selectedItemsArrayForServer.push({ "feel_action_title": this.state.selectedActions[i].feel_action_title, "feel_action_icon": "happy1.jpg", "server_item": false })
      }
      else {
        selectedItemsArrayForServer.push({ "feel_action_id": this.state.selectedActions[i]._id, "server_item": true })
      }
    }

    console.log(selectedItemsArrayForServer, "for server array")


    this.state.menifestArray.feel_action = selectedItemsArrayForServer;

    console.log(this.state.menifestArray, "menifest array ");



    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.HowsMyMoodScreen',
        passProps: {

          menifestArray: this.state.menifestArray,
          // connected:this.state.isInternetConnected

        },
        options: {
          bottomTabs: { visible: true },
        }

      }

    });




  }


  saveAction = async () => {

    if (this.state.actionName === "") {
      alert("action name can't be empty");
      return;
    }


    this.state.actionsArray.splice(this.state.actionsArray.length - 1, 1);

    this.state.actionsArray.push({ "feel_action_icon": "media/manifest/5f0877c0-0474-11eb-8d43-b17686e7a57a.png", "feel_action_status": false, "feel_action_title": this.state.actionName, "server_item": false, "_id": "5f72be5b0a569b0258125b2e", "isSelected": false });
    this.state.actionsArray.push({ "feel_action_icon": "media/manifest/5f0877c0-0474-11eb-8d43-b17686e7a57a.png", "feel_action_status": false, "feel_action_title": "Add Other", "server_item": true, "_id": "5f72be5b0a569b0258125b2e", "isSelected": false });
    await this.setState({ actionsArray: this.state.actionsArray, modalVisible: false, actionName: "" });
    this.flatListRef.scrollToEnd({ animated: true });


  }


  addOtherAction = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }



  BackFunction = async () => {
    Navigation.pop(this.props.componentId);
  }


  saveManifest = async () => {

    console.log(this.props.menifestArray.feel_action[0]._id, "skuytyteyscasvdgasytdy");

    // changing feel action structure


    let selectedItemsArrayForServer = []

    if (this.state.selectedActions.length > 3) {
      alert("Maximum 3 actions are allowed");
      return
    }
    if (this.state.selectedActions.length < 1) {
      alert("You have to choose minimum 1 action");
      return
    }

    for (let i = 0; i < this.state.selectedActions.length; i++) {

      if (this.state.selectedActions[i].server_item === false) {
        selectedItemsArrayForServer.push({ "feel_action_title": this.state.selectedActions[i].feel_action_title, "feel_action_icon": "happy1.jpg", "server_item": false })
      }
      else {
        selectedItemsArrayForServer.push({ "feel_action_id": this.state.selectedActions[i]._id, "server_item": true })
      }
    }

    console.log(selectedItemsArrayForServer, "for server array")


    this.state.menifestArray.feel_action = selectedItemsArrayForServer;

    console.log(this.state.menifestArray, "menifest array ");

    //feel actions end




    // change intention actions structure

    let new_intention_actions = []

    for (let i = 0; i < this.props.menifestArray.manifest_intention_action.length; i++) {
      new_intention_actions.push({ "intention_title": this.props.menifestArray.manifest_intention_action[i].intention_title })
    }
    this.props.menifestArray.manifest_intention_action = new_intention_actions








    // change menifest user personality

    let new_user_personality = []
    for (let i = 0; i < this.props.menifestArray.manifest_user_personality.length; i++) {

      if (this.props.menifestArray.manifest_user_personality[i].server_item === true) {

        new_user_personality.push({
          "personality_id": this.props.menifestArray.manifest_user_personality[i].manifest_user_personality,
          "server_item": true
        })
      }

      else {
        new_user_personality.push({
          "personality_title": this.props.menifestArray.manifest_user_personality[i].personality_title,
          "personality_icon": "happy.jpg",
          "server_item": false
        })
      }
    }

    this.props.menifestArray.manifest_user_personality = new_user_personality
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

          <Modal isVisible={this.state.modalVisible} onBackdropPress={this.addOtherAction} style={styles.modalContainer}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', overflow: "hidden", }}>

              <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flex: 1, alignItems:"center", justifyContent:"center"}}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enabled
              >


                <ImageBackground source={Background} style={[{ backgroundColor: "white", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", borderRadius: 15, overflow: "hidden", }]}>

                  {/* cross icon */}
                  <TouchableOpacity onPress={() => { this.setState({ isEditing: false }); this.addOtherAction() }} style={{ width: "100%", alignItems: "flex-end", padding: 10 }}>
                    <Image source={Cross} style={{ height: 23, width: 23, }} />
                  </TouchableOpacity>
                  {/* cross icon */}

                  <Text style={{ color: "white", fontWeight: "700", fontSize: 25.5, marginTop: 15 }}>Add your New Action!</Text>
                  <Text style={{ color: "white", fontSize: 13, fontWeight: "500", marginTop: 10, textAlign: "center" }}>Add your customized unlimited new {"\n"} actions!</Text>

                  <View style={{ padding: 10, width: "100%" }}>

                    <View style={{ width: "100%" }}>
                      <TextInput
                        style={{ borderRadius: 10, height: 40, marginTop: 13, paddingHorizontal: 8, backgroundColor: "white", width: "93%", alignSelf: "center" }}
                        onChangeText={(text) => { this.setState({ actionName: text }) }}
                        placeholder="Action name"
                        placeholderTextColor="silver"
                        value={this.state.actionName}
                      />

                    </View>

                    <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 5, width: "100%", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                      <TouchableOpacity onPress={this.state.isEditing === true ? this.editFunction : this.saveAction} style={{ backgroundColor: "white", height: 45, width: "60%", borderRadius: 10, alignItems: "center", justifyContent: "center" }} >
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
          <Text style={{ color: "white", fontSize: 19, fontWeight: "400", fontFamily: "Gotham-Black" }}>How will you feel</Text>
          <Text style={{ fontWeight: "800", color: "white", fontSize: 21, fontFamily: "Gotham-Black" }}>While doing these actions?</Text>
        </View>
        {/* heading */}



        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          // contentContainerStyle={{flex:1}}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>

            {/* greeetings */}
            <View style={{ marginTop: 30, width: "100%", paddingHorizontal: 5, alignItems: "center", flex: 1 }}>
              <FlatList
                ref={(ref) => { this.flatListRef = ref; }}

                data={this.state.actionsArray}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                style={{ marginBottom: Platform.OS === 'ios' ? 120 : 120 }}
                renderItem={({ item, index }) => (

                  <TouchableWithoutFeedback onPress={() => { this.actionPressedFunc(item, index) }} style={{ borderRadius: 20, marginTop: 5, width: "30%", height: 120, backgroundColor: item.backgroundColor, margin: 5 }}>

                    {item.feel_action_title !== "Add Other" ?
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
                                    this.setState({ selectedItem: item, actionName: item.feel_action_title, modalVisible: !this.state.modalVisible, isEditing: true });
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
                          <Image source={{ uri: domain + item.feel_action_icon }} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                          <Text style={{ color: "white", marginTop: 5, fontSize: 13 }}>{item.feel_action_title}</Text>
                        </View>
                      </View>

                      :

                      <TouchableOpacity onPress={this.addOtherAction} style={{ borderRadius: 20, marginTop: 5, width: "30%", height: 120, backgroundColor: "#1C4EE1", margin: 5, alignItems: "center", justifyContent: "center", borderStyle: "dashed", borderColor: "white", borderWidth: 1.5 }}>
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
          <View style={[styles.buttonView, Platform.OS === "android" ? { bottom: 60 } : { bottom: 10 }]}>
            <Text style={{ color: "#447CEC", padding: 5, fontWeight: "bold", fontSize: 18, marginLeft: 0 }}>{this.props.editingDirectly !== undefined ? "Save" : "Next"}</Text>
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
    height: 55, width: "80%",
    // right: "2%",

    borderRadius: 30,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: 'center',
    alignSelf: "center",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    position: "absolute",
  },

  modalContainer: {
    height: Dimensions.get('window').height * .3,
    width: Dimensions.get('window').width,
    alignSelf: "center",
    paddingHorizontal: 20
  }

});


