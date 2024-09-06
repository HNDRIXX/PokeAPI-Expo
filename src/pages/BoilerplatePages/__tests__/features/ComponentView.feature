Feature: Pokemon List

    Scenario: User navigating to Pokemon Home Page
        Given User on the Pokemon Home page
        When User fully loaded Pokemon home page
        Then User should see home page
        Then User should see loading
        Then User is waiting for pokemons to load
        Then User items should extract key
        Then User will see pokemons loaded initially
        Then User should see pokemons items
        
    Scenario: User scroll to end of list
        Given User on the Pokemon Home page
        When User fully loaded Pokemon home page
        Then User scroll to end of list
        Then User should fetch more pokemons
        
    Scenario: User search pokemons on Pokemon Home Page
        Given User on the Pokemon Home page
        When User fully loaded Pokemon home page
        Then User perform a search
        Then User should navigate to the Details Page

    Scenario: User fetch error to Pokemon Home Page
        Given User on the Pokemon Home page
        When User fully loaded Pokemon home page
        Then User fetch error to Pokemon Home Page