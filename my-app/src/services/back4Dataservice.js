import { back4AppRequest } from '../hooks/back4appApi';
import { clearUser, setUser, getUser } from './utility';

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

    return {
        register,
        login,
        logout,
        createItem,
        getItems,
        getItemById,
        editItem
    };

};
