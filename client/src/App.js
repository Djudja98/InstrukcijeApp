import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Profile from './components/Profile/Profile';
import Messenger from './components/Messenger/Messenger';
import RequestList from './components/RequestList/RequestList';

const App = () => {
    //msm da ovdje treba use effect
    const user = JSON.parse(localStorage.getItem('profile'));
    
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/profile/:id" exact component={Profile} />
                    <Route path="/auth" exact component={() => (JSON.parse(localStorage.getItem('profile')) ?      <Redirect to="/posts" /> : <Auth />)} /> 
                    <Route path="/messenger" exact>
                        {JSON.parse(localStorage.getItem('profile')) ? <Messenger /> : <Redirect to="/auth" />}
                    </Route>
                    <Route path="/requests" exact>
                        {JSON.parse(localStorage.getItem('profile')) ? <RequestList /> : <Redirect to="/auth" />}
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}
 
export default App;