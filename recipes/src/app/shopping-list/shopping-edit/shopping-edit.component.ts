import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static:false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static:false}) amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
    const iN: string = this.nameInputRef.nativeElement.value;
    const iA: number  = this.amountInputRef.nativeElement.value;
    const iG = new Ingredient(iN, iA);
    this.ingredientAdded.emit(iG);
  }
}
