import { useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {DeleteOutline} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import * as api from '../../api';
import './requestList.css';

const RequestList = () => {

    const columns = [
        {
            field: 'title',
            headerName: 'Post Title',
            width: 150,
        },
        {
            field: 'senderName',
            headerName: 'Sender Name',
            width: 200,
            renderCell: (cellValues) => {
                const dataRow = data.find(member => member._id === cellValues.row.id);
                return <Link to={`/profile/${dataRow.senderId}`}>{cellValues.row.senderName}</Link>;
              }
        },
        {
            field: 'accepted',
            headerName: 'Accepted',
            width: 150,
            renderCell: (cellValues) => {
                return cellValues.row.accepted? <span class="greenDot"></span> : <span class="redDot"></span>
            }
        },
        {
            field: 'rejected',
            headerName: 'Rejected',
            width: 150,
            renderCell: (cellValues) => {
                return cellValues.row.rejected? <span class="greenDot"></span> : <span class="redDot"></span>
            }
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 250,
        },
        {
            field: 'actionAccept',
            headerName: 'Accept',
            width: 120,
            renderCell: (params) =>{
                const disabled = params.row.accepted || params.row.rejected;
                return(
                    <button className="acceptButton"
                    disabled={disabled}
                    onClick={()=> handleAccept(params.row.id)}>
                    {params.row.accepted? "Accepted" : "Accept"}</button>
                )
            }
        },
        {
            field: 'actionReject',
            headerName: 'Reject',
            width: 120,
            renderCell: (params) =>{
                const disabled = params.row.accepted || params.row.rejected;
                return(
                    <button className="rejectButton"
                    disabled={disabled}
                    onClick={()=> handleReject(params.row.id)}>
                        {params.row.rejected? "Rejected" : "Reject"}</button>
                )
            }
        },
        {
            field: 'actionDelete',
            headerName: 'Delete',
            width: 120,
            renderCell: (params) =>{
                return(
                    <DeleteOutline className="deleteButton"
                    onClick={()=> handleDelete(params.row.id)} />
                )
            }
        },
      ];

    const user = JSON.parse(localStorage.getItem('profile'));
    const [data, setData] = useState([]);
    //const [, forceUpdate] = useReducer(x => x + 1, 0);

    //bolje da sam koristio find umjesto filter ali ne da mi se sad dirati
    const handleAccept = async (id) =>{
        const request = data.filter(member => member._id === id);
        const newRequest = {accepted: true, rejected:false,receiverId:request[0].senderId, senderId: request[0].receiverId, senderName: user.result.name,
        title: request[0].title, date: request[0].date};
        try{
            await api.createRequest(newRequest);
            await api.updateRequest(id, {...request[0], accepted:true});
            setData(data.map(member => member._id !== id? member : {...member, accepted:true}));
        }catch(error){
            console.log(error);
        }
      }

      const handleReject = async (id) =>{
        const request = data.filter(member => member._id === id);
        const newRequest = {accepted: false, rejected:true,receiverId:request[0].senderId, senderId: request[0].receiverId, senderName: user.result.name,
        title: request[0].title, date: request[0].date};
        try{
            await api.createRequest(newRequest);
            await api.updateRequest(id, {...request[0], rejected:true});
            setData(data.map(member => member._id !== id? member : {...member, rejected:true}));
        }catch(error){
            console.log(error);
        }
    }

      const handleDelete = async (id) =>{
        try{
            await api.deleteRequest(id);
            window.location.reload(false);
        }catch(error){
            console.log(error);
        }
      }

    useEffect(()=>{
        const getRequests = async () =>{
            try{
                const res = await api.getRequests(user.result._id);
                setData(res.data);
            }catch(error){
                console.log(error);
            }
        };
        getRequests();
        //iz nekog razloga nece da prikaze podatke u tabeli iako su pristigli,
        //zoom na stranici ili promjena window size ucita podatke opet iz nekog razloga
        //ne radi na mozila firefox(vise kao mozila shitfox he he)
        //na mozili ponekad radi
        {document.body.style.zoom = "90%"}
    }, []);

    return (
        <div style={{ height: 750, width: '100%' }}>
            <DataGrid
            rows={data.map( item => ({id: item._id, title: item.title, senderName: item.senderName, 
            accepted: item.accepted, rejected: item.rejected, date: item.date}))}
            columns={columns}
            pageSize={10}
            rowsPerPage={10}
            disableSelectionOnClick
            />
    </div>
    );
}
 
export default RequestList;