const fetch = require("node-fetch");

const getMoives = async (fetch) => {
  const getRequest = await fetch(
    "http://www.omdbapi.com/?i=tt3896198&apikey=e00c961&s=rat"
  );
  const data = await getRequest.json();
  return {
    length: data.length,
  };
};
