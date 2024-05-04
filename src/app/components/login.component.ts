import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class=" w-full h-full flex justify-center items-center">
      <mat-card class="w-96">
        <mat-card-content>
          <form
            [formGroup]="form"
            (ngSubmit)="login()"
            class="w-full flex justify-center flex-col"
          >
            <div>id</div>
            <mat-form-field>
              <input matInput type="text" formControlName="loginId" />
            </mat-form-field>
            <div>password</div>
            <mat-form-field>
              <input matInput type="password" formControlName="password" />
            </mat-form-field>
            <div>
              <button mat-raised-button type="submit" [disabled]="form.invalid">
                Login
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,

  styles: [],
})
export class LoginComponent {
  form = this.fb.group({
    loginId: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {}

  login(): void {
    const { loginId, password } = this.form.value;

    this.auth.getUserByEmail(loginId as string).subscribe((res) => {
      console.log(res, 'rees');
      if (res) {
        this.router.navigate([`home`]);
        sessionStorage.setItem('loginUser', String(res));
      }
    });
  }
}
