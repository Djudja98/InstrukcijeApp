import "./message.css";
import moment from "moment";

const Message = ({message,ownMessages, picture}) => {
    return (
        <div className={ownMessages ? "message own" : "message"}>
            <div className="messageTop">
                {ownMessages && <img 
                 className="messageImg"
                 src = {(ownMessages && picture) || null/*"https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"*/}
                 alt=""/>}
                 <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBotttom">
                {moment(message.createdAt).fromNow()}
            </div>
        </div>
    );
}
 
export default Message;