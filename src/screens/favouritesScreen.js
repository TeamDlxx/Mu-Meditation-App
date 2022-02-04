import React, {Component} from 'react';
import SearchIcon from '../assets/icons/search-icon.png';
import {Navigation} from 'react-native-navigation';
import Swipeout from 'react-native-swipeout';
import Flower from '../assets/icons/download.jpeg'
import LockIcon from '../assets/icons/unlock.png';
import LeftArrow from '../assets/icons/LeftArrow.png'
import {domain} from '../components/utilities'
import RNFetchBlob from "rn-fetch-blob";




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
    ActivityIndicator
  } from 'react-native';
  import firebase from "react-native-firebase";
import { Platform } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


  export default class HomeScreen extends Component{

    constructor(){
        super();
        this.state={
            purchase:"",
            favoriteTracks:[],
            currentItem:"",
            isAnimating:false,
            isDisabled:false,
        }
    }

   async componentDidMount(){

   

    this.setState({isAnimating:true, isDisabled:true});
    const DeviceToken = JSON.parse(await AsyncStorage.getItem('DeviceToken'));

    const FavoriteTracks = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
    await this.setState({favoriteTracks:FavoriteTracks});
    console.log(this.state.favoriteTracks, "i added it");
    this.setState({isAnimating:false, isDisabled:false});


    firebase.analytics().logEvent("Favorite_Screen");
    firebase.analytics().setCurrentScreen("Favorite_Screen","Favorite_Screen")

    }



    // bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(async({ selectedTabIndex, unselectedTabIndex }) => {
    //     if(selectedTabIndex == "1"){
    //         this.onTabChange();
    //     }
    
    // });


    setItem = (item)=>{

        console.log(item, "fatima")
        this.setState({currentItem:item})
    
    }


    // onTabChange = async() =>{

   

    //     this.setState({isAnimating:true, isDisabled:true});
    //      const DeviceToken = JSON.parse(await AsyncStorage.getItem('DeviceToken'));

    //      const FavoriteTracks = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
    //      await this.setState({favoriteTracks:FavoriteTracks});
    //      console.log(this.state.favoriteTracks, "i added it");
    //      this.setState({isAnimating:false, isDisabled:false});
    // }







    deleteFunction = async() => {

            console.log(this.state.currentItem.songUrl, "kjskhdsjhdshdsh"); 
            RNFetchBlob.fs.unlink(this.state.currentItem.songUrl).then(() => { 
            })


            // remove from favorites
                    let arr = [];
                    let favoriteSongs = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
                    console.log(favoriteSongs, "ooooopp");
                    for(let i = 0; i<favoriteSongs.length; i++)
                    {
                        if(this.state.currentItem._id === favoriteSongs[i]._id){
                        }
                        else{
                        arr.push(favoriteSongs[i])
                        }
                    }
                    console.log(arr, "arr after removed");
                    this.setState({favoriteTracks:arr})
                    await  AsyncStorage.setItem("FavoriteTracks", JSON.stringify(arr));
            // remove from favorites





        //   remove from offline array
              let arr2 = [];
              let offlineSongs = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
              console.log(offlineSongs, "ooooopp");
              for(let i = 0; i<offlineSongs.length; i++)
              {
                  if(this.state.currentItem._id === offlineSongs[i]._id){
                  }
                  else{
                    arr2.push(offlineSongs[i])
                  }
              }
              console.log(arr2, "arr after removed");
              await  AsyncStorage.setItem("OfflineSongs", JSON.stringify(arr2));
   //   remove from offline array

           
    }

refresh = async() =>{

    const FavoriteTracks = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
    
    await this.setState({favoriteTracks:FavoriteTracks});

}

    playTrackFunction = (item) => {

            Navigation.push(this.props.componentId, {
                component: {
                    name: 'poisedAthleteMeditation.playScreen',
                    passProps: {
                        track: item,
                        FromFavorites:"",
                        refresh:this.refresh,
                        tracksArray: this.state.favoriteTracks
                    },
                    options: {
                        bottomTabs: { visible: false },
                        popGesture: false
                    }
                }
    
            });
        }




    BackFunction = async() => {
        
        // Navigation.pop(this.props.componentId);

     

    }

    

    render(){

        const swipeSettings = {
            autoClose: true,
            };

        var swipeoutBtns = [
            {
              text: 'Delete',
              backgroundColor:'red',
              onPress : () =>{
                this.deleteFunction();
              },
            }
          ]

      
        return(
            <View style={styles.container} pointerEvents={this.state.isDisabled ? "none" : "auto"}>
               
                 {this.state.isAnimating &&
             <ActivityIndicator size="large" color="#497CF0" animating={this.state.isAnimating}  style={styles.loading}/>
        }

                    {/* <View style={styles.headingTxtContainer}>
                        <Text style={styles.headingTxt}>Favorites</Text>
                    </View> */}
                 <View style={{ flexDirection: "row",height: 50 }}>

                        <View style={{marginTop:8}} >
                            <View style={{flexDirection:"row", alignItems:"center"}}>

                                <TouchableOpacity onPress={this.BackFunction} style={{flexDirection:"row", alignItems:"center"}} >
                                    {/* <Image source={LeftArrow} style={{height:16, width:10}} /> */}
                                    <Text style={styles.headingTxt}>Favorites</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                 </View>



                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.favoriteTracks}
                    style={{ marginBottom: 30, marginTop:10, paddingRight:12, paddingLeft:12 }}
                    renderItem={({ item, index }) => {

                        console.log(item, "kjdkd7")
                return (

                    <Swipeout  {...swipeSettings} right={swipeoutBtns}  style={{ backgroundColor:"white"}} onOpen={() => {this.setItem(item)}}>
    
                            <TouchableOpacity onPress={() => {this.playTrackFunction(item)}} style={{ flexDirection: "row",alignItems:"center", justifyContent:"center"}}>

                                <View style={{
                                    shadowColor: 'gray',
                                    shadowOffset: { width: 0, height: 9 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 2,
                                    elevation: 1,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    height:85
                                }}>

                        

                                    <Image source={{uri:item.imgUrl}} style={{ height: 57, width: 67, borderRadius: 12}} />

                                </View>


                                <View style={{height:85,alignItems:"center",flex:1,marginLeft:20, flexDirection:"row",  borderBottomColor: "#EFEEEF", borderBottomWidth: 1, }}>
                                    <View style={{flex:8,flexDirection: "column",}}>
                                        <Text style={{ fontFamily: 'Gotham-Bold', fontSize: 19, marginLeft:-5}} >{item.name}</Text>
                            <Text style={{marginTop: 8, color: "#CFD3DA" ,fontWeight:"bold", fontSize:15}}>{item.songDuration}</Text>
                                    </View>
                                </View>
                                

                        </TouchableOpacity>

                    </Swipeout>
                )
    }
}


/>     
    </View>
        )
}

}


const STATUSBAR_HEIGHT = Platform.OS === "android"?8:20;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 10,
        paddingLeft:10,
        paddingBottom:10
    },
    headingTxt: {
        fontSize: 24,
        fontWeight: "900",
        fontFamily: "Gotham-Black",
        paddingLeft:10

    },
    headingTxtContainer: {
        height: 45,
        justifyContent: "center",
        marginTop:5
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
        backgroundColor:'#6C97F8',
        height: APPBAR_HEIGHT,
        flexDirection: 'row',
        width:"100%",
        alignItems:"center"
      },
    
})