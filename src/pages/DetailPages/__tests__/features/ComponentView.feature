Feature: Pokemon Details

    Scenario: User navigating to Pokemon Details Page
        Given User on the Pokemon Details page
        When User fully loaded Pokemon details page
        Then User should see details page
        Then User is waiting for details to load
        Then User should see pokemon details

    Scenario: User search pokemons on Pokemon Details Page
        Given User on the Pokemon Details page
        When User fully loaded Pokemon details page
        Then User should see details page
        When User perform a search
        Then User should intialize search

    Scenario: User fetch error to Pokemon Details Page
        Given User on the Pokemon Details page
        When User fully loaded Pokemon details page
        Then User fetch error to Pokemon Home Page
