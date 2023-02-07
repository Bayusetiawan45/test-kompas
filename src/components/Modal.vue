<template>
  <div
    class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
  >
    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    <div
      class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6 space-y-4"
    >
      <span class="text-xl font-semibold">Tambah Entri</span>
      <form @submit="submitForm">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input
            class="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nama"
            v-model="formValues.name"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
            Harga
          </label>
          <input
            class="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Harga"
            v-model="formValues.price"
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button
            class="bg-gray-500 text-xs py-2 px-3 rounded-sm text-white uppercase"
            @click="onCancel"
            type="reset"
          >
            Batal
          </button>
          <button
            type="sumbit"
            class="bg-purple-700 text-xs py-2 px-3 rounded-sm text-white uppercase"
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { postItems } from '../services/index';
import { randomUUID } from '../helpers/randomUUID';
import { getTime } from '../helpers/getTime';
import { mapActions } from 'vuex';

export default {
  name: 'Modal',
  props: ['handleToggleModal'],
  data() {
    return {
      formValues: {
        name: '',
        price: null,
      },
    };
  },
  methods: {
    onCancel() {
      this.handleToggleModal();
    },
    ...mapActions(['postItem']),
    randomUUID,
    getTime,
    async submitForm(e) {
      e.preventDefault();
      const id = this.randomUUID();
      const jam = this.getTime('time');
      const tanggal = this.getTime('fullDate');
      const data = {
        id,
        jam,
        tanggal,
        nama: this.formValues.name,
        pengeluaraan: this.formValues.price,
      };
      if (data.nama !== '' && data.pengeluaraan !== '') {
        const res = await postItems(data);
        this.postItem(res.data);
        this.handleToggleModal()
      }
    },
  },
};
</script>
