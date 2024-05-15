<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <RouterLink :to="'/tutorials/' + currentTutorial.id" class="btn btn-warning">Edit</RouterLink>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import TutorialService from '@/services/TutorialService'
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const tutorials = ref([])
const currentTutorial = ref(null)
const currentIndex = ref(-1)
const title = ref('')

function retrieveTutorials() {
  TutorialService.getAll()
    .then(res => {
      tutorials.value = res.data.tutorials
      console.log(res.data)
    })
  .catch(err => console.log(err))
}

function refreshList() {
  retrieveTutorials()
  currentTutorial.value = null
  currentIndex.value = -1
}

function setActiveTutorial(tutorial, index) {
  currentTutorial.value = tutorial
  currentIndex.value = tutorial ? index : -1
}

function removeAllTutorials() {
  TutorialService.removeAll()
    .then(res => {
      tutorials.value = res.data
      refreshList()
    })
    .catch(err => console.log(err))
}

function searchTitle() {
  TutorialService.findByTitle(title.value)
    .then(res => {
      tutorials.value = res.data.tutorials
      setActiveTutorial(null)
    })
    .catch(err => console.log(err))
}

onMounted(() => {
  retrieveTutorials()
})
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
