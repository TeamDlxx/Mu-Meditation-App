
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
    ActivityIndicator,
    StatusBar, requireNativeComponent, Platform, TouchableWithoutFeedback, TouchableOpacity, ImageBackground

} from 'react-native';
import { Navigation } from 'react-native-navigation';
import BackIcon from "../assets/icons/old.png";

import AddButton from "../assets/icons/add_button.png";

import Leaves from "../assets/icons/leaves.png";

import startMainTabs from './StartMainTabs';

import ArrowUp from "../assets/icons/arrow_up.png";
import MenuIcon from "../assets/icons/menu_black.png";

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import DeviceInfo from "react-native-device-info";

import Birds from "../assets/icons/birds.png";
import Fire from "../assets/icons/fire.png";

import ExtraHappy from "../assets/icons/extra_happy_day.png";

import ThreeDots from "../assets/icons/menu.png"
import { domain } from '../components/utilities';

import Happy_day from '../assets/icons/happy_day.png'
import extra_happy_day from '../assets/icons/extra_happy_day.png'
import sad_day from '../assets/icons/sad_day.png'
import bad_day from '../assets/icons/bad_day.png'
import normal_day from '../assets/icons/normal_day.png'

import AsyncStorage from "@react-native-community/async-storage"

import Background from "../assets/icons/background.jpg";
import moment from "moment"

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);



export default class JournalScreen extends Component {

    _menu = null;

    constructor() {
        super();
        this.state = {
            date: "",
            isMorningSelected: true,
            isEveningSeleceted: false,
            manifest: "",
            morning_manifest: [],
            evening_manifest: [],
            manifest_mood_icon: "",
            isMorningManifestEmpty: false,
            isEveningManifestEmpty: false,
            isAnimating: true,
            isDisabled: true,
        }
    }


    deleteManifestation = async (manifestType) => {

        Alert.alert(
            "Alert",
            "Are you sure you want to delete this manifest?",
            [

                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {



                        if (manifestType === "morning") {
                            if (this.state.morning_manifest.length === 0) {
                                Alert.alert("There is no manifest to delete")
                                return
                            }
                        }


                        console.log(this.state.morning_manifest.length, manifestType, "type and array both")

                        if (manifestType === "evening") {
                            if (this.state.evening_manifest.length === 0) {
                                Alert.alert("There is no manifest to delete")
                                return
                            }
                        }
                        this.hitDeleteManifestApi(manifestType);
                        console.log("OK Pressed")




                    }
                }
            ],
            { cancelable: false }
        );



    }


    manifestDetailApi = async () => {


        await this.props.refresh();


        const url = domain + "/api/manifest/detail";

        this.setState({ isAnimating: true, isDisabled: true })

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-sh-auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcxYmJiYmMxNzdjZDIxNTgxYzg2YTIiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTYwMTI4OTcxNH0.qdlEFgv2Q6V0GGopBp4VZobhfu95ajGSVDSKfXH0A1I"
            },
            body: JSON.stringify({
                "device_unique_id": DeviceInfo.getUniqueId(),
                "date": this.props.manifest.manifest_date,
            })
        }).then((response) => response.text())
            .then(async (responseText) => {

                let responseData = JSON.parse(responseText);
                console.log(responseData, "resposne from menifest list api");

                if (responseData.success === true) {


                    await this.setState({ manifest: responseData.manifest })

                    console.log(responseData.manifest, "response from manifest detail api")

                    if (this.state.manifest.manifest_evening.length === 0) {
                        this.setState({ isEveningManifestEmpty: true });
                    }

                    else {
                        if (this.state.manifest.manifest_evening[0].manifest_mood === "Bad") {
                            this.setState({ manifest_mood_icon: bad_day })
                        }

                        else if (this.state.manifest.manifest_evening[0].manifest_mood === "Sad") {
                            this.setState({ manifest_mood_icon: sad_day })
                        }

                        else if (this.state.manifest.manifest_evening[0].manifest_mood === "Emotion Less") {
                            this.setState({ manifest_mood_icon: normal_day })

                        }
                        else if (this.state.manifest.manifest_evening[0].manifest_mood === "Happy") {
                            this.setState({ manifest_mood_icon: Happy_day })
                        }


                        else if (this.state.manifest.manifest_evening[0].manifest_mood === "Very Happy") {
                            this.setState({ manifest_mood_icon: extra_happy_day })
                        }

                    }

                    if (this.state.manifest.manifest_morning.length === 0) {
                        this.setState({ isMorningManifestEmpty: true })
                    }
                    else {


                    }


                    await this.setState({ morning_manifest: this.state.manifest.manifest_morning, evening_manifest: this.state.manifest.manifest_evening });



                    console.log(this.state.manifest.manifest_evening.length, this.state.manifest.manifest_morning.length, " 2 numer")
                    if (this.state.manifest.manifest_evening.length === 0) {

                        this.setState({ isEveningSeleceted: true, isEveningManifestEmpty: true, isMorningSelected: false })
                    }

                    else if (this.state.manifest.manifest_morning.length === 0) {
                        this.setState({ isEveningSeleceted: false, isMorningManifestEmpty: true, isMorningSelected: true })
                    }


                    this.setState({ isAnimating: false, isDisabled: false })
                }

                else {
                    this.setState({ isAnimating: false, isDisabled: false })
                }



            })
            .catch((error) => {
                this.setState({ APIhit: true })
                console.log("error from menifest list api", error);
            });

    }




    hitDeleteManifestApi = async (manifestType) => {

        const url = domain + "/api/manifest/manifest_delete";
        let device_token = await DeviceInfo.getUniqueId();

        let manifest = {
            "device_unique_id": device_token,
            "manifest_date": this.state.manifest.manifest_date,
            "manifest_type": manifestType
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(manifest)

        }).then((response) => response.text())
            .then(async (responseText) => {

                console.log("response from delete menifest Api", responseText);
                let responseData = JSON.parse(responseText);
                console.log(responseData, "response from delete menifest Api");
                if (responseData.code === 200) {
                    startMainTabs()
                }

            })
            .catch((error) => {
                console.log("error from delete manifest API", error);
            })
    }





    async componentWillMount() {

        this.setState({ date: moment(this.props.manifest.manifest_date).format("MMM D, YYYY") })
        this.manifestDetailApi()

    }


    BackFunction = () => {
        Navigation.pop(this.props.componentId);
    }





    morningButtonAction = () => {
        this.setState({ isMorningSelected: true, isEveningSeleceted: false })

    }

    eveningButtonAction = () => {
        this.setState({ isMorningSelected: false, isEveningSeleceted: true })

    }

    setMenuRef = ref => {
        this._menu = ref;
    }


    hideMenu = async (value) => {
        this._menu.hide();
    }


    showMenu = async (value) => {
        this._menu.show();
    }



    AddmorningManifestFunction = async () => {


        let manifest = {
            "manifest_date": moment(this.state.manifest.manifest_date).format("YYYY-MM-DD"),
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
            "manifest_date": moment(this.state.manifest.manifest_date).format("YYYY-MM-DD"),
            "manifest_type": "evening",
            "device_unique_id": DeviceInfo.getUniqueId(),
            "grateful_thing": [],
            "universe_action": [],
            // "burning_desire": [],
            "manifest_intention_action":[],
            "manifest_mood": ""
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


    editMenifestation = async (morningOrEvening) => {

        this._menu.hide();
        if (morningOrEvening === "morning") {
            await AsyncStorage.setItem("ManifestEditing", JSON.stringify(true));
            if (this.state.morning_manifest.length === 0) {
                setTimeout(() => {
                    Alert.alert("You have not added morning manifestation")
                }, 500);
            }
            else {

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
        }

        else {

            await AsyncStorage.setItem("ManifestEditing", JSON.stringify(true));
            if (this.state.evening_manifest.length === 0) {
                setTimeout(() => {
                    Alert.alert("You have not added evening manifestation")

                }, 500);
            }
            else {
                let manifest = {
                    "manifest_date": this.state.manifest.manifest_date,
                    "manifest_type": "evening",
                    "device_unique_id": DeviceInfo.getUniqueId(),
                    "grateful_thing": this.state.evening_manifest[0].grateful_thing,
                    "universe_action": this.state.evening_manifest[0].universe_action,
                    // "burning_desire": this.state.evening_manifest[0].burning_desire,
                    "manifest_mood": this.state.evening_manifest[0].manifest_mood
                }

                Navigation.push(this.props.componentId, {
                    component: {
                        name: 'poisedAthleteMeditation.GrateFullForTodayScreen',
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
    }





    burningDesireScreen = () => {

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
                    editingDirectly: true,
                    refresh: this.manifestDetailApi
                },
                options: {
                    bottomTabs: { visible: true },
                }
            }
        });
    }



    feelScreen = () => {

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
                name: 'poisedAthleteMeditation.ActionsScreen',
                passProps: {
                    menifestArray: manifest,
                    editingDirectly: true,
                    refresh: this.manifestDetailApi

                },
                options: {
                    bottomTabs: { visible: true },
                }
            }
        })

    }



    IaMScreen = () => {

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
                name: 'poisedAthleteMeditation.HowsMyMoodScreen',
                passProps: {
                    menifestArray: manifest,
                    editingDirectly: true,
                    refresh: this.manifestDetailApi


                },
                options: {
                    bottomTabs: { visible: true },
                }
            }
        })

    }





    plannedIntentionActionsScreen = () => {

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
                name: 'poisedAthleteMeditation.AddNewActionScreen',
                passProps: {
                    menifestArray: manifest,
                    editingDirectly: true,
                    refresh: this.manifestDetailApi


                },
                options: {
                    bottomTabs: { visible: true },
                }
            }
        })

    }





    threeGratefulThingsScreen = () => {

        let manifest = {
            "manifest_date": this.state.manifest.manifest_date,
            "manifest_type": "evening",
            "device_unique_id": DeviceInfo.getUniqueId(),
            "grateful_thing": this.state.evening_manifest[0].grateful_thing,
            "universe_action": this.state.evening_manifest[0].universe_action,
            // "burning_desire": this.state.evening_manifest[0].burning_desire,
            "manifest_mood": this.state.evening_manifest[0].manifest_mood
        }


        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.GrateFullForTodayScreen',
                passProps: {
                    menifestArray: manifest,
                    editingDirectly: true,
                    refresh: this.manifestDetailApi
                },
                options: {
                    bottomTabs: { visible: true },
                }
            }
        })



    }


    ServeUniverseScreen = () => {

        let manifest = {
            "manifest_date": this.state.manifest.manifest_date,
            "manifest_type": "evening",
            "device_unique_id": DeviceInfo.getUniqueId(),
            "grateful_thing": this.state.evening_manifest[0].grateful_thing,
            "universe_action": this.state.evening_manifest[0].universe_action,
            // "burning_desire": this.state.evening_manifest[0].burning_desire,
            "manifest_mood": this.state.evening_manifest[0].manifest_mood
        }


        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.ServeUniverseScreen',
                passProps: {
                    menifestArray: manifest,
                    editingDirectly: true,
                    refresh: this.manifestDetailApi
                },
                options: {
                    bottomTabs: { visible: true },
                }
            }
        })

    }


    myCurretnMoodScreen = () => {

        let manifest = {
            "manifest_date": this.state.manifest.manifest_date,
            "manifest_type": "evening",
            "device_unique_id": DeviceInfo.getUniqueId(),
            "grateful_thing": this.state.evening_manifest[0].grateful_thing,
            "universe_action": this.state.evening_manifest[0].universe_action,
            // "burning_desire": this.state.evening_manifest[0].burning_desire,
            "manifest_mood": this.state.evening_manifest[0].manifest_mood
        }

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.HowsDayScreen',
                passProps: {
                    menifestArray: manifest,
                    editingDirectly: true,
                    refresh: this.manifestDetailApi

                },
                options: {
                    bottomTabs: { visible: true },
                }
            }
        })


    }





    render() {
        return (
            <View style={[{ flex: 1, paddingHorizontal: 18 }, Platform.OS === "android" ? { paddingBottom: 70 } : {}]}>

                <MyStatusBar barStyle="dark-content" />


                {/* back button */}
                <View style={{ flexDirection: 'row', height: 50 }}>

                    <TouchableWithoutFeedback onPress={this.BackFunction} >
                        <View style={{ flex: 0.12, flexDirection: "row", alignItems: "center" }}>
                            <Image source={BackIcon} style={{ height: 16, width: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ fontFamily: "Gotham-Black", fontSize: 22 }}>{this.state.date}</Text>
                    </View>



                    <View style={{ flex: 0.1, flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                        <Menu ref={this.setMenuRef}
                            button={
                                <TouchableOpacity onPress={this.showMenu}>
                                    <Image source={MenuIcon} style={{ height: 16, width: 16, resizeMode: "contain" }} />
                                </TouchableOpacity>
                            }
                        >
                            {/* <MenuItem onPress={() => { this.editMenifestation("morning") }}>Edit Morning Menifestation</MenuItem>
                            <MenuDivider />

                            <MenuItem onPress={() => { this.editMenifestation("evening") }}>Edit Evening Menifestation</MenuItem>
                            <MenuDivider /> */}

                            <MenuItem onPress={() => { this.deleteManifestation("morning") }}>Delete Morning Manifestation</MenuItem>
                            <MenuDivider />

                            <MenuItem onPress={() => { this.deleteManifestation("evening") }}>Delete Evening Manifestation</MenuItem>
                            <MenuDivider />

                            <MenuItem onPress={() => { this.deleteManifestation("both") }}>Delete Both</MenuItem>
                            <MenuDivider />

                        </Menu>

                    </View>





                </View>
                {/* back button */}





                {/* top button */}
                <View style={styles.topButton}>
                    <TouchableOpacity onPress={this.morningButtonAction} style={[styles.innerWhiteButton, this.state.isMorningSelected === true ? { backgroundColor: "white" } : {}]}>
                        <Text style={[styles.innerTexts, this.state.isMorningSelected === true ? { color: "#497CF0" } : { color: "white" }]}>Morning</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 0.5 }}></View>

                    <TouchableOpacity onPress={this.eveningButtonAction} style={[styles.innerWhiteButton, this.state.isEveningSeleceted === true ? { backgroundColor: "white" } : {}]}>
                        <Text style={[styles.innerTexts, this.state.isEveningSeleceted === true ? { color: "#497CF0" } : { color: "white" }]}>Evening</Text>
                    </TouchableOpacity>

                </View>
                {/* top button */}



                <ScrollView showsVerticalScrollIndicator={false}>




                    {this.state.isDisabled === false &&


                        <View style={{ flex: 1, }}>




                            {/* morning part starts */}
                            {this.state.isMorningSelected === true &&

                                <View>

                                    {this.state.isMorningManifestEmpty === false ?

                                        <View>

                                            {/* view 1  */}
                                            <TouchableWithoutFeedback onPress={this.burningDesireScreen}>
                                                <View style={{ marginTop: 20 }}>

                                                    <Text style={styles.headingText}>Burning Desires</Text>
                                                    <View style={styles.backgroundView}>
                                                        <View style={styles.listItem}>
                                                            <Text style={{ fontFamily: "Gotham-Light", fontWeight: "400", fontSize: 15, }}>{this.state.manifest.manifest_morning[0].manifest_burning_desire}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            {/* view 1  */}


                                            {/* view 1  */}
                                            <TouchableWithoutFeedback onPress={this.feelScreen}>

                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={styles.headingText}>How you thought it would feel</Text>





                                                    <View style={styles.backgroundView}>

                                                        {console.log(this.state.manifest.manifest_morning[0].feel_action, "this.state.manifest.manifest_morning[0].feel_action")}

                                                        <FlatList
                                                            data={this.state.manifest.manifest_morning[0].feel_action}
                                                            horizontal={false}
                                                            renderItem={({ item, index }) => (

                                                                <View style={[styles.listItem]}>
                                                                    <View style={{ backgroundColor: "#4F8AEF", borderRadius: 14.5, height: 25, width: 25, alignItems: "center", justifyContent: "center", marginRight: 3, }}>
                                                                        <Image style={styles.sideIcon} source={item.server_item === true ? { uri: domain + item.feel_action_icon } : Leaves} />
                                                                    </View>
                                                                    <Text style={styles.text}>{item.feel_action_title}</Text>
                                                                </View>

                                                            )}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />
                                                    </View>


                                                </View>
                                            </TouchableWithoutFeedback>

                                            {/* view 1  */}


                                            {/* view 1  */}
                                            <TouchableWithoutFeedback onPress={this.IaMScreen}>
                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={styles.headingText}>I AM</Text>

                                                    <View style={styles.backgroundView}>

                                                        <FlatList
                                                            data={this.state.manifest.manifest_morning[0].manifest_user_personality}
                                                            horizontal={false}
                                                            renderItem={({ item, index }) => (
                                                                <View style={[styles.listItem]}>
                                                                    <View style={{ backgroundColor: "#4F8AEF", borderRadius: 14.5, height: 25, width: 25, alignItems: "center", justifyContent: "center", marginRight: 3, }}>

                                                                        <Image style={styles.sideIcon} source={item.server_item === true ? { uri: domain + item.personality_icon } : Leaves} />
                                                                    </View>
                                                                    <Text style={styles.text}>{item.personality_title}</Text>
                                                                </View>

                                                            )}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />

                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            {/* view 1  */}




                                            {/* view 1  */}

                                            <TouchableWithoutFeedback onPress={this.plannedIntentionActionsScreen}>
                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={styles.headingText}>Planned Intentional Actions</Text>
                                                    <View style={styles.backgroundView}>
                                                        <FlatList
                                                            data={this.state.manifest.manifest_morning[0].manifest_intention_action}
                                                            horizontal={false}
                                                            renderItem={({ item, index }) => (

                                                                <View style={styles.listItem}>
                                                                    <Text style={{ color: "#4C7FED", fontFamily: "Gotham-Bold" }}>{index + 1}.</Text>
                                                                    <Text style={styles.text}>{item.intention_title}</Text>
                                                                </View>
                                                            )}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            {/* view 1  */}

                                        </View>
                                        :
                                        <View style={{ width: "85%", alignItems: "center", justifyContent: "center", marginTop: 50, elevation: 3 }}>
                                            <ImageBackground imageStyle={{ borderRadius: 20 }} source={Background} style={{ height: 400, width: "100%", alignItems: "center", justifyContent: "center", marginLeft: "15%" }}>
                                                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }} onPress={this.AddmorningManifestFunction}>
                                                    <Image source={AddButton} style={{ height: 70, width: 70 }} />
                                                    <Text style={{ color: "white", fontWeight: "300", fontSize: 20, marginTop: 25 }}>Tap to Add Morning Entry</Text>
                                                </TouchableOpacity>

                                            </ImageBackground>
                                        </View>


                                    }



                                </View>






                            }

                            {/* morning part ends */}








                            {/* evening part starts */}
                            {this.state.isEveningSeleceted === true &&

                                <View >

                                    {this.state.isEveningManifestEmpty === false ?

                                        <View>


                                            {/* view 2  */}

                                            <TouchableWithoutFeedback onPress={this.threeGratefulThingsScreen}>

                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={styles.headingText}>3 Things i'm grateful for</Text>

                                                    <View style={styles.backgroundView}>

                                                        <FlatList
                                                            data={this.state.manifest.manifest_evening[0].grateful_thing}
                                                            horizontal={false}
                                                            renderItem={({ item, index }) => (

                                                                <View style={styles.listItem}>
                                                                    <View style={{ backgroundColor: "#4F8AEF", borderRadius: 14.5, height: 25, width: 25, alignItems: "center", justifyContent: "center", marginRight: 3, }}>
                                                                        <Image style={styles.sideIcon} source={item.server_item === true ? { uri: domain + item.grateful_thing_icon } : Leaves} />
                                                                    </View>
                                                                    <Text style={styles.text}>{item.grateful_thing_title}</Text>
                                                                </View>

                                                            )}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />


                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            {/* view 2  */}



                                            {/* view 3  */}

                                            <TouchableWithoutFeedback onPress={this.ServeUniverseScreen}>

                                                <View style={{ marginTop: 12 }}>
                                                    <Text style={styles.headingText}>How did you serve the universe?</Text>

                                                    <View style={styles.backgroundView}>

                                                        <FlatList
                                                            data={this.state.manifest.manifest_evening[0].universe_action}
                                                            horizontal={false}
                                                            renderItem={({ item, index }) => (
                                                                <View style={styles.listItem}>
                                                                    <Text style={{ fontFamily: "Gotham-Light", fontWeight: "400", fontSize: 15, }}>{item.universe_action_title}</Text>
                                                                </View>
                                                            )}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />

                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            {/* view 3  */}


                                            {/* view 4  */}

                                            <TouchableWithoutFeedback onPress={this.myCurretnMoodScreen}>
                                                <View style={{ marginTop: 12 }} >
                                                    <Text style={styles.headingText}>How did it feel to experience?</Text>
                                                    <View style={styles.backgroundView}>
                                                        <View style={styles.listItem}>
                                                            <View style={{ backgroundColor: "#4F8AEF", borderRadius: 14.5, height: 25, width: 25, alignItems: "center", justifyContent: "center", marginRight: 3, }}>

                                                                <Image style={{ height: 65, width: 65, resizeMode: "contain" }} source={this.state.manifest_mood_icon} />
                                                            </View>
                                                            <Text style={styles.text}>{this.state.manifest.manifest_evening[0].manifest_mood}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            {/* view 4 */}

                                        </View>

                                        :

                                        <View style={{ width: "85%", alignItems: "center", justifyContent: "center", marginTop: 50, elevation: 3, marginLeft: "7%" }}>
                                            <ImageBackground imageStyle={{ borderRadius: 20 }} source={Background} style={{ height: 400, width: "100%", alignItems: "center", justifyContent: "center" }}>

                                                <TouchableOpacity onPress={this.AddeveningManifestFunction} style={{ alignItems: "center", justifyContent: "center" }}>
                                                    <Image source={AddButton} style={{ height: 70, width: 70 }} />
                                                    <Text style={{ color: "white", fontWeight: "300", fontSize: 20, marginTop: 25 }}>Tap to add Evening Entry</Text>
                                                </TouchableOpacity>

                                            </ImageBackground>
                                        </View>

                                    }

                                </View>
                            }

                            {/* evening part ends */}

                        </View>
                    }
                </ScrollView>



                {this.state.isAnimating &&
                    <ActivityIndicator size="large" color="#497CF0" animating={this.state.isAnimating} style={styles.loading} />
                }



            </View>
        )

    }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : 0;


const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    // appBar: {
    //     backgroundColor: 'black',
    //     height: APPBAR_HEIGHT,
    // },
    buttonView: {
        height: 55, width: "80%", position: "absolute",
        // right: "2%",
        bottom: Platform.OS === 'ios' ? 10 : 60,
        marginLeft: 50,
        marginRight: 50,
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

    },
    topButton: {
        flexDirection: "row", width: "83%", backgroundColor: "#4C7FED", borderRadius: 26.5, height: 52, marginTop: 13,
        shadowColor: '#497CF0',
        shadowOffset: { width: 1, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
        padding: 10,
        alignItems: "center",
        alignSelf: "center"
    },
    innerWhiteButton: {
        height: 35,
        flex: 4.5,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    innerTexts: {
        fontFamily: "Gotham-Bold",
        fontSize: 15,
    },
    headingText: {
        fontFamily: "Gotham-Bold",
        fontSize: 17,
        marginTop: 10
    },

    backgroundView: {
        backgroundColor: "#FBFBFB",
        borderRadius: 14,
        marginTop: 15,
        padding: 20

    },
    listItem: {
        flexDirection: "row",
        minHeight: 32,
        alignItems: "center",

    },
    text: {
        fontFamily: "Gotham-Light",
        fontWeight: "400",
        fontSize: 15,
        marginLeft: 17
    },
    sideIcon: {
        height: 16,
        width: 16,
        resizeMode: "contain",
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

});