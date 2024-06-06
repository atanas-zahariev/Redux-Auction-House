import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './index.css';

import { store } from './app/store';
import { getItems } from './slices/itemsSlice';
import { getNotifications } from './slices/notificationsSlice';

import { back4appApi } from './services/back4Dataservice';

import Parse from 'parse/dist/parse.min.js';

Parse.initialize('gyK4yLMJ7Vkdxl10WEuLToXTqtUYiumw8UqPxTmQ', 'Y2Jq1AYuOe08rQbA8rbB3atRQnSEInRgFEFMRGLM');

Parse.serverURL = 'https://parseapi.back4app.com/';


// async function saveNewPerson() {
//   const Person = Parse.Object.extend('Person');
//   const person = new Person();
//   // const pointer = Person.createWithoutData('hXElJvaZMp');
//   person.set('name','secondRecord');
//   person.set('age',36);
//   person.set('pointer', { '__type': 'Pointer', 'className': '_User', 'objectId': '5dpgWG9xYd' });
//   try {
//     const result = await person.save();
//     console.log(result);
//   } catch (error) {
//      console.log(error.message);
//   }
// }

// saveNewPerson();

//Reading your First Data Object from Back4App
// async function retrievePerson() {
//   const query = new Parse.Query('Person');

//   try {
//     const person = await query.get('RDro0kMZ6y');
//     // const name = person.get('name');
//     // const age = person.get('age');
//     const { name, age, userPointer} = person.attributes;
//     console.log(`Name: ${name} age: ${age} pointer ${JSON.stringify(userPointer)}`);
//   } catch (error) {
//     alert(`Failed to retrieve the object, with error code: ${error.message}`);
//   }
// }

// retrievePerson();

// async function updatePerson() {
//   const Person = Parse.Object.extend('Person');
//   const query = new Parse.Query('Person');
//   try {
//     const person = await query.get('RDro0kMZ6y');
//     const pointer = Person.createWithoutData('hXElJvaZMp');
//     person.set('userPointer', pointer);
//     await person.save();
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// updatePerson();

// async function removeField(){
//   const query = new Parse.Query('Person');
//   try {
//     const person = await query.get('rOShoyesAz');
//     person.unset('age');
//     await person.save();
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// removeField();

// async function deletePerson() {
//   const query = new Parse.Query('Person');

//   try {
//     const person = await query.get('rOShoyesAz');
//     await person.destroy();
//   } catch (error) {
//     console.log(error);
//   }
// }

// deletePerson();

///// Query -->

async function equalTo(){
  const Person = Parse.Object.extend('Person');
  const query = new Parse.Query(Person);
  query.equalTo('name','firstRecord');
  try {
    const result = await query.find();
    console.log(result);
    const id = result[0].id;
    const row = await query.get(id);
    console.log(row.attributes);
  } catch (error) {
    console.log(error);
  }
}

equalTo();

// async function notEqualTo(){
//   // const Person = Parse.Object.extend('Person');
//   // console.log(Person);
//   const query = new Parse.Query('Person');
//   query.notEqualTo('name','firstRecord');
//   try {
//     const result = await query.find();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// notEqualTo();


window.api = back4appApi();
async function fetchItemBeforeRender() {

  await store.dispatch(getItems());

  await store.dispatch(getNotifications());

  const container = document.getElementById('root');

  if (container) {
    const root = createRoot(container);

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
    );
  } else {
    throw new Error(
      'Root element with ID \'root\' was not found in the document. Ensure there is a corresponding HTML element with the ID \'root\' in your HTML file.',
    );
  }
}

fetchItemBeforeRender();
