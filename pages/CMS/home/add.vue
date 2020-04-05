<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom" style="display: flex; justify-content: center">
          <form>
            <h2 style="margin-bottom: 20px; text-align: center">Add Home CMS</h2>
            <label>Title</label>
            <input type="text" id="title" placeholder="Title" class="form-style" v-model="title" />
            <label>Header Text Line 1</label>
            <input type="text" id="line1" placeholder="Title" class="form-style" v-model="line1" />
            <label>Header Text Line 2</label>
            <input type="text" id="line2" placeholder="Title" class="form-style" v-model="line2" />
            <label>Search Box Label</label>
            <input type="text" id="line3" placeholder="Title" class="form-style" v-model="line3" />
            <label>Site Logo</label><br>
            <input
              type="file"
              id="logo"
              ref="logo"
              v-on:change="handleLogoUpload()"
              style=" margin-bottom: 30px"
            />
            <br>
            <label>Header Image</label><br>
            <input
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
              style="margin-bottom: 30px"
            />
            <br>
            <label>Site Color</label>
            <client-only placeholder="Loading...">
              <!-- <photoshop-picker v-model="colors"/> -->
              <chrome-picker :disableAlpha="true" v-model="color"/>
            </client-only>

            <label style="padding-top:30px">Privacy Policy</label>
            <div id="editor-container" style="min-height: 300px"></div>

            <button
              @click="addHomeCMS"
              type="button"
              class="btn btn-primary"
              style="background-color:rgb(76, 175, 80); color: white; display: block; margin-left:auto; margin-right:auto; padding: 10px 30px;"
            >Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let EditorJS, Header, List, Image, quill;
import { Chrome } from 'vue-color'

export default {
  data() {
    return {
      title: "",
      about_us: "",
      image_name: "",
      image_url: "",
      file: "",
      logo: "",
      line1: "",
      line2: "",
      line3: "",
      color: "var(--main-bg-color)"
    };
  },
  mounted() {

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
  components: {
    'chrome-picker': Chrome
  },
  methods: {
    handleFileUpload: function() {
      this.file = this.$refs.file.files[0];
    },
    handleLogoUpload: function() {
      this.logo = this.$refs.logo.files[0];
    },

    addHomeCMS: function() {
      var payload = new FormData();
      payload.append("title", this.title);
      payload.append("header_text_1", this.line1);
      payload.append("header_text_2", this.line2);
      payload.append("header_text_3", this.line3);
      payload.append("privacy_policy", quill.root.innerHTML);
      payload.append("site_color", this.color['hex']);
      if (this.file) {
        payload.append("header_img", this.file);
      }
      if (this.logo) {
        payload.append("logo", this.logo);
      }
      this.$store.dispatch("addHomeCMS", payload).then(res => {
        this.$router.push("/CMS/home");
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
