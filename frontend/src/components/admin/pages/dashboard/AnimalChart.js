import React from 'react';
import Chart from 'chart.js';
import _ from 'lodash';
const ctx = 'animalChart';

function AnimalChart(props) {
	const { animals } = props;
	const groupedData = _.groupBy(animals, 'type.name');
	const dataValue = Object.values(groupedData);

	const data = {
		datasets: [
			{
				data: dataValue.map((item) => item.length),
				backgroundColor: [
					'#ffd5cd',
					'#9fd8df',
					'#fdffbc',
					'#ff7171',
					'#c6ebc9',
				],
			},
		],
		labels: Object.keys(groupedData),
	};

	let myPieChart = new Chart(ctx, {
		type: 'pie',
		data: data,
	});

	return (
		<div className='chart-card'>
			<canvas id='animalChart' width='10vw' height='7vh'></canvas>
		</div>
	);
}

export default AnimalChart;
