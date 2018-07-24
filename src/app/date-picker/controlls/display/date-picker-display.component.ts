import { Component, EventEmitter, Output } from '@angular/core';
import { DatePickerStore } from '../../services/date-picker.store';

@Component({
    selector: 'app-date-picker-display',
    styleUrls: ['./date-picker-display.component.scss'],
    template: `
        <div (click)="open.next()" class="calendar__btn">
            <div class="calendar__btn-val" *ngFor="let date of datePickerStore.getSelectedDate | async">{{date.full | date: 'dd/MM/yyyy' }}</div>
        </div>
    `
})

export class DatePickerDisplayComponent {

    @Output() open: EventEmitter<boolean> = new EventEmitter();

    constructor(private datePickerStore: DatePickerStore) {}

}