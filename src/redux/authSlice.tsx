import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface AuthState {
   isAuthenticated: boolean;
   isRegistered: boolean
}

const initialState: AuthState = {
   isAuthenticated: false,
   isRegistered: false
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setAuthenticated: (state, action: PayloadAction<boolean>) => {
         state.isAuthenticated = action.payload
      },
      setRegistered: (state, action: PayloadAction<boolean>) => {
         state.isRegistered = action.payload
      }

   }
})

export const {setAuthenticated, setRegistered} = authSlice.actions

export default authSlice.reducer