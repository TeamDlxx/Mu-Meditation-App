import React, { Component } from 'react';

import { Navigation } from 'react-native-navigation';
import SearchIcon from '../assets/icons/search-icon.png';
import LockIcon from '../assets/icons/unlock.png';


import Swipeout from 'react-native-swipeout';



import SplashScreen from 'react-native-splash-screen';
import RNIap, { purchaseErrorListener, purchaseUpdatedListener } from 'react-native-iap';
import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from "rn-fetch-blob";
import { domain, app_id } from '../components/utilities'
import firebase from "react-native-firebase";
import startMainTabs from "../screens/StartMainTabs";
let MYTRACKS = [];

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

} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';




const DATA = [
    {
        id: '1',
        title: 'Chilly Nights',
        isLocked: true
    },
    {
        id: '2',
        title: 'Second Item',
        isLocked: true
    },
    {
        id: '3',
        title: 'Third Item',
        isLocked: true
    },

    {
        id: '4',
        title: 'Third Item',
        isLocked: true
    },

    {
        id: '5',
        title: 'Third Item',
        isLocked: true
    },

    {
        id: '6',
        title: 'Third Item',
        isLocked: true
    },


];


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


export default class HomeScreen extends Component {


    constructor() {
        super();
        this.state = {

            playLIst: true,
            allTracks: false,
            data: DATA,
            purchase: "",
            Appname: "",
            playLists: "",
            Tracks: "",
            deviceToken: "",
            playlistName: "",
            isAnimating: false,
            isDisabled: false,
            isInternetConnected: true,
            flexValue: 0,
            marginFromBottom: 1,
            privacyPolicyStringstate: "",
            termOfUseStringstate: "",
            favouritesTabSelected: false,
            favoriteTracks: [],
            currentItem: ""

        }

    }

    refresh = async () => {
        this.setState({ isAnimating: true, isDisabled: true })
        let currentPurchase = JSON.parse(await AsyncStorage.getItem('ActiveOffer'));


        console.log(currentPurchase, "current purchase in home")

        if (currentPurchase !== null && currentPurchase !== "" && currentPurchase !== undefined) {
            await this.setState({ purchase: currentPurchase })
        }


        await this.setState({ isAnimating: false, isDisabled: false });

        this.refreshFavourites()
    }



    refreshFavourites = async () => {

        console.log("refresheddddd")

        const FavoriteTracks = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));

        if (FavoriteTracks !== "" && FavoriteTracks !== undefined && FavoriteTracks !== null) {
            await this.setState({ favoriteTracks: FavoriteTracks });
        }

    }


    deleteFunction = async () => {

        console.log(this.state.currentItem.songUrl, "kjskhdsjhdshdsh");
        RNFetchBlob.fs.unlink(this.state.currentItem.songUrl).then(() => {
        })


        // remove from favorites
        let arr = [];
        let favoriteSongs = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
        console.log(favoriteSongs, "ooooopp");
        for (let i = 0; i < favoriteSongs.length; i++) {
            if (this.state.currentItem._id === favoriteSongs[i]._id) {
            }
            else {
                arr.push(favoriteSongs[i])
            }
        }
        console.log(arr, "arr after removed");
        this.setState({ favoriteTracks: arr })
        await AsyncStorage.setItem("FavoriteTracks", JSON.stringify(arr));
        // remove from favorites





        //   remove from offline array
        let arr2 = [];
        let offlineSongs = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
        console.log(offlineSongs, "ooooopp");
        for (let i = 0; i < offlineSongs.length; i++) {
            if (this.state.currentItem._id === offlineSongs[i]._id) {
            }
            else {
                arr2.push(offlineSongs[i])
            }
        }
        console.log(arr2, "arr after removed");
        await AsyncStorage.setItem("OfflineSongs", JSON.stringify(arr2));
        //   remove from offline array


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



    fetchPlaylists = () => {


        const url = domain + "/api/tracks/app/" + app_id;
        console.log(url, "my urll")
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.text())
            .then(async (responseText) => {

                console.log("response from playlist API", responseText);
                let responseData = JSON.parse(responseText);

                console.log(responseData, "response from playlist api josn")

                if (responseData.success === true) {
                    this.setState({ playLists: responseData.playlists });
                    await AsyncStorage.setItem("PlayLists", JSON.stringify(responseData.playlists));


                    //         if(responseData.playlists.length !== 0 && responseData.playlists !== undefined && responseData.playlists !== null && responseData.playlists !== "")
                    //         {

                    //             for(let i=0; i<responseData.playlists.length; i++){


                    //                     RNFetchBlob.fetch('GET', domain+responseData.playlists[i].img_url, {
                    //                         Authorization : '',
                    //                     })
                    //                     .then(async(res) => {
                    //                         let status = res.info().status;
                    //                         if(status == 200) {
                    //                             let base64Str = res.base64();
                    //                             responseData.playlists[i].img_url = "data:image/png;base64,"+base64Str;
                    //                             await  AsyncStorage.setItem("PlayLists", JSON.stringify(responseData.playlists));
                    //                         }
                    //                     })
                    //                     .catch((errorMessage, statusCode) => {
                    //                         console.log(errorMessage, "error in cervision1")
                    //                     })


                    //                     for(let j=0; j<responseData.playlists[i].tracks.length; j++){



                    //                         RNFetchBlob.fetch('GET', domain+responseData.playlists[i].tracks[j].imgUrl, {
                    //                             Authorization : '',
                    //                         })
                    //                         .then(async(res) => {
                    //                             let status = res.info().status;
                    //                             if(status == 200) {
                    //                                 let base64Str = res.base64();
                    //                                 responseData.playlists[i].tracks[j].imgUrl = "data:image/png;base64,"+base64Str;
                    //                                 await  AsyncStorage.setItem("PlayLists", JSON.stringify(responseData.playlists));

                    //                             }
                    //                         })
                    //                         .catch((errorMessage, statusCode) => {
                    //                             console.log(errorMessage, "error in cervision2")
                    //                         })

                    //                 }
                    //                 }    
                    // }

                }



            })
            .catch((error) => {
                console.log("error from playlist API", error);

            });

    }


    saveDeviceTokenToDB = () => {

        const url = domain + "/api/device_tokens/";
        const deviceToken = { "token": this.state.deviceToken };
        console.log(deviceToken, "token checking");
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deviceToken)
        }).then((response) => response.text())
            .then(async (responseText) => {

                console.log("response from device_tokens Api", responseText);
                let responseData = JSON.parse(responseText);
                console.log(responseData, "response from device_tokens Api");

                if (responseData.success === true) {
                    await AsyncStorage.setItem("DeviceToken", JSON.stringify(responseData.Token));
                    console.log(responseData.Token, "token from api")
                }
            })
            .catch((error) => {
                console.log("error from device_tokens API", error);
            });
    }



    fetchAllTracks = () => {

        const url = domain + "/api/tracks";
        let tracksArry = [];
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.text())
            .then(async (responseText) => {

                console.log("response from all Tracks Api", responseText);
                let responseData = JSON.parse(responseText);

                if (responseData.success === true) {
                    // await  AsyncStorage.setItem("InitResponse", JSON.stringify(responseData));
                    console.log(responseData, "response from all tracks Api json");
                    // MYTRACKS = responseData.tracks;
                    for (let i = 0; i < responseData.tracks.length; i++) {

                        if (responseData.tracks[i].status === true) {
                            tracksArry.push(responseData.tracks[i])
                        }
                    }

                    let newArray = [];
                    let newArray2 = [];
                    let newArray3 = [];

                    for (let i = 0; i < tracksArry.length; i++) {
                        if (tracksArry[i].lock === false) {
                            newArray.push(tracksArry[i])
                        }
                        else {
                            newArray2.push(tracksArry[i]);
                        }

                    }

                    tracksArry = [...newArray, ...newArray2];

                    console.log(tracksArry, "both arrays after sort")


                    // console.log(tracksArry, "length]]]]]]");
                    // console.log(_.filter(tracksArry, { lock: false }), "locked status is false");

                    MYTRACKS = tracksArry;
                    await this.setState({ Tracks: tracksArry });

                    console.log(this.state.Tracks, "length]]]]]]2")
                    await AsyncStorage.setItem("AllTracks", JSON.stringify(tracksArry));
                    this.setState({ isAnimating: false, isDisabled: false });



                    // if(responseData.tracks.length !== 0 && responseData.tracks !== undefined && responseData.tracks !== null && responseData.tracks !== ""){

                    //     for(let i=0; i<responseData.tracks.length; i++){

                    //             // RNFetchBlob.fetch('GET', domain+responseData.tracks[i].imgUrl, {
                    //             //     Authorization : '',
                    //             // })
                    //             // .then(async(res) => {
                    //             //     let status = res.info().status;
                    //             //     if(status == 200) {
                    //             //         let base64Str = res.base64();
                    //             //         responseData.tracks[i].imgUrl = "data:image/png;base64,"+base64Str;
                    //             //         await  AsyncStorage.setItem("AllTracks", JSON.stringify(tracksArry));
                    //             //     }
                    //             // })
                    //             // .catch((errorMessage, statusCode) => {
                    //             //     console.log(errorMessage, "error in cervision3")
                    //             // })

                    //             tracksArry[i].imgUrl = "data:image/png;base64,"+base64Str;
                    //             await  AsyncStorage.setItem("AllTracks", JSON.stringify(tracksArry));
                    //     }
                    // }
                }
                else {
                    this.setState({ isAnimating: false, isDisabled: false })
                }
            })
            .catch((error) => {
                this.setState({ isAnimating: false, isDisabled: false })
                console.log("error from all tracks API", error);
            });
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

                let responseData = JSON.parse(responseText);

                console.log("response from init Api", responseData);


                if (responseData.success === true) {
                    await AsyncStorage.setItem("InitResponse", JSON.stringify(responseData));
                    console.log(responseData, "response from init Api json");

                    this.setState({ Appname: responseData.data.name, privacyPolicyStringstate: responseData.data.privacyPolicy, termOfUseStringstate: responseData.data.termsOfUse })
                }
            })
            .catch((error) => {
                console.log("error from init API", error);
            });
    }


    initApi2 = () => {

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

                let responseData = JSON.parse(responseText);
                console.log("response from init 2 Api", responseData);

                await AsyncStorage.setItem("initApiResponse", JSON.stringify(responseData));



                // if (responseData.success === true) {
                //     await AsyncStorage.setItem("InitResponse", JSON.stringify(responseData));
                //     console.log(responseData, "response from init Api json");

                //     this.setState({ Appname: responseData.data.name, privacyPolicyStringstate: responseData.data.privacyPolicy, termOfUseStringstate: responseData.data.termsOfUse })
                // }
            })
            .catch((error) => {
                console.log("error from init API", error);
            });
    }



    setItem = (item) => {

        console.log(item, "fatima")
        this.setState({ currentItem: item })

    }




    async componentDidMount() {


        const FavoriteTracks = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
        await this.setState({ favoriteTracks: FavoriteTracks });



        SplashScreen.hide();


        // crashlytics().crash()

        console.log("home screen is runnign")

        await AsyncStorage.setItem("ManifestEditing", JSON.stringify(false));



        this.initApi2();

        if (Platform.OS == "android") {


            let availablePurchases = await RNIap.getAvailablePurchases();

            let currentPurchase = JSON.parse(await AsyncStorage.getItem('ActiveOffer'));

            console.log(availablePurchases, 'availablepurchases ... ');
            console.log(currentPurchase, "the last one stored in sync")



            if (availablePurchases.length === 0) {
                console.log("no matching ...");
                this.setState({ purchase: "" })
                await AsyncStorage.setItem("ActiveOffer", JSON.stringify(""));
            }

            else {


                for (let i = 0; i < availablePurchases.length; i++) {

                    if (currentPurchase !== null) {

                        if (availablePurchases[i].productId === currentPurchase.productId) {
                            console.log(availablePurchases[i], "the mathched one purchase");
                            this.setState({ purchase: availablePurchases[i], marginFromBottom: 60 })
                            await AsyncStorage.setItem("ActiveOffer", JSON.stringify(availablePurchases[i]));
                        }

                    }


                    console.log("is null")



                }


            }



        }


        else {



            await AsyncStorage.setItem("ActiveOffer", JSON.stringify(""));


            //    let recieptIOS = await RNIap.getReceiptIOS();

            //    console.log(recieptIOS, "recieptIOS....")

            //    const receiptBody = {
            //     'receipt-data': recieptIOS,
            //     'password': '113d6e3045a04da0b23dc03c58c3dec4'
            //   };
            //   const result = await RNIap.validateReceiptIos(receiptBody, true);
            //   console.log(result, "reciept validation result in IOS");


        }



        firebase.analytics().logEvent("Home_Screen");
        firebase.analytics().setCurrentScreen("Home_Screen", "Home_Screen")


        if (Platform.OS == "android") {
            this.setState({ flexValue: 2 })
        }

        else {
            this.setState({ flexValue: 1.4 });
        }


        // start loading
        await this.setState({ isAnimating: true, isDisabled: true });
        // start loading


        //check internt connenction
        const unsubscribe = NetInfo.addEventListener(async state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            this.setState({ isInternetConnected: state.isConnected })



            if (state.isConnected === false) {

                console.log("internet nhi hai")
                // init data from Async 
                let InitData = JSON.parse(await AsyncStorage.getItem('InitResponse'));
                console.log(InitData, "response from Async no ineternt");
                if (InitData !== null && InitData !== undefined !== InitData !== "") {
                    this.setState({ Appname: InitData.data.name });
                }

                // init data from Async 


                //all tracks from Async
                let Alltracks = JSON.parse(await AsyncStorage.getItem('AllTracks'));
                if (Alltracks !== null && Alltracks !== undefined && Alltracks !== "") {
                    await this.setState({ Tracks: Alltracks });
                    MYTRACKS = Alltracks;
                }

                //all tracks from Async



                //playlists from Async
                let Playlists = JSON.parse(await AsyncStorage.getItem('PlayLists'));
                if (Playlists !== null && Playlists !== "" && Playlists !== undefined) {
                    console.log(Playlists, "playlists cheking for images")
                    this.setState({ playLists: Playlists });
                }


                //playlists from Async


                //  subscription status
                let purchaseFromStore = JSON.parse(await AsyncStorage.getItem('ActiveOffer'));
                if (purchaseFromStore !== "" && purchaseFromStore !== undefined && purchaseFromStore !== null) {
                    await this.setState({ purchase: purchaseFromStore });
                }

                //  subscription status


                this.setState({ isDisabled: false, isAnimating: false })




            }

            else {


                await AsyncStorage.setItem("PP", JSON.stringify(""));

                this.purchaseUpdateSubscription = purchaseUpdatedListener(async (purchaseFromStore) => {



                    if (Platform.OS === "android") {
                        RNIap.acknowledgePurchaseAndroid(purchaseFromStore.purchaseToken);
                        this.setState({ marginFromBottom: 60 })
                    }


                    this.setState({ marginFromBottom: 50 })

                    console.log(purchaseFromStore, "purchase from store home screen");
                    this.setState({ purchase: purchaseFromStore });
                    // this.setState({purchase: ""});
                    await AsyncStorage.setItem("ActiveOffer", JSON.stringify(this.state.purchase));
                    await AsyncStorage.setItem("PP", JSON.stringify(this.state.purchase));
                    // getting pucrhase from store
                })

                console.log("internet hai");
                await this.setState({ deviceToken: DeviceInfo.getUniqueId() });
                this.saveDeviceTokenToDB();
                await this.initApi();
                await this.fetchPlaylists();
                await this.fetchAllTracks();
                // getting pucrhase from store
                SplashScreen.hide();
            }
        });


        try {

            let items = [];
            let getsubscriptions = [];
            let prices = [];
            items = await RNIap.getProducts(itemSkus);
            getsubscriptions = await RNIap.getSubscriptions(itemSkus2);


            if (items.length === 3) {

                let oneTimePrice = items[0].localizedPrice;
                let oneMonthPrice = items[1].localizedPrice;
                let ThreemonthsPrice = items[2].localizedPrice;
                prices.push(oneTimePrice, oneMonthPrice, ThreemonthsPrice);

                console.log(prices, "prices array if items length is 3")
                await AsyncStorage.setItem("LocalPrices", JSON.stringify(prices));

            }
            else {

                console.log(items, getsubscriptions, "my test prices");

                let oneTimePrice = items[0].localizedPrice;
                let oneMonthPrice = getsubscriptions[0].localizedPrice;
                let ThreemonthsPrice = getsubscriptions[1].localizedPrice;

                prices.push(oneTimePrice, oneMonthPrice, ThreemonthsPrice);

                console.log(prices, "prices array if items length is not 3");


                await AsyncStorage.setItem("LocalPrices", JSON.stringify(prices));
            }



        }
        catch (e) {
            console.log("error ", e)
        }



    }


    playFavouriteTrackFunction = (item) => {

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.playScreen',
                passProps: {
                    track: item,
                    FromFavorites: "",
                    refresh: this.refreshFavourites,
                    tracksArray: this.state.favoriteTracks
                },
                options: {
                    bottomTabs: { visible: false },
                    popGesture: false
                }
            }

        });
    }




    playTrackFunction = (item) => {




        if (this.state.purchase === "" && item.lock === true) {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'poisedAthleteMeditation.upgradeScreen',
                    passProps: {
                        track: item,
                        refresh: this.refresh,
                        privacyPolicyString: this.state.privacyPolicyStringstate,
                        termOfUseString: this.state.termOfUseStringstate,

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
                    name: 'poisedAthleteMeditation.playScreen',
                    passProps: {
                        track: item,
                        tracksArray: this.state.Tracks,
                        refresh: this.refresh
                    },
                    options: {
                        bottomTabs: { visible: false },
                        popGesture: false
                    }

                }
            });



        }

    }

    searchFilterFunction = text => {

        const newData = MYTRACKS.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;

        });

        this.setState({ Tracks: newData });

    };

    //   privacyPolicyString: this.state.PrivacyPolicy,
    //   termOfUseString : this.state.termOfUse,



    UpgradeFunction = () => {

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.upgradeScreen',
                passProps: {
                    FromSettings: true,
                    refresh: this.refresh,
                    privacyPolicyString: this.state.privacyPolicyStringstate,
                    termOfUseString: this.state.termOfUseStringstate
                },
                options: {
                    bottomTabs: { visible: false },
                }
            }
        });

    }



    goToPlaylistFunction = (item) => {

        // console.log(item, "tracks in gotoplaylist")

        let name = item.name;
        name = name.replace(/\s+/g, '_');
        name = name.replace('&', '_');

        // console.log(name,"name...qqww");

        // item.name
        // let name = "play_list_clicked= "
        firebase.analytics().logEvent(name);
        // firebase.analytics().setCurrentScreen("Home_Screen", "Home_Screen")

        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.playListScreen',
                passProps: {

                    playList: item,
                    connected: this.state.isInternetConnected

                },
                options: {
                    bottomTabs: { visible: true },
                }

            }

        });

    }

    heartButtonAction = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.favouritesScreen',
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


    favouritesTab = () => {


        this.setState({ favouritesTabSelected: true, playLIst: false, allTracks: false })
    }


    playListFunction = () => {
        this.setState({ playLIst: true, allTracks: false, favouritesTabSelected: false })

    }

    allTracksFunction = () => {
        this.setState({ playLIst: false, allTracks: true, Tracks: MYTRACKS, favouritesTabSelected: false })
        console.log(this.state.data, "in data var")
    }

    render() {

        const swipeSettings = {
            autoClose: true,
        };

        var swipeoutBtns = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                onPress: () => {
                    this.deleteFunction();
                },
            }
        ]

        return (
            <View style={styles.container} pointerEvents={this.state.isDisabled ? "none" : "auto"}>



                {/* <View style={styles.appBar}/> */}



                {this.state.isAnimating &&
                    <ActivityIndicator size="large" color="#a1863e" animating={this.state.isAnimating} style={styles.loading} />
                }



                {/* <View style={{justifyContent: "center"}}> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, marginBottom: 25, }}>

                    <Text style={{ fontSize: 24, fontWeight: "900", fontFamily: "Gotham-Black", alignItems: "center", paddingLeft: 10 }}>Mu Meditation</Text>

                    <TouchableWithoutFeedback onPress={this.heartButtonAction} >
                        <View>

                            {/* <Image  source={hearticon} resizeMode="contain" style={{height: 30, width: 30, borderRadius: 12,marginRight: 10 }} /> */}


                        </View>
                    </TouchableWithoutFeedback>



                </View>


                {/* top two tabs */}

                <View style={styles.topTwoTabsContainer}>

                    <TouchableWithoutFeedback onPress={this.playListFunction}  >
                        <View>
                            <Text style={[(this.state.playLIst == true) ? { fontSize: 18, fontWeight: "bold", color: "#a1863e" } : { fontSize: 16 }, { flexDirection: "column", fontFamily: 'Gotham-Light' }]}>
                                Playlist
                                    </Text>

                            {
                                this.state.playLIst == true &&
                                <Text style={{ marginTop: -8, color: "#a1863e", fontWeight: "bold", textAlign: "center", paddingRight: 13 }}>___</Text>
                            }
                        </View>

                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.allTracksFunction} >
                        <View>
                            <Text style={[(this.state.allTracks == true) ? { fontSize: 18, fontWeight: "bold", color: "#a1863e" } : { fontSize: 16 }, { flexDirection: "column", fontFamily: 'Gotham-Light', }]}>
                                All Tracks
                                    </Text>
                            {
                                this.state.allTracks == true &&
                                <Text style={{ marginTop: -8, color: "#a1863e", fontWeight: "bold", textAlign: "center", paddingLeft: 11 }}>___</Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>



                    <TouchableWithoutFeedback onPress={this.favouritesTab} >
                        <View>
                            <Text style={[(this.state.favouritesTabSelected == true) ? { fontSize: 18, fontWeight: "bold", color: "#a1863e" } : { fontSize: 16 }, {flexDirection: "column", fontFamily: 'Gotham-Light', }]}>
                                Favourites
                                    </Text>
                            {
                                this.state.favouritesTabSelected == true &&
                                <Text style={{ marginTop: -8, color: "#a1863e", fontWeight: "bold", textAlign: "center", paddingLeft: 11 }}>___</Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>




                </View>

                {/* top two tabs */}


                {this.state.favouritesTabSelected &&

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.favoriteTracks}
                        style={{ marginBottom: 30, marginTop: 10, paddingRight: 12, paddingLeft: 12 }}
                        renderItem={({ item, index }) => {

                            console.log(item, "kjdkd7")
                            return (

                                <Swipeout  {...swipeSettings} right={swipeoutBtns} style={{ backgroundColor: "white" }} onOpen={() => { this.setItem(item) }}>

                                    <TouchableOpacity onPress={() => { this.playFavouriteTrackFunction(item) }} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" , paddingVertical:5}}>

                                        <View style={{
                                            shadowColor: 'gray',
                                            shadowOffset: { width: 0, height: 9 },
                                            shadowOpacity: 0.2,
                                            shadowRadius: 2,
                                            elevation: 1,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            minHeight: 85
                                        }}>

                                            <Image source={{ uri: item.imgUrl }} style={{ height: 57, width: 67, borderRadius: 12,  marginTop:-20 }} />

                                        </View>


                                        <View style={{ minHeight: 85, alignItems: "center", flex: 1, marginLeft: 20, flexDirection: "row", borderBottomColor: "#EFEEEF", borderBottomWidth: 1, }}>
                                            <View style={{ flex: 8, flexDirection: "column", }}>
                                                <Text style={{ fontFamily: 'Gotham-Bold', fontSize: 17, marginLeft: -5 }} >{item.name}</Text>
                                                <Text style={{ marginTop: 2, color: "#CFD3DA", fontWeight: "bold", fontSize: 15 }}>{item.songDuration}</Text>
                                            </View>
                                        </View>


                                    </TouchableOpacity>

                                </Swipeout>
                            )
                        }
                        }


                    />

                }



                {this.state.playLIst === true &&

                    <View style={{ flex: 1 }}>

                        <View style={{ flex: 7, paddingTop: 15 }}>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.playLists}
                                style={{ marginBottom: this.state.marginFromBottom }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity style={{ padding: 12 }} onPress={() => { this.goToPlaylistFunction(item) }}>
                                            <View style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                flexShrink:1
                                            }}>

                                                <View style={{
                                                    shadowColor: 'gray',
                                                    shadowOffset: { width: 0, height: 9 },
                                                    shadowOpacity: 0.2,
                                                    shadowRadius: 2,
                                                    elevation: 1,
                                                    flexShrink:1

                                                }}>

                                                    <Image source={(this.state.isInternetConnected === true) ? { uri: domain + item.img_url } : require('../assets/icons/music_icon.jpg')} style={{ height: 80, width: 95, borderRadius: 12, }} />
                                                    {/* <Image resizeMode="stretch" source={(this.state.isInternetConnected === true)?{ uri:domain+item.img_url}:{uri:domain+item.img_url}} style={{height: 80, width: 95, borderRadius: 12, }} /> */}

                                                </View>


                                                <Text style={{ marginLeft: 18, fontFamily: 'Gotham-Bold', fontSize: 16, textAlign:"left" }} >{item.name}</Text>


                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                                }


                            />

                        </View>

                        {console.log(this.state.purchase, "purchase is...")}

                        {this.state.purchase === "" &&


                            <View style={{ flex: this.state.flexValue, alignItems: "center", paddingTop: 10 }}>
                                <View style={{
                                    width: "100%",
                                    alignItems: "center",
                                    shadowColor: '#a1863e',
                                    shadowOffset: { width: 0, height: 9 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 2,
                                    elevation: 3,
                                    backgroundColor: "#0000",


                                }}
                                >
                                    <TouchableOpacity onPress={this.UpgradeFunction} style={{ alignItems: "center", width: "85%", borderRadius: 30, padding: 10, backgroundColor: "#a1863e", flexDirection: "row", justifyContent: "space-between", height: 55 }}>
                                        <Text style={{ color: "white", padding: 5, fontWeight: "bold", fontSize: 18, fontFamily: 'Gotham-Bold', marginLeft: 13 }}>Join the Membership</Text>

                                        <TouchableOpacity onPress={this.UpgradeFunction} style={{ paddingLeft: 12, paddingRight: 12, borderRadius: 15, backgroundColor: "white", padding: 9, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontSize: 11, color: "#a1863e", fontWeight: "bold", fontFamily: 'Gotham-Bold',paddingHorizontal:10 }}>Join</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>


                            </View>


                        }



                    </View>
                }




                {/* Block two for Showign All tracks */}


                {this.state.allTracks === true &&


                    <View style={{ flex: 1 }}>

                        <View style={{ flex: 8 }}>

                            <View style={{ padding: 12 }}>


                                {/* search bar */}
                                <View style={{ paddingBottom: 10, paddingTop: 20 }}>
                                    <View style={{
                                        shadowColor: 'silver',
                                        shadowOffset: { width: 1, height: 1.5 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 2,
                                        elevation: 1,

                                    }}>

                                        <TouchableOpacity style={{
                                            alignItems: "center", flexDirection: "row", backgroundColor: "white", height: 48, borderRadius: 25, borderColor: "#EFEEEF",
                                            borderWidth: 1
                                        }}>
                                            <Image source={SearchIcon} style={{ height: 21, width: 21, marginRight: 13, marginLeft: 25 }} />

                                            <TextInput
                                                onChangeText={text => this.searchFilterFunction(text)}
                                                autoCorrect={false}
                                                placeholder="Search"
                                                style={{ width: 260, height: 35 }}
                                            />
                                        </TouchableOpacity>


                                    </View>

                                </View>

                                {/* search bar */}
                            </View>



                            <View style={{ flex: 5, paddingLeft: 12 }}>

                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    style={{ marginTop: 7, marginBottom: this.state.marginFromBottom }}
                                    data={this.state.Tracks}
                                    renderItem={({ item, index }) => {



                                        return (

                                            <TouchableOpacity onPress={() => { this.playTrackFunction(item) }} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical:5 }}>

                                                <View style={{
                                                    shadowColor: 'gray',
                                                    shadowOffset: { width: 0, height: 9 },
                                                    shadowOpacity: 0.2,
                                                    shadowRadius: 2,
                                                    elevation: 1,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: 85,
                                                }}>

                                                    <Image resizeMode="stretch" source={(this.state.isInternetConnected === true) ? { uri: domain + item.imgUrl } : require('../assets/icons/music_icon.jpg')} style={{ height: 57, width: 67, borderRadius: 12, marginTop:-20 }} />

                                                </View>

                                                <View style={{ minHeight: 85, alignItems: "center", marginLeft: 15, flex: 1, flexDirection: "row", borderBottomColor: "#EFEEEF", borderBottomWidth: 1, }}>
                                                    <View style={{ flex: 8, flexDirection: "column", }}>
                                                        <Text style={{ fontFamily: 'Gotham-Bold', fontSize: 17, marginRight: 6 }} >{item.name}</Text>
                                                        <Text style={{ marginTop: 8, color: "#CFD3DA", fontWeight: "bold", fontSize: 15 }}>{item.songDuration}</Text>
                                                    </View>

                                                    {this.state.purchase === "" && item.lock === true &&

                                                        <View style={{
                                                            shadowColor: '#a1863e',
                                                            shadowOffset: { width: 1, height: 2 },
                                                            shadowOpacity: 0.2,
                                                            shadowRadius: 2,
                                                            elevation: 1,
                                                            paddingRight: 12
                                                        }}>
                                                            <Image style={{ height: 39, width: 39 }} source={LockIcon} />
                                                        </View>

                                                    }
                                                </View>

                                            </TouchableOpacity>




                                        )
                                    }
                                    }


                                />
                            </View>

                        </View>



                        {this.state.purchase === "" &&
                            <View style={{ flex: this.state.flexValue, marginTop: 5 }}>
                                <View style={{
                                    width: "100%",
                                    alignItems: "center",
                                    shadowColor: '#a1863e',
                                    shadowOffset: { width: 0, height: 9 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 2,
                                    elevation: 3,
                                    backgroundColor: "#0000",
                                }}
                                >
                                    <TouchableOpacity onPress={this.UpgradeFunction} style={{ alignItems: "center", width: "85%", borderRadius: 30, padding: 10, backgroundColor: "#a1863e", flexDirection: "row", justifyContent: "space-between", height: 55 }}>
                                        <Text style={{ color: "white", padding: 5, fontWeight: "bold", fontSize: 18, fontFamily: 'Gotham-Bold', marginLeft: 13 }}>Join the Membership</Text>

                                        <TouchableOpacity onPress={this.UpgradeFunction} style={{ paddingLeft: 12, paddingRight: 12, borderRadius: 15, backgroundColor: "white", padding: 8, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontSize: 11, color: "#a1863e", fontWeight: "bold", fontFamily: 'Gotham-Bold',paddingHorizontal:10 }}>Join</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>


                            </View>


                        }




                    </View>

                }

            </View>
        )
    }

}

const STATUSBAR_HEIGHT = Platform.OS === "android" ? 8 : 20;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        // backgroundColor: "#FDFEFE-#FFFAF7",
    },

    headingTxt: {
        fontSize: 24,
        fontWeight: "900",
        fontFamily: "Gotham-Black",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 25,
        paddingLeft: 10

    },
    headingTxtContainer: {

        justifyContent: "center"
    },

    topTwoTabsContainer: {
        flexDirection: "row",
        justifyContent : "space-evenly",
        width:"85%",
        alignSelf : "center"
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

})

