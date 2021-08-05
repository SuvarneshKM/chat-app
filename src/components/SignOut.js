import React from 'react'
import { auth } from '../firebase'
import { Button } from '@material-ui/core'

function SignOut() {
    return (
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
    )
}

export default SignOut