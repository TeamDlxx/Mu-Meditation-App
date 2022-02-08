package com.mumeditation.app;

import android.os.Bundle;

import com.reactnativenavigation.NavigationActivity;

import org.devio.rn.splashscreen.SplashScreen;


public class MainActivity extends NavigationActivity {


    @Override
    protected  void onCreate(Bundle savedInstanceState){
        // SplashScreen.show(this, R.style.AppTheme);
        SplashScreen.show(this, R.style.AppTheme);  // false to disable fullscreen
        super.onCreate(savedInstanceState);
    }


}
