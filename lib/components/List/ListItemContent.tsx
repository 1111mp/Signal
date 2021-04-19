import * as React from 'react';
import {ListItem as RNEListItem, ListItemProps} from 'react-native-elements';
import {ThemeDataType} from '@/stores/user';

const ListItemContent: React.ComponentType<any & {themeData?: ThemeDataType}> = ({
  children,
  themeData,
  ...props
}) => {
  return <RNEListItem.Content {...props}>{children}</RNEListItem.Content>;
};

export default ListItemContent;
