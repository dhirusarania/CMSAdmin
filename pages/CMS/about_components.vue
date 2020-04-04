<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div class="row ml-3">
          <button class="update--btn" @click="saveHomeComponents">Update</button>
        </div>
        <div class="row">
          <div class="col-6">
            <h3>Active Components</h3>
            <draggable
              class="dragArea list-group"
              :list="list1"
              :group="{ name: 'people', pull: pullFunction }"
              @start="start"
            >
              <div
                class="list-group-item"
                v-for="element in list1"
                :key="element.id"
              >{{ element.name }}</div>
            </draggable>
          </div>
          <div class="col-6">
            <h3>Inactive Dynamic Components</h3>
            <draggable class="dragArea list-group" :list="list2" group="people">
              <div
                class="list-group-item"
                v-for="element in list2"
                :key="element.id"
              >{{ element.name }}</div>
            </draggable>
          </div>
        </div>
        <p>Note: * marked are static Components</p>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
let idGlobal = 8;
export default {
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        {
          name: "Kaustubh",
          id: 5
        },
        {
          name: "Abhishek",
          id: 6
        }
      ],
      list2: [],
      static_data: []
    };
  },
  mounted() {
    this.getActiveComponents();
    this.getStaticComponents();
  },

  methods: {
    pullFunction() {
      return this.controlOnStart ? "clone" : true;
    },
    clone({ name }) {
      return { name, id: idGlobal++ };
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    },

 

    getStaticComponents: function() {
      this.$store.dispatch("getActiveStaticComponents").then(res => {
        console.log(res.data);
        var static_ = res.data.filter(v => v.name = '* ' + v.name)
        

        console.log(static_)
        console.log(this.list2)
          
          static_ = static_.filter(
            v => !this.containsObject(v, this.list2)
          );

          console.log(this.list2)

        for(var i = 0; i < static_.length; i++){
          this.list2.push(static_[i])
        }

          this.list2 = this.list2.filter(
            v => !this.containsObject_id(v, this.list1)
          );


        
      });
    },

    getActiveComponents: function() {
      this.$store.dispatch("getActiveComponentsGeneral", 4).then(res => {
        this.list1 = JSON.parse(res.data.value);
        this.getHomeComponents();
      });
    },

    getHomeComponents: function() {
      this.$store.dispatch("getActiveComponentsGeneral", 1).then(res => {
        this.list2 = JSON.parse(res.data.value.replace(/'/g, '"'));
        this.getStaticComponents();
      });
    },
    saveHomeComponents: function() {

        var id = 4

        var payload = new FormData();
        payload.append("key", "Category");
        payload.append("value", JSON.stringify(this.list1));

        this.$store.dispatch("updateActiveComponentsGeneral", {payload , id}).then(res => {
          alert("About Components Updated Successfully");
        });
    },
        containsObject: function(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
          return true;
        }
      }
      return false;
    },
        containsObject_id: function(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        console.log("----")
        console.log(list[i].id)
        console.log(obj.id)
        if (list[i].id === obj.id) {
          console.log("Same")
          return true;
        }
      }
      return false;
    },
  }
};
</script>

<style>
.list-group {
  min-height: 39px;
  padding-bottom: 1px;
  border: 1px dashed #d2d2d2;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  cursor: move !important;
}
.handle {
  cursor: move !important;
}
.list-group-item i {
  cursor: pointer;
}
.sortable-chosen {
  background-color: #4caf50;
  color: white;
}

.update--btn {
  border: none;
  border-radius: 3px;
  padding: 4px 20px;
  font-size: 16px;
  background-color: #ffce10;
  color: black;
}

.update--btn:hover {
  background-color: #e4c443;
}

.update--btn:focus {
  outline: none;
}
</style>
