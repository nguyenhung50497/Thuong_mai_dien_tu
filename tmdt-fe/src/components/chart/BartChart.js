import React from "react";
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function BartChart(chartData) {
    return (
        <>
            <div>
                <h2>Bar Example (custom size)</h2>
                <Bar
                    data={chartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
                <h1>Bar Chart</h1>
            </div>
        </>
    )
}