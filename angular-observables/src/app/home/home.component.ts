import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, interval, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private hSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.hSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customObservable = Observable.create((observer) => {
      let count: number = 0;
      setInterval(() => {
        if (count === 5) {
          observer.complete(); // ends the obsevable, no need to unsunscribe
        }
        if (count > 3) {
          observer.error("count > 3"); // halts the observable, no need to unsubscribe
        }
        observer.next(count);
        count++;
      }, 1000);
    });

    this.hSubscription = customObservable.pipe(
      filter(data => {
        return data > 0;
      }),
      map((data: number) => {
        return "round " + (data + 1);
      })
    ).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("completed");
      }
    );
  }

  ngOnDestroy() {
    this.hSubscription.unsubscribe();
  }
}
