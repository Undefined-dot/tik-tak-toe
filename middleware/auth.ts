export default defineNuxtRouteMiddleware(() => {
    const route = useRoute()
        const fullPath = route.fullPath
        const part = fullPath.split('=')[1]
        
        if (part !== undefined) {
            const cookie = useCookie("user", {
                maxAge: 3600,
            })
            cookie.value =  part
        } else {
            const user = useCookie("user")

            if (!user.value) {
                return navigateTo("/auth")
            }
        }
})