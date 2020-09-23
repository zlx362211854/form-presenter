export function formatMoney(value, params) {
  let {digit, prefix = ''} = params || {}
  if (value === null) return ''
  if (typeof value === 'undefined') return ''
  if (typeof value !== 'number') value = Number(value)
  if (isNaN(value)) return 'formatMoney仅支持数字或纯数字字符串'
  if (!digit || typeof digit !== 'number') digit = 2 // 小数点后位数
  value = value.toFixed(digit).toString()
  const list = value.split('.')
  const p = list[0].charAt(0) === '-' ? '-' : ''
  let num = p ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix} ${p}${result}${list[1] ? `.${list[1]}` : ''}`
}