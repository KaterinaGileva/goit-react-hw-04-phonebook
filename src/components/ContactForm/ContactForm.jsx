import  React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export function ContactForm ({ onSubmit }) {
    
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState('');
       
  

  const handleChange = event => {
        
        switch (event.target.name) {
          case 'name':
            setName(event.target.value);
            setId(nanoid(8));
            break;
    
          case 'number':
            setNumber(event.target.value);
            break;
    
          default:
            return;
        }
     };

  const  handleSubmit = event => {
        event.preventDefault();
        onSubmit(id, name, number);
        setName('');
        setNumber('');
        setId('');
      };

        return (
           <form className={css.form} onSubmit={handleSubmit}>
               <label className={css.name} >
                 Name
                 <input
                   type="text"
                   name='name'
                   value={name}
                   className={css.input}
                   onChange={handleChange}
                         
                   pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                   title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                   required
                 /> 
               </label> 
               <label className={css.number} >
                  Number 
                 <input
                   type="tel"
                   name='number'
                   value={number}
                   className={css.input}
                   onChange={handleChange}
                   
                   pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                   title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                   required
               />
               </label>
            <button type="submit" className={css.formBtn}>Add contact</button>
       </form>
           );
         }
    

   