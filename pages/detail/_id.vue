<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else>
    <LinkCard :link="link"/>
  </div>
</template>

<script>
import LinkCard from '@/components/LinkCard'
import Loader from '@/components/Loader'
export default {
  middleware: ['auth'],
  data() {
    return {
      link: {}
    }
  },
  components: {
    LinkCard
  },
  computed: {
    loading () {
      return this.$store.getters['http/loading']
    }
  },
  mounted() {
    const linkId = this.$router.history.current.params.id
    
    const formData = {
      url: `/api/link/${linkId}`,
      method: 'GET',
      headers: {Authorization: `Bearer ${this.$store.getters['auth/token']}`}
    }
    const getLink = async () => {
      try {
        const fetched = await this.$store.dispatch('http/request', formData)
        this.link = {...fetched}
      } catch (e) {}
    }
    getLink()
  }
}
</script>
