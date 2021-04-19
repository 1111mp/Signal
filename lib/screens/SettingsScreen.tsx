import * as React from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import {useAuthContext} from '@/AuthContext';
import {useHeaderLeft} from '@/hooks';

const SettingsScreen: React.ComponentType<StackScreenProps<StackParamList>> = ({
  navigation,
}) => {
  const {getMessage} = useAuthContext();
  const {top} = useSafeAreaInsets();

  useHeaderLeft({navigation, title: getMessage('settings'), text: '完成'});

  return (
    <ScrollView style={{...styles.container, paddingTop: top}}>
      <ListItem
        onPress={() => navigation.navigate('Info')}
        style={{borderRadius: 8, overflow: 'hidden', marginTop: 16}}>
        <Avatar
          rounded
          source={{
            uri:
              'http://b.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9ea5c0e3c23d139b6003bf3b374.jpg',
          }}
          size={56}
        />
        <ListItem.Content>
          <ListItem.Title style={{fontWeight: 'bold'}}>
            梦想很大很大
          </ListItem.Title>
          <ListItem.Subtitle style={{marginTop: 6, color: '#696969'}}>
            +86 17621398254
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
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
        <Icon name="user-circle-o" type="font-awesome" color="#3B3B3B" />
        <ListItem.Content>
          <ListItem.Title>账户</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => console.log(1111)}>
        <Icon name="vector-link" type="material-community" color="#3B3B3B" />
        <ListItem.Content>
          <ListItem.Title>已关联设备</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem
        bottomDivider
        style={{
          marginTop: 18,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => navigation.navigate('OutWard')}>
        <Icon name="sun" type="feather" color="#3B3B3B" />
        <ListItem.Content>
          <ListItem.Title>外观</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => console.log(1111)}>
        <Icon name="ios-chatbubble-outline" type="ionicon" color="#3B3B3B" />
        <ListItem.Content>
          <ListItem.Title>聊天</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => console.log(1111)}>
        <Icon name="ios-notifications-outline" type="ionicon" color="#3B3B3B" />
        <ListItem.Content>
          <ListItem.Title>通知</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => console.log(1111)}>
        <Icon name="lock-outline" type="material-community" color="#3B3B3B" />
        {/* lock */}
        <ListItem.Content>
          <ListItem.Title>隐私</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => console.log(1111)}>
        <Icon name="ios-briefcase-outline" type="ionicon" color="#3B3B3B" />
        <ListItem.Content>
          <ListItem.Title>数据使用量</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
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
          type="material-community"
          color="#3B3B3B"
        />
        <ListItem.Content>
          <ListItem.Title>帮助</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
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
        <Icon name="email" type="fontisto" color="#3B3B3B" />
        {/* <Icon name="email" type="zocial" color="#3B3B3B" /> */}
        <ListItem.Content>
          <ListItem.Title>邀请您的朋友</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => console.log(1111)}>
        <Icon name="ios-heart-outline" type="ionicon" color="#3B3B3B" />
        <ListItem.Content>
          <ListItem.Title>捐赠 Signal</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron
          name="ios-open-outline"
          type="ionicon"
          size={18}
          color="#BFBFBF"
        />
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  back: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
});

export default SettingsScreen;
