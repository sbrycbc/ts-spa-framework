"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Component(options) {
    return function (constructor) {
        constructor.prototype.template = options.template;
    };
}
class Router {
    static navigate(component) {
        const appRoot = document.getElementById("root");
        if (appRoot) {
            appRoot.innerHTML = new component().template;
        }
        setRouteEvent();
    }
    static route(path) {
        if (path === "home") {
            return HomeComponent;
        }
        else if (path === "app") {
            return AppComponent;
        }
        else if (path === "about") {
            return AboutComponent;
        }
        return AppComponent;
    }
}
let AppComponent = class AppComponent {
};
AppComponent = __decorate([
    Component({
        template: `
    <h1>App Component</h1>
    <button route="home">Go to Home Component</button>
    <button route="app">Go to App Component</button>
    <button route="about">About Component</button>
    `
    })
], AppComponent);
let HomeComponent = class HomeComponent {
    constructor() {
        this.name = "Sbry";
    }
    method() {
    }
};
HomeComponent = __decorate([
    Component({
        template: `
    <h1>Hallo {{name}}</h1>
    <button route="home">Go to Home Component</button>
    <button route="app">Go to App Component</button>
    <button route="about">About Component</button>
    `
    })
], HomeComponent);
let AboutComponent = class AboutComponent {
};
AboutComponent = __decorate([
    Component({
        template: `
     <h1>About Component</h1>
     <button route="home">Go to Home Component</button>
     <button route="app">Go to App Component</button>
     <button route="about">About Component</button>
     `
    })
], AboutComponent);
function setRouteEvent() {
    const routeElements = document.querySelectorAll("[route]");
    for (let el of routeElements) {
        el.addEventListener("click", (e) => {
            const route = e.currentTarget.getAttribute("route");
            if (route) {
                const component = Router.route(route);
                Router.navigate(component);
            }
        });
    }
}
window.addEventListener("load", () => {
    Router.navigate(AppComponent);
    setRouteEvent();
});
