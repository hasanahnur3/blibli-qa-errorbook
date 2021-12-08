<template>
  <div class="row">
    <div class="col-2">

    </div>
    <div class="col-8">
      <iframe :src="this.iFrameUrl" height="500" width="100%" ></iframe>
    </div>
    <div class="col-2">

    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorTypeOccurenceCentered",
  computed:{
    getEnvState(){
      return this.$store.state.env
    },
    getSquadIdState(){
      return this.$store.state.squadId
    }
  },
  props: {
    errorType: {
      default: "",
      type: String
    }
  },
  data(){
    return{
      iFrameUrl: "http://159.223.37.9:5601/app/dashboards#/view/3df41c30-576e-11ec-b172-e71df3d22395?embed=true&_g=(filters:!(),query:(language:kuery,query:''),refreshInterval:(pause:!t,value:0),time:(from:[time],to:now))&_a=(description:'',expandedPanelId:'96803e43-79f3-4636-a6cf-05ac7d69bbb5',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:'[query]'),timeRestore:!t,title:ErrorTypeOccurence,viewMode:view)&hide-filter-bar=true"
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

      query = query
          + "scenarioName.keyword%20:%20%22"
          + this.$store.state.scenarioName
          + "%22%20";

      if(this.errorType !== ""){
        query = query
            + "and%20errorType.keyword%20:%20%22"
            + this.errorType
            + "%22%20";
      }

      if(this.getEnvState == "UATA"){
        query = query + "%20and%20env.keyword%20:%20%22UATA%22"
      }else if(this.getEnvState == "UATB"){
        query = query + "%20and%20env.keyword%20:%20%22UATB%22"
      }else if(this.getEnvState == "PREPROD"){
        query = query + "%20and%20env.keyword%20:%20%22PREPROD%22"
      }

      if(this.$store.state.squadId != 0){
        if(this.$store.state.env == "ALL"){
          query = query + "%20and%20squadId%20:%20" + this.$store.state.squadId
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
