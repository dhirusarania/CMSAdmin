<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom" style="display: flex; justify-content: center">
          <form>
            <h2 style="margin-bottom: 20px; text-align: center">Edit About CMS</h2>
            <label>Title</label>
            <input type="text" id="title" placeholder="Title" class="form-style" v-model="title" />
            <label>About Image</label>
            <input
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
              style="margin-top: 30px; margin-bottom: 30px"
            />
            <div style="margin-bottom: 30px;">
              <p>Current Image:</p>
              <p>
                <a :href="image_url" target="_blank" style="cursor: pointer;">
                  {{
                  image_name
                  }}
                </a>
              </p>
            </div>
            <label>About Info</label>
            <div id="editor-container" style="min-height: 300px"></div>

            <button
              @click="updateAboutCMS"
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
let EditorJS, Header, List, Image, quill;


export default {
  data() {
    return {
      title: "",
      status: "",
      image_name: "",
      image_url: "",
      file: "",
      info: []
    };
  },
  mounted() {
    this.getAboutCMSById();

        quill = new Quill("#editor-container", {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image"],

          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }]
        ]
      },
      placeholder: "Write Product Description here...",
      theme: "snow"
    });

    quill.on("text-change", function() {
      this.delta = quill.getContents();
    });
  },
  methods: {
    handleFileUpload: function() {
      this.file = this.$refs.file.files[0];
    },

    getAboutCMSById: function() {
      var payload = new FormData();
      payload.append("id", this.$route.params.id);
      this.$store.dispatch("getAboutCMSById", payload).then(res => {
        console.log(res.data);
        this.status = res.data.active;
        this.title = res.data.title;
        if (res.data.about_image !== null) {
          this.image_url = res.data.about_image;
          this.image_name = res.data.about_image.slice(41);
        }
        console.log(JSON.parse(res.data.about_info))
          quill.setContents(JSON.parse(res.data.about_info));
      });
    },

    updateAboutCMS: function() {
        var payload = new FormData();
        payload.append("id", this.$route.params.id);
        payload.append("title", this.title);
        payload.append("active", this.status);
        if (this.file) {
          payload.append("about_image", this.file);
        }
        payload.append("about_info", JSON.stringify(quill.getContents()));
        this.$store.dispatch("updateAboutCMS", payload).then(res => {});
        this.$router.push("/CMS/about");
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


