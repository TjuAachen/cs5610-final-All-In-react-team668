import 'bootstrap/dist/css/bootstrap.min.css';
import './indexCell.css';
import { getDailyIndexBySymbol, getLatestIndexBySymbol } from '../../services/remoteAPI-service'
import { STOCK_GREEN, STOCK_RED, symbolToName, WHITE } from '../../constants/Constants';
import LineChart from '../Line/lineChart';
import {useEffect, useState} from 'react';

function IndexCell({ symbol }) {
    const [currentIndexData, setCurrentIndexData] = useState({})
    const [historicalIndexData, setHistoricalIndexData] = useState({})
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const latestData = await getLatestIndexBySymbol(symbol);
                setCurrentIndexData(latestData);
                const historicalData = await getDailyIndexBySymbol(symbol);
                setHistoricalIndexData(historicalData);
            } catch (error) {
                // Handle errors if necessary
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
      }, [symbol]);
    const change = parseFloat(currentIndexData.change).toFixed(2);
    const change_percent = parseFloat(currentIndexData.percent_change).toFixed(2);
    const color = change > 0 ? STOCK_GREEN : STOCK_RED;
    const isIncrease = change > 0;
    let closeVal = parseFloat(currentIndexData.close).toFixed(2);


    return (
        <div className="row indexCell">
            <div className="col-4 indexContainer">
                <h4>{symbolToName[symbol]}</h4>
                <div className="indexValues" style={{ color: color }}>
                    <h4>{'$' + closeVal}</h4>
                    <p style={{marginBottom:"auto"}}>{change} {'(' + change_percent + '%)'}</p>
                </div>
            </div>
            <div className="col-8">
                <LineChart isIncrease={isIncrease} inputData = {historicalIndexData} />
            </div>
        </div>
    )
}

export default IndexCell;