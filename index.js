function RegisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./serviceworker.js")
      .then((reg) => {
        console.log("Register succeeded. Scope is " + reg.scope);
      })
      .catch((error) => {
        console.error("Service worker registration failed:", error);
      });
  }
}

/*function Main() {
  RegisterServiceWorker();
}


const main = new Main();*/

this.RegisterServiceWorker();
