<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Short Links</h1>
      <div class="card blue darken-1">
        <div class="card-content white-text">
          <span class="card-title mb-30">Authorization</span>
          <div>
            <div class="input-field">
              <input 
                placeholder="Enter email" 
                id="email" 
                type="text"
                name="email"
                class="yellow-input"
                v-on:change="changeHandler"
              />
              <label for="email" class="active">Email</label>
            </div>
            <div class="input-field">
              <input 
                placeholder="Enter password" 
                id="password" 
                type="password"
                name="password"
                class="yellow-input"
                v-on:change="changeHandler"
              />
              <label for="password" class="active">Password</label>
            </div>
          </div>
        </div>
        <div class="card-action">
          <button 
            class="btn yellow darken-4 mr-10"
            v-on:click="loginHandler"
            :disabled="loading"
          >Sign in</button>
          <button 
            class="btn grey lighten-1 black-text"
            v-on:click="registerHandler"
            :disabled="loading"
          >Sign up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters['http/loading']
    }
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem('userData'))

    if (data && data.token) {
      this.$store.dispatch('auth/login', data)
      this.$router.replace({ path: '/create' })
		}
  },
  methods: {
    changeHandler: function (event) {
      this.form = {...this.form, [event.target.name]: event.target.value}
    },
    loginHandler: async function (event) {
      const formData = {
        url: '/api/auth/login',
        method: 'POST',
        body: {
          email: this.form.email, 
          password: this.form.password
        }
      }
      try {
        const data = await this.$store.dispatch('http/request', formData)
        this.$store.dispatch('auth/login', data)
        this.$router.replace({ path: '/create' })
      } catch (e) {
        window.M.toast({html: this.$store.getters['http/error']})
      }
    },
    registerHandler: async function(event) {
      const formData = {
        url: '/api/auth/register',
        method: 'POST',
        body: {
          email: this.form.email, 
          password: this.form.password
        }
      }
      try {
        const data = await this.$store.dispatch('http/request', formData)
        window.M.toast({html: data.message})
      } catch (e) {
        window.M.toast({html: this.$store.getters['http/error']})
      }
    }
  }
}
</script>

<style>
  .mr-10 {
    margin-right: 10px;
  }

  .mb-30 {
    margin-bottom: 30px!important;
  }

  input.yellow-input {
    border-bottom: 1px solid #fff!important;
    box-shadow: 0 1px 0 0 solid #fff!important;
  }

  input.yellow-input + label {
    color: #fff!important;
  }

  input.yellow-input:focus + label {
    color: #ffeb3b!important;
  }

  input.yellow-input:focus {
    border-bottom: 1px solid #ffeb3b!important;
    box-shadow: 0 1px 0 0 solid #ffeb3b!important;
  }
</style>
