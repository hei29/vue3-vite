import request from './interceptor';

export function downloadRequest(url) {
    return request({
        url,
        method: 'get',
        responseType: 'blob'
    })
}

