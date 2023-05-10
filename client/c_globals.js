const BUILD = GetGameBuildNumber();
const GAME = GetGameName();
const FIVEM = 'fivem';
const REDM = 'redm';

const PLAYER_INDEX = NetworkGetPlayerIndexFromPed(exports.twiliCore.PLAYER_PED());
const PLAYER_NETID = GetPlayerServerId(PLAYER_INDEX);