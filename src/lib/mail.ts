export function gmailCompose(
    to: string,
    opts?: {subject?:string; body?:string}
){
    const params = new URLSearchParams({
        view: 'cm',
        fs: '1',
        to,
        ...(opts?.subject && {su: opts.subject}),
        ...(opts?.body && {body: opts.body})
    })
    return `https://mail.google.com/mail/?${params.toString()}`;
}