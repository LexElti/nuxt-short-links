export default function({store, redirect}) {
  const data = JSON.parse(localStorage.getItem('userData'))

  if (data && data.token) {
    store.dispatch('auth/login', data)
  }
  if (!store.getters['auth/isAuth']) {
    redirect('/')
  }
}
