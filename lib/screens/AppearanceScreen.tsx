import * as React from 'react';
import ScrollView from '@/components/ScrollView';
import {Text} from 'react-native-elements';
import {StackScreenProps} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import {
  ListItem,
  ListItemContent,
  ListItemTitle,
  ListItemChevron,
} from '@/components/List';
import {useAppStoresContext} from '@/stores';

const AppearanceScreen: React.ComponentType<
  StackScreenProps<StackParamList>
> = observer(({navigation}) => {
  const {userStore, getMessage} = useAppStoresContext();

  return (
    <ScrollView>
      <ListItem
        bottomDivider
        style={{
          marginTop: 16,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
        pad={6}
        onPress={() => navigation.navigate('Theme')}>
        <ListItemContent>
          <ListItemTitle>{getMessage('Theme')}</ListItemTitle>
        </ListItemContent>
        <Text style={{color: '#999999'}}>{getMessage(userStore.theme!)}</Text>
        <ListItemChevron />
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}>
        <ListItemContent>
          <ListItemTitle>聊天墙纸</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
    </ScrollView>
  );
});

export default AppearanceScreen;
