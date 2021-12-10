import TimePayload from "@/service/TimePayload";
import store from '../store';

export default{

    listErrorFromScenarioNoEnvPayload(){
        return {
            "size":1000,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "scenarioName.keyword": store.state.scenarioName
                            }
                        },
                        {
                            "match": {
                                "squadId": store.state.squadId
                            }
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        },
                    ]
                }
            }
        }
    },

    listErrorFromScenarioWithEnvPayload(){
        return {
            "size":1000,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "scenarioName.keyword": store.state.scenarioName
                            }
                        },
                        {
                            "match": {
                                "squadId": store.state.squadId
                            }
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        },
                        {
                            "match": {
                                "env.keyword": store.state.env
                            }
                        },
                    ]
                }
            }
        }
    }
}