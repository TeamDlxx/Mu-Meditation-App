import React, {Component} from 'react';
import SearchIcon from '../assets/icons/search-icon.png';

import LockIcon from '../assets/icons/unlock.png';
import LeftArrow from '../assets/icons/LeftArrow.png'
import Flower from '../assets/icons/download.jpeg'
import {domain} from '../components/utilities'

import RNFetchBlob from "rn-fetch-blob";

import RNIap, {purchaseErrorListener,purchaseUpdatedListener} from 'react-native-iap';

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
    TextInput,
    ActivityIndicator,
    Platform
  } from 'react-native';
import { Navigation } from 'react-native-navigation';

import AsyncStorage from '@react-native-community/async-storage';


import firebase from "react-native-firebase";

// const MyStatusBar = ({backgroundColor, ...props}) => (
//     <View style={[styles.statusBar, { backgroundColor }]}>
//       <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//     </View>
//   );


export default class HomeScreen extends Component{

    constructor(){
        super();
        this.state={
            purchase:"",
            tracks:"",
            playListName:"",
            isAnimating:false,
            isDisabled:false,
            flexValue:0
        }
    }



        async componentDidMount()
        {

         
            let purchaseFromStore = JSON.parse(await AsyncStorage.getItem('ActiveOffer'));
            console.log(purchaseFromStore, "purchaes in playlist sreen???");
            if(purchaseFromStore !== "" && purchaseFromStore !== null && purchaseFromStore !== undefined){
                await this.setState({purchase:purchaseFromStore});
                // await this.setState({purchase:""});
            }    

            firebase.analytics().logEvent("Playlist_Screen");
            firebase.analytics().setCurrentScreen("Playlist_Screen","Playlist_Screen");


            if(Platform.OS =="android"){
                this.setState({flexValue:1.5})
            }
            else{               
                this.setState({flexValue:1})
            }

            await this.setState({isAnimating:true, isDisabled:true});




            let newArray = [];
            let newArray2 = [];
            let tracksArry=[]

            for(let i = 0; i<this.props.playList.tracks.length; i++){
                if(this.props.playList.tracks[i].lock === false){
                    newArray.push(this.props.playList.tracks[i])
                }
                else{
                    newArray2.push(this.props.playList.tracks[i]);
                }
            }

            tracksArry = [...newArray, ...newArray2];

            console.log(tracksArry, "playlist after arrange")


            console.log(this.props.playList, "recieved complete playlist")

            this.props.playList.tracks = tracksArry;



            await this.setState({tracks:this.props.playList, playListName:this.props.playList.name});




            console.log(this.state.tracks, "dhgdghshshgsgdgsds")

            console.log(this.state.tracks.tracks.length, "tracks in playlist screen");
            this.setState({isAnimating:false, isDisabled:false});


    
        }


    playTrackFunction = (item) =>{
        
        if(this.state.purchase === "" && item.lock === true){
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'poisedAthleteMeditation.upgradeScreen',
                    passProps: {
                        playList: "abc",
                        refresh : this.refresh
                       
                    },
                    options: {
                        bottomTabs: { visible: false },
                        popGesture: false
                    }
                  
                }
            });
        }

        else{
            
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'poisedAthleteMeditation.playScreen',
                    passProps: {
                        track:item,
                        playListName:this.state.playListName,
                        tracksArray : this.state.tracks.tracks,
                        refresh : this.refresh
                    },
                    options: {
                        bottomTabs: { visible: false },
                        popGesture: false
                    }  
                }
            });
        }    
    }



    refresh = async()=>{
        let currentPurchase = JSON.parse(await AsyncStorage.getItem('ActiveOffer'));


        if(currentPurchase !== "" && currentPurchase !== undefined && currentPurchase !== null){
          await this.setState({purchase : currentPurchase})
        }
        await this.setState({isAnimating:false, isDisabled:false});  
    }



    UpgradeFunction = async() => {
        let initResponse = JSON.parse(await AsyncStorage.getItem('InitResponse'));
        Navigation.push(this.props.componentId, {
            component: {
                name: 'poisedAthleteMeditation.upgradeScreen',
                passProps: {
                    playList:"abc",
                    refresh : this.refresh,
                    privacyPolicyString  : initResponse.data.privacyPolicy,
                    termOfUseString : initResponse.data.termsOfUse
                },
                
                options: {
                    bottomTabs: { visible: false },
                } 
            }      
        }); 
}


    BackFunction = ()=>{
        Navigation.pop(this.props.componentId)
    }

    render(){

      console.log(this.state.purchase, "dhwui")
        return(
            <View style={styles.container} pointerEvents={this.state.isDisabled ? "none" : "auto"}>



                {this.state.isAnimating &&
                        <ActivityIndicator size="large" color="#497CF0" animating={this.state.isAnimating}  style={styles.loading}/>
                }

                <View style={{marginTop:8}} >
                    <View style={{flexDirection:"row", alignItems:"center"}}>

                        <TouchableOpacity  onPress={this.BackFunction} style={{alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
                              <Image source={LeftArrow} style={{height:18, width:10,marginRight:5}} />
                    
                            <Text style={styles.headingTxt}>{this.state.playListName}</Text>
                         </TouchableOpacity>
                        </View>
                </View>


                <View style={{ flex: 1 }}>


    <View style={{ paddingTop: 10, flex: 1 }}>

<View style={{flex:7}}>

{this.state.tracks.tracks !== undefined && 



<FlatList
        showsVerticalScrollIndicator={false}
        data={this.state.tracks.tracks}
        style={{ marginBottom: 30, marginTop:15,paddingLeft:12 }}
        renderItem={({ item, index }) => {

        return (

            
          
            <TouchableOpacity onPress={() => {this.playTrackFunction(item)}} style={{ flexDirection: "row",alignItems:"center", justifyContent:"center"}}>

            <View style={{
                shadowColor: 'gray',
                shadowOffset: { width: 0, height: 9 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 1,
                alignItems:"center",
                justifyContent:"center",
                minHeight:85
            }}>

            <Image source={(this.props.connected === false)?require('../assets/icons/music_icon.jpg'):{uri:domain+item.imgUrl}} style={{height: 57, width: 67, borderRadius: 12, marginTop:-20}} />

            </View>
            
            <View style={{minHeight:85,marginVertical:5,alignItems:"center",marginLeft:15,flex:1, flexDirection:"row", borderBottomColor: "#EFEEEF", borderBottomWidth: 1, }}>
                <View style={{flex:8,flexDirection: "column",  }}>
                    <Text style={{ fontFamily: 'Gotham-Bold', fontSize: 16,marginRight:10}} >{item.name}</Text>
                    <Text style={{marginTop: 8, color: "#CFD3DA" , fontWeight:"bold", fontSize:15}}>{item.songDuration}</Text>
                </View>

                {this.state.purchase === "" && item.lock === true &&
                
                <View style={{
                    shadowColor: '#497CF0',
                     shadowOffset: { width: 1, height: 2 },
                     shadowOpacity: 0.2,
                     shadowRadius: 2,
                     elevation: 1,
                     paddingRight:12
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
    }

    </View>
    {this.state.purchase === "" && 
        <View style={{flex:this.state.flexValue}}>

      
            <View style={{
                marginBottom: 30,
                width: "100%",
               
                alignItems: "center",
                flex: 1,
                shadowColor:'#497CF0',
                shadowOffset: { width: 0, height: 9 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 3,
                backgroundColor: "#0000"
            }}
            >
                <TouchableOpacity onPress={this.UpgradeFunction} style={{ alignItems:"center",width: "85%", borderRadius: 25, padding: 10, backgroundColor: "#497CF0", flexDirection: "row", justifyContent: "space-between", height: 55 }}>
                    <Text style={{ color: "white", padding: 5, fontWeight: "bold", fontSize: 16, fontFamily: 'Gotham-Bold', marginLeft:10 }}>Try Premium</Text>

                    <TouchableOpacity onPress={this.UpgradeFunction} style={{ paddingLeft: 12, paddingRight: 12, borderRadius: 15, backgroundColor: "white", padding: 9, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 11, color: "#497CF0", fontWeight: "bold", fontFamily: 'Gotham-Bold' }}>Upgrade</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
    

        </View>
       

        }
    </View>




</View>



            </View>
        )
    }
}

const STATUSBAR_HEIGHT = Platform.OS === "android"?8:20;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:12,
        paddingLeft:12,
        paddingBottom:12,
        paddingRight:3
    },
    headingTxt: {
        fontSize: 20,
        fontWeight: "900",
        fontFamily: "Gotham-Black",
        paddingLeft:4,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
      },
      appBar: {
        backgroundColor:'#6C97F8',
        height: APPBAR_HEIGHT,
        flexDirection: 'row',
        width:"100%",
        alignItems:"center"
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