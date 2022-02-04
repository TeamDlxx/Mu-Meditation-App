package com.mindmanifestation.app;

import com.guichaguri.trackplayer.TrackPlayer;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.dooboolab.RNIap.RNIapPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.RNFetchBlob.RNFetchBlobPackage;

import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.zmxv.RNSound.RNSoundPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage; // <-- Add this line
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
public class MainApplication extends NavigationApplication {


            @Override
    protected ReactGateway createReactGateway() {
                ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                                return "index";
                            }
        };
                return new ReactGateway(this, isDebug(), host);
            }

            @Override
    public boolean isDebug() {
                return BuildConfig.DEBUG;
            }

            protected List<ReactPackage> getPackages() {
                // Add additional packages you require here
                        // No need to add RnnPackage and MainReactPackage
                                return Arrays.<ReactPackage>asList(
                            // eg. new VectorIconsPackage()
                                        new TrackPlayer(),
                                        new RNIapPackage(),
                                        new SplashScreenReactPackage(),
                                        new RNFetchBlobPackage(),
                                        new RNDeviceInfo(),
                                        new RNSoundPackage(),
                                        new BackgroundTimerPackage(),
                                        new RNCWebViewPackage(),
                                        new NetInfoPackage(),
                                        new RNFirebasePackage(),
                                        new RNFirebaseAnalyticsPackage(),
                                        new RNFirebaseCrashlyticsPackage(),
                                        new RNDateTimePickerPackage(),
                                        new AsyncStoragePackage()// <-- Add this line
                                );
            }

            @Override
    public List<ReactPackage> createAdditionalReactPackages() {
                return getPackages();
            }

        }
