import DateFnsUtils from '@date-io/date-fns';
import { Paper, Button, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
    pageContent: {
        width: '75%',
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(1)
    },
    root:{
        '& .MuiFormControl-root':{
            width: '100%',
            margin: theme.spacing(1)
        }
    },
    typo:{
        paddingLeft: '8px',
        marginBottom: '20px',
    }
}))

const SendRequestForm = ({sendRequest, requestInfo ,setRequestInfo}) => {
    const classes = useStyles();

    const handleInput = (date) => {
        setRequestInfo({
            ...requestInfo,
            date: date,
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        sendRequest(requestInfo);
    }

    return (
        <Paper className={classes.pageContent}>
            <Typography className={classes.typo}>Enter date</Typography>
        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker 
                value={requestInfo.date}
                onChange={handleInput}
                />
            </MuiPickersUtilsProvider>
            <div>
            <Button
            className={classes.button}
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            onClick={handleSubmit}
            >
            Submit
            </Button>
            </div>
        </form>
    </Paper>
    );
}
 
export default SendRequestForm;