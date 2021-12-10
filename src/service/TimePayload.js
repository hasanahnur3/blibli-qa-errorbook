import store from '../store';
export default {
    yesterday(){
        return {
            "time": {
                "gte": "now-1d",
                "lte": "now"
            }
        }
    },
    lastWeek(){
        return {
            "time": {
                "gte": "now-7d",
                "lte": "now"
            }
        }
    },
    lastMonth(){
        return {
            "time": {
                "gte": "now-30d",
                "lte": "now"
            }
        }
    },
    getTimePayload(){
        if(store.state.time == 0){
            return this.yesterday();
        }else if(store.state.time  == 1){
            return this.lastWeek();
        }else if(store.state.time  == 2){
            return this.lastMonth();
        }
    }
}