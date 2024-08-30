import React, { Component } from 'react';
import { Image, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Styles } from '../constants';

interface S {
    number: number
    style?: StyleProp<ViewStyle>
}
export default class Badge extends Component<S> {    
    render() {
        const { number, style } = this.props;

        return (
            <View style={[Styles.StyleBadge.container, style]}>
                <Image
                    source={require('../assets/images/pokeball.webp')}
                    style={Styles.CardStyle.imageBadge}
                    resizeMode="contain"
                />

                <Text style={Styles.Main.textWhiteCenter}>
                    {String(number).padStart(4, '0')}
                </Text>
            </View>
        );
    }
}
