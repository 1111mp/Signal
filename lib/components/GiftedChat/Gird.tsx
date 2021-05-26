import React from 'react';
import {
  GestureResponderEvent,
  View,
  Text,
  Dimensions,
  TextStyle,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {RectButton} from 'react-native-gesture-handler';

type Props = {
  onPressHandler: (event: GestureResponderEvent) => void;
  icon: string;
  type: string;
  label?: string;
  iconStyle?: TextStyle;
};

const windowWidth = Dimensions.get('window').width;
const girdWidth = (windowWidth - 24) / 4;

const Gird: React.ComponentType<Props> = ({
  onPressHandler,
  icon,
  type,
  label = '',
  iconStyle,
}) => {
  return (
    <View
      style={{
        width: girdWidth,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 16,
        overflow: 'hidden',
      }}>
      <RectButton
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 62,
          height: 62,
          borderRadius: 12,
          backgroundColor: 'white',
        }}>
        <Icon
          name={icon}
          type={type}
          // @ts-ignore
          iconStyle={{color: '#4c4c4c', ...iconStyle}}
        />
      </RectButton>
      <Text style={{marginTop: 8, color: '#4c4c4c'}}>{label}</Text>
    </View>
  );
};

export default Gird;
