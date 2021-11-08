import Vue from 'vue'
import Vuex from 'vuex'
import ElasticService from "@/service/service.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    env: "ALL",
    squadId: 0,
    renderCounter: 0,
    listTopTenError: Array,
    collab: Array,
    selectedCollab: null,
    time:2,
  },
  mutations: {
    changeEnv(state, newEnv) {
      state.env = newEnv;
      // this.commit("changeListTopTenError");
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
      // this.commit("changeListTopTenError");
      state.renderCounter++;
    },
    // changeListTopTenError(state) {
    //   if (state.env == "ALL" && state.squadId == 0) {
    //     console.log("changeListTopTenError 1");
    //     ElasticService.getTopTenError().then((response) => {
    //       state.listTopTenError = response.data.aggregations.by_errorType.buckets;
    //       console.log(state.listTopTenError);
    //     });
    //   } else if (state.env != "ALL" && state.squadId == 0) {
    //     console.log("changeListTopTenError 2");
    //     ElasticService.getTopTenErrorWithEnv(state.env).then((response) => {
    //       state.listTopTenError = response.data.aggregations.by_errorType.buckets;
    //       console.log(state.listTopTenError);
    //     });
    //   } else if (state.env == "ALL" && state.squadId != 0) {
    //     console.log("changeListTopTenError 3");
    //     ElasticService.getTopTenErrorWithSquadId(state.squadId).then((response) => {
    //       state.listTopTenError = response.data.aggregations.by_errorType.buckets;
    //       console.log(state.listTopTenError);
    //     });
    //   } else if (state.env != "ALL" && state.squadId != 0) {
    //     console.log("changeListTopTenError 4");
    //     ElasticService.getTopTenErrorWithEnvAndSquadId(state.env, state.squadId).then((response) => {
    //       state.listTopTenError = response.data.aggregations.by_errorType.buckets;
    //       console.log(state.listTopTenError);
    //     });
    //   }
    // },
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
    }
  },
  actions: {},
  modules: {}
})