import React from 'react';
import {Text} from 'react-native';
import ScrollView from '@/components/ScrollView';
import {observer} from 'mobx-react';
import {useTargetStore} from '@/stores';

const SignUpScreen: React.ComponentType = observer(() => {
  const {themeData} = useTargetStore('userStore');

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: themeData.container_home,
      }}>
      <Text>SignUpScreen</Text>
    </ScrollView>
  );
});

export default SignUpScreen;
