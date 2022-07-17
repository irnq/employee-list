<template>
  <div>
    <v-data-table
      :headers="header"
      :items="stuff"
      class="elevation-1 table"
      sort-by="lastName"
      :search="search"
      :custom-filter="filterName"
      @click:row="openPersonPage"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Фильтр"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:footer>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialogMain"
            max-width="500px"
            @click:outside="close"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="primary"
                elevation="3"
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="updateDate"
              >
                Добавить сотрудника
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="editedItem.lastName"
                        label="Фамилия"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Имя"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="editedItem.middleName"
                        label="Отчество"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.position"
                        label="Должность"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-checkbox
                        label="Трудовая книжка"
                        v-model="editedItem.certificate"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-menu
                      v-model="dialogDataPicker"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.workFrom"
                          label="Дата выхода на работу"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.workFrom"
                        scrollable
                        @input="dialogDataPicker = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.salary"
                        label="Оклад"
                        prefix="₽"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedItem.rate"
                        label="Ставка"
                        :items="rates"
                        item-text="text"
                        item-value="value"
                      ></v-select
                    ></v-col>
                  </v-row>
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-card-text class="text-right mt-n9"
                      >{{
                        (editedItem.salary * editedItem.rate).toFixed(2)
                      }}
                      ₽</v-card-text
                    >
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Отмена
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5"
                >Вы действительно хотите удалить сотрудника?</v-card-title
              >
              <v-card-text class="text-center text-body-1"
                >{{ editedItem.lastName }} {{ editedItem.name }}
                {{ editedItem.middleName }}</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Отмена</v-btn
                >
                <v-btn color="red darken-1" text @click="deleteItemConfirm"
                  >Да</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem($event, item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem($event, item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-card-text @click="dialogMain = true">Тут пока пусто</v-card-text>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import {
  STUFF,
  HEADER,
  IPerson,
  DEFAULT_PERSON,
  Rate,
} from '../constant/stuff';
import Storage from '@/services/storage';

enum DialogTitles {
  newPerson = 'Новый сотрудник',
  editPerson = 'Редактирование',
}

const RATE_SELECT = [
  { text: 'Полная', value: Rate.full },
  { text: 'Половина', value: Rate.half },
];

export default defineComponent({
  name: 'StuffList',

  data() {
    return {
      stuff: [] as IPerson[],
      header: HEADER,
      search: '',
      editedIndex: -1,
      editedItem: Object.assign({}, DEFAULT_PERSON),
      defaultItem: Object.assign({}, DEFAULT_PERSON),
      dialogMain: false,
      dialogDelete: false,
      dialogDataPicker: false,
      rates: RATE_SELECT,
    };
  },

  computed: {
    formTitle(): DialogTitles {
      return this.editedIndex === -1
        ? DialogTitles.newPerson
        : DialogTitles.editPerson;
    },
  },

  methods: {
    filterName(value: string | null, search: string | null) {
      return (
        value !== null &&
        search !== null &&
        typeof value === 'string' &&
        value.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
      );
    },

    updateDate() {
      this.editedItem.workFrom = new Date().toISOString().split('T')[0];
    },

    editItem(e: MouseEvent, item: IPerson) {
      e.stopPropagation();
      this.editedIndex = this.stuff.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogMain = true;
    },

    deleteItem(e: MouseEvent, item: IPerson) {
      e.stopPropagation();
      this.editedIndex = this.stuff.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.stuff.splice(this.editedIndex, 1);
      this.updateBase();
      this.closeDelete();
    },

    close() {
      this.dialogMain = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.stuff[this.editedIndex], this.editedItem);
      } else {
        this.stuff.push(this.editedItem);
      }
      this.updateBase();
      this.close();
    },

    openPersonPage(item: IPerson) {
      router.push(item.id);
    },

    updateBase() {
      Storage.data.base = [...this.stuff];
      Storage.saveData();
    },
  },

  created() {
    new Storage();
    if (!Storage.data.base) {
      Storage.data.base = [...STUFF];
      Storage.saveData();
    }
    this.stuff = [...Storage.data.base];
  },
});
</script>

<style scoped>
.table >>> tr {
  cursor: pointer;
}
</style>
