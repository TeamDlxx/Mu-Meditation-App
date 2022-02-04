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
  FlatList,
  Image,
  Text,
  alert,
  Alert,
  StatusBar, requireNativeComponent, Platform, TouchableWithoutFeedback, TouchableOpacity

} from 'react-native';
import { Navigation } from 'react-native-navigation';

import moment from "moment"


// import hearticon from '../assets/icons/blueheart.png';

import LeftArrow from '../assets/icons/LeftArrow.png'

import evening_unselected from '../assets/icons/evening_unselected.png'
import evening_selected from '../assets/icons/evening_selected.png'
import morning_selected from '../assets/icons/morning_selected.png'
import morning_unselected from '../assets/icons/morning_unselected.png'

import AsyncStorage from "@react-native-community/async-storage"


import DeviceInfo from 'react-native-device-info';
import { domain } from '../components/utilities';

import DatePicker from 'react-native-datepicker'

export default class ManifestScreen extends Component {

  constructor() {
    //   super(props);
    super();
    this.state = {
      morning_selected: true,
      evening_selected: false,
      menifestArray: "",
      alertMessage: "",
      isMorningManifestAdded: false,
      isEveningManifestAdded: false,
      manifestDate: moment(new Date()).format("YYYY-MM-DD"),
      morning_manifest: "",
      evening_manifest: "",
      manifest: ""

    }


  }





  BackFunction = async () => {

    Navigation.pop(this.props.componentId);

  }

  editMenifestation = async (morningOrEvening) => {



    if (morningOrEvening === "morning") {

      await AsyncStorage.setItem("ManifestEditing", JSON.stringify(true));

      let manifest = {
        "manifest_date": this.state.manifest.manifest_date,
        "manifest_type": "morning",
        "device_unique_id": DeviceInfo.getUniqueId(),
        "manifest_burning_desire": this.state.morning_manifest[0].manifest_burning_desire,
        "manifest_intention_action": this.state.morning_manifest[0].manifest_intention_action,
        "feel_action": this.state.morning_manifest[0].feel_action,
        "manifest_user_personality": this.state.morning_manifest[0].manifest_user_personality
      }

      Navigation.push(this.props.componentId, {
        component: {
          name: 'poisedAthleteMeditation.BurningDesireScreen',
          passProps: {
            menifestArray: manifest,
            // connected:this.state.isInternetConnected
          },
          options: {
            bottomTabs: { visible: true },
          }
        }
      });


    }

    else {

      await AsyncStorage.setItem("ManifestEditing", JSON.stringify(true));

      console.log(this.state.evening_manifest[0], "this.state.evening_manifest[0].manifest_intention_action")


      let manifest = {
        "manifest_date": this.state.manifest.manifest_date,
        "manifest_type": "evening",
        "device_unique_id": DeviceInfo.getUniqueId(),
        "grateful_thing": this.state.evening_manifest[0].grateful_thing,
        "universe_action": this.state.evening_manifest[0].universe_action,
        // "burning_desire": this.state.evening_manifest[0].burning_desire,
        "manifest_mood": this.state.evening_manifest[0].manifest_mood,
        "manifest_intention_action": this.state.morning_manifest[0].manifest_intention_action

      }

      Navigation.push(this.props.componentId, {
        component: {
          name: 'poisedAthleteMeditation.TickCompletedActions',
          passProps: {
            menifestArray: manifest,
            // connected:this.state.isInternetConnected
          },
          options: {
            bottomTabs: { visible: true },
          }
        }
      });
    }

  }



  checkManifestStatusApi = async (manifest_type) => {

    const url = domain + "/api/manifest/manifest_verification/";

    let device_token = await DeviceInfo.getUniqueId()

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-sh-auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcxYmJiYmMxNzdjZDIxNTgxYzg2YTIiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTYwMTI4OTcxNH0.qdlEFgv2Q6V0GGopBp4VZobhfu95ajGSVDSKfXH0A1I"
      },
      body: JSON.stringify({
        "device_unique_id": device_token,
        "manifest_date": this.state.manifestDate,
        "manifest_type": manifest_type
      })

    }).then((response) => response.text())
      .then(async (responseText) => {

        console.log("response from save menifest Api", responseText);
        let responseData = JSON.parse(responseText);


        console.log(responseData, "response from morningngngnng")

        if (responseData.success == true && manifest_type == "morning") {

          await this.setState({ isMorningManifestAdded: true, morning_manifest: responseData.manifest.manifest_morning, manifest: responseData.manifest })

        }
        // else {
        //  await this.setState({ isMorningManifestAdded: false })
        // }

        if (responseData.success === true && manifest_type === "evening") {

          await this.setState({ isEveningManifestAdded: true, evening_manifest: responseData.manifest.manifest_evening, manifest: responseData.manifest })

        }

        // else {
        //  await this.setState({ isEveningManifestAdded: false })
        // }

        console.log(this.state.isMorningManifestAdded, "response from save menifest Api");

      })
      .catch((error) => {
        console.log("error from device_tokens API", error);
      });
  }



  morningFunction = async () => {

    this.setState({ morning_selected: true, evening_selected: false });

    this.checkManifestStatusApi("morning")

    this.state.menifestArray = {
      "manifest_date": this.state.manifestDate,
      "manifest_type": "morning",
      "device_unique_id": DeviceInfo.getUniqueId(),
      "manifest_burning_desire": "",
      "manifest_intention_action": [],
      "feel_action": [],
      "manifest_user_personality": []
    }



    console.log(this.state.menifestArray, "menifestArray in morning function")
  }



  eveningFunction = async () => {

    await this.checkManifestStatusApi("evening");

    await this.setState({ evening_selected: true, morning_selected: false });




    this.state.menifestArray = {
      "manifest_date": this.state.manifestDate,
      "manifest_type": "evening",
      "device_unique_id": DeviceInfo.getUniqueId(),
      "grateful_thing": [],
      "universe_action": [],
      // "burning_desire": [],
      "manifest_mood": ""
    }

  }







  letsGoFunction = () => {


    console.log(this.state.menifestArray, "menifest array checking date");




    if (this.state.morning_selected === true) {
      console.log(this.state.isMorningManifestAdded, "is morning manifest added")

      if (this.state.isMorningManifestAdded === true) {


        Alert.alert(
          "Alert",
          "The manifest is already added it will overwrite the current manifestation for that day",
          [

            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "Ok", onPress: () => {

                this.editMenifestation("morning");

              }
            }
          ],

          { cancelable: false }

        );


      }
      else {


        this.state.menifestArray = {
          "manifest_date": this.state.manifestDate,
          "manifest_type": "morning",
          "device_unique_id": DeviceInfo.getUniqueId(),
          "manifest_burning_desire": "",
          "manifest_intention_action": [],
          "feel_action": [],
          "manifest_user_personality": []
        }

        console.log("else part", this.state.menifestArray)


        Navigation.push(this.props.componentId, {

          component: {
            name: 'poisedAthleteMeditation.BurningDesireScreen',
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
    }


    else {

      if (this.state.isEveningManifestAdded === true) {

        Alert.alert(
          "Alert",
          "The manifest is already added so it will overwrite the current manifestation for that day",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },

            {
              text: "Ok", onPress: () => {
                this.editMenifestation("evening");
              }
            }
          ],
          { cancelable: false }
        );

      }





      else {


        console.log(this.state.isMorningManifestAdded, 'lskdkskdsldklskdkslkd')
        if (this.state.isMorningManifestAdded == false) {
          Alert.alert("Please add morning manifestation first then add evening.");
          return
        }


        this.state.menifestArray = {
          "manifest_date": this.state.manifestDate,
          "manifest_type": "evening",
          "device_unique_id": DeviceInfo.getUniqueId(),
          "grateful_thing": [],
          "universe_action": [],
          // "burning_desire": [],
          "manifest_mood": "",
          "manifest_intention_action": []
        }


        Navigation.push(this.props.componentId, {
          component: {
            name: 'poisedAthleteMeditation.TickCompletedActions',
            passProps: {
              menifestArray: this.state.menifestArray,
            },
            options: {
              bottomTabs: { visible: true },
            }

          }

        });
      }


    }

  }



  addFunction = () => {

    Alert.alert("Under Development");

  }


  async componentDidMount() {

    this.morningFunction();
    await AsyncStorage.setItem("MorningSelected", JSON.stringify(true));

  }

  render() {
    return (
      // screen main view start
      <View style={styles.mainContainer}>

        <View style={{ flexDirection: 'row', height: 50 }}>

          <TouchableWithoutFeedback onPress={this.BackFunction}  >
            <View style={{ flex: 0.2, flexDirection: "row", alignItems: "center" }}>
              <Image source={LeftArrow} style={{ height: 16, width: 10 }} />
            </View>
          </TouchableWithoutFeedback>

          <View style={{ flex: 1, flexDirection: 'row' }}></View>
          <View style={{ flex: 0.3, flexDirection: 'row' }}></View>

        </View>



        {/* screenn scrollView  start */}
        <ScrollView style={styles.scrollView}>

          <View>
            <Text style={[{ fontSize: 24, fontWeight: '900', color: "#000", marginTop: 40 }, styles.font]} >Ready to Manifest?</Text>
          </View>

          {/* <Text style={{ fontSize: 20, color: "#A1A3AE" }}>{moment(this.state.manifestDate).format("ddd MMM YYYY")}</Text> */}
          <View style={{ marginTop: 20 }}>
            <View style={[{ marginTop: 10, flexDirection: 'row', height: 50, borderRadius: 10, backgroundColor: '#F7F9FC' }, styles.shade2]}>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <DatePicker
                  style={{ width: '100%', }}
                  date={this.state.manifestDate}
                  mode="datetime"
                  // display="spinner"
                  placeholder="Select date"
                  // format="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  // minDate="2016-05-01"
                  // maxDate="2016-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 40,
                      borderRadius: 10,
                      borderColor: '#F7F9FC',
                      alignItems: 'flex-start',
                      fontSize: 20,
                      color: "#A1A3AE"
                    },
                    datePicker: {
                      // backgroundColor: '#d1d3d8',
                      backgroundColor: '#d1d3d8',
                      justifyContent: 'center',

                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={async (date) => {
                    console.log(date);
                    await this.setState({ manifestDate: date })

                    if (this.state.morning_selected) {
                      this.checkManifestStatusApi("morning")
                    }
                    else {
                      this.checkManifestStatusApi("evening")

                    }

                  }}
                />
              </View>
            </View>
          </View>


          <View style={{ height: 300, marginTop: 30, flexDirection: "row", backgroundColor: '#FFF' }}>

            <TouchableWithoutFeedback onPress={this.morningFunction}>
              <View style={{ flex: 1, marginRight: 10, borderRadius: 15 }}>

                {this.state.morning_selected == true &&
                  <Image source={morning_selected} resizeMode='contain' style={{ width: "100%", height: "100%" }} />
                }

                {this.state.morning_selected == false &&
                  <Image source={morning_unselected} resizeMode='contain' style={{ width: "100%", height: "100%" }} />
                }

              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.eveningFunction}>
              <View style={{ flex: 1, borderRadius: 15 }}>

                {this.state.evening_selected == true &&
                  <Image source={evening_selected} resizeMode='contain' style={{ width: "100%", height: "100%" }} />
                }

                {this.state.evening_selected == false &&
                  <Image source={evening_unselected} resizeMode='contain' style={{ width: "100%", height: "100%" }} />
                }

              </View>
            </TouchableWithoutFeedback>






          </View>


          <TouchableWithoutFeedback onPress={this.letsGoFunction}>
            <View style={styles.buttonView}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, }}>Let's Go</Text>
            </View>
          </TouchableWithoutFeedback>




        </ScrollView>







      </View>



    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {

    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,

    marginBottom: Platform.OS === 'ios' ? 0 : 60,
    backgroundColor: '#FFF'
  },
  scrollView: {
    // height:"100%",width:"100%" 
  },
  font: {
    fontFamily: "Gotham-Black"
  },

  journalItems: {
    flexDirection: "column", borderRadius: 20, marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10, backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,




  },
  shade: {
    shadowColor: "#A8CAFA",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.28,
    shadowRadius: 12.00,

    elevation: 12,

  },
  shade2: {
    shadowColor: "silver",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.28,
    shadowRadius: 12.00,

    elevation: 3,

  },
  font: {
    fontFamily: "Gotham-Black"
  },
  headingTxt: {
    fontSize: 24,
    fontWeight: "900",
    fontFamily: "Gotham-Black",
    paddingLeft: 20

  },
  buttonView: {
    height: 55,
    width: "80%",
    marginTop: 20,
    // right: "2%",
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 30,
    backgroundColor: "#4C7FED",
    alignItems: "center",
    justifyContent: 'center',

    shadowColor: "#7EA4F1",

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,

  }

});


