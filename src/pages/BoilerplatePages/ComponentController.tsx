import { Component } from 'react';
import { Navigation, PokemonList, PokemonResultObj } from '../../types';
import lodash from 'lodash';

interface Props { 
    navigation: Navigation['navigation']
}

interface S {
    data: PokemonList;
    loading: boolean;
    search: string;
}

export default class ComponentController extends Component<Props, S> {
    public navigateDetails: () => Promise<void>;

    constructor(props: Props) {
        super(props);

        this.state = {
            data: {
                count: 0,
                next: 'https://pokeapi.co/api/v2/pokemon?limit=10',
                previous: '',
                results: [],
            },
            loading: true,
            search: '',
        };

        this.navigateDetails = lodash.debounce(() => this.props.navigation.navigate('Details', { name: this.state.search }), 1000) as any;
    }

    fetchData = async () => {
        try {
            this.setState({ loading: true });

            const res = await fetch(this.state.data.next);
            const data = await res.json();
    
            const pokemonPromises : Array<PokemonResultObj> = data.results.map(async (pokemon : PokemonResultObj) => {
                const res = await fetch(pokemon.url);
                const data = await res.json();

                return {
                    name: data.name,
                    order: data.id,
                    url: data.url,
                    types: data.types,
                    image: data.sprites.other['official-artwork'].front_default,
                };
            });
    
            const result = await Promise.all(pokemonPromises);

            this.setState(prevState => ({
                data: {
                    count: data.count,
                    next: data.next,
                    previous: data.previous,
                    results: [
                        ...prevState.data.results,
                        ...result.filter(newItem => 
                            !prevState.data.results.some(oldItem => oldItem.order === newItem.order)
                        )
                    ]
                }
            }));
            
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({ loading: false });
        }
    }

    onSearch = (text: string) => {
        this.setState({ search: text });
        this.navigateDetails();
    }

    async componentDidMount () {
        this.fetchData();
    }
};