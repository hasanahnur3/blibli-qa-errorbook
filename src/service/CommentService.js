import Axios from "axios";

const ELASTIC_URL = "http://159.223.37.9:9200/error_comment_index";

export default {

    getListComment(errorType){
        let temp = {
            "size":100,
            "query": {
                "match": {
                    "errorType.keyword": errorType
                }
            },
            "sort" : [
                {"createdDate.keyword": {"order" : "asc"}}
            ]
        }
        return Axios.post(ELASTIC_URL + "/_search", temp);
    },

    createComment(errorType, username, comment){
        let temp = {
            errorType: errorType ,
            createdDate: (new Date()).toISOString(),
            username: username,
            comment: comment,
        }
        console.log(temp);
        return Axios.post(ELASTIC_URL + "/_doc", temp);
    },

    updateComment(id, comment){
        let temp = {
            "doc": {
                "comment": comment,
                "updatedDate": (new Date()).toISOString()
            }
        }

        return Axios.post(ELASTIC_URL + "/_update/" + id, temp);
    },

    deleteComment(id){
        return Axios.delete(ELASTIC_URL + "/_doc/" + id);
    }
}