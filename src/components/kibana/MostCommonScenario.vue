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
  name: "MostCommonScenario",
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
      iFrameUrl: "http://159.223.37.9:5601/app/dashboards#/view/2d81f5e0-5217-11ec-b5e3-33bcb8e6aefd?embed=true&_g=(filters:!(),query:(language:kuery,query:''),refreshInterval:(pause:!t,value:0),time:(from:[time],to:now))&_a=(description:'',expandedPanelId:d031be18-b1c3-4b55-9d6f-458d4d2c18b7,filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:'[query]'),timeRestore:!f,title:'Most%20Common%20Scenario',viewMode:view)&hide-filter-bar=true"
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
