# Microsoft Teams ⇆ Gather <br/> Status Sync (macOS)

Detect your Microsoft Teams call status and update your availability in Gather accordingly.

## 📦 Installation

### Prerequisites ###
* [Node.js](https://nodejs.org/en/download)

> [!IMPORTANT]
> You don’t need access to the Microsoft Graph API.

### 1. Clone the Repository

### 2. Configuration
Create a `.env` file manually from `.env.dist` or run:

```sh
cp .env.dist .env
```

Then, update the following values:
* `GATHER_API_KEY`: Replace with your actual [API key](https://app.gather.town/apikeys).
* `GATHER_SPACE_ID`: Use the corresponding value from your Gather URL: https://app.gather.town/app/<GATHER_SPACE_ID>.

> [!NOTE]
> You can also customize other settings in this file.

### 3. Install & Set Up Background Service
```sh
npm install && npm run setup
```

This will create a `launchd` job on your system, automatically starting the script at login.

### (Optional) 4. Check if Running
```sh
npm run check
```


## 🗑️ Deinstallation

```sh
npm run remove
```

This removes the launchd job from your system.

## 🔧 Technical Stuff
This script works by executing a shell command using `log show` to check system logs for Microsoft Teams call events, which log when a call starts or ends.

If a change is detected, the script sends an update to the Gather API. This dynamically updates your Gather status, ensuring that your Microsoft Teams status reflects whether you’re in a call or available.

Inspiration for this project came from these repositories:
* https://github.com/RobertD502/TeamsStatusMacOS
* https://github.com/gathertown/mod-spotify-as-status