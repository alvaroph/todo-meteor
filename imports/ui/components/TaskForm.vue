<template>
<div>
  <ul>
    <li>hola</li>
  </ul>
  <form className="new-task" @submit.prevent="handleSubmit">
    <label for="">Inserta la tarea</label>
    <input
      type="text"
      placeholder="Pon aquí la tarea"
      v-model="newTask"
    />
    <button type="submit">Añadir tarea</button>
  </form>
  </div>
</template>

<script>
  import Vue from "vue";
  import { TasksCollection } from "../../api/TasksCollection";

  export default {
    data() {
      return {
        newTask: ""
      }
    },
    methods: {
      handleSubmit(event) {
         TasksCollection.insert({
          text: this.newTask,
          createdAt: new Date() // current time
        });

      // Clear form
      this.newTask = "";
      }
    },
}
</script>

<style scoped>
li{
  color:green;
}
</style>