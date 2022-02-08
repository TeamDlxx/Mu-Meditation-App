import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Platform,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';


import SplashScreen from "react-native-splash-screen"

import Swiper from 'react-native-swiper';
import startTabs from './StartMainTabs';

import DateTimePickerModal from "react-native-modal-datetime-picker";


import Background from "../assets/icons/background.jpg";

import DeleteIcon from "../assets/icons/delete.png";


import DeviceInfo from 'react-native-device-info';
import moment from "moment"
import Swipe1 from "../assets/swipe2.png"
import Swipe2 from "../assets/swipe2.png"
import Swipe3 from "../assets/swipe3.png"


import Logo from "../assets/icons/app_icon.png"
import BackIcon from "../assets/icons/back_arrow_white.png"

import AsyncStorage from '@react-native-community/async-storage';



import { Navigation } from 'react-native-navigation';
import { domain } from '../components/utilities';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class GoalDetail extends Component {
    constructor() {
        super()
        this.state = {

            startDatePickerVisibility: false,
            endDatePickerVisibility: false,

            goalStartDate: "",
            goalEndDate: "",
            goalStatement: "",
            goalTitle: "",
            newIndex: 0,
            numberOfDays: "__",
            goal: "",
            isAnimating: false,
            isDisabled: false

        }
    }


    async componentWillMount() {





        if (this.props.goal !== undefined && this.props.goal !== null && this.props.goal !== "") {



            // if ((moment(new Date()).format("YYYY-MM-DD") == moment(this.props.goal.goal_target_date).add(this.props.goal.number_of_days, 'days').format("YYYY-MM-DD")) || (moment(new Date()).format("YYYY-MM-DD") > moment(this.props.goal.goal_target_date).add(this.props.goal.number_of_days, 'days').format("YYYY-MM-DD"))) {

            //     alert("Your goal accomplishment date has been reached, you would might like to mark it complete or extend it's date.")

            // }



            await this.setState({
                goalTitle: this.props.goal.title,
                goalStatement: this.props.goal.goal_statement,
                goalEndDate: moment(this.props.goal.goal_target_date).add(this.props.goal.number_of_days, 'days').format("YYYY-MM-DD"),
                numberOfDays: this.props.goal.number_of_days
            })



            console.log(this.state.goalStatement, this.state.goalEndDate, "variables are this")
        }
    }




    showStartDatePicker = () => {
        this.setState({ startDatePickerVisibility: true })
    }

    showEndDatePicker = () => {
        this.setState({ endDatePickerVisibility: true })
    }



    startDateAction = async (date) => {

        await this.setState({ goalStartDate: moment(date).format("YYYY-MM-DD") })

        this.hideStartDatePicker()

    }

    endDateAction = async (date) => {

        await this.setState({ goalEndDate: moment(date).format("YYYY-MM-DD") })

        let today = moment(new Date()).format("YYYY-MM-DD")
        var a = moment(today);
        var b = moment(this.state.goalEndDate);
        await this.setState({ numberOfDays: b.diff(a, 'days') })


        this.hideEndDatePicker()

    }





    addGoalStatementApi = async () => {


       


        if (this.state.goalTitle == "") {
            alert("Please add goal title first.")
            return
        }



        this.setState({ isAnimating: true, isDisabled: true })

        const url = domain + "/api/goal";
        let device_token = await DeviceInfo.getUniqueId()

        let params = {
            "goal_statement": 'any goal statment added',
            "number_of_days": 1,
            "goal_target_date": moment(new Date()).format("YYYY-MM-DD"),
            "device_unique_id": device_token,
            "title": this.state.goalTitle
        }

        console.log(device_token, "device token is this")
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)

        }).then((response) => response.text())
            .then(async (responseText) => {

                console.log("response from edit menifest Apimxncmxnmxn", responseText);
                let responseData = JSON.parse(responseText);

                if (responseData.code === 200) {

                    await AsyncStorage.setItem("GoalAdded", JSON.stringify(true));
                    await AsyncStorage.setItem("Goal", JSON.stringify(responseData.goal));
                    await AsyncStorage.setItem("burning_desire", JSON.stringify(this.state.goalStatement));

                    await this.props.refreshGoal()
                    Navigation.pop(this.props.componentId)

                }

                else {
                    alert(responseData.error)
                    Navigation.pop(this.props.componentId)
                }

                this.setState({ isAnimating: false, isDisabled: false })

                console.log(responseData, "response from edit menifest Api.... ");

            })
            .catch((error) => {
                this.setState({ isAnimating: false, isDisabled: false })

                console.log("error from device_tokens API", error);
            });
    }




    editGoalApi = async () => {



        let device_token = await DeviceInfo.getUniqueId()


        if (this.state.goalEndDate == "") {
            alert("Please choose end date of goal accomplishment.")
            return
        }


        if (this.state.goalStatement == "") {
            alert("Please add goal statement.")
            return
        }


        this.setState({ isAnimating: true, isDisabled: true })

        const url = domain + "/api/goal/" + this.props.goal._id;

        let params = {
            "goal_statement": this.state.goalStatement,
            "number_of_days": this.state.numberOfDays,
            "goal_target_date": this.props.goal.goal_target_date,
            "device_unique_id": device_token,
            "title": this.state.goalTitle

        }

        console.log(device_token, "device token is this")
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)

        }).then((response) => response.text())
            .then(async (responseText) => {

                console.log("response from edit menifest Apimxncmxnmxn", responseText);
                let responseData = JSON.parse(responseText);

                if (responseData.code === 200) {


                    console.log(responseData.goal, "response isddddd")


                    await AsyncStorage.setItem("GoalAdded", JSON.stringify(true));
                    await AsyncStorage.setItem("Goal", JSON.stringify(responseData.goal));
                    await AsyncStorage.setItem("burning_desire", JSON.stringify(this.state.goalStatement));

                    await this.props.refreshGoal()

                    Navigation.pop(this.props.componentId)

                }

                else {
                    alert(responseData.error)
                    Navigation.pop(this.props.componentId)
                }
                this.setState({ isAnimating: false, isDisabled: false })


                console.log(responseData, "response from edit menifest Api.... ");

            })
            .catch((error) => {
                this.setState({ isAnimating: false, isDisabled: false })

                console.log("error from device_tokens API", error);
            });
    }








    hideStartDatePicker = () => {
        this.setState({ startDatePickerVisibility: false })
    }


    hideEndDatePicker = () => {
        this.setState({ endDatePickerVisibility: false })
    }


    back = () => {
        Navigation.pop(this.props.componentId)
    }


    deleteGoal = () => {
        Alert.alert(
            "Alert",
            "Are you sure you want to delete this goal?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.deleteGoalApi() } }
            ]
        );
    }


    deleteGoalApi = async () => {


        const url = domain + "/api/goal/" + this.props.goal._id;
        let device_token = await DeviceInfo.getUniqueId()
        this.setState({ isAnimating: true, isDisabled: true })


        console.log(device_token, "device token is this")
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(params)

        }).then((response) => response.text())
            .then(async (responseText) => {

                console.log("response from edit menifest Apimxncmxnmxn", responseText);
                let responseData = JSON.parse(responseText);

                if (responseData.code === 200) {



                    await AsyncStorage.setItem("GoalAdded", JSON.stringify(""));
                    await AsyncStorage.setItem("Goal", JSON.stringify(""));
                    await this.props.refreshGoal("delete")
                    Navigation.pop(this.props.componentId)

                }

                else {
                    alert(responseData.error)
                    Navigation.pop(this.props.componentId)
                }

                this.setState({ isAnimating: false, isDisabled: false })


                console.log(responseData, "response from edit menifest Api.... ");

            })
            .catch((error) => {

                this.setState({ isAnimating: false, isDisabled: false })

                console.log("error from device_tokens API", error);
            });


    }





    markComplete = async () => {

        const url = domain + "/api/goal/change_goal_status/" + this.props.goal._id;
        let device_token = await DeviceInfo.getUniqueId()

        console.log(device_token, "device token is this")
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "status": true })

        }).then((response) => response.text())
            .then(async (responseText) => {

                console.log("response from edit menifest Apimxncmxnmxn", responseText);
                let responseData = JSON.parse(responseText);

                if (responseData.code === 200) {
                    await AsyncStorage.setItem("GoalAdded", JSON.stringify(""));
                    await AsyncStorage.setItem("Goal", JSON.stringify(""));
                    await this.props.refreshGoal("delete")
                    Navigation.pop(this.props.componentId)
                }
                else {
                    alert(responseData.error)
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

            <SafeAreaView style={[styles.container, { backgroundColor: "white" }]} >

                <View style={styles.container} >

                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                        scrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        enabled
                    >

                        <ScrollView keyboardShouldPersistTaps={'handled'} style={{width:'100%'}}>

                            <View style={{ flex: 1 }}>

                                <View style={styles.swiperimageContainer}>

                                    <View style={{ paddingHorizontal: 20, }}>

                                        <TouchableOpacity activeOpacity={1} onPress={this.back} style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginLeft: -5 }}>
                                            <Image source={BackIcon} style={{ height: 17, width: 17, resizeMode: "contain",tintColor:'black' }} />
                                            <Text style={{ color: "black", fontFamily: "Gotham-Black", fontSize: 21, }}>  Let's clarify your vision</Text>

                                            <View style={{ flex: 1 }}></View>

                                            {(this.props.goal !== undefined && this.props.goal !== null && this.props.goal !== "") &&
                                                <TouchableOpacity onPress={this.deleteGoal}>
                                                    <Image source={DeleteIcon} style={{ height: 18, width: 18, resizeMode: "contain",tintColor:'black' }} />
                                                </TouchableOpacity>
                                            }

                                        </TouchableOpacity>



                                        <View style={[{ minHeight: 80, backgroundColor: "white", marginTop: 20, borderRadius: 6, padding: 20, }, styles.shadow]}>
                                            <Text style={{ color: "black", fontFamily: "Gotham-Black", fontSize: 14 }}>What do you want to embody today?</Text>
                                            <TextInput
                                                style={{ height: 37, width: "100%", borderWidth: 0.5, borderColor: "#737373", borderRadius: 4, marginTop: 10, paddingLeft: 10, fontSize: 14, color: "black" }}
                                                placeholder='I will loose 5 pounds'
                                                placeholderTextColor="#737373"
                                                value={this.state.goalTitle}
                                                onChangeText={(text) => { this.setState({ goalTitle: text }) }}
                                            />
                                        </View>


{/* 
                                        <View style={[{ minHeight: 100, backgroundColor: "white", marginTop: 10, borderRadius: 6, padding: 20, marginTop: 20 }, styles.shadow]}>
                                            <Text style={{ color: "black", fontFamily: "Gotham-Black", fontSize: 14 }}>What would you like to manifest in the next {this.state.numberOfDays} days:</Text>
                                            {/* <Text style={{ color: "white", fontFamily: "Gotham-Light", fontSize: 12, marginTop: 10, fontWeight: "500" }}>End date of goal:</Text> 
                                            <TouchableOpacity onPress={this.showEndDatePicker}>
                                                <TextInput
                                                    style={{ height: 37, width: "100%", borderWidth: 0.5, borderColor: "#737373", borderRadius: 4, marginTop: 10, paddingLeft: 10, fontSize: 11, color: "black" }}
                                                    placeholder="Choose End date for goal"
                                                    placeholderTextColor="#737373"
                                                    onTouchStart={this.showEndDatePicker}
                                                    editable={false}
                                                    value={this.state.goalEndDate}
                                                />

                                            </TouchableOpacity>
                                        </View>



                                        <View style={[{ minHeight: 80, backgroundColor: "white", marginTop: 20, borderRadius: 6, padding: 20, }, styles.shadow]}>
                                            <Text style={{ color: "black", fontFamily: "Gotham-Black", fontSize: 14 }}>Write one goal you want the most</Text>
                                            <TextInput
                                                style={{ height: 95, width: "100%", borderWidth: 0.5, borderColor: "#737373", borderRadius: 4, marginTop: 10, paddingLeft: 10, fontSize: 14, color: "black" }}
                                                placeholder='ex: "I weigh__lbs"'
                                                value={this.state.goalStatement}
                                                placeholderTextColor="#737373"
                                                multiline={true}
                                                onChangeText={(text) => { this.setState({ goalStatement: text }) }}
                                            />
                                            <Text style={{ color: "black", fontSize: 12, textAlign: "right", marginTop: 5, fontStyle: "italic" }}>Tip: Ensure it's specific and attainable!</Text>
                                        </View> */}



                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                            <TouchableOpacity onPress={this.props.goal !== undefined ? this.editGoalApi : this.addGoalStatementApi} style={{ backgroundColor: "#a1863e", width: 150, alignItems: "center", justifyContent: "center", height: 38, borderRadius: 5, alignSelf: "center", marginTop: 30, marginRight: 3 }}>
                                                <Text style={{ color: "white", fontFamily: "Gotham-Black" }}>Save</Text>
                                            </TouchableOpacity>

                                            {(this.props.goal !== undefined && this.props.goal !== null && this.props.goal !== "") &&
                                            
                                                <TouchableOpacity onPress={this.markComplete} style={{ backgroundColor: "#a1863e", width: 150, alignItems: "center", justifyContent: "center", height: 38, borderRadius: 5, alignSelf: "center", marginTop: 30, marginLeft: 3 }}>
                                                    <Text style={{ color: "white", fontFamily: "Gotham-Black" }}>Mark Complete</Text>
                                                </TouchableOpacity>
                                            }

                                        </View>



                                    </View>


                                    <DateTimePickerModal
                                        isVisible={this.state.startDatePickerVisibility}
                                        mode="date"
                                        onConfirm={this.startDateAction}
                                        onCancel={this.hideStartDatePicker}
                                    />

                                    <DateTimePickerModal
                                        isVisible={this.state.endDatePickerVisibility}
                                        mode="date"
                                        onConfirm={this.endDateAction}
                                        onCancel={this.hideEndDatePicker}
                                    />

                                </View>


                                {this.state.isAnimating &&
                                    <ActivityIndicator size="large" color="white" animating={this.state.isAnimating} style={styles.loading} />
                                }
                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>

        )
    }
}


const styles = StyleSheet.create({


    container: {
        flex: 1,
        // paddingHorizontal: 20
    },
    swiperimageContainer: {
        // alignItems: "center",
        justifyContent: "flex-start",
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