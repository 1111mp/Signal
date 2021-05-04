import * as React from 'react';
import {observer} from 'mobx-react';
import {BlurView} from '@react-native-community/blur';
import {useTargetStore} from '@/stores';

const HeaderBackground: React.ComponentType = observer(() => {
  const {appTheme} = useTargetStore('userStore');

  return (
    <BlurView
      style={{flex: 1}}
      blurType={appTheme === 'dark' ? 'dark' : 'xlight'}
    />
  );
});

export default HeaderBackground;
