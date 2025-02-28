import { execSync } from "child_process";
import { JOB_LABEL } from "../utils";

function isJobRunning(): boolean {
    try {
        const output = execSync(`launchctl list | grep ${JOB_LABEL}`).toString().trim();
        return output.includes(JOB_LABEL);
    } catch {
        return false;
    }
}

function checkJob() {
    if (isJobRunning()) {
        console.log(`✅ Job "${JOB_LABEL}" is running.`);
    } else {
        console.log(`❌ Job "${JOB_LABEL}" is NOT running.`);
    }
}

// Run the check
checkJob();