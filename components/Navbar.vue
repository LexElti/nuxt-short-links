<template>
  <nav>
    <div class="nav-wrapper blue darken-1 pl-pr-4">
      <span class="brand-logo">Short Links</span>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><nuxt-link active-class="active" to="/create">Create</nuxt-link></li>
        <li><nuxt-link active-class="active" to="/links">Links</nuxt-link></li>
        <li><a exact active-class="active" href="/" @click="logoutHandler">Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logoutHandler: function (event) {
      event.preventDefault()
      this.$store.dispatch('auth/logout')
      this.$router.replace({ path: '/' })
    }
  }
}
</script>

<style>
  .pl-pr-4 {
    padding: 0 4rem;
  }

  nav ul li a.active {
    background-color: rgba(0,0,0,.1);
  }
</style>
