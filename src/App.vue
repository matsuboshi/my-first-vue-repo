<script>
import api from './api'
export default {
  name: 'App',
  data() {
    return {
      list: [
        { id: 1, title: 'LOADING...' },
        { id: 2, title: 'LOADING...' },
        { id: 3, title: 'LOADING...' },
        { id: 4, title: 'LOADING...' },
        { id: 5, title: 'LOADING...' },
        { id: 6, title: 'LOADING...' }
      ],
      title: '',
      isUpdateMode: false,
      currentUpdateId: '',
      isListEmpty: false
    }
  },
  methods: {
    isRowUpdating(id) {
      return id === this.currentUpdateId
    },
    async handleDelete(id) {
      await api(
        '/tasks/' + id,
        {
          method: 'DELETE'
        },
        false
      )
      await this.revalidate()
    },
    async revalidate() {
      const data = await api('/tasks')
      this.list = data
      this.isListEmpty = this.list.length === 0
    },
    async handleCreateSubmit() {
      const data = { title: this.title, description: this.title }
      await api('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      this.title = ''
      await this.revalidate()
    },
    async handleUpdateSubmit() {
      const data = { title: this.title, description: this.title }
      await api('/tasks/' + this.currentUpdateId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      await this.revalidate()
      this.isUpdateMode = false
      this.title = ''
      this.currentUpdateId = ''
    },
    async handleUpdate(id, title) {
      this.currentUpdateId = id
      this.isUpdateMode = true
      this.title = title
    }
  },
  async created() {
    await this.revalidate()
  }
}
</script>

<template>
  <div>
    <h1>Hello World</h1>
    <form v-if="!isUpdateMode" @submit.prevent="handleCreateSubmit">
      <input type="text" v-model="title" placeholder="Write here" />
      <button class="btn-create">CREATE</button>
    </form>

    <form v-else @submit.prevent="handleUpdateSubmit">
      <input type="text" v-model="title" />
      <button class="btn-update">UPDATE</button>
    </form>

    <div>
      <div v-if="isListEmpty">NO DATA</div>
      <div v-else>
        <div
          class="card"
          v-for="item in list"
          :key="item.id"
          :class="{ 'highlight-update-row': isRowUpdating(item.id) }"
        >
          <p>
            <button class="btn-delete" @click="handleDelete(item.id)">
              <i class="fas fa-trash"></i>
            </button>
            <button
              class="btn-update"
              @click="handleUpdate(item.id, item.title)"
            >
              <i class="fas fa-edit"></i>
            </button>

            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,400;0,700;1,400;1,700&display=swap');

* {
  font-family: 'Roboto Condensed', sans-serif;
}

.card {
  background-color: rgb(191, 220, 214);
}

.btn-create {
  background-color: rgb(115, 255, 73);
  border-color: rgb(115, 255, 73);
}

.btn-update {
  background-color: rgb(255, 255, 94);
  border-color: rgb(255, 255, 94);
}

.btn-delete {
  background-color: rgb(226, 104, 104);
  border-color: rgb(226, 104, 104);
}

button {
  border-style: solid;
  margin: 4px;
}

.highlight-update-row {
  background-color: rgb(253, 253, 209) !important;
}
</style>
