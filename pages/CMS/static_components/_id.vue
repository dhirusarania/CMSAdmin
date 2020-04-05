<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom" style="display: flex; justify-content: center">
          <form>
            <h2 style="margin-bottom: 20px; text-align: center">Edit About CMS</h2>
            <label>Identifier</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              class="form-style"
              v-model="data.name"
            />
            <label>Title</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              class="form-style"
              v-model="data.title"
            />
            <label>Button Text</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              class="form-style"
              v-model="data.button"
            />
            <label>Button URL</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              class="form-style"
              v-model="data.button_url"
            />

            <br />
            <label>Background</label>
            <form>
              <div class="myradio">
                <input
                  type="radio"
                  name="myRadio"
                  id="one"
                  value="0"
                  v-model="background"
                  class="myradio__input"
                  checked
                />
                <label for="one" class="myradio__label">Image</label>
              </div>
              <div class="myradio">
                <input
                  type="radio"
                  name="myRadio"
                  id="two"
                  value="1"
                  v-model="background"
                  class="myradio__input"
                />
                <label for="two" class="myradio__label">Color</label>
              </div>
            </form>

            <div v-if="background == 1">
              <client-only placeholder="Loading...">
                <chrome-picker :disableAlpha="true" v-model="color" />
              </client-only>
            </div>

            <div v-if="background == 0">
              <label>Image</label>
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
                style="margin-top: 30px; margin-bottom: 30px"
              />
              <div style="margin-bottom: 30px;">
                <p>Current Image:</p>

                <img
                  style="width:100%;height:300px;object-fit:contain;object-position: left;"
                  :src="data.bgimage"
                  target="_blank"
                />
              </div>
            </div>

            <label style="margin-top: 30px">About Info</label>
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
import { Chrome } from "vue-color";

export default {
  data() {
    return {
      data: [],
      title: "",
      status: "",
      image_name: "",
      image_url: "",
      file: "",
      info: [],
      color: {
        hex: "#F7E18C"
      },
      background: 1
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
  components: {
    "chrome-picker": Chrome
  },
  methods: {
    handleFileUpload: function() {
      this.file = this.$refs.file.files[0];
    },

    getAboutCMSById: function() {
      this.$store
        .dispatch("getSingleStaticComponents", this.$route.params.id)
        .then(res => {
          console.log(res.data);
          this.data = res.data;
          this.title = res.data.title;
          if (res.data.bgcolor == 0) {
            this.background = 0;
          }
          if (res.data.about_image !== null) {
            this.image_url = res.data.bgimage;
          }
          quill.container.firstChild.innerHTML = res.data.content
        });
    },

    updateAboutCMS: function() {
      var payload = new FormData();
      var id = this.$route.params.id;
      payload.append("name", this.data.name);
      payload.append("title", this.data.title);
      payload.append("button", this.data.button);
      payload.append("button_url", this.data.button_url);

      payload.append("bgcolor", 0);
      if (this.background == 1) {
        payload.append("bgcolor", this.color["hex"]);
      } else if (this.background == 0 && this.file) {
        payload.append("bgimage", this.file);
      }
      payload.append("content",  quill.root.innerHTML);
      this.$store
        .dispatch("editStaticComponents", { payload, id })
        .then(res => {});
      this.$router.push("/CMS/static_components");
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
/* RADIO BUTTON STLYING BEGINS */
.myradio {
  display: inline-block;
  border-radius: 999px;
  margin: 5px;
}
.myradio__input {
  opacity: 0;
  position: absolute;
}
.myradio__label {
  border-radius: 9999px;
  padding: 3px 15px 8px 40px;
  cursor: pointer;
  position: relative;
  transition: all 0.5s;
}
.myradio__label::before {
  content: "";
  border-radius: 9999px;
  width: 16px;
  height: 16px;
  margin: 3px 0;
  position: absolute;
  z-index: 1;
}
.myradio__label::after {
  content: "";
  border-radius: 9999px;
  width: 12px;
  height: 12px;
  margin: 3px 0;
  position: absolute;
  z-index: 1;
}
.myradio__label::before {
  background-color: #dcdcdc;
  border: 2px solid #dcdcdc;
  top: 4px;
  left: 10px;
  transition: all 0.5s;
}
.myradio__label::after {
  background-color: #ffffff;
  top: 6px;
  left: 12px;
  transition: all 0.15s;
  transition-timing-function: ease-out;
}
.myradio__label:hover {
  background-color: rgba(114, 86, 248, 0.1);
}
.myradio__label:hover::before {
  border: 2px solid #7256f8;
}
.myradio__input:checked ~ .myradio__label::before {
  background-color: #7256f8;
  border: 2px solid #7256f8;
}
.myradio__input:checked ~ .myradio__label::after {
  width: 8px;
  height: 8px;
  top: 8px;
  left: 14px;
}
</style>


