import { createStore } from 'vuex';
import { getTime } from '../helpers/getTime';

export default createStore({
  state: {
    items: [],
    total_expenses: null,
  },
  getters: {
    items: (state) => state.items,
    total_expenses: (state) => state.total_expenses,
  },
  actions: {
    getItems({ commit }, item) {
      commit('getAllItems', item);
    },
    postItem({ commit }, item) {
      commit('postItem', item);
    },
  },
  mutations: {
    getAllItems(state, item) {
      const groupedItem = item.reduce((acc, curr) => {
        const date = curr.tanggal;
        const indexOfItem = acc.findIndex((item) => item.date === date);

        const now = getTime('fullDate');

        if (date.includes(now)) {
          state.total_expenses =
            state.total_expenses + parseInt(curr.pengeluaraan);
        }

        if (indexOfItem === -1) {
          const newFormOfObject = {
            date: date,
            list_item: [curr],
            total: parseInt(curr.pengeluaraan),
          };
          acc.push(newFormOfObject);
          return acc;
        }
        acc[indexOfItem].list_item.push(curr);
        acc[indexOfItem].total =
          parseInt(curr.pengeluaraan) + acc[indexOfItem].total;
        return acc;
      }, []);
      const sortGroupedItem = groupedItem.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      state.items = sortGroupedItem;
    },
    postItem(state, item) {
      const { id, jam, nama, pengeluaraan } = item;
      const newItem = {
        id,
        jam,
        date: item.tanggal,
        nama,
        pengeluaraan,
      };
      const indexOfItem = state.items.findIndex(
        (stateItem) => stateItem.date === newItem.date
      );
      if (indexOfItem === -1) {
        const newFormOfObject = {
          date: newItem.date,
          list_item: [newItem],
        };
        state.items.unshift(newFormOfObject);
        return;
      }
      state.items = [
        ...state.items.slice(0, indexOfItem),
        {
          ...state.items[indexOfItem],
          list_item: [...state.items[indexOfItem].list_item, item],
          total: state.items[indexOfItem].total + parseInt(pengeluaraan),
        },
        ...state.items.slice(indexOfItem + 1),
      ];
      state.total_expenses = state.total_expenses + parseInt(pengeluaraan);
    },
  },
});
