<template>
<div>
  <iframe :src="this.iFrameUrl" height="600" width="70%" ></iframe>
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
            // iFrameUrl: "http://172.18.69.96:5601/app/dashboards#/view/75081950-3663-11ec-a8ab-854339ac1288?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:1000),time:(from:now-30d,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:15,i:'1e9876d4-1c63-4a5e-82fc-f5672c98c4c6',w:24,x:0,y:0),id:f060e6a0-3662-11ec-a8ab-854339ac1288,panelIndex:'1e9876d4-1c63-4a5e-82fc-f5672c98c4c6',type:lens,version:'7.12.1')),query:(language:kuery,query:'[query]'),tags:!(),timeRestore:!f,title:'Error%20Book',viewMode:view)&hide-filter-bar=true",
            // iFrameUrl: "http://172.18.69.96:5601/app/dashboards#/view/75081950-3663-11ec-a8ab-854339ac1288?embed=true&_g=(filters:!(),query:(language:kuery,query:''),refreshInterval:(pause:!t,value:1000),time:(from:now-1y,to:now))&_a=(description:'',expandedPanelId:'1e9876d4-1c63-4a5e-82fc-f5672c98c4c6',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:17,i:'1e9876d4-1c63-4a5e-82fc-f5672c98c4c6',w:31,x:0,y:0),id:f060e6a0-3662-11ec-a8ab-854339ac1288,panelIndex:'1e9876d4-1c63-4a5e-82fc-f5672c98c4c6',type:lens,version:'7.12.1')),query:(language:kuery,query:'[query]'),tags:!(),timeRestore:!f,title:'Error%20Book',viewMode:edit)",
            // iFrameUrl: "http://172.18.69.96:5601/app/dashboards#/view/75081950-3663-11ec-a8ab-854339ac1288?embed=true&_g=(filters:!(),query:(language:kuery,query:''),refreshInterval:(pause:!t,value:1000),time:(from:now-1y,to:now))&_a=(description:'',expandedPanelId:'1e9876d4-1c63-4a5e-82fc-f5672c98c4c6',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:17,i:'1e9876d4-1c63-4a5e-82fc-f5672c98c4c6',w:31,x:0,y:0),id:f060e6a0-3662-11ec-a8ab-854339ac1288,panelIndex:'1e9876d4-1c63-4a5e-82fc-f5672c98c4c6',type:lens,version:'7.12.1')),query:(language:kuery,query:'[query]'),tags:!(),timeRestore:!f,title:'Error%20Book',viewMode:edit)&show-query-input=true&hide-filter-bar=true",
            iFrameUrl: "http://172.18.69.96:5601/app/dashboards#/view/75081950-3663-11ec-a8ab-854339ac1288?embed=true&_g=(filters:!(),query:(language:kuery,query:''),refreshInterval:(pause:!t,value:1000),time:(from:now-1y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:21,i:'1e9876d4-1c63-4a5e-82fc-f5672c98c4c6',w:48,x:0,y:0),id:f060e6a0-3662-11ec-a8ab-854339ac1288,panelIndex:'1e9876d4-1c63-4a5e-82fc-f5672c98c4c6',type:lens,version:'7.12.1')),query:(language:kuery,query:'[query]'),tags:!(),timeRestore:!f,title:'Error%20Book',viewMode:view)&hide-filter-bar=true"
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

            if(this.getEnvState == "UATA"){
                query = query + "env.keyword%20:%20%22UATA%22"
            }else if(this.getEnvState == "UATB"){
                query = query + "env.keyword%20:%20%22UATB%22"
            }else if(this.getEnvState == "PREPROD"){
                query = query + "env.keyword%20:%20%22PREPROD%22"
            }

            if(this.$store.state.squadId != 0){
                if(this.$store.state.env == "ALL"){
                    query = query + "squadID%20:%20" + this.$store.state.squadId
                }else{
                    query = query + "%20and%20squadID%20:%20" + this.$store.state.squadId
                }
            }

            this.iFrameUrl = this.iFrameUrl.replace("[query]", query);
            console.log(query);
        }
    }
}
</script>