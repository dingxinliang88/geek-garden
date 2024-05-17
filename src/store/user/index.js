import http from "@/utils/request";
import { getToken, setToken } from "@/utils/token";
import { createSlice } from "@reduxjs/toolkit";
const useStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
  },
  reducers: {
    setUserInfo(state, action) {
      state.token = action.payload;
      setToken(state.token);
    },
  },
});

const { setUserInfo } = useStore.actions;
const doLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post("/authorizations", loginForm);
    dispatch(setUserInfo(res.data.token));
  };
};
export { doLogin };

const userReducer = useStore.reducer;
export default userReducer;
