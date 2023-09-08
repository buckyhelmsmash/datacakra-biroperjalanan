import axios from "axios";
import {BASE_URL} from "./constants";

export const datacakraAxios = axios.create({
    baseURL: BASE_URL
})

