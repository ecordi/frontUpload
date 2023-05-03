import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'archivo';
  fileToUpload: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files.item(0);
  }

  uploadFile(): void {
    if (!this.fileToUpload) {
      console.error('No se seleccionó ningún archivo');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileToUpload);

    this.http.put('http://localhost:3000/api/v1/import-external-agents/create', formData)
      .subscribe(
        response => console.log('Solicitud completada con éxito', response),
        error => console.error('Ocurrió un error al hacer la solicitud', error)
      );
  }
}
