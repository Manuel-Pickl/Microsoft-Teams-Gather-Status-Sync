import { Game } from '@gathertown/gather-game-client';
import { exec } from 'child_process';
import dotenv from 'dotenv';

global.WebSocket = require("isomorphic-ws");
dotenv.config();

let gather: Game;
let previousStatus = false;

const execShellCommand = (cmd: string): Promise<string> => new Promise(res => exec(cmd, (_, out) => res(out?.trim() || "")));

const inCall = async (): Promise<boolean | null> => {
    const log = await execShellCommand(`log show --style syslog --last ${process.env.TEAMS_LOG_DURATION} --process "powerd" | grep "Microsoft Teams Call in progress"`);
    const events = log.split("\n").reverse();

    for (const event of events) {
        if (event.includes('Created')) return true;
        if (event.includes('Released')) return false;
    }
    return null;
};

const initializeGather = () => {
    gather = new Game(process.env.SPACE_ID, () => Promise.resolve({ apiKey: process.env.API_KEY ?? '' }));
    gather.connect();
    gather.subscribeToConnection((connected) => console.log("Connected to Gather.Town:", connected));
}

const updateGatherStatus = async () => {
    const status = await inCall() ?? previousStatus;
    if (status === previousStatus) {
        return;
    }

    try {
        gather.sendAction({ $case: 'setStatus', setStatus: { status } });
        previousStatus = status;

        const timestamp = new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
        console.log(`[${timestamp}] Gather: ${status ? "Do Not Disturb mode" : "Available"}`);
    } catch (err) {
        console.error("Failed to update Gather.Town status:", err);
    }
};

initializeGather();
setInterval(updateGatherStatus, Number(process.env.STATUS_UPDATE_INTERVAL));