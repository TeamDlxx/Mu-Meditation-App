import React, { Component } from 'react';


import TryPremium from '../assets/icons/tryPremium.png'

import { Navigation } from 'react-native-navigation';
import SearchIcon from '../assets/icons/search-icon.png';
import LockIcon from '../assets/icons/unlock.png';
import Marked from '../assets/icons/marked.png';


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

import BackIcon from "../assets/icons/old.png"



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


export default class GoalsListing extends Component {


    constructor() {
        super()
        this.state = {
            goalList: [],
            isAnimating: false,
            isDisabled: false
        }
    }


    back = () => {
        Navigation.pop(this.props.componentId)
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

                await this.setState({ goalList: responseData.goal })



                this.setState({ isAnimating: false, isDisabled: false })


                console.log("response from goals listing Api", responseData);




            })
            .catch((error) => {

                this.setState({ goalList: responseData.goal })

                console.log("error from init API", error);
            });

    }


    componentDidMount() {
        this.goalsListApi()
    }


    goalDetailScreen = (item) => {

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.GoalDetail',
                passProps: {
                    id: item._id,
                },
                options: {
                    bottomTabs: { visible: false, popGesture: false },
                }
            }
        })

    }



    render() {


        return (


            <SafeAreaView style={styles.container}>


                <View style={[styles.container]}>

                    <TouchableOpacity onPress={this.back} style={{ flexDirection: "row", alignItems: "center", paddingLeft: 15, marginTop: 20 }}>
                        <Image source={BackIcon} style={{ height: 16, width: 16, resizeMode: "contain" }} />
                        <Text style={{ fontSize: 22, fontWeight: "900", fontFamily: "Gotham-Black", alignItems: "center", }}> Archived Goals</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 20, flex: 1 }}>

                        {this.state.goalList.length != 0 ?

                            <FlatList
                                ref={(ref) => { this.flatListRef = ref; }}
                                data={this.state.goalList}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (

                                    <View>

                                        {item.status == true &&

                                            <TouchableWithoutFeedback onPress={() => { this.goalDetailScreen(item) }}>
                                                <View style={[styles.shadow, { backgroundColor: "white", padding: 12, marginBottom: 10, borderRadius: 10, minHeight: 90, marginHorizontal: 15, flexDirection: "row", alignItems: "center", marginTop: index == 0 ? 10 : 0 }]}>
                                                    <View style={{ alignItems: "center", height: 50, width: 50, borderRadius: 25, justifyContent: "center", backgroundColor: "#f2f2f2" }}>
                                                        <Image source={GoalIcon} style={{ height: 28, width: 28, resizeMode: "contain" }} />
                                                    </View>
                                                    <View style={{ marginLeft: 10, flex: 1 }}>
                                                        <View >
                                                            <Text style={{ fontSize: 16, fontFamily: "Gotham-Bold", alignItems: "center", }}>{item.title}</Text>
                                                            <Text style={{ fontSize: 12, fontFamily: "Gotham-Light", marginTop: 5, marginRight: 7 }}>{item.goal_statement}</Text>
                                                        </View>
                                                    </View>
                                                    <Image source={Marked} style={{ height: 20, width: 20, resizeMode: "contain", }} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                            

                                        }

                                    </View>



                                )}
                            />

                            :
                            <View style={{ marginTop: "50%", alignItems: "center", justifyContent: "center" }}>
                                <Text>No record found!</Text>
                            </View>



                        }

                    </View>


                    {this.state.isAnimating &&
                        <ActivityIndicator size="large" color="#a1863e" animating={this.state.isAnimating} style={styles.loading} />
                    }


                </View>


            </SafeAreaView>


        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 15
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

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

})