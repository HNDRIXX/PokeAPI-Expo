import lodash from 'lodash';
import { Component } from 'react';
import { PokemonDetails } from '../../types';
import { DataPokemonDetails } from '../../values';

interface Props {
    route: {
        params: { name: string }
    };
}

interface S {
    data: PokemonDetails;
    search: string;
    error: boolean
    loading: boolean
}

export default class ComponentController extends Component<Props, S> {
    public fetchDataDebounced: (value: string) => Promise<void>;

    constructor(props: Props) {
        super(props);

        this.state = {
            data: DataPokemonDetails,
            search: '',
            loading: true,
            error: false
        }

        this.fetchDataDebounced = lodash.debounce(this.fetchData, 1000) as any;
    }

    fetchData = async (value: string) => {
        try {
            this.setState({ loading: true, error: false });

            const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`);
            const pokemonJson = await pokemonResponse.json();

            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${value.toLowerCase()}`);
            const speciesJson = await speciesResponse.json();

            this.setState({
                data: {
                    name: pokemonJson.name,
                    id: pokemonJson.id,
                    url: pokemonJson.url,
                    types: pokemonJson.types,
                    image: pokemonJson.sprites.other['official-artwork'].front_default,
                    abilities: pokemonJson.abilities,
                    stats: pokemonJson.stats,
                    height: pokemonJson.height,
                    weight: pokemonJson.weight,

                    description: 
                        speciesJson.flavor_text_entries.find((item : { language: { name: string }}) => item.language.name === 'en').flavor_text,
                    generation: speciesJson.generation.name,
                    category: 
                        speciesJson.genera.find((item : { language: { name: string }}) => item.language.name === 'en').genus
                }
            });

        } catch (error) {
            this.setState({ error: true });
        } finally {
            this.setState({ loading: false });
        }
    }

    onSearch = (text: string) => {
        this.setState({ search: text });
        this.fetchDataDebounced(text);
    }

    typeImage = (type: string) => {
        const urlSegments = type.split('/').filter(Boolean);
        const typeId = Number(urlSegments.pop());

        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${typeId}.png`
    }

    async componentDidMount () {
        await this.fetchData(this.props.route.params.name);
    }
};