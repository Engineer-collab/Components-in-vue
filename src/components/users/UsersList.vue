<template>
  <ul>
    <button @click="Input">Confirm</button>
    <button @click="SavedChanges">Saved Changes</button>
  </ul>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      saved: false,
    };
  },
  methods: {
    SavedChanges() {
      console.log(this.saved)
      this.saved = true;
      console.log(this.saved)
    },
    Input() {
      this.$router.push('/teams');
    },
    
  },
  inject: ['users'],
  beforeRouteEnter(to, from, next) {
      console.log(to, from);
      console.log('before route enter at userlist.vue');
      next();
    },
    beforeRouteLeave(to, from, next) {
      console.log('Before route leave guard userlist.vue');
      console.log(to, from);
      if (this.saved) {
        next();
      } 
      else {
        const barak = window.confirm(
          'Do you really want to leave? you have unsaved changes!'
        );
        next(barak);
      }
    },
    unmounted() {
      console.log('unmounted');
    },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>