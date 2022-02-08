import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { Navigation } from "react-native-navigation";

const startTabs = () => {

  Navigation.setDefaultOptions({
    
    layout:{
      orientation:["portrait"]
    },
    statusBar:{backgroundColor:"white", style : "dark"},

        topBar: {
          visible: false,
          drawBehind: true,
          animated: true,
        },
        
      });

allTabsroot={
  
  root: {
    bottomTabs: {
      children: [

        {
          stack: {
            children: [{
              component: {
                name: 'poisedAthleteMeditation.Home',
                passProps: {
                  text: 'This is tab 2'
                },
                
              }
            }],
            options: {
              bottomTab: {
                text: 'Home',

                // icon: require('../assets/icons/homeIcon.png'),

                // iconInsets: { top: 5, bottom: -5, },
                // icon: require('../assets/icons/audio.png'),
                icon: require('../assets/icons/icon_home.png'),
                testID: 'SECOND_TAB_BAR_BUTTON',
                selectedIconColor: '#a1863e',
                selectedTextColor: '#a1863e',
                textColor: '#778187',
                // badge: '200',
                fontSize: 12,
                iconInsets: { top: 5, bottom: -0, },
              }
            }
          }
        },
        
        // {
        //   stack: {
        //     children: [{
        //       component: {
        //         name: 'poisedAthleteMeditation.JournalScreen',
        //         passProps: {
        //           text: 'This is tab 1'
        //         },
                
        //       }
        //     }],
        //     options: {
        //       bottomTab: {
               
        //         text: 'Journal',
        //               icon: require('../assets/icons/journal.png'),
        //               // icon: require('../assets/icons/favoriteIcon.png'),
        //               testID: 'FIRST_TAB_BAR_BUTTON',
        //               selectedIconColor: '#497CF0',
        //               selectedTextColor: '#497CF0',
        //               textColor: '#778187',
        //               fontSize: 12,
        //               iconInsets: { top: 5, bottom: -0, },

        //       }
        //     }
        //   }
        // },
      
        
        {
          stack: {
            children: [{
              component: {
                name: 'poisedAthleteMeditation.homeScreen',
                passProps: {
                  text: 'This is tab 2'
                },
                
              }
            }],
            options: {
              bottomTab: {
                text: 'Audio',

                // icon: require('../assets/icons/homeIcon.png'),

                // iconInsets: { top: 5, bottom: -5, },
                icon: require('../assets/icons/audio.png'),
                // icon: require('../assets/icons/icon_home.png'),
                testID: 'SECOND_TAB_BAR_BUTTON',
                selectedIconColor: '#a1863e',
                selectedTextColor: '#a1863e',
                textColor: '#778187',
                // badge: '200',
                fontSize: 12,
                iconInsets: { top: 5, bottom: -0, },
              }
            }
          }
        },
        
     
      
      
      {
        stack: {
          children: [{
            component: {
              name: 'poisedAthleteMeditation.settingsScreen',
              passProps: {
                text: 'This is tab 4'
              },
              
            }
          }],
          options: {
            bottomTab: {
              text: 'Settings',
              icon: require('../assets/icons/icon_settings.png'),
              // icon: require('../assets/icons/settingsIcon.png'),
              testID: 'FOURTH_TAB_BAR_BUTTON',
              selectedIconColor: '#a1863e',
            selectedTextColor: '#a1863e',
            textColor: '#778187',
            fontSize: 12,  
            iconInsets: { top: 5, bottom: -0, },
           
            }
          }
        }
      },
     
  ],
  options: {
    bottomTabs: {
      visible: true,
      animate: false, 
      translucent: false,
      fontFamily: 'Helvetica',
      fontSize: 5,
      titleDisplayMode: 'alwaysShow',
      backgroundColor: "#FFFFFF",
      drawBehind: true,
     
     
    },

  }
  
          
 
    }
  }
};


Navigation.setRoot(allTabsroot);


}; 







export default startTabs;