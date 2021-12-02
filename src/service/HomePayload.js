import TimePayload from "@/service/TimePayload";
import store from '../store';

export default {

    ///////// TOP TEN ERROR
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    topTenErrorPayload() {
        console.log("masuk target");
        console.log(TimePayload.getTimePayload());
        return {
            "size": 0,
            "query" : {
                "range" : TimePayload.getTimePayload()
            },
            "aggregations": {
                "by_errorType": {
                    "terms": {
                        "field": "errorType.keyword"
                    }
                }
            }
        }
    },

    topTenErrorWithEnvPayload() {
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "env.keyword": store.state.env
                            },
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        }
                    ]
                }
            },
            "aggregations": {
                "by_errorType": {
                    "terms": {
                        "field": "errorType.keyword"
                    }
                }
            }
        }
    },

    topTenErrorWithSquadIdPayload() {
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
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
                "by_errorType": {
                    "terms": {
                        "field": "errorType.keyword"
                    }
                }
            }
        }
    },

    topTenErrorWithEnvAndSquadIdPayload() {
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [{
                            "match": {
                                "env.keyword": store.state.env
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
                "by_errorType": {
                    "terms": {
                        "field": "errorType.keyword"
                    }
                }
            }
        }
    },

    topTenErrorSearchPayload(searchTerm) {
        var search = "*" + searchTerm + "*";
        console.log(search);
        return {
            "query": {
                "bool": {
                    "must": [
                        {
                            "range": TimePayload.getTimePayload()
                        },
                        {
                            "wildcard": {
                                "errorType.keyword": {
                                    "value": search,
                                    "case_insensitive": true
                                }
                            }
                        }
                    ]
                }
            },
            "aggregations": {
                "by_errorType": {
                    "terms": {
                        "field": "errorType.keyword"
                    }
                }
            }
        }
    },

    topTenErrorSearchWithEnvPayload(searchTerm) {
        var search = "*" + searchTerm + "*";
        console.log(search);
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
                            "wildcard": {
                                "errorType.keyword": {
                                    "value": search,
                                    "case_insensitive": true
                                }
                            }
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        }
                    ]
                }
            },
            "aggregations": {
                "by_errorType": {
                    "terms": {
                        "field": "errorType.keyword"
                    }
                }
            }
        }
    },

    topTenErrorSearchWithSquadIdPayload(searchTerm){
        var search = "*" + searchTerm + "*";
        console.log(search);
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadId": store.state.squadId
                            }
                        },
                        {
                            "wildcard": {
                                "errorType.keyword": {
                                    "value": search,
                                    "case_insensitive": true
                                }
                            }
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        }
                    ]
                }
            },
            "aggregations": {
                "by_errorType": {
                    "terms": {
                        "field": "errorType.keyword"
                    }
                }
            }
        }
    },

    topTenErrorSearchWithEnvAndSquadIdPayload(searchTerm){
        var search = "*" + searchTerm + "*";
        console.log(search);
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadId": store.state.squadId
                            }
                        },
                        {
                            "match": {
                                "env.keyword": store.state.env
                            }
                        },
                        {
                            "wildcard": {
                                "errorType.keyword": {
                                    "value": search,
                                    "case_insensitive": true
                                }
                            }
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        }
                    ]
                }
            },
            "aggregations": {
                "by_errorType": {
                    "terms": {
                        "field": "errorType.keyword"
                    }
                }
            }
        }
    },
    ///////// TOP TEN SCENARIO
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    topTenScenarioNoEnv(){
        return{
            "size" : 0,
            "query": {
                "bool": {
                    "must": [
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
                "by_scenario": {
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

    topTenScenarioSearchNoEnv(searchTerm){
        var search = "*" + searchTerm + "*";
        console.log(search);
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadId": store.state.squadId
                            }
                        },
                        {
                            "wildcard": {
                                "scenarioName.keyword": {
                                    "value": search,
                                    "case_insensitive": true
                                }
                            }
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        }
                    ]
                }
            },
            "aggregations": {
                "by_scenario": {
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

    topTenScenarioWithEnv(){
        return{
            "size" : 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadId": store.state.squadId
                            }
                        },
                        {
                            "match": {
                                "env.keyword": store.state.env
                            }
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        }
                    ]
                }
            },
            "aggregations": {
                "by_scenario": {
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

    topTenScenarioSearchWithEv(searchTerm){
        var search = "*" + searchTerm + "*";
        console.log(search);
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadId": store.state.squadId
                            }
                        },
                        {
                            "match": {
                                "env.keyword": store.state.env
                            }
                        },
                        {
                            "wildcard": {
                                "scenarioName.keyword": {
                                    "value": search,
                                    "case_insensitive": true
                                }
                            }
                        },
                        {
                            "range": TimePayload.getTimePayload()
                        }
                    ]
                }
            },
            "aggregations": {
                "by_scenario": {
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
}