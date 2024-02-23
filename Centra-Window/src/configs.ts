import fileDefault from "./assets/file-blank.png";
import fileScreenShot from "./assets/file-pdf.png";
import filePng from "./assets/file-png.png";

export const ImageConfig = {
  default: fileDefault,
  pdf: fileScreenShot,
  png: filePng,
};

export const ENV_VARIABLES = {
  API_URL: import.meta.env.VITE_API_URL,
  PORT: import.meta.env.VITE_PORT,
};

export const API_HOST = `${ENV_VARIABLES.API_URL}:${ENV_VARIABLES.PORT}`;
