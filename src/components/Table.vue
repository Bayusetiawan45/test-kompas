<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th class="text-lg font-medium text-start" colspan="2">
          {{ data.date }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data.list_item"
        :key="item.id"
        class="border-t text-sm text-gray-500"
      >
        <td class="py-1 w-16">{{ item.jam }}</td>
        <td class="py-1 w-40">{{ item.nama }}</td>
        <td class="py-1">{{ currencyFormat(item.pengeluaraan) }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="font-bold border-t-2">
        <td></td>
        <td class="text-center">Total</td>
        <td>{{ currencyFormat(data.total) }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { currencyFormat } from '../helpers/formatCurrency'

export default {
  name: 'Table',
  props: ['data'],
  methods: {
    currencyFormat
  }
};
</script>
