import { useState, useEffect} from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import slika from '../../images/konsultacije.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    let history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h3"  align="center">E-Instrukcije</Typography>
                <img className={classes.image} src={slika} alt="slika" height="60" />
            </div> 
            <Toolbar className={classes.toolbar}>
                {user && <Button
                            size="small"
                            //onClick={()=>{history.push('/requests')}}
                            component={Link}
                            to="/requests"
                         >
                         <ScheduleIcon />
                         </Button>
                }
                {user && <Button
                            size="small"
                            //onClick={()=>{history.push('/messenger')}}
                            component={Link}
                            to="/messenger"
                         >
                         <MessageOutlinedIcon/>
                         </Button>
                }
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography component={Link} to={`/profile/${user.result._id}`} className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>      
            </AppBar>
    );
}
 
export default Navbar;