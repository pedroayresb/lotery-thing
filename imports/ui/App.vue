<script>
import { defineComponent } from 'vue';
import { Meteor } from 'meteor/meteor';
import LotteryCollection from '../api/LotteryCollection';

export default defineComponent({
  name: 'App',
  meteor: {
    $subscribe: {
      'lottery': [],
    },
    lottery() {
      return LotteryCollection.find({});
    },
  },
  data() {
    return {
      oneToSixty: Array.from(Array(60).keys()).map(x => x + 1),
      orderByTimes: true,
      numbers: [],
      date: ''
    };
  },
  methods: {
    dateFormater(date) {
      return date.toLocaleDateString('pt-br');
    },
    mostRepeated(lottery) {
      const numbers = lottery.map(lott => lott.numbers).flat();
      const mostRepeated = numbers.reduce((acc, num) => {
        acc[num] = acc[num] ? acc[num] + 1 : 1;
        return acc;
      }, {});
      const mostRepeatedWithCount = Object.entries(mostRepeated).map(([key, value]) => ({ key, value }));
      const sorted = mostRepeatedWithCount.sort((a, b) => b.value - a.value);
      return sorted;
    },
    appearedTimes(lottery, number) {
      const numbers = lottery.map(lott => lott.numbers).flat();
      return numbers.filter(num => num === number).length;
    },
    missingNumbers(lottery) {
      const numbers = lottery.map(lott => lott.numbers).flat();
      const missingNumbers = this.oneToSixty.filter(x => !numbers.includes(x));
      return missingNumbers;
    },
    DatesWhenAppeared(lottery, number) {
      const dates = lottery.filter(lott => lott.numbers.includes(+(number))).map(lott => lott.date);
      return dates;
    },
    orderByNumber(lottery) {
      const numbers = lottery.map(lott => lott.numbers).flat();
      const mostRepeated = numbers.reduce((acc, num) => {
        acc[num] = acc[num] ? acc[num] + 1 : 1;
        return acc;
      }, {});
      const mostRepeatedWithCount = Object.entries(mostRepeated).map(([key, value]) => ({ key, value }));
      const sorted = mostRepeatedWithCount.sort((a, b) => a.key - b.key);
      return sorted;
    },
    addLottery() {
      const numbers = this.numbers.split(',').map(x => +x);
      const { date } = this;
      Meteor.call('lottery.insert', { numbers, date });
    }
  },
});

</script>

<template>
  <div class="p-8 flex flex-row">
    <div class="flex flex-col">
      <div v-for="(lott, index) in lottery" :key="index" class="flex flex-row items-center">
        <p class="p-6">{{ dateFormater(lott.date) }}</p>
        <div v-for="(num, index) in lott.numbers" :key="index" class="flex flex-row">
          <p class="p-6 border rounded-full">{{ num }}</p>
        </div>
      </div>
    </div>
    <div class="p-6">
      <p>Mais repetidos</p>
      <form>
        <label>
          <input type="radio" v-model="orderByTimes" value="true" />
          por vezes
        </label>
        <label>
          <input type="radio" v-model="orderByTimes" value="false" />
          por ordem
        </label>
      </form>
      <div v-for="(num, index) in (orderByTimes === 'true' ? mostRepeated(lottery) : orderByNumber(lottery))" :key="index" class="flex flex-col p-6 border rounded-full">
        <p>{{ num.key }}: {{ num.value }} vezes</p>
        <div class="flex flex-row">
          <p v-for="(date) in DatesWhenAppeared(lottery, num.key)" :key="date" class="p-6">{{ dateFormater(date) }}</p>
        </div>
      </div>
    </div>
    <div class="p-6">
      <p>nao apareceram</p>
      <div v-for="(num, index) in missingNumbers(lottery)" :key="index" class="flex flex-row">
        <p class="p-6 border rounded-full">{{ num }}</p>
      </div>
    </div>
    <form class="p-6 border rounded-xl h-fit">
      <label>
        Numeros: 
        <input type="text" v-model="numbers" class="p-2 border rounded-xl" />
      </label>
      <label>
        Data:
        <input type="date" v-model="date" class="p-2 border rounded-xl" />
      </label>
      <button type="button" @click="addLottery" class="p-2 border rounded-xl">Adicionar</button>
    </form>
  </div>
</template>
