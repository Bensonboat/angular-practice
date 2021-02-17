import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';


import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    constructor(
        //新增一個私有的 messageService 屬性引數。 
        //Angular 將會在建立 HeroService 時把 MessageService 的單例注入到這個屬性中。
        private messageService: MessageService,
        private http: HttpClient,
    ) { }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
    private heroesUrl = 'api/heroes';  // URL to web api

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    //   getHeroes(): Hero[] {
    //     return HEROES;
    //   }

    /** GET heroes from the server */
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError<Hero[]>('getHeroes', []))
            );
    }

    getHero(id: number): Observable<Hero> {
        // TODO: send the message _after_ fetching the hero
        // this.messageService.add(`HeroService: fetched hero id=${id}`);
        return of(HEROES.find(hero => hero.id === id));
    }
}
