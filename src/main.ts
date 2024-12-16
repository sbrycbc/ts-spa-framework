interface ComponentOptions{
    template: string;
}

function Component(options: ComponentOptions) {
    return function(constructor: any){
        constructor.prototype.template = options.template;
    }
}

class Router{
    static navigate(component: any) {
        const appRoot = document.getElementById("root");
        if (appRoot) {
            appRoot.innerHTML = new component().template;
        }
        setRouteEvent();
    }

    static route(path: string) {
        if (path === "home") { 
            return HomeComponent;
        } else if (path === "app") {
            return AppComponent;
        } else if (path === "about") {
            return AboutComponent;
        }

        return AppComponent;
    }
}
@Component({
    template: `
    <h1>App Component</h1>
    <button route="home">Go to Home Component</button>
    <button route="app">Go to App Component</button>
    <button route="about">About Component</button>
    `
})
class AppComponent {

}

@Component({
    template: `
    <h1>Hallo {{name}}</h1>
    <button route="home">Go to Home Component</button>
    <button route="app">Go to App Component</button>
    <button route="about">About Component</button>
    `
})
    

class HomeComponent {
    name: string = "Sbry";

    method() {
        
    }
}

 @Component({
    template:`
     <h1>About Component</h1>
     <button route="home">Go to Home Component</button>
     <button route="app">Go to App Component</button>
     <button route="about">About Component</button>
     `
        
 })

 class AboutComponent {
     
}

function setRouteEvent() {
    const routeElements = document.querySelectorAll("[route]");
    for (let el of routeElements) {
        el.addEventListener("click", (e) => {
            const route = (e.currentTarget as HTMLElement).getAttribute("route");
            if (route) {
                const component = Router.route(route);
                Router.navigate(component);
            }
        })
    }
    
}

window.addEventListener("load", () => {
    Router.navigate(AppComponent);

    setRouteEvent();
})