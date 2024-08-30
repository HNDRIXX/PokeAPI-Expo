import React, { Component } from 'react';
import { Text } from 'react-native';
import { Styles } from '../constants';

interface S {
    text: string
}
export default class Note extends Component<S> {    
    render() {
        const { text } = this.props;

        return (
            <Text style={[Styles.Main.textWhiteCenter, Styles.Main.textWhiteCapitalize, Styles.Main.alignJustify, { flex: 1, textAlignVertical: 'center' }]}>{text || 'Lorem Ipsum'}</Text>
        );
    }
}
