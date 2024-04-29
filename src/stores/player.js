import { readable, writable } from "svelte/store";
import Player from "../logic/player";

export let hhampVersion = readable("2.0.4");

export let MediaPlayer = writable(new Player());

export let SiteInnerBind = writable();
export let SiteContentBind = writable();
export let SiteSidebarBind = writable();
export let SiteQueueBind = writable();
