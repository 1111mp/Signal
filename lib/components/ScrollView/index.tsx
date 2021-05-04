import * as React from 'react';
import {observer} from 'mobx-react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTargetStore} from '@/stores';

const ScrollView: React.ComponentType<ScrollViewProps> = observer(
  ({children, style, ...props}) => {
    const {top} = useSafeAreaInsets();
    const {themeData} = useTargetStore('userStore');

    return (
      <RNScrollView
        style={StyleSheet.flatten([
          {
            paddingTop: top,
            paddingHorizontal: 16,
            backgroundColor: themeData.container_modal,
          },
          style,
        ])}
        {...props}>
        {children}
      </RNScrollView>
    );
  },
);

export default ScrollView;
