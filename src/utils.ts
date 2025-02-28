import path from "path";
import { execSync } from "child_process";

export const JOB_LABEL = "com.microsoft-teams-gather-status-sync.autostart";

export const getRepoDirectory = () => path.resolve(__dirname, "../..");
const getNodePath = () => execSync("which node").toString().trim();
const getScriptPath = () => path.resolve(getRepoDirectory(), "dist", "src", "scripts", "index.js");
export const getPlistPath = () => path.resolve(process.env.HOME || "", "Library", "LaunchAgents", `${JOB_LABEL}.plist`);
export const plistContent = () => 
    `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>Label</key>
        <string>${JOB_LABEL}</string>

        <key>RunAtLoad</key>
        <true/>

        <key>KeepAlive</key>
        <true/>

        <key>ProgramArguments</key>
        <array>
            <string>${getNodePath()}</string>
            <string>${getScriptPath()}</string>
        </array>

        <key>StandardOutPath</key>
            <string>/tmp/${JOB_LABEL}.log</string>
            <key>StandardErrorPath</key>
        <string>/tmp/${JOB_LABEL}.error.log</string>
    </dict>
    </plist>`