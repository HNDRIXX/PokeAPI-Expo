import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import ComponentController from './ComponentController';
import { Styles } from '../../constants';
import { SearchBar, Loader, Note, PokemonCard } from '../../components';

export default class HomePage extends ComponentController {
    render() {
        return (
            <SafeAreaView style={Styles.Main.darkContainer}>
                <SearchBar
                    value={this.state.searchTerm}
                    onChangeText={this.handleSearch}
                />

                {this.state.error ? <Note text='No data found' /> : (
                    <FlatList
                        data={this.state.filteredData.sort((a, b) => a.order - b.order)}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                            <PokemonCard item={item} key={index} navigation={this.state.navigation} />
                        )}
                        keyExtractor={(item) => item.name}
                        onEndReached={() => {
                            if (!this.state.loading && !this.state.searchTerm) {
                                this.setState({ offset: this.state.offset + 20 });
                            }
                        }}
                        ListFooterComponent={() => (this.state.loading ? <Loader style={{ padding: 20 }} /> : null)}
                        onEndReachedThreshold={0.5}
                    />
                )}
            </SafeAreaView>
        );
    }
}