<template>
  <div class="row">
    <div class="col s8 offset-s2 pt-2">
      <div class="input-field">
        <input 
          placeholder="Enter link" 
          id="link" 
          type="text"
          :value="link"
          v-on:change="changeHandler"
          v-on:keypress="pressHandler"
        />
        <label for="link" class="active">Enter link</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      link: ''
    }
  },
  methods: {
    changeHandler: function (event) {
      this.link = event.target.value
    },
    pressHandler: async function (event) {
      if (event.key === 'Enter') {
        const formData = {
          url: '/api/link/generate',
          method: 'POST',
          body: {from: this.link},
          headers: {Authorization: `Bearer ${this.$store.getters['auth/token']}`}
        }
        try {
          const data = await this.$store.dispatch('http/request', formData)
          this.$router.replace({ path: `/detail/${data.link._id}` })
        } catch (e) {}
      }
    }
  }
}
</script>

<style>
  .pt-2 {
    padding-top: 2rem!important;
  }
</style>
