const { Observable } = require("rxjs")

const Observable =new Observable((Subscriber)=> {

  Subscriber.next(10);
  Subscriber.next(20);

  Subscriber.next(30);


});
const observer = {
  next:(value)=> {
    console.log("observer got value" + value);
  },
  error:(err)=> {
    console.log("Observer got error"+ err);
  },
  complete:()=> {
    console.log("observer  got all data");
  }
  };
