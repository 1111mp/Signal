import * as React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';
import {Avatar, ListItem, Icon, Overlay} from 'react-native-elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import Modal from 'react-native-modal';
import {useAppStoresContext} from '@/stores';

const ProfileScreen: React.ComponentType<StackScreenProps<StackParamList>> = ({
  navigation,
}) => {
  const scheme = useColorScheme();
  const dark = scheme === 'dark';
  const {top, bottom} = useSafeAreaInsets();
  const {getMessage} = useAppStoresContext();

  const [visible, setVisible] = React.useState(false);

  const bgColor = dark ? '#D4D4D4' : '#ffffff';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: getMessage('profile'),
    });
  }, [navigation]);

  return (
    <ScrollView style={{...styles.container, paddingTop: top}}>
      <View style={styles.avatar}>
        <Avatar
          rounded
          source={{
            uri:
              'http://b.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9ea5c0e3c23d139b6003bf3b374.jpg',
          }}
          size={86}>
          <Avatar.Accessory
            name="camera"
            type="simple-line-icon"
            size={24}
            style={{
              backgroundColor: bgColor,
              width: 30,
              height: 30,
              borderRadius: 15,
            }}
            color="#4E4E4E"
            underlayColor={bgColor}
            onPress={() => setVisible(true)}
          />
        </Avatar>
      </View>

      <ListItem
        bottomDivider
        style={{
          marginTop: 18,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => navigation.navigate('ModalChild', {screen: 'EditName'})}>
        <Icon name="user-o" type="font-awesome" color="#3B3B3B" />
        <ListItem.Content>
          <ListItem.Title>梦想很大大</ListItem.Title>
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
        <Icon name="infocirlceo" type="antdesign" color="#3B3B3B" />
        <ListItem.Content>
          <ListItem.Title>关于</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <View style={{marginTop: 10, paddingHorizontal: 14}}>
        <Text style={{fontSize: 12, lineHeight: 18, color: '#666666'}}>
          您的个人资料已通过端对端加密。您的联系人，以及您接受的新聊天对象将能看到您的个人资料及更新。
          <TouchableHighlight underlayColor="transparent" onPress={() => {}}>
            <Text>了解更多</Text>
          </TouchableHighlight>
        </Text>
      </View>

      <Modal
        isVisible={visible}
        backdropOpacity={0.45}
        backdropTransitionInTiming={150}
        onBackdropPress={() => setVisible(false)}
        style={styles.view}>
        <ListItem
          bottomDivider
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'hidden',
          }}>
          <ListItem.Content style={styles.center}>
            <ListItem.Title style={{fontWeight: 'bold'}}>
              设置头像
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider onPress={() => {}}>
          <ListItem.Content style={styles.center}>
            <ListItem.Title>相机</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider onPress={() => {}}>
          <ListItem.Content style={styles.center}>
            <ListItem.Title>相册</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider onPress={() => {}}>
          <ListItem.Content style={styles.center}>
            <ListItem.Title>移除照片</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          bottomDivider
          containerStyle={{paddingBottom: bottom}}
          onPress={() => {}}>
          <ListItem.Content style={styles.center}>
            <ListItem.Title>取消</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default ProfileScreen;
