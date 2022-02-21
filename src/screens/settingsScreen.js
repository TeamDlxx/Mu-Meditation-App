import React, { Component } from 'react';

import email from 'react-native-email'

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Platform,
    Linking,
    Image,
    ActivityIndicator,
    Switch,
    Alert

} from 'react-native';

import * as StoreReview from 'react-native-store-review';
import LeftArrow from '../assets/icons/LeftArrow.png'
import Arrow from '../assets/icons/right_arrow.png'
import { Navigation } from 'react-native-navigation';

import firebase from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';
import RNIap, { purchaseErrorListener, purchaseUpdatedListener } from 'react-native-iap';

import DeviceInfo from 'react-native-device-info';


export default class Settings extends Component {

    constructor() {
        super();

        this.state = {
            purchase: "",
            supportEmail: "",
            termOfUse: "",
            PrivacyPolicy: "",
            purchaseString: "",
            isAnimating: false,
            isDisabled: false,
            isEnabled: false
        }

    }


    toggleSwitch = async () => {
        await this.setState({ isEnabled: !this.state.isEnabled });
        await AsyncStorage.setItem("SwitchValue", JSON.stringify(this.state.isEnabled));
        console.log(this.state.isEnabled, "changed value")
    }

    async componentDidMount() {

        let switchValue = JSON.parse(await AsyncStorage.getItem('SwitchValue'));
        await this.setState({ isEnabled: switchValue });

        firebase.analytics().logEvent("Settings_Screen");
        firebase.analytics().setCurrentScreen("Settings_Screen", "Settings_Screen");

    }


    manageStorageFunc = () => {

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.manageStorage',

                options: {
                    bottomTabs: { visible: false },
                }
            }
        });

    }


    RestoreAction = async () => {
        this.setState({ isAnimating: true, isDisabled: true });

        try {
            let purchases = []
            purchases = await RNIap.getAvailablePurchases();
            console.log(purchases.length, "available purchases are these");

            if (purchases.length !== 0) {
                await AsyncStorage.setItem("ActiveOffer", JSON.stringify(purchases[0]));
            }


            let restoredTitles = [];
            console.log(purchases, "restore purchase......");

            if (purchases == "") {
                Alert.alert('Alert', 'You dont have any purchase to restore ');
            }
            else {

                purchases.forEach(purchase => {
                    switch (purchase.productId) {
                        case 'onemonthsubscription':
                            restoredTitles.push('One month Subscription plan');
                            Alert.alert('Restore Successful', 'You successfully restored the following purchases: ' + restoredTitles.join(', '));
                            break

                        case 'threemonthssubscription':
                            restoredTitles.push('Three months subscription plan');
                            Alert.alert('Restore Successful', 'You successfully restored the following purchases: ' + restoredTitles.join(', '));

                            break

                        case 'lifetimesubscription':
                            restoredTitles.push('Life time subscription');
                            Alert.alert('Restore Successful', 'You successfully restored the following purchases: ' + restoredTitles.join(', '));
                            break
                    }
                })


            }


            this.setState({ isAnimating: false, isDisabled: false })

        } catch (err) {
            console.warn(err); // standardized err.code and err.message available
            this.setState({ isAnimating: false, isDisabled: false })
            Alert.alert(err.message);
        }

    }

    onTabChange = async () => {



        try {

            let purchaseFromStore = JSON.parse(await AsyncStorage.getItem('ActiveOffer'));
            this.setState({ purchase: purchaseFromStore })

            console.log(purchaseFromStore, "purchaseFromStore testing")


            console.log(purchaseFromStore, "from store...is")
            let initResponse = JSON.parse(await AsyncStorage.getItem('InitResponse'));




            console.log(initResponse.data.supportEmailAddress, "support email testing");


            const LocalPricesArray = JSON.parse(await AsyncStorage.getItem('LocalPrices'));


            await this.setState({ supportEmail: initResponse.data.supportEmailAddress, termOfUse: initResponse.data.termsOfUse, PrivacyPolicy: initResponse.data.privacyPolicy })


            if (purchaseFromStore !== "" && purchaseFromStore !== null && purchaseFromStore !== undefined) {
                this.setState({ purchase: purchaseFromStore });

                if (this.state.purchase.productId === "lifetimesubscription") {
                    this.setState({ purchaseString: "You are subscribed for life time subscription for " + LocalPricesArray[0] })
                }

                else if (this.state.purchase.productId === "onemonthsubscription") {
                    this.setState({ purchaseString: "You are subscribed for one month subscription for " + LocalPricesArray[1] })
                }

                else if (this.state.purchase.productId === "threemonthssubscription") {
                    this.setState({ purchaseString: "You are subscribed for three months subscription for " + LocalPricesArray[2] })
                }
            }
            console.log(this.state.purchase, "purchase in settings screen");



        }
        catch (e) {
            console.log("error in onTabChange function settings screen", e)
        }
    }


    bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(async ({ selectedTabIndex, unselectedTabIndex }) => {

        console.log("tab changes qwerty")

        if (selectedTabIndex == "3") {
            this.onTabChange();
        }

    });




    FeedbackFunction = async () => {

        const to = [this.state.supportEmail]
        email(to, {

            // console.log('if 25 then Running on Nougat!');

            subject: 'Mu Meditation App Feedback \n' + "Platform: " + Platform.OS + "\nBrand: " + await DeviceInfo.getBrand() + "\nOS Version: " + Platform.Version + "\nApp Version: " + await DeviceInfo.getVersion(),
            body: ''
        }).catch(console.error)

    }



    // PrivacyPolicyFunction = () => {

    //     Navigation.push(this.props.componentId, {
    //         component: {
    //             name: 'poisedAthleteMeditation.privacyPolicy',
    //             passProps: {
    //                 privacyPolicyString: this.state.PrivacyPolicy,


    //             },
    //             options: {
    //                 bottomTabs: { visible: false },
    //             }

    //         }

    //     });
    // }


    // TermOfUseFunction = () => {

    //     Navigation.push(this.props.componentId, {
    //         component: {
    //             name: 'poisedAthleteMeditation.termOfUse',
    //             passProps: {
    //                 termOfUseString: this.state.termOfUse,

    //             },
    //             options: {
    //                 bottomTabs: { visible: false },
    //             }
    //         }
    //     });
    // }


    PrivacyPolicyFunction = () => {

        Linking.openURL('https://www.kamahagar.com/privacy-policy').catch(err => console.error("Couldn't load page", err));

    }


    TermOfUseFunction = () => {

        Linking.openURL('https://www.kamahagar.com/terms-of-service').catch(err => console.error("Couldn't load page", err));

    }

    refresh = async () => {


        const LocalPricesArray = JSON.parse(await AsyncStorage.getItem('LocalPrices'));


        this.purchaseUpdateSubscription = purchaseUpdatedListener(async (purchaseFromStore) => {

            console.log("refresh called.... .. ")
            if (purchaseFromStore !== "" && purchaseFromStore !== null && purchaseFromStore !== undefined) {
                await this.setState({ purchase: purchaseFromStore });

                if (this.state.purchase.productId === "lifetimesubscription") {
                    this.setState({ purchaseString: "You are subscribed for life time subscription for " + LocalPricesArray[0] })
                }

                else if (this.state.purchase.productId === "onemonthsubscription") {
                    this.setState({ purchaseString: "You are subscribed for one month subscription for " + LocalPricesArray[1] })
                }

                else if (this.state.purchase.productId === "threemonthssubscription") {
                    this.setState({ purchaseString: "You are subscribed for three months subscription for " + LocalPricesArray[2] })
                }
            }



        })


    }

    UpgradeFunction = () => {


        if (this.state.purchase === "" || this.state.purchase === null) {

            Navigation.push(this.props.componentId, {
                component: {
                    name: 'poisedAthleteMeditation.upgradeScreen',
                    passProps: {
                        FromSettings: true,
                        refresh: this.refresh,
                        privacyPolicyString: this.state.PrivacyPolicy,
                        termOfUseString: this.state.termOfUse,

                    },
                    options: {
                        bottomTabs: { visible: false },
                    }
                }
            });
        }

        else {

            Navigation.push(this.props.componentId, {
                component: {
                    name: 'poisedAthleteMeditation.currentPlan',
                    passProps: {
                        FromSettings: true,
                    },
                    options: {
                        bottomTabs: { visible: false },
                    }
                }
            });
        }
    }



    rateAppFunction = () => {


        if (Platform.OS === "ios") {
            if (StoreReview.isAvailable) {
                StoreReview.requestReview();
            }
        }
        else {

            Linking.openURL('market://details?id=com.poisedmentaltraining.app');

        }

    }


    render() {

        return (

            <View style={styles.container} pointerEvents={this.state.isDisabled ? "none" : "auto"}>

                {this.state.isAnimating &&
                    <ActivityIndicator size="large" color="#497CF0" animating={this.state.isAnimating} style={styles.loading} />
                }
                 <View style={{ flexDirection: "row",height: 50 }}>

                <View style={{marginTop:0}} >
                    <View style={{flexDirection:"row", alignItems:"center"}}>

                        <TouchableOpacity onPress={this.BackFunction} style={{flexDirection:"row", alignItems:"center"}} >
                            {/* <Image source={LeftArrow} style={{height:16, width:10}} /> */}
                            <Text style={styles.headingTxt}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                </View>




                <ScrollView showsVerticalScrollIndicator={false}>


                    <View style={{ marginTop: 5, paddingBottom: 32 }}>



                        <TouchableOpacity onPress={this.FeedbackFunction} style={styles.listItem}>
                            <Text style={styles.itemtxt}>Give Feedback</Text>
                            <Image source={Arrow} style={styles.arrow}></Image>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.listItem} onPress={this.manageStorageFunc}>
                            <Text style={styles.itemtxt}>Manage Storage</Text>
                            <Image source={Arrow} style={styles.arrow}></Image>
                        </TouchableOpacity>



                        <TouchableOpacity style={styles.listItem} onPress={this.rateAppFunction}>
                            <Text style={styles.itemtxt}>Love our App? Rate 5 Star!</Text>
                            <Image source={Arrow} style={styles.arrow}></Image>
                        </TouchableOpacity>



                        <TouchableOpacity style={styles.listItem} onPress={this.TermOfUseFunction}>
                            <Text style={styles.itemtxt}>Terms of Use</Text>
                            <Image source={Arrow} style={styles.arrow}></Image>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.listItem} onPress={this.PrivacyPolicyFunction}>
                            <Text style={styles.itemtxt}>Privacy Policy</Text>
                            <Image source={Arrow} style={styles.arrow}></Image>
                        </TouchableOpacity>

                        {/* {(this.state.purchase === "" || this.state.purchase === null) &&

                            <TouchableOpacity style={styles.listItem} onPress={this.UpgradeFunction}>
                                <Text style={styles.itemtxt}>Upgrade to Premium </Text>
                                <Image source={Arrow} style={styles.arrow}></Image>
                            </TouchableOpacity>

                        } */}

                        {/* <TouchableOpacity style={styles.listItem} onPress={this.RestoreAction}>
                            <Text style={styles.itemtxt}>Restore Purchase</Text>
                            <Image source={Arrow} style={styles.arrow}></Image>
                        </TouchableOpacity> */}


                        {/* {(this.state.purchase !== "" && this.state.purchase !== null) &&
                            <TouchableOpacity style={styles.listItem} onPress={this.UpgradeFunction}>
                                <Text style={styles.itemtxt2}>{this.state.purchaseString}</Text>
                                <Image source={Arrow} style={styles.arrow}></Image>
                            </TouchableOpacity>
                        } */}

                        <View style={styles.listItem}>
                            <Text style={styles.itemtxt}>Automatically play next track</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#a1863e" }}
                                thumbColor={"#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.toggleSwitch}
                                value={this.state.isEnabled}
                            />
                            {/* <Image source={Arrow} style={styles.arrow}></Image> */}
                        </View>

                    </View>
                </ScrollView>

            </View>




        )
    }

}

const STATUSBAR_HEIGHT = Platform.OS === "android" ? 8 : 20;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({

    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor: '#6C97F8',
        height: APPBAR_HEIGHT,
        flexDirection: 'row',
        width: "100%",
        alignItems: "center"
    },


    listItem: {
        flexDirection: 'row',
        borderBottomColor: "#F0F1F3",
        borderBottomWidth: 1,
        paddingBottom: 30,
        paddingTop: 30,
    },

    container: {
        flex: 1,
        padding: 18,

    },

    headingTxt: {
        fontSize: 24,
        fontWeight: "900",
        fontFamily: "Gotham-Black",
        paddingLeft: 10

    },
    headingTxtContainer: {

        justifyContent: "center"
    },

    arrow: {
        height: 17, width: 10, marginTop: 3
    },

    itemtxt: {
        fontFamily: 'Gotham-Bold',
        flex: 6,
        fontSize: 18,

    },

    itemtxt2: {
        fontFamily: 'Gotham-Bold',
        flex: 6,
        fontSize: 18,
        paddingLeft: 20,
        color: "#497CF0"
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