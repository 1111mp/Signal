import * as React from 'react';
import {ListItem as RNEListItem, ListItemProps} from 'react-native-elements';
import {ThemeDataType} from '@/stores/user';

const ListItem: React.ComponentType<
  ListItemProps & {themeData: ThemeDataType}
> = ({children, themeData, ...props}) => {
  return (
    <RNEListItem
      {...props}
      containerStyle={{
        backgroundColor: themeData.list_item_bg,
        borderColor: themeData.list_item_border,
      }}>
      {children}
    </RNEListItem>
  );
};

export default ListItem;
