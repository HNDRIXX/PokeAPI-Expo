import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ComponentController from './ComponentController'
import { Loader, SearchBar, Badge, Note } from '../../components'
import { Styles } from '../../constants'

export default class DetailsPage extends ComponentController {
    render() {
        return (
            <SafeAreaView style={Styles.StyleDetails.container}>
                <SearchBar
                    value={this.state.searchTerm }
                    onChangeText={this.handleSearch}
                />
                

                { this.state.loading ? (<Loader style={{ padding: 20, flex: 1 }} />) :
                this.state.error ? (<Note text="Not found" />) : (
                    <React.Fragment>
                        <Badge number={this.state.data?.order || 0} style={{ marginTop: 10 }}/>

                        <Image
                            source={{ uri: this.state.data?.image }}
                            style={Styles.StyleDetails.imagePokemon}
                        />

                        <Text style={Styles.StyleDetails.textName}>
                            {this.state.data?.name}
                        </Text>

                        <ScrollView style={Styles.StyleDetails.wrapper}>
                            <Text style={Styles.StyleDetails.textFlavor}>
                                {this.state.data?.flavorText}
                            </Text>

                            <View style={Styles.StyleDetails.typeContainer}>
                                <Text style={[Styles.StyleDetails.textTitleType]}>Pokemon Type</Text>

                                <View style={Styles.StyleDetails.typeWrapper}>
                                    {this.state.data?.types?.map((item, index: number) => (
                                        <Image
                                            source={{ uri: item.image }}
                                            style={Styles.StyleDetails.imageType}
                                            key={index}
                                            resizeMode="contain"
                                        />
                                    ))}
                                </View>
                            </View>

                            <View style={Styles.StyleDetails.contentWrapper}>
                                <View style={Styles.StyleDetails.twoColContainer}>
                                    {this.state.data?.stats?.map((item, index: number) => (
                                        <View key={index} style={Styles.StyleDetails.twoColWrapper}>
                                            <Text style={Styles.StyleDetails.textGapColumn} nativeID='stats'>{item.stat.name}</Text>
                                            <Text style={Styles.StyleDetails.textValue}>{item.base_stat}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={Styles.StyleDetails.contentWrapper}>
                                <View style={Styles.StyleDetails.twoColContainer}>
                                    {this.state.otherDetails?.map((item, index: number) => (
                                        <View key={index} style={Styles.StyleDetails.twoColWrapper}>
                                            <Text style={Styles.StyleDetails.textGapColumn}>{item.title}</Text>
                                            <Text style={Styles.StyleDetails.textValue}>{item.value}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={Styles.StyleDetails.abilitiesContainer}>
                                <Text style={[Styles.StyleDetails.textTitleType]}>Abilities</Text>

                                {this.state.data?.abilities?.map((item, index: number) => (
                                    <Text key={index} style={Styles.StyleDetails.textAbilities}>
                                        {item.ability.name}
                                    </Text>
                                ))}
                            </View>
                        </ScrollView>
                    </React.Fragment>
                )}
            </SafeAreaView>
        )
    }
}