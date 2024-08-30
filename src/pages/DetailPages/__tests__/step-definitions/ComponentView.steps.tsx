import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';
import DetailsPage from '../../ComponentView';

const feature = loadFeature('./src/pages/DetailPages/__tests__/features/ComponentView.feature');

defineFeature(feature, test => {
  let wrapper : ShallowWrapper;

  test('Display loading state', ({ given, then }) => {
    given('the component is loading', () => {
      wrapper = shallow(<DetailsPage navigation={{}} route={{ params: {} }} />);
      wrapper.setState({ loading: true });
    });

    then('it should display a loader', () => {
      expect(wrapper.find('Loader').exists()).toBe(true);
    });
  });

  test('Display Pokémon details', ({ given, when, then }) => {
    given('the component has Pokémon data', () => {
      wrapper = shallow(<DetailsPage navigation={{}} route={{ params: {} }} />);
      wrapper.setState({
        data: {
          name: 'Pikachu',
          image: 'http://loremipsum.com/pikachu.png',
          types: [{ image: 'http://loremipsum/electric.png' }],
          stats: [{ stat: { name: 'Speed' }, base_stat: 90 }],
          abilities: [{ ability: { name: 'Static' } }]
        },
        loading: false,
        error: null,
        otherDetails: [
          { title: 'Generation', value: 'Generation 1' }
        ]
      });
    });

    when('the component is rendered', () => { });

    then('it should display the Pokémon\'s name', () => {
      expect(wrapper.find('Text').at(0).text()).toEqual('Pikachu');
    });

    then('it should display the Pokémon\'s image', () => {
      expect(wrapper.find('Image').at(0).prop('source')).toEqual({ uri: 'http://loremipsum.com/pikachu.png' });
    });

    then('it should display the Pokémon\'s types', () => {
      expect(wrapper.find('Image').at(1).prop('source')).toEqual({ uri: 'http://loremipsum.com/electric.png' });
    });

    then('it should display the Pokémon\'s stats', () => {
      const statsWrapper = wrapper.find('View').at(3);

      const stat1 = statsWrapper.find('View').at(0);
      expect(stat1.find('Text').at(0).text()).toEqual('Speed');
      expect(stat1.find('Text').at(1).text()).toEqual('90');
    });

    then('it should display the Pokémon\'s abilities', () => {
      const statsWrapper = wrapper.find('View').at(7);
      expect(statsWrapper.find('Text').at(1).text()).toEqual('Static');
    });

    then('it should display the Pokémon\'s other stats', () => {
      const statsWrapper = wrapper.find('View').at(5); 

      const stat1 = statsWrapper.find('View').at(0);
      expect(stat1.find('Text').at(0).text()).toEqual('Generation');
      expect(stat1.find('Text').at(1).text()).toEqual('Generation 1');
    });
  });
});
