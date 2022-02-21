import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {Navigation} = require('react-native-navigation');
const screenWidth = Dimensions.get('window').width;
import openEye from '../assets/icons/openEye.png';
import closeEye from '../assets/icons/closeEye.png';
import AsyncStorage from '@react-native-community/async-storage';
import startMainTabs from './StartMainTabs'
// import '' from ''
import { domain } from "../components/utilities"

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: '',
      UserPassword: '',
      UserPasswordHide: true,
      isAnimating: false,
      time_zone: '',
      loginRes: '',
      commingFrom: this.props.commingFrom,
      complete_data: this.props.complete_data,
      back_icon: false,
      
    };
  }

  async componentDidMount() {
    
    SplashScreen.hide();
    
  }

  
  // navigate sign up screen
  buSignUp = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.SignUpScreen',
        options: {
          bottomTabs: {visible: false},
        },
        passProps: {},
      },
    });
    // Navigation.setRoot({

    //     root: {
    //       stack: {
    //         children: [
    //           {
    //             component: {
    //               name: 'learning.SignUpScreen',
    //               options: {
    //                             bottomTabs: { visible: false },
    //                         },
    //             }

    //           }
    //         ],
    //       }
    //     }
    //   });
  };

  // goto forgot screen
  buForgotPassword = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.ForgotPasswordScreen',
        options: {
          bottomTabs: {visible: false},
        },
      },
    });
  };

  buBack = () => {
    if(this.props.commingFrom==false)
    {
    StartTabs();
    }
    else
    {
    Navigation.pop(this.props.componentId)
    }
  };

  emailValidateFunc = text => {
    text = text.replace(/\s/g, '');

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  
  // onpress function

  buSuccess = async () => {
    if (this.state.UserEmail == '') {
        Alert('Please enter your email.')

      return;
    }

    let validator = this.emailValidateFunc(this.state.UserEmail);

    if (!validator) {
        Alert('Email is not valid.')

      return;
    }

    if (this.state.UserPassword == '') {
        Alert('Please enter your password.')

    
      return;
    }

    if (this.state.UserPassword.length < 5) {
        Alert('Password must be at least 5 characters long.')

      
      return;
    }

    await this.setState({isAnimating: true});

    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let body = {
      email: this.state.UserEmail,
      password: this.state.UserPassword,
    };

    

    fetch(domain+'/api/customer/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    })
      .then(async response => response.text())
      .then(async responseText => {
        let responseData = JSON.parse(responseText);
        console.log('response from program list API', responseData);
        await this.setState({isAnimating:false})
        // resolve(responseData)
      })
      .catch(error => {
        console.log('error from program list API', error);
      });
  }
    

    
    
    
  

  // login api hitting

  emailChangeHandler = value => {
    this.setState({UserEmail: value});
  };

  passwordChangeHandler = value => {
    this.setState({UserPassword: value});
  };

  PasswordShowAndHide = () => {
    this.setState({UserPasswordHide: !this.state.UserPasswordHide});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 3, backgroundColor: 'white'}}>
          
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.heading}>Welcome Back.</Text>

            <Text
              style={{
                color: '#737373',
                marginBottom: 40,
                fontSize: 13,
                marginTop: 1,
                marginLeft: 20,
              }}>
              Login to your account
            </Text>

            <View style={{marginHorizontal: 20}}>
              <Text style={styles.label}>Email</Text>
              <View
                style={{
                  paddingVertical: 8,
                  backgroundColor: '#F8F8F8',
                  borderRadius: 5,
                  paddingHorizontal: 5,
                }}>
                <TextInput
                  style={styles.textField}
                  placeholder="jhoneDoe@gmail.com"
                  placeholderTextColor="#989898"
                  onChangeText={this.emailChangeHandler}
                  keyboardType="email-address"
                  textContentType={'name'}></TextInput>
              </View>

              <Text style={styles.labelpassword}>Password</Text>
              <View
                style={{
                  paddingVertical: 8,
                  backgroundColor: '#F8F8F8',
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={styles.textField}
                  placeholder="********"
                  placeholderTextColor="#989898"
                  textContentType={'password'}
                  autoCapitalize="none"
                  onChangeText={this.passwordChangeHandler}
                  secureTextEntry={this.state.UserPasswordHide}></TextInput>

                <TouchableOpacity
                  style={{
                    flex: 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={this.PasswordShowAndHide}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={
                      this.state.UserPasswordHide == false ? openEye : closeEye
                    }></Image>
                </TouchableOpacity>
              </View>

              <Text
                style={styles.ForgotPassword}
                onPress={this.buForgotPassword}
                >
                Forgot Password?
              </Text>

              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.buSuccess}>
                  {/* <TouchableOpacity style={styles.button} onPress={this.OpenFunction}> */}
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomView} animation="fadeIn">
                <Text style={styles.newUser}>You don't have an account ?</Text>
                <Text style={styles.register} onPress={this.buSignUp}>
                  {' '}
                  Sign Up
                </Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>

        {this.state.isAnimating && (
          <ActivityIndicator
            size="large"
            color="#a1863e"
            animating={this.state.isAnimating}
            style={styles.loading}
          />
        )}
      </View>
    );
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
    resizeMode: 'cover',
  },
  back: {
    height: 50,
    width: 50,
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
  },
  heading: {
    marginTop: 90,
    marginLeft: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },

  label: {
    marginTop: 15,
    marginBottom: 3,
    marginLeft: 3,
    fontWeight: '500',
    fontSize: 14,
    color: '#737373',
  },
  labelpassword: {
    marginTop: 15,
    marginBottom: 3,
    marginLeft: 3,
    fontWeight: '500',
    fontSize: 14,
    color: '#737373',
  },
  textField: {
    flex: 4,
    marginBottom: 0,
    paddingVertical: 5,
    color: 'black',
  },
  seperater: {
    height: 1,
    marginBottom: 10,
    backgroundColor: '#CCC9C8',
  },
  ForgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
    color: '#a1863e',
    fontSize: 15,
  },
  button: {
    marginTop: 30,
    alignSelf: 'center',
    height: 55,
    width: screenWidth - 40,
    backgroundColor: '#a1863e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#111111',
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
    fontSize: 18,
  },
  bottomView: {
    marginTop: 270,
    marginBottom:30,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    // marginBottom: 100,
  },
  newUser: {
    fontSize: 15,
    color: '#737373',
  },
  register: {
    color: '#a1863e',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 0,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
