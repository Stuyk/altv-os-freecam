/// <reference types="@altv/types-server" />
import alt from 'alt-server';

alt.onClient('freecam:Reset', handleReset);
alt.onClient('freecam:Update', handleCamUpdate);
alt.on('freecam:Toggle', handleToggle);

function handleReset(player) {
    player.spawn(player.freePos.x, player.freePos.y, player.freePos.z, 0);
}

function handleToggle(player) {
    player.freePos = player.pos;
    const currentStatus = player.getSyncedMeta('FREECAM');
    const status = !currentStatus ? true : false;
    player.setSyncedMeta('FREECAM', status);
}

function handleCamUpdate(player, pos) {
    player.pos = pos;
}
