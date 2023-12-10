import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import dataModule from 'highcharts/modules/data';
import exportingModule from 'highcharts/modules/exporting';
import { getHistoricalStockData } from '../../../../services/remoteAPI-service';
import vbp from 'highcharts/indicators/volume-by-price';
import indicators from 'highcharts/indicators/indicators';
import "./index.css"
dataModule(Highcharts);
exportingModule(Highcharts);
indicators(Highcharts);
vbp(Highcharts);

const Chart = ({ ticker }) => {
    // Initialize the series-label module
    
    console.log(Highcharts, "debug high charts")

    const [ohlc, setOhlc] = useState([]);
    const [volume, setVolume] = useState([]);
    const fetchChartData = async () => {
        const data = await getHistoricalStockData(ticker);
        // const data = await response.json();
        const tempOhlc = []
        const tempVolume = []
        data.Volume.forEach((item) => {
            tempVolume.push([
                item[0], // the date
                item[1], // the volume
            ]);
        });
        data.historicalData.forEach((item) => {
            tempOhlc.push([
                item[0], // the date
                item[1], // open
                item[2], // high
                item[3], // low
                item[4], // close
            ]);
        })
        setOhlc(tempOhlc)
        setVolume(tempVolume)
    }
    useEffect(() => {
        fetchChartData();
    }, [ticker]
    );
    const chartOptions = {
        rangeSelector: {
            selected: 2,
        },

        title: {
            text: `${ticker.toUpperCase()} Historical`,
        },

        subtitle: {
            text: 'With SMA and Volume by Price technical indicators',
        },

        yAxis: [
            {
                startOnTick: false,
                endOnTick: false,
                labels: {
                    align: 'right',
                    x: -3,
                },
                title: {
                    text: 'OHLC',
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                    enabled: true,
                },
            },
            {
                labels: {
                    align: 'right',
                    x: -3,
                },
                title: {
                    text: 'Volume',
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2,
            },
        ],

        tooltip: {
            split: true,
        },

        plotOptions: {
            series: {
                dataGrouping: {
                    units: [
                        ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ['second', [1, 2, 5, 10, 15, 30]],
                        ['minute', [1, 2, 5, 10, 15, 30]],
                        ['hour', [1, 2, 3, 4, 6, 8, 12]],
                        ['day', [1]],
                        ['week', [1]],
                        ['month', [1, 3, 6]],
                        ['year', null],
                    ],
                },
            },
        },

        series: [
            {
                type: 'candlestick',
                name: `${ticker.toUpperCase()}`,
                id: `${ticker.toUpperCase()}`,
                zIndex: 2,
                data: ohlc
                // data: [
                //   [122, 32, 32, 44, 54],
                //   [123, 33, 22, 11, 98],
                // ],
            },
            {
                type: 'column',
                name: 'Volume',
                id: 'volume',
                yAxis: 1,
                data: volume
            },
            {
                type: 'vbp',
                params: {
                    volumeSeriesID: 'volume',
                },
                dataLabels: {
                    enabled: false,
                },
                zoneLines: {
                    enabled: false,
                },
                linkedTo: ticker
            },
            {
                type: 'sma',
                zIndex: 1,
                marker: {
                    enabled: false,
                },
                linkedTo: ticker
            },
        ],
    };

    /*Highcharts.setOptions({
        plotOptions: {
          vbp: {
            params: {
                volumeSeriesID: 'volume',
            },
            dataLabels: {
                enabled: false,
            },
            zoneLines: {
                enabled: false,
            },
            linkedTo: { ticker }
          },
           sma: {
            zIndex: 1,
            marker: {
                enabled: false,
            },
            linkedTo: { ticker }
           }
        }
      });*/
    return <>
        <HighchartsReact options={chartOptions} constructorType={"stockChart"} highcharts={Highcharts} style="width: 100%; height: 600px; display: block;">
        </HighchartsReact>
    </>
};

export default Chart;

