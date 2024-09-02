import { NavigationProp, ParamListBase } from '@react-navigation/native';

export interface Navigation {
    navigation: NavigationProp<ParamListBase>
}

export interface Result {
    name: string;
    url: string;
}

export interface TypeObj {
    slot: number
    type: {
        name: string,
        url: string
    }
}

export interface AbilitiesObj {
    ability: {
        name: string
        url: string
    }
    is_hidden: boolean
    slot: number
}

export interface StatsObj {
    base_stat: number
    effort: number
    stat: {
        name: string
        url: string
    }
}

export interface PokemonResultObj {
    name: string
    order: number
    url: string
    types: Array<TypeObj>
    image: string
}

export interface PokemonList {
    count: number
    next: string
    previous: string
    results: Array<PokemonResultObj>
}

export interface PokemonDetails {
    name: string
    order: number
    url: string
    types: Array<TypeObj>
    image: string
    abilities: Array<AbilitiesObj>
    stats: Array<StatsObj>
    height: number
    weight: number

    description: string
    generation: string
    category: string
}
