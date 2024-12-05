import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css'],
})
export class SelectorPageComponent implements OnInit {

  isLoading: boolean = false;
  progressValue: number = 0;


  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region : ['', Validators.required ],
    country: ['', Validators.required ],
    border : ['', Validators.required ],
  });


  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
  ) {


  }

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
    this.onBorderChanged();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }


  onRegionChanged(): void {

    this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.progressValue =0;
          this.myForm.get('country')!.setValue('');
        }),
        tap( () => this.borders = [] ),
        switchMap( (region) => this.countriesService.getCountriesByRegion(region) ),
      )
      .subscribe( countries => {
        this.CargarSpinner();
        this.countriesByRegion = countries;

      });





  }

  onCountryChanged(): void {
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap(() => {
        this.isLoading = true;
        this.progressValue =0;
        this.myForm.get('border')!.setValue('');

      }),
      filter( (value: string) => value.length > 0 ),
      switchMap( (alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode) ),
      switchMap( (country) => this.countriesService.getCountryBordersByCodes( country.borders ) ),
    )
    .subscribe( countries => {
            this.borders = countries;
            this.CargarSpinner();
    });
  }


  onBorderChanged(): void {
    this.myForm.get('border')!.valueChanges
    .pipe(
      filter( (value: string) => value.length > 0 ),
      tap(() => {
        this.isLoading = true;
        this.progressValue =0;
      }),
  )
    .subscribe(  response => {
      this.CargarSpinner();
    });
  }


  CargarSpinner() : void{

console.log("Entro spinner 1 ");

       // Simula el progreso

      const interval = setInterval(() => {
        if (this.progressValue < 100) {
          this.progressValue += 10;
        } else {
          this.isLoading = false;
          clearInterval(interval);
        }
      }, 50);

      console.log("Entro spinner 2 ");



    }



}
