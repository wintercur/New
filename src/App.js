/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Fieldset } from 'primereact/fieldset';
import moment from 'moment';
import { getAllNotes, deleteNote } from './api';
import './index.css';
import './App.css';
import Modal from './Modal';

const App = () => {
  const json = require('./NotesData.json');
  const [notes, setNotes] = useState([]);
  const [displayModal, setDisplayModal] = useState();
  const readNotes = () => getAllNotes().then((data) => setNotes(data));

  useEffect(() => {
    readNotes();
  }, []);

  const handelDeleteNote = (id) => {
    deleteNote(id)
      .then(() => {
        readNotes();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showEditModal = (notes) => {
    setDisplayModal(notes);
    
  };

  const showModal = () => {
    setDisplayModal('add');
  };

  return (
    <div className="App">
      <div className="text-11">Welcome to the Light Up Notes</div>
      <Fieldset
        className="description"
        legend="Tap to here if you want to hide this massage"
        toggleable
      >
        Sticky Notes! is the ultimate application to quickly create sticky notes
        and reminders.
      </Fieldset>
      <Button
        label="Add new one"
        className="p-button-warning"
        icon="pi pi-plus"
        onClick={() => showModal()}
      />
      <Modal
        updateData={readNotes}
        setDisplayModal={setDisplayModal}
        displayModal={displayModal}
      />
      {json.map(({ text, title, rating, _id, date }) => (
        <Card id="card" className="child" key={_id}>
          <Rating className="first" value={rating} cancel={false} />
          <div className="text-1">{title}</div>
          <div className="text">{text}</div>
          <div className="text-2">{moment(date).format('MMMM Do YYYY')}</div>
          <Button
            icon="pi pi-refresh"
            id="button"
            label="Update"
            className="p-button-raised p-button-info"
            onClick={() => showEditModal(notes)}
          />
          <Button
            icon="pi pi-times"
            id="button"
            label="Delete"
            className="p-button-raised p-button-danger"
            onClick={() => handelDeleteNote(_id)}
          />
        </Card>
      ))}
    </div>
  );
};
export default App;
