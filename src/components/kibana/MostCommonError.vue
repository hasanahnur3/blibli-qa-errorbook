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
    data(){
        return{
            iFrameUrl: "http://159.223.37.9:5601/app/dashboards#/view/786f0930-576c-11ec-b172-e71df3d22395?embed=true&_g=(filters:!(),query:(language:kuery,query:''),refreshInterval:(pause:!t,value:0),time:(from:[time],to:now))&_a=(description:'',expandedPanelId:'79b1e07a-c57f-45c0-bca8-29d771b959b6',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:'[query]'),timeRestore:!f,title:MostCommonError,viewMode:view)&hide-filter-bar=true"
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

            if(this.$store.state.env == "UATA"){
                query = query + "env.keyword%20:%20%22UATA%22"
            }else if(this.$store.state.env == "UATB"){
                query = query + "env.keyword%20:%20%22UATB%22"
            }else if(this.$store.state.env == "PREPROD"){
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
