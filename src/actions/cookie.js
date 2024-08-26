import Cookies from "universal-cookie";
import { jwtVerify } from 'jose';

const cookie = new Cookies;

export async function getAuthUser() {
    const auth = cookie.get('user')
    return auth
}

// export async function setAuthUser(token) {
//     cookies().set('user', token , { secure: true })
// }

// export async function deleteAuthAdmin() {
//     cookies().set('admin', 'false' , { secure: true })
// }
export async function validate(token) {
    if (!token || token === undefined) { return; }
    try {
        const secretKey = new TextEncoder().encode(process.env.REACT_APP_SECRET_KEY);
        const { payload } = await jwtVerify(token, secretKey);
        return payload;
    } catch (err) {
        console.error('Token verification failed: ', err);
        return;
    }
}