import { useState, useEffect, useRef } from 'react';

function Slider(props) {
    const [expanded, setExpanded] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const overviewRef = useRef(null);

    // Check whether the overview exceeds three lines.
    useEffect(() => {
        const overview = overviewRef.current;

        if (overview && !expanded) {
            setHasMore(
                overview.scrollHeight > overview.clientHeight + 1
            );
        }
    }, [props.description, expanded]);

    // Reset the overview when the slider changes titles.
    useEffect(() => {
        setExpanded(false);
    }, [props.title]);

    let color = 'white';

    if (props.rating <= 5) {
        color = 'red';
    } else if (props.rating < 8) {
        color = 'yellow';
    } else {
        color = 'rgb(81, 255, 0)';
    }

    return (
        <div className="slider">
            <img
                className="sliderBackdrop"
                src={props.image}
                alt={props.title}
            />

            {/* Removed onClick and cursor pointer from here */}
            <div className="movieDetails">
                {props.logo ? (
                    <img
                        className="movieTitleLogo"
                        src={props.logo}
                        alt={props.title}
                    />
                ) : (
                    <h1>{props.title}</h1>
                )}

                <p
                    ref={overviewRef}
                    className={`movieOverview ${expanded ? 'expanded' : ''}`}
                >
                    {props.description}
                </p>

                {hasMore && (
                    <button
                        type="button"
                        className="readMore"
                        onClick={(event) => {
                            event.stopPropagation();
                            setExpanded(previous => !previous);
                        }}
                    >
                        {expanded ? 'Read less' : 'Read more'}
                    </button>
                )}

                <div className="movieMeta">
                    <span className="span1">
                        {props.year
                            ? new Date(props.year).getFullYear()
                            : 'N/A'}
                    </span>

                    <span className="span2" style={{ color }}>
                        ⭐{Number(props.rating || 0).toFixed(1)}
                    </span>
                </div>

                {/* Button Group: Play Now & Info */}
                <div className="sliderButtons" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '15px' }}>
                    <button
                        type="button"
                        onClick={props.onPlay}
                        className="playButton"
                    >
                        <img src="/play.png" alt="" />
                        Play Now
                    </button>

                    <button
                        type="button"
                        onClick={props.onInfo}
                        className="infoButton"
                        style={{
                            background: 'rgba(184, 184, 189, 0.7)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '107px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '600',
                            transition: 'background 0.2s',
                            width: '60px'
                        }}
                    >
                        <img 
                            src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/info.svg" 
                            alt="Info" 
                            style={{ width: '30px', height: '30px' }} 
                        />
                    </button>
                </div>
            </div>

            <button
                type="button"
                className="sliderNav left"
                onClick={props.privSlide}
            >
                <img src="/left.png" alt="Previous" />
            </button>

            <button
                type="button"
                className="sliderNav right"
                onClick={props.nextSlide}
            >
                <img src="/right.png" alt="Next" />
            </button>
        </div>
    );
}

export default Slider;