import * as React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Input, Button, Text, Overlay} from 'react-native-elements';
import {useTargetStore} from '@/stores';
import {observer} from 'mobx-react';

import SignUp from './SignUp';
import {login} from '@/services/user';

const SignInScreen: React.ComponentType<
  StackScreenProps<{SignUp: undefined}>
> = observer(({navigation}) => {
  const [account, setAccount] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [visible, setVisible] = React.useState<boolean>(false);

  const {signIn, themeData} = useTargetStore('userStore');

  const closeHandler = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const signInHandler = () => {
    login({account, pwd})
      .then(res => {
        console.log(res);
        if(res.code === 200) {
          
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 100,
          paddingHorizontal: 10,
          backgroundColor: themeData.container_home,
        }}>
        <Input
          maxLength={11}
          clearButtonMode="while-editing"
          keyboardType="number-pad"
          placeholder="Account"
          value={account}
          onChangeText={setAccount}
        />
        <Input
          placeholder="Password"
          value={pwd}
          onChangeText={setPwd}
          secureTextEntry
        />
        <Button
          disabled={!account || !pwd}
          containerStyle={{marginTop: 20}}
          buttonStyle={{backgroundColor: '#66DACD'}}
          title="Sign in"
          onPress={signInHandler}
        />
        {/* <Button
        title="Sign up"
        disabled
        onPress={() => navigation.navigate('SignUp')}
      /> */}
      </ScrollView>
      <View style={styles.btmView}>
        <Button type="clear" title="找回密码" />
        <View style={styles.line} />
        <Button type="clear" title="注册" onPress={() => setVisible(true)} />
      </View>
      <Overlay isVisible={visible} animationType="slide" fullScreen={true}>
        <SignUp closeHandler={closeHandler} />
      </Overlay>
    </>
  );
});

const styles = StyleSheet.create({
  btmView: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: StyleSheet.hairlineWidth,
    height: 14,
    backgroundColor: '#000000',
  },
});

export default SignInScreen;
