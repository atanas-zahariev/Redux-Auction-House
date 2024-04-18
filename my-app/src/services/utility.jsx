const item = 'user';

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem(item));        
    } catch (error) {
        return undefined;
    }
};

export function setUserData(data) {
    return localStorage.setItem(item, JSON.stringify(data));
};

export function clearUser() {
    localStorage.removeItem(item);
};

export function formHandller(callback) {
    return function (event) {
        event.preventDefault();
        const myForm = new FormData(event.target);
        const data = Object.fromEntries(myForm.entries());
        
        callback(data,event);
    };
}