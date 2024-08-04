import { show } from './method'

export type {ToastShowProps} from './method'
export interface ToastProps {
  show : typeof show;
}

export const Toast: ToastProps = {
  show
}
