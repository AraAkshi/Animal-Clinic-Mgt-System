import React from 'react';
import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { formatDate } from '../../../../services/appointment';

const StyledTableCell = withStyles((theme) => ({
	head: {
		// backgroundColor: theme.palette.common.black,
		// color: theme.palette.common.white,
		fontSize: 13,
		fontWeight: 'bold',
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

export default class SaleReportTemplate extends React.PureComponent {
	render() {
		const date = new Date().toLocaleDateString();
		const time = new Date().toLocaleTimeString();

		const itemAmount =
			this.props.data.length > 0
				? this.props.data.map((item) => item.amount)
				: [0];
		const billTotal = itemAmount.reduce((item1, item2) => item1 + item2);

		return (
			<div
				// ref={ref}
				style={{
					margin: '1.5rem',
					padding: '3rem',
					backgroundColor: '#fff',
					border: '1px solid #eee',
					minHeight: '86%',
				}}
			>
				<p className='receipt-header'>SALES REPORT</p>
				<p className='receipt-header'>SHANE &amp; SHAWN ANIMAL CLINIC</p>
				<p className='receipt-subheader'>
					FROM {formatDate(this.props.StartDate)} TO{' '}
					{formatDate(this.props.EndDate)}
				</p>
				<Grid container direction='row' justify='space-evenly'>
					<p className='receipt-desc'>
						No 50. Molamure Rd, Kegalle - 071 054 3085 | 076 778 8839
					</p>
					<p className='receipt-desc'>
						ISSUED AT: {date} - {time}
					</p>
				</Grid>
				<TableContainer>
					<Table
						size='small'
						stickyHeader
						style={{ margin: 'auto', marginTop: '1rem' }}
					>
						<TableHead>
							<TableRow>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Sold Date</StyledTableCell>
								<StyledTableCell>Quantity</StyledTableCell>
								<StyledTableCell>Sales Amount</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.data.length > 0 ? (
								this.props.data.map((item) => (
									<TableRow key={item.id}>
										<StyledTableCell>{item.name}</StyledTableCell>
										<StyledTableCell>
											{formatDate(item.soldDate)}
										</StyledTableCell>
										<StyledTableCell>{item.soldQty}</StyledTableCell>
										<StyledTableCell>{item.amount}</StyledTableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<StyledTableCell>No Items</StyledTableCell>
								</TableRow>
							)}
							<TableRow>
								<StyledTableCell>TOTAL SALES</StyledTableCell>
								<StyledTableCell></StyledTableCell>
								<StyledTableCell></StyledTableCell>
								<StyledTableCell>{billTotal}</StyledTableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
}
