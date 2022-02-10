import { Injectable } from '@angular/core';
import { BehaviorSubject, OperatorFunction } from 'rxjs';
import { scan } from 'rxjs/operators';
import { UserProfile } from './types';

export function assign<T>():OperatorFunction<Partial<T>, Partial<T>> {
  console.log('we are here....')
  return scan((oldValue: Partial<T>, newValue: Partial<T>) => {
    console.log('{...oldValue, ...newValue}: ', {...oldValue, ...newValue});
    return {...oldValue, ...newValue};

  })
}

@Injectable()
export class ProfileService {
  constructor() {}

  private profile = new BehaviorSubject<UserProfile>({
    email: '',
    firstname: '',
    lastname: '',
  });

  getProfile() {
    console.log('called GET');
    console.log('assign(): ', assign());
    return this.profile.asObservable().pipe(assign())
  }

  setProfile(data: UserProfile) {
    console.log('called SET setProfile: >>>>> ', data);
    this.profile.next(data);
  }
}
