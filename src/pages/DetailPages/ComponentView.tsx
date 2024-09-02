import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Strings, Styles } from '../../constants';

import ComponentController from './ComponentController';
import { Badge, Loader, Note, SearchBar } from '../../components';

export default class DetailPage extends ComponentController {

    render() {
        const { data, search, loading, error } = this.state

        return (
            <SafeAreaView style={Styles.StyleDetails.container}>
                <SearchBar
                    value={search}
                    onChangeText={this.onSearch}
                />

                {loading ? <Loader style={{ flex: 1 }} /> :
                    error ? <Note text={Strings.pokemonNotFound} /> : (
                    <>
                        <Badge number={data.order} style={{ marginTop: 10 }} />

                        <Image
                            source={{ uri: data.image }}
                            style={Styles.StyleDetails.imagePokemon}
                        />

                        <Text style={Styles.StyleDetails.textName}>
                            {data.name}
                        </Text>

                        <ScrollView style={Styles.StyleDetails.wrapper}>
                            <Text style={Styles.StyleDetails.textFlavor}>
                                {data.description}
                            </Text>

                            <View style={Styles.StyleDetails.typeContainer}>
                                <Text style={Styles.StyleDetails.textTitleType}>{Strings.pokemonType}</Text>

                                <View style={Styles.StyleDetails.typeWrapper} nativeID='types'>
                                    {data.types.map((item, index: number) => (
                                        <Image
                                            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${Number(item.type.url.split('/').filter(Boolean).pop())}.png` }}
                                            style={Styles.StyleDetails.imageType}
                                            key={index}
                                            resizeMode="contain"
                                        />
                                    ))}
                                </View>
                            </View>

                            <View style={Styles.StyleDetails.contentWrapper}>
                                <View style={Styles.StyleDetails.twoColContainer}>
                                    {data.stats.map((item, index: number) => (
                                        <View key={index} style={Styles.StyleDetails.twoColWrapper}>
                                            <Text style={Styles.StyleDetails.textGapColumn} nativeID='stats'>
                                                {item.stat.name}
                                            </Text>
                                            <Text style={Styles.StyleDetails.textValue}>{item.base_stat}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={Styles.StyleDetails.contentWrapper}>
                                <View style={Styles.StyleDetails.twoColContainer}>
                                    <View style={Styles.StyleDetails.twoColWrapper}>
                                        <Text style={Styles.StyleDetails.textGapColumn}>{Strings.height}</Text>
                                        <Text style={Styles.StyleDetails.textValue}>{data.height}</Text>
                                    </View>

                                    <View style={Styles.StyleDetails.twoColWrapper}>
                                        <Text style={Styles.StyleDetails.textGapColumn}>{Strings.weight}</Text>
                                        <Text style={Styles.StyleDetails.textValue}>{data.weight}</Text>
                                    </View>

                                    <View style={Styles.StyleDetails.twoColWrapper}>
                                        <Text style={Styles.StyleDetails.textGapColumn}>{Strings.generation}</Text>
                                        <Text style={Styles.StyleDetails.textValue}>{data.generation}</Text>
                                    </View>

                                    <View style={Styles.StyleDetails.twoColWrapper}>
                                        <Text style={Styles.StyleDetails.textGapColumn}>{Strings.category}</Text>
                                        <Text style={Styles.StyleDetails.textValue}>{data.category}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={Styles.StyleDetails.abilitiesContainer}>
                                <Text style={[Styles.StyleDetails.textTitleType]}>{Strings.abilities}</Text>

                                {data.abilities.map((item, index: number) => (
                                    <Text key={index} style={Styles.StyleDetails.textAbilities}>
                                        {item.ability.name}
                                    </Text>
                                ))}
                            </View>
                        </ScrollView>
                    </>
                )}
            </SafeAreaView>
        );
    }
}