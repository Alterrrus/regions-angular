import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  public API = '//localhost:8080/enter';
  public POST = this.API;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API);
  }
  get(id:number){
    return this.http.get(this.API+'/'+id);
  }
  save(region: any): Observable<any> {
    let result: Observable<Object>;
    if (region['href']) {
      result = this.http.put(region.href, region);
    } else {
      result = this.http.post(this.API, region);
    }
    return result;
  }
  delete(id:number){
    return this.http.delete(this.API+'/'+id);
  }


}
