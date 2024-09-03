import loadash from 'lodash'
import HomePage from "../../ComponentView"
import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"
import { FlatList, Text } from "react-native"
import { mockPokemonCard, mockPokemonList } from "../../../../values"

const feature = loadFeature('./src/pages/BoilerplatePages/__tests__/features/ComponentView.feature');

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper
  let instance: HomePage

  const props = {
    navigation: {
      navigate: jest.fn(),
    } as any
  };

  beforeEach(() => {
    jest.resetModules();

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    global.fetch = jest.fn((url) => {
        if (url.includes('https://pokeapi.co/api/v2/pokemon?limit=10')) {
            return Promise.resolve({
              json: () => Promise.resolve(mockPokemonList),
            });
        }
        return Promise.resolve({
          json: () => Promise.resolve(mockPokemonCard),
        });
    }) as jest.Mock;

    wrapper = shallow(<HomePage navigation={props.navigation} />);
    instance = wrapper.instance() as HomePage;

    loadash.debounce = jest.fn((func) => func) as jest.Mock;

    jest.spyOn(instance, 'fetchData');
    jest.spyOn(instance, 'navigateDetails');
    
    afterEach(() => {
      jest.clearAllMocks();
      consoleErrorSpy.mockRestore();
    });
  });

  // For render/display Pokemon list
  test("Render Pokemon List", ({ given, when, then }) => {
    given("I am on the Home Page", () => {})

    when("I successfully load Home Page", async () => {
      instance.componentDidMount()
      await new Promise(setImmediate);
      wrapper.update()
    });

    then("I should have a key extract value from the list", () => {
      const flatlist = wrapper.find(FlatList).props();

      const key = flatlist.keyExtractor?.(mockPokemonList.results[0], 0);
      expect(key).toBe("0");
    });

    then("I should see a list of Pokemon", () => {
      const flatlist = wrapper.find(FlatList).props() ;

      expect(flatlist.data?.length).toEqual(1);
    });

    then("I should see flatlist item rendered", () => {
      const props = { item: mockPokemonCard, index: 0 };

      const flatlist = wrapper.find(FlatList).props();
      const renderItem : any = flatlist.renderItem;
      const itemWrapper = shallow(renderItem({ ...props }));

      const nameText = itemWrapper.findWhere(node => node.type() === Text && node.prop('testID') === 'name');
      
      expect(nameText.text()).toBe(mockPokemonCard.name);
    })

    then("I reach the end of the list", () => {
      const flatlist = wrapper.find(FlatList).props();
      flatlist.onEndReached?.({ distanceFromEnd: 0 });

      expect(instance.fetchData).toBeCalled();
    })
  });

  // For search functionality
  test('Search works correctly', ({ given, when, then }) => {
    given('I am on the Home Page', () => {});

    when('I perform a search', () => {
      instance.onSearch(mockPokemonCard.name);
    });

    then('I should navigate to the Details Page', () => {
      expect(instance.navigateDetails).toBeCalled();
    });
  });

  // For handle error
  test('Handle fetch error', async ({ given, when, then }) => {
    given('I get a fetch error', () => {
      global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error'))) as jest.Mock;
    });

    when('I mounted the component', async () => {
      await instance.componentDidMount();
    });

    then('I should log errors', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
      
      consoleErrorSpy.mockRestore();
    });
  });
})