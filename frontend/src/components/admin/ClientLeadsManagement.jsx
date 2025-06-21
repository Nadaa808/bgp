import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Grid,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import './ClientLeadsManagement.css';

const ClientLeadsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [_selectedItem, setSelectedItem] = useState(null);
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalClients: 0,
    totalLeads: 0,
    totalBalance: 0,
    verificationRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No auth token found');
        setError('Authentication token not found. Please log in again.');
        return;
      }
      
      console.log('Fetching data with token:', token.substring(0, 20) + '...');
      
      // Fetch clients, leads, and stats in parallel using direct fetch
      const [clientsRes, leadsRes, clientStatsRes, leadStatsRes] = await Promise.all([
        fetch('http://localhost:5000/api/clients', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()),
        fetch('http://localhost:5000/api/leads', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()),
        fetch('http://localhost:5000/api/clients/stats/overview', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()),
        fetch('http://localhost:5000/api/leads/stats/overview', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
      ]);

      console.log('API Responses:', {
        clients: clientsRes,
        leads: leadsRes,
        clientStats: clientStatsRes,
        leadStats: leadStatsRes
      });

      setClients(clientsRes.data || []);
      setLeads(leadsRes.data || []);
      
      // Combine stats
      const clientStats = clientStatsRes.data;
      const leadStats = leadStatsRes.data;
      
      setStats({
        totalClients: clientStats?.totalClients || 0,
        totalLeads: leadStats?.totalLeads || 0,
        totalBalance: clientStats?.totalBalance || 0,
        verificationRate: clientStats?.verificationRate || 0
      });
      
      console.log('Data loaded successfully:', {
        clientsCount: clientsRes.data?.length,
        leadsCount: leadsRes.data?.length,
        stats: stats
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      setError(error.message || 'Failed to load data');
      
      // Set fallback data to show the UI
      setClients([]);
      setLeads([]);
      setStats({
        totalClients: 0,
        totalLeads: 0,
        totalBalance: 0,
        verificationRate: 0
      });
    } finally {
      setLoading(false);
    }
  };





  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#43e97b';
      case 'inactive':
        return '#6c757d';
      case 'hot':
        return '#f5576c';
      case 'warm':
        return '#f093fb';
      case 'cold':
        return '#4facfe';
      default:
        return '#6c757d';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  const ClientsTable = () => (
    <TableContainer component={Paper} className="data-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client ID</TableCell>
            <TableCell>Email ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Verification</TableCell>
            <TableCell>Registration Date</TableCell>
            <TableCell>Trading Status</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Client Type</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients
            .filter(client => 
              client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              client.clientId.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((client) => (
              <TableRow key={client.id} className="table-row">
                <TableCell>
                  <Typography variant="body2" fontWeight={600} color="#2c3e50">
                    {client.clientId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2">{client.email}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ background: '#3498db' }}>
                      {client.firstName[0]}{client.lastName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {client.firstName} {client.lastName}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{client.country}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={client.isVerified ? 'Verified' : 'Pending'}
                    size="small"
                    sx={{
                      background: client.isVerified ? '#43e97b20' : '#f5576c20',
                      color: client.isVerified ? '#43e97b' : '#f5576c',
                      fontWeight: 600
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(client.registrationAt)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={client.tradingStatus}
                    size="small"
                    sx={{
                      background: `${getStatusColor(client.tradingStatus)}20`,
                      color: getStatusColor(client.tradingStatus),
                      fontWeight: 600
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="body2">{client.manager}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600} color="#2c3e50">
                    {formatCurrency(client.balance)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={client.clientType}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: client.clientType === 'Individual' ? '#3498db' : '#f093fb',
                      color: client.clientType === 'Individual' ? '#3498db' : '#f093fb',
                      fontWeight: 600
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, client)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const CombinedTable = () => {
    // Combine clients and leads into a single array
    const combinedData = [
      ...clients.map(client => ({
        ...client,
        type: 'Client',
        id: `client-${client.id}`,
        identifier: client.clientId,
        status: client.tradingStatus,
        value: client.balance,
        dateField: client.registrationAt,
        isVerified: client.isVerified
      })),
      ...leads.map(lead => ({
        ...lead,
        type: 'Lead',
        id: `lead-${lead.id}`,
        identifier: lead.leadId,
        status: lead.status,
        value: lead.estimatedValue,
        dateField: lead.lastContact,
        manager: lead.source,
        tradingStatus: lead.status
      }))
    ];

    const filteredData = combinedData.filter(item => 
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <TableContainer component={Paper} className="data-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Manager/Source</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Client Type</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="table-row">
                <TableCell>
                  <Chip
                    label={item.type}
                    size="small"
                    sx={{
                      background: item.type === 'Client' ? '#3498db20' : '#f5576c20',
                      color: item.type === 'Client' ? '#3498db' : '#f5576c',
                      fontWeight: 600
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600} color="#2c3e50">
                    {item.identifier}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2">{item.email}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ 
                      background: item.type === 'Client' ? '#3498db' : '#f5576c' 
                    }}>
                      {item.firstName[0]}{item.lastName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {item.firstName} {item.lastName}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{item.country}</Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                      label={item.status}
                      size="small"
                      sx={{
                        background: `${getStatusColor(item.status)}20`,
                        color: getStatusColor(item.status),
                        fontWeight: 600
                      }}
                    />
                    {item.type === 'Client' && item.isVerified && (
                      <Chip
                        label="Verified"
                        size="small"
                        sx={{
                          background: '#43e97b20',
                          color: '#43e97b',
                          fontWeight: 600,
                          ml: 1
                        }}
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(item.dateField)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      {item.type === 'Client' ? item.manager : item.source}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600} color="#2c3e50">
                    {formatCurrency(item.value)}
                  </Typography>
                  {item.type === 'Lead' && item.score && (
                    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        Score: {item.score}
                      </Typography>
                      <TrendingUpIcon fontSize="small" color="action" />
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.clientType}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: item.clientType === 'Individual' ? '#3498db' : '#f093fb',
                      color: item.clientType === 'Individual' ? '#3498db' : '#f093fb',
                      fontWeight: 600
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, item)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  if (loading) {
    return (
      <div className="client-leads-management">
        <Box className="page-header" mb={3}>
          <Typography variant="h4" className="page-title">
            Client & Leads Management
          </Typography>
          <Typography variant="body1" className="page-subtitle">
            Loading...
          </Typography>
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div className="client-leads-management">
        <Box className="page-header" mb={3}>
          <Typography variant="h4" className="page-title">
            Client & Leads Management
          </Typography>
          <Typography variant="body1" className="page-subtitle" color="error">
            Error: {error}
          </Typography>
          <Button onClick={fetchData} variant="contained" sx={{ mt: 2 }}>
            Retry
          </Button>
        </Box>
      </div>
    );
  }

  return (
    <div className="client-leads-management">
      {/* Header */}
      <Box className="page-header" mb={3}>
        <Typography variant="h4" className="page-title">
          Client & Leads Management
        </Typography>
        <Typography variant="body1" className="page-subtitle">
          Manage your clients and track potential leads
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stats-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="stats-value">
                    {loading ? '...' : stats.totalClients}
                  </Typography>
                  <Typography variant="body2" className="stats-label">
                    Total Clients
                  </Typography>
                </Box>
                <Avatar sx={{ background: '#3498db', width: 48, height: 48 }}>
                  <PersonIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stats-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="stats-value">
                    {loading ? '...' : stats.totalLeads}
                  </Typography>
                  <Typography variant="body2" className="stats-label">
                    Active Leads
                  </Typography>
                </Box>
                <Avatar sx={{ background: '#f5576c', width: 48, height: 48 }}>
                  <TrendingUpIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stats-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="stats-value">
                    {loading ? '...' : formatCurrency(stats.totalBalance)}
                  </Typography>
                  <Typography variant="body2" className="stats-label">
                    Total Balance
                  </Typography>
                </Box>
                <Avatar sx={{ background: '#43e97b', width: 48, height: 48 }}>
                  <BusinessIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stats-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" className="stats-value">
                    {loading ? '...' : `${stats.verificationRate}%`}
                  </Typography>
                  <Typography variant="body2" className="stats-label">
                    Verification Rate
                  </Typography>
                </Box>
                <Avatar sx={{ background: '#f093fb', width: 48, height: 48 }}>
                  <AssignmentIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Card className="main-card">
        <CardContent>
          {/* Search Bar */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 600 }}>
              All Clients & Leads
            </Typography>
            
            <Box display="flex" gap={2}>
              <TextField
                size="small"
                placeholder="Search clients and leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300 }}
              />
            </Box>
          </Box>

          {/* Combined Table Content */}
          <CombinedTable />
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EmailIcon fontSize="small" sx={{ mr: 1 }} />
          Send Email
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ClientLeadsManagement; 