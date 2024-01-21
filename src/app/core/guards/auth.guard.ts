import { inject } from "@angular/core";
import { CanActivateFn,  Router, UrlTree } from "@angular/router";
import { AuthService } from "src/app/pages/services/auth.service";
import { Subject } from "rxjs";

export function authGuard(loginIsRequired = true): CanActivateFn {
    const guardFunction = () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);
        const subject = new Subject<boolean | UrlTree>();

        authService.$user.subscribe((user: any) => {
            if ((loginIsRequired && user) || (!loginIsRequired && !user)) {
                return subject.next(true);
            }
            const redirectRoute = loginIsRequired ? '/login' :'/wallet'; 
            subject.next(router.createUrlTree([redirectRoute]));
        });

        return subject.asObservable();
    };

    return guardFunction
}