<template>
  <div class="app">
    <header>
      <div className="app-bar">
        <div className="app-header">
         <h1>📝️ To Do List
           <span v-if="incompleteCount > 0">({{incompleteCount}})</span>
         </h1>
        </div>
      </div>
    </header>
    <div class="main">
      <TaskForm />

      <div class="filter">
          <button              
              @click="toggleHideCompleted"
          >
            <span v-if="hideCompleted">Show All</span>
            <span v-else>Hide Completed Tasks</span>
          </button>
        </div>

      <ul class="tasks">
        <Task
            class="task"
            v-for="task in tasks"
            v-bind:key="task._id"
            v-bind:task="task"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Task from "./components/Task.vue";
import TaskForm from "./components/TaskForm.vue";
import { TasksCollection } from "../api/TasksCollection";

export default {
  components: {
    Task,
    TaskForm
  },
  data() {
     return {
      hideCompleted: false
    };
  },
  methods: {
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    }
  },
  meteor: {

    tasks() {
      //CONECTA CON MONGO Y RECUPERA LAS TAREAS ORDENADAS POR FECHA
        let filteredTasks = TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch();
        
        //SI QUIERES VER SOLO LAS NO ACABADAS; FILTRA TAREAS
        if (this.hideCompleted) {
          filteredTasks = filteredTasks.filter(task => !task.checked);
        }

        return filteredTasks;
      }
      ,
      incompleteCount() {
        //SE CONECTA A MONGO Y OBTIENE LA CANTIDAD DE TAREAS SIN ACABAR
        return TasksCollection.find({ checked: { $ne: true } }).count();
      }
   
  }
};
</script>
