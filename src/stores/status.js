import { readable, writable } from 'svelte/store';

export let NowPlayingQueue = writable([]);
export let NowPlayingIndex = writable(0);

export let IsPlaying   = writable(false);
export let IsMuted     = writable(false);
export let CurrentMedia = writable(null);
export let TimeToggled = writable(false);

export let PageTitle = writable('');
export let SearchQuery = writable('');
export let ShowSearch  = writable(false);
export let ShowLyrics    = writable(JSON.parse(localStorage.getItem('HHAmpShowLyrics')) || false);
export let FullScreenEnabled = writable(false);
export let TabHistory = writable({});
export let FilterHistory = writable({});
export let PageLoadedKey = writable(null);

export let SidebarIsOpen   = writable(JSON.parse(localStorage.getItem('HHAmpSidebarIsOpen')) || false);
export let SidebarIsPinned = writable(JSON.parse(localStorage.getItem('HHAmpSidebarIsPinned')) || false);

export let QueueIsOpen   = writable(JSON.parse(localStorage.getItem('HHAmpQueueIsOpen')) || false);
export let QueueIsPinned = writable(JSON.parse(localStorage.getItem('HHAmpQueueIsPinned')) || false);
export let QueueIsUpdating = writable(false);

export let PlayerVolume               = writable(JSON.parse(localStorage.getItem('HHAmpPlayerVolume')) || 50);
export let RepeatEnabled              = writable(JSON.parse(localStorage.getItem('HHAmpRepeatEnabled')) || false);
export let VolumeNormalizationEnabled = writable(JSON.parse(localStorage.getItem('HHAmpVolumeNormalizationEnabled')) || false);
export let DynamicsCompressorEnabled  = writable(JSON.parse(localStorage.getItem('HHAmpDynamicsCompressorEnabled')) || false);

export let AutoPlayEnabled  = writable(JSON.parse(localStorage.getItem('HHAmpAutoPlayEnabled')) || false);
export let AutoPlayPlaylist = writable(JSON.parse(localStorage.getItem('HHAmpAutoPlayPlaylist')) || null);

export let ShowNotificationGainTagsMissing      = writable(JSON.parse(localStorage.getItem('HHAmpShowNotificationGainTagsMissing')) || false);
export let ShowNotificationRatingMissing        = writable(JSON.parse(localStorage.getItem('HHAmpShowNotificationRatingMissing')) || false);
export let ShowNotificationAlternateVersions    = writable(JSON.parse(localStorage.getItem('HHAmpShowNotificationAlternateVersions')) || false);
export let ShowNotificationLyricsMissing        = writable(JSON.parse(localStorage.getItem('HHAmpShowNotificationLyricsMissing')) || false);
export let ShowNotificationLyricsNotTimestamped = writable(JSON.parse(localStorage.getItem('HHAmpShowNotificationLyricsNotTimestamped')) || false);

export let ShowExpandedAlbums = writable(JSON.parse(localStorage.getItem('HHAmpShowExpandedAlbums')) || false);
export let GroupAlbumsByReleaseType = writable(JSON.parse(localStorage.getItem('HHAmpGroupAlbumsByReleaseType')) || false);

export let SkipBelow       = writable(JSON.parse(localStorage.getItem('HHAmpSkipBelow')) || false);
export let SkipBelowRating = writable(JSON.parse(localStorage.getItem('HHAmpSkipBelowRating')) || 3);

export let Theme     = writable(JSON.parse(localStorage.getItem('HHAmpTheme')) || null);
export let customHue = writable();

export const IsMobile = readable(false, function start(set) {
    const mobile = window.matchMedia("(max-width: 679.99px)");

    mobile.onchange = (e) => {
        handleDeviceChange(e);
    };

    function handleDeviceChange(e) {
        set(e.matches);
    }

    // Kick-off
    handleDeviceChange(mobile);

    return function stop() {};
});