<template>
  <div class="pt-4 pb-3">
    <div class="">
      <div class="">
        <div v-if="categoryLoaded" :key="$store.state.isLoggedIn">
          <div class="main justify-content-center">
            <h5 class="mb-4 pb-2" v-if="listCategories.length == 0">No Categories Found</h5>
            <div
                v-for="(item, index) in listCategories"
                v-bind:item="item"
                v-bind:index="index"
                v-bind:key="index"
            >
              <CategoryLabel
                  :categoryName = "item"
              />
            </div>
          </div>

          <div v-if="!$store.state.isLoggedIn && listCategories.length == 0">
            <hr class="col-4 offset-4">
          </div>

          <div v-if="!$store.state.isLoggedIn" class="align-content-center justify-content-center text-center">
            <h5 class="pt-3">Log In untuk menambah category</h5>
            <button class="btn btn-primary" @click="provideCache">Log In</button>
          </div>

          <div v-if="$store.state.isLoggedIn" class="container justify-content-center text-center">
            <div class="col-6 offset-3">
              <div class="input-group">
                <span class="input-group-text"
                >Add a Category:
                </span>
                <input
                    type="text"
                    class="form-control"
                    v-model="newCategory"
                />
                <button class="btn btn-primary" @click="submitNewCategory">Submit</button>
              </div>
            </div>
            <p class="text-danger pt-2" v-if="!hideInputWarning">That Category is Already Exist</p>
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
      id:"",
      listCategories: [],
      categoryLoaded: false,
      newCategory: "",
      hideInputWarning: true,
    }
  },
  methods:{
    getCategory() {
      this.categoryLoaded = false;
      ElasticCategoryService.getCategory(this.errorType).then(
          (response) => {
            console.log(response.data);
            this.id = response.data.hits.hits[0]._id;
            this.listCategories = response.data.hits.hits[0]._source.categories;
            this.categoryLoaded =true;
          }
      ).catch(() => {
        this.categoryLoaded = true;
        this.listCategories = [];
      });
    },
    provideCache(){
      this.$store.commit("insertCookies");
    },
    submitNewCategory(){
      if(this.listCategories.includes(this.newCategory)){
        this.hideInputWarning = false;
        setTimeout(() => this.hideInputWarning = true, 1500);
      }else{
        this.categoryLoaded = false;
        this.listCategories.push(this.newCategory);
        if(this.id != ""){
          ElasticCategoryService.updateCategory(this.id, this.listCategories).then(
              (response) => {
                console.log(response.data);
                this.categoryLoaded = true;
              }
          );
        }else{
          ElasticCategoryService.createInitialCategory(this.errorType, this.listCategories).then(
              (response) => {
                console.log(response.data);
                this.categoryLoaded = true;
              }
          );
        }
      }
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