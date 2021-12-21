import Axios from 'axios';
import HomePayload from './HomePayload';
import ErrorDetailPayload from "@/service/ErrorDetailPayload";
import ScenarioDetailPayload from "@/service/ScenarioDetailPayload";

/*
This comment is intended for those who desire to replicate Error Book
---------------------------------------------------------------------
Change the elastic url below.
 */
const ELASTIC_URL = "http://159.223.37.9:9200";

export default {

    getCollab() {
        return Axios.get("https://20dcc463-3192-4a87-a9cd-58937b474e15.mock.pstmn.io/collab");
    },

    getTopTenError() {
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorPayload());
    },

    getTopTenErrorWithEnv() {
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorWithEnvPayload());
    },

    getTopTenErrorWithSquadId() {
        console.log("INI PAYLOADNYA");
        console.log(HomePayload.topTenErrorWithSquadIdPayload());
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorWithSquadIdPayload());
    },

    getTopTenErrorWithEnvAndSquadId() {
        return Axios.post(ELASTIC_URL + "/error_summary_index/_search", HomePayload.topTenErrorWithEnvAndSquadIdPayload());
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