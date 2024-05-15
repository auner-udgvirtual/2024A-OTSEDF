<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
 <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <RouterLink to="/" class="navbar-brand">OTSEDF</RouterLink>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/tutorials" class="nav-link">Tutorials</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/add" class="nav-link">Add</RouterLink>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <RouterView />
    </div>
  </div>

</template>

