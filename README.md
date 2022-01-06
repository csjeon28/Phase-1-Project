# Phase-1-Project

My single page application is a COVID-19 Tracker with live (updated hourly) statistics of each country in the API database.
* You can view statistics for each country, including:
        * total active cases
        * new cases
        * total cases
        * new deaths
        * total deaths
        * total recovered
* Each country also has a select button available to show the total sum of total active cases of the selected countries.
* Features a dropdown menu to filter countries by alphabetical, highest, and lowest number of cases.

## Public API Documentation:
<a href="https://covid-19.dataflowkit.com/v1" target="_blank">Covid Live Statistics Public API</a>

## Heroku Deployment:
<a href="https://cj-covid-tracker-vanillajs.herokuapp.com/" target="_blank">Covid Tracker</a>

### Objective of Phase 1 JavaScript Project: 
* Pull data from a public API
* Manipulate that data
* Build a Single Page Application utilizing HTML/CSS/JS frontend

## User Stories:
1. As a user, I can use a dropdown menu to select a country to view all of the country's COVID statistics.

2. As a user, I can use a dropdown menu to sort all countries by:
        * alphabetical order
        * highest number of cases
        * lowest number of cases

3. As a user, I can calculate the sum of cases for selected countries in a list.
        * I can click a plus button next to each country in the list to select it and add number of cases to the sum.
        * I can click a check button next to each country in the list to deselect it and remove number of cases from the sum.

<!-- ## Installation:
1. Clone this repository to your local environment `git clone <this-repo-url>`
2. Navigate to root folder of this repo
3. Run `npm install` to install all dependencies
4. Run `npm start` to start server -->