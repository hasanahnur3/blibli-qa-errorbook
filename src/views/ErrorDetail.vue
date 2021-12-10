<template>
  <div class="m-4 p-4">
    <h1>
      <span class="m-2" @click="$router.go(-1)"
        ><b-icon icon="arrow-left" font-scale="1"></b-icon></span
      >{{ errorType }}
    </h1>
    <FilterCard />
    <br />
    <div v-if="$store.state.squadId == 0">
      <div :key="$store.state.renderCounter">
        <div class="row">
            <SquadErrorPercentage :errorType="this.errorType"/>
            <ErrorTypeOccurence :errorType="this.errorType"/>
        </div>

        <br>
        <hr>
        <br>
        <div>
          <h3 class="mb-2"><b>Categories</b></h3>
          <div class="container">
            <CategoryCard :errorType="this.errorType"/>
          </div>
        </div>
        <hr>
        <br>

        <div :key="$store.state.isLoggedIn">
          <h3 class="mb-3"><b>Comments</b></h3>

          <div>
            <div class="text-center" v-if="listComment.length == 0">
                <h5 class="mb-4 pb-2">No Comment Found</h5>
              <hr>
            </div>

           <div
                v-for="(item, index) in listComment"
                v-bind:item="item"
                v-bind:index="index"
                v-bind:key="index"
            >
              <CommentCard
                  :username="item._source.username"
                  :createdAt="item._source.createdDate"
                  :updatedAt="item._source.updatedDate"
                  :comment="item._source.comment"
                  :id="item._id"
              />
            </div>

            <div v-if="$store.state.isLoggedIn">
              <CommentInput
                  :username="$cookies.get('badak-username')"
                  :errorType="this.errorType"
                  @update="updateListComment"
              />
            </div>
          </div>

          <div v-if="!$store.state.isLoggedIn" class="align-content-center justify-content-center text-center">
            <h5 class="pt-3">Log In untuk menulis komentar</h5>
            <button class="btn btn-primary" @click="provideCache">Log In</button>
          </div>
        </div>

      </div>
    </div>
    <div v-if="$store.state.squadId != 0">
      <div :key="$store.state.renderCounter" v-if="dataLoaded">
        <div class="row">
          <div>
            <ErrorTypeOccurenceCentered :errorType="this.errorType" />
          </div>
        </div>

        <v-client-table :columns="columns" v-model="listScenario" :options="options">
          <div slot="scenario_name" slot-scope="props" @click="handleScenarioNameClick(props.row.scenario_name, props.row.project_name)" class="glyphicon glyphicon-eye-open">
            <a class="link-primary">
              {{ props.row.scenario_name }}
            </a>
          </div>
        </v-client-table>
      </div>
    </div>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";
import FilterCard from "@/components/FilterCard.vue";
import ElasticService from "@/service/service";
import CommentService from "@/service/CommentService";
import CommentInput from "@/components/CommentInput";
import CommentCard from "@/components/CommentCard";
import SquadErrorPercentage from "@/components/kibana/SquadErrorPercentage";
import ErrorTypeOccurence from "@/components/kibana/ErrorTypeOccurence";
import ErrorTypeOccurenceCentered from "@/components/kibana/ErrorTypeOccurenceCentered";
import CategoryCard from "@/components/CategoryCard";

export default {
  name: "ErrorDetail",
  components: {
    BIcon,
    FilterCard,
    CommentInput,
    CommentCard,
    SquadErrorPercentage,
    ErrorTypeOccurence,
    ErrorTypeOccurenceCentered,
    CategoryCard
  },
  data() {
    return {
      errorType: this.$route.params.errorType,
      listScenario: Array,
      listComment: [],
      dataLoaded: false,
      columns: ["scenario_name", "error_count"],
      options: {
        headings: {
          name: "Scenario Name",
          code: "Error Count",
        },
        sortable: ["scenario_name", "error_count"],
        filterable: ["scenario_name", "error_count"],
      },
    };
  },
  watch: {
    "$store.state.renderCounter": function () {
      this.getComments();
      this.changeListScenario();
    },
  },
  methods: {
    getComments(){
      CommentService.getListComment(this.errorType).then(
          (response) => {
            this.listComment = response.data.hits.hits;
          }
      );
    },
    updateListComment(){
      this.$router.go();
    },
    handleScenarioNameClick(scenarioName, scenarioProject){
      this.$store.commit("changeScenario", {scenarioName, scenarioProject});
      this.$router.push("/scenario-detail");
    },
    provideCache(){
      this.$store.commit("insertCookies");
    },
    changeListScenario() {
      if (this.$store.state.squadId != 0){
        if (this.$store.state.env == "ALL") {
          ElasticService.getListScenarioFromErrorTypeNoEnv(this.errorType).then(
              (response) => {
                var listData = response.data.aggregations.by_scenarioName.buckets;
                this.listScenario = [];
                for(var i=0; i<listData.length; i++){
                  let dummy = {
                    scenario_name : listData[i].key,
                    error_count : listData[i].doc_count,
                    project_name : listData[i].by_projectName.buckets[0].key
                  }
                  this.listScenario.push(dummy);
                }
                this.dataLoaded = true;
              }
          );
        } else {
          ElasticService.getListScenarioFromErrorTypeWithEnv(this.errorType).then(
              (response) => {
                var listData = response.data.aggregations.by_scenarioName.buckets;
                this.listScenario = [];
                for(var i=0; i<listData.length; i++){
                  let dummy = {
                    scenario_name : listData[i].key,
                    error_count : listData[i].doc_count,
                    project_name : listData[i].by_projectName.buckets[0].key
                  }
                  this.listScenario.push(dummy);
                }
                this.dataLoaded = true;
              }
          );
        }
      }
    },
  },
  mounted() {
    this.getComments();
    this.changeListScenario();
    if(this.$cookies.get("badak-username") == null){
      this.$store.commit("changeIsLoggedIn", false);
    }
  },
};
</script>

<style>
th:nth-child(3) {
  text-align: center;
}

[v-cloak] {
  display:none;
}

.VueTables__search-field{
  margin-bottom: 1rem;
}
</style>