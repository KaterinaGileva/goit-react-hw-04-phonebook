import React, { useState, useEffect } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import css from './App.module.css';
import { ContactForm } from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export function App() {
  const [contacts, setContacts] = useState(() => 
     JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  const addContact = (id, name, number) => {
   
    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? Report.warning(
          `${name}`,
          'This user is already in the contact list.',
          'OK'
        )
      : setContacts( state =>  [{ id, name, number }, ...state]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
};

useEffect(() => {
  window.localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1> 
      <ContactForm onSubmit={addContact} />

      <h2 className={css.subtitle}>Contacts</h2>
      
      <Filter value={filter} onChange={changeFilter} />
     
      {contacts.length > 0 && (
        <ContactList contacts={getVisibleContacts()} onDelete={deleteContact} />
      )}
    </div>
  );
}

