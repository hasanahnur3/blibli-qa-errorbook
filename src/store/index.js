import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'vue-cookies'

import ElasticService from "@/service/service.js";

Vue.use(Vuex)

const getIsLoggedIn = () => {
  try{
    return cookie.get("badak-username") !== null;
  }catch (err){
    return false;
  }
}

const provideCookies = () => {
  cookie.set("badak-username", "anonymous user");
}

const deleteCookies = () => {
  cookie.remove("badak-username");
}

export default new Vuex.Store({
  state: {
    env: "ALL",
    squadId: 0,
    time:2,
    isLoggedIn: getIsLoggedIn(),
    collab: Array,
    renderCounter: 0,
    selectedCollab: null,
    scenarioName: null,
    scenarioProject: null,
  },
  mutations: {
    changeEnv(state, newEnv) {
      state.env = newEnv;
      state.renderCounter++;
    },
    changeTime(state, time){
      state.time = time;
      state.renderCounter++;
    },
    changeSquadId(state, n) {
      state.squadId = n;
      for (let i = 0; i < state.collab.length; i++) {
        if(state.collab[i].id == state.squadId){
          state.selectedCollab = state.collab[i];
          break;
        }
      }
      state.renderCounter++;
    },
    changeScenario(state, {scenarioName, scenarioProject}){
      state.scenarioName = scenarioName;
      state.scenarioProject = scenarioProject;
      state.renderCounter++;
    },
    changeRenderCounter(state){
      state.renderCounter++;
    },
    changeIsLoggedIn(state, loggedIn){
      state.isLoggedIn = loggedIn;
    },
    updateCollab(state) {
      ElasticService.getCollab().then((response) => {
        const all = {
          "id": 0,
          "collabName" : "ALL"
        };
        state.selectedCollab = all;
        state.collab = [all].concat(response.data.data);
        console.log(state.collab);
      });
    },
    insertCookies(state){
      provideCookies()
      state.isLoggedIn = true;
    },
    removeCookies(state){
      deleteCookies()
      state.isLoggedIn = false;
    }
  },
  actions: {},
  modules: {}
})