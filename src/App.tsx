import { ChangeEventHandler, useEffect, useState } from 'react'
import './App.sass';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import Wishes from './Wishes'
import ReactPlayer from 'react-player';
import birthdaySong from './assets/music/birthday-song.mp3'

function App() {
    const [appState, setAppState] = useState({
        dialogIsOpen: true,
        wishedName: '',
        hasWishedNameError: false,
        message: '',
        audioPlay: false,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            let message = '';
            if (appState.wishedName && !appState.dialogIsOpen) {
                const index = Math.floor(Math.random() * Wishes.length);
                message = Wishes[index];
                message = message.replace(/wished_name/g, appState.wishedName);
                setAppState((prevState) => ({ ...prevState, message }));
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [appState.wishedName, appState.dialogIsOpen]);

    const handleClose = (_event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (reason) {
            setAppState((prevState) => ({ ...prevState, dialogIsOpen: false }));
        }
    };

    const makeMessage = () => {
        let message = '';
        if (appState.wishedName && appState.dialogIsOpen) {
            const index = Math.floor(Math.random() * Wishes.length);
            message = Wishes[index];
            message = message.replace(/wished_name/g, appState.wishedName);
        }
        setAppState((prevState) => ({
            ...prevState,
            message,
            dialogIsOpen: false,
            audioPlay: true,
        }));
    };

    const handleDone = (): void => {
        if (appState.wishedName) {
            makeMessage();
        } else {
            setAppState((prevState) => ({ ...prevState, hasWishedNameError: true }));
        }
    };

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
        setAppState((prevState) => ({
            ...prevState,
            wishedName: e.target.value,
        }));
    };

    function handleBackdropClick(event: { stopPropagation: () => void }): boolean {
        event.stopPropagation();
        return false;
    }

    const handleKeyUp = (event: { keyCode: number }): void => {
        if (event.keyCode === 13) {
            if (appState.dialogIsOpen && appState.wishedName) {
                makeMessage();
            } else {
                setAppState((prevState) => ({
                    ...prevState,
                    dialogIsOpen: false,
                    hasWishedNameError: true,
                }));
            }
        }
    };

    return (
        <>
            <div>
                <Dialog
                    open={appState.dialogIsOpen}
                    onClose={handleClose}
                    onBackdropClick={handleBackdropClick}
                >
                    <DialogTitle className="text-center">Dialog</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Your Name"
                            type="email"
                            fullWidth
                            variant="standard"
                            error={appState.hasWishedNameError}
                            onKeyUp={handleKeyUp}
                            helperText={appState.hasWishedNameError ? 'Please Enter Your Name😇😃' : ''}
                            value={appState.wishedName}
                            onChange={handleOnChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" size="small" color="primary" onClick={handleDone}>
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
                {(appState.wishedName && !appState.dialogIsOpen) ?

                    <div>
                        <div className="card">
                            <div className="back"></div>
                            <div className="front">
                                <div className="imgset">
                                    <img width="100%" src="https://1.bp.blogspot.com/-Mgj9-rbs65E/XfMoPSD5gtI/AAAAAAAAURk/NBokE2gSS2cTSJ2em5lZ5hJDuTtRN7UVwCLcBGAsYHQ/s1600/2713997.png" />
                                </div>
                            </div>
                            <div className="text-container">
                                <p id="head">Happy Birthday!</p>
                                <h5>From Hiren to You</h5>
                                <div
                                    className="birthday-wishes-container"
                                    dangerouslySetInnerHTML={{ __html: appState.message }}
                                />
                            </div>
                        </div>
                    </div>
                : ''}
                <ReactPlayer
                    url={birthdaySong}
                    playing={appState.audioPlay}
                    loop={true}
                    width={0}
                    height={0}
                />

            </div>
        </>
    )
}

export default App
