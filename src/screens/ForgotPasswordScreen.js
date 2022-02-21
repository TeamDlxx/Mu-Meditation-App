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
  Alert,
} from 'react-native';

import TopTitleBarComponent from '../components/TopTitleBarComponent';
import SplashScreen from 'react-native-splash-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {endPoint} from '../Components/EndPoint';
// import {invokeApi} from '../Components/invokeApi';
const {Navigation} = require('react-native-navigation');
const screenWidth = Dimensions.get('window').width;

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: '',
      isAnimating: false,
    };
  }

  async componentDidMount() {
    SplashScreen.hide();
  }

  buBack = () => {
    Navigation.pop(this.props.componentId);
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

  buForgot = () => {
    let validator = this.emailValidateFunc(this.state.UserEmail);

    if (validator == true) {
      this.setState({isAnimating: true});
      this.gotoOTPScreen()
      // this.ApiHitting();
    } else {
        Alert('Email not valid')
      
    }
  };

  ApiHitting = async () => {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let body = {
      email: this.state.UserEmail,
    };

    let response = await invokeApi(
      endPoint.emailVerification,
      'POST',
      headers,
      '',
      body,
    );

    console.log(response, 'response retured');
    if (response.code === '000') {
        Alert('Internet connection failed')
      
      await this.setState({isAnimating: false});
    } else if (response.code === 200) {
        Alert('Code Send')

     
      this.gotoOTPScreen();
      await this.setState({isAnimating: false});
    } else {
        Alert(response.message)

      await this.setState({isAnimating: false});
    }
  };

  gotoOTPScreen = () => {
    // Navigate to SetNewPassword

    Navigation.push(this.props.componentId, {
      component: {
        name: 'poisedAthleteMeditation.OTPScreen',
        options: {
          bottomTabs: {visible: false},
        },
        passProps: {
          email: this.state.UserEmail,
        },
      },
    });
  };

  emailChangeHandler = value => {
    this.setState({UserEmail: value});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 3, backgroundColor: 'white'}}>
          <TopTitleBarComponent
            leftIcon={true}
            centerImage={false}
            centerText={''}
            // tintcolor={'#a1863e'}
            leftIconAction={this.buBack}></TopTitleBarComponent>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <Text style={styles.heading}>Forgot Password.</Text>
            <Text
              style={{
                color: '#737373',
                marginBottom: 40,
                fontSize: 13,
                marginTop: 1,
                marginLeft: 20,
              }}>
              You will receive your reset code on your registered email address.
            </Text>

            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}>
              <View style={{marginLeft: 20, marginRight: 20}}>
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

                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.buForgot}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
  heading: {
    marginTop: 40,
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
  textField: {
    marginBottom: 0,
    paddingVertical: 5,
    color: 'black',
  },
  button: {
    marginTop: 30,
    marginBottom: 10,
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
