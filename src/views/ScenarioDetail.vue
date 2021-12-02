<template>
  <div class="m-4 p-4">
    <h1>
      <span class="m-2" @click="$router.go(-1)"
      ><b-icon icon="arrow-left" font-scale="1"></b-icon></span
      >{{ $store.state.scenarioName }}
    </h1>
    <FilterCard envOnly=true />
    <br />
    <div :key="$store.state.renderCounter" v-if="dataLoaded"  v-cloak>
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
export default {
  name: "ScenarioDetail",
  components: {
    FilterCard
  },
  data() {
    return {
      listError: Array,
      dataLoaded: false,
      columns: ["error_type", "error_step", "time", "env"],
      options: {
        headings: {
          error_type: "Error Type",
          error_step: "Error Step",
          time: "Time",
          env: "Env",
          error_message: "Error Message",
        },
        sortable: ["error_type", "error_step", "time", "env"],
        filterable: ["error_type", "error_step", "time", "env", "error_message"],
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
        ElasticService.getListErrorFromScenarioNoEnv().then(
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
  },
  mounted() {
    this.changeListError();
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