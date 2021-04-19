import * as React from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ScrollView: React.ComponentType<ScrollViewProps> = ({
  children,
  style,
  ...props
}) => {
  const {top} = useSafeAreaInsets();

  return (
    <RNScrollView
      style={StyleSheet.flatten([
        style,
        {paddingTop: top, paddingHorizontal: 16},
      ])}
      {...props}>
      {children}
    </RNScrollView>
  );
};

export default ScrollView;
