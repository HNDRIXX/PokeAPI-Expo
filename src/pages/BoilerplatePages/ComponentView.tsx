import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import ComponentController from './ComponentController';
import { Styles } from '../../constants';
import { Loader, PokemonCard, SearchBar } from '../../components';
import { PokemonResultObj } from '../../types';
import { StatusBar } from 'expo-status-bar';

export default class HomePage extends ComponentController {

    render() {
        const { data, search, loading } = this.state

        return (
            <SafeAreaView style={Styles.Main.darkContainer}>
                <StatusBar style="light" />
                
                <SearchBar
                    value={search}
                    onChangeText={this.onSearch}
                />

                <FlatList
                    data={data.results}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index } : { item: PokemonResultObj, index : number }) => (
                        <PokemonCard item={item} navigation={this.props.navigation} key={index} />
                    )}
                    onEndReached={() => this.fetchData(data.next)}
                    ListFooterComponent={loading ? <Loader style={{ margin: 20 }} /> : null}
                    onEndReachedThreshold={0.5}
                />
            </SafeAreaView>
        );
    }
}