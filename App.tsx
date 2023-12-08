import React, {useEffect} from 'react';
import {View} from 'react-native';
import * as OkHi from 'react-native-okhi';
import AddressScreen from './AddressScreen';

const App = () => {
  useEffect(() => {
    OkHi.initialize({
      credentials: {
        branchId: '', // your branch ID
        clientKey: '', // your client key
      },
      context: {
        mode: 'sandbox',
      },
      notification: {
        title: 'Address verification in progress',
        text: 'Tap here to view your verification status.',
        channelId: 'okhi',
        channelName: 'OkHi Channel',
        channelDescription: 'OkHi verification alerts',
      },
    })
      .then(() => console.log('init done'))
      .catch(console.log);
  }, []);
  return (
    <View>
      <AddressScreen />
    </View>
  );
};

export default App;
