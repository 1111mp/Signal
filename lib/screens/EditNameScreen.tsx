import * as React from 'react';
import {TextInput} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Input} from 'react-native-elements';
import ScrollView from '@/components/ScrollView';
import {ListItem, ListItemContent} from '@/components/List';

const EditNameScreen: React.ComponentType<StackScreenProps<StackParamList>> = ({
  navigation,
}) => {
  const submitRef = React.useRef<TextInput>();

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <ListItem
        bottomDivider
        style={{
          marginTop: 16,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
        containerStyle={{padding: 4}}>
        <ListItemContent>
          <Input
            placeholder="姓（可选）"
            autoFocus={true}
            renderErrorMessage={false}
            blurOnSubmit={false}
            returnKeyType="next"
            inputContainerStyle={{borderBottomWidth: 0}}
            onSubmitEditing={() => submitRef.current?.focus()}
          />
        </ListItemContent>
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}
        containerStyle={{padding: 4}}>
        <ListItemContent>
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
        </ListItemContent>
      </ListItem>
    </ScrollView>
  );
};

export default EditNameScreen;
