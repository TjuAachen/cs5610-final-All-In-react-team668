import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { STOCK_GREEN, STOCK_RED, WHITE } from "../../constants/Constants";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const options = {
    plugins: {
        legend: {
            display: false,
        },
    }, hover: {
        intersect: false
    },
    elements: {
        line: {
            tension: 0
        },
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    scales: {
        x: {
            display: false
        },
        y: {
            display: false
        }
    },
};



function LineChart({ inputData, isIncrease }) {
    const [chartData, setData] = useState({});
    const color = isIncrease ? STOCK_GREEN : STOCK_RED;
    useEffect(() => {
        setData(inputData)

    }, [inputData]);
    return (
        <div>
            {(
                <Line
                    data={{
                        labels: chartData.x,
                        datasets: [
                            {
                                data: chartData.y, // Array of stock prices
                                fill: true,
                                backgroundColor: (context) => {
                                    const ctx = context.chart.ctx;
                                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                                    gradient.addColorStop(0, color);
                                    gradient.addColorStop(1, WHITE);
                                    return gradient;
                                  },
                                borderColor: color,
                                borderWidth: 2,
                            },
                        ],
                    }}
                    options={options} 
                />
            )}
        </div>
    );
}

export default LineChart;