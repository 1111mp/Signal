import React from 'react';
import {ScrollView, TextInput, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useAuthContext} from '@/AuthContext';

const SignInScreen: React.ComponentType<
  StackScreenProps<{SignUp: undefined}>
> = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = useAuthContext()!;

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
      <Button title="Sign in" onPress={() => signIn({username, password})} />
      <Button title="Sign up" onPress={() => navigation.navigate('SignUp')} />
    </ScrollView>
  );
};

export default SignInScreen;
