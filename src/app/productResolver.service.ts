import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HomeService } from '../app/home/home.service';

@Injectable()

export class ProductResolverService implements Resolve<any[]> {
    constructor(private homeService: HomeService){}
    resolve(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): 
                Observable<any> {
                    return this.homeService.getItem();
                }
}