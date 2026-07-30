export const placeholderPattern = /[{]([A-Za-z0-9_]+)[}]|:([A-Za-z0-9_]+)/g

export const exactPluralPattern = /^\s*[{](-?\d+(?:\.\d+)?)[}]/

export const intervalPluralPattern =
  /^\s*([[\]])\s*(-?\d+(?:\.\d+)?|\*)\s*,\s*(-?\d+(?:\.\d+)?|\*)\s*([[\]])/

export const exactPluralPrefixPattern = /^\s*[{]-?\d+(?:\.\d+)?[}]\s*/

export const intervalPluralPrefixPattern =
  /^\s*[[\]]\s*(?:-?\d+(?:\.\d+)?|\*)\s*,\s*(?:-?\d+(?:\.\d+)?|\*)\s*[[\]]\s*/
