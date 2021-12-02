<template>
  <div>
    <iframe :src="this.iFrameUrl" height="300" width="40%" ></iframe>
  </div>
</template>

<script>
export default{
  name: "SquadPercentage",
  props:{
    errorType: String
  },
  data(){
    return{
      iFrameUrl : "http://172.18.69.96:5601/app/dashboards#/view/64e8cde0-4076-11ec-a8ab-854339ac1288?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))&_a=(description:'',expandedPanelId:'22b624e7-c671-429d-bd0a-cbc187f1b74f',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'0ea4d0a0-3662-11ec-a8ab-854339ac1288',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'0ea4d0a0-3662-11ec-a8ab-854339ac1288',name:indexpattern-datasource-layer-c89998d3-1a8b-4a85-a308-bddf19072bcc,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:(c89998d3-1a8b-4a85-a308-bddf19072bcc:(columnOrder:!(c37704bb-81e2-4096-ac6d-bf4953a86a3a,eaebae48-104e-48d4-aa00-bb43dcfa206f),columns:(c37704bb-81e2-4096-ac6d-bf4953a86a3a:(dataType:number,isBucketed:!t,label:'Top%20values%20of%20squadId',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:eaebae48-104e-48d4-aa00-bb43dcfa206f,type:column),orderDirection:desc,otherBucket:!f,size:5),scale:ordinal,sourceField:squadId),eaebae48-104e-48d4-aa00-bb43dcfa206f:(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:default,groups:!(c37704bb-81e2-4096-ac6d-bf4953a86a3a,c37704bb-81e2-4096-ac6d-bf4953a86a3a,c37704bb-81e2-4096-ac6d-bf4953a86a3a,c37704bb-81e2-4096-ac6d-bf4953a86a3a,c37704bb-81e2-4096-ac6d-bf4953a86a3a,c37704bb-81e2-4096-ac6d-bf4953a86a3a,c37704bb-81e2-4096-ac6d-bf4953a86a3a),layerId:c89998d3-1a8b-4a85-a308-bddf19072bcc,legendDisplay:default,metric:eaebae48-104e-48d4-aa00-bb43dcfa206f,nestedLegend:!f,numberDisplay:percent)),shape:pie)),title:'',type:lens,visualizationType:lnsPie),enhancements:(),hidePanelTitles:!f),gridData:(h:20,i:'22b624e7-c671-429d-bd0a-cbc187f1b74f',w:48,x:0,y:0),panelIndex:'22b624e7-c671-429d-bd0a-cbc187f1b74f',title:'Squad%20Percentage',type:lens,version:'7.12.1')),query:(language:kuery,query:'[query]'),tags:!(),timeRestore:!f,title:'Squad%20Percentage',viewMode:view)&hide-filter-bar=true"
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

      query = "errorType.keyword%20:%20%22" + this.errorType;

      if(this.$store.state.env == "UATA"){
        query = query + "%22%20and%20env.keyword%20:%20%22UATA%22%20"
      }else if(this.$store.state.env == "UATB"){
        query = query + "%22%20and%20env.keyword%20:%20%22UATB%22%20"
      }else if(this.$store.state.env == "PREPROD"){
        query = query + "%22%20and%20env.keyword%20:%20%22PREPROD%22%20"
      }else{
        query = query + "%22%20"
      }

      this.iFrameUrl = this.iFrameUrl.replace("[query]", query);
      console.log(query);
    }
  }
}
</script>