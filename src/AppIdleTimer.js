import React, { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { LOGOUT } from './store/actions';

import { store } from './store';
import { LOGIN_PAGE_URL } from './components/AjaxURLs';



const AppIdleTimer = () => {
    const timeout = 900000
    const promptBeforeIdle = 60000

    const [state, setState] = useState('Active')
    const [remaining, setRemaining] = useState(timeout)
    const [open, setOpen] = useState(false)

    const onIdle = () => {
        setState('Idle')
        setOpen(false)
        store.dispatch({ type: LOGOUT })
        localStorage.clear()
        window.location.href = LOGIN_PAGE_URL
    }

    const onActive = () => {
        setState('Active')
        setOpen(false)
    }

    const onPrompt = () => {
        setState('Prompted')
        setOpen(true)
        // fireTimeout()
    }

    const { getRemainingTime, activate } = useIdleTimer({
        onIdle,
        onActive,
        onPrompt,
        timeout: timeout,
        promptBeforeIdle: promptBeforeIdle,
        throttle: 500,
        crossTab: true,
        leaderElection: true,
        syncTimers: 200
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000))
        }, 500)

        return () => {
            clearInterval(interval)
        }
    })

    // const handleStillHere = () => {
    //     activate()
    // }

    const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0)
    const seconds = timeTillPrompt > 1 ? 'seconds' : 'second'

    // const fireTimeout = () => {
    //     let div = "<div style=color:#008000>Are you still here?</div>" + "<p>Logging out in <b>" + remaining + "</b> seconds";
    //     SweetalertHtmlFunction('', div, 'info', 'ACTIVATE', 'LOGOUT').then((result) => {
    //         if (result.isConfirmed) {
    //             handleStillHere()
    //         } else {
    //             store.dispatch({ type: LOGOUT })
    //             window.location.href = LOGIN_PAGE_URL
    //         }
    //     })
    // }

    return (
        <>
            {console.log(timeTillPrompt + " " + seconds + " until prompt")}
            {/* <Container>
                <Row className='mb-3'>
                    <h1>React Idle Timer</h1>
                    <h2>Confirm Prompt</h2>
                    <br />
                    <p>Current State: {state}</p>
                    {timeTillPrompt > 0 && (
                        <p>
                            {timeTillPrompt} {seconds} until prompt
                        </p>
                    )}

                    <br />
                    <br />
                    <br />
                    <br />
                </Row>
            </Container> */}

            {/* <div
            className='modal'
            style={{
              display: open ? 'flex' : 'none'
            }}>
            <h3>Are you still here?</h3>
            <p>Logging out in {remaining} seconds</p>
            <button onClick={handleStillHere}>Im still here</button>
          </div> */}
        </>
    )
}

export default AppIdleTimer;
