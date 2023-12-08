import React, { useEffect } from 'react';
import HighlightBanner from './HighlightBanner'; // Replace with actual path to Highlight component
import Summary from './Summary'; // Replace with actual path to Summary component
import News from './News'; // Replace with actual path to News component
import Chart from './Charts'; // Replace with actual path to Chart component
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useParams } from "react-router";
import { getStockSummary, getStockDescription } from '../../../services/remoteAPI-service';

const StockDetail = () => {
    const {ticker} = useParams();
    const [summary, setSummary] = useState(null);
    const [company, setCompany] = useState(null);

    const fetchSummary = async (ticker) => {
        await getStockSummary(ticker).then((data) => setSummary(data));
    }

    const fetchCompanyInfo = async (ticker) => {
        await getStockDescription(ticker).then((data) => setCompany(data));
    }

    useEffect(async () => {
        await fetchCompanyInfo(ticker);
        await fetchSummary(ticker);
    }, ticker);

    return (
        <div>
            <HighlightBanner ticker={ticker} summary={summary}/>
            <div>
                <Tabs>
                    <Tab label="Summary">
                        <Summary ticker={ticker} summary={summary} company={company} />
                    </Tab>
                    <Tab label="Top News">
                        <News ticker={ticker} />
                    </Tab>
                    <Tab label="Charts">
                        <Chart ticker={ticker} />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default StockDetail;
