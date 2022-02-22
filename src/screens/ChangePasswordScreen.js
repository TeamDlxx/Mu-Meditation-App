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
} from 'react-native';

import TopTitleBarComponent from '../components/TopTitleBarComponent';
import SplashScreen from 'react-native-splash-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {Navigation} = require('react-native-navigation');
const screenWidth = Dimensions.get('window').width;
// import Toast from 'react-native-toast-message';
import openEye from '../assets/icons/openEye.png';
import closeEye from '../assets/icons/closeEye.png';
// import {endPoint} from '../Components/EndPoint';
// import {invokeApi} from '../Components/invokeApi';
export default class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: '',
      isAnimating: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      oldPasswordHide: true,
      newPasswordHide: true,
      confirmPasswordHide: true,
    };
  }

  async componentDidMount() {
    SplashScreen.hide();
  }

  buBack = () => {
    Navigation.pop(this.props.componentId);
  };

  // onpress function

  buUpdate = () => {
    if (this.state.oldPassword === '') {
        alert('Enter old password first')
      
    } else if (this.state.oldPassword.length < 6) {
        alert('Old password must be grater then 6 digits')
     
    } else if (this.state.newPassword === '') {
        alert('Enter new password first')
     
    } else if (this.state.newPassword.length < 6) {
        alert('new password must be grater then 6 digits')
      
    } else if (this.state.confirmPassword === '') {
        alert('Enter confirm password first')
     
    } else if (this.state.confirmPassword.length < 6) {
        alert('Confirm password must be grater then 6 digits')
     
    } else if (this.state.confirmPassword !== this.state.newPassword) {
      alert('New password and Confirm password not match')
       
    } else {
      this.ApiHitting();
    }
  }




  ApiHitting = async () => {
    this.setState({isAnimating: true});
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-sh-auth': await AsyncStorage.getItem('@token'),
    };

    let body = {
      old_password: this.state.oldPassword,
      new_password: this.state.newPassword,
      confirm_password: this.state.confirmPassword,
    };

    
      
      alert('Password updated successfully')
      Keyboard.dismiss();
      await this.setState({
        isAnimating: false,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      
    
  };

  oldPasswordChangeHandler = value => {
    this.setState({oldPassword: value});
  };
  newPasswordChangeHandler = value => {
    this.setState({newPassword: value});
  };
  ConfirmPasswordChangeHandler = value => {
    this.setState({confirmPassword: value});
  };

  PasswordShowAndHide = item => {
    console.log(item, 'item');
    if (item === 'old') {
      this.setState({oldPasswordHide: !this.state.oldPasswordHide});
    } else if (item === 'new') {
      this.setState({newPasswordHide: !this.state.newPasswordHide});
    } else {
      this.setState({confirmPasswordHide: !this.state.confirmPasswordHide});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 3, backgroundColor: 'white'}}>
          <TopTitleBarComponent
            leftIcon={true}
            centerImage={false}
            centerText={''}
            leftIconAction={this.buBack}></TopTitleBarComponent>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <Text style={styles.heading}>Change Password.</Text>
            <Text
              style={{
                color: '#737373',
                marginBottom: 40,
                fontSize: 13,
                marginTop: 1,
                marginLeft: 20,
              }}>
              Change password carefully.
            </Text>

            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <Text style={styles.label}>Old Password</Text>
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
                    placeholder="**********"
                    placeholderTextColor="#989898"
                    onChangeText={this.oldPasswordChangeHandler}
                    keyboardType="default"
                    textContentType={'password'}
                    autoCapitalize="none"
                    value={this.state.oldPassword}></TextInput>
                </View>
                <Text style={styles.label}>New Password</Text>
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
                    placeholder="**********"
                    placeholderTextColor="#989898"
                    onChangeText={this.newPasswordChangeHandler}
                    keyboardType="default"
                    textContentType={'password'}
                    autoCapitalize="none"
                    secureTextEntry={this.state.newPasswordHide}
                    value={this.state.newPassword}></TextInput>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      this.PasswordShowAndHide('new');
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={
                        this.state.newPasswordHide == false ? openEye : closeEye
                      }></Image>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Confirm Password</Text>
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
                    placeholder="**********"
                    placeholderTextColor="#989898"
                    onChangeText={this.ConfirmPasswordChangeHandler}
                    keyboardType="default"
                    textContentType={'password'}
                    autoCapitalize="none"
                    secureTextEntry={this.state.confirmPasswordHide}
                    value={this.state.confirmPassword}></TextInput>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      this.PasswordShowAndHide('confirm');
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={
                        this.state.confirmPasswordHide == false
                          ? openEye
                          : closeEye
                      }></Image>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.buUpdate}>
                    <Text style={styles.buttonText}>Update</Text>
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
    flex: 4,
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
