import { faker } from '@faker-js/faker';
import { observable, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
//import { from } from 'rxjs'
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import  axios  from 'axios';
import { interval,take } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';





interface Car {
  name:string;
  model:string;
  yearOfRelease:number;
  brand:string;
  color:string;
}
interface Scrap {
  brand: string,
  yearOfRelease:number,
}

function randomCar(): Car {
  return {
    name:faker.name.firstName(),
    model:faker.random.alphaNumeric(),
    yearOfRelease:faker.datatype.number({min:1900,max:2022}),
    brand:faker.company.companyName(),
    color:faker.commerce.color()
  }
}
console.log(randomCar());

//

const observable1 = new Observable((subscriber) =>{
  setInterval(() => {
subscriber.next(randomCar());
  },1000);
});
const observer = {
  next:(value) => {
    console.log(value);

  },
  error:(err) => {
    console.log(err);
  }, 
  complete:() => {
    console.log();
  },
};

//

//observable1.pipe(
  
  //filter((value: Car) => value.color === 'black' && value.yearOfRelease > 2000)

//).subscribe(value => {
  //console.log(value);
//});

///
///observable2

const observable2 = observable1.pipe(
  
  filter((value: Car) => value.color === 'black' && value.yearOfRelease < 2000));

  const subscriber2 = observable2.subscribe((value) => { 
   // console.log( 'observable2' , value);
  });

  ///
  ///observable3

  const observable3 = observable2.pipe(

    map((value) => {

      return { brand:value.brand, yearOfRelease:value.yearOfRelease } as Scrap;
  
    } )
  );

  const subscriber3 = observable3.subscribe((value) => {
   // console.log( 'observable3' , value);
  })

  ///
  ///observable4

const observable4 = observable1.pipe(

  switchMap(() => axios.get('https://random-data-api.com/api/cannabis/random_cannabis?size=30'))
);

const subscriber4 = observable4.subscribe((value) => {
//  console.log( 'observable4' , value);
})

///
///observable5

const observable5 = interval(100).pipe(

  concatMap(() => axios.get('https://random-data-api.com/api/cannabis/random_cannabis?size=30'))
);

const subscriber5 = observable5.subscribe((value) => {
 //console.log( 'observable5' , value);
})

///
///observable6

const observable6 = interval(50).pipe(take(5),

  mergeMap(() => axios.get('https://random-data-api.com/api/cannabis/random_cannabis?size=30'))
);

const subscriber6 = observable6.subscribe((value) => {
 console.log( 'observable6' , value);
})







//const observable2 = new Observable((subscriber) =>{
  //setInterval(() => {
//subscriber.next(randomCar());
  //},1000);
//});

//observable1.subscribe(observer);