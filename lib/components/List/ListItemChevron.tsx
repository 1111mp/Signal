import * as React from 'react';
import {ListItem as RNEListItem} from 'react-native-elements';
import {ThemeDataType} from '@/stores/user';

const ListItemChevron: React.ComponentType<
  any & {themeData?: ThemeDataType}
> = ({children, themeData, ...props}) => {
  return <RNEListItem.Chevron {...props}>{children}</RNEListItem.Chevron>;
};

export default ListItemChevron;
