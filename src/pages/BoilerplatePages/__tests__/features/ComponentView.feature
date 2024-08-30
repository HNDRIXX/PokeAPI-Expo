Feature: Display data and search results

Scenario: Display data and search results
  Given the HomePage is rendered
  When the data is loaded
  And the search term is "Pikachu"
  Then the list should display "Pikachu" related items