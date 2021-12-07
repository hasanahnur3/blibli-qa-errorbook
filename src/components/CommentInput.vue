<template>
  <div class="container">
    <div class="card">
      <div class="card-body">

        <p><b>{{ username }}</b></p>
        <textarea class="form-control" placeholder="Leave a comment..." rows="3" v-model="comment" ></textarea>
        <button class="mt-3 btn btn-primary btn-sm" @click="createComment">Submit</button>

      </div>
    </div>
  </div>
</template>

<script>
import CommentService from "@/service/CommentService";

export default {
  name: "CommentInput",
  data() {
    return{
      comment: "",
    }
  },
  props: {
    username: String,
    errorType: String,
  },
  methods:{
    createComment(){
      CommentService.createComment(this.errorType, this.username, this.comment)
          .then(
              (response) => {
                console.log(response);
                this.$emit('update');
                this.comment = "";
              }
          );
    }
  },
  mounted() {
    this.$store.commit("updateCollab");
  }
}
</script>