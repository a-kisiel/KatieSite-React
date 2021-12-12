import React from 'react';
import credentials from '../credentials.js';
// import {MongoClient} from 'mongodb';

import '../styles/menu.css';
import '../styles/login.css';

// Connect to Mongo
// const uri = `mongodb+srv://${credentials.atlas_username}:${credentials.atlas_password}@cluster0.avmix.mongodb.net/Upload/users?retryWrites=true&w=majority`;

// Add function to hash passwords based on credentials string?
const currentUser = {};

async function submitLogin() {
    const username = document.getElementById('username_field').value;
    const password = document.getElementById('password_field').value;
    
    // MongoClient.connect(uri, async (err, client) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     const collection = client.db('Upload').collection('users');
    //     console.log(collection)
    //     collection.findOne({username: credentials.username})
    //     .then(pack => {
    //         if (pack) {
    //             if (credentials.password === pack.password) {
                    
    //                 return true;
    //             }
    //             else {
    //                 console.log('wrong password')
    //                 return false;
    //             }
    //         }
    //         else {
    //             console.log('no user')
    //             return false;
    //         }
    //     })
    //     .catch(e => {
    //         console.log(e);
    //         return false;
    //     })
    //     client.close();
    //     return false;
    // })
}

function flashPass() {
    const currentMode = document.getElementById('password_field').getAttribute('type');
    document.getElementById('password_field').setAttribute('type', currentMode === 'password' ? 'text' : 'password');
}

export default function Login() {
    return (
        <div style={{maxWidth:2400, margin: 'auto', padding: '8px'}}>
            <div className='login-header'>Login</div>
            <div className='login-form-wrap'>
                <input id='username_field' type="text" placeholder='username'/>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <input id='password_field' type="password" placeholder='password'/>
                    <div onMouseDown={flashPass} onMouseUp={flashPass} style={{width: '40px', marginBottom: '8px', marginLeft: '8px'}}>Show</div>
                </div>
            </div>
            <button id='login_submit' onClick={submitLogin}>Submit</button>
        </div>
    )
}