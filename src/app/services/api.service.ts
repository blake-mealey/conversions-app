import { Injectable } from '@angular/core';
import { UnitType } from '../models/unit-type';
import { EMPTY, Observable, ObservableInput } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CONVERSIONS_SERVER } from '../../../config/appsettings'
import { ConverterList } from '../models/converter-list';
import { HttpRequest } from './http-request';
import { SimpleConverterList } from '../models/simple-converter-list';
import { AuthParameters } from 'app/models/auth-parameters';
import { UserAuth } from 'app/models/user-auth';
import { IdentityProvider } from '../models/identity-provider';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

/**
 * Handles all requests to the API, including converting raw data to models
 */
@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private handleError(err: any): ObservableInput<any> {
    // TODO: Better error handling
    console.log(err);
    return EMPTY;
  }

  private bindModelToArray<T>(classType: ClassType<T>, model: any): T[] {
    return plainToClass(classType, model, {
      // TODO: Uncomment once a new NPM version becomes available. See: https://github.com/typestack/class-transformer/issues/198
      // excludeExtraneousValues: true
    });
  }

  private bindModelToObject<T>(classType: ClassType<T>, model: any): T {
    let array = this.bindModelToArray(classType, model);
    if (Array.isArray(array)) {
      return array[0];
    } else {
      return array;
    }
  }

  //region Auth API
  public getAuthToken(authParameters: AuthParameters): Observable<UserAuth> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Auth', 'Token')
      .body(authParameters)
      .post()
      .pipe(
        map<any, UserAuth>((model) => this.bindModelToObject(UserAuth, model)),
        catchError(this.handleError));
  }

  public getIdentityProviders(): Observable<IdentityProvider[]> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'auth', 'IdentityProviders')
      .get()
      .pipe(
        map<any, IdentityProvider[]>((model) => this.bindModelToArray(IdentityProvider, model)),
        catchError(this.handleError));
  }
  //endregion

  //region Lists API
  public getLists(pageIndex: number, pageLength: number): Observable<Array<SimpleConverterList>> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Lists')
      .parameter('pageIndex', pageIndex)
      .parameter('pageLength', pageLength)
      .get()
      .pipe(
        map<any, SimpleConverterList[]>((model) => this.bindModelToArray(SimpleConverterList, model)),
        catchError(this.handleError));
  }

  public getList(id: string): Observable<ConverterList> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Lists', id)
      .get()
      .pipe(
        map<any, ConverterList>((model) => this.bindModelToObject(ConverterList, model)),
        catchError(this.handleError));
  }
  //endregion

  //region Units API
  public getUnitTypes(): Observable<UnitType[]> {
    return new HttpRequest(this.httpClient, CONVERSIONS_SERVER)
      .path('api', 'Conversions', 'Types', 'ConversionGraphs')
      .get()
      .pipe(
        map<any, UnitType[]>((data) => {
          return data.map((model) => {
            const unitType = this.bindModelToObject(UnitType, model.unitType);
            unitType.conversionGraph = model.conversionGraph;
            return unitType;
          });
        }),
        catchError(this.handleError));
  }
  //endregion
}
