import {
  TableContainer,
  Paper,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Button,
  TableBody,
  Modal,
  Backdrop,
  IconButton,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Alerts from '../../../layout/Alerts';
import { getAllItems, getItemsByCat } from '../../../../services/inventory';
import { getAllCategories } from '../../../../services/productCategory';
import CategoryBtn from './CategoryBtn';
import EditItem from './EditItem';
import { formatDate } from '../../../../services/appointment';
import { Autocomplete } from '@material-ui/lab';
import { getCategoryItems } from '../../../../services/inventory';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

function Inventory() {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState([]);
  const [categories, setCategories] = useState([
    { category: { id: 0, name: '', imagePath: '' }, items: [] },
  ]);
  const [searchItem, setSearchItem] = useState(null);
  const [items, setItems] = useState([
    {
      id: 0,
      isEmpty: false,
      name: '',
      category: { id: 0, name: '', imagePath: '' },
      brand: '',
      unitPurchasePrice: 0,
      bufferQty: 0,
      quantity: 0,
      unitSellingPrice: 0,
      purchasedDate: '',
      manufactureDate: '',
      expireDate: '',
      notifyBefore: 0,
      batchNo: 0,
      addedDate: '',
    },
  ]);

  const [catItems, setCatItems] = useState([]);

  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    isEmpty: false,
    name: '',
    category: { id: 0, name: '', imagePath: '' },
    brand: '',
    unitPurchasePrice: 0,
    bufferQty: 0,
    quantity: 0,
    unitSellingPrice: 0,
    purchasedDate: '',
    manufactureDate: '',
    expireDate: '',
    notifyBefore: 0,
    batchNo: 0,
    addedDate: '',
  });

  const handleSelectItem = (value) => {
    const item = items.find((item) => item.name === value);
    setSearchItem(item);
  };

  const addInventory = () => {
    window.open(window.location.origin + '/admin/inventory/add-item', '_self');
  };

  const sellItems = () => {
    window.open(window.location.origin + '/admin/inventory/sell-item', '_self');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleCatSelect = async (id) => {
    if (id !== null) {
      const items = await getCategoryItems(id);
      if (items !== undefined) setCatItems(items);
    } else {
      setCatItems([]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const categoryRes = await getAllCategories();
      const itemRes = await getAllItems();
      if (itemRes !== undefined && categoryRes !== undefined) {
        setItems(itemRes);
        const itemsByCat = await getItemsByCat(categoryRes);
        if (itemsByCat !== undefined) setCategories(itemsByCat);
      }
    }
    fetchData();
  }, [0]);

  return (
    <div>
      <Alerts alerts={alert} />
      <Header />
      <Sidebar />
      <div className="sidebar-container">
        <Grid container direction="row" justify="space-between">
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              alignContent="center"
              justify="space-evenly"
            >
              <Grid item>
                <Button
                  // variant='contained'
                  onClick={() => handleCatSelect(null)}
                >
                  ALL ITEMS
                </Button>
              </Grid>
              {categories.map((item) => (
                <Grid item>
                  <CategoryBtn cat={item} handleCatSelect={handleCatSelect} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <hr className="seperatorLine" />
        <Grid
          container
          direction="row"
          justify="space-between"
          style={{ marginBottom: '1rem' }}
        >
          <Grid item xs={3}>
            <Button
              size="small"
              color="secondary"
              startIcon={<ShoppingCartIcon />}
              onClick={sellItems}
              variant="contained"
            >
              Sell Items
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={items.map((item) => item.name)}
              onChange={(e, newValue) => {
                handleSelectItem(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              size="small"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={addInventory}
              variant="contained"
            >
              New Item
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-between">
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table size="small" stickyHeader style={{ maxHeight: '70vh' }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>Batch No</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Brand</StyledTableCell>
                    <StyledTableCell>Quantity Remaining</StyledTableCell>
                    <StyledTableCell>Manufacture Date</StyledTableCell>
                    <StyledTableCell>Expire Date</StyledTableCell>
                    <StyledTableCell>Purchased Date</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                    {localStorage.userRole === 'admin' ? (
                      <StyledTableCell></StyledTableCell>
                    ) : (
                      <StyledTableCell></StyledTableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchItem !== null && searchItem !== undefined ? (
                    <TableRow hover={true}>
                      <StyledTableCell>
                        {searchItem.category.name}
                      </StyledTableCell>
                      <StyledTableCell>{searchItem.batchNo}</StyledTableCell>
                      <StyledTableCell>{searchItem.name}</StyledTableCell>
                      <StyledTableCell>{searchItem.brand}</StyledTableCell>
                      <StyledTableCell>{searchItem.quantity}</StyledTableCell>
                      <StyledTableCell>
                        {formatDate(searchItem.manufactureDate)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatDate(searchItem.expireDate)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatDate(searchItem.purchasedDate)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {searchItem.unitSellingPrice}
                      </StyledTableCell>
                      {localStorage.userRole === 'admin' ? (
                        <TableCell>
                          <IconButton
                            color="secondary"
                            fontSize="small"
                            onClick={() => handleEdit(searchItem)}
                          >
                            <EditIcon />
                          </IconButton>
                          {/* <IconButton
														color='secondary'
														fontSize='small'
														onClick={() => handleDelete(item)}
													>
														<DeleteIcon fontSize='small' />
													</IconButton> */}
                        </TableCell>
                      ) : (
                        <TableCell />
                      )}
                    </TableRow>
                  ) : catItems.length > 0 ? (
                    catItems.map((item) => (
                      <TableRow hover={true}>
                        <StyledTableCell>{item.category.name}</StyledTableCell>
                        <StyledTableCell>{item.batchNo}</StyledTableCell>
                        <StyledTableCell>{item.name}</StyledTableCell>
                        <StyledTableCell>{item.brand}</StyledTableCell>
                        <StyledTableCell>{item.quantity}</StyledTableCell>
                        <StyledTableCell>
                          {formatDate(item.manufactureDate)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {formatDate(item.expireDate)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {formatDate(item.purchasedDate)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item.unitSellingPrice}
                        </StyledTableCell>
                        {localStorage.userRole === 'admin' ? (
                          <TableCell>
                            <IconButton
                              color="secondary"
                              fontSize="small"
                              onClick={() => handleEdit(item)}
                            >
                              <EditIcon />
                            </IconButton>
                            {/* <IconButton
														color='secondary'
														fontSize='small'
														onClick={() => handleDelete(item)}
													>
														<DeleteIcon fontSize='small' />
													</IconButton> */}
                          </TableCell>
                        ) : (
                          <TableCell />
                        )}
                      </TableRow>
                    ))
                  ) : items.length > 0 ? (
                    items.map((item) => (
                      <TableRow hover={true}>
                        <StyledTableCell>{item.category.name}</StyledTableCell>
                        <StyledTableCell>{item.batchNo}</StyledTableCell>
                        <StyledTableCell>{item.name}</StyledTableCell>
                        <StyledTableCell>{item.brand}</StyledTableCell>
                        <StyledTableCell>{item.quantity}</StyledTableCell>
                        <StyledTableCell>
                          {formatDate(item.manufactureDate)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {formatDate(item.expireDate)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {formatDate(item.purchasedDate)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item.unitSellingPrice}
                        </StyledTableCell>
                        {localStorage.userRole === 'admin' ? (
                          <TableCell>
                            <IconButton
                              color="secondary"
                              fontSize="small"
                              onClick={() => handleEdit(item)}
                            >
                              <EditIcon />
                            </IconButton>
                            {/* <IconButton
															color='secondary'
															fontSize='small'
															onClick={() => handleDelete(item)}
														>
															<DeleteIcon fontSize='small' />
														</IconButton> */}
                          </TableCell>
                        ) : (
                          <TableCell />
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <StyledTableCell>No Items Available</StyledTableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          height: '88vh',
          width: '48vw',
          margin: 'auto',
          // overflowY: 'auto',
        }}
        BackdropComponent={Backdrop}
      >
        <EditItem
          selectedItem={selectedItem}
          setAlert={setAlert}
          setOpen={setOpen}
          categories={categories}
        />
      </Modal>
    </div>
  );
}

export default Inventory;
