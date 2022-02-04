import {SafeAreaView} from 'react-native'
import {Navigation} from 'react-native-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';
import React from "react";



import HomeScreen from '../screens/homeScreen';
import JournalScreen from '../screens/JournalScreen';
import FavouritesScreen from '../screens/favouritesScreen';
import SettingsScreen from '../screens/settingsScreen';
import PlayListScreen from '../screens/playlistScreen';
import UpgradeScreen from '../screens/upgradeScreen';
import PlayScreen from '../screens/playScreen';
import TermOfUse from '../screens/termOfUse';
import PrivacyPolicy from '../screens/privacyPolicy';
import StartScreen from '../screens/startScreen';
import TestScreen from '../screens/testScreen';
import CurrentPlanScreen from '../screens/currentPlanScreen'
import BackgroundEffectsScreen from '../screens/backgroundEffects'
import ManageStorage from '../screens/manageStorage'
import ManifestScreen from '../screens/ManifestScreen'
import BurningDesireScreen from '../screens/BurningDesireScreen'
import GrateFullForTodayScreen from '../screens/GrateFullForTodayScreen'
import ServeUniverseScreen from '../screens/ServeUniverseScreen'
import ActionsScreen from '../screens/ActionsScreen'
import HowsDayScreen from '../screens/HowsDayScreen'

import HowsMyMoodScreen from '../screens/HowsMyMoodScreen'

import AddNewActionScreen from '../screens/AddNewActionScreen'

import ExperienceYourBurningDesiresScreen from '../screens/ExperienceYourBurningDesiresScreen'

import FinishScreen from '../screens/FinishScreen'

import MenifestDetailScreen from '../screens/MenifestDetailScreen'

import TickCompletedActions from '../screens/tickCompletedActions'



import Swiper from '../screens/Swiper'

import Home from '../screens/Home'

import GoalEdit from './GoalEdit'

import GoalsListing from '../screens/GoalsListing'

import GoalDetail from '../screens/GoalDetail'













export function registerScreens() {

    Navigation.registerComponent('poisedAthleteMeditation.JournalScreen', () => wrapSafeArea(JournalScreen));
    Navigation.registerComponent('poisedAthleteMeditation.homeScreen', () => wrapSafeArea(HomeScreen));
    Navigation.registerComponent('poisedAthleteMeditation.favouritesScreen', () => wrapSafeArea(FavouritesScreen));
    Navigation.registerComponent('poisedAthleteMeditation.settingsScreen', () => wrapSafeArea(SettingsScreen));
    Navigation.registerComponent('poisedAthleteMeditation.playListScreen', () => wrapSafeArea(PlayListScreen));
    Navigation.registerComponent('poisedAthleteMeditation.upgradeScreen', () => wrapSafeArea(UpgradeScreen));
    Navigation.registerComponent('poisedAthleteMeditation.playScreen', () => PlayScreen);
    Navigation.registerComponent('poisedAthleteMeditation.termOfUse', () => wrapSafeArea(TermOfUse));
    Navigation.registerComponent('poisedAthleteMeditation.privacyPolicy', () => wrapSafeArea(PrivacyPolicy));
    Navigation.registerComponent('poisedAthleteMeditation.startScreen', () => wrapSafeArea(StartScreen));
    Navigation.registerComponent('poisedAthleteMeditation.testScreen', () => wrapSafeArea(TestScreen));
    Navigation.registerComponent('poisedAthleteMeditation.currentPlan', () => wrapSafeArea(CurrentPlanScreen));
    Navigation.registerComponent('poisedAthleteMeditation.backgroundEffects', () => wrapSafeArea(BackgroundEffectsScreen));
    Navigation.registerComponent('poisedAthleteMeditation.manageStorage', () => wrapSafeArea(ManageStorage));
    Navigation.registerComponent('poisedAthleteMeditation.ManifestScreen', () => wrapSafeArea(ManifestScreen));
    Navigation.registerComponent('poisedAthleteMeditation.BurningDesireScreen', () => BurningDesireScreen);
    Navigation.registerComponent('poisedAthleteMeditation.GrateFullForTodayScreen', () => GrateFullForTodayScreen);
    Navigation.registerComponent('poisedAthleteMeditation.ServeUniverseScreen', () => ServeUniverseScreen);
    Navigation.registerComponent('poisedAthleteMeditation.ActionsScreen', () => ActionsScreen);
    Navigation.registerComponent('poisedAthleteMeditation.HowsDayScreen', () => HowsDayScreen);

    Navigation.registerComponent('poisedAthleteMeditation.HowsMyMoodScreen', () => HowsMyMoodScreen);

    Navigation.registerComponent('poisedAthleteMeditation.AddNewActionScreen', () => AddNewActionScreen);

    Navigation.registerComponent('poisedAthleteMeditation.ExperienceYourBurningDesiresScreen', () => ExperienceYourBurningDesiresScreen );
    Navigation.registerComponent('poisedAthleteMeditation.FinishScreen', () => FinishScreen );

    Navigation.registerComponent('poisedAthleteMeditation.MenifestDetailScreen', () => MenifestDetailScreen );


    Navigation.registerComponent('poisedAthleteMeditation.TickCompletedActions', () => TickCompletedActions );


    Navigation.registerComponent('poisedAthleteMeditation.Swiper', () => Swiper );

    Navigation.registerComponent('poisedAthleteMeditation.Home', () => Home );

    Navigation.registerComponent('poisedAthleteMeditation.GoalEdit', () => GoalEdit );

    Navigation.registerComponent('poisedAthleteMeditation.GoalsListing', () => GoalsListing );

    Navigation.registerComponent('poisedAthleteMeditation.GoalDetail', () => GoalDetail );




    


    
    
    
}






const wrapSafeArea = (Component, screenName = "no") => {
    return class App extends React.Component<TProps> {
      render() {
        console.log(screenName, 'props');
  
        // let backColor = "white";
        // if (screenName === "white" ) {
        //   backColor = "white";
        // }
      let backColor = "white";
        if (screenName === "white" ) {
          backColor = "white";
          
        }
  
  
        return (
          // <SafeAreaView style={{ flex: 1, backgroundColor: backColor, marginBottom: isIphoneX() ? -35 : 0, paddingBottom: isIphoneX() ? 35 : 0, marginTop: isIphoneX() ? -5 : -10 }}>
          <SafeAreaView style={{ flex: 1, backgroundColor: backColor, marginBottom: isIphoneX() ? -35 : 0, paddingBottom: isIphoneX() ? 35 : 0, marginTop: isIphoneX() ? -5 : 0 }}>
  
            <Component {...{
              ...this.props,
  
            }} />
  
          </SafeAreaView>
        );
      }
    }
  }