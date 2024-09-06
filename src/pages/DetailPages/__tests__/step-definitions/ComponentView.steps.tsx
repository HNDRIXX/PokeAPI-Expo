import lodash from 'lodash'

import DetailPage from "../../ComponentView";
import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"
import { mockDetailPokemon, mockSpeciesPokemon, mockDetailProps } from "../../../../values";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../../../../components';
import * as helpers from "../../../../helpers";

const feature = loadFeature('./src/pages/DetailPages/__tests__/features/ComponentView.feature');

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web"); 

    global.fetch = jest.fn((url) => {
      if (url.includes('/pokemon/')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockDetailPokemon),
        });
      }

      if (url.includes('/pokemon-species/')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockSpeciesPokemon), 
        });
      }
    }) as jest.Mock;
  });

  // For naviigation Pokemon Details
  test("User navigating to Pokemon Details Page", ({ given, when, then }) => {
    let PokemonDetailsWrapper: ShallowWrapper
    let instance: DetailPage

    given("User on the Pokemon Details page", () => {
      PokemonDetailsWrapper = shallow(<DetailPage {...mockDetailProps} />);
    })

    when("User fully loaded Pokemon details page", () => {
      instance = PokemonDetailsWrapper.instance() as DetailPage;
    })
    
    then("User should see details page", () => {
      const pokemonDetailsContainer = PokemonDetailsWrapper
        .find(SafeAreaView)
        .findWhere(node => node.prop('testID') === 'detailContainer');

      expect(pokemonDetailsContainer.exists()).toBe(true);
    })

    then("User is waiting for details to load", () => {
      const loader : any = PokemonDetailsWrapper.find(Loader)
      expect(loader.exists()).toBe(true);
    });

    then("User should see pokemon details", () => {
      expect(instance.state.data.name).toEqual(mockDetailPokemon.name);
    })
  })

  // For search functionality
  test('User search pokemons on Pokemon Details Page', ({ given, when, then }) => {
    let PokemonDetailsWrapper: ShallowWrapper
    let instance: DetailPage

    given("User on the Pokemon Details page", () => {
      PokemonDetailsWrapper = shallow(<DetailPage {...mockDetailProps} />);
    })

    when("User fully loaded Pokemon details page", () => {
      instance = PokemonDetailsWrapper.instance() as DetailPage;
      jest.spyOn(instance, 'fetchDataDebounced');
    })
    
    then("User should see details page", () => {
      const pokemonDetailsContainer = PokemonDetailsWrapper
        .find(SafeAreaView)
        .findWhere(node => node.prop('testID') === 'detailContainer');

      expect(pokemonDetailsContainer.exists()).toBe(true);
    })

    when('User perform a search', () => {
      instance.onSearch(mockDetailPokemon.name);
    });

    then('User should intialize search', () => {
      expect(instance.fetchDataDebounced).toHaveBeenCalledWith(mockDetailPokemon.name);
    });
  });

  // For handle error
  test('User fetch error to Pokemon Details Page', async ({ given, when, then }) => {
    let PokemonHomeWrapper: ShallowWrapper;
    let instance : DetailPage

    given('User on the Pokemon Details page', () => {
      global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error'))) as jest.Mock;

      PokemonHomeWrapper = shallow(<DetailPage {...mockDetailProps} />);
    });

    when('User fully loaded Pokemon details page', () => {
      instance = PokemonHomeWrapper.instance() as DetailPage;
    });

    then('User fetch error to Pokemon Home Page', () => {
      expect(instance.state.error).toEqual(true);
    });
  });
})