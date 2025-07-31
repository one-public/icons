import IconItem from './IconItem'
import { IconProps } from '../types'

// 保持向后兼容的包装组件
export default function Icons(props: IconProps) {
  return <IconItem {...props} />
}
