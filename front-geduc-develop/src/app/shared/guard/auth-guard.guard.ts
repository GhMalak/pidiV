import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.authService.isAuthenticated()){
      if(state.url != '/login'){
        this.router.navigate(['/login']);
      }
      return false;
    } else {
      return true;
    }
  }

}
