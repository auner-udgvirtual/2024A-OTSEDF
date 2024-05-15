<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="btn btn-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="btn btn-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="btn btn-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <button type="submit" class="btn btn-success"
      @click="updateTutorial"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script setup>
import TutorialService from '@/services/TutorialService'
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute()
const currentTutorial = ref(null)
const message = ref('')


function getTutorial(id) {
  TutorialService.get(id)
    .then(res => {
    currentTutorial.value = res.data.tutorial
    })
    .catch(err => console.log(err))
}

function updatePublished(status) {
  var data = {
    id: currentTutorial.value.id,
    title: currentTutorial.value.title,
    description: currentTutorial.value.description,
    published: status,
  }

  TutorialService.update(currentTutorial.value.id, data)
    .then(res => {
      console.log(res.data)
      currentTutorial.value.published = status;
      message.value = 'The status was updated successfully!'
    })
    .catch(e => console.log(e))
}

function updateTutorial() {
  TutorialService.update(currentTutorial.value.id, currentTutorial.value)
    .then(res => {
      console.log(res.data)
      message.value = 'The status was updated successfully!'
    })
    .catch(err => console.log(err))

}

function deleteTutorial() {
  TutorialService.remove(currentTutorial.value.id)
  .then(res => {
    console.log(res.data);
    router.push({ name: "tutorials" });
  })
  .catch(err => console.log(err));
}

onMounted(() => {
  message.value = ''
  getTutorial(route.params.id)
})
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
