import React, {useCallback, useState} from 'react';

import GiftedChat from '@/components/GiftedChat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import {View, StyleSheet, Platform} from 'react-native';
import messagesData from './messages';
import MessageAudio, {
  Props as MessageAudioProps,
} from '@/components/GiftedChat/MessageAudio';
import {
  Bubble,
  BubbleProps,
  IMessage,
  MessageText,
  MessageTextProps,
} from 'react-native-gifted-chat';
// import {Easing} from 'react-native-reanimated';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   Easing,
//   useDerivedValue,
// } from 'react-native-reanimated';
// import {TouchableOpacity} from 'react-native-gesture-handler';

// dayjs.extend(advancedFormat);
// dayjs.extend(calendar);

// console.log(
//   dayjs('2021-05-20 13:00:00').calendar(dayjs('2021-05-21'), {
//     sameDay: '[Today at] hh:mm A', // The same day ( Today at 2:30 AM )
//     nextDay: '[Tomorrow at] h:mm A', // The next day ( Tomorrow at 2:30 AM )
//     nextWeek: 'dddd [at] h:mm A', // The next week ( Sunday at 2:30 AM )
//     lastDay: '[Yesterday at] kk:mm', // The day before ( Yesterday at 2:30 AM )
//     lastWeek: '[Last] dddd [at] h:mm A', // Last week ( Last Monday at 2:30 AM )
//     sameElse: 'DD/MM/YYYY', // Everything else ( 17/10/2011 )
//   }),
// );

const ChatRoom: React.ComponentType = () => {
  const [messages, setMessages] = useState(messagesData);
  const insets = useSafeAreaInsets();

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <GiftedChat
        inverted={true}
        messages={messages}
        alignTop={true}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
          avatar:
            'http://b.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9ea5c0e3c23d139b6003bf3b374.jpg',
        }}
        bottomOffset={insets.bottom}
        renderAvatarOnTop={true}
        showUserAvatar={true}
        renderUsernameOnMessage={false}
        showAvatarForEveryMessage={true}
        minComposerHeight={44}
        maxComposerHeight={100}
        minInputToolbarHeight={60}
        messagesContainerStyle={{backgroundColor: '#ededed'}}
        renderMessageAudio={(props: MessageAudioProps) => (
          <MessageAudio {...props} />
        )}
        renderTime={() => null}
        renderBubble={(props: BubbleProps<IMessage>) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: styles.wrapperLeft,
              right: styles.wrapperRight,
            }}
          />
        )}
        renderMessageText={(props: MessageTextProps<IMessage>) => (
          <MessageText
            {...props}
            textStyle={{left: styles.textLeft, right: styles.textRight}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperLeft: {
    // paddingVertical: 6,
    // paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  wrapperRight: {
    // paddingVertical: 6,
    // paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#66dacd',
    // backgroundColor: '#a9e87a',
  },
  textLeft: {
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  textRight: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    color: 'black',
  },
});

export default ChatRoom;
