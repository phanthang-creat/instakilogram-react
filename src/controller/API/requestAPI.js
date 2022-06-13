let refreshTokenRequest =  null;
let isTokenExpired = false;
const requestAPI = async (url, form, method = "GET") => {
    // console.log("requestAPI", form);

    if (localStorage.getItem("token") === null) {
        // console.log("token is null");
        return null;
    }

    let data = null;
    await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, {
        method: method,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: form,
    })
    .then(res => {
        // console.log("requestAPI res", res);

        if (res.status === 401) {
            isTokenExpired = true;
        }
        return res.json();
    })
    .then(async (res) => {
        if (isTokenExpired) {
            refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : RefreshToken();
            let newToken = await refreshTokenRequest;
            localStorage.setItem("token", newToken.access_token);
            isTokenExpired = false;
            data = await requestAPI(url);
        } else {
            data = res;
        }
        return data;
    })
    .catch(err => {
        console.log(err);
    });
    return data;
}
async function RefreshToken() {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/token/refresh`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("refresh_token")}`,
        }
    })
    .then(res => {
        if (res.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("auth");
            window.location.href = "/";
        }
        return res.json();
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
    })
}

export default requestAPI;