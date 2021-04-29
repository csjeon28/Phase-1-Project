//variables
const apiUrl = "https://covid-19.dataflowkit.com/v1";
const allCountries = document.getElementById('all-countries');
const countryStats = document.getElementById('selected-country-stats');
const masterTracker = [];
const countryDropdown = document.getElementById('country-select');
const sortDropdown = document.getElementById('sort-select');
let ourTracker = [];

//communication with server
const fetchMasterTracker = async () => {
    const response = await fetch(apiUrl);
    const results = await response.json();
    return masterFunction(results);
}

//functions
const masterFunction = (results) => {
    createMasterTracker(results);
    ourTracker = createOurTracker();
    renderCountryList(ourTracker);
    renderCountryStats(masterTracker, "USA");
    createCountryDropdown();
    createSortDropdown();
    // console.log(ourTracker);
}

const createOurTracker = () => {
    const ourTempTracker = [];
    // console.log(masterTracker)
    for (const element of masterTracker) {
        let ourElement = JSON.parse(JSON.stringify(element));;
        ourElement["selected"] = false;
        ourTempTracker.push(ourElement);
        // console.log(ourElement);
    }
    return ourTempTracker;
}

const createMasterTracker = (results) => {
    for (const element of results) {
        masterTracker.push(element);
    }
    masterTracker.pop();
}

const renderCountryStats = (allCountriesTracker, selectedCountry) => {
    countryStats.innerHTML = "";
    for (const element of allCountriesTracker) {
        if (element['Country_text'] === selectedCountry) {
            //create li for country_text
            const li1 = document.createElement('li');
            li1.innerText = `Country: ${element['Country_text']}`;
            countryStats.appendChild(li1);

            //create li for active cases_text
            const li2 = document.createElement('li');
            if (element['Active Cases_text'] === "") {
                li2.innerText = `Active Case: 0`;
            } else {
                li2.innerText = `Active Cases: ${element['Active Cases_text']}`;
            }
            countryStats.appendChild(li2);

            //create li for last update
            const li3 = document.createElement('li');
            if (element['Last Update'] === 'undefined') {
                li3.innerText = `Last Update: Unavailable`;
            } else {
                li3.innerText = `Last Update: ${element['Last Update']}`;
            }
            countryStats.appendChild(li3);

            //create li for new cases_text
            const li4 = document.createElement('li');
            if (element['New Cases_text'] === "") {
                li4.innerText = `New Cases: 0`;
            } else {
                li4.innerText = `New Cases: ${element['New Cases_text']}`;
            }
            countryStats.appendChild(li4);

            //create li for new deaths_text
            const li5 = document.createElement('li');
            if (element['New Deaths_text'] === "") {
                li5.innerText = `New Deaths: 0`;
            } else {
                li5.innerText = `New Deaths: ${element['New Deaths_text']}`;
            }
            countryStats.appendChild(li5);

            //create li for total cases_text
            const li6 = document.createElement('li');
            if (element['Total Cases_text'] === "") {
                li6.innerText = `Total Cases: 0`;
            } else {
                li6.innerText = `Total Cases: ${element['Total Cases_text']}`;
            }
            countryStats.appendChild(li6);

            //create li for total deaths_text
            const li7 = document.createElement('li');
            if (element['Total Deaths_text'] === "") {
                li7.innerText = `Total Deaths: 0`;
            } else {
                li7.innerText = `Total Deaths: ${element['Total Deaths_text']}`;
            }
            countryStats.appendChild(li7);

            //create li for total recovered_text
            const li8 = document.createElement('li');
            if (element['Total Recovered_text'] === "") {
                li8.innerText = `Total Recovered: 0`;
            } else {
                li8.innerText = `Total Recovered: ${element['Total Recovered_text']}`;
            }
            countryStats.appendChild(li8);

            break;
        }
    }
}

const renderCountryList = (allCountriesTracker) => {
    let rowCount = allCountries.rows.length;
    for (let i = 0; i < rowCount - 2; i++) {
        allCountries.deleteRow(-1);
    }
    for (const countryObj of allCountriesTracker) {
        let newRow = allCountries.insertRow(-1);
        let newCell0 = newRow.insertCell(0);
        let newCell1 = newRow.insertCell(1);
        let newCell2 = newRow.insertCell(2);
        let newCell3 = newRow.insertCell(3);
        newCell0.appendChild(document.createTextNode(`${countryObj['Country_text']}`));
        newCell1.appendChild(document.createTextNode(`${countryObj['Active Cases_text']}`));
        newCell2.appendChild(document.createTextNode(`${countryObj['Last Update']}`));
        newCell3.appendChild(document.createTextNode(''));
    }
}

const createCountryDropdown = () => {
    for (const element of masterTracker) {
        const option = document.createElement('option');
        option.value = element['Country_text'];
        option.text = element['Country_text'];
        countryDropdown.appendChild(option);
    }
}

const createSortDropdown = () => {
    const option = document.createElement('option');
    option.text = 'A-Z';
    sortDropdown.add(option);
    const option1 = document.createElement('option');
    option1.text = 'Highest Active Cases';
    sortDropdown.add(option1);
    const option2 = document.createElement('option');
    option2.text = 'Lowest Active Cases';
    sortDropdown.add(option2);
}

//event listeners
document.addEventListener('DOMContentLoaded', function () {
    fetchMasterTracker();
});

countryDropdown.addEventListener('change', (e) => {
    const selectedCountry = e.target.value;
    renderCountryStats(masterTracker, selectedCountry);
})

sortDropdown.addEventListener('change', (e) => {
    const selectedSort = e.target.value;
    if (selectedSort === 'A-Z') {
        ourTracker = ourTracker.sort((a, b) => (a['Country_text'] > b['Country_text'] ? 1 : -1));
    } else if (selectedSort === 'Highest Active Cases') {
        ourTracker = ourTracker.sort((a, b) => (parseInt(a['Active Cases_text'].replace(/,/g, '')) < parseInt(b['Active Cases_text'].replace(/,/g, '')) ? 1 : -1));
    } else {
        ourTracker = ourTracker.sort((a, b) => (parseInt(a['Active Cases_text'].replace(/,/g, '')) > parseInt(b['Active Cases_text'].replace(/,/g, '')) ? 1 : -1));
    }
    renderCountryList(ourTracker);
})

allCountries.addEventListener('click', (e) => {
    e.target.style.color = 'red'
})