<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom" style="display: flex; justify-content: center">
          <form>
            <h2 style="margin-bottom: 20px; text-align: center">Edit About Us (Footer)</h2>
            <label>Title</label>
            <input type="text" id="title" placeholder="Title" class="form-style" v-model="title" />
            <label>About Us</label>
            <textarea class="form-control" v-model="about"></textarea>

            <h4 style="padding-top: 20px">Social</h4>
            <label>Facebook</label>
            <input
              type="text"
              id="title"
              placeholder="Facebook"
              class="form-style"
              v-model="facebook"
            />
            <label>Twitter</label>
            <input
              type="text"
              id="title"
              placeholder="Twitter"
              class="form-style"
              v-model="twitter"
            />
            <label>Google+</label>
            <input type="text" id="title" placeholder="Google+" class="form-style" v-model="google" />
            <label>Pinterest</label>
            <input
              type="text"
              id="title"
              placeholder="Pinterest"
              class="form-style"
              v-model="pinterest"
            />
            <label>Youtube</label>
            <input
              type="text"
              id="title"
              placeholder="Youtube"
              class="form-style"
              v-model="youtube"
            />

            <button
              @click="updateFooterCMS"
              type="button"
              class="btn btn-primary"
              style="background-color:rgb(76, 175, 80); color: white; display: block; margin-left:auto; margin-right:auto; padding: 10px 30px; margin-top: 30px"
            >Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      about: "",
      status: "",
      facebook: "",
      twitter: "",
      google: "",
      pinterest: "",
      youtube: ""
    };
  },
  mounted() {
    this.getFooterCMSById();
  },
  methods: {
    getFooterCMSById: function() {
      var payload = new FormData();
      payload.append("id", this.$route.params.id);
      this.$store.dispatch("getFooterCMSById", payload).then(res => {
        this.status = res.data.active;
        this.title = res.data.title;
        this.about = res.data.about_us;

        this.facebook = res.data.facebook;
        this.twitter = res.data.twitter;
        this.google = res.data.google;
        this.pinterest = res.data.pinterest;
        this.youtube = res.data.youtube;
      });
    },

    updateFooterCMS: function() {
      var payload = new FormData();
      payload.append("id", this.$route.params.id);
      payload.append("title", this.title);
      payload.append("active", this.status);
      payload.append("about_us", this.about);


      payload.append("facebook", this.facebook);
      payload.append("twitter", this.twitter);
      payload.append("google", this.google);
      payload.append("pinterest", this.pinterest);
      payload.append("youtube", this.youtube);

      this.$store.dispatch("updateFooterCMS", payload).then(res => {});
      this.$router.push("/CMS/footer");
    }
  }
};
</script>

<style>
.form-style {
  display: block;
  margin-bottom: 20px;
  width: 680px;
  padding: 8px 14px;
}

@media (max-width: 37.5em) {
  .form-style {
    width: 300px;
  }
}

@media (min-width: 37.5em) and (max-width: 75em) {
  .form-style {
    width: 500px;
  }
}

input,
textarea,
select {
  outline: none;
  border: 1px solid #b0b0b0;
  border-radius: 3px;
  color: #606060;
}
</style>


