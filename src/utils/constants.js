export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMTB_KEY,
  },
};

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

export const SUPPORTED_LANGUAGES = [
  {
    name: "English",
    identifier: "english",
  },
  {
    name: "Tamil",
    identifier: "tamil",
  },
  {
    name: "Hindi",
    identifier: "hindi",
  },
  {
    name: "Spanish",
    identifier: "spanish",
  },
];
export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
