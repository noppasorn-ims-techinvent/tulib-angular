import { CanMatchFn } from '@angular/router';

export const authCanmatchGuard: CanMatchFn = (route, segments) => {
  return true;
};
