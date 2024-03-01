<script setup lang="ts">
import { RouterLink, RouterView} from 'vue-router'
import {ref, computed} from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import ExtraView from '@/views/ExtraView.vue'
//defineEmits(['changeEvent'])
defineProps({
  lighttheme: Boolean})
const lightTheme = {
  backgroundColor : "white",
  textColor : "black",
  h1_color : "darkblue"
}
const darkTheme = {
  backgroundColor : "slatgray",
  textColor : "white",
  h1_color : "orange"
}

const lightThemeBool = ref(false)

const currentTheme = computed(() => {
  return lightThemeBool.value ? lightTheme:darkTheme
  }
)

console.log(darkTheme.backgroundColor)
</script>

<template>
  <div class="body_div">
    <header class="header">
      <div>
        <h1 class="title">Der Titel</h1>
      </div>


        <nav class="nav_pos">
            <RouterLink class="white" to="/">Home</RouterLink>
            <RouterLink class="white" to="/about">About</RouterLink>
            <RouterLink class="white" to="/extra">Extra</RouterLink>
            <RouterLink  class="white" to="/schlaeger">Schläger Clicker</RouterLink>
        </nav>

    </header>
    <div class="router_div">

        <RouterView v-slot:="{Component}" lightThemeBool @changeEvent="() => lightThemeBool = !lightThemeBool">
          <keep-alive>
            <Component :is="Component"></Component>
          </keep-alive>
        </RouterView>

    </div>
  </div>
</template>

<style scoped>

:deep(h1), h1 {
  color: v-bind(currentTheme.h1_color);
}
:deep(.div), :deep(.text) {
  background-color: v-bind(currentTheme.backgroundColor);
  color: v-bind(currentTheme.textColor);
}

header {
  line-height: 1.5;
  height: 10vh;
}
.white {
  color: white;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 0rem;
}

nav a.router-link-exact-active {
  color: orange;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a.router-link-active {
  color: orange;
}


nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding-top: 1.7rem;
    padding-left: 1rem;
  }
}
.title {
  font-weight: bold;
  color: white;
  width: max-content;
  margin-left: 1rem;

}
.body_div {
  height: 100vh;
  width: 100vw;
}
.header {
  display: flex;
  padding: 0;
  overflow: auto;
  background-image: url('@/assets/240_F_693859476_IjUDUYODjaAoGO6HessQnfyFVPWrhOZz.jpg');
  background-size: cover;
}
.nav_pos {
  width: fit-content;
  margin-bottom: 0rem;
  height: 100%;
}
.router_div {
  height: 90vh;
}
</style>
