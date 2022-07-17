<template>
  <div>
    <v-card
      v-if="!person"
      class="my-3 mx-md-auto mx-3 blue-grey lighten-5 pb-4"
      max-width="940px"
      elevation="5"
      center
    >
      <v-card-title class="text-h4 nowrap justify-center mb-4"
        >Сотрудник не найден</v-card-title
      >
      <router-link to="/" class="d-block mt-12 mx-auto link"
        ><v-btn color="primary">Вернуться</v-btn></router-link
      >
    </v-card>
    <v-card
      v-else
      class="my-3 mx-md-auto mx-3 blue-grey lighten-5 pb-4"
      max-width="940px"
      elevation="5"
      center
    >
      <v-card-title class="text-h4 nowrap justify-center mb-4"
        >Информация о сотруднике</v-card-title
      >
      <v-row class="text-body-1 px-4 justify-center">
        <v-col cols="12" sm="3" class="font-weight-bold">Фамилия</v-col>
        <v-col cols="12" sm="3">{{ person.lastName }}</v-col>
      </v-row>
      <v-row class="text-body-1 px-4 justify-center">
        <v-col cols="12" sm="3" class="font-weight-bold">Имя</v-col>
        <v-col cols="12" sm="3">{{ person.name }}</v-col>
      </v-row>
      <v-row class="text-body-1 px-4 justify-center">
        <v-col cols="12" sm="3" class="font-weight-bold">Отчество</v-col>
        <v-col cols="12" sm="3">{{ person.middleName }}</v-col>
      </v-row>
      <v-row class="text-body-1 px-4 justify-center">
        <v-col cols="12" sm="3" class="font-weight-bold">Должность</v-col>
        <v-col cols="12" sm="3">{{ person.position }}</v-col>
      </v-row>
      <v-row class="text-body-1 px-4 justify-center">
        <v-col cols="12" sm="3" class="font-weight-bold">Трудовая книжка</v-col>
        <v-col cols="12" sm="3">{{
          person.certificate ? 'Есть' : 'Нет'
        }}</v-col>
      </v-row>
      <v-row class="text-body-1 px-4 justify-center">
        <v-col cols="12" sm="3" class="font-weight-bold">Оклад</v-col>
        <v-col cols="12" sm="3">₽{{ person.salary }}</v-col>
      </v-row>
      <v-row class="text-body-1 px-4 justify-center">
        <v-col cols="12" sm="3" class="font-weight-bold"
          >Дата выхода на работу</v-col
        >
        <v-col cols="12" sm="3">{{ formattedDate }}</v-col>
      </v-row>
      <v-row class="text-body-1 px-4 justify-center">
        <v-col cols="12" sm="3" class="font-weight-bold">Ставка</v-col>
        <v-col cols="12" sm="3">{{ getRate }}</v-col>
      </v-row>
      <router-link to="/" class="d-block mt-12 mx-auto link"
        ><v-btn color="primary">Вернуться</v-btn></router-link
      >
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Storage from '@/services/storage';
import { IPerson, Rate } from '@/interfaces/types';

export default Vue.extend({
  name: 'PersonView',

  data() {
    return {
      id: this.$route.params.id,
    };
  },

  computed: {
    person(): IPerson | undefined {
      if (!Storage.data) {
        new Storage();
      }
      if (!Storage.data.base) {
        return;
      }
      return Storage.data.base.find((user) => user.id === this.id);
    },

    formattedDate(): string | undefined {
      if (!this.person) {
        return;
      }
      return new Date(this.person.workFrom).toLocaleDateString();
    },

    getRate(): string | undefined {
      if (!this.person) {
        return;
      }
      return this.person.rate === Rate.full ? 'Полная' : 'Половина';
    },
  },
});
</script>

<style scoped>
.nowrap {
  white-space: normal;
  word-break: normal;
}
.link {
  width: min-content;
}
</style>
