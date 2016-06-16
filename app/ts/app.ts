import { Component, ReflectiveInjector } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { MyService } from './services/MyService';

@Component({
    selector: 'simple-di-app',
    template: `
    <button (click)="invokeService()">Get Value</button>
    `
})
class SimpleDiApp {
    myService: MyService;
    
    constructor() {
        let injector: any = ReflectiveInjector.resolveAndCreate([MyService]);
        this.myService = injector.get(MyService);
        console.log('Same instance?', this.myService === injector.get(MyService));
    }
    
    invokeService(): void {
        console.log('MyService returned', this.myService.getValue());
    }
}

bootstrap(SimpleDiApp).catch((err: any) => console.error(err));