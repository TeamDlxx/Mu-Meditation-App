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
  View, ImageBackground,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback, Keyboard,
  ActivityIndicator,
  Platform,
  Alert,
  Dimensions,
  FlatList,
  BackHandler,
} from 'react-native';

import { Navigation } from 'react-native-navigation';

import LeftArrow from '../assets/icons/back_arrow_white.png'
import bg from '../assets/icons/background.jpg'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from "@react-native-community/async-storage"
import DeviceInfo from 'react-native-device-info'



import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen'
import { domain } from '../components/utilities';

let burning_desire_placeholder = ""

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


class BurningDesireScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      morning_selected: "",
      menifestArray: "",
      place_holder: "Please enter your burning desire here..."
    }
  }

  componentWillMount = async () => {

    burning_desire_placeholder = JSON.parse(await AsyncStorage.getItem('burning_desire'));

    console.log(this.props.menifestArray, "burning desire placeholder is")

    if (burning_desire_placeholder !== "" && burning_desire_placeholder !== null && burning_desire_placeholder !== undefined && this.props.menifestArray.manifest_burning_desire === "") {
      this.setState({ userInput: burning_desire_placeholder });
    }

    else if (this.props.menifestArray.manifest_burning_desire !== "") {
      this.setState({ userInput: this.props.menifestArray.manifest_burning_desire });
    }

    console.log(this.props.menifestArray, "new feel action array now is this")
    this.setState({ menifestArray: this.props.menifestArray, })
    let morningSelected = JSON.parse(await AsyncStorage.getItem('MorningSelected'));
    this.setState({ morning_selected: morningSelected })

  }





  saveManifest = async () => {

    console.log(this.props.menifestArray.feel_action[0]._id, "skuytyteyscasvdgasytdy");

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
    console.log(JSON.stringify(this.state.menifestArray), "menifest array is now this")

    if (this.state.userInput == "") {
      alert("Please enter your burning desire");
      return
    }

    await AsyncStorage.setItem("burning_desire", JSON.stringify(this.state.userInput));
    this.state.menifestArray.manifest_burning_desire = this.state.userInput;
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





  nextFunction = async () => {

    if (this.state.userInput == "") {

      alert("Please enter your burning desire");
      return

    }

    await AsyncStorage.setItem("burning_desire", JSON.stringify(this.state.userInput));



    this.state.menifestArray.manifest_burning_desire = this.state.userInput;

    console.log(this.state.menifestArray, "menifest array")

    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.AddNewActionScreen',
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

  BackFunction = async () => {

    Navigation.pop(this.props.componentId);

  }


  updateInputVal = (val, prop) => {

    const state = this.state;
    state[prop] = val;
    this.setState(state);


  }


  render() {
    return (
      <ImageBackground source={bg} style={styles.mainContainer}>


        <MyStatusBar backgroundColor="#63C5FC" barStyle="dark-content" />


        {/* screenn scrollView  start */}


        {/* back  b */}


        <View style={{ flexDirection: 'row', height: 50, paddingLeft: 12, paddingTop: 0 }}>

          <TouchableWithoutFeedback onPress={this.BackFunction}  >
            <View style={{ flex: 0.2, flexDirection: "row", alignItems: "center" }}>
              <Image source={LeftArrow} style={{ height: 16, width: 10 }} />
              {/* <Text style={styles.headingTxt}>Upgrade</Text> */}
            </View>
          </TouchableWithoutFeedback>


          <View style={{ flex: 1, flexDirection: 'row' }}></View>
          <View style={{ flex: 0.3, flexDirection: 'row' }}></View>

        </View>



        {/* <ScrollView keyboardShouldPersistTaps="handled"> */}

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          // contentContainerStyle={styles.container}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <View style={{}}>
            <View style={{ flexDirection: "column", height: 60, paddingLeft: 20, marginTop: 40 }}>

              <Text style={{ fontSize: 20, color: "#FFFF", fontFamily: 'Gotham-Light' }}>What is your </Text>
              <Text style={[{ fontSize: 25, fontWeight: 'bold', color: "#FFFF" }, styles.font]} >Buring Desire?</Text>


            </View>
            <View style={{ width: "100%", height: 400, flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>

              {console.log(this.state.userInput, "usre input is this")}
              <View style={styles.card}>
                <TextInput

                  onFocus={()=>{this.setState({place_holder:""})}}
                  onBlur={()=>{this.setState({place_holder:"Please enter your burning desire here..."})}}
                  multiline={true}
                  autoCapitalize="none"
                  placeholder={this.state.place_holder}
                  placeholderTextColor={'#D8D6D8'}
                  value={this.state.userInput}
                  onChangeText={(val) => this.updateInputVal(val, 'userInput')}
                  // onChangeText={(text) => {this.setState({userFeedback: text})}} 

                  style={{
                    fontSize: 25,
                    width: "100%",

                    textAlign: "center",

                    color: '#FFF',
                    marginTop: 10,
                  }}

                  underlineColorAndroid='transparent' />

              </View>
              <View style={{ position: "absolute", paddingLeft: 15, backgroundColor: '#5BB0F5', paddingRight: 15, height: 30, top: "5%", textAlign: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 15, color: "#FFFF", textAlign: "center" }}>Repeat to yourself</Text>
              </View>


              {/* <TouchableWithoutFeedback onPress={() => { }} >
                <View style={{ position: "absolute", backgroundColor: "#FFF", padding: 10, bottom: 20, width: "17%", borderRadius: 15, right: "25%", }}>
                  <Text style={{ fontSize: 12, color: "#4984ED", textAlign: "center", fontWeight: '600' }} >Edit</Text>
                </View>
              </TouchableWithoutFeedback> */}

            </View>






            <TouchableWithoutFeedback onPress={this.props.editingDirectly !== undefined ? this.saveManifest : this.nextFunction}>

              <View style={styles.buttonView}>

                <Text style={{ color: "#3877EC", padding: 5, fontWeight: "bold", fontSize: 18, }}>{this.props.editingDirectly !== undefined ? "Save" : "Next"}</Text>
              </View>

            </TouchableWithoutFeedback>




          </View>

        </KeyboardAwareScrollView>

        {/* </ScrollView> */}
        {/* screenn scrollView  end */}




      </ImageBackground>
      // screen main view end


    );
  }
};
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : 0;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 0 : 56;


const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  mainContainer: {
    flex: 1,

    // marginBottom:Platform.OS === 'ios' ? 0 : 60
  },
  scrollView: {
    // height:"100%",width:"100%" 
  },
  card: {
    position: "relative", width: "70%", flexDirection: "column", justifyContent: "space-between", padding: 10, height: 330,
    borderRadius: 20, borderColor: "#FFF", borderWidth: 1,

  },
  font: {
    fontFamily: "Gotham-Black"
  },

  buttonView: {
    height: 55, width: "80%", marginTop:10, 
    // right: "2%",
    // bottom:  Platform.OS === 'ios' ? 50 : 5,
    // bottom:0,
  
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
    alignSelf:"center"


  }

});

export default BurningDesireScreen;
