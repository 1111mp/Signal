import * as React from 'react';
import {useColorScheme} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const HeaderBackground: React.ComponentType = () => {
  const scheme = useColorScheme();

  return (
    <BlurView
      style={{flex: 1}}
      blurType={scheme === 'dark' ? 'dark' : 'xlight'}
    />
  );
};

export default HeaderBackground;
