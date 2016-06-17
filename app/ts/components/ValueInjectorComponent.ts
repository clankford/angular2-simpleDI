import { Component } from '@angular/core';
import { ApiService } from '../services/ApiService';

@Component({
    selector: 'value-injector',
    template: `
    <button (click)="invokeApi()">Invoke Value Injector API</button>
    `
})
export class ValueInjector {
    constructor(private apiService: ApiService) {}
    
    invokeApi(): void {
        this.apiService.get();
    }
}