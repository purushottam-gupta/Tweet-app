import axios from "axios";

export const BASE_URL='http://localhost:7001/api/v1.0/tweetApp';

export default axios.create({
    baseURL : BASE_URL,
});