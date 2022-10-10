import { combineReducers } from "redux";
import auth from "./auth.reducers";
// const songsReducer= ()=>{
//     return [
//         {
//             title:'Humm of Weekend',
//             duration :'4:05'
//         },
//         {
//             title:'all Star',
//             duration :'6:34'
//         },
//         {
//             title:'New Home',
//             duration :'7:09'
//         },
//         {
//             title:'Humm of Sky',
//             duration :'2:05'
//         },
//     ]
// }
// const selectedSongReducer= (selectedSong= null,action)=>{
//     if(action.type==='SONG_SELECTED'){
//         return action.payload;
//     }
//     return selectedSong;
// }
export default combineReducers({
   auth:auth
})