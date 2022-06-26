class Auth {
  // ! this.authenticated = JSON.parse(localStorage.getItem("isAuth")) || false;
  // ! localStorage.setItem("isAuth", JSON.stringify(false));
  //   constructor() {}

  login(cb) {
    // this.authenticated = true;
    localStorage.setItem("isAuth", JSON.stringify(true));
    cb();
  }

  logout(cb) {
    // this.authenticated = false;
    // localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.removeItem("isAuth");
    cb();
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem("isAuth"));
  }
}

// Singleton Pattern
export default new Auth();
