import TimePayload from "@/service/TimePayload";
import store from '../store';

export default{

    listScenarioFromErrorTypeNoEnvPayload(errorType){
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "errorType.keyword": errorType
                            }
                        },
                        {
                            "match": {
                                "squadId": store.state.squadId
                            }
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        }
                    ]
                }
            },
            "aggregations": {
                "by_scenarioName": {
                    "terms": {
                        "field": "scenarioName.keyword"
                    },
                    "aggregations": {
                        "by_projectName": {
                            "terms": {
                                "field": "projectName.keyword"
                            }
                        }
                    }
                }
            }
        }
    },

    listScenarioFromErrorTypeWithEnvPayload(errorType){
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "env.keyword": store.state.env
                            }
                        },
                        {
                            "match": {
                                "errorType.keyword": errorType
                            }
                        },
                        {
                            "match": {
                                "squadId": store.state.squadId
                            }
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        }
                    ]
                }
            },
            "aggregations": {
                "by_scenarioName": {
                    "terms": {
                        "field": "scenarioName.keyword"
                    },
                    "aggregations": {
                        "by_projectName": {
                            "terms": {
                                "field": "projectName.keyword"
                            }
                        }
                    }
                }
            }
        }
    }

}