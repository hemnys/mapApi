import mapStyle from './map-style.js'
import chartStyle from './chart-style.js'

const API_URL = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest'
const $map = document.getElementById('map')
const $modal = document.getElementById("myModal")
const $span = document.querySelector(".close")

const getData = async (API_URL) => {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
}
const showModal = () => {
    $modal.style.display = 'block'
}
window.onclick = (event) => {
    if(event.target == $modal){
        $modal.style.display = "none"
    }
}
$span.onclick = () => {
    $modal.style.display = "none"
}
const renderExtraData = async (item) => {
    showModal()
    await renderChart(item)
}
const totalCaseChart = async (ctx, item) => {
    const { countryregion, confirmed, deaths, recovered } = item
    const confirmed_url = `https://api.covid19api.com/dayone/country/${countryregion.replace(' ', '-').toLowerCase()}/status/confirmed`
    const recovered_url = `https://api.covid19api.com/dayone/country/${countryregion.replace(' ', '-').toLowerCase()}/status/recovered`
    const deaths_url = `https://api.covid19api.com/dayone/country/${countryregion.replace(' ', '-').toLowerCase()}/status/deaths`

    const data_confirmed = await getData(confirmed_url)
    const data_recovered = await getData(recovered_url)
    const data_deaths = await getData(deaths_url)
    let options = {
        type: 'line',
        data: {
            labels: data_confirmed.map(item => new Intl.DateTimeFormat('es-PE', { month: 'long', day: 'numeric' }).format(new Date(item.Date))),
            datasets: [
                {
                    label: `Confirmed ${confirmed}`,
                    orderColor: 'orange',
                    data: data_confirmed.map((item) => item.Cases),
                },
                {
                    label: `Recovered ${recovered}`,
                    borderColor: 'green',
                    data: data_recovered.map((item) => item.Cases)
                },
                {
                    label: `Deaths ${deaths}`,
                    borderColor: 'red',
                    data: data_deaths.map((item) => item.Cases)
                },
            ]
        },
        options: chartStyle
    }
    let chart = new Chart(ctx, options)
}
const renderChart = async (item) => {
    const ctx = document.getElementById('chart').getContext('2d')   
    totalCaseChart(ctx, item)
}
const renderData = async () => {
    const data = await getData(API_URL)
    const icon = './icon.png'
    data.forEach(item => {
        const marker = new window.google.maps.Marker({
            position: {
                lat: item.location.lat,
                lng: item.location.lng
            },
            map,
            icon,
            title: String(item.countryregion),
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