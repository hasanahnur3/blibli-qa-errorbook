<template>
  <div class="pt-4">
    <div class="card">
      <div class="card-body">
        <div class="row mt-2">
          <!-- This comment is intended for those who desire to replicate Error Book
          ---------------------------------------------------------------------
          Change these environments according to your environments
          -->
          <div class="col-2 offset-md-3">
            <h5>Select Environment:</h5>
          </div>
          <div class="col">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="ALL"
                :checked="$store.state.env == 'ALL'"
                @change="changeEnv('ALL')"
              />
              <h5 class="form-check-label" for="inlineRadio1">ALL</h5>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="UATA"
                :checked="$store.state.env == 'UATA'"
                @change="changeEnv('UATA')"
              />
              <h5 class="form-check-label" for="inlineRadio2">UATA</h5>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="UATB"
                :checked="$store.state.env == 'UATB'"
                @change="changeEnv('UATB')"
              />
              <h5 class="form-check-label" for="inlineRadio3">UATB</h5>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio4"
                value="PREPROD"
                :checked="$store.state.env == 'PREPROD'"
                @change="changeEnv('PREPROD')"
              />
              <h5 class="form-check-label" for="inlineRadio4">PREPROD</h5>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-1" :hidden="envOnly"></div>
          <div class="col-3" :hidden="!envOnly"></div>
          <div class="col-2" :hidden="envOnly">
            <h5>Select Squad:</h5>
          </div>
          <div class="col-3" :hidden="envOnly">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedSquad"
              @change="changeSquadId"
            >
              <option
                v-for="(item, index) in getCollab"
                v-bind:item="item"
                v-bind:index="index"
                v-bind:key="item.id"
                :value = "item.id"
              >{{ item.collabName }}</option>
              <!-- <option value="1" :selected="$store.state.squadId == 1">
                Engangement
              </option> -->
            </select>
          </div>
          <div class="col-2">
            <h5>Select Time:</h5>
          </div>
          <div class="col-3">
            <select
                class="form-select"
                aria-label="Default select example"
                v-model="selectedTime"
                @change="changeTime"
            >
              <option value="0">Since Yesterday</option>
              <option value="1">Since Last Week</option>
              <option value="2">Since Last Month</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterCard",
  props: {
    envOnly: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      selectedSquad: Number,
      selectedTime: Number,
    };
  },
  computed: {
    getCollab() {
      return this.$store.state.collab;
    },
  },
  methods: {
    changeEnv(newEnv) {
      this.$store.commit("changeEnv", newEnv);
    },
    changeSquadId() {
      this.$store.commit("changeSquadId", this.selectedSquad);
    },
    changeTime(){
      this.$store.commit("changeTime", this.selectedTime);
    }
  },
  created() {
    this.selectedSquad = this.$store.state.squadId;
    this.selectedTime = this.$store.state.time;
  },
  mounted() {
    this.selectedSquad = this.$store.state.squadId;
    this.selectedTime = this.$store.state.time;
  }
};
</script>