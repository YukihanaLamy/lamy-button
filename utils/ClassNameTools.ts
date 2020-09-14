import { isArray, pick } from "lodash-es";

export function filterClassName(...className: any[]) {
  return className.map((i) =>
    isArray(i) && typeof i[0] === 'object'
      ? Object.values(pick(i.shift(), i.filter((i) => typeof i === 'string')))
      : i
  ).flat().filter((i) => typeof i === 'string').join(' ')
}

export function warpCssModel(cssModel: any) {
  return (className: TemplateStringsArray) => {
    return Object.values(pick(cssModel, className.join(' ').split(' '))).join(' ')
  }
}