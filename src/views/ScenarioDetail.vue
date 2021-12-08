<template>
  <div class="m-4 p-4">
    <h1>
      <span class="m-2" @click="$router.go(-1)"
      ><b-icon icon="arrow-left" font-scale="1"></b-icon></span
      >{{ $store.state.scenarioName }}
    </h1>
    <FilterCard envOnly=true />
    <div :key="$store.state.renderCounter" v-if="dataLoaded"  v-cloak>
      <div>
        <div v-if="selectedErrorType != 'ALL'">
          <ScenarioErrorOccurence :errorType="this.selectedErrorType" />
        </div>
        <div v-if="selectedErrorType == 'ALL'">
          <ScenarioErrorOccurence />
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-4">
          <h5>Change Chart Basen On Error Type: </h5>
        </div>
        <div class="col-4">
          <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedErrorType"
              @change="increaseRenderCounter"
          >
            <option
                v-for="(item, index) in listErrorType"
                v-bind:item="item"
                v-bind:index="index"
                v-bind:key="item"
                :value = "item"
            >{{ item }}</option>
          </select>
        </div>
      </div>
      <br>
      <v-client-table :columns="columns" v-model="listError" :options="options">
        <div slot="child_row" slot-scope="props">
          <div>
            <p><b>Error Message: </b></p>
            <p>{{props.row.error_message}}</p>
          </div>
        </div>

        <div slot="error_type" slot-scope="props">
          <router-link :to="'/error-detail/' + props.row.error_type">
            <a class="link-primary">
              {{ props.row.error_type }}
            </a>
          </router-link>
        </div>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import FilterCard from "@/components/FilterCard.vue";
import ElasticService from "@/service/service";
import ScenarioErrorOccurence from "@/components/kibana/ScenarioErrorOccurence";
export default {
  name: "ScenarioDetail",
  components: {
    FilterCard,
    ScenarioErrorOccurence
  },
  data() {
    return {
      listError: [],
      dataLoaded: false,
      listErrorType: [],
      selectedErrorType: "ALL",
      columns: ["error_type", "error_step", "time", "project_name", "env"],
      options: {
        headings: {
          error_type: "Error Type",
          error_step: "Error Step",
          time: "Time",
          env: "Env",
          error_message: "Error Message",
          project_name: "Project Name"
        },
        sortable: ["error_type", "error_step", "time", "env", "project_name"],
        filterable: ["error_type", "error_step", "time", "env", "error_message", "project_name"],
      },
    };
  },
  watch: {
    "$store.state.renderCounter": function () {
      this.changeListError();
    },
  },
  methods: {
    changeListError() {
      if (this.$store.state.env == "ALL") {
        this.listErrorType.push("ALL");
        ElasticService.getListErrorFromScenarioNoEnv().then(
            (response) => {
              var listData = response.data.hits.hits;
              this.listError = [];
              for(var i=0; i<listData.length; i++){
                let dummy = {
                  error_type : listData[i]._source.errorType,
                  error_step : listData[i]._source.errorStep,
                  project_name : listData[i]._source.projectName,
                  time : listData[i]._source.time.slice(0, 19).replace(/-/g, "/").replace("T", " "),
                  env : listData[i]._source.env,
                  error_message: listData[i]._source.errorMessage,
                  id: i,
                }
                if(!this.listErrorType.includes(dummy.error_type)) this.listErrorType.push(dummy.error_type);
                this.listError.push(dummy);
              }
              console.log(this.listError);
              this.dataLoaded = true;
            }
        );
      } else {
        ElasticService.getListErrorFromScenarioWithEnv().then(
            (response) => {
              var listData = response.data.hits.hits;
              this.listError = [];
              for(var i=0; i<listData.length; i++){
                let dummy = {
                  error_type : listData[i]._source.errorType,
                  error_step : listData[i]._source.errorStep,
                  time : listData[i]._source.time,
                  env : listData[i]._source.env,
                  error_message: listData[i]._source.errorMessage,
                }
                this.listError.push(dummy);
              }
              this.dataLoaded = true;
            }
        );
      }
    },
    increaseRenderCounter(){
      this.$store.commit("changeRenderCounter")
    }
  },
  mounted() {
    this.changeListError();
    this.$store.commit("updateCollab");
  },
}

</script>

<style>
#app {
  width: 95%;
  margin: 0 auto;
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

.VueTables__search-field{
  margin-bottom: 1rem;
}

[v-cloak] {
  display:none;
}
</style>