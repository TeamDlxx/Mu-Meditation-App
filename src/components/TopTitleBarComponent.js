import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, Text, TouchableWithoutFeedback,StatusBar } from 'react-native';


import BackIcon from '../assets/icons/back.png'
// import wefix from '../Asserts/wefix.jpg'




class TopTitleBarComponent extends Component {
    state = {
        value: this.props.text
    }

    onTextChangeHandler = (value) => {
        this.setState({ value });
        this.props.changeValueHandler(value);
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', height: 50,backgroundColor:this.props.color, }}>
            {/* <StatusBar barStyle={'dark-content'} backgroundColor={'white'}></StatusBar> */}
           
                <View style={{ flex: 0.2, justifyContent: 'center', }}>

                    {this.props.leftIcon == true &&
                        <TouchableWithoutFeedback onPress={this.props.leftIconAction}>
                            <View style={{ flex: 1, justifyContent: 'center', }}>
                                <Image style={{ marginLeft: 15, height: 30, width: 30,tintColor:this.props.tintcolor }} source={BackIcon} />
                            </View>
                        </TouchableWithoutFeedback>
                    }

                </View>





                <View style={{ flex: 1, }}>

                    {this.props.centerText != "" &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: this.props.textcolor, fontSize: 20, fontWeight: 'bold', }} >{this.props.centerText}</Text>
                        </View>
                    }

                    

                </View>





                <View style={{ flex: 0.2, }}>

                    {this.props.righticon == true &&
                        <TouchableWithoutFeedback onPress={this.props.rightIconAction}>
                           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#b1b1b1', fontSize: 15, fontWeight: '600', }} >Skip</Text>
                        </View>
                        </TouchableWithoutFeedback>
                    }

                </View>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 10,
        // marginBottom:10
        height: 50
    },
    button: {
        height: 50,
        width: "100%",
        backgroundColor: "#FAFAFA",
        borderColor: "#E9EFF4",
        borderWidth: 1,
        justifyContent: "center",
        paddingLeft: 10,
        borderRadius: 7,
    },
    text: {
        color: "#000000"
    },
    head: {

        fontSize: 18,
        color: "#747474",

        marginBottom: 10,
    },
    subContainer: {

    },
    image: {
        height: 16,
        width: 20,
        marginRight: 15,
    }
});

export default TopTitleBarComponent;