import React, {useRef} from 'react';
import {
  Text,
  Alert,
  StyleSheet,
  TouchableHighlight,
  LayoutChangeEvent,
} from 'react-native';
import {observer} from 'mobx-react';
import {useTargetStore} from '@/stores';
import {RectButton} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  item: any;
  navigation: StackNavigationProp<StackParamList>;
};

const Row: React.ComponentType<Props> = observer(({item, navigation}) => {
  const {themeData} = useTargetStore('userStore');

  return (
    <RectButton
      style={[styles.rectButton, {backgroundColor: themeData.home_row_bg}]}
      onPress={() => navigation.navigate('ChatRoom')}>
      <>
        <Text style={styles.fromText}>{item.from}</Text>
        <Text numberOfLines={2} style={styles.messageText}>
          {item.message}
        </Text>
        <Text style={styles.dateText}>
          {item.when} {'❭'}
        </Text>
      </>
    </RectButton>
  );
});

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  fromText: {
    fontWeight: 'bold',
    // backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    // backgroundColor: 'transparent',
  },
  dateText: {
    // backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default Row;
