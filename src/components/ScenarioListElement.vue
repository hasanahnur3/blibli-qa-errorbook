<template>
  <div>
    <div class="row m-2 m-2 mt-4">
      <div class="col-6">
        <p>{{ scenario }}</p>
      </div>
      <div class="col-2 text-center">
        <p class="label p-1">
          <b>{{ occurence }} </b>occurence
        </p>
      </div>
      <div class="col-1"></div>
      <div class="col-2">
          <button class="btn btn-primary" @click="handleScenarioNameClick">View More</button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "ScenarioListElement",
  props: {
    scenario: String,
    occurence: Number,
    scenarioProject: String,
  },
  methods: {
    handleScenarioNameClick(){
      const scenarioName = this.scenario;
      const scenarioProject = this.scenarioProject;
      this.$store.commit("changeScenario", {scenarioName, scenarioProject});
      this.$router.push("/scenario-detail");
    },
  }
};
</script>

<style scoped>
.label {
  background: #cce8e9;
  border: 2px solid #a6d6e0;
  box-sizing: border-box;
  border-radius: 100px;
}
</style>