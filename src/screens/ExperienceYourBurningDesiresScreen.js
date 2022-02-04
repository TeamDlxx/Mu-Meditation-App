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


import Background from "../assets/icons/background.jpg";

import happyIcon from "../assets/icons/empowering.png"
import productive_white from "../assets/icons/productive_white.png"
import powerful_white from "../assets/icons/powerful_white.png"
import optomistic_white from "../assets/icons/optomistic_white.png"
import energetic_white from "../assets/icons/energetic_white.png"
import creative_white from "../assets/icons/crying.png"
import determined_white from "../assets/icons/overwhelming.png"
import excited from "../assets/icons/excited.png";
import smart_white from "../assets/icons/confusing.png";
import useful_white from "../assets/icons/usefull.png";
import focused from "../assets/icons/motivating.png";
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
import { domain } from '../components/utilities';

import AsyncStorage from "@react-native-community/async-storage"

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

      moodsArray: [
        { "id": 1, "title": "Empowering", "icon": happyIcon, "isSelected": false, backgroundColor: "#3595F5", "addedFromServer": true },
        { "id": 2, "title": "Productive", "icon": productive_white, "isSelected": false, backgroundColor: "#3595F5", "addedFromServer": true },
        { "id": 3, "title": "Powerful", "icon": powerful_white, "isSelected": false, backgroundColor: "#3595F5", "addedFromServer": true },
        { "id": 4, "title": "Optomistic", "icon": optomistic_white, "isSelected": false, backgroundColor: "#3184F0", "addedFromServer": true },
        { "id": 5, "title": "Energetic", "icon": energetic_white, "isSelected": false, backgroundColor: "#3184F0", "addedFromServer": true },
        { "id": 6, "title": "Anxious", "icon": creative_white, "isSelected": false, backgroundColor: "#3184F0", "addedFromServer": true },
        { "id": 7, "title": "Overwhelming", "icon": determined_white, "isSelected": false, backgroundColor: "#2D75EC", "addedFromServer": true },
        { "id": 8, "title": "Excited", "icon": excited, "isSelected": false, backgroundColor: "#2D75EC", "addedFromServer": true },
        { "id": 9, "title": "Confusing", "icon": smart_white, "isSelected": false, backgroundColor: "#2D75EC", "addedFromServer": true },
        { "id": 10, "title": "Usefull", "icon": useful_white, "isSelected": false, backgroundColor: "#2B69E9", "addedFromServer": true },
        { "id": 11, "title": "Motivating", "icon": focused, "isSelected": false, backgroundColor: "#2B69E9", "addedFromServer": true },
        { "id": 12, "title": "Add Other", "icon": AddOtherIcon, "isSelected": false, backgroundColor: "#2B69E9", "addedFromServer": true },


      ],
      selectedMood: [],
      modalVisible: false,
      moodName: "",
      isEditing: false,
      selectedItem: "",
      menifestArray: [],


    }
  }


  async componentDidMount() {

    let initApiResponse = JSON.parse(await AsyncStorage.getItem('initApiResponse'));

    console.log(initApiResponse, "init api response");

    this.setState({ moodsArray: initApiResponse.burning_desire });

    for (let i = 0; i < this.state.moodsArray.length; i++) {
      this.state.moodsArray[i].isSelected = false
    }


    this.setState({ menifestArray: this.props.menifestArray });



    for (let i = 0; i < this.props.menifestArray.burning_desire.length; i++) {
      this.props.menifestArray.burning_desire[i]._id = this.props.menifestArray.burning_desire[i].burning_desire;
      if (this.props.menifestArray.burning_desire[i].server_item === false) {
        this.state.moodsArray.push({ "burning_desire_icon": "media/manifest/3baf8f80-0478-11eb-8d43-b17686e7a57a.png", "burning_desire_status": false, "burning_desire_title": this.props.menifestArray.burning_desire[i].burning_desire_title, "server_item": false, "isSelected": true, "_id": this.props.menifestArray.burning_desire[i]._id });
      }
    }


    this.state.moodsArray.push({ "burning_desire_icon": "media/manifest/3baf8f80-0478-11eb-8d43-b17686e7a57a.png", "burning_desire_status": false, "burning_desire_title": "Add Other", "server_item": true });


    this.setState({ selectedMood: this.props.menifestArray.burning_desire });

    for (let i = 0; i < this.props.menifestArray.burning_desire.length; i++) {
      for (let j = 0; j < this.state.moodsArray.length; j++) {
        if (this.props.menifestArray.burning_desire[i].burning_desire === this.state.moodsArray[j]._id) {
          this.state.moodsArray[j].isSelected = true
        }
      }

    }

    await this.setState({ moodsArray: this.state.moodsArray })


  }



  MoodsAction = async (item, index) => {

    if (this.state.moodsArray[index].isSelected === true) {

      this.state.moodsArray[index].isSelected = false;
      let res = this.state.selectedMood.filter((item2) => item2.id !== item.id);
      await this.setState({ selectedMood: res });

    }
    else {

      if (this.state.selectedMood.length === 3) {
        alert("Maximum 3 moods are allowed");
        return
      }

      this.state.moodsArray[index].isSelected = true;
      this.state.selectedMood.push(item);

    }

    await this.setState({ moodsArray: this.state.moodsArray, selectedMood: this.state.selectedMood });

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

    let indexOfItem = this.state.moodsArray.indexOf(item);

    let indexFromSelectedArray = this.state.selectedMood.indexOf(item);

    if (indexFromSelectedArray !== -1) {
      this.state.selectedMood.splice(indexFromSelectedArray, 1);
    }


    this.state.moodsArray.splice(indexOfItem, 1);
    await this.setState({ moodsArray: this.state.moodsArray });

  }



  editFunction = () => {

    if (this.state.moodName === "") {
      alert("name can't be empty");
      return;
    }

    this.setState({ modalVisible: !this.state.modalVisible });
    let indexOfItem = this.state.moodsArray.indexOf(this.state.selectedItem);
    this.state.moodsArray[indexOfItem].burning_desire_title = this.state.moodName;
    this.setState({ moodsArray: this.state.moodsArray, isEditing: false, moodName: "" });

  }



  nextButtonAction = () => {


    let selectedItemsArrayForServer = []



    if (this.state.selectedMood.length > 3) {
      alert("Maximum 3 moods are allowed");
      return
    }

    if (this.state.selectedMood.length < 1) {
      alert("You have to choose minimum 1 moods");
      return
    }


    for (let i = 0; i < this.state.selectedMood.length; i++) {

      if (this.state.selectedMood[i].server_item === false) {
        selectedItemsArrayForServer.push({ "burning_desire_title": this.state.selectedMood[i].burning_desire_title, "burning_desire_icon": "title for burning icon", "server_item": false })
      }
      else {
        selectedItemsArrayForServer.push({ "burning_desire_id": this.state.selectedMood[i]._id, "server_item": true })
      }
    }

    this.state.menifestArray.burning_desire = selectedItemsArrayForServer;

    console.log(this.state.menifestArray, "menifest array ");


    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.HowsDayScreen',
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


  saveNewMood = async () => {

    if (this.state.moodName === "") {
      alert("mood name can't be empty");
      return;
    }

    this.state.moodsArray.splice(this.state.moodsArray.length - 1, 1)

    this.state.moodsArray.push({ "burning_desire_icon": "media/manifest/3baf8f80-0478-11eb-8d43-b17686e7a57a.png", "burning_desire_status": false, "burning_desire_title": this.state.moodName, "server_item": false, "isSelected": false });

    this.state.moodsArray.push({ "burning_desire_icon": "media/manifest/3baf8f80-0478-11eb-8d43-b17686e7a57a.png", "burning_desire_status": false, "burning_desire_title": "Add Other", "server_item": true });

    await this.setState({ moodsArray: this.state.moodsArray, modalVisible: false, moodName: "" });

    this.flatListRef.scrollToEnd({ animated: true })


  }


  AddOtherMoodModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }



  BackFunction = async () => {

    Navigation.pop(this.props.componentId);

  }

  render() {
    return (


      <ImageBackground source={Background} style={{ flex: 1, paddingLeft: 12, paddingRight: 12 }}>

        <MyStatusBar backgroundColor="#63C5FC" barStyle="dark-content" />

        <View style={{ flexDirection: 'row', height: 50 }} >
          <TouchableWithoutFeedback onPress={this.BackFunction} >
            <View style={{ flex: 0.2, flexDirection: "row", alignItems: "center" }}>
              <Image source={LeftArrow} style={{ height: 16, width: 10 }} />
            </View>
          </TouchableWithoutFeedback>


          <View style={{ flex: 1, flexDirection: 'row' }}></View>
          <View style={{ flex: 0.3, flexDirection: 'row' }}></View>

        </View>




        {this.state.modalVisible &&
          <Modal isVisible={this.state.modalVisible} >

            <View style={{ flex: 1, flexDirection: 'column', marginBottom: 100, justifyContent: 'center',  overflow: "hidden" }}>


            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flex: 1, alignItems:"center", justifyContent:"center"}}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enabled
              >
              <ImageBackground source={Background} style={{ backgroundColor: "white", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", borderRadius: 15, overflow: "hidden", }}>

                {/* cross icon */}
                <TouchableOpacity onPress={() => { this.setState({ isEditing: false }); this.AddOtherMoodModal() }} style={{ width: "100%", alignItems: "flex-end", padding: 10 }}>
                  <Image source={Cross} style={{ height: 23, width: 23, }} />
                </TouchableOpacity>
                {/* cross icon */}

                <Text style={{ color: "white", fontWeight: "700", fontSize: 25.5, marginTop: 15 }}>Add your New Action!</Text>
                <Text style={{ color: "white", fontSize: 13, fontWeight: "500", marginTop: 10, textAlign: "center" }}>Add your customized unlimited new {"\n"} actions!</Text>



                <View style={{ padding: 10, width: "100%" }}>

                  <View style={{ width: "100%" }}>
                    <TextInput
                      style={{ borderRadius: 10, height: 40, marginTop: 13, paddingHorizontal: 8, backgroundColor: "white", width: "93%", alignSelf: "center" }}
                      onChangeText={(text) => { this.setState({ moodName: text }) }}
                      placeholder="Action name"
                      placeholderTextColor="silver"
                      value={this.state.moodName}
                    />

                  </View>

                  <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 5, width: "100%", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <TouchableOpacity onPress={this.state.isEditing === true ? this.editFunction : this.saveNewMood} style={{ backgroundColor: "white", height: 45, width: "60%", borderRadius: 10, alignItems: "center", justifyContent: "center" }} >
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
        <Text style={{ marginTop: 10, }}>
          <Text style={{ color: "white", fontSize: 21, fontWeight: "400", fontFamily: "Gotham-Black" }}>How did it </Text>
          <Text style={{ fontWeight: "800", color: "white", fontSize: 23, fontFamily: "Gotham-Black" }}>Feel to experience{"\n"} your burning desires?</Text>
        </Text>
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

                data={this.state.moodsArray}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                style={{ marginBottom: Platform.OS === 'ios' ? 120 : 120 }}
                renderItem={({ item, index }) => (

                  <TouchableWithoutFeedback onPress={() => { this.MoodsAction(item, index) }} style={{ borderRadius: 20, marginTop: 5, width: "30%", height: 120, backgroundColor: "#3182F0", margin: 5 }}>

                    {item.burning_desire_title !== "Add Other" ?
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
                                    this.setState({ selectedItem: item, moodName: item.burning_desire_title, modalVisible: !this.state.modalVisible, isEditing: true });
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
                          <Image source={{ uri: domain + item.burning_desire_icon }} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                          <Text style={{ color: "white", marginTop: 5, fontSize: 13 }}>{item.burning_desire_title}</Text>
                        </View>
                      </View>

                      :

                      <TouchableOpacity onPress={this.AddOtherMoodModal} style={{ borderRadius: 20, marginTop: 5, width: "30%", height: 120, backgroundColor: "#1C4EE1", margin: 5, alignItems: "center", justifyContent: "center", borderStyle: "dashed", borderColor: "white", borderWidth: 1.5 }}>
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


