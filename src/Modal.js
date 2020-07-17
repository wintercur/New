/* eslint-disable no-console */
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Rating } from 'primereact/rating';
import { Calendar } from 'primereact/calendar';
import { addNote, updateNote } from './api';

import './App.css';
import './index.css';

const Modal = ({ updateData, displayModal, setDisplayModal }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState();
  const [rating, setRating] = useState(0);

  const createNote = () => {
    addNote({ text, title, rating, date })
      .then(() => {
        updateData();
        hideModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handUpdateNote = () => {
    updateNote({ text, title, rating, date, id: displayModal })
      .then(() => {
        updateData();
        hideModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onOk = () => {
    return displayModal === 'add' ? createNote() : handUpdateNote();
  };

  const hideModal = () => {
    setDisplayModal(false);
    setTitle();
    setText();
    setRating();
    setDate();
  };

  const renderFooter = (
    <div className="p-button-secondary">
      <Button
        label={displayModal === 'add' ? 'Create' : 'Update'}
        icon="pi pi-check"
        className="p-button-warning button"
        onClick={onOk}
        disabled={!text || !title || !date}
      />
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-warning button"
        onClick={() => hideModal()}
      />
    </div>
  );

  return (
    <div className="App">
      <Dialog
        className="modal"
        header={
          displayModal === 'add'
            ? "Create you're own note"
            : "Update you're note"
        }
        visible={!!displayModal}
        onHide={() => hideModal()}
        modal
        footer={renderFooter}
      >
        <div className="input">
          <InputText
            placeholder="I need to do..."
            tooltip="Enter your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputText
            placeholder="Go to store and etc."
            tooltip="Enter your text here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="cal-n-rat">
          <Calendar
            className="calendar"
            value={date}
            onChange={(e) => setDate(e.value)}
            appendTo={document.body}
            showButtonBar
            showWeek
          />
          <div className="rate">
            importance: {rating}
            <Rating
              className="rate"
              value={rating}
              cancel={false}
              onChange={(e) => setRating(e.value)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default Modal;
