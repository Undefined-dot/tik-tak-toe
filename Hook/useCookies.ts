export function useCookies () {

    function setCookie (token: string) {
        const cookie = useCookie("user", {
            maxAge: 3600,
        })
        cookie.value =  token
    }

    function deleteCookie () {
        const user = useCookie("user")

        user.value = null
    }

    return {
        setCookie,
        deleteCookie
    }
}