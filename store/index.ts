import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  message: "",
  isSuccess: false,
  isShow: false,
};
const mutations = {
  setMessage(state, message) {
    state.message = message
  },
  setIsSuccess(state, isSuccess) {
    state.isSuccess = isSuccess
  },
  setIsShow(state, isShow) {
    state.isShow = isShow
  },
  // setMessage(state, message) {
  //   state.message = message;
  // },
  clearMessage(state){
    state.message = "";
  },
  // setIsShow(state, isShow) {
  //   state.isShow = isShow;
  // },
  // clearIsShow(state){
  //   state.isShow = false;
  // },
  // setIsSuccess(state, isSuccess){
  //   state.isSuccess = isSuccess;
  // },
};
const actions = {
  setMessage({commit}, message) {
    commit('setMessage', message);
  },
  setIsShow({commit}, isShow) {
    commit('setIsShow', isShow);
  },
  setIsSuccess({commit}, isSuccess){
    commit('setIsSuccess', isSuccess);
  },
};
export default {
  state,
  mutations,
  actions
};