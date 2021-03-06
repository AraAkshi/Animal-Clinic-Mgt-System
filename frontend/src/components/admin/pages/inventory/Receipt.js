import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
// import Pdf from 'react-to-pdf';
import { Button, Grid } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import ReceiptTemplate from './ReceiptTemplate';

function Receipt(props) {
	const { selectedItems } = props;

	const componentRef = useRef();
	return (
		<div
			style={{
				backgroundColor: '#fff',
				padding: '0.5rem',
			}}
		>
			<ReactToPrint
				trigger={() => (
					<Grid container direction='row' justify='center'>
						<Button
							variant='contained'
							color='default'
							startIcon={<GetAppIcon />}
						>
							Get Receipt
						</Button>
					</Grid>
				)}
				content={() => componentRef.current}
			/>
			<ReceiptTemplate ref={componentRef} data={selectedItems} />
			{/* <div
				ref={ref}
				style={{
					margin: '0.2rem',
					minHeight: '90vh',
					backgroundColor: '#fff',
				}}
			>
				<TableContainer>
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
						style={{ width: '45vw', margin: 'auto', marginTop: '1rem' }}
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
			</div> */}
			{/* <Pdf targetRef={ref} filename='Receipt.pdf'>
				{({ toPdf }) => (
					<Grid container direction='row' justify='center'>
						<Button
							onClick={toPdf}
							variant='contained'
							color='default'
							startIcon={<GetAppIcon />}
						>
							Get Receipt
						</Button>
					</Grid>
				)}
			</Pdf> */}
		</div>
	);
}

export default Receipt;
