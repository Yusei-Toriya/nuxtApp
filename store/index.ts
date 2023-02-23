import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  message: "",
  isSuccess: false,
  isShow: false,
};
const mutations = {
  setMessage(state: { message: String }, message: String) {
    state.message = message;
  },
  setIsSuccess(state: { isSuccess: any }, isSuccess: any) {
    state.isSuccess = isSuccess;
  },
  setIsShow(state: { isShow: any }, isShow: any) {
    state.isShow = isShow;
  },
  clearMessage(state: { message: string }) {
    state.message = "";
  },
};
const actions = {
  setMessage(commit: any, message: String) {
    commit("setMessage", message);
  },
  setIsShow(commit: any, isShow: any) {
    commit("setIsShow", isShow);
  },
  setIsSuccess(commit: any, isSuccess: any) {
    commit("setIsSuccess", isSuccess);
  },
};
export default {
  state,
  mutations,
  actions,
};
