
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  TextInput,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";


import add from "../assets/icons/add.png";

import bg from '../assets/icons/background.jpg'
import back from '../assets/icons/back_arrow_white.png'
import close from '../assets/icons/close.png'

import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

const { Navigation } = require('react-native-navigation');
const screenWidth = Dimensions.get("window").width
import AsyncStorage from "@react-native-community/async-storage";
import DeviceInfo from 'react-native-device-info'
import LeftArrow from '../assets/icons/back_arrow_white.png'
import { domain } from '../components/utilities';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

let actionValue = ""

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class GettingStarted extends Component {

  constructor(props) {
    super(props);
    this.state = {
      action1: '',
      action2: '',
      action3: '',
      editAlert: false,
      editActionChosen: '',
      chosenActionValue: '',
      morning_selected: "",
      menifestArray: [],
      actionsArray: [],
      IsActionOneEditable: true,
      IsActionTwoEditable: true,
      IsActionThreeEditable: true,
      focus1: false,
      focus2: false,
      focus3: false
    }
  }


  async componentDidMount() {

    this.setState({ menifestArray: this.props.menifestArray })

    console.log(this.props.menifestArray.manifest_intention_action, "this.props.menifestArray.manifest_intention_action")

    for (let i = 0; i < this.props.menifestArray.manifest_intention_action.length; i++) {


      if (i === 0) {
        this.state.action1 = this.props.menifestArray.manifest_intention_action[i].intention_title;
        this.state.actionsArray.push({ "intention_title": this.props.menifestArray.manifest_intention_action[i].intention_title })
      }

      else if (i === 1) {
        this.state.action2 = this.props.menifestArray.manifest_intention_action[i].intention_title;
        this.state.actionsArray.push({ "intention_title": this.props.menifestArray.manifest_intention_action[i].intention_title })

      }


      else if (i === 2) {

        this.state.action3 = this.props.menifestArray.manifest_intention_action[i].intention_title;
        this.state.actionsArray.push({ "intention_title": this.props.menifestArray.manifest_intention_action[i].intention_title })

      }

      console.log(this.state.action1, this.state.action2, this.state.action2)

    }

    let morningSelected = JSON.parse(await AsyncStorage.getItem('MorningSelected'));
    this.setState({ morning_selected: morningSelected })

  }

  buBack = () => {
    Navigation.pop(this.props.componentId)
  }

  buClose = () => {
    this.setState({ chosenActionValue: "" })
    this.setState({ editActionChosen: 0 })
    this.setState({ editAlert: false })
  }



  nextButtonAction = () => {

    if (this.state.action1 == "" && this.state.action2 == "" && this.state.action3 == "") {
      alert("Please add minimum 1 action");
      return
    }


    this.state.menifestArray.manifest_intention_action = this.state.actionsArray;
    console.log(this.state.menifestArray, "menifest array");

    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.ActionsScreen',
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


  actionChangeHandler = (value) => {

    if (value.length > 70) {
      Alert.alert("Cannot Enter more than 70 charachters.")
    }
    else {
      this.setState({ chosenActionValue: value })
    }

  }

  buDone = async () => {

    console.log("bu done is called")
    var value = this.state.chosenActionValue

    if (this.state.editActionChosen == 1) {
      await this.setState({ action1: value });


      if (this.state.actionsArray[0] !== undefined) {

        this.state.actionsArray[0] = { "intention_title": value };
      }
      else {
        this.state.actionsArray.push({ "intention_title": value });
      }

    }

    else if (this.state.editActionChosen == 2) {

      await this.setState({ action2: value });

      if (this.state.actionsArray[1] !== undefined) {

        this.state.actionsArray[1] = { "intention_title": value };
      }
      else {
        this.state.actionsArray.push({ "intention_title": value });
      }


    }

    else if (this.state.editActionChosen == 3) {

      await this.setState({ action3: value });

      if (this.state.actionsArray[2] !== undefined) {

        this.state.actionsArray[2] = { "intention_title": value };
      }
      else {
        this.state.actionsArray.push({ "intention_title": value });
      }

    }

    console.log(this.state.actionsArray, "actions array")

    this.setState({ chosenActionValue: "" })
    this.setState({ editActionChosen: 0 })
    this.setState({ editAlert: false })
  }


  editAction = async (number) => {




    if (number == 1) {
      actionValue = this.state.action1
      this.setState({ chosenActionValue: actionValue })
      this.setState({ editActionChosen: 1 })
      this.setState({ editAlert: true });




    }
    if (number == 2) {
      actionValue = this.state.action2
      this.setState({ chosenActionValue: actionValue })
      this.setState({ editActionChosen: 2 })
      this.setState({ editAlert: true })


    }
    if (number == 3) {

      actionValue = this.state.action3
      this.setState({ chosenActionValue: actionValue })
      this.setState({ editActionChosen: 3 })
      this.setState({ editAlert: true })
    }

  }


  BackFunction = () => {
    Navigation.pop(this.props.componentId);
  }


  saveManifest = async () => {


    if (this.state.action1 == "" && this.state.action2 == "" && this.state.action3 == "") {
      alert("Please add minimum 1 action");
      return
    }




    // changing feel action structure
    let new_feel_actin = []

    for (let i = 0; i < this.props.menifestArray.feel_action.length; i++) {
      let server_item = {
        "feel_action_id": "",
        "server_item": ""
      }
      let not_server_item =
      {
        "feel_action_title": "",
        "feel_action_icon": "",
        "server_item": ""
      }
      if (this.props.menifestArray.feel_action[i].server_item === true) {
        server_item.feel_action_id = this.props.menifestArray.feel_action[i].feel_action
        server_item.server_item = true
        new_feel_actin.push(server_item)
      }

      else {
        not_server_item.feel_action_title = this.props.menifestArray.feel_action[i].feel_action_title
        not_server_item.feel_action_icon = "happy.png"
        not_server_item.server_item = false
        new_feel_actin.push(not_server_item)

      }

    }
    this.props.menifestArray.feel_action = new_feel_actin;






    // change intention actions structure

    this.props.menifestArray.manifest_intention_action = this.state.actionsArray








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
      <View style={styles.container}>






        <ImageBackground style={[styles.background, Platform.OS === "android" ? { paddingBottom: 50 } : {}]} source={bg}>

          <MyStatusBar backgroundColor="#63C5FC" barStyle="dark-content" />



          <View style={{ flexDirection: 'row', height: 50, marginLeft: 20 }}>

            <TouchableWithoutFeedback onPress={this.BackFunction}  >
              <View style={{ flex: 0.2, flexDirection: "row", alignItems: "center" }}>
                <Image source={LeftArrow} style={{ height: 16, width: 10 }} />
                {/* <Text style={styles.headingTxt}>Upgrade</Text> */}
              </View>
            </TouchableWithoutFeedback>


            <View style={{ flex: 1, flexDirection: 'row' }}></View>
            <View style={{ flex: 0.3, flexDirection: 'row' }}></View>

          </View>


          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            // contentContainerStyle={styles.container}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          >


            {/* <ScrollView> */}



            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={"handled"}>
              <View style={{ paddingBottom: 100 }}>


                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10, }}>
                  <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: '300' }}>What </Text>
                  <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: '900' }}>Intention actions will </Text>
                </View>

                <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: '900', marginLeft: 20, marginTop: 5 }}>you do today to attract it?</Text>



                <TouchableWithoutFeedback onPress={() => { this.refs.myInput.focus(); }}>

                  <View style={styles.textInputContainer}>

                    <TextInput
                      style={styles.textInput}
                      ref="myInput"
                      placeholder={"Add New Action"}
                      textAlignVertical="center"
                      placeholderTextColor={'#D8D6D8'}

                      multiline={true}
                      onChangeText={(text) => {

                        if (text.length > 70) {
                          Alert.alert("Cannot Enter more than 70 charachters.")
                        }
                        else {
                          this.setState({ action1: text })

                          if (this.state.actionsArray[0] !== undefined) {

                            this.state.actionsArray[0] = { "intention_title": text };
                          }
                          else {
                            this.state.actionsArray.push({ "intention_title": text });
                          }

                        }
                      }}
                      value={this.state.action1}
                    />
                  </View>
                </TouchableWithoutFeedback>





                <TouchableWithoutFeedback onPress={() => { this.refs.myInput2.focus(); }}>
                  <View style={styles.textInputContainer}>

                    <TextInput
                      style={styles.textInput}
                      ref="myInput2"

                      textAlignVertical="center"
                      multiline={true}
                      placeholder={"Add New Action"}
                      placeholderTextColor={'#D8D6D8'}
                      onChangeText={(text) => {

                        if (text.length > 70) {
                          Alert.alert("Cannot Enter more than 70 charachters.")
                        }
                        else {
                          this.setState({ action2: text })

                          if (this.state.actionsArray[1] !== undefined) {

                            this.state.actionsArray[1] = { "intention_title": text };
                          }
                          else {
                            this.state.actionsArray.push({ "intention_title": text });
                          }

                        }

                      }}
                      value={this.state.action2}


                    />
                  </View>


                </TouchableWithoutFeedback>




                <TouchableWithoutFeedback onPress={() => { this.refs.myInput3.focus(); }}>
                  <View style={styles.textInputContainer}>

                    <TextInput
                      multiline={true}
                      ref="myInput3"

                      style={styles.textInput}
                      textAlignVertical="center"
                      placeholder={"Add New Action"}
                      placeholderTextColor={'#D8D6D8'}
                      onChangeText={(text) => {

                        if (text.length > 70) {
                          Alert.alert("Cannot Enter more than 70 charachters.")
                        }
                        else {
                          this.setState({ action3: text })

                          if (this.state.actionsArray[2] !== undefined) {

                            this.state.actionsArray[2] = { "intention_title": text };
                          }
                          else {
                            this.state.actionsArray.push({ "intention_title": text });
                          }

                        }
                      }}
                      value={this.state.action3}
                    />
                  </View>

                </TouchableWithoutFeedback>

              </View>

              {/* {(this.state.action3 == "") && <Image source={add} style={{ width: 35, height: 35, marginLeft: 30, marginTop: 42 }}></Image>} */}

              {/* </ScrollView> */}


              {this.state.editAlert &&
                <View style={{ backgroundColor: 'rgba(19, 28, 32,0.7)', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', }}>

                  <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20, backgroundColor: '#58b0fa', height: 250, width: screenWidth - 40, flexDirection: 'column', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableOpacity style={{ width: 30, height: 30, marginTop: -25, marginRight: 10, alignSelf: 'flex-end' }} onPress={this.buClose}>
                      <Image source={close} style={{ width: 20, height: 20, marginTop: 10 }}>
                      </Image>
                    </TouchableOpacity>

                    <Text style={{ marginLeft: 18, color: '#ffffff', fontSize: 19, fontWeight: 'bold', marginTop: 8 }}>Add New Action!</Text>

                    <TextInput style={{ width: screenWidth - 100, height: 80, marginBottom: 15, marginTop: 15, backgroundColor: '#ffffff', padding: 10, borderRadius: 8 }}
                      placeholder='Enter your text here'
                      placeholderTextColor='#d5c9de'
                      multiline={true}
                      textContentType={"password"}
                      value={(this.state.chosenActionValue)}
                      onChangeText={this.actionChangeHandler}>
                    </TextInput>
                    <TouchableOpacity style={{ width: 200, backgroundColor: '#ffffff', height: 43, borderRadius: 10, borderColor: '#ffffff' }} onPress={this.buDone}>
                      <Text style={{ textAlign: 'center', color: '#2387f6', fontSize: 15, fontWeight: 'bold', marginTop: 12 }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }

              {this.state.isAnimating &&
                <ActivityIndicator size="large" color="#58278c" animating={this.state.isAnimating} style={styles.loading} />
              }


            </ScrollView>
            <TouchableWithoutFeedback onPress={this.props.editingDirectly !== undefined ? this.saveManifest : this.nextButtonAction}>
              <View style={[styles.buttonView, Platform.OS === "android" ? { marginBottom: 2 } : {}]}>
                <Text style={{ color: "#447CEC", padding: 5, fontWeight: "bold", fontSize: 18, marginLeft: 0, }}>{this.props.editingDirectly !== undefined ? "Save" : "Next"}</Text>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>

        </ImageBackground>




      </View>
    )
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : 0;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: "cover",

  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
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

  textInputContainer: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#2387f6',
    height: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ffffff',
    paddingHorizontal: 20,
    justifyContent: "center",
  },


  textInput: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: 'bold',
    width: "100%",
  },

  buttonView: {
    height: 55, width: "80%", position: "absolute",
    // right: "2%",
    bottom: 15,

    borderRadius: 30,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,


  }
});