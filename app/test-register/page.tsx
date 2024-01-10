'use client';

import { useState } from "react"
import { userRegisterFetch } from "../_lib/user-management-client/userManagementClient";

export default function Page() {
    const [user, setUser] = useState<string>('');
    const [passwd, setPasswd] = useState<string>('');

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
        </div>
    )
}