import { Component, Inject } from '@angular/core';
import { MyService } from '../services/MyService';

@Component({
    selector: 'service-selector',
    template: `
    <button (click)="invokeApi()">Selector Invoke API</button>
    `
})
export class ServiceSelector {
    constructor(private myService: MyService,
                @Inject('MyServiceAlias') private aliasService: MyService,
                @Inject('SizeService') private sizeService: any) {
                }
    invokeApi(): void {
        console.log(this.myService.getValue());
        console.log(this.aliasService.getValue());
        this.sizeService.run();
    }
}