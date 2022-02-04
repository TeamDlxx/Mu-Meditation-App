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
    Image,
    Platform,
    TextInput
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';




import { WebView } from 'react-native-webview';

import LeftArrow from '../assets/icons/LeftArrow.png';
import { Navigation } from 'react-native-navigation';

import firebase from "react-native-firebase";




export default class HomeScreen extends Component{
    
    BackFunction = ()=>{
       
        Navigation.pop(this.props.componentId);
    }

async componentDidMount(){

    // if(Platform.OS == "android"){
    //     StatusBar.setBarStyle('dark-content');
    //     StatusBar.setBackgroundColor("white");
    // }

    firebase.analytics().logEvent("termOfUse_Screen");
    firebase.analytics().setCurrentScreen("tremOfUse_Screen","termOfUse_Screen")

    SplashScreen.hide();
   
}
    render(){
        return(
            <View style={styles.container}>



                    <View style={{marginTop:8}} >
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <TouchableOpacity onPress={this.BackFunction} style={{alignItems:"center", justifyContent:"center",padding:5, marginTop:1, flexDirection:"row"}} >

                                <Image source={LeftArrow} style={{height:16, width:10}} />
                           
                           
                            <Text style={styles.headingTxt}>Terms of use</Text>
                         

                            </TouchableOpacity>
                        </View>
                    </View>




                <View style={{flex:1}}>
                        <WebView
                            source={{ html: this.props.termOfUseString }}
                            automaticallyAdjustContentInsets={false}
                            style={{marginTop:20, fontSize:16}}
                        />
                    {/* <Text style={{marginTop:20}}>

                        {this.props.termOfUseString}
                   
                    </Text> */}
                </View>



            </View>
        )
    }
}

const styles= StyleSheet.create({

    container:{
        flex:1,
        padding:12
    },
    headingTxt: {
        fontSize: 25,
        fontWeight: "900",
        fontFamily: "Gotham-Black",
        paddingLeft:20,
        
        

    },


})