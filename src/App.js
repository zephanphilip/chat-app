import { useState,useRef } from 'react';
import './App.css';
import Auth  from "./components/Auth";
import Chats  from "./components/Chats";
import Cookies from "universal-cookie";
import {signOut} from "firebase/auth";
import {auth} from "./firebase-config";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import MeetingRoomSharpIcon from '@mui/icons-material/MeetingRoomSharp';


const cookies = new Cookies();


function App() {
  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"));
  const [room,setRoom]=useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () =>{
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  if (!isAuth) {
  return (
    <div className='app1' >
      <Auth setIsAuth={setIsAuth}/>
    </div>
  );
}
  return( <>
  {room ? (
  <Chats room={room}/> 
  ):( 
  <div className='app'>
    
    <div className='roomname'>
    <Button className='sb' variant="contained" size="small"   color="warning" onClick={signUserOut} startIcon={<MeetingRoomSharpIcon/>}>Exit</Button>
    <TextField 
    className='tf'
  label="Enter room name"
  id="outlined-basic" variant="outlined" 
  color="warning"
  focused
  inputRef={roomInputRef}
  InputProps={{
    style: { color: 'white' },  // Set the text color to white
  }}
  />
     <Button variant="contained" size="small"   color="warning" onClick={()=> 
      {console.log("button clicked");
      setRoom(roomInputRef.current.value);
      console.log("Room value set:", roomInputRef.current.value);  
    }} 
      endIcon={<SendIcon  />}>
      ENTER</Button>
    </div>
    
   
    </div>
    )}
    </>
    );
}
export default App;
