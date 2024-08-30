import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow } from 'enzyme';
import HomePage from '../../ComponentView';
import { Note, PokemonCard } from '../../../../components';

const feature = loadFeature('./src/pages/BoilerplatePages/__tests__/features/ComponentView.feature');

defineFeature(feature, test => {
  let wrapper: any;

  test('Display data and search results', ({ given, when, then }) => {
    given('the HomePage is rendered', () => {
      wrapper = shallow(<HomePage navigation={{}} />);
    });

    when('the data is loaded', async () => {
      wrapper.setState({
        data: [{ 
          name: 'Pikachu', 
          order: 1, 
          types: [], 
          image: '' 
        }],
        filteredData: [{ 
          name: 'Pikachu', 
          order: 1, 
          types: [], 
          image: '' 
        }]
      });
      wrapper.instance().fetchData = jest.fn();
      await wrapper.instance().componentDidMount();
      wrapper.update();
    });

    when('the search term is {string}', (searchTerm) => {
      (wrapper.instance() as HomePage).handleSearch(searchTerm);
      wrapper.update();
    });

    then('the list should display {string} related items', (searchTerm) => {
      const pokemonCards = wrapper.find(PokemonCard);
      expect(pokemonCards.someWhere((card: any) => card.props().item.name === searchTerm)).toBe(true);
    });
  });

  test('Handle error state', ({ given, when, then }) => {
    given('the HomePage is rendered', () => {
      wrapper = shallow(<HomePage navigation={{}} />);
    });

    when('there is an error while fetching data', async () => {
      wrapper.setState({ error: 'Failed to fetch data' });
      await wrapper.update();
    });

    then('an error message should be displayed', () => {
      const note = wrapper.find(Note);
      expect(note.exists()).toBe(true);
      expect(note.props().text).toBe('No data found');
    });
  });
});
