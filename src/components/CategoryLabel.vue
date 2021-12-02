<template>
<div class="col-1 text-center">
  <p class="label p-2 m-2">{{ categoryName }}</p>
</div>
</template>

<script>
export default {
  name: "CategoryLabel",
  props: {
    categoryName: String,
  },
}
</script>

<style scoped>
.label {
  background: #cce8e9;
  border: 2px solid #a6d6e0;
  box-sizing: border-box;
  border-radius: 100px;
}
</style>