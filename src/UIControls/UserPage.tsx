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
import UserDetailDialog from './UserDetailDialog';
import { UserData } from '../Models/UserData';

interface Column {
    id: 'id' | 'first_name' | 'last_name' | 'email';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const firstColumn: Column = {
    id: 'id',
    label: 'ID',
    minWidth: 50,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
};

const columns: Column[] = [
    { id: 'first_name', label: 'GIVEN NAME', align: 'center', minWidth: 150 },
    { id: 'last_name', label: 'FAMILY NAME', align: 'center', minWidth: 150 },
    { id: 'email', label: 'EMAIL', align: 'center', minWidth: 200 },
];

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
            backgroundColor: '#4d4d4d',
            color: '#FFF',
            border: '1px solid rgba(224, 224, 224, 1)',
        },
        body: {
            color: '#00994D',
            fontWeight: 500,
            border: '1px solid rgba(224, 224, 224, 1)',
        },
    })
)(TableCell);

const StickyTableCell = withStyles(() => ({
    head: {
        left: 0,
        position: 'sticky',
        zIndex: 10,
        backgroundColor: '#4d4d4d',
        color: '#FFF',
        border: '1px solid rgba(224, 224, 224, 1)',
    },
    body: {
        left: 0,
        position: 'sticky',
        zIndex: 10,
        color: '#00994D',
        fontWeight: 500,
        border: '1px solid rgba(224, 224, 224, 1)',
    },
}))(TableCell);

export default function UserPage() {
    const localStyle = useStyles();
    const [userData, setUserData] = useState<UserData[]>([]);
    const page = useRef(0);
    const totalPage = useRef(0);
    const fetchUser = useRef((currentPage: number) => {});
    const [showUserDetail, setShowUserDetail] = useState(false);
    const currentUser = useRef<UserData>();

    useEffect(() => {
        fetchUser.current(1);
    }, []);

    fetchUser.current = async (currentPage: number) => {
        const result = await axios.get(
            `https://reqres.in/api/users?page=${currentPage}`
        );
        page.current = result.data.page;
        totalPage.current = result.data.total_pages;
        setUserData(result.data.data);
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        fetchUser.current(value);
    };

    const handleCellClick = (data: UserData) => {
        currentUser.current = data;
        setShowUserDetail(true);
    };

    return (
        <div className={localStyle.primaryArea}>
            <UserDetailDialog
                displayState={showUserDetail}
                onCloseAction={() => {
                    setShowUserDetail(false);
                }}
                userDetail={currentUser.current}
            />
            <TableContainer className={localStyle.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StickyTableCell
                                key={firstColumn.id}
                                align={firstColumn.align}
                                style={{
                                    minWidth: firstColumn.minWidth,
                                }}
                            >
                                {firstColumn.label}
                            </StickyTableCell>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                    }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody className={localStyle.tableBody}>
                        {userData.map((row, index) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                    style={
                                        index % 2
                                            ? {
                                                  backgroundColor: '#F0F0F0',
                                              }
                                            : {
                                                  backgroundColor: '#FFF',
                                              }
                                    }
                                >
                                    <StickyTableCell
                                        key={firstColumn.id}
                                        align={firstColumn.align}
                                        style={{
                                            minWidth: firstColumn.minWidth,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            handleCellClick(row);
                                        }}
                                    >
                                        {row[firstColumn.id]}
                                    </StickyTableCell>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <StyledTableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    handleCellClick(row);
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
            <Pagination
                count={totalPage.current}
                showFirstButton
                showLastButton
                classes={{ ul: localStyle.paginationItem }}
                onChange={handlePageChange}
            />
        </div>
    );
}
