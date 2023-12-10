import React, { useEffect, useState } from 'react';
import { getLatestChartData } from '../../../../services/remoteAPI-service';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import "./index.css"


const Summary = ({ summary, company, ticker }) => {
  // if (!summary) {
  // return null; // Or handle the case where 'summary' data is not available
  //}

  const [results, setResults] = useState({});

  const fetchLatestChartData = async () => {
    await getLatestChartData(ticker).then((data) => {
      setResults(data);
    })
  }


  useEffect(() => {
    fetchLatestChartData();
  }, [ticker])

  const chartOptions = {
    title: {
      style: {
        color: 'gray',
      },
    },
    rangeSelector: {
      enabled: false,
    },
    time: {
      useUTC: false,
    },
    series: [
      {
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };

  chartOptions.title['text'] = ticker.toUpperCase();
  let color = results.change < 0 ? 'red' : 'green';
  chartOptions.series[0]['color'] = color;
  chartOptions.series[0]['data'] = results.chart;
  chartOptions.series[0]['tooltip']['pointFormat'] =
    '<span style="color:' +
    color +
    '">●</span> ' +
    ticker.toUpperCase() +
    ': <b>{point.y}</b><br/>';
  //console.log(summary, "debug summary")
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
          
            <div className="row margin-tb">
              <div className="col-6">
                <table>
                  <tbody>
                    <tr>
                      <td>High Price:</td>
                      <td className="right">{summary.high}</td>
                    </tr>
                    <tr>
                      <td>Low Price:</td>
                      <td className="right">{summary.low}</td>
                    </tr>
                    <tr>
                      <td>Open Price:</td>
                      <td className="right">{summary.open}</td>
                    </tr>
                    <tr>
                      <td>Prev. Close:</td>
                      <td className="right">{summary.close}</td>
                    </tr>
                    <tr>
                      <td>Volume:</td>
                      <td className="right">{summary.volume}</td>
                    </tr>
                  </tbody>
                </table>
                              </div>
              <div className="col-6">
                <table>
                  <tbody>
                    {summary.marketStatus? (
                      <>
                        <tr>
                          <td>Mid Price:</td>
                          <td className="right">{summary.mid}</td>
                        </tr>
                        <tr>
                          <td>Ask Price:</td>
                          <td className="right">{summary.askPrice}</td>
                        </tr>
                        <tr>
                          <td>Ask Size:</td>
                          <td className="right">{summary.askSize}</td>
                        </tr>
                        <tr>
                          <td>Bid Price:</td>
                          <td className="right">{summary.bidPrice}</td>
                        </tr>
                        <tr>
                          <td>Bid Size:</td>
                          <td className="right">{summary.bidSize}</td>
                        </tr>
                      </>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          
          <div className="row">
          {company && (
            <div className="container">
              <div className="row justify-content-center">
                <p className="header">Company's Description</p>
              </div>
              <div className="row-xs-12 row-sm-12">
                <p>{company.startDate}</p>
              </div>
              <div className="row-xs-12 row-sm-12">
                <p>{company.description}</p>
              </div>
            </div>
          )}
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 margin-tb">
          {chartOptions && (
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"stockChart"}
              options={chartOptions}
              style="width: 100%; height: 500px; display: block;"
            />
          )}
</div>
        </div>
      </div>
      );
};

export default Summary;
