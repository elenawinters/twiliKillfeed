const BUILD = GetGameBuildNumber();
const GAME = GetGameName();

function PLAYER() { return GetPlayerPed(-1); }

const NETID = GetPlayerServerId(NetworkGetPlayerIndexFromPed(PLAYER()));
