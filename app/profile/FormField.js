import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useField } from 'formik';

const FormField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        onChangeText={field.onChange(props.name)}
        onBlur={field.onBlur(props.name)}
        value={field.value}
      />
      {meta.touched && meta.error && (
        <Text style={{ color: 'red' }}>{meta.error}</Text>
      )}
    </View>
  );
};

export default FormField;