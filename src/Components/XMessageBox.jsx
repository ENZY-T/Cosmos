import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {createMuiTheme} from "@material-ui/core";
import {common} from "@material-ui/core/colors";
import {ThemeProvider} from "@mui/material";


export default function XPrompt(props) {

    const handleOk = () => {
        props.setOk && props.setOk(!props.isOk)
        props.setOpen(false)
    }

    const theme = createMuiTheme({
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
        <ThemeProvider theme={theme}>
            <div>
                <Dialog
                    open={props.isOpen}>
                    <DialogTitle>
                        {`${props.title === undefined ? 'Done.' : props.title}`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`${props.message === undefined ? 'Successful' : props.message}`}

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color={"inherit"} onClick={handleOk}>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider>
    )
}
