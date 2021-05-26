import React from 'react';
import {Text, View} from 'react-native';
import ScrollView from '@/components/ScrollView';
import {Button, Icon, Input} from 'react-native-elements';
import {observer} from 'mobx-react';
import {useTargetStore} from '@/stores';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  closeHandler: () => void;
};

const SignUpScreen: React.ComponentType<Props> = observer(({closeHandler}) => {
  const {themeData} = useTargetStore('userStore');
  const {top} = useSafeAreaInsets();

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 0,
          backgroundColor: themeData.container_home,
        }}>
        <View style={{paddingTop: 100}}>
          <Input
            maxLength={11}
            clearButtonMode="always"
            keyboardType="number-pad"
            placeholder="Username"
            // value={username}
            // onChangeText={setUsername}
          />
          <Input
            placeholder="Password"
            // value={password}
            // onChangeText={setPassword}
            secureTextEntry
          />
          <Input
            placeholder="Please re-enter password"
            // value={password}
            // onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            disabled={true}
            containerStyle={{marginTop: 20}}
            buttonStyle={{backgroundColor: '#66DACD'}}
            title="Sign up"
            // onPress={() => signIn()}
          />
        </View>
      </ScrollView>
      <Icon
        containerStyle={{position: 'absolute', left: 14, top: top + 12}}
        type="antdesign"
        name="close"
        onPress={closeHandler}
      />
    </>
  );
});

export default SignUpScreen;
