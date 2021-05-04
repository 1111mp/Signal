import * as React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem as RNEListItem, ListItemProps} from 'react-native-elements';
import {observer} from 'mobx-react';
import {useTargetStore} from '@/stores';

const ListItem: React.ComponentType<ListItemProps> = observer(
  ({children, containerStyle, ...props}) => {
    const {themeData} = useTargetStore('userStore');

    return (
      <RNEListItem
        containerStyle={StyleSheet.flatten([
          {
            backgroundColor: themeData.list_item_bg,
            borderColor: themeData.list_item_border,
          },
          containerStyle,
        ])}
        {...props}>
        {children}
      </RNEListItem>
    );
  },
);

export default ListItem;
