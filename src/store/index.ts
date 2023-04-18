import instance from '@/axios-interceptor';
import axios from 'axios';
import { createStore } from 'vuex'
export default createStore({
  state: {
    loggedInUser: {},
  },

  mutations: {
    setLoggedInUser: function(state, user) {
      state.loggedInUser = user;
    },
  },
  actions: {
    fetchUser: async ({ commit, dispatch }, payload) => {   
      try {
        await instance.get(`auth/users/me/`).then(response => {
          if (response.status === 200) {
            commit("setLoggedInUser", response.data);
           
          }
        });
      } catch (e:any) {
        console.log(e.response);
      }
    }
  },
  getters: {
    loggedInUser: state => state.loggedInUser,
  },
  modules: {
  }
})
