import { TextField, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
    pageContent: {
        width: '700px',
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
    }
}))

const SendReportForm = ({sendReport, reportInfo ,setReportInfo}) => {
    const classes = useStyles();

    const handleInput = (e) => {
        setReportInfo({
            ...reportInfo,
            description:e.target.value,
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        sendReport(reportInfo);
    }

    return (
        <Paper className={classes.pageContent}>
            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                variant="outlined"
                label="Description"
                name="description"
                multiline
                rows={5}
                value={reportInfo.description}
                onChange={handleInput}
                />
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
 
export default SendReportForm;