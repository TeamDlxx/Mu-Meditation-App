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
  StatusBar, requireNativeComponent, Platform, TouchableWithoutFeedback, ImageBackground, TouchableOpacity, TextInput

} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Leaves from "../assets/icons/leaves.png";

import AsyncStorage from "@react-native-community/async-storage"

// import hearticon from '../assets/icons/blueheart.png';


import RightArrow from "../assets/icons/right_arrow.png";
import LeftArrow from "../assets/icons/left_arrow.png"

import DeviceInfo from "react-native-device-info"

import AddMore from '../assets/icons/AddMore.png'
import Filter from '../assets/icons/filter.png'
import Arrow_right from '../assets/icons/arrow_right.png'

import Happy_day from '../assets/icons/happy_day.png'
import extra_happy_day from '../assets/icons/extra_happy_day.png'
import sad_day from '../assets/icons/sad_day.png'
import bad_day from '../assets/icons/bad_day.png'
import normal_day from '../assets/icons/normal_day.png'

import Powerful from '../assets/icons/powerful.png'
import Determined from '../assets/icons/determined.png'
import Energetic from '../assets/icons/energetic.png'
import smart from '../assets/icons/smart.png'
import productive from '../assets/icons/productive.png'
import Background from "../assets/icons/background.jpg";

import Cross from "../assets/icons/close.png";

import Modal from "react-native-modal";
import moment from 'moment';

import { domain } from '../components/utilities';



import Not_morning from "../assets/icons/not_morning.png";
import Yes_evening from "../assets/icons/yes_evening.png";
import Not_evening from "../assets/icons/not_evening.png";
import Yes_morning from "../assets/icons/yes_morning.png";
import Both_yes from "../assets/icons/both_yes.png";
import { crashlytics } from 'react-native-firebase';



export default class JournalScreen extends Component {
  constructor() {
    //   super(props);
    super();
    this.state = {

      monthsArray: [

        { "date": "1 January " + new Date().getFullYear() },
        { "date": "1 February " + new Date().getFullYear() },
        { "date": "1 March " + new Date().getFullYear() },
        { "date": "1 April " + new Date().getFullYear() },
        { "date": "1 May " + new Date().getFullYear() },
        { "date": "1 June " + new Date().getFullYear() },
        { "date": "1 July " + new Date().getFullYear() },
        { "date": "1 August " + new Date().getFullYear() },
        { "date": "1 September " + new Date().getFullYear() },
        { "date": "1 October " + new Date().getFullYear() },
        { "date": "1 November " + new Date().getFullYear() },
        { "date": "1 December " + new Date().getFullYear() }

      ],

      startDateForApi: "",
      endDateForApi: "",
      modalVisible: false,
      currentSelectedFilter: "",
      filterChoosedByUser: "",
      filterDateChoosedByUser: "",
      currentSelectedMonth: "",
      journalItems: [],
      APIhit: false,
      showMonthsList : false
    }
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  motivation = (item) => {


    console.log(item, " + item.burning_desire_icon")
    return (
      <FlatList
        style={{ marginTop: 10 }}
        ref="listRef"
        data={item}
        renderItem={({ item, index }) => (

          <View style={{ width: "35%", padding: 3, flexDirection: "row", }}>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ backgroundColor: "#4F8AEF", padding: 5, borderRadius: 14.5, height: 25, width: 25, alignItems: "center", justifyContent: "center", marginRight: 3, }}>
                <Image source={item.server_item === true ? { uri: domain + item.burning_desire_icon } : Leaves} resizeMode='contain' style={{ width: 15, height: 15, borderRadius: 50, }} />
              </View>
              <Text style={{ fontSize: 12, color: "#969DAF", fontWeight: '300', paddingLeft: 4 }}>{item.burning_desire_title}</Text>
            </View>

          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />

    )
  }


  feelActions = (item) => {


    return (
      <FlatList
        style={{ marginTop: 10 }}
        ref="listRef"
        data={item}
        renderItem={({ item, index }) => (

          <View style={{ width: "35%", padding: 3, flexDirection: "row", }}>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ backgroundColor: "#4F8AEF", padding: 5, borderRadius: 14.5, height: 25, width: 25, alignItems: "center", justifyContent: "center", marginRight: 3, }}>
                <Image source={item.server_item === true ? { uri: domain + item.feel_action_icon } : Leaves} resizeMode='contain' style={{ width: 15, height: 15, borderRadius: 50, }} />
              </View>
              <Text style={{ fontSize: 12, color: "#969DAF", fontWeight: '300', paddingLeft: 4 }}>{item.feel_action_title}</Text>
            </View>

          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />

    )
  }



  burnigDesire = (item) => {

    { console.log(item, "burning desire array") }
    return (
      <FlatList
        style={{ marginTop: 10 }}
        ref="listRef"
        data={item}
        renderItem={({ item, index }) => (

          <View style={{ width: "35%", padding: 3, flexDirection: "row", }}>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ backgroundColor: "#4F8AEF", borderRadius: 14.5, height: 25, width: 25, alignItems: "center", justifyContent: "center", marginRight: 3, }}>
                <Image source={item.server_item === true ? { uri: domain + item.burning_desire_icon } : Leaves} resizeMode='contain' style={{ width: 15, height: 15, borderRadius: 50, }} />

              </View>
              <Text style={{ fontSize: 12, color: "#969DAF", fontWeight: '300', paddingLeft: 4 }}>{item.burning_desire_title}</Text>
            </View>

          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />

    )
  }



  filterFunction = () => {
    this.toggleModal()
  }


  menifestAction = (item) => {

    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.MenifestDetailScreen',
        passProps: {
          manifest: item,
          refresh: this.menifestListApi
        },
        options: {
          bottomTabs: { visible: true },
        }
      }
    });

  }




  addFunction = () => {

    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.ManifestScreen',
        passProps: {

          // playList: item,
          // connected:this.state.isInternetConnected

        },
        options: {
          bottomTabs: { visible: true },
        }
      }
    });

  }


  async componentDidMount() {

   await this.setState({ filterChoosedByUser: "7days", currentSelectedFilter: "Last 7 days", filterDateChoosedByUser: moment(new Date()).subtract(1, 'w').format("DD-MM-YYYY") });
   await this.setState({ filterChoosedByUser: "7days", currentSelectedFilter: "Last 7 days", filterDateChoosedByUser: moment(new Date()).subtract(1, 'w').format("DD-MM-YYYY") });
   
    await this.setState({
      endDateForApi: moment(new Date()).format("YYYY-MM-DD"),
      startDateForApi: moment(new Date()).subtract(1, 'w').format("YYYY-MM-DD")
    })

    this.menifestListApi()


  }


  menifestListApi = () => {



    console.log(this.state.startDateForApi, this.state.endDateForApi , "start and end dates")

    const url = domain + "/api/manifest/list";



    fetch(url, {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-sh-auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcxYmJiYmMxNzdjZDIxNTgxYzg2YTIiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTYwMTI4OTcxNH0.qdlEFgv2Q6V0GGopBp4VZobhfu95ajGSVDSKfXH0A1I"
      },
      body: JSON.stringify({
        "device_unique_id": DeviceInfo.getUniqueId(),
        "start_date": this.state.startDateForApi,
        "end_date": this.state.endDateForApi
      })
    }).then((response) => response.text())
      .then(async (responseText) => {

        let responseData = JSON.parse(responseText);
        console.log(responseData, "resposne from menifest list api");

        if (responseData.success === false) {
          this.setState({ APIhit: true, journalItems: [] });
        }

        else {


          this.setState({ APIhit: true, journalItems: responseData.list_manifest });

        }


      })
      .catch((error) => {
        this.setState({ APIhit: true })
        console.log("error from menifest list api", error);
      });

  }



  lastSevenDaysAction = async () => {

    this.setState({ filterChoosedByUser: "7days", currentSelectedFilter: "Last 7 days", filterDateChoosedByUser: moment(new Date()).subtract(1, 'w').format("DD-MM-YYYY") });

    await this.setState({
      endDateForApi: moment(new Date()).format("YYYY-MM-DD"),
      startDateForApi: moment(new Date()).subtract(1, 'w').format("YYYY-MM-DD")
    })

    this.toggleModal();
    this.menifestListApi()

  }


  lastThirtyDaysAction = async () => {

    this.setState({ filterChoosedByUser: "30days", currentSelectedFilter: "Last 30 days", filterDateChoosedByUser: moment(new Date()).subtract(30, 'days').format("DD-MM-YYYY") });
    await this.setState({
      endDateForApi: moment(new Date()).format("YYYY-MM-DD"),
      startDateForApi: moment(new Date()).subtract(30, 'days').format("YYYY-MM-DD")
    })

    this.toggleModal();
    this.menifestListApi()

  }


  filterByMonthActino = async () => {


    await this.setState({ showMonthsList : true});

  }


  monthNameClickHandler = async (date) => {

    await this.setState({ currentSelectedMonth: date, filterChoosedByUser: "month", currentSelectedFilter: moment(date).format("MMMM yyyy") });
    const output = moment(date).format("MMMM");

    var a = '1-' + output + '-' + new Date().getFullYear();
    var date = new Date(a);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(firstDay);
    console.log(lastDay);


    await this.setState({ startDateForApi: moment(firstDay).format("YYYY-MM-DD"), endDateForApi: moment(lastDay).format("YYYY-MM-DD"), showMonthsList:false })


    this.toggleModal();
    this.menifestListApi()

  }




  nextFunction = async () => {

    if (this.state.currentSelectedFilter !== "December " + new Date().getFullYear()) {

      let newMonth = moment(this.state.currentSelectedMonth).add(1, "month");

      const output = moment(newMonth).format("MMMM");
      var a = '1-' + output + '-' + new Date().getFullYear();
      var date = new Date(a);
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      console.log(firstDay);
      console.log(lastDay);

      await this.setState({ currentSelectedFilter: moment(newMonth._d).format("MMMM yyyy"), currentSelectedMonth: newMonth, startDateForApi: moment(firstDay).format("YYYY-MM-DD"), endDateForApi: moment(lastDay).format("YYYY-MM-DD") });
      this.menifestListApi();

    }


  }


  previousFunction = async () => {

    if (this.state.currentSelectedFilter !== "January " + new Date().getFullYear()) {

      let newMonth = moment(this.state.currentSelectedMonth).subtract(1, "month");
      const output = moment(newMonth).format("MMMM");
      var a = '1-' + output + '-' + new Date().getFullYear();
      var date = new Date(a);
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      console.log(firstDay);
      console.log(lastDay);

      await this.setState({ currentSelectedFilter: moment(newMonth._d).format("MMMM yyyy"), currentSelectedMonth: newMonth, startDateForApi: moment(firstDay).format("YYYY-MM-DD"), endDateForApi: moment(lastDay).format("YYYY-MM-DD") });
      this.menifestListApi()

    }



  }





  render() {
    return (
      // screen main view start
      <View style={styles.mainContainer}>



        {this.state.modalVisible &&

          <Modal isVisible={this.state.modalVisible} >

            <View style={{ flex: 1, flexDirection: 'column', marginBottom: 100, justifyContent: 'center', alignItems: 'center', overflow: "hidden" }}>

              <ImageBackground source={Background} style={{ backgroundColor: "white", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", borderRadius: 15, overflow: "hidden", }}>

                {/* cross icon */}
                <TouchableOpacity onPress={this.toggleModal} style={{ width: "100%", alignItems: "flex-end", padding: 10 }}>
                  <Image source={Cross} style={{ height: 23, width: 23, }} />
                </TouchableOpacity>
                {/* cross icon */}

                <Text style={{ color: "white", fontWeight: "700", fontSize: 25.5, marginTop: 15 }}>Apply Filter</Text>
                <Text style={{ color: "white", fontSize: 13, fontWeight: "500", marginTop: 10, textAlign: "center" }}>Get your customized data!</Text>

                <View style={{ padding: 10, width: "100%" }}>


                  <View style={{ marginTop: 15, marginBottom: 5, width: "100%", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>

                    <TouchableOpacity onPress={this.lastSevenDaysAction} style={{ backgroundColor: "white", height: 45, width: "70%", borderRadius: 10, alignItems: "center", justifyContent: "center" }} >
                      <Text style={{ fontWeight: "700", color: "white", color: "#3679EC", fontSize: 15 }}>Last 7 Days</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.lastThirtyDaysAction} style={{ backgroundColor: "white", height: 45, width: "70%", borderRadius: 10, alignItems: "center", justifyContent: "center", marginTop: 15 }} >
                      <Text style={{ fontWeight: "700", color: "white", color: "#3679EC", fontSize: 15 }}>Last 30 Days</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={this.filterByMonthActino} style={{ backgroundColor: "white", height: 45, width: "70%", borderRadius: 10, alignItems: "center", justifyContent: "center", marginTop: 15 }} >
                      <Text style={{ fontWeight: "700", color: "white", color: "#3679EC", fontSize: 15 }}>Filter By Month</Text>
                    </TouchableOpacity>

                  </View>


                  <View style={{ height: 50 }}>
                    {this.state.showMonthsList === true &&
                      <FlatList
                        data={this.state.monthsArray}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity onPress={() => { this.monthNameClickHandler(item.date) }} style={{ padding: 7, backgroundColor: "#4E88EE", borderRadius: 5, margin: 2, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>{moment(item.date).format("MMMM")}</Text>
                          </TouchableOpacity>
                        )}
                      />

                    }
                  </View>



                </View>

              </ImageBackground>

              {this.state.isAnimating &&
                <ActivityIndicator size="large" color="#FFBD2F" animating={this.state.isAnimating} style={styles.loading} />
              }
            </View>

          </Modal>
        }




        <View style={{ flexDirection: "column", justifyContent: "space-between", marginLeft: 20, marginRight: 20, }}>

          <View style={{ paddingTop: 20, }}>

            <Text style={[{ fontSize: 24, fontWeight: '900', color: "#000", }, styles.font]}>Manifestation Journal</Text>



          </View>



          <View style={{ height: 60, flexDirection: "row", backgroundColor: "#FBFBFB", paddingLeft: 20, marginBottom: 10, marginTop: 20, borderRadius: 15, alignItems: 'center', justifyContent: "flex-end" }}>

            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>

              {/* <Text style={{ paddingLeft: 10, fontSize: 20, marginRight: 8, color: "#000" }}>May</Text> */}


              <Text style={{ fontSize: 16, color: "#8C93A7", fontWeight: 'bold', alignSelf: "flex-start" }}>{this.state.currentSelectedFilter}</Text>

            </View>
            <View style={{ flex: 1 }}></View>


            {this.state.filterChoosedByUser === "month" &&

              <View style={{ flexDirection: "row" }}>

                <TouchableOpacity onPress={this.previousFunction} style={{ marginRight: 10 }}>
                  <Image source={LeftArrow} style={{ height: 15, width: 15, resizeMode: "contain", alignSelf: "flex-end" }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={this.nextFunction} style={{ marginRight: 10 }}>
                  <Image source={RightArrow} style={{ height: 15, width: 15, resizeMode: "contain", alignSelf: "flex-end" }} />
                </TouchableOpacity>

              </View>

            }



            <TouchableWithoutFeedback onPress={this.filterFunction}>
              <View style={{ height: 70, justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
                <Image source={Filter} resizeMode='contain' style={{ width: 20, height: 20, alignSelf: "flex-end", }} />
              </View>
            </TouchableWithoutFeedback>

          </View>
        </View>



        {/* screenn scrollView  start */}
        <ScrollView style={styles.scrollView}>


          {console.log(this.state.journalItems, "journal items are")}

          {this.state.journalItems.length !== 0 ?

            <FlatList
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              data={this.state.journalItems}
              style={{ marginBottom: Platform.OS === 'ios' ? 140 : 100, marginTop: 0 }}
              renderItem={({ item, index }) => (

                <TouchableWithoutFeedback onPress={() => { this.menifestAction(item) }} >


                  <View>


                    {/* only evening */}
                    {(item.manifest_evening.length !== 0 && item.manifest_morning.length === 0) &&

                      <View style={styles.journalItems}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                          <View style={{ flexDirection: "row", }} >
                            <Text style={{ fontSize: 16, color: "#8C93A7", fontWeight: 'bold', }}>{moment(item.manifest_date).format("DD MMM, ")}</Text>
                            <Text style={{ fontSize: 16, color: "#A2A8B8", fontWeight: '300' }}>{moment(item.manifest_date).format("dddd")}</Text>
                          </View>

                          <View style={{ flex: 1 }}></View>

                          <View style={{ flexDirection: "row" }}>
                            <Image source={Yes_evening} resizeMode='contain' style={{ width: 32, height: 32, marginRight: 10 }} />
                            <Image source={Not_morning} resizeMode='contain' style={{ width: 32, height: 32, }} />
                          </View>


                        </View>


                        <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                          <View style={{}}>

                            {item.manifest_evening[0].manifest_mood === "Bad" &&
                              <Image source={bad_day} resizeMode='contain' style={{ width: 80, height: 80, }} />
                            }

                            {item.manifest_evening[0].manifest_mood === "Sad" &&
                              <Image source={sad_day} resizeMode='contain' style={{ width: 80, height: 80, }} />
                            }

                            {item.manifest_evening[0].manifest_mood === "Emotion Less" &&
                              <Image source={normal_day} resizeMode='contain' style={{ width: 80, height: 80, }} />
                            }

                            {item.manifest_evening[0].manifest_mood === "Happy" &&
                              <Image source={Happy_day} resizeMode='contain' style={{ width: 80, height: 80, }} />
                            }

                            {item.manifest_evening[0].manifest_mood === "Very Happy" &&
                              <Image source={extra_happy_day} resizeMode='contain' style={{ width: 80, height: 80, }} />
                            }

                          </View>


                          <View style={{ width: "70%", flexDirection: "column" }}>
                            <FlatList

                              listKey={(item, index) => 'D' + index.toString()}
                              data={item.manifest_evening[0].universe_action}
                              style={{ width: "100%" }}
                              showsVerticalScrollIndicator={false}
                              renderItem={({ item, index }) => (

                                <View style={{ borderRadius: 20, padding: 10, backgroundColor: "#F4F5F7", marginBottom: 10 }}>
                                  <Text style={{ fontSize: 15, color: "#363636", fontWeight: '300' }}>{item.universe_action_title}</Text>
                                </View>

                              )}
                            />
                          </View>
                        </View>




                        <View style={{}}>
                          {this.burnigDesire(item.manifest_evening[0].burning_desire)}
                        </View>

                      </View>

                    }








                    {/* both morning and evening */}
                    {(item.manifest_evening.length !== 0 && item.manifest_morning.length !== 0) &&

                      <View style={styles.journalItems}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                          <View style={{ flexDirection: "row", }} >
                            <Text style={{ fontSize: 16, color: "#8C93A7", fontWeight: 'bold', }}>{moment(item.manifest_date).format("D MMM, ")}</Text>
                            <Text style={{ fontSize: 16, color: "#A2A8B8", fontWeight: '300' }}>{moment(item.manifest_date).format("dddd")}</Text>
                          </View>
                          <View style={{ flex: 1 }}></View>

                          <View style={{ flexDirection: "row" }}>
                            <Image source={Both_yes} resizeMode='contain' style={{ width: 32, height: 32, }} />
                          </View>
                        </View>


                        <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                          <View style={{}}>

                            {item.manifest_evening[0].manifest_mood === "Bad" &&
                              <Image source={bad_day} resizeMode='contain' style={{ width: 80, height: 80, }} />
                            }

                            {item.manifest_evening[0].manifest_mood === "Sad" &&
                              <Image source={sad_day} resizeMode='contain' style={{ width: 80, height: 80, }} />
                            }

                            {item.manifest_evening[0].manifest_mood === "Emotion Less" &&
                              <Image source={normal_day} resizeMode='contain' style={{ width: 80, height: 80, }} />
                            }

                            {item.manifest_evening[0].manifest_mood === "Happy" &&
                              <Image source={Happy_day} resizeMode='contain' style={{ width: 80, height: 80, }} />
                            }

                            {item.manifest_evening[0].manifest_mood === "Very Happy" &&
                              <Image source={extra_happy_day} resizeMode='contain' style={{ width: 80, height: 80, }} />
                            }

                          </View>

                          <View style={{ width: "70%", flexDirection: "column" }}>

                            <FlatList

                              listKey={(item, index) => 'D' + index.toString()}
                              data={item.manifest_morning[0].manifest_intention_action}
                              style={{ width: "100%" }}
                              showsVerticalScrollIndicator={false}
                              renderItem={({ item, index }) => (

                                <View style={{ borderRadius: 20, padding: 10, backgroundColor: "#F4F5F7", marginBottom: 10 }}>
                                  <Text style={{ fontSize: 15, color: "#363636", fontWeight: '300' }}>{item.intention_title}</Text>
                                </View>

                              )}
                            />
                          </View>

                        </View>

                        <View style={{}}>
                          {this.motivation(item.manifest_evening[0].burning_desire)}
                        </View>

                      </View>

                    }



                    {/*morning only*/}

                    {(item.manifest_evening.length === 0 && item.manifest_morning.length !== 0) &&

                      <View style={styles.journalItems}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                          <View style={{ flexDirection: "row", }} >
                            <Text style={{ fontSize: 16, color: "#8C93A7", fontWeight: 'bold', }}>{moment(item.manifest_date).format("D MMM, ")}</Text>
                            <Text style={{ fontSize: 16, color: "#A2A8B8", fontWeight: '300' }}>{moment(item.manifest_date).format("dddd")}</Text>
                          </View>
                          <View style={{ flex: 1 }}></View>

                          <View style={{ flexDirection: "row" }}>
                            <Image source={Yes_morning} resizeMode='contain' style={{ width: 32, height: 32, marginRight: 10 }} />
                            <Image source={Not_evening} resizeMode='contain' style={{ width: 32, height: 32, }} />
                          </View>
                        </View>


                        <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>


                          <View style={{ width: "100%", flexDirection: "column" }}>

                            <FlatList

                              listKey={(item, index) => 'D' + index.toString()}
                              data={item.manifest_morning[0].manifest_intention_action}
                              style={{ width: "100%" }}
                              showsVerticalScrollIndicator={false}
                              renderItem={({ item, index }) => (

                                <View style={{ borderRadius: 20, padding: 10, backgroundColor: "#F4F5F7", marginBottom: 10 }}>
                                  <Text style={{ fontSize: 15, color: "#363636", fontWeight: '300' }}>{item.intention_title}</Text>
                                </View>

                              )}
                            />

                          </View>
                        </View>

                        <View style={{}}>
                          {this.feelActions(item.manifest_morning[0].feel_action)}
                        </View>

                      </View>

                    }




                  </View>

                </TouchableWithoutFeedback>


              )}

            />

            :

            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              {this.state.APIhit &&
                <Text style={{ color: "gray", textAlign: "center", marginTop: "50%" }}>You have not added and manifest yet!</Text>
              }
            </View>
          }










        </ScrollView>
        {/* screenn scrollView  end */}
        {/* add more icon with absolute possition start */}

        <TouchableWithoutFeedback onPress={this.addFunction}>

          <View style={styles.addMore}>
            <Image source={AddMore} resizeMode='cover' style={{ height: "100%", width: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5, position: "absolute" }} />
          </View>
          {/* add more icon with absolute possition end */}
        </TouchableWithoutFeedback>

      </View>

      // screen main view end

    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    // height:"100%",width:"100%",
    flex: 1,

    marginBottom: Platform.OS === 'ios' ? 0 : 60,
    backgroundColor: '#FFF'
  },
  scrollView: {
    // height:"100%",width:"100%" 
    flex: 1
  },
  font: {
    fontFamily: "Gotham-Black"
  },
  journalItems: {
    flexDirection: "column", padding: 20, borderRadius: 20, marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10, backgroundColor: '#FFF',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,

    //     shadowColor: "#000",
    // shadowOffset: {
    // 	width: 0,
    // 	height: 11,
    // },
    // shadowOpacity: 0.57,
    // shadowRadius: 15.19,

    // elevation: 23,



  },
  addMore: {
    height: 100, width: 100, position: "absolute",
    right: "2%",
    bottom: Platform.OS === 'ios' ? 30 : 5,
    borderRadius: 45,
    // backgroundColor:"#35AFD7",

    // shadowColor: "#35AFD7",
    // shadowOffset: {
    //   width: 0,
    //   height: 9,
    // },
    // shadowOpacity: 0.48,
    // shadowRadius: 11.95,

    // elevation: 18,

  }

});


