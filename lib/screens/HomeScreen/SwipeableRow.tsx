import React, {MutableRefObject} from 'react';
import {Animated, StyleSheet, Text, Alert} from 'react-native';

import {RectButton, Swipeable} from 'react-native-gesture-handler';

export type Props = {
  onWillOpenHandle: SwipeableHandle;
  swipeableCloseHandle: SwipeableHandle;
};

export type SwipeableHandle = (
  ref: MutableRefObject<Swipeable | undefined>,
) => void;

const SwipeableRow: React.ComponentType<Props> = ({
  children,
  onWillOpenHandle,
  swipeableCloseHandle,
}) => {
  const swipeableRef = React.useRef<Swipeable>();

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction}>
        <Animated.Text style={[styles.actionText]}>Archive</Animated.Text>
      </RectButton>
    );
  };

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    tarX: number,
    progress: Animated.AnimatedInterpolation,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, tarX],
    });

    const pressHandler = () => {
      // this.close();
      Alert.alert(text);
    };

    return (
      <Animated.View
        style={{
          width: 140,
          height: '100%',
          position: 'absolute',
          transform: [{translateX: trans}],
        }}>
        <RectButton
          style={[styles.rightAction, {backgroundColor: color}]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation) => {
    return (
      <Animated.View
        style={{
          width: 192,
          position: 'relative',
        }}>
        {renderRightAction('More1', '#C8C7CD', 192, 0, progress)}
        {renderRightAction('Flag', '#ffab00', 192, 64, progress)}
        {renderRightAction('More2', '#dd2c00', 192, 128, progress)}
      </Animated.View>
    );
  };

  const swipeableWillOpen = () => {
    onWillOpenHandle(swipeableRef);
  };

  const swipeableClose = () => {
    swipeableCloseHandle(swipeableRef);
  };

  return (
    <Swipeable
      // @ts-ignore
      ref={swipeableRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      onSwipeableWillOpen={swipeableWillOpen}
      onSwipeableClose={swipeableClose}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
  rightAction: {
    // alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default SwipeableRow;
