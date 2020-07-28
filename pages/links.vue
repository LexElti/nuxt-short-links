<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else>
    <LinksList :links="links"/>
  </div>
</template>

<script>
import LinksList from '@/components/LinksList'
import Loader from '@/components/Loader'
export default {
  middleware: ['auth'],
  data() {
    return {
      links: []
    }
  },
  components: {
    LinksList, Loader
  },
  computed: {
    loading () {
      return this.$store.getters['http/loading']
    }
  },
  mounted() {
    const linkId = this.$router.history.current.params.id
    
    const formData = {
      url: `/api/link`,
      method: 'GET',
      headers: {Authorization: `Bearer ${this.$store.getters['auth/token']}`}
    }
    const fetchLinks = async () => {
      try {
        const fetched = await this.$store.dispatch('http/request', formData)
        this.links = [...fetched]
      } catch (e) {}
    }
    fetchLinks()
  }
}
</script>