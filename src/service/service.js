import Axios from 'axios';
import HomePayload from './HomePayload';

// const INDEX_NAME = "/scenario_error_test";

const ELASTIC_URL = "http://172.18.69.96:9200";

export default {

    getTopTenError() {
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenErrorPayload());
    },

    getTopTenErrorWithEnv(env) {
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenErrorWithEnvPayload(env));
    },

    getTopTenErrorWithSquadId(squadId) {
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenErrorWithSquadIdPayload(squadId));
    },

    getTopTenErrorWithEnvAndSquadId(env, squadId) {
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenErrorWithEnvAndSquadIdPayload(env, squadId));
    },

    getCollab() {
        return Axios.get("https://83fdf133-c3f4-4de6-9169-0e9040ed4cb7.mock.pstmn.io/collab");
    },

    getTopTenErrorSearch(searchTerm){
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenErrorSearchPayload(searchTerm));
    },

    getTopTenErrorSearchWithEnv(searchTerm, env){
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenErrorSearchWithEnvPayload(searchTerm, env));
    },

    getTopTenErrorSearchWithSquadId(searchTerm, squadId){
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenErrorSearchWithSquadIdPayload(searchTerm, squadId));
    },

    getTopTenErrorSearchWithEnvAndSquadId(searchTerm, env, squadId){
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenErrorSearchWithEnvAndSquadIdPayload(searchTerm, env, squadId));
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getTopTenScenarioNoEnv(squadId){
        console.log("debug scenario: " + squadId);
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenScenarioNoEnv(squadId));
    },

    getTopTenScenarioSearchNoEnv(squadId, searchTerm){
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenScenarioSearchNoEnv(squadId, searchTerm));
    },

    getTopTenScenarioWithEnv(squadId, env){
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenScenarioWithEnv(squadId, env));
    },

    getTopTenScenarioSearchWithEnv(squadId, searchTerm, env){
        return Axios.post(ELASTIC_URL + "/scenario_error_test/_search", HomePayload.topTenScenarioSearchWithEv(squadId, searchTerm, env));
    }
}