<script>
import router from "@/router";
import axios from 'axios';
export default {
  data() {
    return {
      timeLogs: [],
    }
  },
  methods: {
    twoDigits(number){ return number.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })},
    getTime(){
      const today = new Date("2022-08-25T20:33:32");
      // var date = today.getFullYear()+'-'+this.twoDigits(today.getMonth()+1)+'-'+this.twoDigits(today.getDate());
      // var time = this.twoDigits(today.getHours()) + ":" + this.twoDigits(today.getMinutes()) + ":" + this.twoDigits(today.getSeconds());
      // var dateTime = date+'T'+time;
      console.log(today.getHours());
    }
  },
  mounted() {
    if (this.$store.state.user != ''){
    
    } else if(localStorage.getItem('user')!='') {
      this.$store.commit('saveUser', JSON.parse(localStorage.getItem('user')));
      router.push('/')
    }
  },
}
</script>

<template lang="">
    <div>
        <Button class="mt-44" @click="getTime">aaaaaa</Button>
    </div>
</template>

<style lang="">
    
</style>