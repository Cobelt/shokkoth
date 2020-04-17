export const GRAPHQL_URI = 
    process.env.NODE_ENV === 'development' ? '//localhost:4001/' : 
    process.env.NODE_ENV === 'production' ? '//grahpql.shokkoth.fr/' : '//graphql.dev.shokkoth.fr'

export const API_URI = 
    process.env.NODE_ENV === 'development' ? '//localhost:5013/' :
    process.env.NODE_ENV === 'production' ? '//api.shokkoth.fr/' : '//api.dev.shokkoth.fr/'
    
export const IMG_URI =
process.env.NODE_ENV === 'development' ? '//dev.img.shokkoth.fr/' : '//img.shokkoth.fr/'

export const DOFUS_IMG_URI = IMG_URI + 'dofus'

export const HOME_IMG_URI = IMG_URI + 'assets/home'
export const BREEDS_IMG_URI = IMG_URI + 'assets/breeds'
export const EQUIPMENTS_IMG_URI = IMG_URI + 'assets/equipments'
export const STATS_IMG_URI = IMG_URI + 'assets/stats'

export const RENDERER_LOOK = 'renderer/look'
