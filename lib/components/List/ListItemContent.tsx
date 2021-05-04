import * as React from 'react';
import {observer} from 'mobx-react';
import {ListItem as RNEListItem} from 'react-native-elements';
import {useTargetStore} from '@/stores';

const ListItemContent: React.ComponentType<any> = observer(
  ({children, ...props}) => {
    const {themeData} = useTargetStore('userStore');

    return <RNEListItem.Content {...props}>{children}</RNEListItem.Content>;
  },
);

export default ListItemContent;
