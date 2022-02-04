import React, { Component } from 'react';

import email from 'react-native-email'

import firebase from "react-native-firebase";

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
    ActivityIndicator

} from 'react-native';
import { Navigation } from 'react-native-navigation';
import LeftArrow from '../assets/icons/LeftArrow.png';
import Swipeout from 'react-native-swipeout';
import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from '@react-native-community/async-storage';



export default class Settings extends Component {
 
    constructor(){
        super();
        this.state={
            offlineSongs:[],
            purchase:"",
            currentItem:"",
            isAnimating:false,
            isDisabled:false,
        }
    }

    async componentDidMount(){


        // if(Platform.OS == "android"){

        
        // StatusBar.setBarStyle('dark-content');
        // StatusBar.setBackgroundColor("white");
        
        // }
       

        firebase.analytics().logEvent("Manage_Storage_Screen");
        firebase.analytics().setCurrentScreen("Manage_Storage_Screen","Manage_Storage_Screen")
        this.setState({isAnimating:true, isDisabled:true});
        let offlineSongs = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
        console.log(offlineSongs, "offline songs manage storage");
       this.setState({offlineSongs:offlineSongs});


       this.setState({isAnimating:false, isDisabled:false})

    }




    playTrackFunction = (item) => {


        console.log(item, "item ashiuu")
      
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'poisedAthleteMeditation.playScreen',
                    passProps: {
                        track: item,
                        fromMnagaeStorage:""
                    },
                    options: {
                        bottomTabs: { visible: false },
                    }
                }
            });
        
    }

    setItem = (item)=>{

        console.log(item, "fatima")
        this.setState({currentItem:item})
    
    }


    BackFunction = ()=>{
      
        Navigation.pop(this.props.componentId);
    }


    deleteFunction = async()=> {

        console.log(this.state.currentItem.songUrl, "kjskhdsjhdshdsh") 

        RNFetchBlob.fs.unlink(this.state.currentItem.songUrl).then(() => {
          })


        //   remove from offline array
                    let arr = [];
                    let offlineSongs = JSON.parse(await AsyncStorage.getItem('OfflineSongs'));
                    console.log(offlineSongs, "ooooopp");
                    for(let i = 0; i<offlineSongs.length; i++)
                    {
                        if(this.state.currentItem._id === offlineSongs[i]._id){
                        }
                        else{
                        arr.push(offlineSongs[i])
                        }
                    }
                    console.log(arr, "arr after removed");
                    this.setState({offlineSongs:arr})
                    await  AsyncStorage.setItem("OfflineSongs", JSON.stringify(arr));
         //   remove from offline array




        //  remove from fvrts array
                let arr2 = [];
                let favoriteTracksAsync = JSON.parse(await AsyncStorage.getItem('FavoriteTracks'));
                console.log(favoriteTracksAsync, "favoriteTracksAsyncooooopp");
                for(let i = 0; i<favoriteTracksAsync.length; i++)
                {
                    if(this.state.currentItem._id === favoriteTracksAsync[i]._id){
                    }
                    else{
                    arr2.push(favoriteTracksAsync[i])
                    }
                }
                console.log(arr2, "arr after removed");
                await  AsyncStorage.setItem("FavoriteTracks", JSON.stringify(arr2));
         //  remove from fvrts array
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

                <View style={{marginTop:20}} >
                    <View style={{flexDirection:"row", alignItems:"center"}}>

                        <TouchableOpacity onPress={this.BackFunction} style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                            <Image source={LeftArrow} style={{height:16, width:10}} />
                            <Text style={styles.headingTxt}>Downloaded Episodes:</Text>
                        </TouchableOpacity>

                        </View>
                </View>


                     <View>
                            <FlatList
                                    showsVerticalScrollIndicator={false}
                                        style={{marginTop:20}}
                                        data={this.state.offlineSongs}
                                        renderItem={({ item, index }) => {

                                            return (


                                                <Swipeout  {...swipeSettings} right={swipeoutBtns}  style={{ backgroundColor:"white"}} onOpen={() => {this.setItem(item)}}>
                                                    <TouchableOpacity style={{ flexDirection: "row",alignItems:"center", justifyContent:"center"}}>
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
                                                        
                                                        <View style={{height:85,alignItems:"center",marginLeft:15,flex:1, flexDirection:"row",  borderBottomColor: "#EFEEEF", borderBottomWidth: 1, }}>
                                                            <View style={{flex:8,flexDirection: "column",  }}>
                                                                <Text style={{ fontFamily: 'Gotham-Bold', fontSize: 18}} >{item.name}</Text>
                                                                <Text style={{marginTop: 8, color: "#CFD3DA" ,fontWeight:"bold", fontSize:15}}>9:45</Text>
                                                            </View>
                                                        </View>        
                                                </TouchableOpacity>
                                            </Swipeout>
                                            )
                                        }
                                        }
                                    />
                </View>





            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:12,
    },
    headingTxt: {
        fontSize: 20,
        fontWeight: "900",
        fontFamily: "Gotham-Black",
        paddingLeft:15
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