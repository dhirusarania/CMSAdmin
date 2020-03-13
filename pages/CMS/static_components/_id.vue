<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom" style="display: flex; justify-content: center">
          <form>
            <h2 style="margin-bottom: 20px; text-align: center">Edit About CMS</h2>
            <label>Identifier</label>
            <input type="text" id="title" placeholder="Title" class="form-style" v-model="data.name" />
            <label>Title</label>
            <input type="text" id="title" placeholder="Title" class="form-style" v-model="data.title" />
            <label>Button Text</label>
            <input type="text" id="title" placeholder="Title" class="form-style" v-model="data.button" />
            <label>Button URL</label>
            <input type="text" id="title" placeholder="Title" class="form-style" v-model="data.button_url" />
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

                <img style="width:100%;height:300px;object-fit:contain;object-position: left;" :src="data.bgimage" target="_blank">

            </div>
            <label>About Info</label>
            <div
              id="editorjs"
              class="rounded my-4 shadow-lg"
              style="border: 1px solid grey; padding: 30px; width:678px;"
            ></div>

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
let EditorJS, List, Paragraph;

if (process.browser) {
  EditorJS = require("@editorjs/editorjs");
  List = require("@editorjs/list");
  Paragraph = require("@editorjs/paragraph");
}

export default {
  data() {
    return {
      data: [],
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
  },
  methods: {
    handleFileUpload: function() {
      this.file = this.$refs.file.files[0];
    },

    getAboutCMSById: function() {
      this.$store.dispatch("getSingleStaticComponents", this.$route.params.id).then(res => {
        console.log(res.data);
        this.data = res.data;
        this.title = res.data.title;
        if (res.data.about_image !== null) {
          this.image_url = res.data.bgimage;
        }
        this.info = JSON.parse(res.data.content);
        this.editor = new EditorJS({
          holder: "editorjs",
          tools: {
            list: List,
            paragraph: {
              class: Paragraph,
              inlineToolbar: true
            }
          },
          data: { blocks: this.info }
        });
      });
    },

    updateAboutCMS: function() {
      this.editor.save().then(async outputData => {
        var payload = new FormData();
        var id = this.$route.params.id;
        payload.append("name", this.data.name);
        payload.append("title", this.data.title);
        payload.append("content", this.data.content);
        payload.append("button", this.data.button);
        payload.append("button_url", this.data.button_url);
        if (this.file) {
          payload.append("bgimage", this.file);
        }
        payload.append("content", JSON.stringify(outputData.blocks));
        this.$store.dispatch("editStaticComponents", {payload, id}).then(res => {});
        this.$router.push("/CMS/static_components");
      });
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


