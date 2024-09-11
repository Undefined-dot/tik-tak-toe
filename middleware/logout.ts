export default defineNuxtRouteMiddleware (() => {
    const user = useCookie("user")

    user.value = null
})