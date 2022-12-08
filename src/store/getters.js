const getters = {
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    roleType:state => state.user.userInfo.roleType,
    tabbarList: state => {
        console.log(state)
        let type = state.user.userInfo.roleType && state.user.userInfo.roleType >= 11 ? 'adminTab' : 'userTab';
        return state.tabbar.list[type]
    }
}
export default getters