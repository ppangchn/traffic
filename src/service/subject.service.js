import { Subject } from 'rxjs'

export const ProcessWeightSubject = new Subject()

export function setValue($value) {
  ProcessWeightSubject.next($value)
}