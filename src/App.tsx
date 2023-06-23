import { SyntheticEvent, useEffect, useState } from 'react'
import './App.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

function App() {
    const [open, setOpen] = useState(true);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const handleClose = (_event: SyntheticEvent<{}, Event>, reason: "backdropClick" | "escapeKeyDown") => {
        if (!reason) {
            setOpen(false);
        }
    };

    function handleDone(_event: SyntheticEvent<{}, Event>): void {
        if (name) {
          setOpen(false);
        } else {
            setNameError("Please Enter Your Name😇😃");
        }
    }

    function handleBackdropClick(event: SyntheticEvent<{}, Event>): boolean {
        event.stopPropagation();
        return false;
    }

    useEffect(() => {
        if (name) {
            setOpen(true);
        }
    }, []);

    return (
        <>
            <div>
                <Dialog open={open} onClose={handleClose} onBackdropClick={handleBackdropClick}>
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
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <span className="error">{nameError}</span>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" size="small" color="primary" onClick={handleDone}>Done</Button>
                    </DialogActions>
                </Dialog>
                <h1>{name}</h1>
            </div>
        </>
    )
}

export default App
