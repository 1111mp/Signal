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
import {useTargetStore} from '@/stores';

const SettingsScreen: React.ComponentType<
  StackScreenProps<StackParamList>
> = observer(({navigation}) => {
  const {top} = useSafeAreaInsets();
  const {themeData} = useTargetStore('userStore');

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
        <Icon name="user-circle-o" type="font-awesome" />
        <ListItemContent>
          <ListItemTitle>账户</ListItemTitle>
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
        <Icon name="vector-link" type="material-community" />
        <ListItemContent>
          <ListItemTitle>已关联设备</ListItemTitle>
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
        <Icon name="sun" type="feather" />
        <ListItemContent>
          <ListItemTitle>外观</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => console.log(1111)}>
        <Icon name="ios-chatbubble-outline" type="ionicon" />
        <ListItemContent>
          <ListItemTitle>聊天</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => console.log(1111)}>
        <Icon name="ios-notifications-outline" type="ionicon" />
        <ListItemContent>
          <ListItemTitle>通知</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => console.log(1111)}>
        <Icon name="lock-outline" type="material-community" />
        {/* lock */}
        <ListItemContent>
          <ListItemTitle>隐私</ListItemTitle>
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
        <Icon name="ios-briefcase-outline" type="ionicon" />
        <ListItemContent>
          <ListItemTitle>数据使用量</ListItemTitle>
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
        <Icon name="help-circle-outline" type="material-community" />
        <ListItemContent>
          <ListItemTitle>帮助</ListItemTitle>
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
        <Icon name="email" type="fontisto" />
        {/* <Icon name="email" type="zocial"  /> */}
        <ListItemContent>
          <ListItemTitle>邀请您的朋友</ListItemTitle>
        </ListItemContent>
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => console.log(1111)}>
        <Icon name="ios-heart-outline" type="ionicon" />
        <ListItemContent>
          <ListItemTitle>捐赠 Signal</ListItemTitle>
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
