const main = new Main();

function RegisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./serviceworker.js").then((reg) => {
      console.log("Register succeeded. Scope is " + reg.scope);
    });
  }
}
function Main() {
  this.RegisterServiceWorker();
}

main.Main();