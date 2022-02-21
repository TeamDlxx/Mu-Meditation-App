
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TextInput,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
} from "react-native";


import TopTitleBarComponent from './../Components/TopTitleBarComponent'
import OTPInputView from '@twotalltotems/react-native-otp-input'
// import {domain} from "../Api/Api";
// import { Home } from '../StringFile/Strings';
// import Toast from 'react-native-toast-message';


const { Navigation } = require('react-native-navigation');
const screenWidth = Dimensions.get("window").width

let textColor = '#353636'
let textInputBg = '#353636'
export default class OTPScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserEmail: "",
            isAnimating: false,
            otp:'',
        };
    }

    gotochangepassword=()=>{
                      // Navigate to SetNewPassword

        Navigation.push(this.props.componentId, {
                component: {
                    name: 'poisedAthleteMeditation.SetNewPassword',
                    options: {
                        bottomTabs: { visible: false },
                    },
                    passProps:{
                        email:this.props.email,
                    },
                }
            });
    }

    buBack = () => {
        Navigation.pop(this.props.componentId)
    }
    // Api hitting for forget password otp code 
    gotoChangePassword = async () => {

    await this.ApiHitting()
            

    }

    
    ApiHitting=async()=>{
        await this.setState({isAnimating:true})
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            };

            let body = {
                email:this.props.email,
                verification_code:this.state.otp,
            };
            console.log(body,'body')

            this.gotochangepassword()

    }

    
  




    render() {
        return (
            <View style={styles.container}>

                <TopTitleBarComponent leftIcon={true} centerText={''} leftIconAction={this.buBack} ></TopTitleBarComponent>


                <ScrollView>

                    <View style={{ marginLeft: 20, marginRight: 20 }}>
                        <Text style={styles.heading}>Verification code</Text>
                        <Text style={{ color: '#737373', marginBottom: 40,fontSize:13,marginTop:1, }}>Please enter the code carefully.</Text>

                        <View>

                        <OTPInputView
                                    style={{ width: '100%', height: 70,marginTop:30,justifyContent:'center',alignSelf:'center' }}
                                    pinCount={6}
                                    placeholderCharacter="x"
                                    placeholderTextColor="#737373"
                                    selectionColor={textColor}
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={{ height: 50, width: 50, borderRadius: 5, borderWidth: 0, backgroundColor: '#f9f9f9', color: '#737373', fontSize: 23, fontWeight: '700' }}
                                    onCodeFilled={(code => {
                                        this.setState({ otp: code })
                                        console.log(`Code is ${code}, you are good to go!`)
                                    })}
                                />
                        </View>

                        <View   >

                            <TouchableOpacity style={styles.button} onPress={this.gotoChangePassword}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </ScrollView>
                {this.state.isAnimating &&
                    <ActivityIndicator size="large" color="#6159C4" animating={this.state.isAnimating} style={styles.loading} />
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        alignContent: 'center',

    },
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    back: {
        height: 50,
        width: 50,
        justifyContent: 'center'
    },
    backIcon: {
        height: 30,
        width: 30,
    },
    logo: {
        height: 64,
        width: 100,
        marginTop: 55,
    },
    heading: {
        marginTop: 40,
        // marginLeft:20,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    label: {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: '600',
        fontSize: 16,
        color: '#FFF'
    },
    label1: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '300',
        color: '#FFF',
        fontSize: 13,
    },
    textField: {
        height: 35,
        marginBottom: 3,
        color: '#FFF'
    },
    seperater: {
        height: 1,
        marginBottom: 10,
        backgroundColor: '#d5c9de'
    },
    button: {
        marginTop: 40,
        marginBottom: 10,
        alignSelf: 'center',
        height: 55,
        width: screenWidth - 40,
        backgroundColor: '#6159C4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#111111",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    bottomView: {
        marginTop: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    newUser: {
        fontSize: 15,
        color: '#010a0a',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});