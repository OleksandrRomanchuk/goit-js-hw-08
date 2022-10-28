import Player from '@vimeo/player';
import { saveDataToLocalSt, loadDataFromLocalSt } from './local-st-func';
import throttle from 'lodash.throttle';

//---------- refs ----------
const iframeEL = document.querySelector('#vimeo-player');

//---------- variables ----------
const LOCAL_ST_KEY = 'videoplayer-current-time';
const vimeoPlayer = new Player(iframeEL);

//---------- code ----------
Object.keys(localStorage).includes(LOCAL_ST_KEY)
  ? vimeoPlayer.setCurrentTime(loadDataFromLocalSt(LOCAL_ST_KEY))
  : false;

vimeoPlayer.on('timeupdate', throttle(recordTimeToLocalSt, 1000));

function recordTimeToLocalSt({ seconds }) {
  saveDataToLocalSt(LOCAL_ST_KEY, seconds);
}
