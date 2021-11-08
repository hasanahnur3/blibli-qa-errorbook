<template>
  <div class="m-4 p-4">
    <h1><b>Error Book</b></h1>
    <FilterCard />
    <br />
    <div :key="$store.state.renderCounter">
      <!-- <MostCommonError/> -->
    </div>

    <!-- SEARCH NAVBAR -->
    <div class="m-4">
      <div v-if="$store.state.squadId != 0">
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              v-bind:class="{ active: searchIndex == 0 }"
              @click="changeSearchIndex"
              >Search By Error</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              v-bind:class="{ active: searchIndex == 1 }"
              @click="changeSearchIndex"
              >Search By Scenario</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- END OF SEARCH NAVBAR -->

    <!-- SEARCH BY ERROR -->
    <div v-if="searchIndex == 0" :key="$store.state.renderCounter">
      <!-- SEARCH SELECTOR -->
      <div class="input-group input-group-lg">
        <span class="input-group-text" id="inputGroup-sizing-lg-error"
          >Search An Error:
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg-error"
          v-model="searchErrorKey"
        />
        {{ searchErrorKey }}
        <button class="btn btn-primary" @click="changeListTopTenError">Search</button>
      </div>
      <CategorySelectorCard />
      <!-- END OF SEARCH SELECTOR -->
      <br />
      <div :key="searchRenderCounter">
        <div v-if="listTopTenError.length == 0" class="text-center">
          <h5>No Error Found</h5>
        </div>
        {{ listTopTenError }}
        <div
          v-for="(item, index) in listTopTenError"
          v-bind:item="item"
          v-bind:index="index"
          v-bind:key="index"
        >
          <ErrorTypeListElement
            :errorType="item.key"
            :occurence="item.doc_count"
          />
        </div>
      </div>
      <br />
      <div class="text-center">
        <p v-if="searchErrorKey == ''">Showing Top 10 Most Common Errors <span> in environment {{ $store.state.env }} and squad {{ $store.state.selectedCollab.collabName }} </span> </p>
        <p v-if="searchErrorKey != ''">Showing Result of Search Keyword: {{ searchErrorKey }} <span> in environment {{ $store.state.env }} and squad {{ $store.state.selectedCollab.collabName }} </span>  </p>
      </div>
    </div>
    <!-- END OF SEARCH BY ERROR -->

    <!-- SEARCH BY SCENARIO -->
    <div v-if="searchIndex == 1" :key="$store.state.renderCounter">
      <!-- SEARCH SELECTOR -->
      <div class="input-group input-group-lg">
        <span class="input-group-text" id="inputGroup-sizing-lg"
          >Search A Scenario:
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          v-model="searchScenarioKey"
        />
        <button class="btn btn-primary" @click="changeListTopTenScenario">Search</button>
      </div>
      <br />
      <div :key="searchRenderCounter">
        <div v-if="listTopTenScenario.length == 0" class="text-center">
          <h5>No Scenario Found</h5>
        </div>
        {{ listTopTenScenario }}
        <div
            v-for="(item, index) in listTopTenScenario"
            v-bind:item="item"
            v-bind:index="index"
            v-bind:key="index"
        >
          <ScenarioListElement
              :scenario="item.key"
              :occurence="item.doc_count"
          />
        </div>
      </div>
      <br />
      <div class="text-center">
        <p v-if="searchScenarioKey == ''">Showing Top 10 Scenario With Most Errors <span> in environment {{ $store.state.env }} and squad {{ $store.state.selectedCollab.collabName }} </span> </p>
        <p v-if="searchScenarioKey != ''">Showing Result of Search Keyword: {{ searchScenarioKey }} <span> in environment {{ $store.state.env }} and squad {{ $store.state.selectedCollab.collabName }}</span>  </p>
      </div>
      <!-- END OF SEARCH SELECTOR -->
    </div>
    <!-- END OF SEARCH BY SCENARIO -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import FilterCard from "@/components/FilterCard.vue";
import CategorySelectorCard from "@/components/CategorySelectorCard.vue";
import ErrorTypeListElement from "@/components/ErrorTypeListElement.vue";
import ScenarioListElement from "@/components/ScenarioListElement";
// import MostCommonError from "@/components/kibana/MostCommonError.vue";
import ElasticService from "@/service/service.js";

export default {
  name: "Home",
  components: {
    FilterCard,
    CategorySelectorCard,
    ErrorTypeListElement,
    ScenarioListElement,
    // MostCommonError,
  },
  data() {
    return {
      env: "ALL",
      squadId: 0,
      renderCounter: 0,
      searchIndex: 0,
      searchErrorKey: "",
      searchScenarioKey: "",
      searchRenderCounter: 0,
      listTopTenError: Array,
      listTopTenScenario: Array,
    };
  },
  watch: {
    '$store.state.renderCounter': function() {
      console.log("status: " + this.$store.state.squadId)
      this.changeListTopTenError();
      if(this.searchIndex == 1){
        this.changeListTopTenScenario();
      }
      console.log("masuk watchh");
    }
  },
  methods: {
    changeSearchIndex() {
      if (this.searchIndex == 0){
        this.searchIndex = 1;
        this.changeListTopTenScenario();
      }
      else{
        this.searchIndex = 0;
        this.searchScenarioKey = "";
        this.listTopTenScenario = [];
      }
      console.log("search index berubah jadi: " + this.searchIndex);
    },
    changeListTopTenScenario(){
      // NO ENV //
      if(this.$store.state.env == "ALL"){
        if (this.searchScenarioKey != ""){
          ElasticService.getTopTenScenarioSearchNoEnv(this.$store.state.squadId, this.searchScenarioKey).then(
              (response) => {
                console.log(response);
                this.listTopTenScenario =
                    response.data.aggregations.by_scenario.buckets;
                this.searchRenderCounter++;
              }
          );
        }else{
          ElasticService.getTopTenScenarioNoEnv(this.$store.state.squadId).then(
              (response) => {
                console.log(response);
                this.listTopTenScenario =
                    response.data.aggregations.by_scenario.buckets;
                this.searchRenderCounter++;
              }
          );
        }
      }
      // WITH ENV //
      else{
        if (this.searchScenarioKey != ""){
          ElasticService.getTopTenScenarioSearchWithEnv(this.$store.state.squadId, this.searchScenarioKey, this.$store.state.env).then(
              (response) => {
                console.log(response);
                this.listTopTenScenario =
                    response.data.aggregations.by_scenario.buckets;
                this.searchRenderCounter++;
              }
          );
        }else{
          ElasticService.getTopTenScenarioWithEnv(this.$store.state.squadId, this.$store.state.env).then(
              (response) => {
                console.log(response);
                this.listTopTenScenario =
                    response.data.aggregations.by_scenario.buckets;
                this.searchRenderCounter++;
              }
          );
        }
      }
    },
    changeListTopTenError() {
      console.log(this.searchErrorKey);
      // NO ENV AND SQUAD ID //
      if (this.$store.state.env == "ALL" && this.$store.state.squadId == 0) {
        console.log("changeListTopTenError 1");
        if (this.searchErrorKey != "") {
          ElasticService.getTopTenErrorSearch(this.searchErrorKey).then(
            (response) => {
              console.log(response);
              this.listTopTenError =
                response.data.aggregations.by_errorType.buckets;
              this.searchRenderCounter++;
            }
          );
        } else {
          ElasticService.getTopTenError().then((response) => {
            this.listTopTenError =
              response.data.aggregations.by_errorType.buckets;
            this.searchRenderCounter++;
          });
        }
      }
      // ENV ONLY //
      else if (
        this.$store.state.env != "ALL" &&
        this.$store.state.squadId == 0
      ) {
        console.log("changeListTopTenError 2");
        if (this.searchErrorKey != "") {
          ElasticService.getTopTenErrorSearchWithEnv(this.searchErrorKey, this.$store.state.env).then(
              (response) => {
                this.listTopTenError =
                    response.data.aggregations.by_errorType.buckets;
              }
          );
        } else {
          ElasticService.getTopTenErrorWithEnv(this.$store.state.env).then(
            (response) => {
              this.listTopTenError =
                response.data.aggregations.by_errorType.buckets;
            }
          );
        }
      }
      // SQUAD ID ONLY //
      else if (
        this.$store.state.env == "ALL" &&
        this.$store.state.squadId != 0
      ) {
        console.log("changeListTopTenError 3");
        if (this.searchErrorKey != "") {
          ElasticService.getTopTenErrorSearchWithSquadId(this.searchErrorKey,
              this.$store.state.squadId
          ).then((response) => {
            this.listTopTenError =
                response.data.aggregations.by_errorType.buckets;
          });
        } else {
          ElasticService.getTopTenErrorWithSquadId(
            this.$store.state.squadId
          ).then((response) => {
            this.listTopTenError =
              response.data.aggregations.by_errorType.buckets;
          });
        }
      }
      // WITH ENV AND SQUAD ID //
      else if (
        this.$store.state.env != "ALL" &&
        this.$store.state.squadId != 0
      ) {
        console.log("changeListTopTenError 4");
        if (this.searchErrorKey != "") {
          ElasticService.getTopTenErrorSearchWithEnvAndSquadId(this.searchErrorKey,
              this.$store.state.env,
              this.$store.state.squadId
          ).then((response) => {
            this.listTopTenError =
                response.data.aggregations.by_errorType.buckets;
          });
        } else {
          ElasticService.getTopTenErrorWithEnvAndSquadId(
            this.$store.state.env,
            this.$store.state.squadId
          ).then((response) => {
            this.listTopTenError =
              response.data.aggregations.by_errorType.buckets;
          });
        }
      }
    },
  },
  mounted() {
    this.changeListTopTenError();
  },
  created() {
    this.$store.commit("updateCollab");
  },
  updated() {
    // ElasticService.getTopTenErrorWithEnv("UATA").then((response) => {
    //   this.listTopError = response.data.aggregations.by_errorType.buckets;
    //   console.log(this.listTopError);
    // });
  },
};
</script>
