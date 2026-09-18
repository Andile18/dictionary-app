# Dictionary App

A React dictionary application that searches for English words and displays definitions, parts of speech, examples, synonyms, pronunciation, and audio when available.

The repository also includes a production Docker setup using Nginx.

## Repository Layout

```text
dictionary-app/
├── dictionary-application/   Complete, runnable React application
│   ├── public/                HTML shell and static assets
│   ├── src/                   React components and styles
│   ├── Dockerfile             Production container definition
│   ├── nginx.conf             Nginx single-page-app routing
│   └── README.md              Application-specific documentation
├── dictionary-app/            Earlier Create React App copy
├── .vscode/                   VS Code launch configuration
└── README.md                  Repository documentation
```

Use `dictionary-application` for development, testing, Docker builds, and deployment. The `dictionary-app` directory is an earlier copy and does not contain the complete feature set.

## Features

- Search for English words.
- Display multiple definitions and parts of speech.
- Display examples and synonyms when supplied by the API.
- Display pronunciation text and available audio links.
- Show loading, empty-search, and not-found states.
- Fall back to a second dictionary service if the primary API is unavailable.
- Run as a production Docker container with Nginx.

## How Word Search Works

The main search flow lives in `dictionary-application/src/Dictionary.js`:

1. The form trims and URL-encodes the entered word.
2. The app requests data from the Free Dictionary API.
3. If that request fails or returns no result, it requests data from Datamuse.
4. Datamuse data is converted to the same result structure used by the React components.
5. `Results`, `Meaning`, `Phonetic`, and `Synonyms` render the response.

Both services are public and do not require an API key. Requests use an eight-second timeout.

## Requirements

- Node.js 20 or newer
- npm
- Docker Desktop or Colima, if using Docker

## Run the App Locally

From the repository root:

```bash
cd dictionary-application
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Test and Build

Run the tests:

```bash
cd dictionary-application
CI=true npm test -- --watchAll=false
```

Create a production build:

```bash
cd dictionary-application
npm run build
```

## Run with Docker

Build the production image from `dictionary-application`:

```bash
cd dictionary-application
docker build -t dictionary-app:local .
```

Run the container:

```bash
docker run --rm --name dictionary-app-container -p 8080:80 dictionary-app:local
```

Open [http://localhost:8080](http://localhost:8080).

Stop a container started in the background:

```bash
docker stop dictionary-app-container
```

The Dockerfile uses two stages. Node.js builds the React production bundle, and Nginx serves the static files. `nginx.conf` routes unknown paths back to `index.html` for React client-side routing.

## Development Notes

- React components are in `dictionary-application/src`.
- Global and app-specific styles are in `src/index.css`, `src/App.css`, and `src/Dictionary.css`.
- The API response is normalized before rendering so missing optional fields do not break the page.
- The project uses Create React App 5. Its dependency tree may display maintenance notices during builds and tests.

## GitHub

Repository: [github.com/Andile18/dictionary-app](https://github.com/Andile18/dictionary-app)

From the repository root, commit and push changes with:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```
