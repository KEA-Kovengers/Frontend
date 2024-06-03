import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import UserTableRow from './user-table-row';
import UserTableHead from './user-table-head';
import TableEmptyRows from './table-empty-rows';
import UserTableToolbar from './user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';

import { GetTypeReportList } from 'src/api/report.api';
import { GetUserInfo } from 'src/api/user.api';

export default function MonitoringPage() {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedBreadcrumb, setSelectedBreadcrumb] = useState(0);
  const [userProfiles, setUserProfiles] = useState({});
  const [userNames, setUserNames] = useState({});
  const navigate = useNavigate();

  const fetchReports = (type) => {
    const fetchFunction = type ? GetTypeReportList : null;
    fetchFunction(type).then(response => {
      if (response.data.isSuccess) {
        const reportList = response.data.result;
        setReports(reportList);
        reportList.forEach(report => {
          GetUserInfo(report.report.userID).then(userResponse => {
            if (userResponse.data.isSuccess) {
              setUserProfiles(prevProfiles => ({
                ...prevProfiles,
                [report.report.userID]: userResponse.data.result.profileImg,
              }));
              setUserNames(prevNames => ({
                ...prevNames,
                [report.report.userID]: userResponse.data.result.nickName,
              }));
            } else {
              console.error('Failed to fetch user info');
            }
          });
        });
      } else {
        console.error('Failed to fetch reports');
      }
    });
  };

  useEffect(() => {
    if (selectedBreadcrumb === 0) {
      fetchReports('POST');
    } else if (selectedBreadcrumb === 1) {
      fetchReports('COMMENT');
    } else {
      fetchReports(null);
    }
  }, [selectedBreadcrumb]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = reports.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: reports,
    comparator: getComparator(order, orderBy),
    filterName,
    userNames,
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        신고
      </Typography>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          selectedBreadcrumb={selectedBreadcrumb}
          setSelectedBreadcrumb={setSelectedBreadcrumb}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={reports.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'body', label: 'Content' },
                  { id: 'created_at', label: 'Date' },
                  { id: 'type', label: 'Article' },
                  { id: 'userID', label: 'Reporter' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      key={index}
                      name={userNames[row.report.userID] || ''}
                      title={row.title || 'No title'}
                      content={row.report.body}
                      avatarUrl={userProfiles[row.report.userID] || ''}
                      date={new Date(row.report.created_at).toLocaleDateString()}
                      selected={selected.indexOf(userNames[row.report.userID] || '') !== -1}
                      handleClick={(event) => handleClick(event, userNames[row.report.userID] || `User ${row.report.userID}`)}
                      onRowClick={() => {
                        if (row.report.type === 'POST') {
                          navigate(`/article/${row.report.contentID}`);
                        }
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, reports.length)}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={reports.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
