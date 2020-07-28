<template>
  <table>
    <thead>
      <tr>
        <th>№</th>
        <th>Source link</th>
        <th>Short link</th>
        <th>Open</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(link, index) in links" :key="link._id">
        <td>{{index + 1}}</td>
        <td>{{link.from}}</td>
        <td>{{link.to}}</td>
        <td>
          <a href="#" @click.prevent="goTo(link._id)">Open</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    links: Array,
    default() {
      return []
    }
  },
  methods: {
    goTo(id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>
