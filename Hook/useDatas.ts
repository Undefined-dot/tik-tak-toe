export function useDatas (url: string, method: any, data: any) {
    const token = useCookie("user")

    const fetch = useFetch(url, {
        method: method,
        body: data,
        headers: {
            'Content-Type': 'application/json'   // Type de contenu JSON
        },
        baseURL: "https://126a-169-155-235-107.ngrok-free.app",
        onRequest({request, options}) {
            console.log(options)
            if (options.headers) {
                options.headers = options.headers || {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                }
            }
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