<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th class="text-lg font-medium">
          {{ item.date }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(udin, index) in item.list_item"
        :key="index"
        class="border-t text-sm text-gray-500"
      >
        <td class="py-1">{{ udin.jam }}</td>
        <td class="py-1">{{ udin.nama }}</td>
        <td class="py-1">{{ currencyFormat(udin.pengeluaraan) }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="font-bold border-t">
        <td colspan="2">Total</td>
        <td>{{ currencyFormat(item.total) }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { currencyFormat } from '../helpers/formatCurrency'

export default {
  name: 'Table',
  props: ['item'],
  methods: {
    currencyFormat
  }
};
</script>
