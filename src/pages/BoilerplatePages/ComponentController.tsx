import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Component } from "react";

interface Props {
    navigation: any;
}

interface Abilities {
    ability: {
        name: string;
        url: string;
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
    height: number;
    weight: number;
}

interface Data {
    name: string;
    url: string;
    order: number;
    types: Array<{ image: string }>;
    image: string;
}

interface S {
    data: Array<Data>;
    filteredData: Array<Data>;
    offset: number;
    navigation: NavigationProp<ParamListBase>;
    error: unknown;
    searchTerm: string;
    loading: boolean;
}

export default class ComponentController extends Component<Props, S> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: [],
            filteredData: [],
            offset: 0,
            error: '',
            searchTerm: '',
            loading: false,
            navigation: props.navigation,
        };
    }

    fetchData = async () => {
        try {
            this.setState({ loading: true, error: '' });
    
            const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${this.state.offset}`);
            const json = await apiResponse.json();
    
            let results: Array<Data> = [];
    
            await Promise.allSettled(
                json.results.map(async (item: Data) => {
                    const res = await fetch(item.url);
                    const itemJson = await res.json();
    
                    let typeResult: Array<Types> = [];
    
                    await Promise.all(
                        itemJson.types.map(async (type: { type: Types }) => {
                            const res = await fetch(type.type.url);
                            const typeJson = await res.json();
    
                            if (!typeResult.some(existingType => existingType.name === type.type.name)) {
                                typeResult.push({
                                    name: type.type.name,
                                    url: type.type.url,
                                    image: typeJson.sprites['generation-vii']['lets-go-pikachu-lets-go-eevee'].name_icon
                                });
                            }
                        })
                    );
    
                    const details : Data = {
                        name: itemJson.species.name,
                        url: itemJson.species.url,
                        order: itemJson.order,
                        types: typeResult,
                        image: itemJson.sprites.other['official-artwork'].front_default
                    };
    
                    results.push(details);
                })
            );
    
            this.setState(prevState => ({
                data: [...prevState.data, ...results],
                filteredData: [...prevState.data, ...results]
            }));
        } catch (error) {
            this.setState({ error: error as string });
        } finally {
            this.setState({ loading: false });
        }
    }    

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>): void {
        if (prevState.searchTerm !== this.state.searchTerm) {
            const filtered = this.state.data.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                pokemon.order.toString().includes(this.state.searchTerm)
            );
            
            this.setState({ filteredData: filtered });
        }

        if (prevState.offset !== this.state.offset) {
            this.fetchData();
        }
    }
    
    handleSearch = (term: string) => {
        this.setState({ searchTerm: term });
    };

    componentDidMount = async () => {
        this.fetchData();
    };
}