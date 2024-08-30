import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Styles } from '../constants';
import Badge from './Badge';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface S {
    item: {
        name: string;
        order: number;
        types: Array<{ image: string }>;
        image: string;
    };
    navigation: NavigationProp<ParamListBase>;
}

export default class PokemonCard extends Component<S> {
    render() {
        const { item, navigation } = this.props;

        return (
            <TouchableOpacity
                key={item.order}
                style={[Styles.CardStyle.button, Styles.Main.roundBorder]}
                onPress={() => navigation.navigate('Second', item)}
            >
                <Badge number={item?.order || 0} />

                <View style={Styles.Main.alignCenter}>
                    <Image
                        source={{ uri: item.image }}
                        style={Styles.CardStyle.imageCard}
                    />

                    <Text
                        style={[
                            Styles.Main.textWhiteCapitalize,
                            Styles.CardStyle.textName,
                        ]}
                    >
                        {item.name}
                    </Text>

                    <View style={Styles.Main.flexRow}>
                        {item.types.map((type, index : number) => (
                            <Image
                                source={{ uri: type.image }}
                                style={Styles.CardStyle.imageType}
                                key={index}
                                resizeMode="contain"
                            />
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
