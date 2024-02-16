<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import { useCrudStore } from '../stores/tutorials';
import { useRouter } from 'vue-router';


export default {
  name: "add-tutorial",
  data() {
    return {
      store: useCrudStore(),
      router: useRouter(),
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        id: Math.random().toString(36).substr(2, 9),
        title: this.tutorial.title,
        description: this.tutorial.description,
        published: false
      };

      console.log(data);
      this.store.addItem(data);
      this.router.push({ name: 'tutorials' });

    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
