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

import LeftArrow from '../assets/icons/LeftArrow.png';
import logo from '../assets/icons/logo.png';
import { Navigation } from 'react-native-navigation';
import firebase from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';



let purchaseFromStore =""


export default class Upgrade extends Component {

    constructor(){
        super();
        this.state={
            currentPurchase:"",
            isAnimating:false,
            isDisabled:false,
        }
    }


    async componentDidMount(){

        // if(Platform.OS == "android"){
        //     StatusBar.setBarStyle('dark-content');
        //     StatusBar.setBackgroundColor("white")
        // }

       
       
        firebase.analytics().logEvent("Current_Plan");
        firebase.analytics().setCurrentScreen("Current_Plan_Screen","Current_Plan_Screen");

        this.setState({
                        isAnimating:true,
                        isDisabled:true,
                    })

         purchaseFromStore = JSON.parse(await AsyncStorage.getItem('ActiveOffer'));
        console.log(purchaseFromStore, "purchase from store in current plan screen");


        if(purchaseFromStore.productId === "lifetimesubscription"){

            this.setState({currentPurchase:"Your have currently subscribed for life time subscription."})
            console.log(this.state.currentPurchase);

        }

        else if(purchaseFromStore.productId === "onemonthsubscription"){
           
            this.setState({currentPurchase:"Your have currently subscribed for one month subscription."})
            console.log(this.state.currentPurchase);

        }

        else if(purchaseFromStore.productId === "threemonthssubscription"){

            this.setState({currentPurchase:"Your have currently subscribed for three months subscription."})
            console.log(this.state.currentPurchase);

        }


        this.setState({
            isAnimating:false,
            isDisabled:false,
        })
       
    }






    BackFunction = ()=>{
        // this.props.changeBarcolor();
        Navigation.pop(this.props.componentId);
    }

    render(){
        return(
            <View style={styles.container} pointerEvents={this.state.isDisabled ? "none" : "auto"}>



                 {this.state.isAnimating &&
             <ActivityIndicator size="large" color="#497CF0" animating={this.state.isAnimating}  style={styles.loading}/>
        }

                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={this.BackFunction}>
                        <Image source={LeftArrow} style={{height:16, width:10, marginTop:6, marginRight:48}} />
                    </TouchableOpacity> 
                    <Text style={styles.headingTxt}>Active Subscription</Text>
                </View>




                <View style={styles.subContainer}>

                   

                    <Text style={{fontFamily: 'Gotham-Bold',fontSize: 20,color:"#497CF0", textAlign:"center"}}>Your current active offer</Text>
                    <View style={{alignItems:"center", justifyContent:"center", paddingTop:30}}>
                    <Image source={logo} style={{height:70, width:70, }}></Image>
                    </View>
            
                    <Text style={{textAlign:"center", justifyContent:"center", marginTop:30, fontFamily:"Gotham-Bold"}}>{this.state.currentPurchase}</Text>
                    <Text style={{textAlign:"center",fontSize:12,justifyContent:"center", marginTop:30 }}>Cancel subscription any time. Subscription automatically renews unless auto-renew is turned off at least 24-hours  before the end of the current period by going to your iOS Account  Settings after purchase. Payment will be charged to iTunes Account. Any unused portion of free trial period, if offered, will be forfeited when you purchase a subscription.</Text>
                    
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
        padding:14,
        alignItems:"center"
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
    

    headingTxt: {
        fontSize: 24,
        fontWeight: "900",
        fontFamily: "Gotham-Black",
        flex:6
      

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
    subContainer:{
        marginTop:50,
    }
})