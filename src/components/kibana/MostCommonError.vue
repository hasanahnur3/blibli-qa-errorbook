<template>
<div class="row">
  <div class="col-2">

  </div>
  <div class="col-8">
    <iframe :src="this.iFrameUrl" height="600" width="100%" ></iframe>
  </div>
  <div class="col-2">

  </div>
</div>
</template>

<script>
export default {
    name: "MostCommonError",
    computed:{
        getEnvState(){
            return this.$store.state.env
        },
        getSquadIdState(){
            return this.$store.state.squadId
        }
    },
    data(){
        return{
            iFrameUrl: "https://61a91229e582e60008f7e44a--pedantic-beaver-c52a4c.netlify.app/app/dashboards#/view/8ce2d190-5202-11ec-b5e3-33bcb8e6aefd?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:[time],to:now))&_a=(description:'',expandedPanelId:'85143acc-ed96-46e5-8d5c-537229220a7a',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:'[query]'),timeRestore:!f,title:'Most%20Common%20Error',viewMode:view)&hide-filter-bar=true"
            // iFrameUrl: "http://159.223.37.9:5601/app/dashboards#/view/8ce2d190-5202-11ec-b5e3-33bcb8e6aefd?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:[time],to:now))&_a=(description:'',expandedPanelId:'85143acc-ed96-46e5-8d5c-537229220a7a',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:'[query]'),timeRestore:!f,title:'Most%20Common%20Error',viewMode:view)&hide-filter-bar=true"
        }
    },
    mounted(){
        this.refreshQuery();
        console.log(this.iFrameUrl);
    },
    beforeUpdate(){
        this.refreshQuery();
        console.log(this.iFrameUrl);
    },
    methods: {
        refreshQuery(){
            var query = "";
            var fromTime = "";

            if(this.getEnvState == "UATA"){
                query = query + "env.keyword%20:%20%22UATA%22"
            }else if(this.getEnvState == "UATB"){
                query = query + "env.keyword%20:%20%22UATB%22"
            }else if(this.getEnvState == "PREPROD"){
                query = query + "env.keyword%20:%20%22PREPROD%22"
            }

            if(this.$store.state.squadId != 0){
                if(this.$store.state.env == "ALL"){
                    query = query + "squadId%20:%20" + this.$store.state.squadId
                }else{
                    query = query + "%20and%20squadId%20:%20" + this.$store.state.squadId
                }
            }

            if(this.$store.state.time == 0){
                fromTime =  "now-1d";
            }else if(this.$store.state.time == 1){
                fromTime =  "now-7d";
            }else{
                fromTime =  "now-30d";
            }

            this.iFrameUrl = this.iFrameUrl.replace("[query]", query).replace("[time]", fromTime);
            console.log(query);
        }
    }
}
</script>

<style>
iframe {
  display: block;
  border-style:none;
}
</style>
