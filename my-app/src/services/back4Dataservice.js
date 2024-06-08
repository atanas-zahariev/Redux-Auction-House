import { back4AppRequest } from '../hooks/back4appApi';
import { clearUser, setUser, getUser } from './utility';
import Parse from 'parse/dist/parse.min.js';

Parse.initialize('gyK4yLMJ7Vkdxl10WEuLToXTqtUYiumw8UqPxTmQ', 'Y2Jq1AYuOe08rQbA8rbB3atRQnSEInRgFEFMRGLM');

Parse.serverURL = 'https://parseapi.back4app.com/';

Parse.User._saveCurrentUser = function (user) {
    // Не правим нищо, за да предотвратим съхранението в localStorage
};

Parse.User._clearCurrentUser = function () {
    // Не правим нищо, за да предотвратим изтриването от localStorage
};


export const back4appApi = () => {
    const { get, post, put, del } = back4AppRequest();

    const endpoints = {
        login: '/login',
        register: '/users',
        logout: '/logout',
        getItems: '/classes/Item',
        getSpecificDataWithId: '/classes/Item/',
        createItem: '/classes/Item',
        edit: '/classes/Item/',
        delete: '/house/delete/',
        closed: '/house/closed',
        action: '/house/userAction/',
        createNot: '/notification/createNotice',
        getAllNotices: '/notification/notices',
        getNotice: '/notification/notice/',
        noticeAnswer: '/notification/answer',
        deleteNotice: '/notification/notice/',
        editNotice: '/notification/editNotice/',
    };

    async function login(data) {
        const result = await post(endpoints.login, data);
        setUser(result);
        return result;
    }


    async function register(data) {
        const result = await post(endpoints.login, data);
        setUser(result);
        return result;
    }

    async function logout() {
        const result = post(endpoints.logout, {});
        clearUser();
        return result;
    }

    async function createItem(data) {
        const result = await post(endpoints.createItem, data);
        return result;
    }

    async function getItems() {
        const response = await get(endpoints.getItems);
        return response.results;
    }

    async function getItemById(id) {
        const result = await get(endpoints.getSpecificDataWithId + id);
        return result;
    }

    async function editItem(data, id) {
        // const user = getUser().objectId;
        // console.log(user);
        const result = await put(endpoints.edit + id, data);
        return result;
    }

    // with parse -->

    async function saveNewPerson(name, age, pointerId,) {
        const User = Parse.Object.extend('_User');
        const pointer = User.createWithoutData(pointerId);

        const Person = Parse.Object.extend('Person');
        const person = new Person();

        person.set('name', name);
        person.set('age', age);
        person.set('pointer', pointer);
        person.set('userArr', [pointerId]);

        try {
            const result = await person.save();
            return result;
        } catch (error) {
            throw error.message;
        }
    }


    async function retrievePerson(id) {
        const query = new Parse.Query('Person');

        try {
            const person = await query.get(id);

            return person.attributes;
        } catch (error) {
            throw error.message;
        }
    }


    async function updatePerson(id, arrId) {
        const query = new Parse.Query('Person');
        try {
            const person = await query.get(id);
            const userArr = person.attributes.userArr;
            userArr.push(arrId);
            await person.save();
        } catch (error) {
            console.log(error.message);
        }
    }

    async function addBuyer(id, pointerId) {
        const User = Parse.Object.extend('_User');
        const userPointer = User.createWithoutData(pointerId);

        const query = new Parse.Query('Person');
        try {
            const person = await query.get(id);
            person.set('buyer', userPointer);
            await person.save();
        } catch (error) {
            throw error.message;
        }
    }


    async function removeField(id, field) {
        const query = new Parse.Query('Person');
        try {
            const person = await query.get(id);
            person.unset(field);
            await person.save();
        } catch (error) {
            console.log(error.message);
        }
    }


    async function deletePerson(id) {
        const query = new Parse.Query('Person');

        try {
            const person = await query.get(id);

            await person.destroy();
        } catch (error) {
            throw error.message;

        }
    }


    /// Query -->

    async function equalTo() {
        const Person = Parse.Object.extend('Person');
        const query = new Parse.Query(Person);
        query.equalTo('name', 'thirdRecord');
        try {
            const result = await query.find();
            console.log(result[0].attributes);
        } catch (error) {
            console.log(error);
        }
    }


    async function notEqualTo(name, age) {
        const query = new Parse.Query('Person');
        query.notEqualTo('name', name);
        query.greaterThan('age', age);
        try {
            const result = await query.find();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    async function queryFirst() {
        const query = new Parse.Query('Person');
        try {
            const result = await query.first();
            return result;
        } catch (error) {
            throw error.message;
        }
    }

    async function matchesKeyInQuery() {
        const User = Parse.Object.extend('_User');
        const userQuery = new Parse.Query(User);
        userQuery.equalTo('username', 'Peter');

        const pesronQuery = new Parse.Query('Person');
        // сравнява стойноста на pointer  с тази на objectId от _User и връща съответния запис от Person.
        pesronQuery.matchesKeyInQuery('pointer', 'objectId', userQuery);
        try {
            const result = await pesronQuery.find();
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    async function matchesKeyInQueryBack() {
        const User = Parse.Object.extend('_User');
        const userQuery = new Parse.Query(User);

        const pesronQuery = new Parse.Query('Person');
        pesronQuery.equalTo('name', 'secondRecord');
        // сравнява стойноста на objectId  с тази върната от pointer.objectId и връща съответния потребител
        userQuery.matchesKeyInQuery('objectId', 'pointer.objectId', pesronQuery);
        try {
            const result = await userQuery.find();
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    async function selectQuery(field) {
        const query = new Parse.Query('_User');
        // служи за да избере само определени полета от даден клас.
        query.select(field);

        try {
            const result = await query.find();
            console.log(result[0].attributes);
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    // login register logout with parse

    async function parseRegister(username, password, email) {
        const user = new Parse.User();

        user.set('username', username);
        user.set('password', password);
        user.set('email', email);

        try {
            const result = await user.signUp();
            return result;
            // Hooray! Let them use the app now.
        } catch (error) {
            // Show the error message somewhere and let the user try again.
            console.log(error.message);
        }
    }

    async function parseLogin(username, password) {
        // const user = new Parse.User();

        try {
            const user = await Parse.User.logIn(username, password);
            const sessionToken = user.attributes.sessionToken;
            // const currentUser = Parse.User.current();
            return sessionToken;
        } catch (error) {
            console.log(error.message);
        }
    }

    async function parseLogout() {
        try {
            const result = await Parse.User.logOut();
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }


    return {
        register,
        login,
        logout,
        createItem,
        getItems,
        getItemById,
        editItem,
        saveNewPerson,
        retrievePerson,
        deletePerson,
        updatePerson,
        removeField,
        equalTo,
        notEqualTo,
        addBuyer,
        queryFirst,
        matchesKeyInQuery,
        matchesKeyInQueryBack,
        selectQuery,
        parseRegister,
        parseLogin,
        parseLogout
    };

};
