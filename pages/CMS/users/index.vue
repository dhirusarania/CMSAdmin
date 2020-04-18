<template>
  <div class="navbar-spacing padding-top-30">
    <div class="holder">
      <h3 style="display: flex;align-items: center;">All Users</h3>
      <div class="row">
        <vue-good-table :columns="columns" :rows="all_startups" :line-numbers="true">
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'date_joined'">
              <p>{{props.row.date_joined.split("T")[0]}}</p>
            </span>

            <span v-else>{{ props.formattedRow[props.column.field] }}</span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    all_startups: [],
    subadmin_name: "",
    subadmin_phone: "",
    subadmin_email: "",
    subadmin_password: "",
    showDropdown1: false,
    columns: [
      {
        label: "Username",
        field: "username"
      },
      {
        label: "First Name",
        field: "first_name"
      },
      {
        label: "Last Name",
        field: "last_name"
      },
      {
        label: "Email",
        field: "email"
      },
      {
        label: "Joined Date",
        field: "date_joined"
      }
    ],
    rows: []
  }),

  mounted() {
    this.getAllStartup();
    // this.getBrand();
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      console.log(value);
      return value.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  },
  methods: {
    getAllStartup: function() {
      this.$store.dispatch("all_users").then(res => {
        console.log(res);
        this.all_startups = res.data;
      });
    },
    getId: function(e, id) {
      var payload = new FormData();
      payload.append("id", id);
      payload.append("featured", e.target.checked);
      this.$store.dispatch("makefeaturedById", payload).then(res => {
        this.getAllStartup();
      });
    },
    changeStatus: function(id, status) {
      this.$store
        .dispatch("changeUserStatus", {
          id: id,
          status: status
        })
        .then(res => {
          console.log(res);
          this.getAllSubAdmin();
        });
    },
    EditCommission: function(id) {
      this.openSubCatModel();
      this.selected_category = id;
      this.sub_select();
    },
    addSubCategory: function() {
      this.closeSubCatModel();

      var payload = {
        category: this.selected_category,
        name: this.sub_Category
      };

      this.$store.dispatch("addSubCategory", payload).then(res => {
        console.log(res);
        this.sub_Category = "";
        // this.category = JSON.parse(JSON.stringify(res.data));
      });
    },
    addsubadmin: function() {
      var payload = {
        name: this.subadmin_name,
        email: this.subadmin_email,
        password: this.subadmin_password,
        phone_number: this.subadmin_phone
      };

      this.$store.dispatch("addSubAdmin", payload).then(res => {
        console.log(res);
        this.closeSubCatModel();
        this.getAllSubAdmin();
      });
    },
    getBrand: function() {
      this.$store.dispatch("getBrand", this.subcategory_selected).then(res => {
        console.log(res);
        this.brand = res.data;
      });
    },
    deleteCategory: function(id) {
      this.$store.dispatch("deleteCategory", id).then(res => {
        console.log(res);
        this.getCategory();
        this.getBrand();
      });
    },
    deleteSubCategory: function(id) {
      this.$store.dispatch("deleteSubCategory", id).then(res => {
        console.log(res);
        this.getBrand();
      });
    },
    deleteBrand: function(id) {
      this.$store.dispatch("deleteBrand", id).then(res => {
        console.log(res);
        this.getBrand();
      });
    },
    openDropdownPanel: function() {
      this.showDropdown = true;
      this.sub_Category = "";
      this.selected_category = 0;
    },
    openSubCatModel: function() {
      this.showDropdown1 = true;
    },
    closeDropdownPanel: function() {
      this.showDropdown = false;
      this.newCategory = "";
    },
    closeSubCatModel: function() {
      this.subadmin_name = "";
      this.subadmin_phone = "";
      this.subadmin_email = "";
      this.subadmin_password = "";
      this.showDropdown1 = false;
    }
  }
};
</script>

<style scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

input {
  height: 35px;
  font-family: "Regular";
  margin: 0 10px 10px 0;
  border-radius: 0;
  outline: none;
  width: 100%;
  resize: vertical;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  box-shadow: none;
  border: 1px solid rgb(169, 169, 169);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.popup-main {
  background-color: white;
  margin: auto;
  position: absolute;
  max-width: 400px;
  height: 700px;
  left: 260px;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 5px;
}

.popup-body {
  height: 552px;
  overflow: auto;
  padding: 30px;
}

.popup-title {
  padding: 30px 30px 16px;
  border-bottom: 1px solid #00000024;
}
.popup-action {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 25px;
  box-shadow: 0px -7px 10px 0px #0000000d;
}

.popup:after {
  background-color: rgba(0, 0, 0, 0.83);
  margin: auto;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.btn-success {
  background-color: #4caf50;
  color: white;
}

/* Dropdown */

.dropdown {
  display: inline-block;
  position: relative;
}

.dd-button {
  display: inline-block;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px 30px 10px 20px;
  background-color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
}

.dd-button:after {
  content: "";
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
}

.dd-button:hover {
  background-color: #eeeeee;
}

.dd-input {
  display: none;
}

.dd-menu {
  position: absolute;
  top: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0;
  margin: 2px 0 0 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  list-style-type: none;
  z-index: 9;
  right: 0;
}

.dd-menu {
  display: none;
}

.dd-input:checked + .dd-menu {
  display: block;
}

.dd-menu li {
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
}

.dd-menu li:hover {
  background-color: #f6f6f6;
}

.dd-menu li a {
  display: block;
  margin: -10px -20px;
  padding: 10px 20px;
}

.dd-menu li.divider {
  padding: 0;
  border-bottom: 1px solid #cccccc;
}

/* table {
    width: 300px;
    overflow-x: scroll;
    display: block;
}
thead, tbody {
    display: block;
}
tbody {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 140px;
}
td, th {
    min-width: 100px;
} */

table.vgt-table {
  border: 0;
}
</style>
