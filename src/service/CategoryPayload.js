export default {

    getCategoryPayload(category){
        return {
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
    }
}