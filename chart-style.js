export default [
    {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                }
            }]
        },
        title: {
            display: true,
            text: 'Todos los casos desde el primer reporte COVID-19',
            fontSize: 30,
            padding: 30,
            fontColor: '#12619c',
        },
        legend: {
            position: 'bottom',
            labels: {
                padding: 20,
                boxWidth: 15,
                fontFamily: 'system-ui',
                fontColor: 'black',
            }
        },
        layout: {
            padding: {
                right: 50,
            }
        },
        tooltips: {
            backgroundColor: '#0584f6',
            titleFontSize: 20,
            xPadding: 20,
            yPadding: 20,
            bodyFontSize: 15,
            bodySpacing: 10,
            mode: 'x',
        },
        elements: {
            line: {
                borderWidth: 8,
                fill: false,
            },
            point: {
                radius: 6,
                borderWidth: 4,
                backgroundColor: 'white',
                hoverRadius: 8,
                hoverBorderWidth: 4,
            }
        }
    }
]