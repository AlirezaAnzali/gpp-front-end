// const API_URL = "https://project-2-api.herokuapp.com";
// const API_KEY = "4cad3b22-36bf-4461-a535-7dc4cc677c96";

// export const videosEndpoint = `${API_URL}/videos?api_key=${API_KEY}`;
// export const getVideoDetailEndpoint = (videoId) => {
//     return `${API_URL}/videos/${videoId}?api_key=${API_KEY}`;
// }



const API_URL = "http://localhost:8080";
export const videosEndpoint = `${API_URL}/videos`;
export const getVideoDetailEndpoint = (videoId) => {
  return `${API_URL}/videos/${videoId}`;
};