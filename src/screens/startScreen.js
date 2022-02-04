import React,{ Component } from "react";
import { View, Text } from "react-native";
import appLogo from '../assets/icons/logo.png'

import {StyleSheet,Image} from "react-native"

export default class StartScreen extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <View style={styles.container}>

                {/* <Image source={appLogo} style={{height:100, width:100}} /> */}
                <Text>hello world</Text>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"
    }
})