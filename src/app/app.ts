import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from './app.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ai } from './app.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  providers: [AppService, HttpClient],
})
export class App implements OnInit {
  protected title = 'angular-recoknition';

  constructor(
    private snackBar: MatSnackBar,
    private appService: AppService
  ) {}

  imageUrl: string | ArrayBuffer | null = null;
  imageName: string | null = null;
  isDragOver: boolean = false;


  response: ai | undefined;
  isLoading = false;
  myForm!: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      file: new FormControl('', [Validators.required]),
      base64Image: new FormControl('', [Validators.required]),
    });
  }

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
          base64Image: (reader.result as string).split(',')[1]
        });
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage(): void {
    if (this.isLoading) {
      return;
    }

    this.imageUrl = null;
    this.imageName = null;
    this.isLoading = false;
    this.response = undefined;
    this.myForm.reset();
  }

  submit(): void {
    if (this.isLoading) {
      return;
    }

    console.log(this.myForm.value);
    this.isLoading = true;
    setTimeout(() => {
      this.appService.sendImage(this.myForm.value.base64Image).subscribe({
        next: (res) => {
          console.log(res);
          this.response = res;
          this.isLoading = false;
          this.myForm.reset();
        },
        error: () => {
          this.snackBar.open('Error!', 'X', { duration: 2000 });
          this.isLoading = false;
        },
      });
    }, 2000);
  }
}
