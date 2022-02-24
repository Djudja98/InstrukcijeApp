import { useEffect, useState } from "react";
import { Paper, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import * as api from '../../api';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import Comments from './Comments';
import SendRequestForm from "./SendRequestForm";
import SendReportForm from "./SendReportForm";
import PopupEdit from '../Profile/PopupEdit';

const initialValues = {
    title: '',
    senderName: '',
    accepted : false,
    rejected: false,
    senderId: '',
    receiverId: '',
    date: '',
}

const initReport = {
    title: '',
    senderName: '',
    senderId: '',
    postId: '',
    description: '',
}

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('profile'));

    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);
    const [requestInfo ,setRequestInfo] = useState(initialValues);
    const [reportInfo, setReportInfo] = useState(initReport);

    const sendRequest = async (values) =>{
        //izvuci odg. polja iz posta i popuni ih u reqeustu prije slanja
        values={...values, title:post.title,
             senderName: user?.result?.name,
             senderId: user?.result?._id,
             receiverId: post.creator, }
        try{
            await api.createRequest(values);
        }catch(error){
            console.log(error);
        }
        setOpenPopup(false);
    }

    const sendReport = async (values) =>{
        values={...values, title:post.title,
            senderName:post.name,
            senderId: post.creator,
            postId:post._id 
        }
        try{
            await api.createReport(values);
        }catch(error){
            console.log(error);
        }
        setOpenPopup2(false);
    }

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if(post){
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') })); // ovo ce da popuni posts iz useSelector
        }
    }, [post]);

    if(!post) return null;

    if(isLoading){
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
        </Paper>
    }

    const recommendedPosts = posts.filter(({_id}) => _id !== post._id);

    const openPost = (_id) => {
        history.push(`/posts/${_id}`);
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px'}} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                <Typography variant="h4" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '60rem'}}>
                <Typography style={{ wordWrap: 'break-word' }} display="block" gutterBottom variant="body1" component="p">{post.message}</Typography>
                </div> 
                <Typography variant="h6">
                Created by:
                <Link to={`/profile/${post.creator}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                {` ${post.name}`}
                </Link>
          </Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Comments post={post} />
                <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
        </div>
        {user?.result?._id && <Button
        variant="contained"
        color="primary"
        className={classes.editButton}
        onClick={() => setOpenPopup(true)} >
        Send request
        </Button>}
        {user?.result?._id && <Button
        variant="contained"
        color="secondary"
        className={classes.reportButton}
        onClick={() => setOpenPopup2(true)} >
        Send report
        </Button>}
        {(recommendedPosts.length > 0) && (
            <div className={classes.section}>
                <Typography gutterBottom variant="h5">Similiar Instruction posts:</Typography>
                <Divider />
                <div className={classes.recommendedPosts}>
                    {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id}) => (
                        <div style={{margin: '20px', cursor: "pointer"}} onClick={() => openPost(_id)} key={_id}>
                            <Typography gutterBottom variant="h6">{title}</Typography>
                            <Typography gutterBottom variant="subtitle2">{name}</Typography>
                            <Typography gutterBottom variant="subtitle2">{message.substring(0,10) + "..."}</Typography>
                            <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                            <img src={selectedFile} width="200px" />
                        </div>
                    ))}
                </div>
            </div>
        )}
        {!recommendedPosts.length && (
            <Typography gutterBottom variant="h5">No Similiar Instruction posts </Typography>
        )}
        <PopupEdit openPopup={openPopup} setOpenPopup={setOpenPopup} title="Create request">
            <SendRequestForm 
            sendRequest={sendRequest} 
            requestInfo = {requestInfo}
            setRequestInfo={setRequestInfo}>
            </SendRequestForm>
        </PopupEdit>
        <PopupEdit openPopup={openPopup2} setOpenPopup={setOpenPopup2} title="Create report">
            <SendReportForm
            sendReport={sendReport}
            reportInfo={reportInfo}
            setReportInfo={setReportInfo}>
            </SendReportForm>
        </PopupEdit>
      </Paper>
    );
}
 
export default PostDetails;