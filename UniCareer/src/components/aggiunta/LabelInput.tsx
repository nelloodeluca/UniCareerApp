// LabelInput.tsx
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text, TextInput } from 'react-native-paper';
import { KeyboardTypeOptions } from 'react-native';

const Label = styled(Text)`
    font-size: 18px;
    margin: 8px 0;
    color: #333;
`;

const Input = styled(TextInput)`
    height: 40px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 0 10px;
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
}

const LabelInput: React.FC<LabelInputProps> = ({
                                                 label,
                                                 placeholder,
                                                 value,
                                                 onChangeText,
                                                 keyboardType = 'default',
                                                 multiline = false,
                                                 numberOfLines = 1
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
      />
    </>
  );
};

export default LabelInput;