import { Component, OnInit } from '@angular/core';
import { filter, from, map, mergeMap, of, reduce } from 'rxjs';

@Component({
  selector: 'app-average-age',
  templateUrl: './average-age.component.html',
  styleUrl: './average-age.component.scss'
})
export class AverageAgeComponent implements OnInit{
  persons = [

    { id: 1, name: "Jan Kowalski" },

    { id: 2, name: "John Doe" },

    { id: 3, name: "Jarek Kaczka" }

  ];


  ages = [

    { person: 1, age: 18 },

    { person: 2, age: 24 },

    { person: 3, age: 666 }

  ];


  locations = [

    { person: 1, country: "Poland" },

    { person: 3, country: "Poland" },

    { person: 1, country: "USA" }

  ];


  averageAge: number = 0;

  personsList: any[] = [];




  ngOnInit(): void {

    from(this.persons).pipe(

      // Merge with ages and locations

      mergeMap(person => {

        const ageInfo = this.ages.find(a => a.person === person.id);

        const locationInfo = this.locations.find(l => l.person === person.id);

        return of({

          ...person,

          age: ageInfo?.age ?? null,

          country: locationInfo?.country ?? null

        } as { id: number; name: string; age: number | null; country: string | null });

      }),


      filter(person => person.country === "Poland" && person.age !== null),

    

      reduce((acc: { totalAge: number; count: number; persons: any[]; averageAge: number }, person) => {

        acc.totalAge += person.age!;

        acc.count += 1;

        acc.persons.push(person); 

        return acc;

      }, { totalAge: 0, count: 0, persons: [], averageAge: 0 }), 

      

      map(result => {

        result.averageAge = result.count > 0 ? result.totalAge / result.count : 0;

        return result;

      })

    ).subscribe(result => {

      this.averageAge = result.averageAge;

      this.personsList = result.persons;



      console.log('Result:', result);

    }, error => {

      console.error('Error data:', error);

    });

  }

}
