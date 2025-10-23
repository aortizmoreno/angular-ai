import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from './app.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
export class App {
  protected title = 'angular-recoknition';

  constructor(private appService: AppService) { }

  imageUrl: string | ArrayBuffer | null = null;
  imageName: string | null = null;
  isDragOver: boolean = false;
    myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.processFile(input.files[0]);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    if (event.dataTransfer?.files?.length) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  processFile(file: File): void {
    if (file.type.startsWith('image/')) {
      this.imageName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
         this.myForm.patchValue({
          fileSource: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage(): void {
    this.imageUrl = null;
    this.imageName = null;
  }

  submit(){
    console.log(this.myForm.value);
    this.appService.sendImage(this.myForm.controls.fileSource.value)
      .subscribe(res => {
        console.log(res);
      })
  }
}
