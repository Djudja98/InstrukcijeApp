import { TextField, Paper, Button } from '@material-ui/core';
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
    }
}))

const UpdateProfileForm = ({editAboutMe, userInfoEdit ,setUserInfoEdit}) => {
    const classes = useStyles();

    const handleInput = (e) => {
        const {name, value} = e.target;
        setUserInfoEdit({
            ...userInfoEdit,
            [name]:value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        editAboutMe(userInfoEdit);
    }

    return (
        <Paper className={classes.pageContent}>
            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                variant="outlined"
                label="Age"
                name="age"
                value={userInfoEdit.age}
                onChange={handleInput}
                />
                <TextField
                variant="outlined"
                label="Phone"
                name="phone"
                value={userInfoEdit.phone}
                onChange={handleInput}
                />
                <TextField
                variant="outlined"
                label="aboutMe"
                name="aboutMe"
                multiline
                minRows={8}
                value={userInfoEdit.aboutMe}
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
 
export default UpdateProfileForm;