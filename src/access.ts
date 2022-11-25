/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  //currentUser 从全局状态获取当前的用户信息
  const {currentUser} = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === 1,
  };
}
