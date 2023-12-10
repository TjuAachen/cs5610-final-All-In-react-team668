import React, { useEffect, useState } from 'react';
import HighlightBanner from './HighlightBanner'; // Replace with actual path to Highlight component
import Summary from './Summary'; // Replace with actual path to Summary component
import News from './News'; // Replace with actual path to News component
import Chart from './Charts'; // Replace with actual path to Chart component
import { CircularProgress } from "@mui/material";
import { Navbar, Nav } from 'react-bootstrap';
import { useParams } from "react-router";
import { getStockSummary, getStockDescription } from '../../../services/remoteAPI-service';
import "./stockDetail.css";

const StockDetail = () => {
    const { ticker } = useParams();
    const [summary, setSummary] = useState(null);
    const [company, setCompany] = useState(null);
    const [activeTab, setActiveTab] = useState('summary'); // State to manage active tab

    const handleTabSelect = (eventKey) => {
        setActiveTab(eventKey);
    };
    const fetchSummary = async (ticker) => {
        await getStockSummary(ticker).then((response) => {
            setSummary(response)
        });
    }

    const fetchCompanyInfo = async (ticker) => {
        await getStockDescription(ticker).then((data) => setCompany(data));
        console.log(company, "debug Company")
    }


    useEffect(() => {
        fetchCompanyInfo(ticker);
        fetchSummary(ticker);
    }, [ticker]);

    return (
        <>
            {summary ? (<HighlightBanner ticker={ticker} summary={summary} />) : (<CircularProgress />)}
            <Navbar className="nav-container"  expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="tabs" defaultActiveKey="summary" onSelect={handleTabSelect} fill>
                        <Nav.Item>
                            <Nav.Link eventKey="summary">Summary</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="news">News</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="chart">Chart</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="tab-content">
                <div className={`tab-pane ${activeTab === 'summary' ? 'active' : ''}`} id="summary" role="tabpanel" aria-labelledby="summary-tab">
                    {/* Content for Summary tab */}
                    {activeTab === 'summary' ?
                        (
                            summary && company ? (
                                <Summary ticker={ticker} summary={summary} company={company} />
                            ) : (
                                <CircularProgress />
                            )
                        ) : null}
                </div>
                <div className={`tab-pane ${activeTab === 'news' ? 'active' : ''}`} id="news" role="tabpanel" aria-labelledby="news-tab">
                    {/* Content for News tab */}
                    {activeTab === 'news' ? (
                        company ? (<News ticker={company.name} />) : (<CircularProgress />)
                    ) : null}
                </div>
                <div className={`tab-pane ${activeTab === 'chart' ? 'active' : ''}`} id="chart" role="tabpanel" aria-labelledby="chart-tab">
                    {/* Content for Chart tab */}
                    {activeTab === 'chart' ? (
                        <Chart ticker={ticker} />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default StockDetail;
