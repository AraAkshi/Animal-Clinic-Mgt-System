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

		return (
			<div
				// ref={ref}
				style={{
					margin: '1rem',
					padding: '1rem',
					backgroundColor: '#fff',
				}}
			>
				<p
					style={{
						fontSize: 18,
						textAlign: 'center',
						fontWeight: 'bold',
						fontFamily: 'Arial, Helvetica, sans-serif',
					}}
				>
					SALES REPORT
				</p>
				<p
					style={{
						fontSize: 18,
						textAlign: 'center',
						fontWeight: 'bold',
						fontFamily: 'Arial, Helvetica, sans-serif',
					}}
				>
					SHANE &amp; SHAWN ANIMAL CLINIC
				</p>
				<Grid container direction='row' justify='space-evenly'>
					<p
						style={{
							fontSize: 12,
							textAlign: 'center',
							fontWeight: 'bold',
							fontFamily: 'Arial, Helvetica, sans-serif',
						}}
					>
						No 50. Molamure Rd, Kegalle - 071 054 3085 | 076 778 8839
					</p>
					<p
						style={{
							fontSize: 12,
							textAlign: 'center',
							fontWeight: 'bold',
							fontFamily: 'Arial, Helvetica, sans-serif',
						}}
					>
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
								<StyledTableCell>Quantity</StyledTableCell>
								<StyledTableCell>Sales Amount</StyledTableCell>
								<StyledTableCell>Sold Date</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.salesData.length > 0 ? (
								this.props.salesData.map((item) => (
									<TableRow key={item.id}>
										<StyledTableCell>{item.name}</StyledTableCell>
										<StyledTableCell>{item.soldQty}</StyledTableCell>
										<StyledTableCell>{item.amount}</StyledTableCell>
										<StyledTableCell>
											{formatDate(item.soldDate)}
										</StyledTableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<StyledTableCell>No Items</StyledTableCell>
								</TableRow>
							)}
							{/* <TableRow>
							<StyledTableCell>TOTAL AMOUNT</StyledTableCell>
							<StyledTableCell>{selectedItems.length}</StyledTableCell>
							<StyledTableCell></StyledTableCell>
							<StyledTableCell>{billTotal}</StyledTableCell>
						</TableRow> */}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
}
