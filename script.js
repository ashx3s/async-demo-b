"use strict";

const staticData = [
  { name: "Mickey Mouse", films: ["Fantasia", "Fun and Fancy Free"] },
  { name: "Elsa", films: ["Frozen", "Frozen II"] },
  { name: "Simba", films: ["The Lion King"] },
];

// Callback Example (DON'T USE THIS FOR ASYNC - Historical Demo)
const getCharactersCallback = (data, callback) => {
  setTimeout(() => {
    if (!data) {
      callback(new Error("No data available"), null);
    }
    callback(null, data);
  }, 1000);
};

console.log("Requesting Characters...");

getCharactersCallback(staticData, (error, result) => {
  if (error) {
    console.error("[callbacks] error: ", error.message);
  }
  console.log("[callbacks] Got Characters: ", result);
});

// Promises Version

const getCharactersPromise = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data) {
        reject(new Error(), " No Data Available");
      }
      resolve(data);
    }, 500);
  });
};

console.log("[promises] requesting characters ...");

getCharactersPromise(staticData)
  .then((result) => {
    console.log("Promises Characters: ", result);
  })
  .catch((error) => {
    console.error("Promises error: ", error.message);
  })
  .finally(() => console.log("Finished Fetching from promise"));

// Async Await (use this syntax)

// make a helper function to manage timeout logic that's simulating real network communication
const asyncDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// create an async function that fetches the data locally and simulates network comms with a timeout

async function getCharactersAsync(data) {
  await asyncDelay(700);
  if (!data) throw new Error("No Data Available");
  return data;
}

// Immediately invoked function expression IIFE

(async () => {
  console.log("[Async Request Characters]");
  try {
    const result = await getCharactersAsync(staticData);
    console.log("[got static async characters]: ", result);
  } catch (error) {
    console.error("[async/await error] ", error.message);
  }
})();

// Fetch Disney Data Example

// API Endpoint / URL
const DISNEY_API_URL = "https://api.disneyapi.dev/character";
// Fetch logic
async function fetchCharacters(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network Response Not OK: ${response.status}`);
    }
    const json = await response.json();
    // Destructure data out of json with { }
    const { data } = json;
    return data;
  } catch (error) {
    console.error("ERROR Fetching Data: ", error);
  }
}
// Execute Fetch in DOMContentLoaded so that it happens ASAP
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const characters = await fetchCharacters(DISNEY_API_URL);
    characters.forEach((character) => {
      const { name, imageUrl } = character;
      console.log(name, imageUrl);
    });
  } catch (error) {
    console.error("Data rendering error: ", error.message);
  } finally {
    console.log(`REQUEST FROM: ${DISNEY_API_URL} COMPLETED`);
  }
});
