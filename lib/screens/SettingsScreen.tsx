import * as React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Avatar} from 'react-native-elements';
import ScrollView from '@/components/ScrollView';
import {
  Icon,
  ListItem,
  ListItemContent,
  ListItemTitle,
  ListItemChevron,
  ListItemSubtitle,
} from '@/components/List';
import {useAppStoresContext, useTargetStore} from '@/stores';

const SettingsScreen: React.ComponentType<
  StackScreenProps<StackParamList>
> = observer(({navigation}) => {
  const {top} = useSafeAreaInsets();
  const {getMessage, userStore} = useAppStoresContext();
  const {themeData, appTheme} = userStore;

  return (
    <ScrollView style={{...styles.container, paddingTop: top}}>
      <ListItem
        onPress={() => navigation.navigate('Profile')}
        style={{borderRadius: 8, overflow: 'hidden', marginTop: 16}}>
        <Avatar
          rounded
          source={{
            uri:
              'http://b.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9ea5c0e3c23d139b6003bf3b374.jpg',
          }}
          size={56}
        />
        <ListItemContent>
          <ListItemTitle
            style={{fontWeight: 'bold', color: themeData.list_user_name}}>
            梦想很大很大
          </ListItemTitle>
          <ListItemSubtitle>+86 17621398254</ListItemSubtitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>

      <ListItem
        bottomDivider
        style={{
          marginTop: 18,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => navigation.navigate('ModalChild', {screen: 'Account'})}>
        <Icon name="user-circle" darkName="user-circle-o" type="font-awesome" />
        <ListItemContent>
          <ListItemTitle>{getMessage('account')}</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => console.log(1111)}>
        <Icon
          name="shield-link-variant-outline"
          darkName="shield-link-variant"
          type="material-community"
        />
        <ListItemContent>
          <ListItemTitle>{getMessage('linked')}</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>

      <ListItem
        bottomDivider
        style={{
          marginTop: 18,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => navigation.navigate('Appearance')}>
        <Icon name="ios-sunny-outline" darkName="ios-sunny" type="ionicon" />
        <ListItemContent>
          <ListItemTitle>{getMessage('Appearance')}</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => console.log(1111)}>
        <Icon
          name="ios-chatbubble-outline"
          darkName="ios-chatbubble-sharp"
          type="ionicon"
        />
        <ListItemContent>
          <ListItemTitle>{getMessage('chats')}</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => console.log(1111)}>
        <Icon
          name="ios-notifications-outline"
          darkName="ios-notifications-sharp"
          type="ionicon"
        />
        <ListItemContent>
          <ListItemTitle>{getMessage('notifications')}</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => console.log(1111)}>
        <Icon name="lock-outline" darkName="lock" type="material-community" />
        {/* lock */}
        <ListItemContent>
          <ListItemTitle>{getMessage('privacy')}</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => console.log(1111)}>
        <Icon
          name="ios-briefcase-outline"
          darkName="ios-briefcase-sharp"
          type="ionicon"
        />
        <ListItemContent>
          <ListItemTitle>{getMessage('dataUsage')}</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>

      <ListItem
        style={{
          marginTop: 16,
          borderRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => console.log(1111)}>
        <Icon
          name="help-circle-outline"
          darkName="help-circle"
          type="material-community"
        />
        <ListItemContent>
          <ListItemTitle>{getMessage('help')}</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>

      <ListItem
        bottomDivider
        style={{
          marginTop: 18,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => console.log(1111)}>
        {appTheme === 'light' ? (
          <Icon name="email" type="fontisto" />
        ) : (
          <Icon name="email" type="zocial" />
        )}
        <ListItemContent>
          <ListItemTitle>{getMessage('invite_friends')}</ListItemTitle>
        </ListItemContent>
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => console.log(1111)}>
        <Icon
          name="ios-heart-outline"
          darkName="ios-heart-sharp"
          type="ionicon"
        />
        <ListItemContent>
          <ListItemTitle>{getMessage('donate')}</ListItemTitle>
        </ListItemContent>
        <ListItemChevron
          name="ios-open-outline"
          type="ionicon"
          size={18}
          color="#BFBFBF"
        />
      </ListItem>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  back: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default SettingsScreen;
