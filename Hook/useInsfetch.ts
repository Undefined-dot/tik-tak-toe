export function useInsFetch (url: string, method: any, data: any) {
    const token = useCookie("user")

    const fetch = useFetch(url, {
        method: method,
        body: data,
        headers: {
            'Content-Type': 'application/json'   // Type de contenu JSON
        },
        baseURL: "https://703d-129-0-99-219.ngrok-free.app",
        onRequest({request, options}) {
            if (options.headers) {
                options.headers = options.headers || {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                }
            }
            console.log(request)
        },
        onResponse({ request, response, options }) {
                console.log(response)
        },
        onResponseError({request, response, options}) {
            console.log(response)
        }
    })

    return {
        fetch
    }
}