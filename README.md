# JavaScript exercises

> Some basic exercises to discover JS.

## Prerequisites

- [Node.js](https://nodejs.org) version 22 installed on your system. **Use your linux distribution repository or [fnm](https://github.com/Schniz/fnm?tab=readme-ov-file#installation)**
- [Pnpm](https://pnpm.io/installation) version 10 installed on your system. **Use pnpm official script for posix systems**

## Project setup

```shell
# Make a copy of this repo on you profile, with the "use this template" button on GitHub
# clone the repository on your computer with git
# Move into the repository
cd ex-js
# Install dependencies
pnpm i
```
[Check here if your distribution does not support playwright](#note-for-distributions-not-directly-supported-by-playwright)

## Simple syntax exercises

> **Launch the tests by typing `pnpm run test`**, this will launch all tests and rerun them on file changes.
> You can also launch test from your IDE.
> You can browse tests, they are located in files ending with `.test.js`.

1. [Basic conditions](src/basics/conditions.js)
2. [Maths](src/basics/maths.js)
3. [Arrays](src/arrays/arrays.js)
4. [Manipulating strings](src/basics/strings.js)
5. [Objects](src/objects/objects.js)

## Interacting with browser and dom exercises

> To lauch the tests, see the [instructions below](<README#Lauch playwright tests with docker>) to setup playwright with docker.

1. [Dom basics](src/dom/dom.js)
2. [Click events](src/events/clicks.js)
3. [Input events](src/events/inputs.js)
4. [Mouse and focus events](src/events/movements.js)
5. [Fetch data](src/fetch/fetchData.js)

### Lauch playwright tests with docker

First, install [docker engine](https://docs.docker.com/engine/install/) for your system.

You can easily run the playwright server on a docker container :
```shell
docker run --rm --network host --init -it mcr.microsoft.com/playwright:v1.51.1-noble /bin/sh -c "cd /home/pwuser && npx -y playwright@1.51.1 run-server --port 8080"
```
This will start a docker container with the playwright server and all the browsers binary and libraries.

Then, when running your playwright tests, just add an environment variable with the server location :
```shell
PW_TEST_CONNECT_WS_ENDPOINT=ws://localhost:8080/ npx playwright test
# Or with UI
PW_TEST_CONNECT_WS_ENDPOINT=ws://localhost:8080/ npx playwright test --ui-port=9090
```
With this setup, the test logic will run on the host, but the browsers will remain in the container.

> More information [here](https://discuss.layer5.io/t/how-to-setup-e2e-testing-environment-with-playwright-and-docker-for-meshery/5498).
