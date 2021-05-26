import React from 'react';
import {IconProps} from 'react-native-elements';
import {createIconSet} from 'react-native-vector-icons';
import glyphMap from './iconfont.json';

const IconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

// export default iconSet;
export const {Button, getImageSource, getImageSourceSync} = IconSet;

const IconFont: React.FC<IconProps> = ({name, iconStyle}) => {
  return <IconSet name={name} style={[{fontSize: 32}, iconStyle]} />;
};

export default IconFont;
