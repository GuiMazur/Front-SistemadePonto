<script>
import router from "@/router";
import axios from 'axios';
import TimeLogShower from "@/components/TimeLogShower.vue";

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
      const today = new Date();
      let date = today.getFullYear()+'-'+this.twoDigits(today.getMonth()+1)+'-'+this.twoDigits(today.getDate());
      let time = this.twoDigits(today.getHours()) + ":" + this.twoDigits(today.getMinutes()) + ":" + this.twoDigits(today.getSeconds());
      let dateTime = date+'T'+time;
      return dateTime;
    },
    recordArrive(){
      axios.post('http://localhost:8000/api/timerecorder', {"tipo": "entrada", "timeLog": this.getTime(), "user_id": this.$store.state.user.id, "password": this.$store.state.user.password}).then(r=>alert("Informação registrada com sucesso.")).catch(e=>alert(e))
    },
    recordExit(){
      axios.post('http://localhost:8000/api/timerecorder', {"tipo": "saida", "timeLog": this.getTime(), "user_id": this.$store.state.user.id, "password": this.$store.state.user.password}).then(r=>alert("Informação registrada com sucesso.")).catch(e=>alert(e))
    },
    test(){console.log(this.timeLogs)}
  },
  async mounted() {
    if(localStorage.getItem('user') && !this.$store.state.user) {
      this.$store.commit('saveUser', JSON.parse(localStorage.getItem('user')));
    };
    if(this.$store.state.user){
      let response = await axios.get(`http://localhost:8000/api/getlogs/${this.$store.state.user.id}`);
      this.timeLogs = response.data
    };
  },
  components:{
    TimeLogShower,
  }
}
</script>

<template lang="">
    <div class="bg-blue-100 h-screen border pt-36">
      <div class="flex justify-around h-16">
        <button class="w-32 h-14 bg-green-500 text-black rounded" @click="recordArrive">Registrar Chegada</button>
        <button class="w-32 h-14 bg-red-500 text-black rounded" @click="recordExit">Registrar Saída</button>
      </div>
      <TimeLogShower :timeLogs="timeLogs" />
    </div>
</template>

<style lang="">
    
</style>