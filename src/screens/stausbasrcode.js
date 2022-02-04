import React, {
    Component,
  } from 'react';
  import {
    AppRegistry,
    StyleSheet,
    View,
    StatusBar,
    Platform,
    Image,
    TouchableOpacity,
    Alert,
    Text
  } from 'react-native';

  import DefaultText from './../Default/DefaultText';

  import backImage from './../../../assets/mainscreenimages/backbutton.png'
  import phoneicon from './../../../assets/mainscreenimages/phoneicon.png';
  import bellicon from './../../../assets/mainscreenimages/bell.png';
  import plusicon from './../../../assets/mainscreenimages/plus.png';
  import man from './../../../assets/mainscreenimages/man.png';
  import settingdots from './../../../assets/mainscreenimages/settingDots.png';

  import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import IconButton from '../IconButton/IconButton';
  

import DeviceInfo from 'react-native-device-info';

  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
  
  class DarkTheme extends Component {

    state = {
    
    }

    settingFun=()=>{
      Alert.alert(
        'Action',
        'Select Your Option',
        [
          {text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel'},
          {text: 'Select As Default', onPress: () => this.props.selectAsDefault()},
          {text: 'Remove', onPress: () => this.props.onRemoveBankHandler()}
          
        ],
        { cancelable: false },
      )

    }

    onSelectSettingOption=(value)=>{
      if(value==="default")
      {
        this.props.selectAsDefault();
      }
      else
      {
        this.props.onRemoveBankHandler();
      }
    }


    render() {

      let lefticon=null;
      let righticon=null;
      switch(this.props.lefticon)
      {
        
        case "plus":
        lefticon=plusicon;
        break;

        case "back":
        lefticon=backImage;
        break;

      }

      switch(this.props.righticon)
      {
        
        case "bell":
        righticon=bellicon;
        break;

        case "phone":
        righticon=phoneicon;
        break;


        case "man":
        righticon=man;
        break;

       

      }

      if(this.props.rightmenu==="setting")
      {
        righticon=settingdots;
      }


      return (
        <View >
        <View style={styles.container}>
          <MyStatusBar backgroundColor="#2B72BF" barStyle="light-content" />
          <View style={styles.appBar}>


            
            <TouchableOpacity onPress={this.props.pop}  >
            <View style={[styles.innerView,styles.maincontainer,styles.backButtonWrapper]}>
            <Image source={lefticon} style={styles.backbutton} />
            </View>
            </TouchableOpacity>

            
            <View style={[styles.innerView,styles.maincontainer,
            {  marginRight: this.props.rightText ? 0 : 50},
              this.props.rightmenu==="setting"?{marginLeft:100}:null,Platform.OS==="android"?{marginTop:10}:null]}>

            <View style={{flexDirection:"row",alignItems:"center"}}>
            {this.props.midicon &&  <Image resizeMode="contain" source={this.props.midiconimage} style={{width:20,height:20,marginRight:10}} /> }
            <DefaultText style={styles.maintext}>{this.props.text}</DefaultText>
            </View>
            
            </View>

        {this.props.righticon&&
            <TouchableOpacity onPress={this.props.onPress}>
            <View style={[styles.innerView,styles.maincontainer,styles.BellButtonWrapper]}>
            <Image source={righticon} style={styles.phoneicon} />
            </View>
            </TouchableOpacity>
           
          }
          
          {this.props.rightText&&
            <View style={{marginRight:10}}>
            <TouchableOpacity onPress={this.props.Rightskip}>

                       <DefaultText style={{textAlign:"center",color:"#FFFFFF",fontSize: 15,}}>skip</DefaultText>

             </TouchableOpacity>
            </View>
           
          }


          {this.props.rightmenu==="setting"&& Platform.OS==="ios"&&

          

          <View style={[styles.innerView,styles.maincontainer,styles.BellButtonWrapper]}>
           <MenuProvider style={{flex: 1}}>
           <Menu name="types" onSelect={this.onSelectSettingOption}
          
           >
           <MenuTrigger style={styles.trigger}>
            <View style={{width:100,alignItems:"flex-end"}}>
            <Image source={settingdots} />
            </View>
           </MenuTrigger>
           <MenuOptions customStyles={{optionsContainer: {marginTop: 35}}}>
             <MenuOption value="default" text='Select as Default' />
             <View style={styles.divider}/>
             <MenuOption value="remove" text='Remove' />
           </MenuOptions>
         </Menu>
            </MenuProvider>
     
            </View>
          }




          {this.props.rightmenu==="setting"&& Platform.OS==="android"&&

          
          <TouchableOpacity onPress={this.settingFun}>
          <View style={[styles.innerView,styles.maincontainer,styles.BellButtonWrapper,{paddingRight:10,width:120}]}>
           
            <Image source={settingdots} />
           
            </View>
            </TouchableOpacity>
          }


          {this.props.rightmenu==="text"&&

          
          <TouchableOpacity onPress={this.settingFun}>
          <View style={{position:"absolute",top:20,right:20,left:0}}>
           
            <DefaultText>ok</DefaultText>
           
            </View>
            </TouchableOpacity>
          }

          
          
       


          </View>
          <View style={styles.content} />
        </View>
        </View>
      );
    }
  }
  
  const STATUSBAR_HEIGHT = Platform.OS === "android"?8:20;
  const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
  
  const styles = StyleSheet.create({
    container: {
     
    },
    statusBar: {
      height: STATUSBAR_HEIGHT,
    },
    appBar: {
      backgroundColor:'#2B72BF',
      height: APPBAR_HEIGHT,
      flexDirection: 'row',
      width:"100%",
      alignItems:"center"
    },
    content: {
     
      backgroundColor: '#FFFFFF',
    },
    innerView:{
        flex: 1,
       
        width:40,
        height:40,
     
    },
    backbutton:{
        marginLeft: 10,
    },
    phoneicon:{
        marginRight: 10,
    },
    maincontainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center'
    },
    maintext:{
        color:"#FFFFFF",
        fontSize: 17
    },
    backButtonWrapper:{
      alignItems: 'flex-start',
            justifyContent:"center",
    },
    BellButtonWrapper:{
      alignItems: 'flex-end',
            justifyContent:"center",
    },


    topbar: {
      flexDirection: 'row',
      backgroundColor: 'dimgray',
      paddingTop : 15,
    },
    trigger: {
      padding: 5,
      margin: 5,
    },
    triggerText: {
      color: 'white',
    },
    disabled: {
      color: '#ccc',
    },
    divider: {
      marginVertical: 5,
      marginHorizontal: 2,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    logView: {
      flex: 1,
      flexDirection: 'column',
    },
    logItem: {
      flexDirection: 'row',
      padding: 8,
    },
    slideInOption: {
      padding: 5,
    },
    text: {
      fontSize: 18,
    },
    
  });

  export default DarkTheme;