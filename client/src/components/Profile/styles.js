import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        height: '350px',
        padding: theme.spacing(2),
        width: '75%',
        [theme.breakpoints.down('sm')]: {
          height: '900px',
        },
      },
    editButton: {
      margin: '5px',
    },
      text: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left',
      },

      addUserButton:{
        marginTop: '10px',
      },
      
      media: {
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        objectFit: 'cover',
      },
      gridContainer: {
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column-reverse',
        },
      },
}));