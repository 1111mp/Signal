import * as React from 'react';
import {observer} from 'mobx-react';
import {BlurView} from '@react-native-community/blur';
import {useTargetStore} from '@/stores';

const HeaderBackground: React.ComponentType = observer(() => {
  const {theme} = useTargetStore('userStore');

  return (
    <BlurView
      style={{flex: 1}}
      blurType={theme === 'dark' ? 'dark' : 'xlight'}
    />
  );
});

export default HeaderBackground;
