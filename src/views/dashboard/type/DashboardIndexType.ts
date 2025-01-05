import type { ButtonProps as ElButtonProps, ButtonEmits } from 'element-plus'

export type CustomButtonProps = {
  attrs: Partial<ElButtonProps>
  on: ButtonEmits
  text: string
  key: string
}

// interface CustomButtonProps extends Partial<ElButtonProps> {
//   text: string
//   key: string
// }
