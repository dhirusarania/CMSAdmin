<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div id="fb-editor"></div>
        <!-- <button class="btn btn-primary" id="click" style="margin-top: 10px">Update Form</button> -->
        <button class="btn btn-primary" id="click" style="margin-top: 10px">Save Form</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValue: [],
      formBuilder: {}
    };
  },
  mounted() {
    var that = this
    this.$store.dispatch("getContactForm").then(res => {
      jQuery(function($) {

        var formm = res.data.form

        if(formm == "" || formm == null){
          formm = "[]"
        }

        var options = {
          defaultFields: JSON.parse(res.data.form)
        };
        var $fbEditor = document.getElementById("fb-editor");
        var formBuilder = $($fbEditor).formBuilder(options);

        console.log(this.formBuilder);

        document.addEventListener("fieldAdded", function() {
          this.formValue = formBuilder.formData;
        });
        document.getElementById("click").addEventListener("click", function() {
          this.formValue = formBuilder.actions.getData();
          localStorage.setItem("form", JSON.stringify(this.formValue));

          var payload = new FormData();
          payload.append("id", 1);
          payload.append("title", "Contact Form");

          this.formValue = formBuilder.actions.getData();
          localStorage.setItem("form", JSON.stringify(this.formValue));

          payload.append("form", localStorage.getItem("form"));
          that.$store.dispatch("updateContactForm", payload).then(res => {
            localStorage.removeItem("form");
          });
        });
      });
    });
  },

  methods: {
    saveFormData: function() {
      var payload = new FormData();
      payload.append("id", 1);
      payload.append("title", "Contact Form");

      this.formValue = this.formBuilder.actions.getData();
      localStorage.setItem("form", JSON.stringify(this.formValue));

      payload.append("form", localStorage.getItem("form"));
      this.$store.dispatch("updateContactForm", payload).then(res => {
        localStorage.removeItem("form");
      });
    }
  }
};
</script>

<style>
#fb-editor .form-actions.btn-group {
  display: none;
}
</style>