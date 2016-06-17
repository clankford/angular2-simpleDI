import { Component, ReflectiveInjector, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { MyService } from './services/MyService';
import { ViewPortService } from './services/ViewPortService';
import { ServiceSelector } from './components/ServiceSelectorComponent';

@Component({
    selector: 'simple-di-app',
    directives: [ServiceSelector],
    template: `
    <button (click)="invokeService()">Get Value</button>
    <service-selector></service-selector>
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

bootstrap(SimpleDiApp, [
    MyService,
    ViewPortService,
    provide('MyServiceAlias', {useExisting: MyService}),
    provide('SizeService', {useFactory: (viewport: any) => {
        return viewport.determineService();
    }, deps: [ViewPortService]})
]).catch((err: any) => console.error(err));