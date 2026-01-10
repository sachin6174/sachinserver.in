import React, { useEffect, useMemo, useState } from 'react';
import './AppleDevYouTubeChannels.css';

const AppleDevYouTubeChannels = () => {
    const channels = [
        {
            name: "Appstuff",
            icon: "https://yt3.googleusercontent.com/0RmpMkzp4DDaWAsh4apaTt6OskyNOxBx_H14a73wyXds1QAhrQJJPivM39Ye23kVOsVMtFlHJzM=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@appstuff",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: "https://appstuff.teachable.com/"
        },
        {
            name: "Code Cat",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kp1GKTZBqW8Lb9BmyaozwR-KqLgnqV7TpYUpq18Pb_ycA=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@CodeCat15",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "AppDeveloperPoint",
            icon: "https://yt3.googleusercontent.com/X77CFn_IS2MtnAqROHiCU78pNgRe0rcbsp9IeqEGfdMdDO0IUBVvmINoYRmU_QMHLonrhm0MwQ=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@AppDeveloperPoint",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "ProgrammingVerseDev",
            icon: "https://yt3.googleusercontent.com/g8Fdz7PY7BwGZZWgxE-sG8yHRhdOd6kb38dckiy2qtd7AGIipGh3U5EiZd1quQF1B-lL5hUbjw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@ProgrammingVerseDev",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: "https://sachinserver.in/"
        },
        {
            name: "Swift and Tips",
            icon: "https://yt3.googleusercontent.com/r9nVFcwyxGF6t_RSNk3P4anFq3Qce6MCIJ7tZNv-ZxI5ZrlMNcxx31qsyUJnLTOgYRKNPP6c=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/c/SwiftandTips",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "SeanAllen",
            icon: "https://yt3.googleusercontent.com/wujHpEJt-XOr1fjzQW0-f9ko4eCFnlXqjhM5ecMtDzMi-3ezCor-UQ9OsydWOp_Z9dy5DdyX_Q=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@seanallen",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: "https://seanallen.teachable.com/"
        },
        {
            name: "iCode",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kShK2GojYoCcvLX1OZ5CRddwTepu-N-u-aEUUT35XoBg=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@iCode_Happy_Coding",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "fknight",
            icon: "https://avatars.githubusercontent.com/u/15620553?s=48&v=4",
            youtubeUrl: "https://www.youtube.com/@fknight",
            githubUrl: "https://github.com/ForrestKnight",
            devNotesUrl: "https://www.devnotesdaily.com/authors/65989995-3f8c-4980-9afa-e90358ebe0c4",
            websiteUrl: ""
        },
        {
            name: "SwiftyPlace",
            icon: "https://yt3.googleusercontent.com/JdZRGnfb53Fg3VUGHdT2WEVEzSFPxJsTV-FamNE8FkgeqPvmFp8orVgPBnJoy-NTNCPEiqzo=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@SwiftyPlace",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: "https://swiftyplace.com"
        },
        {
            name: "iOSAcademy",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@iOSAcademy",
            githubUrl: "https://github.com/AfrazCodes",
            devNotesUrl: "",
            websiteUrl: "https://courses.iosacademy.io"
        },
        {
            name: "Vincent Pradeilles",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@v_pradeilles",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Embrace Mobile",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@embracemobile",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Corbin Brown",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@Corbin_Brown",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Rishab Kattimani",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@RishabTeachesTech",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Code Pro",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@CodePro",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Mr. Macintosh",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@Mr.Macintosh",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Sandip M",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@sandipm",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Okta",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@OktaInc",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Electronic Science Indonesia",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@electronicscienceindonesia8732",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "KensyGames",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@kensygames5967",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "5 Minute Mobility (5MM)",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@5MinuteMobility",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "CodingXpert",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@CodingXpert",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "42Gears",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@42gears",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Yogesh Patel",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@YogeshPateliOS",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Stewart Lynch",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@StewartLynch",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "iPhone Kathiresan",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@KtrKathir",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Jamf",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@JAMFMedia",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "SwiftKat Code Factory",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@swiftkatcodefactory",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "MacMost",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@macmost",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Archetapp",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@Archetapp",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "AzamSharp",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@azamsharp",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Xtreme Tutorials",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@xtremetutorials9986",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Programmers Hub",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@programmershub6584",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Swiftful Thinking",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@SwiftfulThinking",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Swift Guy",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@swiftguy8050",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Flo Writes Code",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@FloWritesCode",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Swift Almanac",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@SwiftAlmanac",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Rebeloper",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@rebeloper",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "CocoaHeadsNL",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@CocoaHeadsNL",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Coffee Programmer",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@CoffeeProgrammer",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        },
        {
            name: "Xcode Debugging by Carlos Rodriguez",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@xcodedebuggingbycarlosrodr8609",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: ""
        }
    ];

    // Resolve channel thumbnails via YouTube Data API v3 (optional)
    // If REACT_APP_YOUTUBE_API_KEY is defined (or set in localStorage under 'yt_api_key'),
    // we try to fetch the channel's official thumbnail and cache the result.
    const apiKey = useMemo(() => {
        return process.env.REACT_APP_YOUTUBE_API_KEY || localStorage.getItem('yt_api_key') || '';
    }, []);

    const [resolvedThumbs, setResolvedThumbs] = useState({});

    // LocalStorage cache helpers with 7-day TTL
    const getCachedThumb = (url) => {
        try {
            const raw = localStorage.getItem(`yt_thumb_${url}`);
            if (!raw) return null;
            const data = JSON.parse(raw);
            if (!data || !data.url || !data.exp) return null;
            if (Date.now() > data.exp) {
                localStorage.removeItem(`yt_thumb_${url}`);
                return null;
            }
            return data.url;
        } catch { return null; }
    };

    const putCachedThumb = (url, thumb) => {
        try {
            const ttl = 7 * 24 * 60 * 60 * 1000; // 7 days
            localStorage.setItem(`yt_thumb_${url}`, JSON.stringify({ url: thumb, exp: Date.now() + ttl }));
        } catch {}
    };

    const parseChannelIdentifier = (youtubeUrl) => {
        try {
            const u = new URL(youtubeUrl);
            const path = u.pathname; // e.g., /@handle, /channel/UC..., /c/Name, /user/Name
            if (path.startsWith('/channel/')) {
                const id = path.split('/')[2];
                return { channelId: id };
            }
            if (path.startsWith('/@')) {
                return { handle: path.slice(1) }; // include @
            }
            const parts = path.split('/').filter(Boolean);
            if (parts[0] === 'c' || parts[0] === 'user') {
                return { custom: parts[1] };
            }
            // Fallback: query the full URL string
            return { query: youtubeUrl };
        } catch {
            return { query: youtubeUrl };
        }
    };

    const fetchChannelThumb = async (youtubeUrl) => {
        if (!apiKey) return null;
        const cached = getCachedThumb(youtubeUrl);
        if (cached) return cached;

        const { channelId, handle, custom, query } = parseChannelIdentifier(youtubeUrl);
        try {
            if (channelId) {
                const resp = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${encodeURIComponent(channelId)}&key=${apiKey}`);
                const json = await resp.json();
                const item = json.items && json.items[0];
                const thumb = item?.snippet?.thumbnails?.high?.url || item?.snippet?.thumbnails?.default?.url;
                if (thumb) return thumb;
            }
            const q = handle || custom || query || youtubeUrl;
            if (q) {
                const resp = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${encodeURIComponent(q)}&key=${apiKey}`);
                const json = await resp.json();
                const item = json.items && json.items[0];
                const thumb = item?.snippet?.thumbnails?.high?.url || item?.snippet?.thumbnails?.default?.url;
                if (thumb) return thumb;
            }
        } catch (e) {
            // swallow; fallback will be used
        }
        return null;
    };

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            if (!apiKey) return; // no API key, keep existing icons
            const updates = {};
            for (const ch of channels) {
                const cached = getCachedThumb(ch.youtubeUrl);
                if (cached) {
                    updates[ch.youtubeUrl] = cached;
                    continue;
                }
                const t = await fetchChannelThumb(ch.youtubeUrl);
                if (t) {
                    updates[ch.youtubeUrl] = t;
                    putCachedThumb(ch.youtubeUrl, t);
                }
            }
            if (!cancelled && Object.keys(updates).length) {
                setResolvedThumbs(prev => ({ ...prev, ...updates }));
            }
        };
        run();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiKey]);

    const handleLinkClick = (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="apple-dev-youtube-channels">
            <div className="channels-header">
                <h1>📺 YouTube Channels for Apple Development</h1>
                <p>Great YouTube channels for learning iOS, Swift, and Apple development</p>
            </div>

            <div className="channels-grid">
                {channels.map((channel, index) => {
                    const iconUrl = resolvedThumbs[channel.youtubeUrl] || channel.icon;
                    return (
                    <div key={index} className="channel-card">
                        <div className="channel-avatar">
                            <img 
                                src={iconUrl}
                                alt={`${channel.name} avatar`}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.currentTarget.src = channel.icon || ('https://via.placeholder.com/50x50/667eea/white?text=' + channel.name.charAt(0));
                                }}
                            />
                        </div>
                        
                        <div className="channel-info">
                            <h3 className="channel-name">{channel.name}</h3>
                            
                            <div className="channel-links">
                                <button 
                                    className="link-btn youtube-btn"
                                    onClick={() => handleLinkClick(channel.youtubeUrl)}
                                    title="YouTube Channel"
                                >
                                    📺 YouTube
                                </button>
                                
                                {channel.githubUrl && (
                                    <button 
                                        className="link-btn github-btn"
                                        onClick={() => handleLinkClick(channel.githubUrl)}
                                        title="GitHub Profile"
                                    >
                                        🐙 GitHub
                                    </button>
                                )}
                                
                                {channel.devNotesUrl && (
                                    <button 
                                        className="link-btn devnotes-btn"
                                        onClick={() => handleLinkClick(channel.devNotesUrl)}
                                        title="DevNotes"
                                    >
                                        📝 DevNotes
                                    </button>
                                )}
                                
                                {channel.websiteUrl && (
                                    <button 
                                        className="link-btn website-btn"
                                        onClick={() => handleLinkClick(channel.websiteUrl)}
                                        title="Website"
                                    >
                                        🌐 Website
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>

            <div className="channels-footer">
                <p>
                    <strong>💡 Pro Tip:</strong> Subscribe to these channels to stay updated with the latest Apple development trends, 
                    tutorials, and best practices. Each channel offers unique insights and learning approaches.
                </p>
            </div>
        </div>
    );
};

export default AppleDevYouTubeChannels;
