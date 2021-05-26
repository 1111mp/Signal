import React, {useEffect, useRef, useState} from 'react';
import {Text, View, PanResponder, StyleSheet, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
// import {debounce} from 'throttle-debounce';

type AudioType = {
  path: string;
  currentTime: number;
  hasPermission: boolean;
  status: 'initial' | 'recording' | 'pause';
  recordFinished: boolean;
};

const VoiceView: React.ComponentType = () => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => false,

      onPanResponderGrant: (evt, gestureState) => {
        setActivated(true);
        _record();
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy < -60) {
          setCancle(true);
        } else {
          setCancle(false);
        }
      },

      onPanResponderTerminationRequest: (e, gestureState) => false,

      onPanResponderRelease: (evt, gestureState) => {
        setActivated(false);
        _finish(gestureState.dy < -60 ? true : false);
        setTimeout(() => {
          setCancle(false);
          setMetering(-50);
        }, 100);
      },

      onPanResponderTerminate: (e, gestureState) => null,
      onShouldBlockNativeResponder: (e, gestureState) => true,
    }),
  ).current;

  const audioInfo = useRef<AudioType>({
    path: AudioUtils.DocumentDirectoryPath + '/default.aac',
    currentTime: 0.0,
    hasPermission: false,
    status: 'initial',
    recordFinished: false,
  }).current;

  const [activated, setActivated] = useState<boolean>(false);
  const [cancle, setCancle] = useState<boolean>(false);
  const [metering, setMetering] = useState<number>(-50);

  useEffect(() => {
    AudioRecorder.requestAuthorization().then(isAuthorised => {
      console.log(isAuthorised);
      audioInfo.hasPermission = isAuthorised;
      if (!isAuthorised) return;

      prepareRecordingPath(audioInfo.path);

      AudioRecorder.onProgress = onProgressHandler;

      AudioRecorder.onFinished = data => {
        console.log(data);
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          _finishRecording(
            data.status === 'OK',
            data.audioFileURL,
            (data as any).audioFileSize,
          );
        }
      };
    });
  }, []);

  const prepareRecordingPath = (audioPath: string) => {
    // Android MeteringEnabled: https://github.com/jsierles/react-native-audio/issues/292
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      MeteringEnabled: Platform.OS === 'ios',
      AudioEncodingBitRate: 32000,
    });
  };

  const onProgressHandler = (data: {
    currentTime: number;
    currentMetering: number;
  }) => {
    console.log(data);
    audioInfo.currentTime = Math.floor(data.currentTime);
    setMetering(Math.floor(data.currentMetering));
  };

  const _finishRecording = (
    didSucceed: boolean,
    filePath: string,
    fileSize?: number,
  ) => {
    console.log(
      `Finished recording of duration ${
        audioInfo.currentTime
      } seconds at path: ${filePath} and size of ${fileSize || 0} bytes`,
    );
  };

  // start record
  const _record = async () => {
    if (audioInfo.status === 'recording') {
      console.warn('Already recording!');
      return;
    }

    if (!audioInfo.hasPermission) {
      console.log("Can't record, no permission granted!");
      return;
    }

    try {
      const filePath = await AudioRecorder.startRecording();
      audioInfo.status = 'recording';
    } catch (error) {
      console.error(error);
    }
  };

  // pause record
  const _pause = async () => {
    if (audioInfo.status !== 'recording') {
      console.warn("Can't pause, not recording!");
      return;
    }

    try {
      const filePath = await AudioRecorder.pauseRecording();
      audioInfo.status = 'pause';
    } catch (error) {
      console.error(error);
    }
  };

  // resume record
  const _resume = async () => {
    if (audioInfo.status !== 'pause') {
      console.warn("Can't resume, not paused!");
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      audioInfo.status = 'recording';
    } catch (error) {
      console.error(error);
    }
  };

  // stop record
  const _stop = async (): Promise<string | undefined> => {
    if (audioInfo.status !== 'recording') {
      console.warn("Can't stop, not recording!");
      return;
    }

    try {
      const filePath = await AudioRecorder.stopRecording();
      audioInfo.recordFinished = true;
      audioInfo.status = 'initial';

      if (Platform.OS === 'android') {
        _finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  // finish record
  const _finish = async (cancle: boolean = false) => {
    let filePath = await _stop();

    if (cancle) {
      console.log('cancle send sound');
      return;
    }

    if (audioInfo.currentTime < 1) {
      // talking time is too short
      console.log('talking time is too short');
    }

    // start send
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {backgroundColor: activated ? '#d9d9d9' : 'white'},
        ]}
        {...panResponder.panHandlers}>
        <Text style={styles.text}>{activated ? '松开 结束' : '按住 说话'}</Text>
      </View>
      <Modal
        isVisible={activated}
        animationIn="fadeIn"
        animationOut="fadeOut"
        hasBackdrop={false}
        style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name="microphone"
              type="font-awesome"
              iconStyle={{fontSize: 56, color: 'white'}}
            />
            <View style={styles.volumeContainer}>
              <View
                style={[
                  styles.volume,
                  {width: '100%', opacity: metering > 2.5 ? 1 : 0},
                ]}></View>
              <View
                style={[
                  styles.volume,
                  {width: '90%', opacity: metering > -5 ? 1 : 0},
                ]}></View>
              <View
                style={[
                  styles.volume,
                  {width: '80%', opacity: metering > -12.5 ? 1 : 0},
                ]}></View>
              <View
                style={[
                  styles.volume,
                  {width: '70%', opacity: metering > -20 ? 1 : 0},
                ]}></View>
              <View
                style={[
                  styles.volume,
                  {width: '60%', opacity: metering > -27.5 ? 1 : 0},
                ]}></View>
              <View
                style={[
                  styles.volume,
                  {width: '50%', opacity: metering > -35 ? 1 : 0},
                ]}></View>
              <View
                style={[
                  styles.volume,
                  {width: '40%', opacity: metering > -42.5 ? 1 : 0},
                ]}></View>
              <View
                style={[
                  styles.volume,
                  {width: '30%', opacity: metering > -50 ? 1 : 0},
                ]}></View>
            </View>
          </View>
          <Text style={styles.modalText}>
            {cancle ? '松开手指，取消发送' : '手指上滑，取消发送'}
          </Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  text: {
    fontSize: 18,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 24,
    marginBottom: 16,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  modalText: {
    marginBottom: 16,
    fontSize: 12,
    color: 'white',
  },
  volumeContainer: {
    width: 30,
    height: 70,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 4,
    marginLeft: 4,
    // backgroundColor: 'red',
    overflow: 'hidden',
  },
  volume: {
    width: '100%',
    height: 5,
    marginTop: 2,
    backgroundColor: 'white',
  },
});

export default VoiceView;
