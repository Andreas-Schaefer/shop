import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
      updateOn: 'blur'
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
      ],
      updateOn: 'blur'
    }),
    message: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ],
      updateOn: 'blur'
    })
  });
  messageLength = 1000;

  constructor(private renderer: Renderer2) {
  }

  get name() {
    return this.contactForm.get('name');
  }

  ngOnInit() {
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  @HostListener('window:keyup')
  updateMessageLength() {
    this.messageLength = 1000 - this.renderer.selectRootElement('#messageBox').value.length;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      alert('Your email was sent!');
    }
  }
}
