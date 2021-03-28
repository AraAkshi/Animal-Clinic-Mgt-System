import React from 'react';
import Chart from 'chart.js';
import { months } from '../../../../services/datasets/dashboard.d';
import _ from 'lodash';
const ctx = 'treatmentChart';
const barColors = ['#ff7171', '#9fd8df', '#fdffbc', '#c6ebc9', '#ffd5cd'];

function TreatmentChart(props) {
	const { treatments } = props;
	let i = 0;
	const year = new Date().getFullYear();
	const itemData = treatments.map((item) => {
		const soldYear = new Date(item.dateReceived).getFullYear();
		if (year === soldYear) {
			const month = new Date(item.dateReceived).getMonth();
			return {
				type: item.treatmentType,
				month: month + 1,
			};
		}
	});

	const labels = months.map((month) => month.month);
	const groupedData = _.groupBy(itemData, 'type');
	const dataValue = Object.values(groupedData);

	const datasets = dataValue.map((item) => {
		i = i + 1;
		const data = months.map((month) => {
			let count = 0;
			for (let i = 0; i < item.length; i++) {
				if (item[i].month == month.id) count = count + 1;
			}
			return count;
		});
		return {
			label: item[0].type,
			backgroundColor: barColors[i - 1],
			data: data,
		};
	});

	const data = {
		labels: labels,
		datasets: datasets,
	};
	const myBarChart = new Chart(ctx, {
		type: 'bar',
		data: data,
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
							type: 'linear',
						},
					},
				],
			},
		},
	});

	return (
		<div className='chart-card'>
			<canvas id='treatmentChart' width='30vw' height='7vh'></canvas>
		</div>
	);
}

export default TreatmentChart;
