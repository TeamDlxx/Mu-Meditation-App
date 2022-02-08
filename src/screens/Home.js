import React, { Component } from 'react';


import TryPremium from '../assets/icons/tryPremium.png'

import { Navigation } from 'react-native-navigation';
import SearchIcon from '../assets/icons/search-icon.png';
import LockIcon from '../assets/icons/unlock.png';
import hearticon from '../assets/icons/blueheart.png';


import Swipeout from 'react-native-swipeout';
import Background from "../assets/icons/background.jpg";
import AddButton from "../assets/icons/add_button.png";

import Archive from "../assets/icons/archive.png";


import AddMore from '../assets/icons/AddMore.png'
import Filter from '../assets/icons/filter.png'
import Arrow_right from '../assets/icons/arrow_right.png'

import Happy_day from '../assets/icons/happy_day.png'
import extra_happy_day from '../assets/icons/extra_happy_day.png'
import sad_day from '../assets/icons/sad_day.png'
import bad_day from '../assets/icons/bad_day.png'
import normal_day from '../assets/icons/normal_day.png'


import Not_morning from "../assets/icons/not_morning.png";
import Yes_evening from "../assets/icons/yes_evening.png";
import Not_evening from "../assets/icons/not_evening.png";
import Yes_morning from "../assets/icons/yes_morning.png";
import Both_yes from "../assets/icons/both_yes.png";

import moment from "moment"

import Flower from '../assets/icons/download.jpeg'



import SplashScreen from 'react-native-splash-screen';
import RNIap, { purchaseErrorListener, purchaseUpdatedListener } from 'react-native-iap';
import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from "rn-fetch-blob";
import { domain, app_id } from '../components/utilities'
import firebase from "react-native-firebase";
import startMainTabs from "../screens/StartMainTabs";


import GoalIcon from "../assets/icons/goal.png";



import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Image,
    Platform,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ActivityIndicator,
    ImageBackground

} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


export default class Home extends Component {
    constructor() {
        super()

        this.state = {

            startDateForApi: "",
            endDateForApi: "",
            modalVisible: false,
            currentSelectedFilter: "",
            filterChoosedByUser: "",
            filterDateChoosedByUser: "",
            currentSelectedMonth: "",
            journalItems: [],
            APIhit: false,
            showMonthsList: false,
            todaysManifestation: "",
            morningManifestAdded: false,
            eveningManifestAdded: false,
            isGoalAdded: false,
            goalStatement: "",
            numberOfDays: "",
            goal: "",
            featuredAudio: ""

        }

    }





    async componentWillMount() {


        await AsyncStorage.setItem("FirstTimeUser", JSON.stringify("NotFirstTime"));


         await this.goalsListApi()
         await this.menifestListApi()
         await this.initApi()



        console.log(DeviceInfo.getUniqueId(), "get unique is")
        SplashScreen.hide()


        // await AsyncStorage.setItem("FirstTimeUser", JSON.stringify("NotFirstTime"));

        // let goalStatus = JSON.parse(await AsyncStorage.getItem('GoalAdded'));
        // let goal = JSON.parse(await AsyncStorage.getItem('Goal'));



        // console.log(goal, "goal is thisssssss")

        // if (goalStatus != "" && goalStatus != null && goalStatus != undefined) {
        //     await this.setState({ isGoalAdded: true })
        // }


        // if (goal !== "" && goal !== undefined && goal !== null) {
        //     this.setState({ goal: goal })

        //     let today = moment(new Date()).format("YYYY-MM-DD")
        //     var a = moment(today);
        //     var b = moment(goal.createdAt);
        //     await this.setState({ numberOfDays: b.diff(a, 'days') })


        //     console.log(this.state.numberOfDays, "kjdshdshg1hgfsffsfdfsfdfsfdfsf")
        // }


        await this.setState({
            endDateForApi: moment(new Date()).format("YYYY-MM-DD"),
            startDateForApi: moment(new Date()).format("YYYY-MM-DD")
        })

      
    }



    menifestAction = () => {

        Navigation.push(this.props.componentId, {
          component: {
            name: 'poisedAthleteMeditation.MenifestDetailScreen',
            passProps: {
              manifest: this.state.todaysManifestation,
              refresh: this.menifestListApi
            },
            options: {
              bottomTabs: { visible: true },
            }
          }
        });
    
      }


    goalsListApi = async () => {

        const url = domain + "/api/goal/" + DeviceInfo.getUniqueId();
        this.setState({ isAnimating: true, isDisabled: true })

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.text())
            .then(async (responseText) => {

                let responseData = JSON.parse(responseText);

                let goal = ""

                console.log(responseData , "hsgdghsdgsgdsghds")

                await this.setState({ goalList: responseData.goal })

                for (let i = 0; i< this.state.goalList.length; i++) {

                    console.log(this.state.goalList[i], "responseData.goal[i]")

                    if (this.state.goalList[i].status == false) {

                        await AsyncStorage.setItem("Goal", JSON.stringify(this.state.goalList[i]));
                        await AsyncStorage.setItem("GoalAdded", JSON.stringify(true));

                        goal = this.state.goalList[i]


                    }
                }





    

        console.log(goal, "goal is thisssssss")

        if (goal != "") {
            await this.setState({ isGoalAdded: true })
        }


        if (goal !== "") {
            this.setState({ goal: goal })

            let today = moment(new Date()).format("YYYY-MM-DD")
            var a = moment(today);
            var b = moment(goal.goal_target_date);

            await this.setState({ numberOfDays: b.diff(a, 'days') })


            console.log(this.state.numberOfDays, "kjdshdshg1hgfsffsfdfsfdfsfdfsf")
        }


                this.setState({ isAnimating: false, isDisabled: false })

                console.log("response from goals listing Api", responseData);


            })
            .catch((error) => {

                this.setState({ isAnimating:false, isDisabled:false })

                console.log("error from goals listing API", error);
            });

    }





    refreshGoal = async (type) => {
        console.log("refresh goal called...")


        if (type == "delete") {
            await this.setState({ isGoalAdded: false });
        }
        else {

            await this.setState({ isGoalAdded: true });
            let goal = JSON.parse(await AsyncStorage.getItem('Goal'));

            console.log(goal, "goal from asynckkkkkk")
            this.setState({ goal: goal });
        }


    }



    addGoalScreen = () => {

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.GoalEdit',
                passProps: {
                    refreshGoal: this.refreshGoal,
                },
                options: {
                    bottomTabs: { visible: false, popGesture: false },
                }
            }
        })

    }



    goalsListingScreen = () => {

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.GoalsListing',
                passProps: {
                },
                options: {
                    bottomTabs: { visible: false, popGesture: false },
                }
            }
        })

    }


    goalDetailScreen = async () => {

        let goal = JSON.parse(await AsyncStorage.getItem('Goal'));

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.GoalEdit',
                passProps: {
                    goal: goal,
                    refreshGoal: this.refreshGoal,
                },

                options: {
                    bottomTabs: { visible: false, popGesture: false },
                }
            }
        });

    }




    playTrackFunction = () => {


        let track = {
            "background_music": true,
            "imgUrl": this.state.featuredAudio.featured_image_url,
            "lock": false,
            "name": this.state.featuredAudio.title,
            "playlist": [{ "name": "Featured Audio" }],
            "songDuration": this.state.featuredAudio.featured_audio_file_duration,
            "songUrl": this.state.featuredAudio.featured_audio_file_url,
            "status": this.state.featuredAudio.status,
        }

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.playScreen',
                passProps: {
                    track: track,
                    tracksArray: [],
                    refresh: this.refresh
                },
                options: {
                    bottomTabs: { visible: false },
                    popGesture: false
                }

            }
        });
    }




    addFunction = () => {

        console.log(this.state.isGoalAdded, "goal statusus")
        if (this.state.isGoalAdded == true) {

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
        else {


            this.addGoalScreen()
        }


    }

    refresh = () => {

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



    initApi = () => {

        console.log("init call hua")
        const url = domain + "/api/init/" + app_id;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.text())
            .then(async (responseText) => {


                console.log(responseText , "respspspspspsps")

                let responseData = JSON.parse(responseText);

                console.log("response from init Api", responseData);


                if (responseData.success === true) {
                    await AsyncStorage.setItem("InitResponse", JSON.stringify(responseData));
                    console.log(responseData, "response from init Api json");

                    this.setState({ featuredAudio: responseData.featured_audio[0] })
                }
            })
            .catch((error) => {
                console.log("error from init APImmm", error);
            });
    }







    menifestListApi = async () => {


        await this.setState({
            endDateForApi: moment(new Date()).format("YYYY-MM-DD"),
            startDateForApi: moment(new Date()).format("YYYY-MM-DD")
        })


        console.log(this.state.startDateForApi, this.state.endDateForApi, "start and end dates")
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


                    await this.setState({ APIhit: true, todaysManifestation: responseData.list_manifest[0] });

                    if (this.state.todaysManifestation.manifest_morning.length != 0) {
                        await this.setState({ morningManifestAdded: true })


                        console.log(this.state.todaysManifestation.manifest_morning[0].manifest_intention_action, "this.state.todaysManifestation.manifest_morning.manifest_intention_action")
                        await AsyncStorage.setItem("intentionActionsMorning", JSON.stringify(this.state.todaysManifestation.manifest_morning[0].manifest_intention_action));

                    }


                    if (this.state.todaysManifestation.manifest_evening.length != 0) {
                        this.setState({ eveningManifestAdded: true })
                    }

                }


            })
            .catch((error) => {
                this.setState({ APIhit: true })
                console.log("error from menifest list api", error);
            });

    }




    AddmorningManifestFunction = async () => {

        let manifest = {
            "manifest_date": moment(this.state.todaysManifestation.manifest_date).format("YYYY-MM-DD"),
            "manifest_type": "morning",
            "device_unique_id": DeviceInfo.getUniqueId(),
            "manifest_burning_desire": "",
            "manifest_intention_action": [],
            "feel_action": [],
            "manifest_user_personality": []
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

    AddeveningManifestFunction = async () => {

        let manifest = {
            "manifest_date": moment(this.state.todaysManifestation.manifest_date).format("YYYY-MM-DD"),
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
                    menifestArray: manifest,
                    // connected:this.state.isInternetConnected
                },
                options: {
                    bottomTabs: { visible: true },
                }

            }

        });

    }






    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>


                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 24, fontWeight: "900", fontFamily: "Gotham-Black", alignItems: "center", }}>Mu Meditation</Text>
                            <View style={{ flex: 1 }}></View>
                            <TouchableOpacity onPress={this.goalsListingScreen}>
                                <Image source={Archive} style={{ height: 19, width: 19, resizeMode: "contain",tintColor:'#a1863e' }} />
                            </TouchableOpacity>
                        </View>


                        {this.state.isGoalAdded ?

                            <TouchableWithoutFeedback onPress={this.goalDetailScreen}>
                                <View style={[styles.shadow, { backgroundColor: "white", paddingHorizontal: 20,paddingVertical:30, marginTop: 20, borderRadius: 10, minHeight: 80, justifyContent: "center" }]}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Image source={GoalIcon} style={{ height: 28, width: 28, resizeMode: "contain",tintColor:'#a1863e' }} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontFamily: "Gotham-Bold", alignItems: "center", }}>{this.state.goal.title}</Text>
                                            <Text style={{ fontSize: 12, fontFamily: "Gotham-Light", marginTop: 5 }}>{this.state.goal.goal_statement}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 5, backgroundColor: "#f2f2f2", width: "100%", marginTop: 25 }}>
                                        <View style={{ height: 4, backgroundColor: "#a1863e", width: "40%" }}></View>
                                    </View>
                                    <Text style={{ textAlign: "right", fontSize: 11, fontStyle: "italic", marginTop: 4 }}>{this.state.goal.number_of_days} days left</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            :

                            <TouchableWithoutFeedback onPress={this.addGoalScreen}>
                                <View style={[styles.shadow, { backgroundColor: "white", paddingHorizontal: 20,paddingVertical:30, marginTop: 20, borderRadius: 10, minHeight: 80, justifyContent: "center" }]}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Image source={GoalIcon} style={{ height: 28, width: 28, resizeMode: "contain",tintColor:'#a1863e' }} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontFamily: "Gotham-Bold", alignItems: "center", }}>Current Goal</Text>
                                            <Text style={{ fontSize: 12, fontFamily: "Gotham-Light", marginTop: 5, }}>You have not set your goal yet, Tap to add now.</Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: "#a1863e", alignItems: "center", justifyContent: "center", borderRadius: 5, height: 35, marginTop: 25 }}>
                                        <Text style={{ color: "white", fontWeight: "500" }}>+ Add goal</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                        }


                        {/* <Text style={{ fontSize: 18, fontFamily: "Gotham-Bold", alignItems: "center", marginTop: 20 }}>Today's Manifest</Text> */}





                        


                     









                        {(this.state.featuredAudio !== "" && this.state.featuredAudio !== undefined && this.state.featuredAudio !== null) &&


                            <View style={[styles.shadow, { backgroundColor: "white", paddingHorizontal: 20,paddingVertical:20, marginTop: 20, borderRadius: 10, minHeight: 80, justifyContent: "center" }]}>


                                <Text style={{ fontSize: 18, fontFamily: "Gotham-Bold", alignItems: "center", marginTop: 10 }}>Featured Audio</Text>

                                <TouchableOpacity onPress={() => { this.playTrackFunction() }} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                                    <View style={{
                                        shadowColor: 'gray',
                                        shadowOffset: { width: 0, height: 9 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 2,
                                        elevation: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 85
                                    }}>

                                        <Image source={{ uri: domain + this.state.featuredAudio.featured_image_url }} style={{ height: 57, width: 67, borderRadius: 12 }} />

                                    </View>


                                    <View style={{ height: 85, alignItems: "center", flex: 1, marginLeft: 12, flexDirection: "row" }}>
                                        <View style={{ flexDirection: "column", }}>
                                            <Text style={{ fontFamily: 'Gotham-Bold', fontSize: 14 }} >{this.state.featuredAudio.title}</Text>
                                            <Text style={{ marginTop: 4, color: "#CFD3DA", fontWeight: "bold", fontSize: 15 }}>{this.state.featuredAudio.featured_audio_file_duration}</Text>
                                        </View>
                                    </View>


                                </TouchableOpacity>

                            </View>

                        }




                    </View>

                </ScrollView>
            </SafeAreaView>

        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 30
    },

    shadow: {
        shadowColor: "black",

        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.46,
        elevation: 9,
    },


    journalItems: {
        flexDirection: "column", padding: 20, borderRadius: 10, marginTop: 10, marginBottom: 20, backgroundColor: '#FFF',

        shadowColor: "black",

        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.46,
        elevation: 9,

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



})