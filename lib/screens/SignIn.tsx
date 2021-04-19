import React from 'react';
import {ScrollView, TextInput, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useTargetStore} from '@/stores';
import {observer} from 'mobx-react';

const SignInScreen: React.ComponentType<
  StackScreenProps<{SignUp: undefined}>
> = observer(({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = useTargetStore('userStore');

  return (
    <ScrollView style={{flex: 1}}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn()} />
      <Button title="Sign up" onPress={() => navigation.navigate('SignUp')} />
    </ScrollView>
  );
});

export default SignInScreen;
