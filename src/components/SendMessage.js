import React, { useState } from 'react'
import { db, auth } from '../firebase'
import firebase from 'firebase'

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL, displayName } = auth.currentUser

        await db.collection('messages').add({
            text: msg,
            photoURL,
            displayName,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
            <form class="msger-inputarea">
                <input type="text" class="msger-input" placeholder="Enter your message..." value={msg} onChange={e => setMsg(e.target.value)} />
                <button disabled={!msg} onClick={sendMessage} type="submit" class="msger-send-btn">Send</button>
            </form>
    )
}

export default SendMessage