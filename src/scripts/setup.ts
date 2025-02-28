import fs from "fs";
import { execSync } from "child_process";
import { getPlistPath, plistContent } from "../utils";

const plistPath = getPlistPath();

fs.writeFileSync(plistPath, plistContent(), "utf8");
console.log(`✅ Plist file created successfully at: ${plistPath}`);

try {
    execSync(`launchctl load ${plistPath}`);
    console.log("✅ LaunchAgent registered successfully in launchd!");
} catch (error) {
    // @ts-ignore
    console.error("❌ Failed to load LaunchAgent:", error.message);
}