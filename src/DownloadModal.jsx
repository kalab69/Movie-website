import { useState, useEffect } from 'react';

function DownloadModal({ mediaType = 'movie', movieId, mediaTitle, tvDetails, onClose }) {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    // TV Show specific states
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(1);

    // Extract seasons list from TMDB tvDetails if available
    const seasonsList = tvDetails?.seasons?.filter(s => s.season_number > 0) || [{ season_number: 1, episode_count: 24 }];
    
    // Find episode count for the currently selected season
    const currentSeasonObj = seasonsList.find(s => s.season_number === Number(selectedSeason));
    const totalEpisodes = currentSeasonObj ? currentSeasonObj.episode_count : 24;
    const episodesList = Array.from({ length: totalEpisodes }, (_, i) => i + 1);

    // Fetch links whenever movieId, mediaType, season, or episode changes
    useEffect(() => {
        const fetchDownloadLinks = async () => {
            setIsLoading(true);
            try {
                let url = '';
                if (mediaType === 'tv') {
                    url = `https://downloads.wing.st/TV/${movieId}/${selectedSeason}/${selectedEpisode}`;
                } else {
                    url = `https://downloads.wing.st/movie/${movieId}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                if (data && data.links) {
                    setLinks(data.links);
                } else {
                    setLinks([]);
                }
            } catch (error) {
                console.error("Failed to fetch download links:", error);
                setLinks([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieId) {
            fetchDownloadLinks();
        }
    }, [movieId, mediaType, selectedSeason, selectedEpisode]);

    // Filter links based on selected quality pills
    const filteredLinks = links.filter(link => {
        if (filter === 'all') return true;
        if (filter === '4k') return link.quality >= 2160;
        if (filter === '1080p') return link.quality === 1080;
        if (filter === '720p') return link.quality === 720;
        return true;
    });

    // Copy link helper
    const handleCopy = (url) => {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="downloadModalOverlay">
            <div className="downloadModalBox">
                {/* Header */}
                <div className="downloadModalHeader">
                    <div className="downloadTitleArea">
                        <h3>Downloads for {mediaTitle || "Media"}</h3>
                    </div>
                    <button className="closeModalBtn" onClick={onClose}>✕</button>
                </div>

                {/* TV Show Season & Episode Dropdowns (Only renders if mediaType is 'tv') */}
                {mediaType === 'tv' && (
                    <div className="tvDropdownSelectors">
                        <div className="selectWrapper">
                            <select 
                                value={selectedSeason} 
                                onChange={(e) => {
                                    setSelectedSeason(Number(e.target.value));
                                    setSelectedEpisode(1); // Reset to episode 1 on season change
                                }}
                                className="modalDropdown"
                            >
                                {seasonsList.map((season) => (
                                    <option key={season.id || season.season_number} value={season.season_number}>
                                        Season {season.season_number}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="selectWrapper">
                            <select 
                                value={selectedEpisode} 
                                onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                                className="modalDropdown"
                            >
                                {episodesList.map((epNum) => (
                                    <option key={epNum} value={epNum}>
                                        Episode {epNum}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* Quality Filter Pills */}
                <div className="downloadFilters">
                    <button className={`filterPill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                    <button className={`filterPill ${filter === '4k' ? 'active' : ''}`} onClick={() => setFilter('4k')}>4K</button>
                    <button className={`filterPill ${filter === '1080p' ? 'active' : ''}`} onClick={() => setFilter('1080p')}>1080p</button>
                    <button className={`filterPill ${filter === '720p' ? 'active' : ''}`} onClick={() => setFilter('720p')}>720p</button>
                </div>

                {/* Links List Container */}
                <div className="downloadLinksList">
                    {isLoading ? (
                        <div className="downloadLoader">Fetching secure links...</div>
                    ) : filteredLinks.length > 0 ? (
                        filteredLinks.map((link, index) => (
                            <div key={index} className="downloadItemCard">
                                <div className="downloadItemQualityBadge">
                                    {link.quality >= 2160 ? '4K' : `${link.quality}p`}
                                </div>
                                <div className="downloadItemInfo">
                                    <div className="downloadItemNameRow">
                                        <span className="downloadItemFileNumber">
                                            {link.source || `File ${index + 1}`}
                                        </span>
                                        <span className="downloadItemSize">{link.size}</span>
                                    </div>
                                    <p className="downloadItemFullName" title={link.name}>{link.name}</p>
                                </div>

                                <div className="downloadItemActions">
                                    <button 
                                        className="copyLinkBtn" 
                                        title="Copy Link" 
                                        onClick={() => handleCopy(link.url)}
                                    >
                                        <img src="https://api.iconify.design/lucide:copy.svg?color=white" alt="Copy" className="btnIcon" />
                                    </button>
                                    <a 
                                        href={link.url} 
                                        className="downloadActionBtn" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        download
                                    >
                                        <img src="https://api.iconify.design/lucide:download.svg?color=white" alt="Download" className="btnIcon" />
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="noDownloadLinks">No download links available for this selection.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DownloadModal;