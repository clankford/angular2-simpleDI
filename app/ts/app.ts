import { Component, ReflectiveInjector, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { MyService } from './services/MyService';
import { ViewPortService } from './services/ViewPortService';
import { ApiService, API_URL } from './services/ApiService';
import { ServiceSelector } from './components/ServiceSelectorComponent';
import { ValueInjector } from './components/ValueInjectorComponent';

const isProduction: boolean = true;

@Component({
    selector: 'simple-di-app',
    directives: [ServiceSelector, ValueInjector],
    template: `
    <button (click)="invokeService()">Get Value</button>
    <button (click)="useInjectors()">User Injectors</button>
    <service-selector></service-selector>
    <value-injector></value-injector>
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
    
    useInjectors(): void {
        let injector: any = ReflectiveInjector.resolveAndCreate([
            ViewPortService,
            provide('OtherSizeService', {useFactory: (viewport: any) => {
                return viewport.determineService();
            }, deps: [ViewPortService]})
        ]);
        let sizeService: any = injector.get('OtherSizeService');
        sizeService.run();
    }
}

bootstrap(SimpleDiApp, [
    ApiService,
    MyService,
    ViewPortService,
    provide('MyServiceAlias', {useExisting: MyService}),
    provide(API_URL, {
        useValue: isProduction ?
            'https://production-api.sample.com' :
            'http://dev-api.sample.com'
    }),
    provide('SizeService', {useFactory: (viewport: any) => {
        return viewport.determineService();
    }, deps: [ViewPortService]})
]).catch((err: any) => console.error(err));