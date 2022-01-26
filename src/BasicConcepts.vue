<script>
export default {
  data() {
    return {
      n1: '',
      n2: ''
    }
  },
  computed: {
    total() {
      return +this.n1 + +this.n2
    }
  },
  methods: {
    handleClick() {
      this.n1 = +this.n1 * 2
      this.n2 = +this.n2 * 2
    }
  }
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <input type="text" v-model="n1" />
  <input type="text" v-model="n2" />
  <span>{{ total }}</span>
  <button @click="handleClick">double</button>

  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>
