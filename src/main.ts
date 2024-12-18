interface ComponentOptions{
    template?: string;
    templateUrl?: string;
}

function Component(options: ComponentOptions) {
    return function(constructor: any){
        constructor.prototype.template = options.template;
        constructor.prototype.templateUrl = options.templateUrl;

    }
}

class Router{
    static async navigate(component: any) {
        const appRoot = document.getElementById("root");
        if (appRoot) {
            let template = new component().template;
            if (new component().templateUrl) {
                template = await fetchTemplate(new component().templateUrl)
            }
            appRoot.innerHTML = template;

            setRouteEvent();
        }
        
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
     templateUrl: `/public/home.component.html  `
})
    

class HomeComponent {
    name: string = "Sbry";

    method() {
        
    }
}

class ComponentBase {
    constructor() {
        setTimeout(() => this.scanDomForNgModels(), 0);
        setTimeout(() => this.scanDomForOnClick(), 0);
    }
    
    scanDomForNgModels() {
        const elements = document.querySelectorAll("[ngModel]");
        for (const el of elements) {
            const bindingValue = el.getAttribute("ngModel");
            if (bindingValue) {
                let componentIntance: any = this;
                while (componentIntance && !Object.prototype.hasOwnProperty.call(componentIntance, bindingValue)) {
                    componentIntance = Object.getPrototypeOf(componentIntance);
                }
                if (componentIntance) {
                    el.addEventListener("keyup", e => {
                        componentIntance[bindingValue] = (e.target as HTMLInputElement).value;
                    })
                }
            }
            
        }
    }

    scanDomForOnClick() {
        const buttons = document.querySelectorAll("[onclick]");
        for (const el of buttons) {
            const methodName = el.getAttribute("onclick");
            if (methodName) {
                el.addEventListener("click", () => {
                    if (typeof this[methodName] === "function"){
                        this[methodName]();
                    }
                })
            }
        }
    }
}

 @Component({
    template:`
     <h1>About Component</h1>
     <input ngModel="name">
     <button id="show" onclick="showName">Show input Value</button>
     <button route="home">Go to Home Component</button>
     <button route="app">Go to App Component</button>
     <button route="about">About Component</button>
     `
        
 })

 class AboutComponent extends ComponentBase {
     name: string = "";

     showName() {
         console.log(this.name);
     }
     
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
async function fetchTemplate(url: string): Promise<string>{
    const response = await fetch(url);
    const text = await response.text();
    return text;
 }

window.addEventListener("load", () => {
    Router.navigate(AppComponent);

    setRouteEvent();
})