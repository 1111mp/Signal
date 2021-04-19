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
import {useHeaderLeft} from '@/hooks';

const OutWardScreen: React.ComponentType<
  StackScreenProps<StackParamList>
> = observer(({navigation}) => {
  const {userStore, getMessage} = useAppStoresContext();

  useHeaderLeft({
    navigation,
    title: '外观',
    themeData: userStore.themeData,
  });

  return (
    <ScrollView>
      <ListItem
        themeData={userStore.themeData}
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
          <ListItemTitle themeData={userStore.themeData}>主题</ListItemTitle>
        </ListItemContent>
        <Text style={{color: '#999999'}}>{getMessage(userStore.theme!)}</Text>
        <ListItemChevron />
      </ListItem>
      <ListItem
        themeData={userStore.themeData}
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}>
        <ListItemContent>
          <ListItemTitle themeData={userStore.themeData}>
            聊天墙纸
          </ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
    </ScrollView>
  );
});

export default OutWardScreen;
