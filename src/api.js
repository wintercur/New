import axios from 'axios';

const getAllNotes = () => {
  return axios.get('http://localhost:8000/notes/all').then(({ data }) => {
    return data;
  });
};
const addNote = ({ text, title, rating, date }) => {
  return axios
    .post('http://localhost:8000/notes/add', {
      text,
      title,
      rating,
      date,
    })
    .then(({ data }) => {
      return data;
    });
};
const deleteNote = (id) => {
  return axios
    .post('http://localhost:8000/notes/delete', { id })
    .then(({ data }) => {
      return data;
    });
};

const updateNote = ({ text, title, rating, date, id }) => {
  return axios
    .post('http://localhost:8000/notes/update', {
      text,
      title,
      rating,
      date,
      id,
    })
    .then(({ data }) => {
      return data;
    });
};
export { getAllNotes, addNote, deleteNote, updateNote };
