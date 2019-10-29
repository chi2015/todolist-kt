<template>
    <div class="main">
        <div class="head">
            <h1>Задачи</h1>
            <div v-bind:class="{ sort: true, asc: isAsc(), desc: isDesc()}" @click="switchSort()"></div>
        </div>
         <addTodo v-model="addTodoTitle"/>
        <div class="todo-list" v-if="!loading">
            <todo v-for="(todo, index) in todos" v-bind:index="(page-1)*per_page + index + 1" v-bind:todoItem="todo" v-bind:key="index"/>
        </div>
        <div class="loading" v-if="loading">Загрузка...</div>
        <paginator/>
    </div>
</template>

<script>

import Todo from './Todo'
import Paginator from './Paginator'
import AddTodo from './AddTodo'

import db from '../db'

export default {
  name: 'Main',
  data() {
      return {
          sort: 'asc',
          loading: false
      }
  },
  created() {
      console.log('page', this.page)
      if (!this.$store.getters.DB_LOADED) {
      this.loading = true
      db.collection('todos').get().then(snapshot => {
            snapshot.forEach(doc => {
                const todo = {
                    title: doc.data().title || '',
                    done: doc.data().done || false,
                    doc_id: doc.id
                }
                this.$store.dispatch("addTodo", todo) 
            })
            this.loading = false
            this.$store.dispatch("setItems", this.$store.getters.TODOS.length)
            this.$store.dispatch("dbLoaded");
        })
      }
  },
  computed: {
      todos() {
          let ret = this.$store.getters.TODOS.slice(0);
          ret.sort((a, b) => {
              let ret = this.sort == 'desc' ? 1 : -1
              if (a.getTitle < b.getTitle) return ret;
              else return -ret;
          })
          return ret.slice((this.page - 1) * this.per_page, this.page * this.per_page)
      },
      addTodoTitle() {
          return this.$store.getters.CURRENT_TODO ? this.$store.getters.CURRENT_TODO.getTitle : ''
      },
      page() {
          this.loading = true
          setTimeout(() => { this.loading = false }, 800)
          let page = parseInt(this.$route.params.page);
          if (Number.isNaN(page) || page < 1 || page > this.$store.getters.PAGES_COUNT) page = 1;
          this.$store.dispatch("setPage", page);
          return this.$store.getters.PAGE;
      },
      per_page() {
          return this.$store.getters.PER_PAGE
      },
      items() {
          return this.$store.getters.TODOS.length
      }
  },
  methods: {
      switchSort() {
          this.sort = this.sort == 'asc' ? 'desc' : 'asc'
      },
      isAsc() {
          return this.sort == "asc"
      },
      isDesc() {
          return this.sort == "desc"
      }
  },
  components: {
      todo: Todo,
      paginator: Paginator,
      addTodo: AddTodo
  }
}
</script>

<style>
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #d3dde0;
        border-radius: 5px;
        width: 100%;
    }
    .head {
        display:flex;
        flex-direction: row;
        align-items: center;
        margin: 5px 15px;
        height: 40px;
        width: 80%;
    }
    .todo-list {
        width: 80%;
    }
    .todo-list, .loading {
        height: 400px;
    }
    h1 {
        font-size: 18px;
        text-align: left;
        margin-right: 5px;
    }
    .icon-btn {
        display: block;
        background: none;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        margin: 2px;
        border: none;
        cursor: pointer;
    }
    .icon-btn:focus {
        outline:0;
    }
    .icon-btn.edit {
        background-image: url("../../static/edit.png");
    }
    .icon-btn.done {
        background-image: url("../../static/done.png");
    }
    .icon-btn.delete {
        background-image: url("../../static/delete.png");
    }
    .sort {
        width: 30px;
        height: 30px;
        background-image: url("../../static/sort.png");
        cursor: pointer;
    }
    .sort.desc {
        transform: rotate(180deg);
    }
</style>