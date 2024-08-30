import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import { Component } from "react";

// Props
interface Props {
    navigation: any;
    route: any;
}

interface Abilities {
    ability: {
        name: string;
        image: string;
    };
}

interface Types {
    name: string;
    url: string;
    image: string;
}

interface Stats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface Size {
    height: string;
    weight: string;
}

interface Data {
    name: string
    url: string
    order: number
    abilities: Array<Abilities>
    types: Array<Types>
    stats: Array<Stats>,
    size: Size,
    image: string,
    flavorText: string,
    generation: string,
    category: string
}

// State
interface S {
    data: Data | undefined;
    error: unknown;
    loading: boolean;
    navigation: NavigationProp<ParamListBase>;
    searchTerm: string;
    debouncedSearchTerm: string;
    otherDetails: Array<{
        title: string;
        value: string;
    }>;
}

export default class ComponentController extends Component<Props, S> {
    private timeoutId: NodeJS.Timeout | null = null;

    constructor(props: Props) {
        super(props);

        this.state = {
            data: undefined,
            error: null,
            loading: true,
            searchTerm: this.props.route.params.search || this.props.route.params.name,
            debouncedSearchTerm: this.state?.searchTerm || '',
            navigation: props.navigation,
            otherDetails: []
        };
    }

    fetchData = async (value: string) => {
        this.setState({ loading: true });

        try {
            this.setState({ error: null });

            const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
            const pokemonJson = await pokemonResponse.json();

            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${value}`);
            const speciesJson = await speciesResponse.json();

            let typeResult: Array<Types> = [];

            await Promise.all(
                pokemonJson.types.map(async (type: { type: Types }) => {
                    try {
                        const typeResponse = await fetch(type.type.url);
                        if (!typeResponse.ok) throw new Error(`Failed to fetch type data for ${type.type.name}`);
                        const typeJson = await typeResponse.json();
                        if (!typeResult.some(existingType => existingType.name === type.type.name)) {
                            typeResult.push({
                                name: type.type.name,
                                url: type.type.url,
                                image: typeJson.sprites['generation-vii']['lets-go-pikachu-lets-go-eevee'].name_icon
                            });
                        }
                    } catch (typeError) {
                        console.log('Error fetching data pokemon.');
                    }
                })
            );
            const data: Data = {
                name: pokemonJson.species.name,
                url: pokemonJson.species.url,
                order: pokemonJson.order,
                abilities: pokemonJson.abilities,
                types: typeResult,
                stats: pokemonJson.stats,
                size: {
                    height: pokemonJson.height,
                    weight: pokemonJson.weight
                },
                image: pokemonJson.sprites.other['official-artwork'].front_default,
                generation: speciesJson.generation.name,

                flavorText: speciesJson.flavor_text_entries.find((item: { language: { name: string } }) =>
                    item.language.name === 'en').flavor_text,
                category: speciesJson.genera.find((item: { language: { name: string } }) =>
                    item.language.name === 'en').genus
            }

            this.setState({
                data: data,
                otherDetails: [
                    { title: 'Height', value: data?.size?.height },
                    { title: 'Weight', value: data?.size?.weight },
                    { title: 'Generation', value: data?.generation },
                    { title: 'Category', value: data?.category }
                ]
            });
        } catch (error) {
            this.setState({ error: error });
        } finally {
            this.setState({ loading: false });
        }
    }

    handleSearch = (term: string) => {
        this.setState({ searchTerm: term });
    };

    debounceSearchTerm = () => {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
            this.setState({ debouncedSearchTerm: this.state.searchTerm });
        }, 1000);
    };

    componentDidUpdate(prevProps: Props, prevState: S) {
        (prevState.searchTerm !== this.state.searchTerm) &&
            this.debounceSearchTerm();

        (prevState.debouncedSearchTerm !== this.state.debouncedSearchTerm && this.state.debouncedSearchTerm) &&
            this.fetchData(this.state.debouncedSearchTerm);
    }

    componentDidMount() {
        this.fetchData(this.state.searchTerm);
    }

    componentWillUnmount() {
        this.timeoutId && clearTimeout(this.timeoutId);
    }
}