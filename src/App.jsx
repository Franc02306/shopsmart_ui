import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  TextField,
  TablePagination,
  InputAdornment,
  CardActionArea,
  CardMedia
} from '@mui/material';

import LinkIcon from '@mui/icons-material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from 'sweetalert2';

const CommitteGroups = () => {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openUserList, setOpenUserList] = useState(false);
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]); // Grupos filtrados
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda

  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(10); // Grupos por página

  const handleCreateGroup = () => {
    setSelectedGroup(null);
    setOpenCreateGroup(true);
    setIsEditMode(false);
  };

  const handleMenuClick = (event, groupId) => {
    setAnchorEl(event.currentTarget);
    setActiveGroupId(groupId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveGroupId(null);
  };

  const getListGroups = async () => {
    // Lógica para obtener los grupos
    const dummyGroups = [
      { id: 1, name_group: 'Grupo 1', description: 'Descripción del Grupo 1' },
      { id: 2, name_group: 'Grupo 2', description: 'Descripción del Grupo 2' }
    ];
    setGroups(dummyGroups);
    setFilteredGroups(dummyGroups);
  };

  const handleEditGroup = grupo => {
    setSelectedGroup(grupo);
    setIsEditMode(true);
    setOpenCreateGroup(true);
    handleMenuClose();
  };

  const handleViewUsers = grupo => {
    setSelectedGroup(grupo);
    setOpenUserList(true);
    handleMenuClose();
  };

  const handleGroupSubmitSuccess = () => {
    getListGroups();
    setOpenCreateGroup(false);
  };

  useEffect(() => {
    getListGroups();
  }, []);

  const handleDeleteGroup = async groupId => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then(async result => {
      if (result.isConfirmed) {
        // Lógica para eliminar grupo
        Swal.fire('Eliminado', 'El grupo ha sido eliminado exitosamente', 'success');
        getListGroups();
      }
    });
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredGroups(groups.filter(group => group.name_group.toLowerCase().includes(searchValue)));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md>
          <TextField
            label="Buscar por título"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md="auto">
          <Button variant="contained" color="primary" onClick={handleCreateGroup}>
            Crear grupo
          </Button>
        </Grid>
      </Grid>

      {/* Lista de grupos */}
      <Grid container spacing={3}>
        {filteredGroups.length === 0 ? (
          <Box sx={{ textAlign: 'center', padding: 4 }}>
            <Typography variant="body1" color="textSecondary">
              No hay grupos existentes
            </Typography>
          </Box>
        ) : (
          filteredGroups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grupo, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card elevation={3} sx={{ maxWidth: 345, borderRadius: '16px' }}>
                <CardHeader
                  title={grupo.name_group}
                  action={
                    <IconButton onClick={e => handleMenuClick(e, grupo.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {grupo.description || 'Sin descripción'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Ver Documentos
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <TablePagination
        component="div"
        count={filteredGroups.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default CommitteGroups;