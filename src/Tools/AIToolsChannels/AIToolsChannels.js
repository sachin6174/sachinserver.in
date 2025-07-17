import React from 'react';
import './AIToolsChannels.css';

const AIToolsChannels = () => {
    const channels = [
        {
            name: "Fireship",
            icon: "https://avatars.githubusercontent.com/u/10172199?v=4",
            youtubeUrl: "https://www.youtube.com/@Fireship",
            githubUrl: "https://github.com/fireship-io",
            devNotesUrl: "https://www.devnotesdaily.com/authors/65989995-3f8c-4980-9afa-e90358ebe0c4",
            websiteUrl: "https://fireship.io/",
            discordUrl: "https://discord.com/invite/fireship"
        },
        {
            name: "GitHub",
            icon: "https://avatars.githubusercontent.com/u/9919?s=48&v=4",
            youtubeUrl: "https://www.youtube.com/@GitHub",
            githubUrl: "https://github.com/github",
            devNotesUrl: "",
            websiteUrl: "https://github.com",
            discordUrl: ""
        },
        {
            name: "Two Minute Papers",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_mF2RIbSqQIELJnZcJNTbmJfRKfXkdkPBmBT_dYUw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@TwoMinutePapers",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: "https://www.patreon.com/TwoMinutePapers",
            discordUrl: ""
        },
        {
            name: "3Blue1Brown",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_m4HkDVVVHUqhPfJ5-fYqBNbGi0pQ_EZLp_5dXGI-4=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@3blue1brown",
            githubUrl: "https://github.com/3b1b",
            devNotesUrl: "",
            websiteUrl: "https://www.3blue1brown.com/",
            discordUrl: ""
        },
        {
            name: "Lex Fridman",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_nKUOKMKsQoUYNxLMqKNRnCKhQzLjFsRJqZZdI1=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@lexfridman",
            githubUrl: "https://github.com/lexfridman",
            devNotesUrl: "",
            websiteUrl: "https://lexfridman.com/",
            discordUrl: ""
        },
        {
            name: "Sentdex",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kKMNZpKvKxHfBvNWCKNkCsJJNP8dLdkdoEO7P8jQ=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@sentdex",
            githubUrl: "https://github.com/Sentdex",
            devNotesUrl: "",
            websiteUrl: "https://pythonprogramming.net/",
            discordUrl: ""
        },
        {
            name: "Anthropic",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@AnthropicAI",
            githubUrl: "https://github.com/anthropics",
            devNotesUrl: "",
            websiteUrl: "https://www.anthropic.com/",
            discordUrl: ""
        },
        {
            name: "OpenAI",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@OpenAI",
            githubUrl: "https://github.com/openai",
            devNotesUrl: "",
            websiteUrl: "https://openai.com/",
            discordUrl: ""
        },
        {
            name: "Hugging Face",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@HuggingFace",
            githubUrl: "https://github.com/huggingface",
            devNotesUrl: "",
            websiteUrl: "https://huggingface.co/",
            discordUrl: ""
        },
        {
            name: "AI Explained",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@ai-explained-",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: "",
            discordUrl: ""
        },
        {
            name: "Machine Learning Street Talk",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@MachineLearningStreetTalk",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: "",
            discordUrl: ""
        },
        {
            name: "Andrej Karpathy",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@AndrejKarpathy",
            githubUrl: "https://github.com/karpathy",
            devNotesUrl: "",
            websiteUrl: "https://karpathy.ai/",
            discordUrl: ""
        },
        {
            name: "Jeremy Howard",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@howardjeremyp",
            githubUrl: "https://github.com/jph00",
            devNotesUrl: "",
            websiteUrl: "https://www.fast.ai/",
            discordUrl: ""
        },
        {
            name: "DeepMind",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@DeepMind",
            githubUrl: "https://github.com/deepmind",
            devNotesUrl: "",
            websiteUrl: "https://deepmind.com/",
            discordUrl: ""
        },
        {
            name: "Yannic Kilcher",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@YannicKilcher",
            githubUrl: "https://github.com/yk",
            devNotesUrl: "",
            websiteUrl: "",
            discordUrl: ""
        },
        {
            name: "AI Coffee Break with Letitia",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@AICoffeeBreak",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: "",
            discordUrl: ""
        },
        {
            name: "CodeBullet",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@CodeBullet",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: "",
            discordUrl: ""
        },
        {
            name: "Computerphile",
            icon: "https://yt3.googleusercontent.com/ytc/AIdro_kFu4depJgvfzT5jzpNOKhtZX61YpRyRpZ_b3xNm0I4zw=s160-c-k-c0x00ffffff-no-rj",
            youtubeUrl: "https://www.youtube.com/@Computerphile",
            githubUrl: "",
            devNotesUrl: "",
            websiteUrl: "https://www.nottingham.ac.uk/",
            discordUrl: ""
        }
    ];

    const handleLinkClick = (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="ai-tools-channels">
            <div className="channels-header">
                <h1>🤖 AI Tools & Development Channels</h1>
                <p>Top YouTube channels for AI development, machine learning, and cutting-edge technology</p>
            </div>

            <div className="channels-grid">
                {channels.map((channel, index) => (
                    <div key={index} className="channel-card">
                        <div className="channel-avatar">
                            <img 
                                src={channel.icon} 
                                alt={`${channel.name} avatar`}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/60x60/667eea/white?text=' + channel.name.charAt(0);
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
                                
                                {channel.discordUrl && (
                                    <button 
                                        className="link-btn discord-btn"
                                        onClick={() => handleLinkClick(channel.discordUrl)}
                                        title="Discord Server"
                                    >
                                        💬 Discord
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="channels-footer">
                <p>
                    <strong>🚀 Pro Tip:</strong> These channels offer cutting-edge content on AI development, 
                    machine learning algorithms, neural networks, and the latest breakthroughs in artificial intelligence. 
                    Perfect for staying ahead in the rapidly evolving AI landscape.
                </p>
            </div>
        </div>
    );
};

export default AIToolsChannels;