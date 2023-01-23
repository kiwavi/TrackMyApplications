import axios from "axios";

export function tokenSet(token) {
    window.localStorage.setItem('token',token);
    axios.defaults.headers.common["Authorization"] = "Token " + localStorage.getItem("token");
}

export function tokenDel() {
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem('token');
}
