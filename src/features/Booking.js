import { createSlice } from "@reduxjs/toolkit";

const bookingSlice=createSlice({
    name:"booking",
    initialState:{
        rooms : [],
        selectedRoomNumber:-1
    },
    reducers:{
        selectRoom:(state,action)=>{ 
if(state.rooms[action.payload].selected){
    state.selectedRoomNumber=-1;
    state.rooms[action.payload].selected=false;
    state.rooms[action.payload].color="transparent"
    return
}

            for(let i=0;i<state.rooms.length;i++){
                state.rooms[i].selected=false;
            }
            state.rooms[action.payload].selected=true;
            state.selectedRoomNumber=state.rooms[action.payload].roomNumber;

            for(let i=0;i<state.rooms.length;i++){
                if(state.rooms[i].roomStatus==="Occupied"){
                    state.rooms[i].color="#ebbb33"
                }else if(state.rooms[i].roomStatus==="Booked"){
                    state.rooms[i].color="#cb2642"
                }else if (state.rooms[i].roomStatus==="Available"){
                    if(state.rooms[i].selected===true){
                        state.rooms[i].color="var(--hover-color)"

                    }else{
                        state.rooms[i].color="transparent"
                    }
                    
                }
            }

        },
        initRoom:(state,action)=>{
            state.rooms=action.payload;
            for(let i=0;i<action.payload.length;i++){
                console.log(state.rooms[i].roomNumber);
                if(state.rooms[i].roomStatus==="Occupied"){
                    state.rooms[i].color="#ebbb33"
                    state.rooms[i].selected=false;
                }else if(state.rooms[i].roomStatus==="Booked"){
                    state.rooms[i].color="#cb2642"
                    state.rooms[i].selected=false;
                }else if (state.rooms[i].roomStatus==="Available"){
                    state.rooms[i].color="transparent"
                    state.rooms[i].selected=false;
                }
            }
        }
    }
})

export const {selectRoom,initRoom}=bookingSlice.actions;
export default bookingSlice.reducer