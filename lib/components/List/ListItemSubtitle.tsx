import * as React from 'react';
import {observer} from 'mobx-react';
import {ListItem as RNEListItem} from 'react-native-elements';
import {useTargetStore} from '@/stores';

const ListItemSubtitle: React.ComponentType<any> = observer(
  ({children, ...props}) => {
    const {themeData} = useTargetStore('userStore');
    return (
      <RNEListItem.Subtitle
        {...props}
        style={{
          marginTop: 6,
          color: themeData.list_item_subtitle,
        }}>
        {children}
      </RNEListItem.Subtitle>
    );
  },
);

export default ListItemSubtitle;
