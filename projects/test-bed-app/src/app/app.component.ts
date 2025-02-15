import { Component } from '@angular/core';
import { TopButtonComponent } from '@jamg-angular/ngx-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-bed-app';
}
