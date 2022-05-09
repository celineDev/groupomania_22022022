import { axiosInstance } from '../utils/AxiosConfig'

class Api {
    async getPost() {
        return await axiosInstance.GET("api/post/")
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log("Erreur")
            console.log(err)
        })
    }

    async createPost(post) {
        return await axiosInstance.POST("api/post", post)
    }

    async updatePost(id, update) {
        return await axiosInstance.PUT(`api/post/${id}`, update)
    }

    async updatePicture(id, update) {
        return await axiosInstance.PUT(`api/post/${id}`, update)
    }

    async deletePost(id) {
        return await axiosInstance.DELETE(`api/post/${id}`)
    }

    // user crud
    async getUser(id) {
        return await axiosInstance.GET(`api/auth/${id}`)
    }
    async updateUser(id, newData) {
        return await axiosInstance.PUT(`api/auth/${id}`,newData)
    }

    async deleteUser(id) {
        return await axiosInstance.DELETE(`api/auth/${id}`)
    }

    // user connexion and create
    async login(data) {
        return await axiosInstance.POST(`api/auth/login`, data)
    }

    async signup(data) {
        return await axiosInstance.POST(`api/auth/signup`, data)
    }

    async logout() {
        return await axiosInstance.POST(`api/auth/logout`)
    }

    // comment
    async getAllComment(postId) {
        return await axiosInstance.GET(`api/post/${postId}/comment`)
    }

    async countComment(id) {
        return await axiosInstance.GET(`api/post/${id}/count-comment`)
    }
}

export const apiRequest = new Api();
