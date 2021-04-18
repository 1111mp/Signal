import * as React from 'react';
import {TextInput} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ListItem, Input} from 'react-native-elements';
import ScrollView from '@/components/ScrollView';
import {useHeaderLeft} from '@/hooks';

const EditNameScreen: React.ComponentType<StackScreenProps<StackParamList>> = ({
  navigation,
}) => {
  const submitRef = React.useRef<TextInput>();

  useHeaderLeft({navigation, title: '你的名字', text: '取消'});

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={{paddingHorizontal: 16}}>
      <ListItem
        bottomDivider
        style={{
          marginTop: 16,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
        containerStyle={{padding: 4}}>
        <ListItem.Content>
          <Input
            placeholder="姓（可选）"
            autoFocus={true}
            renderErrorMessage={false}
            blurOnSubmit={false}
            returnKeyType="next"
            inputContainerStyle={{borderBottomWidth: 0}}
            onSubmitEditing={() => submitRef.current?.focus()}
          />
        </ListItem.Content>
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}
        containerStyle={{padding: 4}}>
        <ListItem.Content>
          <Input
            //@ts-ignore
            ref={submitRef}
            placeholder="名（必须）"
            renderErrorMessage={false}
            blurOnSubmit={false}
            returnKeyType="done"
            inputContainerStyle={{borderBottomWidth: 0}}
            // errorStyle={{height: 0}}
          />
        </ListItem.Content>
      </ListItem>
    </ScrollView>
  );
};

export default EditNameScreen;
