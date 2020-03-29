const API_URL = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest'
const $map = document.getElementById('map')
const $history = document.querySelector('.map-history')
const $title = document.querySelector('.country-title')
const $confirmed = document.querySelector('.data-confirmed')
const $deaths = document.querySelector('.data-deaths')
const $recovered = document.querySelector('.data-recovered')

import mapStyle from './map-style.js'
import chartStyle from './chart-style.js'
const getData = async (API_URL) => {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
}
const renderExtraData = async ({ countryregion, confirmed, deaths, recovered }) => {
    $history.style.display = 'block'
    $title.innerHTML = countryregion
    $confirmed.innerHTML = confirmed
    $deaths.innerHTML = deaths
    $recovered.innerHTML = recovered
    await renderChart(countryregion)
}

const totalCaseChart = async (ctx, country) => {

    const confirmed_url = `https://api.covid19api.com/dayone/country/${country.replace(' ', '-').toLowerCase()}/status/confirmed`
    const recovered_url = `https://api.covid19api.com/dayone/country/${country.replace(' ', '-').toLowerCase()}/status/recovered`
    const deaths_url = `https://api.covid19api.com/dayone/country/${country.replace(' ', '-').toLowerCase()}/status/deaths`

    const data_confirmed = await getData(confirmed_url)
    const data_recovered = await getData(recovered_url)
    const data_deaths = await getData(deaths_url)

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data_confirmed.map((item) => item.Date),
            datasets: [
                {
                    label: 'Deaths',
                    borderColor: 'red',
                    data: data_deaths.map((item) => item.Cases)
                },
                {
                    label: 'Recovereds',
                    borderColor: 'green',
                    data: data_recovered.map((item) => item.Cases)
                },
                {
                    label: 'Confirmed',
                    orderColor: 'orange',
                    data: data_confirmed.map((item) => item.Cases),
                }
            ]
        },
        options:chartStyle
    })
}
const renderChart = async (country) => {

    const ctx = document.getElementById('chart').getContext('2d')
    totalCaseChart(ctx, country)
}
const renderData = async () => {
    const data = await getData(API_URL)
    data.forEach(item => {
        const marker = new window.google.maps.Marker({
            position: {
                lat: item.location.lat,
                lng: item.location.lng
            },
            map,
            title: String(item.confirmed),
        })
        marker.addListener('click', () => {
            renderExtraData(item)
        })
    })
}
const map = new window.google.maps.Map($map, {
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 3,
    styles: mapStyle,
})
renderData()