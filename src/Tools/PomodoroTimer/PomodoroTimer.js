import React, { useState, useEffect, useCallback } from 'react';
import './PomodoroTimer.css';
import { Button } from '../../ui';

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [workDuration, setWorkDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [cycles, setCycles] = useState(0);
    const [totalCycles, setTotalCycles] = useState(4);
    const [longBreakDuration, setLongBreakDuration] = useState(15);

    const formatTime = useCallback((seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, []);

    const playNotificationSound = useCallback(() => {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            // Fallback: no sound if Web Audio API is not supported
            console.log('Audio not supported');
        }
    }, []);

    const showNotification = useCallback((title, body) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, { body, icon: '/favicon.ico' });
        }
    }, []);

    const requestNotificationPermission = useCallback(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        requestNotificationPermission();
    }, [requestNotificationPermission]);

    useEffect(() => {
        let interval = null;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (isRunning && timeLeft === 0) {
            playNotificationSound();
            if (isBreak) {
                showNotification('Break Complete!', 'Time to get back to work!');
                setIsBreak(false);
                setTimeLeft(workDuration * 60);
            } else {
                setCycles(cycles => cycles + 1);
                if (cycles + 1 >= totalCycles) {
                    showNotification('Pomodoro Complete!', `You've completed ${totalCycles} cycles. Time for a long break!`);
                    setIsBreak(true);
                    setTimeLeft(longBreakDuration * 60);
                    setCycles(0);
                } else {
                    showNotification('Work Session Complete!', 'Time for a short break!');
                    setIsBreak(true);
                    setTimeLeft(breakDuration * 60);
                }
            }
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, isBreak, workDuration, breakDuration, longBreakDuration, totalCycles, cycles, playNotificationSound, showNotification]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setIsBreak(false);
        setTimeLeft(workDuration * 60);
        setCycles(0);
    };

    const skipToNext = () => {
        if (isBreak) {
            setIsBreak(false);
            setTimeLeft(workDuration * 60);
        } else {
            setCycles(cycles => cycles + 1);
            if (cycles + 1 >= totalCycles) {
                setIsBreak(true);
                setTimeLeft(longBreakDuration * 60);
                setCycles(0);
            } else {
                setIsBreak(true);
                setTimeLeft(breakDuration * 60);
            }
        }
        setIsRunning(false);
    };

    const handleWorkDurationChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setWorkDuration(value);
        if (!isRunning && !isBreak) {
            setTimeLeft(value * 60);
        }
    };

    const handleBreakDurationChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setBreakDuration(value);
    };

    const handleLongBreakDurationChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setLongBreakDuration(value);
    };

    const handleTotalCyclesChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setTotalCycles(value);
    };

    return (
        <div className="pomodoro-timer">
            <div className="timer-display">
                <div className="timer-circle">
                    <div className="timer-text">
                        <div className="time">{formatTime(timeLeft)}</div>
                        <div className="status">
                            {isBreak ? 'Break Time' : 'Work Time'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="timer-controls">
                <Button
                    onClick={isRunning ? pauseTimer : startTimer}
                    className="control-btn start-pause"
                >
                    {isRunning ? 'Pause' : 'Start'}
                </Button>
                <Button onClick={resetTimer} className="control-btn reset">
                    Reset
                </Button>
                <Button onClick={skipToNext} className="control-btn skip">
                    Skip
                </Button>
            </div>

            <div className="progress-info">
                <div className="cycles">
                    Cycle {cycles + 1} of {totalCycles}
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${((cycles) / totalCycles) * 100}%`
                        }}
                    ></div>
                </div>
            </div>

            <div className="settings">
                <h3>Settings</h3>
                <div className="setting-group">
                    <label>
                        Work Duration (minutes):
                        <input
                            type="number"
                            min="1"
                            max="60"
                            value={workDuration}
                            onChange={handleWorkDurationChange}
                            disabled={isRunning}
                        />
                    </label>
                </div>
                <div className="setting-group">
                    <label>
                        Short Break (minutes):
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={breakDuration}
                            onChange={handleBreakDurationChange}
                        />
                    </label>
                </div>
                <div className="setting-group">
                    <label>
                        Long Break (minutes):
                        <input
                            type="number"
                            min="1"
                            max="60"
                            value={longBreakDuration}
                            onChange={handleLongBreakDurationChange}
                        />
                    </label>
                </div>
                <div className="setting-group">
                    <label>
                        Cycles before Long Break:
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={totalCycles}
                            onChange={handleTotalCyclesChange}
                        />
                    </label>
                </div>
            </div>

            <div className="instructions">
                <h3>How to Use</h3>
                <ul>
                    <li>Work for the set duration</li>
                    <li>Take short breaks between work sessions</li>
                    <li>After completing all cycles, take a long break</li>
                    <li>Customize durations to fit your needs</li>
                </ul>
            </div>
        </div>
    );
};

export default PomodoroTimer;