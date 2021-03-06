import * as React from 'react';
import {observer} from 'mobx-react';
import {ListItem as RNEListItem} from 'react-native-elements';
import {useTargetStore} from '@/stores';

const ListItemCheckBox: React.ComponentType<any> = observer(
  ({children, ...props}) => {
    const {themeData} = useTargetStore('userStore');

    return (
      <RNEListItem.CheckBox {...props} checkedColor={themeData.list_item_check}>
        {children}
      </RNEListItem.CheckBox>
    );
  },
);

export default ListItemCheckBox;
