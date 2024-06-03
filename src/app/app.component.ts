import { Router, RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'UmmTimeCard';

  router = inject(Router);
  snacker = inject(MatSnackBar);

  constructor() {
    sessionStorage.setItem('loginUser', '寫入一個沒有意義的文字假裝已經登入');
    this.router.navigate(['/home']);
    this.snacker.open(
      '歡迎使用 UmmTimeCard, 已經寫入一個沒有意義的文字假裝已經登入',
      '關閉',
      { duration: 5000 },
    );
  }
}
