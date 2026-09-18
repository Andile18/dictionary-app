# Wordroom Dictionary

Wordroom is a React dictionary application. Enter an English word to view its definitions, part of speech, examples, synonyms, pronunciation, and available audio.

## How It Works

The search form is handled by `src/Dictionary.js`:

1. The entered word is trimmed and URL-encoded.
2. The app requests a definition from the Free Dictionary API.
3. If that service is unavailable, the app requests a definition from Datamuse.
4. The response is normalized and displayed by the `Results`, `Meaning`, `Phonetic`, and `Synonyms` components.
5. Loading, empty-search, and not-found states are shown in the interface.

Both APIs are public and do not require an API key. The app uses Axios for HTTP requests and gives each request an eight-second timeout.

## Requirements

- Node.js 20 or newer
- npm

## Run Locally

From the `dictionary-application` directory:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test and Build

Run the automated tests:

```bash
CI=true npm test -- --watchAll=false
```

Create an optimized production build:

```bash
npm run build
```

## Run with Docker

Build the production image:

```bash
docker build -t dictionary-app:local .
```

Start the container:

```bash
docker run --rm --name dictionary-app-container -p 8080:80 dictionary-app:local
```

Open [http://localhost:8080](http://localhost:8080) to use the containerized app. Stop a background container with:

```bash
docker stop dictionary-app-container
```

The Docker image uses a multi-stage build. Node.js compiles the React app, and Nginx serves the resulting static files. `nginx.conf` provides the fallback to `index.html` needed by a single-page React application.

## Project Structure

```text
public/index.html       HTML document shell and page metadata
src/Dictionary.js       Search state, API requests, loading, and errors
src/Results.js          Word-level result rendering
src/Meaning.js          Definitions and examples
src/Phonetic.js         Pronunciation and audio links
src/Synonyms.js         Synonym lists
src/*.css               Application styling
Dockerfile              Production container definition
nginx.conf              Nginx SPA configuration
```

## Notes

The project uses Create React App 5. The build may display maintenance notices from older Create React App dependencies, but the application build and tests are functional.
