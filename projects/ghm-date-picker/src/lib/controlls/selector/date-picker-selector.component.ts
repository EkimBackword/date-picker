import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerStore } from '../../services/date-picker.store';

@Component({
    selector: 'ghm-date-picker-selector',
    styleUrls: ['./date-picker-selector.component.scss'],
    template: `
        <div class="btn-left" (click)="changeMonth(-1)"></div>
        <div class="title" (click)="isOpen = !isOpen">
            {{selectedMonth | myDatePickerPipe}},<span class="year">{{selectedYear}}</span>
        </div>
        <div class="btn-right" (click)="changeMonth(1)"></div>

        <div class="month_list" *ngIf="isOpen">
            <div class="year_switch">
                <div (click)="changeYear(-1)" class="year_switch-btn-left btn-left"></div>
                <div class="year_switch-value">{{selectedYear}}</div>
                <div (click)="changeYear(1)" class="year_switch-btn-right btn-right"></div>
            </div>
            <div (click)="isOpen = false; datePickerStore.changeMonth(month);"
                class="month_list-item" *ngFor="let month of datePickerStore.getMonthes | async | ObjecToArrayByKeysPipe">
                {{month | myDatePickerPipe}}
            </div>
        </div>
    `
})

export class DatePickerSelectorComponent implements OnInit, OnDestroy {

    public selectedYear: number;

    public selectedMonth: number;

    public isOpen = false;

    private ngUnsubscribe: Subject<void> = new Subject<void> ();

    constructor(public datePickerStore: DatePickerStore) {}

    public ngOnInit() {

        combineLatest(
            this.datePickerStore.getSelectedMonth,
            this.datePickerStore.getSelectedYear
        ).pipe(
            takeUntil(this.ngUnsubscribe)
        ).subscribe(([month, year]) => {
            this.selectedMonth = month;
            this.selectedYear = year;
        });
    }

    public ngOnDestroy() {
        this.unsubscribe();
    }

    public changeYear(val: number) {
        this.datePickerStore.changeYear(this.selectedYear + val);
    }

    public changeMonth(val: number) {
        if ((this.selectedMonth === 11 && val > 0) || (this.selectedMonth === 0 && val < 0)) {
            this.datePickerStore.changeMonth(this.selectedMonth === 11 ? 0 : 11);
            this.datePickerStore.changeYear(this.selectedYear + val);
        } else {
            this.datePickerStore.changeMonth(this.selectedMonth + val);
        }
    }

    private unsubscribe(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
