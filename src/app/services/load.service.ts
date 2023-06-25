import { Injectable } from '@angular/core';
import {interval} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingProgress: number = 0;

  setProgress(progress: number) {
    if (progress) {
      this.startLoadingProgress();
    }
    if (progress === 100) {
      this.startLoadingProgress(progress);
    }
  }
  startLoadingProgress(progress?: number) {
    let intervalTime = 25; // Интервал обновления в миллисекундах
    let maxProgress = 99; // Максимальное значение прогресса

    interval(intervalTime).subscribe(() => {
      if (this.loadingProgress < maxProgress) {
        this.loadingProgress++;
      }
    });
    if (progress) {
      maxProgress = 100; // Максимальное значение прогресса
      intervalTime = 10;
      interval(intervalTime).subscribe(() => {
        if (this.loadingProgress < maxProgress) {
          this.loadingProgress++;
        }
      });
    }
  }
}
