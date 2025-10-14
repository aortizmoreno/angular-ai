import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  providers: [
    AppService,
    HttpClient
  ]
})
export class App implements OnInit {
  protected title = 'angular-recoknition';
  imageSrc: string = '';

  constructor(private appService: AppService) { }

   ngOnInit(): void {
  }

   myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])

  });

  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.myForm.patchValue({
          fileSource: reader.result as string
        });
      };
    }
  }

  submit(){
    console.log(this.myForm.value);
    this.appService.sendImage(this.myForm.controls.fileSource.value)
      .subscribe(res => {
        console.log(res);
      })
  }
}
