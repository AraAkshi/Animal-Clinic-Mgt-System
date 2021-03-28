import React from 'react';
import Chart from 'chart.js';
import { months } from '../../../../services/datasets/dashboard.d';
import _ from 'lodash';
const ctx = 'salesChart';
const barColors = ['#ff7171', '#9fd8df', '#fdffbc', '#c6ebc9', '#ffd5cd'];

function SalesChart(props) {
	const { soldItems } = props;
	let i = 0;
	const year = new Date().getFullYear();
	const itemData = soldItems.map((item) => {
		const soldYear = new Date(item.soldDate).getFullYear();
		if (year === soldYear) {
			const month = new Date(item.soldDate).getMonth();
			return {
				type: item.category.name,
				sales: item.amount,
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
			let sales = 0;
			for (let i = 0; i < item.length; i++) {
				if (item[i].month == month.id) sales = item[i].sales + sales;
			}
			return sales;
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
						},
					},
				],
			},
		},
	});

	return (
		<div className='chart-card'>
			<canvas id='salesChart' width='50vw' height='10vh'></canvas>
		</div>
	);
}

export default SalesChart;
