import * as React from 'react';
import {observer} from 'mobx-react';
import {Icon as RNEIcon, IconProps} from 'react-native-elements';
import {useTargetStore} from '@/stores';

const Icon: React.ComponentType<
  IconProps & {name: string; darkName?: string}
> = observer(({name, darkName, ...props}) => {
  const {themeData, appTheme} = useTargetStore('userStore');
  return (
    <RNEIcon
      {...props}
      name={appTheme === 'light' ? name : darkName ? darkName : name}
      color={themeData.list_item_icon}
    />
  );
});

export default Icon;
