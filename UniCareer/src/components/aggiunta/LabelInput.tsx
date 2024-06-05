
import React from 'react';
import styled from 'styled-components/native';
import { Text, TextInput } from 'react-native-paper';
import { KeyboardTypeOptions } from 'react-native';

const Label = styled(Text)`
  font-size: 18px;
  margin: 4px 0;
  color: #333;
`;

const Input = styled(TextInput)`
  height: 40px;
  border: 1px solid #cccccc70;
  margin-bottom: 10px;
  padding: 0 10px 0 0;
  border-radius: 5px;
  background-color: #fff;
`;

interface LabelInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
}

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  maxLength = 50,
}) => {
  return (
    <>
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
      />
    </>
  );
};

export default LabelInput;
