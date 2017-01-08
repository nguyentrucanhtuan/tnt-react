import 'whatwg-fetch'
import Constants from "./../Constants";

class JWTAuth {
  login(username, password, callback) {

    let _header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    return fetch(Constants.JWTAuth.url,{
      method: 'POST',
      headers: _header,
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
        if (typeof callback == 'function') {
            callback();
        }
        return responseData
    }).catch((error) => console.warn(error));;
  }
}

export default new JWTAuth();
