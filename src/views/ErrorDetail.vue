<template>
  <div class="m-4 p-4">
    <h1><span class="m-2" @click="$router.go(-1)"><b-icon icon="arrow-left" font-scale="1"></b-icon></span>{{ errorType }}</h1>
    <FilterCard />
    <br />
    <div v>
      <div :key="$store.state.renderCounter">
         <SquadPercentage :errorType="this.errorType"/>
      </div>
    </div>
    
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";
import FilterCard from "@/components/FilterCard.vue";
import SquadPercentage from "@/components/kibana/SquadPercentage";

export default {
  name: "ErrorDetail",
  components: {
    BIcon,
    FilterCard,
    SquadPercentage
  },
  data() {
    return {
      errorType: this.$route.params.errorType,
    };
  },
  methods:{

  }
};
</script>