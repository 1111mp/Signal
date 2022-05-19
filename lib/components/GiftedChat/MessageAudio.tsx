import React, {memo, useRef, useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {BubbleProps, IMessage} from 'react-native-gifted-chat';
import {RectButton} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';

export type Props = BubbleProps<IMessage> & {
  currentMessage: {
    audio?: {
      url: string;
      duration: number;
    };
  };
};

type SoundType = {
  instance: Sound | null;
  playing: boolean;
};

const MessageAudio: React.ComponentType<Props> = ({
  position,
  currentMessage,
}) => {
  const _sound = useRef<Sound | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const {audio} = currentMessage!;

  //max 180
  const padding = Math.min(180, audio!.duration * 3);

  const _play = () => {
    if (playing) return;

    if (_sound.current !== null) {
      _sound.current?.play(success => {
        if (success) {
        } else {
          // error
        }
      });
    } else {
      _sound.current = new Sound(audio!.url, '', error => {
        if (error) {
          return console.log(error);
        }

        _sound.current?.play(success => {
          if (success) {
            setPlaying(false);
          } else {
            // error
          }
        });
      });
    }
    setPlaying(true);
  };

  const _stop = () => {
    if (!playing) return;
    _sound.current?.stop(() => {
      setPlaying(false);
    });
  };

  const pressHandler = () => {
    playing ? _stop() : _play();
  };

  return (
    <RectButton onPress={pressHandler}>
      <View
        style={[
          styles.container,
          position === 'left'
            ? {paddingRight: padding}
            : {paddingLeft: padding},
        ]}>
        {position === 'left' ? (
          <>
            <Image
              resizeMode="cover"
              source={
                playing
                  ? require('assets/images/receiverVoicePlayingBlack.gif')
                  : require('assets/images/receiverVoice.png')
              }
              style={[styles.image, styles.imageLeft]}
            />
            <Text>{audio!.duration} ''</Text>
          </>
        ) : (
          <>
            <Text>9 ''</Text>
            <Image
              resizeMode="cover"
              source={
                playing
                  ? require('assets/images/senderVoicePlayingBlack.gif')
                  : require('assets/images/senderVoice.png')
              }
              style={[styles.image, styles.imageRight]}
            />
          </>
        )}
      </View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  image: {
    width: 20,
    height: 20,
  },
  imageLeft: {
    marginRight: 4,
    // tintColor: 'black',
  },
  imageRight: {
    marginLeft: 4,
    // tintColor: 'black',
  },
});

export default MessageAudio;
