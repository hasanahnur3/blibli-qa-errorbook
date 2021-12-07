<template>
  <div class="pt-2">
    <div class="container" v-if="!isEditMode">
      <div class="row">
        <div class="col-4">
          <p class="text-md"><b>{{ username }}</b></p>
        </div>
        <div class="col-8 text-end">
          <p class="text-secondary text-opacity-75 text-sm"> created: {{ createdAt.slice(0, 19).replace(/-/g, "/").replace("T", " ") }} <span v-if="updatedAt != undefined">&nbsp;&nbsp;&nbsp;updated: {{ updatedAt.slice(0, 19).replace(/-/g, "/").replace("T", " ") }}</span></p>
        </div>
      </div>
      <p>{{ comment }}</p>
      <button v-if="hasAccess" class="m-1 btn btn-outline-primary btn-sm" @click="updateComment">Edit</button>
      <button v-if="hasAccess" class="m-1 btn btn-outline-danger btn-sm" @click="deleteComment">Delete</button>
      <hr>
    </div>

    <div class="container" v-if="isEditMode">
      <div class="row">
        <div class="col-8">
          <p><b>{{ username }}</b></p>
        </div>
        <div class="col-4 text-end">
          <p v-if="updatedAt === undefined">{{ createdAt }}</p>
          <p v-if="updatedAt != undefined">{{ updatedAt }}</p>
        </div>

        <textarea class="form-control m-3" rows="3" v-model="updatedComment" ></textarea>
        <div class="col mb-3">
            <button class="m-1 btn btn-primary btn-sm" @click="submitUpdateComment">Submit</button>
            <button class="m-1 btn btn-danger btn-sm" @click="cancelUpdateComment">Cancel</button>
        </div>
        <hr>
      </div>

    </div>
  </div>
</template>

<script>
import CommentService from "@/service/CommentService";

export default {
  name: "CommentCard",
  data() {
    return{
      hasAccess: Boolean,
      isEditMode: false,
      updatedComment: String,
    }
  },
  props: {
    username: String,
    errorType: String,
    comment: String,
    createdAt: String,
    updatedAt: String,
    id: String,
  },
  watch: {
    '$store.state.isLoggedIn': function() {
      this.hasAccess();
    }
  },
  methods:{
    updateComment(){
      this.updatedComment = this.comment;
      this.isEditMode = true;
    },
    deleteComment() {
      CommentService.deleteComment(this.id)
          .then(
              (response) => {
                console.log(response);
                this.$destroy();
                this.$el.parentNode.removeChild(this.$el);
              }
          );
    },
    cancelUpdateComment(){
      this.isEditMode = false;
    },
    submitUpdateComment(){
      CommentService.updateComment(this.id, this.updatedComment)
          .then(
              (response) => {
                console.log(response);
                this.comment = this.updatedComment;
                this.updatedComment = "";
                this.isEditMode = false;
              }
          );
    },
    checkAccess(){
      if(this.username == this.$cookies.get("badak-username")){
        this.hasAccess = true;
      }else{
        this.hasAccess = false;
      }
    }
  },
  mounted() {
    this.checkAccess()
  }
}
</script>