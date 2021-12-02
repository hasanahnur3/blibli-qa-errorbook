<template>
  <div class="pt-4">
    <div class="">
      <div class="">
        <div v-if="categoryLoaded" class="main justify-content-center" >
          <div
              v-for="(item, index) in errorCategory.categories"
              v-bind:item="item"
              v-bind:index="index"
              v-bind:key="index"
          >
            <CategoryLabel
                :categoryName = "item"
            />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElasticCategoryService from "@/service/CategoryService";
import CategoryLabel from "@/components/CategoryLabel";

export default {
  name: "CategoryCard",
  props: {
    errorType: String,
  },
  components:{
    CategoryLabel
  },
  data() {
    return{
      errorCategory: Object,
      categoryLoaded: false,
    }
  },
  methods:{
    getCategory() {
      this.categoryLoaded = false;
      ElasticCategoryService.getCategory(this.errorType).then(
          (response) => {
            this.errorCategory =
                response.data.hits.hits[0]._source;
            this.listCategories = this.errorCategory.categories;
            console.log(this.errorCategory);
            this.categoryLoaded =true;
          }
      );
    }
  },
  mounted() {
    this.getCategory();
  }
};
</script>

<style>
.main {
  display: flex;
  flex-wrap: wrap;
}
.main div {
  width: 170px;
  height: 80px;
}
</style>