import Axios from 'axios';
import HomePayload from './HomePayload';
import ErrorDetailPayload from "@/service/ErrorDetailPayload";
import ScenarioDetailPayload from "@/service/ScenarioDetailPayload";

// const INDEX_NAME = "/error_summary_index";

// const ELASTIC_URL = "http://159.223.37.9:9200";

const ELASTIC_URL = "api";

export default {

    getTopTenError() {
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorPayload());
    },

    getTopTenErrorWithEnv() {
        return Axios.post("/"+ ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorWithEnvPayload());
    },

    getTopTenErrorWithSquadId() {
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorWithSquadIdPayload());
    },

    getTopTenErrorWithEnvAndSquadId() {
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorWithEnvAndSquadIdPayload());
    },

    getCollab() {
        return Axios.get("https://a515e70a-5b79-41da-bc13-ce2b4724d594.mock.pstmn.io/collab");
    },

    getTopTenErrorSearch(searchTerm){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorSearchPayload(searchTerm));
    },

    getTopTenErrorSearchWithEnv(searchTerm){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorSearchWithEnvPayload(searchTerm));
    },

    getTopTenErrorSearchWithSquadId(searchTerm){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorSearchWithSquadIdPayload(searchTerm));
    },

    getTopTenErrorSearchWithEnvAndSquadId(searchTerm){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorSearchWithEnvAndSquadIdPayload(searchTerm));
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getTopTenScenarioNoEnv(){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenScenarioNoEnv());
    },

    getTopTenScenarioSearchNoEnv(searchTerm){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenScenarioSearchNoEnv(searchTerm));
    },

    getTopTenScenarioWithEnv(){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenScenarioWithEnv());
    },

    getTopTenScenarioSearchWithEnv(searchTerm){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenScenarioSearchWithEv(searchTerm));
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getListScenarioFromErrorTypeNoEnv(errorType){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", ErrorDetailPayload.listScenarioFromErrorTypeNoEnvPayload(errorType));
    },

    getListScenarioFromErrorTypeWithEnv(errorType){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", ErrorDetailPayload.listScenarioFromErrorTypeWithEnvPayload(errorType));
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getListErrorFromScenarioNoEnv(){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", ScenarioDetailPayload.listErrorFromScenarioNoEnvPayload());
    },

    getListErrorFromScenarioWithEnv(){
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", ScenarioDetailPayload.listErrorFromScenarioWithEnvPayload());
    }
}