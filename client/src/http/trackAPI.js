import {$host, $authHost} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const deleteType = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/type/'+id});
    return data;
}

// export const createPerformer = async (performer) => {
//     const {data} = await $host.post('api/performer', performer)
//     return data
// }

// export const fetchPerformers = async () => {
//     const {data} = await $host.get('api/performer', )
//     return data
// }

export const createTrack = async (track) => {
    const {data} = await $host.post('api/track', track)
    return data
}

export const fetchTracks = async (typeId, page, limit= 8) => {
    const {data} = await $host.get('api/track', {params: {
            typeId, page, limit
        }})
    return data
}

export const fetchOneTrack = async (id) => {
    const {data} = await $host.get('api/track/' + id)
    return data
}

export const fetchDeleteTrack = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/track/${id}`});
    return data;
}

export const updateTracks = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/track/${id}`, data: body});
    return data;
}

export const getAllTracksInAdminPage = async (name, page = 1, filter = "All") => {
    const {data} = await $authHost({method:'GET', url:`api/track/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}

export const addTrackToCart = async (track) => {
    const {data} = await $authHost.post('api/cart', track);
    return data;
}

export const getTrackFromCart = async () => {
    const {data} = await $authHost.get('api/cart');
    return data;
}

export const deleteTrackFromCart = async (id) => {
    const {data} = await $authHost.delete(`api/cart/${id}`);
    return data;
}