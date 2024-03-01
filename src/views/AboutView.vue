<template>
  <div class="bg">
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100%;
    display: flex;
    align-items: center;
  }
}
.bg {
  background-image: url('@/assets/cosmic-background-with-colorful-laser-lights-perfect-digital-wallpaper.jpg');
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
