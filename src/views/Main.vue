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
    async getLogs(){
      let response = await axios.get(`http://localhost:8000/api/getlogs/${this.$store.state.user.id}`);
      this.timeLogs = response.data;
    },
    getTime(){
      const today = new Date();
      let date = today.getFullYear()+'-'+this.twoDigits(today.getMonth()+1)+'-'+this.twoDigits(today.getDate());
      let time = this.twoDigits(today.getHours()) + ":" + this.twoDigits(today.getMinutes()) + ":" + this.twoDigits(today.getSeconds());
      let dateTime = date+'T'+time;
      return dateTime;
    },
    recordArrive(){
      let timeLog = {"tipo": "entrada", 
      "timeLog": this.getTime(), 
      "user_id": this.$store.state.user.id, 
      "password": this.$store.state.user.password};
      axios.post('http://localhost:8000/api/timerecorder', timeLog).then(r => this.getLogs()).catch(e=>alert(e));
    },
    recordExit(){
      let timeLog = {"tipo": "saida", 
      "timeLog": this.getTime(), 
      "user_id": this.$store.state.user.id, 
      "password": this.$store.state.user.password};
      axios.post('http://localhost:8000/api/timerecorder', timeLog).then(r => this.getLogs()).catch(e=>alert(e));
    },
  },
  async mounted() {
    if(localStorage.getItem('user') && !this.$store.state.user) {
      this.$store.commit('saveUser', JSON.parse(localStorage.getItem('user')));
    };
    if(this.$store.state.user) await this.getLogs();
  },
  computed: {
    progress(){
        if(this.timeLogs.length > 0){let finalTimeInMinutes = this.$store.state.user.defaultExitTime*60;
        let arrivalTime = new Date(this.timeLogs[this.timeLogs.length-1].timeLog)
        let arrivalTimeInMinutes = arrivalTime.getHours()*60 + arrivalTime.getMinutes();
        let actualTime = new Date();
        let actualTimeInMinutes = actualTime.getHours()*60+actualTime.getMinutes();
        let progress = (actualTimeInMinutes - arrivalTimeInMinutes) * 100 / (finalTimeInMinutes - arrivalTimeInMinutes);
        console.log(finalTimeInMinutes, arrivalTimeInMinutes, actualTimeInMinutes);
        return progress>100 ? '100%' : Math.round(progress)+'%';}
    },
    showBar(){
      return (this.timeLogs.length > 0 && this.timeLogs[this.timeLogs.length-1].tipo == "entrada");
    }
  },
  components:{
    TimeLogShower,
  }
}
</script>

<template lang="">

    <div class="bg-blue-100 h-screen border pt-36 px-4">
      <div v-if='$store.state.user' class="flex items-center justify-center space-x-16 h-20">
        <button class="w-24 h-12 md:w-32 md:w-24 bg-green-500 text-black rounded" @click="recordArrive">Registrar Chegada</button>
        <div v-if='showBar' class="w-2/5 h-4 bg-gray-200 rounded-full dark:bg-gray-700">
          <div class="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded" :style="{'width': progress}"> {{progress}}</div>
        </div>
        <button class="w-24 h-12 md:w-32 md:w-24 bg-red-500 text-black rounded" @click="recordExit">Registrar Saída</button>
      </div>
      <TimeLogShower v-if='$store.state.user' :timeLogs="timeLogs" />
      <p v-else class="bg-white rounded border border-black m-auto mt-24 text-xl w-[300px] h-[280px] px-12 py-20 md:mt-12 md:text-2xl md:w-[450px] md:h-[400px] md:px-20 md:py-32">Você não está conectado a nenhuma conta, por favor faça Login para continuar.</p>
    </div>
</template>

<style lang="">

</style>