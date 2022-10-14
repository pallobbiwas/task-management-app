<template lang="">
  <div class="navabr">
    <ul>
      <li><nuxt-link to="/login">Login</nuxt-link></li>
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/task">Task</nuxt-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
}
</script>
<style scoped>
* {
  list-style: none;
  text-decoration: none;
}
.navabr {
  background-color: rgb(18, 18, 51);
  padding: 20px 70px;
}
ul {
  display: flex;
  justify-content: end;
}
a {
  margin: 0px 15px;
  background-color: whitesmoke;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bolder;
}
</style>
