import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from '../models/error.interface';

/**
 * Provides a way to handle http errors globally.
 */
@Injectable()
export class ErrorService {
  unexpectedErrorEvent: Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();

  /**
   * Expected errors have status 400, and have an Error[] in the json response: they are handled by the caller.
   * Unexpected errors: everything else: handled by subscribers.
   */
  public handleError(response: HttpErrorResponse): Error[] {
    let errors = [];
    if (400 === response.status && response.error && response.error.errors) {
      // Let the caller handle the expected error
      errors = <Error[]>response.error.errors;
    } else {
      this.handleUnexpectedError(response);
    }
    return errors;
  }

  handleUnexpectedError(response: HttpErrorResponse) {
    // Let subscribers handle the unexpected error
    this.unexpectedErrorEvent.next(response);
  }
}
