const { M4NG4_API } = process.env

export function query(url: string) {
    return fetch(`${M4NG4_API}${url}`).then(res => res.json())
}