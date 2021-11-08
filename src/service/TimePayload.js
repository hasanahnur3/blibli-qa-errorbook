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
                "gte": "now-2M",
                "lte": "now"
            }
        }
    },
    getTimePayload(){
        if(store.state.time == 0){
            console.log("timepayload 0");
            return this.yesterday();
        }else if(store.state.time  == 1){
            console.log("timepayload 1");
            return this.lastWeek();
        }else if(store.state.time  == 2){
            console.log("timepayload 2");
            return this.lastMonth();
        }
    }
}