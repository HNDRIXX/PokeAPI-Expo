Feature: Pokemon Details

    Scenario: Render Pokemon Details
        Given I am on the Details Page
        When I successfully load Details Page
        Then I should see Pokemon details like Pokemon name

    Scenario: Search works correctly
        Given I am on the Details Page
        When I perform a search
        Then I should call fetch data

    Scenario: Handle fetch error
        Given I get a fetch error
        When I mounted the component
        Then I should true error
