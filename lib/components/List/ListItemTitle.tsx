import * as React from 'react';
import {ListItem as RNEListItem} from 'react-native-elements';
import {ThemeDataType} from '@/stores/user';

const ListItemTitle: React.ComponentType<any & {themeData: ThemeDataType}> = ({
  children,
  themeData,
  ...props
}) => {
  return (
    <RNEListItem.Title {...props} style={{color: themeData.list_item_title}}>
      {children}
    </RNEListItem.Title>
  );
};

export default ListItemTitle;
