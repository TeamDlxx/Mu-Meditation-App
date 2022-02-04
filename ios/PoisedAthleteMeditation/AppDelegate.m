/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import "RNSplashScreen.h"
@import Firebase;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  if (@available(iOS 14, *)) {
  UIDatePicker *picker = [UIDatePicker appearance];
  picker.preferredDatePickerStyle = UIDatePickerStyleWheels;
  }
  
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  [FIRApp configure];
  
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  
 
  
  [RNSplashScreen show];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
