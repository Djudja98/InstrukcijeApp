import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbDownAltOutlined from '@material-ui/icons/ThumbDownAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deletePost, likePost, dislikePost } from '../../../actions/posts';
import useStyles from './styles';
import no_img from '../../../images/noimg.png';

const Post = ({ post, setCurrentId, showEdit }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const Dislikes = () => {
        if (post.dislikes.length > 0) {
          return post.dislikes.find((dislike) => dislike === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbDownAltIcon fontSize="small" />&nbsp;{post.dislikes.length > 2 ? `You and ${post.dislikes.length - 1} others` : `${post.dislikes.length} dislike${post.dislikes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbDownAltOutlined fontSize="small" />&nbsp;{post.dislikes.length} {post.sdislikes.length === 1 ? 'Dislike' : 'Dislikes'}</>
            );
        }
        return <><ThumbDownAltOutlined fontSize="small" />&nbsp;Dislike</>;
    };

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase componenet="span" name="test" className={classes.cardAction} onClick={openPost} >
                <CardMedia className={classes.media} image={post.selectedFile || no_img} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {((user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && showEdit) && (
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={(e) =>{
                        e.stopPropagation();
                        setCurrentId(post._id);
                        }}>
                    <MoreHorizIcon fontSize="medium" />  
                    </Button>
                </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" componenet="p" gutterBottom>{
                    post.message.length < 70? post.message : post.message.substring(0,70) + ' ...' }
                    </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() =>{dispatch(likePost(post._id))}}>
                    <Likes />
                </Button> 
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size="small" color="primary" onClick={() =>{dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                )}
                <Button className={classes.test} size="small" color="primary" disabled={!user?.result} onClick={()=>{dispatch(dislikePost(post._id))}}>
                    <Dislikes />
                </Button>  
            </CardActions>
        </Card>
    );
}
 
export default Post;