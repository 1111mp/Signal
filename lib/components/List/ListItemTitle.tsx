import * as React from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import {ListItem as RNEListItem} from 'react-native-elements';
import {useTargetStore} from '@/stores';

const ListItemTitle: React.ComponentType<any> = observer(
  ({children, style, ...props}) => {
    const {themeData} = useTargetStore('userStore');
    return (
      <RNEListItem.Title
        {...props}
        style={StyleSheet.flatten([
          {
            color: themeData.list_item_title,
          },
          style,
        ])}>
        {children}
      </RNEListItem.Title>
    );
  },
);

export default ListItemTitle;
