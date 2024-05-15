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

      <button @click="saveTutorial" class="btn btn-success mt-2">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script setup>
import TutorialDataService from '@/services/TutorialService'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const tutorial = ref({
  id: null,
  title: "",
  description: "",
  published: false
})
const submitted = ref(false)

function saveTutorial() {
  var data = {
    id: Math.random().toString(36).substr(2, 9),
    title: tutorial.value.title,
    description: tutorial.value.description,
    published: false
  }

  TutorialDataService.create(data)
    .then(res => {
      tutorial.value.id = res.data.id
      console.log(res.data)
      submitted.value = true 
      router.push({ name: 'tutorials' })   
    })
    .catch(e => console.log(e))
}

function newTutorial() {
  submitted.value = false
  tutorial.value = {}
}
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
