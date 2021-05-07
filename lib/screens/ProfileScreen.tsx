import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import Modal from 'react-native-modal';
import {
  Icon,
  ListItem,
  ListItemContent,
  ListItemTitle,
  ListItemChevron,
} from '@/components/List';
import ScrollView from '@/components/ScrollView';
import {useAppStoresContext} from '@/stores';

const ProfileScreen: React.ComponentType<StackScreenProps<StackParamList>> = ({
  navigation,
}) => {
  const scheme = useColorScheme();
  const dark = scheme === 'dark';
  const {bottom} = useSafeAreaInsets();
  const {getMessage, userStore} = useAppStoresContext();

  const [visible, setVisible] = React.useState(false);

  const bgColor = dark ? '#D4D4D4' : '#ffffff';

  return (
    <ScrollView>
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
        <Icon name="user-o" darkName="user" type="font-awesome" />
        <ListItemContent>
          <ListItemTitle>梦想很大大</ListItemTitle>
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
          name="exclamationcircleo"
          darkName="exclamationcircle"
          type="antdesign"
        />
        <ListItemContent>
          <ListItemTitle>{getMessage('about')}</ListItemTitle>
        </ListItemContent>
        <ListItemChevron />
      </ListItem>
      <View style={{marginTop: 10, paddingHorizontal: 14}}>
        <Text style={{fontSize: 12, lineHeight: 18, color: '#666666'}}>
          {getMessage('profile_introduction')}
          <TouchableHighlight underlayColor="transparent" onPress={() => {}}>
            <Text
              style={{
                marginBottom: -2,
                color: userStore.themeData.list_item_title,
              }}>
              {getMessage('learn_more')}
            </Text>
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
          <ListItemContent style={styles.center}>
            <ListItemTitle style={{fontWeight: 'bold'}}>
              {getMessage('set_profile_photo')}
            </ListItemTitle>
          </ListItemContent>
        </ListItem>
        <ListItem bottomDivider onPress={() => {}}>
          <ListItemContent style={styles.center}>
            <ListItemTitle>{getMessage('camera')}</ListItemTitle>
          </ListItemContent>
        </ListItem>
        <ListItem bottomDivider onPress={() => {}}>
          <ListItemContent style={styles.center}>
            <ListItemTitle>{getMessage('photo_library')}</ListItemTitle>
          </ListItemContent>
        </ListItem>
        <ListItem bottomDivider onPress={() => {}}>
          <ListItemContent style={styles.center}>
            <ListItemTitle>{getMessage('remove_photo')}</ListItemTitle>
          </ListItemContent>
        </ListItem>
        <ListItem
          bottomDivider
          containerStyle={{paddingBottom: bottom}}
          onPress={() => {}}>
          <ListItemContent style={styles.center}>
            <ListItemTitle>{getMessage('cancel')}</ListItemTitle>
          </ListItemContent>
        </ListItem>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
