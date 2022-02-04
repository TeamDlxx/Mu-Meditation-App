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

  constructor(props) {
    super(props);
    this.state = {
      data: [],

      selectedItems: [],
      menifestArray: this.props.menifestArray

    }

  }




  async componentDidMount() {



    let intentionActionsMorning = JSON.parse(await AsyncStorage.getItem('intentionActionsMorning'));

    
    console.log(this.props.menifestArray , "this.props.menifestArray")
    console.log(intentionActionsMorning, "intentionActionsMorning intentionActionsMorning")
    if (intentionActionsMorning !== "" && intentionActionsMorning !== undefined && intentionActionsMorning !== null) {
      this.setState({ data: intentionActionsMorning })
    }



    //if coming from edit to is array mn data aya hoga aur wo items select hojayen gi

    for (let i = 0; i < this.props.menifestArray.manifest_intention_action.length; i++) {
      for (let j = 0; j < this.state.data.length; j++) {
        if (this.props.menifestArray.manifest_intention_action[i]._id === this.state.data[j]._id) {
          this.state.data[j].intention_status = true
        }
      }
    }
    //if coming from edit to is array mn data aya hoga




  }





  nextButtonAction = () => {

    let selectedItemsArrayForServer = []


    for (let i = 0; i < this.state.data.length; i++) {

      selectedItemsArrayForServer.push(
        {
          "intention_title": this.state.data[i].intention_title,
          "intention_status" : this.state.data[i].intention_status
        }
      )
    }


    console.log(this.state.menifestArray, "for server array")


    this.state.menifestArray.manifest_intention_action = selectedItemsArrayForServer;

    console.log(this.state.menifestArray , "manifest array prepared")



    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.GrateFullForTodayScreen',
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





  addOtherAction = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }



  BackFunction = async () => {
    Navigation.pop(this.props.componentId);
  }


  chooseAction = (item, index) => {



    if (this.state.data[index].intention_status === true) {

      let indexOfItem = this.state.selectedItems.indexOf(item);
      this.state.data[index].intention_status = false;
      this.state.selectedItems.splice(indexOfItem, 1);
      this.setState({ data: this.state.data })


    }

    else {

      this.state.data[index].intention_status = true;
      this.state.selectedItems.push(item)
      this.setState({ data: this.state.data })

    }



    console.log(this.state.data, "selected items are")

  }




  render() {
    return (


      <ImageBackground source={Background} style={{ flex: 1, padding: 10 }}>


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





        {/* heading */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white", fontSize: 19, fontWeight: "400", fontFamily: "Gotham-Black" }}>Which intentional action(s) did you</Text>
          <Text style={{ fontWeight: "800", color: "white", fontSize: 21, fontFamily: "Gotham-Black" }}>complete today to manifest your goal?</Text>
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

            <View style={{ marginTop: 30, flex: 1, paddingBottom: 20 }}>
              <FlatList
                ref={(ref) => { this.flatListRef = ref }}
                data={this.state.data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (

                  <TouchableWithoutFeedback onPress={() => { this.chooseAction(item, index) }}>
                    <View style={[{ minHeight: 60, backgroundColor: "#337BEA", marginTop: 10, borderRadius: 5, alignItems: "center", padding: 13, flexDirection: "row" }]}>
                      <Image source={item.intention_status ? CheckedIcon : UnCheckedIcon} style={{ height: 17, width: 17, resizeMode: "contain" }} />
                      <Text style={{ color: "white", marginLeft: 10 }}>{item.intention_title}</Text>
                    </View>
                  </TouchableWithoutFeedback>

                )}
              />
            </View>



          </View>

        </KeyboardAwareScrollView>



        <TouchableWithoutFeedback onPress={this.nextButtonAction}>
          <View style={[styles.buttonView, Platform.OS === "android" ? { bottom: 60 } : { bottom: 20 }]}>
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


  shadow: {
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },

  modalContainer: {
    height: Dimensions.get('window').height * .3,
    width: Dimensions.get('window').width,
    alignSelf: "center",
    paddingHorizontal: 20
  }

});


