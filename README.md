# Awesome AI Website Builders — Pinokio launcher

[![Install with Pinokio](https://badges.pinokio.co/install.svg)](https://pinokio.co/resolve?url=https://github.com/cijrt1971-gif/awesome-ai-website-builders-pinokio)

A one-click Pinokio launcher that turns [ianberdin/awesome-ai-website-builders](https://github.com/ianberdin/awesome-ai-website-builders) into a local, searchable web UI.

[Open the one-click install link](https://pinokio.co/resolve?url=https://github.com/cijrt1971-gif/awesome-ai-website-builders-pinokio) to add this launcher in Pinokio (sign in if prompted).

## What the app does

The upstream project is a curated markdown list of AI-powered website builders. It has no code, dependencies, or server of its own. This launcher:

- downloads the list into `app/source` with **Install**,
- serves a small, dependency-free viewer with **Start** on a Pinokio-assigned local port (bound to `127.0.0.1`),
- refreshes the upstream content with **Update** (`git pull`),
- removes the downloaded content with **Reset**.

The viewer supports category navigation and live search, and reads `source/README.md` on every page load so **Update** is reflected after a refresh.

## How to use

1. In Pinokio, open this launcher and click **Install**.
2. Click **Start**. Pinokio opens the local Web UI automatically and keeps the server running.
3. Use the search box or the category chips to browse the list.
4. Click **Update** any time to pull the newest upstream list, then refresh the Web UI.
5. Click **Reset** to delete the downloaded content and start over.

The server is started with Python's standard library (`python -m http.server`); there are no packages to install, and no Docker or third-party runtime is required. Works on Windows, macOS, and Linux.

## Project structure

```
app/
  index.html       local viewer (no dependencies)
  source/          upstream markdown list (downloaded by Install, gitignored)
install.js         clone the upstream repo
start.js           serve app/ and expose the URL to Pinokio
update.js          git pull the upstream repo
reset.js           remove app/source
pinokio.js         dynamic sidebar menu
pinokio.json       launcher metadata
```

## API

The launcher exposes two local HTTP resources after **Start**:

| Endpoint | Description |
| --- | --- |
| `GET /` | The searchable viewer (`app/index.html`). |
| `GET /source/README.md` | The raw upstream markdown list. |

Replace `PORT` with the port shown in the Pinokio Web UI URL (e.g. `http://127.0.0.1:8123`).

### JavaScript

```js
// From the viewer's own page:
const markdown = await fetch('/source/README.md', { cache: 'no-store' })
  .then(response => response.text());

const entries = markdown.split(/\r?\n/)
  .filter(line => /^- \[/.test(line))
  .map(line => line.replace(/^-\s+/, ''));
```

### Python

```python
import urllib.request

url = "http://127.0.0.1:PORT/source/README.md"
with urllib.request.urlopen(url) as response:
    markdown = response.read().decode("utf-8")

print(len(markdown.splitlines()), "lines")
```

### Curl

```bash
curl http://127.0.0.1:PORT/source/README.md
```

## License

The upstream list is released under CC0 1.0 Universal. This launcher contains only a viewer and Pinokio scripts.
