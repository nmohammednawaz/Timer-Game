import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge( { title, targetTime } ){

    const timer = useRef();
    const dialog = useRef();
    const [ timerStarted, setTimerStarted ] = useState(false);
    const [ timerExpired, setTimerExpired ] = useState(false);

    function handleStart(){
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.showModal();
        }, targetTime * 1000);

        setTimerStarted(true);
    }

    function handleStop(){
        clearTimeout(timer.current);
    }

    return(
        <>
            <ResultModal result="lost" targetTime={targetTime} ref={dialog} />
            <section className="challenge">
                <h2>{title}</h2>    
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Timer is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );

}