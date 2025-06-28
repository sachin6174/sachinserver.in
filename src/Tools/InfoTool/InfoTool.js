import React, { useState, useEffect } from 'react';
import './InfoTool.css';

const InfoTool = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [batteryInfo, setBatteryInfo] = useState(null);
    const [location, setLocation] = useState(null);
    const [publicIP, setPublicIP] = useState(null);
    const [weather, setWeather] = useState(null);
    const [onThisDay, setOnThisDay] = useState(null);
    const [quote, setQuote] = useState(null);
    const [moonPhase, setMoonPhase] = useState(null);
    const [networkSpeed, setNetworkSpeed] = useState(null);
    const [visitorCount, setVisitorCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const refreshData = async () => {
        setRefreshing(true);

        // Refresh all API data
        try {
            // Refresh IP
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            setPublicIP(ipData.ip);

            // Refresh quote
            const quoteResponse = await fetch('https://api.quotable.io/random');
            const quoteData = await quoteResponse.json();
            setQuote(quoteData);

            // Test network speed again
            await testNetworkSpeed();

        } catch (error) {
            console.log('Some data refresh failed:', error);
        }

        setRefreshing(false);
    };

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Initialize visitor counter
    useEffect(() => {
        const count = localStorage.getItem('visitorCount') || 0;
        const newCount = parseInt(count) + 1;
        localStorage.setItem('visitorCount', newCount);
        setVisitorCount(newCount);
    }, []);

    // Get battery info
    useEffect(() => {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                setBatteryInfo({
                    level: Math.round(battery.level * 100),
                    charging: battery.charging
                });
            });
        }
    }, []);

    // Get geolocation
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLocation({
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6)
                    });
                },
                error => {
                    setLocation({ error: 'Location access denied' });
                }
            );
        }
    }, []);

    // Get public IP
    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setPublicIP(data.ip))
            .catch(() => setPublicIP('Unable to fetch'));
    }, []);

    // Get weather data
    useEffect(() => {
        // Using a simpler approach for weather data
        if (location && location.latitude && location.longitude) {
            // Use wttr.in with coordinates if available
            fetch(`https://wttr.in/${location.latitude},${location.longitude}?format=j1`)
                .then(response => response.json())
                .then(data => {
                    const current = data.current_condition[0];
                    setWeather({
                        temp: current.temp_C,
                        condition: current.weatherDesc[0].value,
                        humidity: current.humidity,
                        windSpeed: current.windspeedKmph,
                        location: data.nearest_area[0].areaName[0].value
                    });
                })
                .catch(() => {
                    // Fallback to simple weather API
                    fetch('https://wttr.in/?format=j1')
                        .then(response => response.json())
                        .then(data => {
                            const current = data.current_condition[0];
                            setWeather({
                                temp: current.temp_C,
                                condition: current.weatherDesc[0].value,
                                humidity: current.humidity,
                                windSpeed: current.windspeedKmph,
                                location: 'Unknown'
                            });
                        })
                        .catch(() => setWeather({ error: 'Weather data unavailable' }));
                });
        } else {
            // Use default location weather
            fetch('https://wttr.in/?format=j1')
                .then(response => response.json())
                .then(data => {
                    const current = data.current_condition[0];
                    setWeather({
                        temp: current.temp_C,
                        condition: current.weatherDesc[0].value,
                        humidity: current.humidity,
                        windSpeed: current.windspeedKmph,
                        location: 'Auto-detected'
                    });
                })
                .catch(() => setWeather({ error: 'Weather data unavailable' }));
        }
    }, [location]);

    // Get "On This Day" data
    useEffect(() => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`)
            .then(response => response.json())
            .then(data => {
                if (data.events && data.events.length > 0) {
                    setOnThisDay(data.events[0]);
                }
            })
            .catch(() => setOnThisDay({ error: 'Historical data unavailable' }));
    }, []);

    // Get quote of the day
    useEffect(() => {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => setQuote(data))
            .catch(() => setQuote({ error: 'Quote unavailable' }));
    }, []);

    // Calculate moon phase
    useEffect(() => {
        const calculateMoonPhase = (date) => {
            const newMoon = new Date('2000-01-06'); // Known new moon date
            const millisecondsPerDay = 24 * 60 * 60 * 1000;
            const daysSinceNewMoon = Math.floor((date - newMoon) / millisecondsPerDay);
            const lunarCycle = 29.53; // Average lunar cycle in days
            const phase = (daysSinceNewMoon % lunarCycle) / lunarCycle;

            if (phase < 0.125) return { name: 'New Moon', emoji: '🌑' };
            if (phase < 0.25) return { name: 'Waxing Crescent', emoji: '🌒' };
            if (phase < 0.375) return { name: 'First Quarter', emoji: '🌓' };
            if (phase < 0.5) return { name: 'Waxing Gibbous', emoji: '🌔' };
            if (phase < 0.625) return { name: 'Full Moon', emoji: '🌕' };
            if (phase < 0.75) return { name: 'Waning Gibbous', emoji: '🌖' };
            if (phase < 0.875) return { name: 'Last Quarter', emoji: '🌗' };
            return { name: 'Waning Crescent', emoji: '🌘' };
        };

        setMoonPhase(calculateMoonPhase(new Date()));
    }, []);

    // Test network speed
    const testNetworkSpeed = async () => {
        const start = Date.now();
        try {
            await fetch('https://httpbin.org/delay/0', { method: 'HEAD' });
            const latency = Date.now() - start;
            setNetworkSpeed({ latency: `${latency}ms`, status: 'Good' });
        } catch {
            setNetworkSpeed({ latency: 'Timeout', status: 'Poor' });
        }
    };

    useEffect(() => {
        testNetworkSpeed();
    }, []);

    const getOS = () => {
        const platform = navigator.platform;
        const userAgent = navigator.userAgent;

        if (platform.indexOf('Mac') !== -1) return 'macOS';
        if (platform.indexOf('Win') !== -1) return 'Windows';
        if (platform.indexOf('Linux') !== -1) return 'Linux';
        if (/Android/.test(userAgent)) return 'Android';
        if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
        return platform;
    };

    const getBrowserInfo = () => {
        const userAgent = navigator.userAgent;
        let browserName = 'Unknown';
        let browserVersion = 'Unknown';

        if (userAgent.indexOf('Chrome') > -1) {
            browserName = 'Chrome';
            browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (userAgent.indexOf('Firefox') > -1) {
            browserName = 'Firefox';
            browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (userAgent.indexOf('Safari') > -1) {
            browserName = 'Safari';
            browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (userAgent.indexOf('Edge') > -1) {
            browserName = 'Edge';
            browserVersion = userAgent.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
        }

        return { name: browserName, version: browserVersion };
    };

    const browserInfo = getBrowserInfo();

    return (
        <div className="info-tool">
            <div className="info-header">
                <h2>📊 System Information</h2>
                <p>Real-time system, browser, and environmental data</p>
                <button
                    className="refresh-button"
                    onClick={refreshData}
                    disabled={refreshing}
                    style={{
                        marginTop: '10px',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'var(--accent-color)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'all 0.2s ease'
                    }}
                >
                    {refreshing ? '🔄 Refreshing...' : '🔄 Refresh Data'}
                </button>
            </div>

            <div className="info-grid">
                {/* Time & Date Section */}
                <div className="info-card">
                    <h3>🕐 Time & Date</h3>
                    <div className="info-item">
                        <span className="label">Local Time:</span>
                        <span className="value">{currentTime.toLocaleTimeString()}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">UTC Time:</span>
                        <span className="value">{currentTime.toUTCString().split(' ')[4]}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Date:</span>
                        <span className="value">{currentTime.toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Timestamp:</span>
                        <span className="value">{Math.floor(Date.now() / 1000)}</span>
                    </div>
                </div>

                {/* Browser & Device Context */}
                <div className="info-card">
                    <h3>💻 Browser & Device</h3>
                    <div className="info-item">
                        <span className="label">Browser:</span>
                        <span className="value">{browserInfo.name} {browserInfo.version}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">OS:</span>
                        <span className="value">{getOS()}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Language:</span>
                        <span className="value">{navigator.language}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Screen:</span>
                        <span className="value">{window.screen.width}×{window.screen.height}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Viewport:</span>
                        <span className="value">{window.innerWidth}×{window.innerHeight}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Pixel Ratio:</span>
                        <span className="value">{window.devicePixelRatio}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Online:</span>
                        <span className="value">{navigator.onLine ? '✅ Yes' : '❌ No'}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">CPU Cores:</span>
                        <span className="value">{navigator.hardwareConcurrency || 'Unknown'}</span>
                    </div>
                    {navigator.deviceMemory && (
                        <div className="info-item">
                            <span className="label">Device Memory:</span>
                            <span className="value">{navigator.deviceMemory} GB</span>
                        </div>
                    )}
                </div>

                {/* Sensor & Permissions */}
                <div className="info-card">
                    <h3>🔋 Sensors & Permissions</h3>
                    {batteryInfo ? (
                        <>
                            <div className="info-item">
                                <span className="label">Battery:</span>
                                <span className="value">
                                    {batteryInfo.level}% {batteryInfo.charging ? '🔌' : '🔋'}
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${batteryInfo.level}%`,
                                        background: batteryInfo.level > 50 ? '#28a745' : batteryInfo.level > 20 ? '#ffc107' : '#dc3545'
                                    }}
                                ></div>
                            </div>
                        </>
                    ) : (
                        <div className="info-item">
                            <span className="label">Battery:</span>
                            <span className="value">Not available</span>
                        </div>
                    )}
                    {location ? (
                        location.error ? (
                            <div className="info-item">
                                <span className="label">Location:</span>
                                <span className="value">{location.error}</span>
                            </div>
                        ) : (
                            <>
                                <div className="info-item">
                                    <span className="label">Latitude:</span>
                                    <span className="value">{location.latitude}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Longitude:</span>
                                    <span className="value">{location.longitude}</span>
                                </div>
                            </>
                        )
                    ) : (
                        <div className="info-item">
                            <span className="label">Location:</span>
                            <span className="value">Loading...</span>
                        </div>
                    )}
                    <div className="info-item">
                        <span className="label">Notifications:</span>
                        <span className="value">{Notification.permission}</span>
                    </div>
                </div>

                {/* Network & IP */}
                <div className="info-card">
                    <h3>🌐 Network & IP</h3>
                    <div className="info-item">
                        <span className="label">Public IP:</span>
                        <span className="value">{publicIP || 'Loading...'}</span>
                    </div>
                    {networkSpeed && (
                        <>
                            <div className="info-item">
                                <span className="label">Latency:</span>
                                <span className="value">{networkSpeed.latency}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Connection:</span>
                                <span className="value">{networkSpeed.status}</span>
                            </div>
                        </>
                    )}
                    {navigator.connection && (
                        <>
                            <div className="info-item">
                                <span className="label">Connection Type:</span>
                                <span className="value">{navigator.connection.effectiveType || 'Unknown'}</span>
                            </div>
                            {navigator.connection.downlink && (
                                <div className="info-item">
                                    <span className="label">Downlink:</span>
                                    <span className="value">{navigator.connection.downlink} Mbps</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Weather */}
                <div className="info-card">
                    <h3>🌤️ Weather</h3>
                    {weather ? (
                        weather.error ? (
                            <div className="info-item">
                                <span className="value">{weather.error}</span>
                            </div>
                        ) : (
                            <>
                                <div className="info-item">
                                    <span className="label">Location:</span>
                                    <span className="value">{weather.location}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Temperature:</span>
                                    <span className="value">{weather.temp}°C ({Math.round(weather.temp * 9 / 5 + 32)}°F)</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Condition:</span>
                                    <span className="value">{weather.condition}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Humidity:</span>
                                    <span className="value">{weather.humidity}%</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Wind Speed:</span>
                                    <span className="value">{weather.windSpeed} km/h</span>
                                </div>
                            </>
                        )
                    ) : (
                        <div className="info-item">
                            <span className="value">Loading weather...</span>
                        </div>
                    )}
                </div>

                {/* Moon Phase */}
                <div className="info-card">
                    <h3>🌙 Moon Phase</h3>
                    {moonPhase && (
                        <div className="info-item">
                            <span className="label">Current Phase:</span>
                            <span className="value">{moonPhase.emoji} {moonPhase.name}</span>
                        </div>
                    )}
                </div>

                {/* On This Day */}
                <div className="info-card">
                    <h3>📅 On This Day</h3>
                    {onThisDay ? (
                        onThisDay.error ? (
                            <div className="info-item">
                                <span className="value">{onThisDay.error}</span>
                            </div>
                        ) : (
                            <div className="info-item">
                                <span className="label">{onThisDay.year}:</span>
                                <span className="value">{onThisDay.text}</span>
                            </div>
                        )
                    ) : (
                        <div className="info-item">
                            <span className="value">Loading historical data...</span>
                        </div>
                    )}
                </div>

                {/* Quote of the Day */}
                <div className="info-card">
                    <h3>💭 Quote of the Day</h3>
                    {quote ? (
                        quote.error ? (
                            <div className="info-item">
                                <span className="value">{quote.error}</span>
                            </div>
                        ) : (
                            <>
                                <div className="info-item quote-content">
                                    <span className="value">"{quote.content}"</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Author:</span>
                                    <span className="value">{quote.author}</span>
                                </div>
                            </>
                        )
                    ) : (
                        <div className="info-item">
                            <span className="value">Loading quote...</span>
                        </div>
                    )}
                </div>

                {/* Custom Extras */}
                <div className="info-card">
                    <h3>🎯 Custom & Fun</h3>
                    <div className="info-item">
                        <span className="label">Visitor Count:</span>
                        <span className="value">{visitorCount}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Session Start:</span>
                        <span className="value">{new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Days in Year:</span>
                        <span className="value">{Math.ceil((new Date(new Date().getFullYear(), 11, 31) - new Date(new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24))}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Days Passed:</span>
                        <span className="value">{Math.ceil((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24))}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Year Progress:</span>
                        <span className="value">{((Math.ceil((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)) / 365) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((Math.ceil((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)) / 365) * 100).toFixed(1)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoTool;
