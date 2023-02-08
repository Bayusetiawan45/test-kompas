<template>
  <Modal v-if="isOpenModal" :handleToggleModal="handleToggleModal" />
  <div class="flex flex-col items-center space-y-2">
    <h1 class="text-2xl">Diari Jajan {{ currentMonth }}</h1>
    <span>Pengeluaran bulan ini Rp.{{ total_expenses }}</span>
    <button
      class="bg-purple-700 text-xs py-2 px-3 rounded-sm text-white uppercase"
      @click="handleToggleModal"
    >
      Tambah Item
    </button>
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 pt-5">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="aspect-square p-4 rounded-md border"
      >
        <Table :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getAllItems } from './services/index';
import { getTime } from './helpers/getTime';

import Modal from './components/Modal.vue';
import Table from './components/Table.vue';

export default {
  name: 'App',
  data() {
    return {
      isOpenModal: false,
      currentMonth: getTime('noDay'),
    };
  },
  async mounted() {
    const items = await this.getAllItems();
    this.getItemsFromStore(items);
  },
  computed: {
    ...mapGetters(['items', 'total_expenses']),
  },
  methods: {
    ...mapActions(['getItemsFromStore']),
    getAllItems,
    handleToggleModal() {
      return (this.isOpenModal = !this.isOpenModal);
    },
  },
  components: {
    Modal,
    Table,
  },
};
</script>
