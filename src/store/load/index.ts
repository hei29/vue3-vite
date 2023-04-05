import request from '@/api/interceptor'

export const loadImg = (dir:string, file:string) => {
    return request({
        method: 'get',
        url: `/AzurLane/painting/${dir}/${file}`
    })
}
