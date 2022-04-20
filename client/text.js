/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import * as native from 'natives';

const temporaryText = [];

export function addTemporaryText(identifier, msg, x, y, scale, r, g, b, a, ms) {
    const index = temporaryText.findIndex(data => data.identifier === identifier);

    if (index !== -1) {
        try {
            alt.clearTimeout(temporaryText[index].timeout);
        } catch (err) {}
        temporaryText.splice(index, 1);
    }

    const timeout = alt.setTimeout(() => {
        removeText(identifier);
    }, ms);

    temporaryText.push({ identifier, msg, x, y, scale, r, g, b, a, timeout });
}

function removeText(identifier) {
    const index = temporaryText.findIndex(data => data.identifier === identifier);
    if (index <= -1) {
        return;
    }

    temporaryText.splice(index, 1);
}

alt.everyTick(() => {
    for (let i = 0; i < temporaryText.length; i++) {
        const data = temporaryText[i];
        native.beginTextCommandDisplayText('STRING');
        native.addTextComponentSubstringPlayerName(data.msg);
        native.setTextFont(4);
        native.setTextScale(1, data.scale);
        native.setTextWrap(0.0, 1.0);
        native.setTextCentre(true);
        native.setTextColour(data.r, data.g, data.b, data.a);
        native.setTextJustification(0);
        native.setTextOutline();
        native.endTextCommandDisplayText(data.x, data.y, 0);
    }
});
