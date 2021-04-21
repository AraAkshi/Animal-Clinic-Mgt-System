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

export default class StockReportTemplate extends React.PureComponent {
	render() {
		const date = new Date().toLocaleDateString();
		const time = new Date().toLocaleTimeString();
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
				<p className='receipt-header'>INVENTORY REPORT</p>
				<p className='receipt-header'>SHANE &amp; SHAWN ANIMAL CLINIC</p>
				{/* <p className='receipt-subheader'>
					FROM {formatDate(this.props.StartDate)} TO{' '}
					{formatDate(this.props.EndDate)}
				</p> */}
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
								<StyledTableCell>Batch No</StyledTableCell>
								<StyledTableCell>Brand</StyledTableCell>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Sold Quantity</StyledTableCell>
								<StyledTableCell>Remaining Quantity</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.data.length > 0 ? (
								this.props.data.map((item) => (
									<TableRow
										key={item.id}
										style={{
											backgroundColor:
												item.quantity <= item.bufferQty ? '#ff6961' : '',
										}}
									>
										<StyledTableCell>{item.batchNo}</StyledTableCell>
										<StyledTableCell>{item.brand}</StyledTableCell>
										<StyledTableCell>{item.name}</StyledTableCell>
										<StyledTableCell>{item.soldQty}</StyledTableCell>
										<StyledTableCell>{item.quantity}</StyledTableCell>
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
