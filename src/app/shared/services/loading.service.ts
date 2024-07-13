import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// `SkipLoading` უნდა იყოს `HttpContextToken` იმპორტირებული
import { HttpContextToken } from '@angular/common/http';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  loadingOn() {
    this.isLoadingSubject.next(true);
  }

  loadingOff() {
    this.isLoadingSubject.next(false);
  }
}
