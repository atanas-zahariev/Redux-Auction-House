import { back4AppRequest } from '../hooks/back4appApi';
import { clearUser, setUser, getUser } from './utility';
import Parse from 'parse/dist/parse.min.js';

Parse.initialize('gyK4yLMJ7Vkdxl10WEuLToXTqtUYiumw8UqPxTmQ', 'Y2Jq1AYuOe08rQbA8rbB3atRQnSEInRgFEFMRGLM');

Parse.serverURL = 'https://parseapi.back4app.com/';


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
        // setUser(result);
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

        const personACL = new Parse.ACL();

        personACL.setPublicReadAccess(true);
        personACL.setWriteAccess(Parse.User.current().id, true);

        person.setACL(personACL);

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


    async function updatePerson(id, name) {
        const query = new Parse.Query('Person');
        try {
            const person = await query.get(id);
            person.set('name', name);
            await person.save();
        } catch (error) {
            console.log(error.message);
        }
    }

    async function updateItem(data, id) {
        console.log(data);
        const query = new Parse.Query('Item');
        try {
            const item = await query.get(id);
            item.set(data);
            await item.save();
        } catch (error) {
            throw error.message;
        }
    }

    async function addBuyer(id) {
        const pointerId = currentUser().id;
        const User = Parse.Object.extend('_User');
        const userPointer = User.createWithoutData(pointerId);

        const query = new Parse.Query('Person');
        try {
            const person = await query.get(id);
            person.set('buyer', userPointer);
            return await person.save();
        } catch (error) {
            throw error.message;
        }
    }

    async function addItemBuyer(data, itemId) {
        data.id = itemId;
        try {
            await Parse.Cloud.run('check', data);

            await Parse.Cloud.run('addBuyer', data);
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

        const itemQuery = new Parse.Query('Item');
        // сравнява стойноста на owner  с тази на objectId от _User и връща съответния/те запис/и от Item.
        itemQuery.matchesKeyInQuery('owner', 'objectId', userQuery);
        try {
            const result = await itemQuery.find();
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    async function matchesKeyInQueryBack(category) {
        const User = Parse.Object.extend('_User');
        const userQuery = new Parse.Query(User);

        const itemQuery = new Parse.Query('Item');
        itemQuery.equalTo('category', category);
        // сравнява стойноста на objectId  с тази върната от owner.objectId и връща съответния потребител
        userQuery.matchesKeyInQuery('objectId', 'owner.objectId', itemQuery);
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

    async function parseRegister(username, password, email, repass) {
        const user = new Parse.User();

        user.set({
            username,
            password,
            email
        });


        try {
            await Parse.Cloud.run('check', { username, password, email, repass });

            const result = await user.signUp();
            const userId = result.id;

            return {
                id: userId,
                username
            };
        } catch (error) {
            throw error.message;
        }
    }

    async function parseLogin(username, password) {
        // const user = new Parse.User();

        try {
            await Parse.Cloud.run('check', { username, password });

            const user = await Parse.User.logIn(username, password);
            const userId = user.id;

            return {
                id: userId,
                username
            };
        } catch (error) {
            throw error.message;
        }
    }

    async function parseLogout() {
        try {
            const result = await Parse.User.logOut();
            return result;
        } catch (error) {
            throw error.message;
        }
    }

    function currentUser() {
        const currentUser = Parse.User.current();
        if (currentUser) {

            return currentUser;
        } else {
            return currentUser;
        }
    }

    async function createRole(userId) {
        const usersToAddToRole = new Parse.Query('_User');
        const user = await usersToAddToRole.get(userId);

        const roleACL = new Parse.ACL();

        roleACL.setPublicReadAccess(true);

        const role = new Parse.Role('owner', roleACL);
        role.getUsers().add(user);
        try {
            const result = await role.save();
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    async function retrieveRole(userId) {
        const role = new Parse.Query('_Role');
        role.equalTo('name', 'owner');
        try {
            const result = await role.first();
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    async function getShema() {
        try {
            const result = await Parse.Cloud.run('getSchema');
            console.log(result);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }


    async function saveItem(params) {
        try {
            await Parse.Cloud.run('check', params);

            const result = await Parse.Cloud.run('saveItem', params);
            const itemId = result.id;
            const { title, category, imgUrl, owner, price } = result.attributes;
            const itemOwner = owner.id;
            return { id: itemId, title, category, imgUrl, owner: itemOwner, price };
        } catch (error) {
            throw error.message;
        }
    }


    async function getCloudItems() {
        try {
            const result = await Parse.Cloud.run('getItems');
            return result;
        } catch (error) {
            throw error.message;
        }
    }

    async function getCloudItemById(id) {
        try {
            const result = await Parse.Cloud.run('getItemById', { id });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async function editCloudItem(data) {
        try {
            await Parse.Cloud.run('check', data);

            const result = await Parse.Cloud.run('editItem', data);
            return result;
        } catch (error) {
            throw error.message;
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
        parseLogout,
        currentUser,
        createRole,
        retrieveRole,
        getShema,
        saveItem,
        getCloudItems,
        getCloudItemById,
        editCloudItem,
        updateItem,
        addItemBuyer
    };

};
