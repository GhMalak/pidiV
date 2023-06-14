// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
// import { Observable } from "rxjs";

// export class ExampleRouteResolver implements Resolve<any> {

//     private previousUrl: string;
  
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
//       if (this.refresh(state.url)) {
//         this.previousUrl = state.url;
//         return fetchData();
//       }
//       this.previousUrl = state.url;
//       return NEVER;
//     }
  
//     private refresh(currentUrl: string): boolean {
//       return !this.previousUrl || this.previousUrl === currentUrl;
//     }
  
//   }