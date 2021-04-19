import * as React from 'react';
import {ListItem as RNEListItem} from 'react-native-elements';
import {ThemeDataType} from '@/stores/user';

const ListItemCheckBox: React.ComponentType<
  any & {themeData?: ThemeDataType}
> = ({children, themeData, ...props}) => {
  return (
    <RNEListItem.CheckBox {...props} checkedColor={themeData.list_item_check}>
      {children}
    </RNEListItem.CheckBox>
  );
};

export default ListItemCheckBox;
