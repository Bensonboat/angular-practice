import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';


@Component({
    selector: 'app-hero',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {
    // heroes = HEROES;
    heroes: Hero[];

    // hero: Hero = {
    //     id: 1,
    //     name: 'Windstorm'
    // };
    constructor(private heroService: HeroService) { }

    ngOnInit(): void {
        this.getHeroes();
    }


    // selectedHero: Hero;
    // onSelect(hero: Hero): void {
    //     this.selectedHero = hero;
    // }

    // getHeroes(): void {
    //     this.heroes = this.heroService.getHeroes();
    // }
    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
      }
}
