import React from 'react';
import lodash from 'lodash';
import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockPokemonCard, mockPokemonList, mockHomeProps, baseURL } from "../../../../values";

import HomePage from "../../ComponentView"
import * as helpers from '../../../../helpers';

const feature = loadFeature('./src/pages/BoilerplatePages/__tests__/features/ComponentView.feature');

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    global.fetch = jest.fn((url) => {
      if (url.includes(baseURL)) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPokemonList),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve(mockPokemonCard),
      });
    }) as jest.Mock;
  });

  // For naviigation Pokemon Home Page
  test("User navigating to Pokemon Home Page", ({ given, when, then }) => {
    let PokemonHomeWrapper: ShallowWrapper;
    let instance: HomePage;

    given("User on the Pokemon Home page", () => {
      PokemonHomeWrapper = shallow(<HomePage {...mockHomeProps} />);
    });

    when("User fully loaded Pokemon home page", () => {
      instance = PokemonHomeWrapper.instance() as HomePage;
    });

    then("User should see home page", () => {
      const homeContainer = PokemonHomeWrapper
        .find(SafeAreaView)
        .findWhere(node => node.prop('testID') === 'homeContainer');

      expect(homeContainer.exists()).toBe(true);
    });

    then("User should see loading", () => {
      expect(instance.state.loading).toBe(true);
    });

    then("User is waiting for pokemons to load", async () => {
      const flatList = PokemonHomeWrapper
        .find(FlatList)
        .props().ListFooterComponent as React.ReactElement<{}>;

      expect(flatList.key).toBe('loader');
    });

    then("User items should extract key", () => {
      const flatlist = PokemonHomeWrapper.find(FlatList).props();
      const key = flatlist.keyExtractor?.(mockPokemonList.results[0], 0);

      expect(key).toBe("0");
    });

    then("User will see pokemons loaded initially", () => {
      expect(instance.state.data.results.length).toBe(1);
    });

    then("User should see pokemons items", () => {
      const props = { item: mockPokemonCard, index: 0 };

      const flatlist = PokemonHomeWrapper.find(FlatList).props();
      const renderItem = flatlist.renderItem as any;
      const itemWrapper = shallow(renderItem({ ...props }));

      const nameText = itemWrapper
        .findWhere(node => node.type() === Text && node.prop('testID') === 'name');

      expect(nameText.text()).toBe(mockPokemonCard.name);
    })
  });

  // For scroll down to end
  test('User scroll to end of list', async ({ given, when, then }) => {
    let PokemonHomeWrapper: ShallowWrapper;
    let instance: HomePage;

    given('User on the Pokemon Home page', () => {
      PokemonHomeWrapper = shallow(<HomePage {...mockHomeProps} />);
    });

    when('User fully loaded Pokemon home page', () => {
      instance = PokemonHomeWrapper.instance() as HomePage;
      jest.spyOn(instance, 'fetchData');
    });

    then("User scroll to end of list", () => {
      const flatlist = PokemonHomeWrapper.find(FlatList).props();
      flatlist.onEndReached?.({ distanceFromEnd: 0 });
    });

    then("User should fetch more pokemons", () => {
      expect(instance.fetchData).toBeCalled();
    });
  });

  // For search functionality
  test('User search pokemons on Pokemon Home Page', async ({ given, when, then }) => {
    let PokemonHomeWrapper: ShallowWrapper;
    let instance: HomePage;

    given('User on the Pokemon Home page', () => {
      lodash.debounce = jest.fn((func) => func) as jest.Mock;

      PokemonHomeWrapper = shallow(<HomePage {...mockHomeProps} />);
    });

    when('User fully loaded Pokemon home page', () => {
      instance = PokemonHomeWrapper.instance() as HomePage;
      jest.spyOn(instance, 'navigateDetails');
    });

    then('User perform a search', () => {
      instance.onSearch(mockPokemonCard.name);
    });

    then('User should navigate to the Details Page', () => {
      expect(instance.navigateDetails).toBeCalled();
    });
  });

  // For handle error
  test('User fetch error to Pokemon Home Page', async ({ given, when, then }) => {
    let PokemonHomeWrapper: ShallowWrapper;
    let instance: HomePage

    given('User on the Pokemon Home page', () => {
      global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error'))) as jest.Mock;

      PokemonHomeWrapper = shallow(<HomePage {...mockHomeProps} />);
    });

    when('User fully loaded Pokemon home page', () => {
      instance = PokemonHomeWrapper.instance() as HomePage;
    });

    then('User fetch error to Pokemon Home Page', () => {
      expect(instance.state.error).toEqual(true);
    });
  });
});