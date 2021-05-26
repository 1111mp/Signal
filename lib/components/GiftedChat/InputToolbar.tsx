import React, {memo, useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Text,
} from 'react-native';
import {GiftedChatProps, ComposerProps} from 'react-native-gifted-chat';
import Gird from './Gird';
import IconFont from '@/components/Iconfont';
import VoiceView from './VoiceView';
import Composer from './Composer';

export const ACCESSORY_HEIGHT = 220;

type Props = {
  pressMoreHandler: ({
    isSound,
    soundShow,
  }: {
    isSound?: boolean;
    soundShow?: boolean;
  }) => void;
  accessoryOpacity: Animated.Value;
  onSetInputToolBarToInitial?: (initial: boolean) => void;
};

const InputToolbar: React.ComponentType<
  GiftedChatProps & ComposerProps & Props
> = memo(props => {
  const [show, setShow] = useState<boolean>(false);
  const [sound, setSound] = useState<boolean>(false);

  const pressMoreHandler = () => {
    props.pressMoreHandler({soundShow: sound});
    if (sound) {
      setSound(false);
    }
  };

  useEffect(() => {
    const _listener = props.accessoryOpacity.addListener(({value}) => {
      if (value === 1) {
        setShow(true);
      }

      if (value === 0) {
        setShow(false);
      }
    });
    return () => {
      props.accessoryOpacity.removeListener(_listener);
    };
  }, []);

  const pressSoundHandler = () => {
    if (show) {
      // setShow(false);
      props.pressMoreHandler({isSound: true});
    } else {
      props.onSetInputToolBarToInitial &&
        props.onSetInputToolBarToInitial(!sound);
    }
    setSound(!sound);
  };

  return (
    <View>
      <View style={[[styles.border, styles.inputToolBar]]}>
        <TouchableOpacity onPress={pressSoundHandler}>
          <IconFont name={sound ? 'keyboard' : 'sound'} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            height: props.composerHeight,
            marginVertical: 8,
            marginHorizontal: 10,
            borderRadius: 6,
            // paddingHorizontal: 6,
            backgroundColor: 'white',
            overflow: 'hidden',
          }}>
          <Composer
            {...props}
            textInputStyle={{
              paddingTop: 8,
              paddingBottom: 0,
              marginHorizontal: 6,
              // backgroundColor: 'red',
            }}
            textInputProps={{
              ...props.textInputProps,
              returnKeyType: 'send',
              blurOnSubmit: false,
              onSubmitEditing: () =>
                // @ts-ignore
                props.onSend({text: props.text!.trim()}, true),
            }}
          />
          {sound ? <VoiceView /> : null}
        </View>
        <TouchableOpacity onPress={pressMoreHandler}>
          <IconFont name="round_add" />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          {
            opacity: props.accessoryOpacity,
            height: ACCESSORY_HEIGHT,
          },
          styles.border,
        ]}>
        {show ? (
          <View style={styles.accessoryContainer}>
            <Gird
              icon="image"
              label="照片"
              type="font-awesome"
              onPressHandler={() => {}}
            />
            <Gird
              icon="camera"
              label="拍摄"
              type="font-awesome"
              onPressHandler={() => {}}
            />
            <Gird
              icon="location-sharp"
              label="位置"
              type="ionicon"
              iconStyle={{fontSize: 30}}
              onPressHandler={() => {}}
            />
            <Gird
              icon="md-folder-sharp"
              label="文件"
              type="ionicon"
              iconStyle={{fontSize: 30}}
              onPressHandler={() => {}}
            />
            <Gird
              icon="ios-person"
              label="联系人"
              type="ionicon"
              iconStyle={{fontSize: 30}}
              onPressHandler={() => {}}
            />
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  inputToolBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
  accessoryContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 8,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  border: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#b2b2b2',
  },
});

export default InputToolbar;
