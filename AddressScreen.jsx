import React, {useState} from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {
  OkHiLocationManager,
  isLocationServicesEnabled,
  request,
} from 'react-native-okhi';

const AddressScreen = () => {
  const [launch, setLaunch] = useState(false);
  // TODO 1: Change these to your own user details
  const user = {
    phone: '+2348000000000', // It is important to provide your actual phone number, as a message will be sent to this number
    firstName: 'Gift',
    lastName: 'Moore',
    email: 'giftmoore@okhi.com', // It is important to use your actual email address, an email may be sent to the provided address
  };

  const rationale = {
    title: 'Location permissions',
    text: "To verify your address, allow YOUR_APP_NAME_HERE to check your phone's location, even when you're not using the app",
    successButton: {label: 'Grant'},
    denyButton: {label: 'Deny'},
  };

  const handleOnPress = () => {
    // TODO 2: Show a location permissions educational primer before requesting for background location permissions.
    request('always', rationale, async (status, error) => {
      const locationServicesAvailable = await isLocationServicesEnabled();
      console.log(error);
      if (status === 'authorizedAlways' && locationServicesAvailable) {
        setLaunch(true);
      }
      /* TODO 3:
          When the user does not grant location permission the first time.
          1. Show a primer to educate them on how to do this in settings
          2. Provide a button to send them to settings. 
            You may use `openAppSettings()`
        */
    });
  };

  const handleOnSuccess = response => {
    console.log(response);
    response
      .startVerification()
      .then(async locationId => {
        console.log('started verification for: ' + locationId);
      })
      .catch(error => {
        console.log(error.code);
        console.log(error.message);
      })
      .finally(() => {
        setLaunch(false);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <Button title="Create address" onPress={handleOnPress} />
        <OkHiLocationManager
          launch={launch}
          user={user}
          onCloseRequest={() => setLaunch(false)}
          onError={console.log}
          onSuccess={handleOnSuccess}
          config={{streetView: true}}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddressScreen;
