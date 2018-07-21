import chalk from 'chalk'
export const successBg = '#26a65b'
export const defaultTxt = '#ffffff'
export const infoBg = '#663399'
export const errorBg = '#f22613'
export const warningBg = '#f39c12'
/**
 * util function for logging with chalk
 * @param { String } str - message to be displayed
 * @param { String } color - text color to be rendered
 * @param { String } bg  - background color to be rendered
 */
const log = (str, color = defaultTxt, bg = infoBg) =>
  chalk
    .hex(color)
    .bgHex(bg)
    .bold(str)
export const success = msg => log(msg, defaultTxt, successBg)
export const detail = msg => log(msg, defaultTxt, infoBg)
export const fail = msg => log(msg, defaultTxt, errorBg)
export const warning = msg => log(msg, defaultTxt, warningBg)
export default log
