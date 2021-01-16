import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
    id: 'id' | 'first_name' | 'last_name' | 'email';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: Column[] = [
    {
        id: 'id',
        label: 'ID',
        minWidth: 50,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    { id: 'first_name', label: 'GIVEN NAME', align: 'center', minWidth: 150 },
    { id: 'last_name', label: 'FAMILY NAME', align: 'center', minWidth: 150 },
    { id: 'email', label: 'EMAIL', align: 'center', minWidth: 200 },
];

interface Data {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

const useStyles = makeStyles({
    primaryArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: ' center',
        maxWidth: 600,
        maxHeight: 360,
    },

    tableContainer: {
        //direction: 'rtl',
        overflow: 'auto',

        // transform: 'rotateX(180deg)',
        // msTransform: 'rotateX(180deg)' /* IE 9 */,
        // webkitTransform: 'rotateX(180deg)' /* Safari and Chrome */,
    },

    tableHeader: {
        //maxWidth: 350,
        direction: 'ltr',
    },

    tableBodyContainer: {
        direction: 'ltr',
        //direction: 'rtl',
        //overflowY: 'auto',
        //overflowX: 'initial',
        //maxHeight: 120,
        //maxWidth: 500,
        //maxWidth: 350,
    },

    tableBody: {
        direction: 'ltr',
    },

    paginationItem: {
        '& .MuiPaginationItem-root': {
            color: '#66B2FF',
            fontWeight: 500,
        },
        '& .Mui-selected': {
            color: '#000',
            fontWeight: 500,
        },
    },
});

const StyledTableCell = withStyles(() =>
    createStyles({
        head: {
            backgroundColor: '#000',
            color: '#FFF',
            border: '1px solid rgba(224, 224, 224, 1)',
        },
        body: {
            fontSize: 14,
            color: '#00994D',
            fontWeight: 500,
            border: '1px solid rgba(224, 224, 224, 1)',
        },
    })
)(TableCell);

export default function UserPage() {
    const localStyle = useStyles();
    const [data, setData] = useState<Data[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const fetchUser = useRef(() => {});

    useEffect(() => {
        fetchUser.current();
    }, []);

    fetchUser.current = async () => {
        const result = await axios.get(`https://reqres.in/api/users`);
        setData(result.data.data);
        setPage(result.data.page);
        setRowsPerPage(result.data.per_page);
        setTotalPage(result.data.total_pages);
    };

    // const handleChangePage = (event: unknown, newPage: number) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (
    //     event: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(1);
    // };

    return (
        <div className={localStyle.primaryArea}>
            <TableContainer className={localStyle.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody className={localStyle.tableBody}>
                        {data
                            .slice(
                                (page - 1) * rowsPerPage,
                                (page - 1) * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        style={
                                            index % 2
                                                ? {
                                                      backgroundColor:
                                                          '#F0F0F0',
                                                  }
                                                : {
                                                      backgroundColor: '#FFF',
                                                  }
                                        }
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                        minWidth:
                                                            column.minWidth,
                                                    }}
                                                >
                                                    {column.format &&
                                                    typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                rowsPerPageOptions={[6]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
            <Pagination
                count={totalPage}
                showFirstButton
                showLastButton
                classes={{ ul: localStyle.paginationItem }}
            />
        </div>
    );
}
