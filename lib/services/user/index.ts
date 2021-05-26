import request from '../axios';

const fetcher = request('users');

/**
 * @description:  注册账号
 * @param {string} account 账号
 * @param {string} pwd 密码
 * @return {*}
 */
export function register({account, pwd}: {account: string; pwd: string}) {
  return fetcher('/register', {method: 'POST', data: {account, pwd}});
}

/**
 * @description:  登录
 * @param {string} account 账号
 * @param {string} pwd 密码
 * @return {*}
 */
export function login({account, pwd}: {account: string; pwd: string}) {
  return fetcher('/login', {method: 'POST', data: {account, pwd}});
}
