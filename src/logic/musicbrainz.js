import { get } from 'svelte/store';
import { hhampVersion } from "../stores/player";

class MusicBrainz {
    constructor() {
        this.regex = new RegExp('[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}');

        this.headers = new Headers({
            "Accept"       : "application/json",
            "Content-Type" : "application/json",
            "User-Agent"   : `HHAmp - Ampache client/${get(hhampVersion)} ( github.com/mitchray/hhamp )`
        });
    }

    /**
     * Check if item has a valid MBID
     * @param data.mbid MBID to check
     * @param data.name Name of item
     * @returns {boolean}
     */
    hasMBID(data) {
        return data && this.regex.test(data.mbid) && data.name !== "Various Artists";
    }
}

export default MusicBrainz;