<template>
    <div class="col-6">
      <iframe :src="this.iFrameUrl" height="500" width="100%" ></iframe>
    </div>
</template>

<script>
export default {
  name: "ErrorTypeOccurence",
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
      /*
      This comment is intended for those who desire to replicate Error Book
      ---------------------------------------------------------------------
      Replace the url of ErrorTypeOccurence visualization here.
      ErrorTypeOccurence and ErrorTypeOccurenceCentered is the same, don't be confused.
      The centered one is used when the visualization is displayed alone in a row.
       */
      iFrameUrl: "http://159.223.37.9:5601/app/dashboards#/view/3df41c30-576e-11ec-b172-e71df3d22395?embed=true&_g=(filters:!(),query:(language:kuery,query:''),refreshInterval:(pause:!t,value:0),time:(from:[time],to:now))&_a=(description:'',expandedPanelId:'96803e43-79f3-4636-a6cf-05ac7d69bbb5',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:'[query]'),timeRestore:!t,title:ErrorTypeOccurence,viewMode:view)&hide-filter-bar=true"
    }
  },
  mounted(){
    this.refreshQuery();
  },
  beforeUpdate(){
    this.refreshQuery();
  },
  methods: {
    refreshQuery(){
      var query = "";
      var fromTime = "";

      query = query
          + "errorType.keyword%20:%20%22"
          + this.errorType
          + "%22%20";

      /*
      This comment is intended for those who desire to replicate Error Book
      ---------------------------------------------------------------------
      Replace the if else below to match your according environments.
       */
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
