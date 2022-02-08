import React, { Component } from 'react';

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
    Image,
    ActivityIndicator
} from 'react-native';

import LeftArrow from '../assets/icons/LeftArrow.png'
import { Navigation } from 'react-native-navigation';

import SplashScreen from 'react-native-splash-screen';
import firebase from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';





import TrackPlayerr from "react-native-track-player";

import RNIap, { purchaseErrorListener, purchaseUpdatedListener } from 'react-native-iap';


const itemSkus = Platform.select({
    ios: [
        "lifetimesubscription"
    ],
    android: [
        "lifetimesubscription",
    ]
});

const itemSkus2 = Platform.select({
    ios: [
        "onemonthsubscription",
        "threemonthssubscription"
    ],
    android: [
        "onemonthsubscription",
        "threemonthssubscription"
    ]

});



export default class Upgrade extends Component {

    constructor() {
        super();
        this.state = {
            products: "",
            LocalmonthlyPayment: "",
            LocalThreeMonthsPayment: "",
            LocalLifeTimePyament: "",
            isAnimating: false,
            isDisabled: false,
            passPurchase: ""
        }
    }




    requestForOneTime = async (sku) => {
        console.log(sku, " requestForOneTime sku");
        // console.log(sku," requestForOneTime sku");
        try {
            await RNIap.requestPurchase(sku, false);

        }
        catch (err) {
            console.log("back can not be called")
            console.warn(err.code, err.message);
        }


    }



    requestForSubscription = async (sku) => {

        console.log(sku, " requestForSubscription sku");
        try {
            await RNIap.requestSubscription(sku);
            //   this.BackFunction();
            //   await this.props.refresh();
            //   Navigation.pop(this.props.componentId);
        }
        catch (err) {
            console.warn(err.code, err.message);
        }
    }

    TermOfUseFunction = () => {

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.termOfUse',
                passProps: {
                    termOfUseString: this.props.termOfUseString,
                    // changeBarcolor:this.changeBarcolor
                },
                options: {
                    bottomTabs: { visible: false },
                }
            }
        });
    }






    async componentDidMount() {



        console.log(this.props.privacyPolicyString, this.props.termOfUseString, "whdwbe6rw4rbwercw")




        // if(Platform.OS == "android"){

        //     StatusBar.setBarStyle('dark-content');
        //     StatusBar.setBackgroundColor("white")
        // }

        firebase.analytics().logEvent("Upgrade_Screen");
        firebase.analytics().setCurrentScreen("Upgrade_Screen", "Upgrade_Screen")

        SplashScreen.hide();

        this.setState({ isAnimating: true, isDisabled: true })

        try {
            let items = [];
            let getsubscriptions = [];
            items = await RNIap.getProducts(itemSkus);
            getsubscriptions = await RNIap.getSubscriptions(itemSkus2);
            console.log('items', items);
            console.log('getsubscriptions', getsubscriptions);

            const LocalPricesArray = JSON.parse(await AsyncStorage.getItem('LocalPrices'));

            console.log(LocalPricesArray, "array of prices from async");


            await this.setState({ LocalLifeTimePyament: LocalPricesArray[0], LocalmonthlyPayment: LocalPricesArray[1], LocalThreeMonthsPayment: LocalPricesArray[2] });
            console.log('itemSkus', itemSkus);
            console.log('subscriptionSku', itemSkus2);

            // this.setState({ products });

            this.purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {

                console.log(purchase, "purchaase in upgrade screen")
                await AsyncStorage.setItem("ActiveOffer", JSON.stringify(purchase));
                this.props.refresh();
                Navigation.pop(this.props.componentId);
                // this.BackFunction();
            })



            this.purchaseErrorSubscription = purchaseErrorListener((PurchaseError) => {
                console.warn('purchaseErrorListener..', PurchaseError);
            });

            this.setState({ isAnimating: false, isDisabled: false })

        }
        catch (err) {
            console.log(err, "error in getting products"); // standardized err.code and err.message available
        }



    }



    componentWillUnmount() {
        if (this.purchaseUpdateSubscription) {
            this.purchaseUpdateSubscription.remove();
            this.purchaseUpdateSubscription = null;
        }
        if (this.purchaseErrorSubscription) {
            this.purchaseErrorSubscription.remove();
            this.purchaseErrorSubscription = null;
        }
    }



    BackFunction = async () => {

        Navigation.pop(this.props.componentId);

        await this.props.refresh();



    }



    PrivacyPolicyFunction = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.privacyPolicy',
                passProps: {
                    playList: "abc",
                    privacyPolicyString: this.props.privacyPolicyString

                },
                options: {
                    bottomTabs: { visible: false },
                }

            }

        });
    }

    render() {
        return (
            <View style={styles.container} pointerEvents={this.state.isDisabled ? "none" : "auto"}>



                {this.state.isAnimating &&
                    <ActivityIndicator size="large" color="#a1863e" animating={this.state.isAnimating} style={styles.loading} />
                }

                <View style={{ flexDirection: "row", height: 50 }}>



                    <View style={{ marginTop: 8 }} >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>

                            <TouchableOpacity onPress={this.BackFunction} style={{ flexDirection: "row", alignItems: "center" }} >
                                <Image source={LeftArrow} style={{ height: 16, width: 10 }} />
                                <Text style={styles.headingTxt}>Upgrade</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                </View>

                <ScrollView showsVerticalScrollIndicator={false}>


                    <View style={styles.centerPart}>

                        <View style={styles.element}>
                            <Text style={styles.textHead}>All Content & Features</Text>
                            <Text style={styles.textSubHead}>Unlock more Features & additional hours of audio content</Text>
                        </View>


                        <View style={styles.element}>
                            <Text style={styles.textHead}>Offline Listening</Text>
                            <Text style={styles.textSubHead}>Save to favourites & listen wherever</Text>
                        </View>


                        <View style={styles.element}>
                            <Text style={styles.textHead}>Free Updates</Text>
                            <Text style={styles.textSubHead}>Access to all new content and Features </Text>
                        </View>


                        <View style={styles.element}>
                            <Text style={styles.textHead}>100% Satisfaction Guarantee</Text>
                            <Text style={styles.textSubHead}>If anything went wrong just Email us we'll make it right</Text>
                        </View>


                    </View>


                    <View style={styles.element}>
                        <Text style={styles.textHead}>Subscriptions Plans</Text>

                    </View>

                    <View style={{ marginTop: 5, justifyContent: "space-around" }}>


                        {/* two subscription buttons */}



                        <View style={{ marginTop: 30, borderColor: "#C9CCD5", borderWidth: 1, padding: 15, borderRadius: 15 }}>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 57, backgroundColor: "white", marginTop: -30, width: "60%" }}>
                                <Text style={{ fontFamily: "Gotham-Light", fontSize: 16 }}>After 3-day trail</Text>
                            </View>
                            <View style={{
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                shadowColor: '#C9CCD5',
                                shadowOffset: { width: 0, height: 9 },
                                shadowOpacity: 0.2,
                                shadowRadius: 2,
                                elevation: 3,
                                backgroundColor: "#0000",
                                paddingTop: 15
                            }}
                            >
                                <TouchableOpacity onPress={() => this.requestForSubscription("onemonthsubscription")} style={{ alignItems: "center", width: "100%", borderRadius: 25, padding: 10, backgroundColor: "#C9CCD5", flexDirection: "row", justifyContent: "center", height: 55 }}>
                                    <Text style={{
                                        fontFamily: "Gotham-Bold", color: "white", fontSize: 18, 
                                        textShadowColor: 'silver',
                                        textShadowOffset: { width: 0.5, height: 1 },
                                        textShadowRadius: 5
                                    }}>{this.state.LocalmonthlyPayment
                                        }</Text>
                                    <Text style={{
                                        fontFamily: "Gotham-Bold", color: "white", fontSize: 13, paddingLeft: 7,

                                        textShadowColor: 'silver',
                                        textShadowOffset: { width: 0.5, height: 1 },
                                        textShadowRadius: 5
                                    }}>Monthly Subscription</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 5 }}>

                                <Text style={{ fontFamily: "Gotham-Light", textAlign: "center", padding: 0, fontSize: 12, color: "#93959C", fontWeight: '500' }}>Billed Every Month</Text>
                            </View>

                            <View style={{
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                shadowColor: '#C9CCD5',
                                shadowOffset: { width: 0, height: 9 },
                                shadowOpacity: 0.2,
                                shadowRadius: 2,
                                elevation: 3,
                                backgroundColor: "#0000",
                                paddingTop: 8
                            }}
                            >
                                <TouchableOpacity onPress={() => this.requestForSubscription("threemonthssubscription")} style={{ alignItems: "center", width: "100%", borderRadius: 25, padding: 10, backgroundColor: "#C9CCD5", flexDirection: "row", justifyContent: "center", height: 55 }}>
                                    <Text style={{
                                        fontFamily: "Gotham-Bold", color: "white", fontSize: 18, 
                                        textShadowColor: 'silver',
                                        textShadowOffset: { width: 0.5, height: 1 },
                                        textShadowRadius: 5
                                    }}>{this.state.LocalThreeMonthsPayment}</Text>
                                    <Text style={{
                                        fontFamily: "Gotham-Bold", color: "white", fontSize: 13, paddingLeft: 7,
                                        textShadowColor: 'silver',
                                        textShadowOffset: { width: 0.5, height: 1 },
                                        textShadowRadius: 5
                                    }}>3 Months Subscription</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 5 }}>
                                <Text style={{ fontFamily: "Gotham-Light", textAlign: "center", padding: 0, fontSize: 12, color: "#93959C", fontWeight: '500' }}>Billed Every 3 Month</Text>
                            </View>

                        </View>

                        {/* two subscription buttons */}

                        <View style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: '#a1863e',
                            shadowOffset: { width: 0, height: 9 },
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            elevation: 3,
                            backgroundColor: "#0000",
                            marginTop: 20,

                        }}
                        >
                            <TouchableOpacity onPress={() => this.requestForOneTime("lifetimesubscription")} style={{ alignItems: "center", width: "100%", borderRadius: 25, padding: 10, backgroundColor: "#a1863e", flexDirection: "row", justifyContent: "center", height: 55 }}>
                                <Text style={{
                                    fontFamily: "Gotham-Bold", color: "white", fontSize: 20, paddingRight: 7,
                                }}>{this.state.LocalLifeTimePyament}</Text>
                                <Text style={{ fontFamily: "Gotham-Bold", color: "white", fontSize: 13, paddingLeft: 7 }}>Lifetime Access</Text>
                            </TouchableOpacity>

                        </View>




                    </View>

                    <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center" }}>

                        <Text style={{ textAlign: "center", fontSize: 12, }}>Cancel subscription any time. Subscription automatically renews unless auto-renew is turned off at least 24-hours  before the end of the current period by going to your iOS Account  Settings after purchase. Payment will be charged to iTunes Account. Any unused portion of free trial period, if offered, will be forfeited when you purchase a subscription.</Text>

                        <View style={{ flexDirection: "row" }}>
                            {/* <Text style={{fontSize:14,fontFamily:"Gotham-Bold", color:"#497CF0", marginTop:23, marginBottom:10}}> */}

                            <TouchableOpacity onPress={this.PrivacyPolicyFunction}>
                                <Text style={{ fontSize: 14, fontFamily: "Gotham-Black", color: "#a1863e", marginTop: 23, marginBottom: 10, fontWeight: "bold" }}>Privacy Policy  </Text>

                            </TouchableOpacity>


                            <Text style={{ fontSize: 14, fontFamily: "Gotham-Bold", color: "#a1863e", marginTop: 23, marginBottom: 10 }}>and</Text>

                            <TouchableOpacity onPress={this.TermOfUseFunction}>
                                <Text style={{ fontSize: 14, fontFamily: "Gotham-Black", color: "#a1863e", marginTop: 23, marginBottom: 10, fontWeight: "bold" }}>  Terms of Use</Text>
                            </TouchableOpacity>



                            {/* </Text> */}
                        </View>


                    </View>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 12,


    },

    headingTxt: {
        fontSize: 24,
        fontWeight: "900",
        fontFamily: "Gotham-Black",
        paddingLeft: 20

    },
    headingTxtContainer: {

        justifyContent: "center"
    },


    centerPart: {
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    element: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 17
    },
    textHead: {
        textAlign: "center",
        fontFamily: "Gotham-Bold",
        fontSize: 15,

    },
    textSubHead: {
        fontFamily: "Gotham-Light",
        textAlign: "center",
        padding: 12,
        fontSize: 15

    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }


})