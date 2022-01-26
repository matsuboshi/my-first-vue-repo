<script>
import api from './api'
export default {
  name: 'App',
  data() {
    return {
      list: [{ id: 1, title: 'hello world' }],
      title: '',
      isUpdateMode: false,
      currentUpdateId: ''
    }
  },
  methods: {
    async handleDelete(id) {
      await api(
        '/tasks/' + id,
        {
          method: 'DELETE'
        },
        false
      )
      debugger
      await this.revalidate()
    },
    async revalidate() {
      const data = await api('/tasks')
      this.list = data
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
      this.title = ''
      await this.revalidate()
      this.isUpdateMode = false
      this.title = ''
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
      <input type="text" v-model="title" />
      <button class="btn-create">CREATE</button>
    </form>

    <form v-else @submit.prevent="handleUpdateSubmit">
      <input type="text" v-model="title" />
      <button class="btn-update">UPDATE</button>
    </form>

    <div>
      <div class="card" v-for="item in list" :key="item.id">
        <p>{{ item.title }}</p>
        <button @click="handleUpdate(item.id, item.title)">EDIT</button>
        <button @click="handleDelete(item.id)">DELETE</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  padding: 5px 5px 20px 5px;
}

.card {
  border: solid 2px black;
}

.btn-create {
  background-color: rgb(115, 255, 73);
}

.btn-update {
  background-color: rgb(255, 255, 94);
}
</style>
