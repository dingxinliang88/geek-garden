import http from "@/utils/request";
import { getToken, removeToken, setToken } from "@/utils/token";
import { createSlice } from "@reduxjs/toolkit";
const useStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setUserToken(state, action) {
      state.token = action.payload;
      setToken(state.token);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

const { setUserToken, setUserInfo, clearUserInfo } = useStore.actions;
const doLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post("/authorizations", loginForm);
    dispatch(setUserToken(res.data.token));
  };
};
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await http.get("/user/profile");
    dispatch(setUserInfo(res.data));
  };
};
const doUserLogout = () => {
  return (dispatch) => {
    dispatch(clearUserInfo());
  };
};
export { doLogin, fetchUserInfo, doUserLogout };

const userReducer = useStore.reducer;
export default userReducer;
