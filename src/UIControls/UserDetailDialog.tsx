import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
} from '@material-ui/core';
import { UserData } from '../Models/UserData';

export interface IUserDetailProps {
    displayState: boolean;
    onCloseAction: () => void;
    userDetail: UserData | undefined;
}

const useStyles = makeStyles({
    titleArea: {
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
    },
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
