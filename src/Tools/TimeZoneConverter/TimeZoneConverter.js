import React, { useState, useEffect, useMemo } from 'react';
import './TimeZoneConverter.css';
import { Button } from '../../ui';

const TimeZoneConverter = () => {
    const [selectedTime, setSelectedTime] = useState(new Date().toISOString().slice(0, 16));
    const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [favorites, setFavorites] = useState([]);
    const [newFavoriteName, setNewFavoriteName] = useState('');

    // Load favorites from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('tzFavorites');
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (error) {
                console.error('Failed to load favorites:', error);
            }
        }
    }, []);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem('tzFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const commonTimezones = useMemo(() => [
        'UTC',
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Europe/Berlin',
        'Asia/Tokyo',
        'Asia/Shanghai',
        'Asia/Hong_Kong',
        'Asia/Singapore',
        'Asia/Dubai',
        'Asia/Kolkata',
        'Australia/Sydney',
        'Australia/Melbourne',
        'Pacific/Auckland',
    ], []);

    const allTimezones = useMemo(() => {
        const zones = new Set();
        // Add Intl timezones
        for (const locale of ['en-US', 'en-GB', 'en-AU']) {
            try {
                const formatter = new Intl.DateTimeFormat(locale, { timeZone: 'UTC' });
                const parts = formatter.formatToParts(new Date());
                for (const part of parts) {
                    if (part.type === 'timeZoneName') {
                        zones.add(part.value);
                    }
                }
            } catch (e) {}
        }
        // Add common ones as fallback
        commonTimezones.forEach(tz => zones.add(tz));
        return Array.from(zones).sort();
    }, [commonTimezones]);

    const getTimeInTimezone = (isoString, timezone) => {
        try {
            const date = new Date(isoString);
            return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        } catch (error) {
            console.error('Invalid timezone:', timezone);
            return new Date(isoString);
        }
    };

    const formatTime = (date, timezone) => {
        try {
            return date.toLocaleString('en-US', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        } catch (error) {
            return 'Invalid';
        }
    };

    const formatTimeShort = (date, timezone) => {
        try {
            return date.toLocaleString('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        } catch (error) {
            return 'Invalid';
        }
    };

    const getUTCOffset = (timezone) => {
        try {
            const date = new Date();
            const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
            const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
            const offset = (tzDate - utcDate) / (1000 * 60 * 60);
            const sign = offset >= 0 ? '+' : '-';
            const hours = Math.floor(Math.abs(offset));
            const minutes = Math.round((Math.abs(offset) % 1) * 60);
            return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        } catch (error) {
            return 'N/A';
        }
    };

    const addFavorite = () => {
        if (newFavoriteName.trim() && !favorites.some(f => f.timezone === selectedTimezone)) {
            const newFavorite = {
                id: Date.now(),
                name: newFavoriteName,
                timezone: selectedTimezone
            };
            setFavorites([newFavorite, ...favorites]);
            setNewFavoriteName('');
        }
    };

    const removeFavorite = (id) => {
        setFavorites(favorites.filter(f => f.id !== id));
    };

    const setFavoriteAsSelected = (timezone) => {
        setSelectedTimezone(timezone);
    };

    const timeInSelectedTz = getTimeInTimezone(selectedTime, selectedTimezone);

    return (
        <div className="timezone-converter">
            <div className="input-section">
                <div className="input-group">
                    <label>Select Date & Time</label>
                    <input
                        type="datetime-local"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Select Timezone</label>
                    <select
                        value={selectedTimezone}
                        onChange={(e) => setSelectedTimezone(e.target.value)}
                    >
                        <optgroup label="Common Timezones">
                            {commonTimezones.map(tz => (
                                <option key={tz} value={tz}>{tz}</option>
                            ))}
                        </optgroup>
                        <optgroup label="All Timezones">
                            {allTimezones.map(tz => (
                                <option key={tz} value={tz}>{tz}</option>
                            ))}
                        </optgroup>
                    </select>
                </div>
            </div>

            <div className="result-section">
                <div className="result-card">
                    <div className="timezone-name">{selectedTimezone}</div>
                    <div className="timezone-time">{formatTimeShort(timeInSelectedTz, selectedTimezone)}</div>
                    <div className="timezone-date">{formatTime(timeInSelectedTz, selectedTimezone).split(' ')[0]}</div>
                    <div className="timezone-offset">UTC {getUTCOffset(selectedTimezone)}</div>
                </div>
            </div>

            <div className="add-favorite">
                <input
                    type="text"
                    placeholder="Nickname (e.g., 'Team Office')"
                    value={newFavoriteName}
                    onChange={(e) => setNewFavoriteName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addFavorite()}
                />
                <Button onClick={addFavorite} className="add-fav-btn">
                    ⭐ Add Favorite
                </Button>
            </div>

            <div className="favorites-section">
                <h3>Quick Access</h3>
                {favorites.length === 0 ? (
                    <div className="empty-favorites">
                        <p>No favorite timezones yet. Add one above!</p>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {favorites.map(fav => {
                            const timeInFavTz = getTimeInTimezone(selectedTime, fav.timezone);
                            return (
                                <div
                                    key={fav.id}
                                    className={`favorite-card ${selectedTimezone === fav.timezone ? 'selected' : ''}`}
                                    onClick={() => setFavoriteAsSelected(fav.timezone)}
                                >
                                    <div className="fav-name">{fav.name}</div>
                                    <div className="fav-timezone">{fav.timezone}</div>
                                    <div className="fav-time">{formatTimeShort(timeInFavTz, fav.timezone)}</div>
                                    <div className="fav-offset">UTC {getUTCOffset(fav.timezone)}</div>
                                    <button
                                        className="remove-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFavorite(fav.id);
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="comparison-section">
                <h3>Compare with Current Time</h3>
                <div className="current-time-card">
                    <div className="tz-name">Your Timezone</div>
                    <div className="current-time">
                        {new Date().toLocaleString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                        })}
                    </div>
                    <div className="current-offset">
                        UTC {getUTCOffset(Intl.DateTimeFormat().resolvedOptions().timeZone)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeZoneConverter;