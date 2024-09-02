import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Styles } from '../constants';
import Badge from './Badge';
import { Navigation, PokemonResultObj, TypeObj } from '../types';

interface S {
    item: PokemonResultObj
    navigation: Navigation['navigation']
}
export default class PokemonCard extends Component<S> {

    render() {
    const { item } = this.props

        return (
            <TouchableOpacity
                key={item.order}
                style={[Styles.CardStyle.button, Styles.Main.roundBorder]}
                onPress={() => this.props.navigation.navigate('Details', { name: item.name })}
            >
                <Badge number={item?.order || 0} />

                <View style={Styles.Main.alignCenter}>
                    <Image
                        source={{ uri: item.image || undefined }}
                        style={Styles.CardStyle.imageCard}
                    />

                    <Text
                        style={[
                            Styles.Main.textWhiteCapitalize,
                            Styles.CardStyle.textName,
                        ]}
                        testID='name'                    
                    >
                        {item.name}
                    </Text>

                    <View style={Styles.Main.flexRow}>
                        {item.types.map((type : TypeObj, index : number) => (
                            <Image
                                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${Number(type.type.url.split('/').filter(Boolean).pop())}.png` }}
                                key={index}
                                resizeMode='contain'
                                style={{ width: 65, height: 15, margin: 5, borderRadius: 5, overflow: 'hidden' }}
                            />
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
