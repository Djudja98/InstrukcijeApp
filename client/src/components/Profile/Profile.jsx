import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Grid, Divider, Paper, Button} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import * as api from '../../api';

import Post from '../Posts/Post/Post';
import PopupEdit from './PopupEdit';
import UpdateProfileForm from "../UpdatePorfileForm/UpdateProfileForm";
import { getPostsByCreator } from "../../actions/posts";
import useStyles from './styles';
import no_img from '../../images/noimg.png';

const initialValues = {
  name: '',
  age: 0,
  phone : '',
  email: '',
  aboutMe: '',
}

const Profile = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [userInfoEdit, setUserInfoEdit] = useState(initialValues);
    const [userPicture, setUserPicture] = useState("");
    const { id } = useParams();
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() =>{
        //postovi od datog usera
        dispatch(getPostsByCreator(id));
        //informacije o datom useru
        const getUser = async (Id)=>{
          try{
            const {data} = await api.getUserById(Id);
            const temp = {name: data.name,age:data.age, phone:data.phone, email:data.email, aboutMe: data.aboutMe};
            setUserInfoEdit(temp);
          }catch(error){
            console.log(error);
          }
        }
        getUser(id);       
    }, [id]);

    useEffect(()=>{
      const getUserPic = async(Id)=>{
        try{
            const {data} = await api.getUserPictureById(Id);
            setUserPicture(data);
        }catch(error){
          console.log(error);
        }
      }
      getUserPic(id);
    },[id,userPicture]);

    const editAboutMe = async (values) =>{
      try{
        const res = api.updateUser(user?.result?._id, values);
      }catch(error){
        console.log(error);
      }
      setOpenPopup(false);
    }

    const addUser = () =>{
      try{
        const conversation = {
          senderId:user?.result?._id,
          receiverId: id,
        }
        const res = api.createConversation(conversation);
      }catch(error){
        console.log(error);
      }
    };

    return (
        <div>
          <Grid container direction={'row'} justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
            <Paper className={classes.paper}>
                    <div style={{display: 'flex'}}>                   
                      <Typography variant="h4" className={classes.text} gutterBottom style={{flexGrow:1}}>Profile :{userInfoEdit.name}</Typography> 
                      {id === user?.result?._id && <Button variant="outlined" startIcon={<EditIcon/>} className={classes.editButton} onClick={() => setOpenPopup(true)}>
                        Edit
                      </Button>}
                    </div> 
                    <Typography variant="h5" className={classes.text} gutterBottom>Age : {userInfoEdit.age}</Typography> 
                    <Typography variant="h5" className={classes.text} gutterBottom>Phone : {userInfoEdit.phone}</Typography>
                    <Typography variant="h5" className={classes.text} gutterBottom>Contact Email : {userInfoEdit.email} </Typography>
                    <h3>About me: {userInfoEdit.aboutMe}</h3>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                  <img
                    src={userPicture || no_img} 
                    alt="test"
                    className={classes.media} />
            </Grid>
          </Grid>
          { id !== user?.result?._id && <Button
          variant = "contained"
          className={classes.addUserButton}
          color="primary"
          onClick={addUser}
          >Add User</Button>}
      <Divider style={{ margin: '20px 0 20px 0' }} />
      <Typography variant="h5" className={classes.text} gutterBottom>My Instruction Posts:</Typography>
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={2}>
              <Post post={post} showEdit={false}/>
            </Grid>
          ))}
        </Grid>
      )}
      <PopupEdit openPopup={openPopup} setOpenPopup={setOpenPopup} title="Edit Profile">
        <UpdateProfileForm
        editAboutMe={editAboutMe}
        userInfoEdit={userInfoEdit}
        setUserInfoEdit={setUserInfoEdit} />
      </PopupEdit>
    </div>
    );
}
 
export default Profile;