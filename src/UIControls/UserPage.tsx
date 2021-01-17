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
        overflow: 'auto',
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

const StyledTableCellHead = withStyles(() =>
    createStyles({
        head: {
            backgroundColor: '#4d4d4d',
            color: '#FFF',
            border: '1px solid rgba(224, 224, 224, 1)',
        },
    })
)(TableCell);

const StyledTableCellEven = withStyles(() =>
    createStyles({
        body: {
            backgroundColor: '#F0F0F0',
            color: '#00994D',
            fontWeight: 500,
            border: '1px solid rgba(224, 224, 224, 1)',
        },
    })
)(TableCell);

const StyledTableCellOdd = withStyles(() =>
    createStyles({
        body: {
            backgroundColor: '#FFF',
            color: '#00994D',
            fontWeight: 500,
            border: '1px solid rgba(224, 224, 224, 1)',
        },
    })
)(TableCell);

const StickyTableCellHead = withStyles(() => ({
    head: {
        left: 0,
        position: 'sticky',
        zIndex: 5,
        backgroundColor: '#4d4d4d',
        color: '#FFF',
        border: '1px solid rgba(224, 224, 224, 1)',
    },
}))(TableCell);

const StickyTableCellBodyEven = withStyles(() => ({
    body: {
        left: 0,
        position: 'sticky',
        zIndex: 1,
        backgroundColor: '#F0F0F0',
        color: '#00994D',
        fontWeight: 500,
        border: '1px solid rgba(224, 224, 224, 1)',
    },
}))(TableCell);

const StickyTableCellBodyOdd = withStyles(() => ({
    body: {
        left: 0,
        position: 'sticky',
        zIndex: 1,
        backgroundColor: '#FFF',
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
                            <StickyTableCellHead
                                key={firstColumn.id}
                                align={firstColumn.align}
                                style={{
                                    minWidth: firstColumn.minWidth,
                                }}
                            >
                                {firstColumn.label}
                            </StickyTableCellHead>
                            {columns.map((column) => (
                                <StyledTableCellHead
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                    }}
                                >
                                    {column.label}
                                </StyledTableCellHead>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {userData.map((row, index) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    {index % 2 ? (
                                        <StickyTableCellBodyEven
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
                                        </StickyTableCellBodyEven>
                                    ) : (
                                        <StickyTableCellBodyOdd
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
                                        </StickyTableCellBodyOdd>
                                    )}
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return index % 2 ? (
                                            <StyledTableCellEven
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
                                            </StyledTableCellEven>
                                        ) : (
                                            <StyledTableCellOdd
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
                                            </StyledTableCellOdd>
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
