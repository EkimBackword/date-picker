import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ICalendarDay, DatePickerService } from './date-picker.service';
import { IDateOptions } from '../date-picker.component';
import { DatePickerReviewService } from './date-picker.review.service';

export interface IConfig {
    minDate?: ICalendarDay;
    maxDate?: ICalendarDay;
}

@Injectable()

export class DatePickerStore {

    private now: Date = new Date();

    private currentDate: BehaviorSubject<Date> = new BehaviorSubject(this.now);

    private monthes: BehaviorSubject<any> = new BehaviorSubject({
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'Novembver',
        11: 'Desember'
    });

    private days: BehaviorSubject<any> = new BehaviorSubject([
        'Mn',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ]);

    private selectedYear: BehaviorSubject<any> = new BehaviorSubject(this.now.getFullYear());

    private selectedMonth: BehaviorSubject<any> = new BehaviorSubject(this.now.getMonth());

    private selectedDate: BehaviorSubject<ICalendarDay[]> = new BehaviorSubject(<ICalendarDay[]>[]);

    private options: BehaviorSubject<ICalendarDay> = new BehaviorSubject(<ICalendarDay>{});

    constructor(
        private datePickerService: DatePickerService,
        private datePickerReviewService: DatePickerReviewService
    ) {}

    public get getOptions(): Observable<ICalendarDay> {
        return this.options.asObservable();
    }

    public changeOptions(options: IDateOptions) {
        const config = <ICalendarDay>{};
        ['minDate', 'maxDate'].forEach((key) => {
            if (options[key] && this.datePickerReviewService.checkValidDate(options[key])) {
                config[key] = <ICalendarDay>{
                    day: options[key].getDate(),
                    month: options[key].getMonth(),
                    year: options[key].getFullYear()
                };
            }
        });
        this.options.next(config);
    }

    public get getSelectedDate(): Observable<ICalendarDay[]> {
        return this.selectedDate.asObservable();
    }

    public changeSelectedDate(date: ICalendarDay[]) {
        this.selectedDate.next(date.sort(this.datePickerService.sortDates));
    }

    public get getMonthes(): Observable<any> {
        return this.monthes.asObservable();
    }

    public get getDays(): Observable<any> {
        return this.days.asObservable();
    }

    public get getSelectedYear(): Observable<any> {
        return this.selectedYear.asObservable();
    }

    public changeYear(year) {
        this.selectedYear.next(year);
    }

    public changeMonth(month) {
        this.selectedMonth.next(month);
    }

    public get getSelectedMonth(): Observable<any> {
        return this.selectedMonth.asObservable();
    }

    public get getCurrentDate(): Observable<Date> {
        return this.currentDate.asObservable();
    }
}
