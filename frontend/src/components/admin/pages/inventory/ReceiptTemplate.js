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

const StyledTableCell = withStyles((theme) => ({
	head: {
		fontSize: 13,
		fontWeight: 'bold',
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

export default class ReceiptTemplate extends React.PureComponent {
	render() {
		const selectedItems = this.props.data;
		const date = new Date().toLocaleDateString();
		const time = new Date().toLocaleTimeString();
		const itemAmount = selectedItems.map(
			(item) => item.unitSellingPrice * item.newSales
		);
		const billTotal = itemAmount.reduce((item1, item2) => item1 + item2);

		return (
			<div
				style={{
					margin: '1.5rem',
					padding: '2rem',
					backgroundColor: '#fff',
				}}
			>
				<TableContainer>
					<p className='receipt-header'>BILL INVOICE</p>
					<p className='receipt-header'>SHANE &amp; SHAWN ANIMAL CLINIC</p>
					<Grid container direction='row' justify='space-evenly'>
						<p className='receipt-desc'>
							No 50. Molamure Rd, Kegalle - 071 054 3085 | 076 778 8839
						</p>
						<p className='receipt-datetime'>
							ISSUED AT: {date} - {time}
						</p>
					</Grid>
					<Table
						size='small'
						stickyHeader
						style={{ margin: 'auto', marginTop: '1rem' }}
					>
						<TableHead>
							<TableRow>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Quantity</StyledTableCell>
								<StyledTableCell>Unit Price</StyledTableCell>
								<StyledTableCell>Price</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{selectedItems.length > 0 ? (
								selectedItems.map((item) => (
									<TableRow key={item.id}>
										<StyledTableCell>{`${item.brand} ${item.name}`}</StyledTableCell>
										<StyledTableCell>{item.newSales}</StyledTableCell>
										<StyledTableCell>{item.unitSellingPrice}</StyledTableCell>
										<StyledTableCell>
											{item.unitSellingPrice * item.newSales}
										</StyledTableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<StyledTableCell>No Items</StyledTableCell>
								</TableRow>
							)}
							<TableRow>
								<StyledTableCell>TOTAL AMOUNT</StyledTableCell>
								<StyledTableCell>{selectedItems.length}</StyledTableCell>
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
