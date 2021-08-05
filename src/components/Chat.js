import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../firebase'
import SendMessage from './SendMessage'
import SignOut from './SignOut'


function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <>
            <header class="msger-header">
                <div class="msger-header-title">
                    Chat App 🚀 
                </div>
                <div class="msger-header-options">
                    <SignOut />
                </div>
            </header>
            <br />
            <div>
                {messages.map(({ id, text, photoURL, uid, displayName }) => (
                    <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'right-msg' : 'left-msg'}`} >
                        <div
                            class="msg-img"
                            style={{ backgroundImage: `url("${photoURL}")` }}
                        ></div>

                        <div class="msg-bubble">
                            <div class="msg-info">
                                <div class="msg-info-name">{displayName}</div>
                            </div>

                            <div class="msg-text">
                                {text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="break"></div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>

        </>
    )
}

export default Chat