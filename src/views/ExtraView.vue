<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['changeEvent'])
const props = defineProps({lighttheme: Boolean})

const my_input = ref('')

function changeTheme() {
  emit('changeEvent')
  console.log('$emit ausgeführt')
}
</script>

<template>
  <div class="div" >
    <h1 class="extra_div">This is the extra page</h1>
      <h2 class="extra_div">Hier steht der Untertitel</h2>
      <input v-model="my_input" placeholder="Schreib was" />
      <img class="float_left" alt="" src="@/assets/juancover.jpg" width="250" height="250"/>
      <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam
                dolor, eu lacinia lorem placerat vulputate. Duis felis orci, pulvinar id metus
                ut, rutrum luctus orci. Cras porttitor imperdiet nunc, at ultricies tellus
                laoreet sit amet. Sed auctor cursus massa at porta. Integer ligula ipsum,
                tristique sit amet orci vel, viverra egestas ligula. Curabitur vehicula tellus
                neque, ac ornare ex malesuada et. In vitae convallis lacus. Aliquam erat
                volutpat. Suspendisse ac imperdiet turpis. Aenean finibus sollicitudin eros
                pharetra congue. Duis ornare egestas augue ut luctus. Proin blandit quam nec
                lacus varius commodo et a urna. Ut id ornare felis, eget fermentum sapien.
      </p>
      <p>
        {{my_input}}
      </p>
    <br>

    <button @click="changeTheme(); console.log('Button Pressed')">{{props.lighttheme ? 'Dark Mode':'Light Mode'}}</button>


  </div>
</template>

<style scoped>
.extra_div {
  text-align: center;
}
.text {
  margin: 3px;
}
.float_left {
  float: left;
  margin: 5px;
}

.div {
  width: 100%;
  height: 100%;

}
</style>