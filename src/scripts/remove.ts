import fs from "fs";
import { execSync } from "child_process";
import { plistContent, getPlistPath } from "../utils";

const plistPath = getPlistPath();

if (!fs.existsSync(plistPath)) {
    console.log("❗ Plist file not found, creating a new one.");

    fs.writeFileSync(plistPath, plistContent(), "utf8");
    console.log(`✅ Created plist file at: ${plistPath}`);
}

try {
    execSync(`launchctl unload ${plistPath}`);
    console.log("✅ LaunchAgent successfully stopped!");
} catch (error) {
    console.log("Could not unload LaunchAgent (it may not be running).");
}

if (fs.existsSync(plistPath)) {
    fs.unlinkSync(plistPath);
    console.log(`✅ Removed plist file: ${plistPath}`);
} else {
    console.log("No plist file found, skipping deletion.");
}