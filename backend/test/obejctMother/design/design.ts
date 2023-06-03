import type IDesign from '../../../../share/domain/design'

export const Design = ({ name = 'Design', content = '', svg = '', _id = '' }: IDesign): IDesign => {
  return {
    name,
    content,
    svg,
    _id
  }
}
