import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const InputForm = () => {
	return (
		<View>
			<TextInput
				style={styles.input}
				placeholder='로그인'
				placeholderTextColor='#808080'
				// multiline='false'
				autoCapitalize='none'
			/>
			<TextInput
            style={styles.input}
            placeholder='비밀번호'
            placeholderTextColor='#808080'
            // multiline='false'
            secureTextEntry={true}
      />
		</View>
	)
}


const styles = StyleSheet.create({
	input: {
    width: 329,
    height: 53,
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 14,
    borderColor: '#EEEEEE',
    marginBottom: 10,
    paddingLeft: 15,
  }
});

export default InputForm;