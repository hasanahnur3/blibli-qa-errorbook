import Axios from "axios";

/*
This comment is intended for those who desire to replicate Error Book
---------------------------------------------------------------------
Change the elastic url below.
 */
const ELASTIC_URL = "http://159.223.37.9:9200/";

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
        return Axios.post(ELASTIC_URL + "error_comment_index/_search", temp);
    },

    createComment(errorType, username, comment){
        let temp = {
            errorType: errorType ,
            createdDate: (new Date()).toISOString(),
            username: username,
            comment: comment,
        }
        console.log(temp);
        return Axios.post(ELASTIC_URL + "error_comment_index/_doc", temp);
    },

    updateComment(id, comment){
        let temp = {
            "doc": {
                "comment": comment,
                "updatedDate": (new Date()).toISOString()
            }
        }

        return Axios.post(ELASTIC_URL + "error_comment_index/_update/" + id, temp);
    },

    deleteComment(id){
        return Axios.delete(ELASTIC_URL + "error_comment_index/_doc/" + id);
    }
}