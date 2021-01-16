import React from 'react';
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    withStyles,
} from '@material-ui/core';
import { UserData } from '../Models/UserData';

export interface IUserDetailProps {
    displayState: boolean;
    onCloseAction: () => void;
    userDetail: UserData | undefined;
}

const StyledTableCell = withStyles(() =>
    createStyles({
        root: {
            borderBottom: 'none',
        },
    })
)(TableCell);

const useStyles = makeStyles({
    titleArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },

    contentArea: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2vh',
    },

    actionArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2vh',
    },

    secondColumn: { color: '#00994D' },
});

function UserDetailDialog(props: IUserDetailProps) {
    const localStyle = useStyles();
    return (
        <Dialog
            open={props.displayState}
            onClose={props.onCloseAction}
            aria-labelledby="user-detail-dialog-title"
            aria-describedby="user-detail-dialog-description"
        >
            <DialogTitle
                id="user-detail-dialog-title"
                className={localStyle.titleArea}
            >
                Profile
            </DialogTitle>
            <DialogContent className={localStyle.contentArea}>
                <img alt="avatar" src={props.userDetail?.avatar} />
                <TableContainer>
                    <Table aria-label="User details" id="tbl-user-detail">
                        <TableBody>
                            <TableRow key="id">
                                <StyledTableCell align="right">
                                    <Typography>ID:</Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    align="left"
                                    className={localStyle.secondColumn}
                                >
                                    <Typography>
                                        {props.userDetail?.id}
                                    </Typography>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow key="firstName">
                                <StyledTableCell align="right">
                                    <Typography>First Name:</Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    align="left"
                                    className={localStyle.secondColumn}
                                >
                                    <Typography>
                                        {props.userDetail?.first_name}
                                    </Typography>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow key="lastName">
                                <StyledTableCell align="right">
                                    <Typography>Last Name:</Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    align="left"
                                    className={localStyle.secondColumn}
                                >
                                    <Typography>
                                        {props.userDetail?.last_name}
                                    </Typography>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow key="email">
                                <StyledTableCell align="right">
                                    <Typography>Email:</Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                    align="left"
                                    className={localStyle.secondColumn}
                                >
                                    <Typography>
                                        {props.userDetail?.email}
                                    </Typography>
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions className={localStyle.actionArea}>
                <Button variant="outlined" onClick={props.onCloseAction}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserDetailDialog;
