import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { Strings, Colors } from '../constants';

interface S {
    value: string;
    onChangeText: (text: string) => void;
}
export default class SearchBar extends Component<S> {
    render() {
        const { value, onChangeText } = this.props;

        return (
            <TextInput
                placeholder={Strings.searchPlaceholder}
                placeholderTextColor={'#fff'}
                style={{
                    backgroundColor: Colors.medium.gray,
                    width: '90%',
                    marginVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    color: '#fff',
                }}
                value={value}
                onChangeText={onChangeText}
            />
        );
    }
}
