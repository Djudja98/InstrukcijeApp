import { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1; //cita url i gleda da li ima page parametar
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){ // 13 - kod za ENTER
            searchInstructionPost();
        }
    };

    const handleAddTag = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }

    const searchInstructionPost = () => {
        if(search.trim() || tags){
            dispatch(getPostsBySearch({search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history.push('/');
        }
    }

    return (
        <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField 
                                name="search" 
                                variant="outlined"
                                label="Search Instruction posts"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => {setSearch(e.target.value)}}
                                />
                                <ChipInput
                                style={{margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAddTag}
                                onDelete={handleDeleteTag}
                                label="Search by Tags (press enter)"
                                variant="outlined" 
                                />
                                <Button onClick={searchInstructionPost} className={classes.searchButton} color="primary" variant="contained">
                                Search
                                </Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            {(!searchQuery && !tags.length) && (
                                <Paper elevation={6} className={classes.pagination}>
                                    <Pagination page={page} />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    );
}
 
export default Home;