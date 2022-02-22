import React, { Component } from 'react';
import {
    View,StyleSheet, Text,TouchableWithoutFeedback,Keyboard,Dimensions,TouchableOpacity,TextInput,Alert, ActivityIndicator,Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import TopTitleBarComponent from '../components/TopTitleBarComponent';
const screenWidth = Dimensions.get("window").width
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import openEye from '../assets/icons/openEye.png';
import closeEye from '../assets/icons/closeEye.png';
// import Toast from 'react-native-toast-message';
// import { invokeApi } from '../Components/invokeApi';
// import { endPoint } from '../Components/EndPoint';


export default class SetNewPassword extends Component {

    constructor(props) {
        super(props);
        this.state= {
            oldPassword:'',
            newPassword:'',
            oldPasswordHide:true,
            newPasswordHide:true,
            confirmPassword:'',
            isAnimating: false,
            token:'',
    };
}



       componentDidMount = async() =>{
        
        // let Token =  await AsyncStorage.getItem("@token");
        // await this.setState({ token: Token,oldPassword:this.props.email });

       
    }

    
    




   

    newPasswordChangeHandler = (value) => {
        this.setState({ newPassword: value });
    }
    NewPasswordHandler = (value) => {
        this.setState({ newPassword: value });
    }
    ConfirmPasswordChangeHandler = (value) => {
        this.setState({ confirmPassword: value });
    }
    
    buBack = () => {

        Navigation.pop(this.props.componentId);
        
    }

   
   
// onpress function
    buSuccess = () => {
       


        
        if (this.state.newPassword == "") {
            alert('Please enter your new password')
           
        }
        else if(this.state.confirmPassword == "")
        {
            alert('Please enter your password again')
           
        }
        
        else if(this.state.newPassword.length<6)
        {
            alert('New password must be greater then 6')
           
        }
        else if(this.state.confirmPassword.length<6)
        {
            alert('Confirm password must be greater then 6')
           
        }
        
        else if (!this.state.newPassword==this.state.confirmPassword) {
            alert('Your new password and confirm password not match')
           
        }
        else
        {
           this.ApiHitting()
        }



    }
          // Api hitting for change password function
    ChangePasswordApi = async () => {
       

                 Navigation.push(this.props.componentId, {
                    component: {
                        name: 'learning.LoginScreen',
                        options: {
                            bottomTabs: { visible: false },
                        },
                        passProps:{
                            commingFrom:false,
                        }
                    }
                });
                // this.buBack()

               
            // })
            // .catch((error) => {
            //     this.setState({ isAnimating: false })
            //     alert(error)
            // });


    }

    PasswordShowAndHide=(item)=>{
        console.log(item,'item')
        
        if(item==='new')
        {
        this.setState({newPasswordHide:!this.state.newPasswordHide})
        }
        else
        {
        this.setState({confirmPasswordHide:!this.state.confirmPasswordHide})
        }
    }

    ApiHitting=async()=>{
        await this.setState({isAnimating:true})
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            };

            let body = {
                email:this.props.email,
                password:this.state.newPassword,
                confirm_password:this.state.confirmPassword,
            };

            
               
                    console.log( response.message,' response.message')
                    await this.setState({isAnimating: false});
                    this.ChangePasswordApi()
                    // StartTabs();
                    //   this.gotochangepassword()

                
                
                
    }
    render() {
        return (
      
    
    <View style={styles.container}>

    <TopTitleBarComponent leftIcon={true} centerText={''} leftIconAction={this.buBack} ></TopTitleBarComponent>
    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
            <Text style={styles.heading}>Set New Password</Text>
            <Text style={{ color: '#737373', marginBottom: 40,fontSize:13,marginTop:1,}}>Enter new Paasword carefuly</Text>
            
            <Text style={styles.label}>Email</Text>
                            <View style={{paddingVertical:8,backgroundColor:'#F8F8F8',borderRadius:5,paddingHorizontal:5,flexDirection:'row'}}>
                                <Text
                                    style={styles.textField}
                                    // onChangeText={this.oldPasswordChangeHandler}
                                   
                                    >{this.props.email}</Text>
                            </View>
                            <Text style={styles.label}>New Password</Text>
                            <View style={{paddingVertical:8,backgroundColor:'#F8F8F8',borderRadius:5,paddingHorizontal:5,flexDirection:'row'}}>
                                <TextInput
                                    style={styles.textField}
                                    placeholder='**********'
                                    placeholderTextColor='#989898'
                                    onChangeText={this.newPasswordChangeHandler}
                                    keyboardType='default'
                                    textContentType={"password"}
                                    autoCapitalize='none'
                                    secureTextEntry={this.state.newPasswordHide}
                                    >
                                </TextInput>
                                <TouchableOpacity style={{flex:0.5,alignItems:'center',justifyContent:'center'}} onPress={()=>{this.PasswordShowAndHide('new')}}>
                                <Image style={{width:20,height:20}} source={(this.state.newPasswordHide==false)?openEye:closeEye}></Image>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.label}>Confirm Password</Text>
                            <View style={{paddingVertical:8,backgroundColor:'#F8F8F8',borderRadius:5,paddingHorizontal:5,flexDirection:'row'}}>
                                <TextInput
                                    style={styles.textField}
                                    placeholder='**********'
                                    placeholderTextColor='#989898'
                                    onChangeText={this.ConfirmPasswordChangeHandler}
                                    keyboardType='default'                                    
                                    textContentType={"password"}
                                    autoCapitalize='none'
                                    secureTextEntry={this.state.confirmPasswordHide}>
                                </TextInput>
                                <TouchableOpacity style={{flex:0.5,alignItems:'center',justifyContent:'center'}} onPress={()=>{this.PasswordShowAndHide('confirm')}}>
                                <Image style={{width:20,height:20}} source={(this.state.confirmPasswordHide==false)?openEye:closeEye}></Image>
                                </TouchableOpacity>
                            </View>
                <View style={{marginBottom:20}}>

                    <TouchableOpacity style={styles.button} onPress={this.buSuccess}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>



    {this.state.isAnimating &&
        <ActivityIndicator size="large" color="#a1863e" animating={this.state.isAnimating} style={styles.loading} />
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
        // marginLeft: 15,
        justifyContent: 'center',

    },
    backIcon: {
        height: 30,
        width: 30,
    },
    logo: {
        height: 64,
        width: 100,
        marginTop: 55,
        // marginLeft: 30,
        backgroundColor: 'red'
    },
    heading: {
        marginTop: 40,
        // marginLeft:20,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    label: {
        // marginLeft: 30,
        marginTop: 15,
        fontWeight: '500',
        fontSize: 14,
        color: '#737373'
    },
    textField: {
        flex:4,
        marginBottom: 0,
        paddingVertical:5,
        color: 'black'
    },
    seperater: {
        height: 1,
        marginBottom: 10,
        backgroundColor: '#484848'
    },
    ForgotPassword: {
        alignSelf: 'flex-end',
        marginRight: 30,
        marginTop: 16,
        color: '#010a0a',
        fontSize: 15
    },
    button: {
        marginTop: 50,
        alignSelf: 'center',
        height: 55,
        width: screenWidth - 40,
        backgroundColor: '#a1863e',
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
        marginTop: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 100,

    },
    newUser: {
        fontSize: 15,
        color: '#010a0a',
        color: '#FFFFFF',
    },
    register: {
        color: '#50E02D',
        fontSize: 15,
        fontWeight: 'bold'
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