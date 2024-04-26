import { get } from 'svelte/store';
import { APIVersion, serverURL } from '../stores/server';
import { userName, isLoggedIn, userToken } from '../stores/user';
import { MediaPlayer } from "../stores/player";
import { API } from "../stores/api";
import AmpacheAPI from 'javascript-ampache';

export const login = async ({ auth, username = null }) => {
    userToken.set(auth);

    get(API).setSessionKey(auth);

    let userInfo = {
        userName: null,
        userToken: auth
    }

    if (username) {
        userName.set(username);
        userInfo.userName = username;
    }

    localStorage.setItem('AmpleAuth', JSON.stringify(userInfo));
    isLoggedIn.set(true);
}

export const logout = () => {
    localStorage.setItem('AmpleAuth', null);
    localStorage.setItem('AmpleAPIKey', null);
    userName.set(null);
    isLoggedIn.set(false);

    // stop playing
    let mp = get(MediaPlayer);

    if (mp) {
        mp.clearAll();
        mp.next();
    }
}

export const validateSession = async () => {
    let cachedSession = JSON.parse(localStorage.getItem('AmpleAuth'));

    if (!get(serverURL)) {
        logout();
        return;
    }

    try {
        API.set(new AmpacheAPI({ url: get(serverURL), debug: false }));

        if (cachedSession && cachedSession.userToken) {
            // If there's a cached session, attempt to ping the server with the stored authentication token
            let result = await get(API).ping({ auth: cachedSession.userToken });

            if (result.auth) {
                // If the ping is successful, log in using the cached session
                await login({ auth: result.auth, username: cachedSession.username });
            } else {
                // If the ping fails, log out
                logout();
            }
        } else {
            // If there's no cached session, attempt to login as a guest
            let guestLoginResult = await get(API).handshake({ auth: null });
            
            if (guestLoginResult.auth) {
                // If the guest login is successful, log in as guest
                await login({ auth: guestLoginResult.auth });
            } else {
                // If the guest login fails, log out
                logout();
            }
        }
    } catch (e) {
        logout();
    }
}


export const loginNew = async ({passphrase = null, username = null }) => {
    let result;

    // if username, attempt login with username/password
    if (username) {
        let time = Math.floor(new Date().getTime() / 1000);
        let encryptedPassword = get(API).encryptPassword({ password: passphrase, time: time });

        result = await get(API).handshake({ auth: encryptedPassword, user: username, timestamp: time, version: get(APIVersion) });
    } else {
        result = await get(API).handshake({ auth: passphrase, version: get(APIVersion) });
    }

    if (result.auth) {
        await login({ auth: result.auth, username: username })
    } else {
        logout();
    }

    return result;
}

/**
 * Extend an existing session by pinging the server with auth
 */
export let extendSession = () => {
    get(API).ping({ auth: get(userToken) });
}