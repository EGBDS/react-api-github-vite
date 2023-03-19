//padronizando url
import axios from "axios";

const url_default = axios.create ({
    baseURL: "https://api.github.com/search/repositories?q=",
    
});

export default url_default;