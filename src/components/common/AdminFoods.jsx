import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import foodApi from '../../api/modules/foods.api';
import AddFood from './AddFood';
import EditFood from './EditFood';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'image',
    numeric: true,
    disablePadding: true,
    label: 'Image',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: true,
    label: 'Category',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: true,
    label: 'Action',
  },
]
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function AdminFoods() {

  const [foodsList, setFoodsList] = useState([])

  const [isRequest, setIsRequest] = useState(false)

  const [showAddNew, setShowAddNew] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const [showEdit, setShowEdit] = useState(false)

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - foodsList.length) : 0;
  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedId(null);
    setOpen(false);
  };


  useEffect(() => {
    const getListFoods = async () => {
      const { response, err } = await foodApi.listFoods()
      if (response) {
        setFoodsList(response)
        setIsLoading(false)
      }
      if (err) console.log(err)
    }
    getListFoods()
  }, [showAddNew, isRequest, showEdit])

  const deleteFoods = async (id) => {
    const { response, err } = await foodApi.deleteFood(id)
    if (response) {
      toast.success('Delete food successfully')
      setIsRequest(!isRequest)
      setOpen(false)
    }
    if (err) console.log(err)
  }

  const handleAddNew = () => {
    setShowAddNew(true)
  }

  const handleEidt = (id) => {
    setSelectedId(id)
    setShowEdit(true)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Box position='fixed'
        width='calc(100% - 60px)'
        sx={{
          marginLeft: '60px',
          height: '693px',
          top: '50px',
          left: 0,
          right: 0
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', width: '300px', margin: '20px 0px 10px 20px', justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <Typography textTransform='uppercase' variant='h5' fontWeight='500'>Food</Typography>
          <Button variant='contained' sx={{
            backgroundColor: '#2daf1b',
            ":hover": {
              backgroundColor: '#2daf1b',
              opacity: 0.9
            }
          }}
            onClick={handleAddNew}
          >
            Add new
          </Button>
        </Box>
        <Box>
          {isLoading && <CircularProgress sx={{
            color: 'green',
            margin: 'calc(500px / 2)',
            width: '100px',
            height: '100px'
          }} />}
          {!isLoading && (
            <>
              <TableContainer component={Paper} sx={{ height: '550px', }}>
                <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={foodsList.length}
                  />
                  <TableBody>
                    {stableSort(foodsList, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.name)}
                            tabIndex={-1}
                            key={row.name}
                          >
                            <TableCell
                            >
                              <Avatar src={row.image} />
                            </TableCell>
                            <TableCell >{row.id}</TableCell>
                            <TableCell >{row.name}</TableCell>
                            <TableCell>{row.category.name}</TableCell>
                            <TableCell sx={{
                              display: 'flex',
                              justifyItems: 'center',
                            }}>
                              <Button
                                variant='contained'
                                sx={{
                                  marginRight: '10px',
                                  height: '40px'
                                }}
                                onClick={() => handleEidt(row.id)}
                              ><EditOutlinedIcon /></Button>
                              <Box>
                                <Button
                                  variant='contained'
                                  sx={{
                                    backgroundColor: 'red',
                                    height: '40px',
                                    ":hover": {
                                      backgroundColor: 'red',
                                      opacity: 0.8
                                    }
                                  }}
                                  onClick={() => handleClickOpen(row.id)}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </Button>
                                <Dialog
                                  open={open}
                                  onClose={handleClose}
                                >
                                  <DialogTitle>Delete category</DialogTitle>
                                  <DialogContent>
                                    <DialogContentText>
                                      Are you sure you want to delete this category?
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button
                                      onClick={() => deleteFoods(selectedId)}
                                      sx={{
                                        backgroundColor: 'white',
                                        ":hover": {
                                          backgroundColor: 'red',
                                          opacity: 0.8
                                        }
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={foodsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
      {showAddNew && <AddFood onClose={() => setShowAddNew(false)} />}
      {showEdit && <EditFood id={selectedId} onClose={() => setShowEdit(false)} />}
    </Box>
  )
}