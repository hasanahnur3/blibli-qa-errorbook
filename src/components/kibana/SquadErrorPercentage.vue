<template>
<!--  <div class="row">-->
    <div class="col-6">
      <iframe :src="this.iFrameUrl" height="500" width="100%" ></iframe>
    </div>
<!--  </div>-->
</template>

<script>
export default {
  name: "SquadErrorPercentage",
  computed:{
    getEnvState(){
      return this.$store.state.env
    },
    getSquadIdState(){
      return this.$store.state.squadId
    }
  },
  props: {
    errorType: String
  },
  data(){
    return{
      iFrameUrl: "http://159.223.37.9:5601/app/dashboards#/view/9675d840-576d-11ec-b172-e71df3d22395?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:[time],to:now))&_a=(description:'',expandedPanelId:'4599a600-4295-47cc-8f73-9ae2cafefbc4',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:'[query]'),timeRestore:!f,title:SquadErrorPercentage,viewMode:view)&hide-filter-bar=true"
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
        query = query + "env.keyword%20:%20%22UATA%22%20"
      }else if(this.getEnvState == "UATB"){
        query = query + "env.keyword%20:%20%22UATB%22%20"
      }else if(this.getEnvState == "PREPROD"){
        query = query + "env.keyword%20:%20%22PREPROD%22%20"
      }

      if(this.getEnvState != "ALL"){
        query = query + "and%20";
      }

      query = query
          + "errorType.keyword%20:%20%22"
          + this.errorType
          + "%22%20";

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
