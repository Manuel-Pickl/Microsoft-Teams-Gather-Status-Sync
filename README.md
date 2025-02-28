# Microsoft Teams ⇆ Gather <br/> Status Sync  

Detect your Microsoft Teams call status and update your availability in Gather accordingly.

> [!IMPORTANT]
> You don’t need access to the Microsoft Graph API.

## 📦 Installation

### 1. Clone the Repository

### 2. Configuration
Create `.env` based on `.env.dist` and replace `GATHER_API_KEY` with your actual [api key](https://app.gather.town/apikeys) & `GATHER_SPACE_ID` with the value from your gather url https://app.gather.town/app/**GATHER_SPACE_ID**.

> [!NOTE]
> You can customize the update interval and other settings in there too.

### 2. Configuration
Create a `.env` file from `.env.dist`, then replace `GATHER_API_KEY` with your actual [API key](https://app.gather.town/apikeys) and `GATHER_SPACE_ID` with the corresponding value from your Gather URL: https://app.gather.town/app/**GATHER_SPACE_ID**.

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