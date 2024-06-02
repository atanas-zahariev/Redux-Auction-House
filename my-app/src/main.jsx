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
//   const person = new Parse.Object('Person');

//   person.set('name', 'John Snow');
//   person.set('age', 27);
//   try {
//     let result = await person.save();
//     alert('New object created with objectId: ' + result.id);
//   } catch (error) {
//     alert('Failed to create new object, with error code: ' + error.message);
//   }
// }

// saveNewPerson();

//Reading your First Data Object from Back4App
// async function retrievePerson() {
//   const query = new Parse.Query('Person');

//   try {
//     const person = await query.get('mhPFDlCahj');
//     const name = person.get('name');
//     const age = person.get('age');

//     alert(`Name: ${name} age: ${age}`);
//   } catch (error) {
//     alert(`Failed to retrieve the object, with error code: ${error.message}`);
//   }
// }

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
