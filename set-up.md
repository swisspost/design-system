# How to set up the Design System Repository on your local device

No matter if you just joined the team or you only need to set up a new computer, the following instructions should guide you trough step by step.

First things first...
We assume that you work as a developer in Swiss Post's IT department and that you have received a Windows device with local administrator privileges.
If this is not the case, you must first order these privileges (and [join the Swiss Post](https://post.ch/jobs) 📯). You can order them trough the Swiss Post's internal IT-Shop. The Link to the shop can be found in the Post-Web (intranet).

To make sure, you can work with our code and access the Swiss Post Design System repository, you need to prepare your local device. Follow the steps below, to set up everything...

If you need help with any of the following steps, ask one of the Design System core team developers for help.<br>
You can find their names in the footer section on our [Design System Documentation](https://design-system.post.ch/) page.

## Set up the Swiss Post proxy server

At Swiss Post we use a proxy server, which needs to be configured before you can start setting up your system.

1. Go to the [How to set up PX Proxy](https://wikit.post.ch/spaces/DEVPLAT/pages/2310539217/How+to+Setup+Px+proxy) guideline on the Swiss Post intrenal IT-wiki site. You might have to ask access to the `Development Platform` space.
2. Follow the steps on the page.

## Set up your IDE

1. Install a coding client<br>
   :star: **We recommend [Visual Studio Code](https://code.visualstudio.com/)**

   You are free to install any other coding client, as long as it can follow our [contributing guidelines](https://github.com/swisspost/design-system/blob/main/CONTRIBUTING.md).<br>
   Important tools it must support: `editorconfig`, `prettier`, `eslint`, etc.

2. Install a git client<br>
   :star: **We recommend [Github Desktop](https://desktop.github.com/download/) or [Fork](https://git-fork.com/)**

## Access the Swiss Post Design System repository

The Swiss Post Design System repository lives on [Github](https://github.com/swisspost/design-system), under the Swiss Post Open Source space. It's a public repository, so anybody can see it, fork it, open pull-requests, etc.

To get write access to the repository, you need a Github account. You can either use your private account or create a Swiss Post specific account (using your work e-mail address). Just keep in mind that everyone can see your comments, your commits, how you act and what you do within the repository.

1.  Create or update your Github Account<br>
    :star: **We recommend to use a private account, as you might want to use your post specific account for the Swiss Post Enterprise space (for example to access copilot) and you'll keep your commit history if you move on.**<br>
    :star: **We recommend to use your full name in your profile (instead of a nickname nobody associates with you) and an appropriate profile picture**<br>
2.  As soon as your account exists, let one of your co-workers know about it, so she/he can give you access to the repository.
3.  When your account has been granted access to the repository, you can set up your git client:

    <table><tr><td><details>
     <summary>Set up Github Desktop</summary>
    1.  Open Github Desktop
    2.  Just follow the instructions to login to Github with your account.
    3.  Click on **«Clone a repository form the Internet...»** on the right.

       <img src="https://github.com/user-attachments/assets/0b957067-e839-456a-8348-57e08d4eeef4" alt="Github Desktop - Let's get started!" width="600"/>
    4.  Define the **«Local path»** so it points to `C:\work\swisspost\design-system`.<br>
        You may need to create those folders first.
    5.  Choose `swisspost/design-system` within the **«GitHub.com»** tab.

       <img src="https://github.com/user-attachments/assets/fa58a11f-3338-4d56-9b01-39411f6c5f64" alt="Github Desktop - Clone a repository" width="600"/>
    6.  You should now have a local copy of the repository on your hard drive and can start working with it.
    </details></td></tr></table>

    <table><tr><td><details>
     <summary>Set up Fork</summary>
    7.  Open Fork
    8.  Go to **«File»** -> **«Preferences»**
    9.  Go to tab **«General»** and set everything like in the image below.

          <img src="https://github.com/user-attachments/assets/6f44559e-8716-489b-90f8-b5e054be0cd8" alt="Fork - Preferences General" width="500"/>

    10. Go to tab **«Git»** and enter your account data.

        <img src="https://github.com/user-attachments/assets/26c6fd42-5d2e-4a7e-be52-a3b6109e7801" alt="Fork - Preferences Git" width="500"/>

    11. Go to [Swiss Post Design System repository](http://github.com/swisspost/design-system).
    12. Open the **«Code»** dropdown and copy the **«HTTPS»** git url.

        <img src="https://github.com/user-attachments/assets/be22ffcf-6d3b-416c-921d-281d398d1876" alt="Github - Swiss Post Design System repository" width="600"/>

    13. Go back to Fork
    14. Go to **«File»** -> **«Clone»** and set up everything like in the image below and click on **«Clone»**

    <img src="https://github.com/user-attachments/assets/a6abba68-b496-4d61-9731-f2269e3a565a" alt="Fork - Clone" width="500"/>
    15. You should now have a local copy of the repository on your hard drive and can start working with it.
    </details></td></tr></table>

## Install and configure Node.js and package managers

At Swiss Post, we often switch between projects that depend on different Node.js versions. To handle this, we use [mise](https://mise.jdx.dev/) — a tool version manager that automatically activates the correct Node.js and pnpm versions when you enter a project directory.

mise reads the `package.json` of this project and activates the correct Node.js and pnpm versions based on the `engines.node` and `packageManager` fields. You don't need to install Node.js or pnpm manually.

### Install mise

Full installation options: https://mise.jdx.dev/installing-mise.html

**Windows:**

```
winget install jdx.mise
```

**Linux/macOS:**

```
curl https://mise.run | sh
```

### Configure the Swiss Post Artifactory mirror

```
setx MISE_NODE_MIRROR_URL "To get the values for these variables, ask a Design System Maintainer."
setx MISE_FETCH_REMOTE_VERSIONS_TIMEOUT 5
setx MISE_DISABLE_AUTO_UPDATE 1
```

Close and reopen your terminal.

### Configure the global mise settings

Create the file `~/.config/mise/config.toml` (on Windows: `C:\Users\<your-user>\.config\mise\config.toml`) with the following content:

```toml
[settings]
idiomatic_version_file_enable_tools = ["node", "pnpm"]
fetch_remote_versions_timeout = "5s"
```

This tells mise to read the Node and pnpm versions directly from each project's `package.json`, so you don't need to maintain a separate `mise.toml` per repo.

Verify it is detected:

```
mise config
```

You should see your `config.toml` listed.

### Activate mise in your shell (recommended for auto-switch)

Activating mise means it will automatically load the correct tool versions whenever you open a terminal in a project directory.

**Zsh** (default on macOS): edit `~/.zshrc` and add:

```
eval "$(mise activate zsh)"
```

Then run `source ~/.zshrc`.

**Bash / Git Bash** (default on many Linux distros): edit `~/.bashrc` and add:

```
eval "$(mise activate bash)"
```

Then run `source ~/.bashrc`.

**PowerShell 7** (Windows): edit `$PROFILE` and add:

```
mise activate pwsh | Out-String | Invoke-Expression
```

⚠️ If `mise activate` fails on PowerShell with `PropertySetterNotSupportedInConstrainedLanguage`, your shell is in Constrained Language Mode (corporate policy). See the troubleshooting section below.

After activation, run `mise doctor` to verify everything is set up correctly.

### Install Node.js and dependencies

1. Open a terminal and navigate to the Design System repo root (`cd path/to/design-system`)
2. Run `mise install` — this installs the correct Node.js and pnpm versions as defined in `package.json`
3. Run `node -v` to verify Node.js is available
4. Run `pnpm install` to install all project dependencies

You're done, congrats!

---

## .env files

Some packages need secrets to run, for example the icons pacakge. These secrets are not checked into the repository (otherwise the whole world could see them) but are stored in .env files. There is a [`.template.env`](https://github.com/swisspost/design-system/blob/main/packages/icons/.template.env) file that holds infos about what secrets are necessary. To get the values for these variables, ask a [Design System Maintainer](https://github.com/orgs/swisspost/teams/design-system-maintainers).

## Helpful knowledge

### Working with mise

mise manages both Node.js and pnpm versions for this project automatically.

| Action                                   | Command                |
| :--------------------------------------- | :--------------------- |
| Check mise is working                    | `mise doctor`          |
| Install tools defined in the project     | `mise install`         |
| See which tools are active               | `mise current`         |
| List all installed tool versions         | `mise list`            |
| Manually install a specific Node version | `mise use node@22`     |
| Run a command with mise-managed tools    | `mise exec -- node -v` |

Visit [mise.jdx.dev](https://mise.jdx.dev/) for more information.

### Working with Node.js

| Action                | Command                       |
| :-------------------- | :---------------------------- |
| Get installed version | `node --version` or `node -v` |
| Run script file       | `node path/to/script.js`      |

Visit [nodejs.org](https://nodejs.org/) for more information.

### Working with pnpm

pnpm is the package manager used in this monorepo. It is installed automatically by mise.

| Action                   | Command                       |
| :----------------------- | :---------------------------- |
| Get installed version    | `pnpm --version` or `pnpm -v` |
| Install all dependencies | `pnpm install` or `pnpm i`    |

Visit [pnpm.io](https://pnpm.io/) for more information.
