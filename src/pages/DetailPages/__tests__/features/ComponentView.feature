Feature: DetailsPage

  Scenario: Display loading state
    Given the component is loading
    Then it should display a loader

  Scenario: Display Pokémon details
    Given the component has Pokémon data
    When the component is rendered
    Then it should display the Pokémon's name
    And it should display the Pokémon's image
    And it should display the Pokémon's types
    And it should display the Pokémon's stats
    And it should display the Pokémon's abilities
    And it should display the Pokémon's other stats

