import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {createTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@mui/material";
import {common} from "@material-ui/core/colors";

export default function XPrompt(props) {

    const handleNo = () => {
        props.setYes(false)
        props.setOpen(false)
    }
    const handleYes = () => {
        props.setYes(true)
        props.setOpen(false)
    }

    const theme = createTheme({
        palette: {
            type: "dark",
        },
        typography: {
            allVariants: {
                color: common.white
            }
        },

    })
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Dialog
                    open={props.isOpen}>
                    <DialogTitle>
                        {`${props.title === undefined ? 'You are going to delete this.' : props.title}`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`${props.promptText === undefined ? 'Do you want to delete ?' : props.promptText}`}

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color={"inherit"} onClick={handleYes}>Yes</Button>
                        <Button color={"inherit"} onClick={handleNo} autoFocus>No</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    )
}