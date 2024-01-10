'use client';

import { useRef, useState } from "react"
import { userLoginFetch, userLogoutFetch, userRegisterFetch } from "../_lib/user-management-client/userManagementClient";

export default function Page() {
    const [user, setUser] = useState<string>('');
    const [passwd, setPasswd] = useState<string>('');
    const lastTokenRef = useRef<string>('');

    return (
        <div>
            User <input type='text' value={user} onChange={(e) => {
                setUser(e.target.value)
            }}/>
            Passwort <input type='password' value={passwd} onChange={(e) => {
                setPasswd(e.target.value);
            }} />
            <button onClick={() => {
                userRegisterFetch({
                    user: user,
                    passwd: passwd
                }).then(resp => {
                    alert('Response from server: ' + JSON.stringify(resp));
                }).catch(reason => {
                    alert('Caught: ' + JSON.stringify(reason));
                });
            }}>Register</button>
            <button onClick={() => {
                userLoginFetch({
                    user: user,
                    passwd: passwd
                }).then(resp => {
                    alert('Response from server on login: ' + JSON.stringify(resp));
                    switch (resp.type) {
                        case 'success':
                            lastTokenRef.current = resp.token;
                            break;
                        default:
                            lastTokenRef.current = '';
                            break;
                        }
                }).catch(reason => {
                    alert('Caught: ' + JSON.stringify(reason));
                })
            }}>Login</button>
            <button onClick={() => {
                userLogoutFetch({
                    user: user,
                    token: lastTokenRef.current
                }).then(resp => {
                    alert('Response from server on logout: ' + JSON.stringify(resp));
                })
            }}>Logout with last token</button>
            <button onClick={() => {
                userLogoutFetch({
                    user: user,
                    token: ''
                }).then(resp => {
                    alert('Response from server on logout: ' + JSON.stringify(resp));
                })
            }}>Logout with wrong token</button>
        </div>
    )
}