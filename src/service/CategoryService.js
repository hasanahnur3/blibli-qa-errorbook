import Axios from "axios";

/*
This comment is intended for those who desire to replicate Error Book
---------------------------------------------------------------------
Change the elastic url below.
 */
const ELASTIC_URL = "http://159.223.37.9:9200";

export default {
    getErrorFromCategory(category){
        let request = {
            "size": 1000,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "categories": category
                            }
                        }
                    ]
                }
            }
        }
        return Axios.post(ELASTIC_URL + "/error_category_index/_search", request);
    },

    getCategory(errorType){
        let request =  {
            "size":1000,
            "query": {
                "match": {
                    "errorType.keyword": errorType
                }
            }
        };
        return Axios.post(ELASTIC_URL + "/error_category_index/_search", request);
    },

    updateCategory(id, listCategories){
        let request = {
            "doc": {
                "categories": listCategories
            }
        };
        return Axios.post(ELASTIC_URL + "/error_category_index/_update/" + id, request);
    },

    createInitialCategory(errorType, listCategories){
        let request = {
            "errorType" : errorType,
            "categories": listCategories
        };
        return Axios.post(ELASTIC_URL + "/error_category_index/_doc", request);
    }
}