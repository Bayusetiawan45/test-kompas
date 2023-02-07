import axios from 'axios';

export const getAllItems = async () => {
  try {
    const res = await axios.get('http://localhost:3000/detail');
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postItems = async (data) => {
  try {
    const res = await axios.post('http://localhost:3000/detail', data);
    if (res.status === 201) return res;
  } catch (error) {
    console.log(error);
  }
};
