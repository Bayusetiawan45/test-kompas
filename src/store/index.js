import { createStore } from 'vuex';
import { getTime, monthName } from '../helpers/getTime';

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
    getItemsFromStore({ commit }, item) {
      commit('getItemsFromStore', item);
    },
    addItemToStore({ commit }, item) {
      commit('addItemToStore', item);
    },
  },
  mutations: {
    getItemsFromStore(state, item) {
      // grouping data by date
      const groupedItem = item.reduce((acc, curr) => {
        const now = getTime('noDay');

        // reusable variable
        const date = curr.tanggal;
        const indexOfItem = acc.findIndex((item) => item.date === date);

        // format date per curr item to Februari 2023 / Month Years
        const newDate = new Date(date);
        const month = `${monthName[newDate.getMonth()]}`;
        const years = newDate.getFullYear();
        const newCurrDate = `${month} ${years}`;

        // check all items includes current month
        if (newCurrDate.includes(now)) {
          state.total_expenses =
            state.total_expenses + parseInt(curr.pengeluaraan);
        }

        // if nothing list item at curr month
        if (indexOfItem === -1) {
          const newFormOfObject = {
            date,
            list_item: [curr],
            total: parseInt(curr.pengeluaraan),
          };
          acc.push(newFormOfObject);
          return acc;
        }

        // if list item at curr month already exist
        acc[indexOfItem].list_item.push(curr);

        // update new field total
        acc[indexOfItem].total =
          parseInt(curr.pengeluaraan) + acc[indexOfItem].total;
        return acc;
      }, []);
      const sortGroupedItem = groupedItem.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      state.items = sortGroupedItem;
    },
    addItemToStore(state, item) {
      // form input value
      const { id, jam, nama, pengeluaraan } = item;
      const newItem = {
        id,
        jam,
        date: item.tanggal,
        nama,
        pengeluaraan,
      };
      // reusable variable
      const indexOfItem = state.items.findIndex(
        (stateItem) => stateItem.date === newItem.date
      );
      // if nothing item at curr month
      if (indexOfItem === -1) {
        const newFormOfObject = {
          date: newItem.date,
          list_item: [newItem],
          total: parseInt(pengeluaraan),
        };
        state.items.unshift(newFormOfObject);
        // update total expenses state
        state.total_expenses = state.total_expenses + parseInt(pengeluaraan);
        return;
      }
      // if item at curr month already exist
      state.items = [
        ...state.items.slice(0, indexOfItem),
        {
          ...state.items[indexOfItem],
          list_item: [...state.items[indexOfItem].list_item, item],
          total: state.items[indexOfItem].total + parseInt(pengeluaraan),
        },
        ...state.items.slice(indexOfItem + 1),
      ];
      // update total expenses state
      state.total_expenses = state.total_expenses + parseInt(pengeluaraan);
    },
  },
});
