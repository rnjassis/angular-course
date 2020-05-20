import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', {static: false}) signupForm: NgForm;
  defaultQuestion = 'pet';
  answer: string = '';
  genders=['male','female'];
  submitted: boolean = false;
  user = {
    username:'',
    email:'',
    secretQuestion:'',
    answer:'',
    gender:''
  };

  suggestUserName() {
    const suggestedName = 'Superuser';
    //set the whole form
    // this.signupForm.setValue({
    //   userData:{
    //   username: suggestedName,
    //   email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });

    //set parts of the form
    this.signupForm.form.patchValue({
      userData:{
        username: suggestedName
      }
    })
  }

  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  onSubmit(){
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
}
