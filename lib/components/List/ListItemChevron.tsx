import * as React from 'react';
import {observer} from 'mobx-react';
import {ListItem as RNEListItem} from 'react-native-elements';
import {useTargetStore} from '@/stores';

const ListItemChevron: React.ComponentType<any> = observer(
  ({children, ...props}) => {
    const {themeData} = useTargetStore('userStore');

    return <RNEListItem.Chevron {...props}>{children}</RNEListItem.Chevron>;
  },
);

export default ListItemChevron;
