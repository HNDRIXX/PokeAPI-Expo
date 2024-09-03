import lodash from 'lodash'

import HomePage from "../../ComponentView"
import DetailPage from "../../ComponentView";
import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"
import { mockDetailPokemon, mockSpeciesPokemon, mockDetailprops } from "../../../../values";
import { Strings } from "../../../../constants";

const feature = loadFeature('./src/pages/DetailPages/__tests__/features/ComponentView.feature');

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper
  let instance: HomePage

  beforeEach(() => {
    jest.resetModules();

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

      return Promise.reject(new Error(Strings.somethingWentWrong));
    }) as jest.Mock;

    wrapper = shallow(<DetailPage route={mockDetailprops.route} />);
    instance = wrapper.instance() as DetailPage;

    lodash.debounce = jest.fn((func) => func) as jest.Mock;

    jest.spyOn(instance, 'fetchData');
    jest.spyOn(instance, 'fetchDataDebounced');

    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  // For render/display Pokemon details
  test("Render Pokemon Details", ({ given, when, then }) => {
    given("I am on the Details Page", () => {})

    when("I successfully load Details Page", async () => {
      instance.componentDidMount()
      await new Promise(setImmediate);
      wrapper.update()
    })
    
    then("I should see Pokemon details like Pokemon name", () => {
      expect(instance.state.data.name).toEqual(mockDetailPokemon.name);
    })
  })

  // For search functionality
  test('Search works correctly', ({ given, when, then }) => {
    given('I am on the Details Page', () => {});

    when('I perform a search', () => {
      instance.onSearch(mockDetailPokemon.name);
    });

    then('I should call fetch data', () => {
      expect(instance.fetchDataDebounced).toHaveBeenCalledWith(mockDetailPokemon.name);
    });
  });

  // For fetch error
  test('Handle fetch error', async ({ given, when, then }) => {
    given('I get a fetch error', () => {
      global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error'))) as jest.Mock;
    });

    when('I mounted the component', async () => {
      await instance.componentDidMount();
    });

    then('I should true error', () => {
      instance.setState({ error: true })

      expect(instance.state.error).toEqual(true);
    });
  });
})