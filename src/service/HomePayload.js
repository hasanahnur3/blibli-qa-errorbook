import TimePayload from "@/service/TimePayload";

export default {
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

    topTenErrorWithEnvPayload(env) {
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "env.keyword": env
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

    topTenErrorWithSquadIdPayload(squadId) {
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadID": squadId
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

    topTenErrorWithEnvAndSquadIdPayload(env, squadId) {
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [{
                            "match": {
                                "env.keyword": env
                            }
                        },
                        {
                            "match": {
                                "squadID": squadId
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

    topTenErrorSearchWithEnvPayload(searchTerm, env) {
        var search = "*" + searchTerm + "*";
        console.log(search);
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "env.keyword": env
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

    topTenErrorSearchWithSquadIdPayload(searchTerm, squadId){
        var search = "*" + searchTerm + "*";
        console.log(search);
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadID": squadId
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

    topTenErrorSearchWithEnvAndSquadIdPayload(searchTerm, env, squadId){
        var search = "*" + searchTerm + "*";
        console.log(search);
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadID": squadId
                            }
                        },
                        {
                            "match": {
                                "env.keyword": env
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    topTenScenarioNoEnv(squadId){
        return{
            "size" : 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadID": squadId
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
                    }
                }
            }
        }
    },

    topTenScenarioSearchNoEnv(squadId, searchTerm){
        var search = "*" + searchTerm + "*";
        console.log(search);
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadID": squadId
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
                    }
                }
            }
        }
    },

    topTenScenarioWithEnv(squadId, env){
        return{
            "size" : 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadID": squadId
                            }
                        },
                        {
                            "match": {
                                "env.keyword": env
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
                    }
                }
            }
        }
    },

    topTenScenarioSearchWithEv(squadId, searchTerm, env){
        var search = "*" + searchTerm + "*";
        console.log(search);
        return {
            "size": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "squadID": squadId
                            }
                        },
                        {
                            "match": {
                                "env.keyword": env
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
                    }
                }
            }
        }
    }
}