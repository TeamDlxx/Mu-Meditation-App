import React, { Component } from 'react';


import TryPremium from '../assets/icons/tryPremium.png'

import { Navigation } from 'react-native-navigation';
import SearchIcon from '../assets/icons/search-icon.png';
import LockIcon from '../assets/icons/unlock.png';
import hearticon from '../assets/icons/blueheart.png';


import Swipeout from 'react-native-swipeout';
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

import GoalImage from '../assets/icons/ggg.png'

import Background from "../assets/icons/background.jpg";


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

import BackIcon from "../assets/icons/old.png"


export default class GoalDetail extends Component {
    constructor() {
        super()
        this.state = {
            goal: ""
        }
    }


    back = () => {
        Navigation.pop(this.props.componentId)
    }


    componentDidMount() {
        this.goalDetailApi()
    }


    goalDetailApi = async () => {

        const url = domain + "/api/goal/detail/" + this.props.id;

        console.log(url, "url isisiisisisisi")

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.text())
            .then(async (responseText) => {

                let responseData = JSON.parse(responseText);

                console.log("response from goals detail Api", responseData);

                this.setState({ goal: responseData.goal })



            })
            .catch((error) => {
                console.log("error from init API", error);
            });

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    <TouchableOpacity onPress={this.back}>
                        <Image source={BackIcon} style={{ height: 17, width: 17, resizeMode: "contain" }} />
                    </TouchableOpacity>

                    <Image source={GoalImage} style={{ height: 250, width: 250, resizeMode: "contain", alignSelf: "center" }} />
                    <Text style={{ fontFamily: "Gotham-Bold", textAlign: "center", fontSize: 20 }}>{this.state.goal.title}</Text>
                    <Text style={{ fontFamily: "Gotham-Light", textAlign: "center", fontSize: 14, marginTop: 5 }}>completed in {this.state.goal.number_of_days} days</Text>


                    <ImageBackground imageStyle={{ borderRadius: 5 }} source={Background} style={[{ backgroundColor: "#528CEB", borderRadius: 5, marginTop: 20, padding: 15,minHeight:300 }, styles.shadow]}>
                        <ScrollView>
                            <Text style={{ color: "white", fontFamily: "Gotham-Bold", fontSize: 18, textAlign: "center" }}>Goal Description</Text>
                            <Text style={{ color: "white", fontFamily: "Gotham-Light", fontSize: 14, textAlign: "justify", marginTop: 10 }}>{this.state.goal.goal_statement}</Text>
                        </ScrollView>
                    </ImageBackground>


                </View>
            </SafeAreaView>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
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
})