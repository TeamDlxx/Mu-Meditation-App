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
    AsyncStorage,
    Platform,
    TextInput,
    Alert,
    ActivityIndicator,
    Keyboard
} from 'react-native';


import SplashScreen from "react-native-splash-screen"

import Swiper from 'react-native-web-swiper';
import startTabs from './StartMainTabs';

import DateTimePickerModal from "react-native-modal-datetime-picker";


import Background from "../assets/icons/background.jpg";

import DeviceInfo from 'react-native-device-info';
import moment from "moment"
import Swipe1 from "../assets/swipe2.png"
import Swipe2 from "../assets/swipe2.png"
import Swipe3 from "../assets/swipe3.png"
var i = 0;


import Logo from "../assets/icons/swiper2.png"

import Up from "../assets/icons/swiper3.png"



const itemSkus = Platform.select({
    ios: [
        'com.apprebel.audiolifts.lifetime'
    ],
    android: [
        'com.apprebel.audiolifts.lifetime'
    ]
});


const itemSkus2 = Platform.select({
    ios: [
        "com.apprebel.audiolifts.subscription",
    ],
    android: [
        "com.apprebel.audiolifts.subscription",
    ]

});

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'






import { Navigation } from 'react-native-navigation';
import { domain } from '../components/utilities';

export default class Swipe extends Component {
    constructor() {
        super()
        this.state = {

            showPagination: true,
            swiperTextsArray: [
                { "heading": "Welcome to givit", "text": "Givit is your personal tool to access unlimited giveaways and also give otu gifts to your followers and subscribers." },
                { "heading": "Explore and follow giveits", "text": "Discover people, what they have been unto and follow users that might interest you" },
                { "heading": "Start or join giveaways", "text": "Start a giveaway or subscribe to an active giveaway. You get your rewards once you win" },
            ],
            swipeIndex: 0,
            UserToken: "",
            startDatePickerVisibility: false,
            endDatePickerVisibility: false,
            goalStartDate: "",
            goalEndDate: "",
            goalStatement: "",
            newIndex: 0,
            numberOfDays: "__",
            goalTitle: "",
            isAnimating: false,
            isDisabled: false

        }

        this.swiper = React.createRef();

    }





    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({ showPagination: false })
    }

    _keyboardDidHide = () => {
        this.setState({ showPagination: true })
    }



    letsGo = () => {
        startTabs()
    }

    showStartDatePicker = () => {

        this.setState({ startDatePickerVisibility: true })
    }

    showEndDatePicker = async () => {
        await this.setState({ endDatePickerVisibility: true })
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


        console.log(this.state.numberOfDays, "number of days")
        this.hideEndDatePicker()

    }





    hideStartDatePicker = () => {
        this.setState({ startDatePickerVisibility: false })
    }


    hideEndDatePicker = () => {
        this.setState({ endDatePickerVisibility: false })
    }




    async componentDidMount() {

        SplashScreen.hide()

    }



    onSwipe = (index) => {

        console.log(index, "index")
        this.setState({ swipeIndex: index })
    }


    nextButtonForDateSlide = async () => {


        if (this.state.goalEndDate != "" && this.state.goalStatement !== "" && this.state.goalTitle !== "") {
            console.log(this.state.numberOfDays, "number of days")
            this.addGoalStatementApi()
        }


        else {
            Alert.alert(
                "Alert",
                "Goal statement will not be added until you fill up all the fields above.",
                [
                    {
                        text: "Skip",
                        onPress: () => {
                            // this.swiper.current.goToNext()
                            this.letsGo()
                        },
                        style: "cancel"
                    },
                    { text: "Fill", onPress: () => console.log("OK Pressed") }
                ]
            );
        }

    }





    addGoalStatementApi = async () => {


        this.setState({ isAnimating: true, isDisabled: true })

        const url = domain + "/api/goal";
        let device_token = await DeviceInfo.getUniqueId();
        let params = {
            "goal_statement": this.state.goalStatement,
            "number_of_days": this.state.numberOfDays,
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


                    await AsyncStorage.setItem("Goal", JSON.stringify(responseData.goal));
                    await AsyncStorage.setItem("GoalAdded", JSON.stringify(true));
                    await AsyncStorage.setItem("burning_desire", JSON.stringify(this.state.goalStatement));


                    this.setState({ isAnimating: false, isDisabled: false })


                    this.swiper.current.goToNext()


                }

                else {
                    alert(responseData.error)
                    this.setState({ isAnimating: false, isDisabled: false })

                }

                console.log(responseData, "response from edit menifest Api.... ");

            })
            .catch((error) => {
                console.log("error from device_tokens API", error);
                this.setState({ isAnimating: false, isDisabled: false })

            });
    }


    nextButtonWelcomeSlide = () => {
        this.swiper.current.goToNext()

    }


    nextButtonEndSlide = () => {
        this.swiper.current.goToNext()
    }


    render() {
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} >

                <View style={styles.container} source={Background}>

                    {/* swiper starts */}


                    <View style={{ flex: 1 }}>
                        <Swiper
                            loop
                            controlsProps={{
                                prevTitle: '',
                                nextTitle: '',

                                DotComponent: ({ index, isActive, onPress, }) => {
                                    if (isActive) {
                                        return <View style={{ height: 8, width: 22, backgroundColor: "#a1863e", borderRadius: 7.5, margin: 13 }}></View>;
                                    }
                                    return <View style={{ height: 7, width: 7, backgroundColor: "#a1863e", borderRadius: 3.5, margin: 13 }}></View>;
                                }

                            }}
                            ref={this.swiper}

                        >
                            <View style={[styles.swiperimageContainer, { marginTop: "20%" }]}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Image source={Logo} style={{ height: 250, width: 250, resizeMode: "contain" }} />
                                </View>
                                <Text style={{ color: "Black", fontFamily: "Gotham-Black", fontSize: 21, textAlign: "left", marginHorizontal: 35, marginTop: 10 }}>Welcome to Mu !</Text>

                                <View style={{ paddingHorizontal: 40, marginTop: 15, marginBottom: 20 }}>

                                    {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ height: 8, width: 8, borderRadius: 5, backgroundColor: "black" }}></View>
                                        <Text style={{ color: "Black", fontFamily: "Gotham-Light", textAlign: "left", }}>  Clarify and set goals.</Text>
                                    </View> */}

                                    {/* <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                        <View style={{ height: 8, width: 8, borderRadius: 5, backgroundColor: "black" }}></View>
                                        <Text style={{ color: "Black", fontFamily: "Gotham-Light", textAlign: "left" }}>  Take actions towards your goals.</Text>
                                    </View> */}


                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                        <View style={{ height: 8, width: 8, borderRadius: 5, backgroundColor: "black" }}></View>
                                        <Text style={{ color: "black", fontFamily: "Gotham-Light", textAlign: "left" }}>  Foster a positive mindset.</Text>
                                    </View>



                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                        <View style={{ height: 8, width: 8, borderRadius: 5, backgroundColor: "black" }}></View>
                                        <Text style={{ color: "Black", fontFamily: "Gotham-Light", textAlign: "left" }}>  Promote gratitude and well-being.</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                        <View style={{ height: 8, width: 8, borderRadius: 5, backgroundColor: "black" }}></View>
                                        <Text style={{ color: "Black", fontFamily: "Gotham-Light", textAlign: "left" }}>  Increase peace of mind.</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                        <View style={{ height: 8, width: 8, borderRadius: 5, backgroundColor: "black" }}></View>
                                        <Text style={{ color: "Black", fontFamily: "Gotham-Light", textAlign: "left" }}>  Deepen connection to self and spirituality.</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                        <View style={{ height: 8, width: 8, borderRadius: 5, backgroundColor: "black" }}></View>
                                        <Text style={{ color: "Black", fontFamily: "Gotham-Light", textAlign: "left" }}>  Gain clarity of mind.</Text>
                                    </View>


                                    {/* <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                        <View style={{ height: 8, width: 8, borderRadius: 5, backgroundColor: "black" }}></View>
                                        <Text style={{ color: "black", fontFamily: "Gotham-Light", textAlign: "left" }}>  Enhance motivation.</Text>
                                    </View> */}

                                </View>

                                <TouchableOpacity onPress={this.nextButtonWelcomeSlide} style={{ backgroundColor: "#a1863e", width: 150, alignItems: "center", justifyContent: "center", height: 38, borderRadius: 5, alignSelf: "center", marginTop: 30 }}>
                                    <Text style={{ color: "white", fontFamily: "Gotham-Black" }}>Next</Text>
                                </TouchableOpacity>


                            </View>


                            <KeyboardAwareScrollView
                                resetScrollToCoords={{ x: 0, y: 0 }}
                                contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                                scrollEnabled={true}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                                enabled
                            >

                                <ScrollView>

                                    <View style={styles.swiperimageContainer}>

                                        {/* <Image source={Swipe2} style={styles.swiperImage} /> */}
                                        <View style={{ paddingHorizontal: 20 }}>
                                            <Text style={{ color: "Black", fontFamily: "Gotham-Black", fontSize: 21, textAlign: "center", marginTop: 20 }}>First let's clarify your vision</Text>
                                            <View style={[{ minHeight: 80, backgroundColor: "white", marginTop: 30, borderRadius: 6, padding: 20, }, styles.shadow]}>
                                                <Text style={{ color: "black", fontFamily: "Gotham-Black", fontSize: 17 }}>Goal title</Text>
                                                {/* <View style={{height:37, marginTop: 10,}}> */}
                                                <TextInput
                                                    style={{ height: 37, width: "100%", borderWidth: 0.5, borderColor: "#737373", borderRadius: 4, paddingLeft: 10, fontSize: 14, color: "white", marginTop: 5 }}
                                                    placeholder='I will loose 5 pounds'
                                                    placeholderTextColor="#737373"
                                                    onChangeText={(text) => { this.setState({ goalTitle: text }) }}
                                                />
                                                {/* </View> */}

                                            </View>



                                            <View style={[{ minHeight: 100, backgroundColor: "white", marginTop: 10, borderRadius: 6, padding: 20, marginTop: 20 }, styles.shadow]}>
                                                <Text style={{ color: "black", fontFamily: "Gotham-Black", fontSize: 17 }}>What would you like to manifest in the next {this.state.numberOfDays} days:</Text>

                                                <Text style={{ color: "black", fontFamily: "Gotham-Light", fontSize: 12, marginTop: 15, fontWeight: "500" }}>End date of goal:</Text>
                                                <TouchableOpacity onPress={this.showEndDatePicker}>

                                                    <TextInput
                                                        style={{ height: 37, width: "100%", borderWidth: 0.5, borderColor: "#737373", borderRadius: 4, marginTop: 5, paddingLeft: 10, fontSize: 11, color: "black" }}
                                                        placeholder="Choose date"
                                                        placeholderTextColor="#737373"
                                                        onTouchStart={this.showEndDatePicker}
                                                        editable={false}
                                                        value={this.state.goalEndDate}
                                                    />

                                                </TouchableOpacity>
                                            </View>



                                            <View style={[{ minHeight: 80, backgroundColor: "white", marginTop: 20, borderRadius: 6, padding: 20, }, styles.shadow]}>
                                                <Text style={{ color: "black", fontFamily: "Gotham-Black", fontSize: 17 }}>Write one goal you want the most</Text>
                                                <TextInput
                                                    style={{ height: 95, width: "100%", borderWidth: 0.5, borderColor: "#737373", borderRadius: 4, marginTop: 10, paddingLeft: 10, fontSize: 14, color: "black" }}
                                                    placeholder='ex: "I weigh__lbs"'
                                                    placeholderTextColor="#737373"
                                                    multiline={true}
                                                    onChangeText={(text) => { this.setState({ goalStatement: text }) }}
                                                />
                                                <Text style={{ color: "black", fontSize: 12, textAlign: "right", marginTop: 5, fontStyle: "italic" }}>Tip: Ensure it's specific and attainable!</Text>
                                            </View>

                                            <TouchableOpacity onPress={this.nextButtonForDateSlide} style={{ backgroundColor: "#a1863e", width: 150, alignItems: "center", justifyContent: "center", height: 38, borderRadius: 5, alignSelf: "center", marginTop: 20 }}>
                                                <Text style={{ color: "white", fontFamily: "Gotham-Black" }}>Next</Text>
                                            </TouchableOpacity>

                                        </View>





                                    </View>

                                </ScrollView>

                            </KeyboardAwareScrollView>





                            {/* <View style={[styles.swiperimageContainer, { marginTop: "20%" }]}>
                                <Image source={Swipe3} style={[styles.swiperImage]} />


                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Image source={Up} style={{ height: 250, width: 250, resizeMode: "contain" }} />
                                </View>

                                <Text style={{ color: "black", fontFamily: "Gotham-Black", fontSize: 21, textAlign: "center", marginTop: 10, marginHorizontal: 20 }}>Great ! Your __day manifetation starts now!</Text>

                                <Text style={{ color: "black", fontSize: 16, textAlign: "center", marginTop: 5, fontStyle: "italic", marginTop: 30 }}>"The journey of thousand miles begins with one step."</Text>
                                <Text style={{ color: "black", fontSize: 18, textAlign: "center", marginTop: 5, fontStyle: "italic", marginTop: 10, fontWeight: "bold" }}>" - Lao Tzu"</Text>
                                <Text style={{ color: "black", fontSize: 16, textAlign: "center", marginTop: 5, fontStyle: "italic", marginTop: 60 }}>Let's start by creating your first entry!</Text>

                                <TouchableOpacity onPress={() => { this.letsGo() }} style={{ backgroundColor: "#a1863e", width: 150, alignItems: "center", justifyContent: "center", height: 38, borderRadius: 5, alignSelf: "center", marginTop: 20 }}>
                                    <Text style={{ color: "white", fontFamily: "Gotham-Black" }}>Let's Go!</Text>
                                </TouchableOpacity>

                            </View> */}



                        </Swiper>



                        {this.state.isAnimating &&
                            <ActivityIndicator size="large" color="white" animating={this.state.isAnimating} style={styles.loading} />
                        }
                    </View>
                    {/* swiper ends */}







                </View>




                <DateTimePickerModal
                    isVisible={this.state.endDatePickerVisibility}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={this.endDateAction}
                    onCancel={this.hideEndDatePicker}
                />




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
        flex: 1,
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



    swiperImage: {
        height: 80,
        width: 80,
        resizeMode: "contain",
        borderRadius: 20,
        marginTop: 30
        // aspectRatio : 8/9
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