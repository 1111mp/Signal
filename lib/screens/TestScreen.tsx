import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

type InfoType = {
  maxHeight: number | undefined;
  isFirstLayout: boolean;
  accessoryShow: boolean;
  keyboardShow: boolean;
};

const TestScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const height = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const inputRef = useRef<TextInput>(null);
  const info = useRef<InfoType>({
    maxHeight: undefined,
    isFirstLayout: true,
    accessoryShow: false,
    keyboardShow: false,
  });

  const onMainViewLayout = e => {
    // fix an issue when keyboard is dismissing during the initialization
    const {layout} = e.nativeEvent;
    // console.log(layout.height);
    if (
      info.current.maxHeight !== layout.height ||
      info.current.isFirstLayout === true
    ) {
      // this.setMaxHeight(layout.height);
      info.current.maxHeight = layout.height;
      // console.log(maxHeight.current);

      console.log(info.current);

      height.setValue(info.current.maxHeight! - 56);
    }
    if (info.current.isFirstLayout === true) {
      info.current.isFirstLayout = false;
    }
  };

  const pressHandler = () => {
    // console.log(isShow.current);
    // return
    if (info.current.accessoryShow === true) {
      if (info.current.keyboardShow === false) {
        // isShow.current = false;
        inputRef.current?.focus();
      } else {
        Animated.timing(height, {
          toValue: info.current.maxHeight! - 56,
          duration: 250,
          useNativeDriver: false,
        }).start(() => {
          info.current.accessoryShow = false;
        });
      }
    } else {
      // Keyboard.dismiss(),
      if (info.current.keyboardShow) {
        info.current.accessoryShow = true;
        Keyboard.dismiss();
      } else {
        Animated.parallel([
          Animated.timing(height, {
            toValue: info.current.maxHeight - 56 - 200,
            duration: 250,
            useNativeDriver: false,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 30,
            useNativeDriver: false,
          }),
        ]).start(() => {
          info.current.accessoryShow = true;
        });
      }
    }
  };

  const _keyboardWillShow = e => {
    if (info.current.accessoryShow === true) {
      Animated.parallel([
        Animated.timing(height, {
          toValue:
            info.current.maxHeight -
            56 +
            bottom -
            (e.endCoordinates ? e.endCoordinates.height : e.end.height),
          duration: e.duration,
          useNativeDriver: false,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: e.duration,
          useNativeDriver: false,
        }),
      ]).start(() => {
        info.current.accessoryShow = false;
      });
    } else {
      height.setValue(
        info.current.maxHeight -
          56 +
          bottom -
          (e.endCoordinates ? e.endCoordinates.height : e.end.height),
      );
    }

    info.current.keyboardShow = true;
  };

  const _keyboardWillHide = e => {
    if (info.current.accessoryShow === true) {
      // height.setValue(maxHeight.current! - 56 - 200);
      Animated.parallel([
        Animated.timing(height, {
          toValue: info.current.maxHeight - 56 - 200,
          duration: 100,
          useNativeDriver: false,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      console.log(33333);
      // height.setValue(info.current.maxHeight - 56)
      Animated.timing(height, {
        toValue: info.current.maxHeight - 56,
        duration: e.duration,
        useNativeDriver: false,
        easing: Easing.out(Easing.circle),
      }).start();
    }
    info.current.keyboardShow = false;
  };

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', _keyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
    };
  }, []);

  const closeAllHandler = () => {
    if (info.current.accessoryShow === true) {
      Animated.parallel([
        Animated.timing(height, {
          toValue: info.current.maxHeight - 56,
          duration: 250,
          useNativeDriver: false,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start(() => {
        info.current.accessoryShow = false;
      });
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <View style={{flex: 1}} onLayout={onMainViewLayout}>
        <KeyboardAvoidingView enabled>
          <Animated.View style={{height: height}}>
            <ScrollView
              onScrollEndDrag={Keyboard.dismiss}
              onTouchEnd={closeAllHandler}
              style={{flex: 1, backgroundColor: 'red'}}></ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>

        <View style={{height: 56}}>
          <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{marginRight: 8}} onPress={pressHandler}>
              <View>
                <Text>actions</Text>
              </View>
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={{flex: 1, height: 56}}
              placeholder="send"
            />
          </View>
        </View>
        <Animated.View
          style={{
            height: 200,
            backgroundColor: 'yellow',
            opacity,
          }}></Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputTool: {
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TestScreen;
