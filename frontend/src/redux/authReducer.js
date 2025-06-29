import {createSlice} from "@reduxjs/toolkit"


const authSlice = createSlice({
    name:'auth',
    initialState:{
        isAuthenticated: false,
        user:null
    },
    reducers:{
       
        setAuth:(state,action)=>{
            state.isAuthenticated = true,
            state.user = action.payload

        },

        clearAuth:(state)=>{
          state.isAuthenticated = false,
          state.user = null

        }

    }

});


export  const {setAuth,clearAuth}  =   authSlice.actions;



export default authSlice;