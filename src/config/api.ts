import { environment } from "src/environments/environment";



export class API {
    public static apiBaseUrl = environment.apiBaseUrl;

    public static home = {
        getAllData: API.apiBaseUrl + "home"                
    }
    public static categories = {
        getAllData: API.apiBaseUrl + "categories",
        getAllVideoListing: API.apiBaseUrl + "video/search/{videoSearchKey}",
        getAllVideoListingViewAll: API.apiBaseUrl + "video/secondarysearch/{videoSearchKey}",
        getAllVideoListingViewAllForTopic: API.apiBaseUrl + "topic/{videoSearchKey}",

        getVideoDetails: API.apiBaseUrl + "video/details/{videoParamId}",
        getCategoryDetails: API.apiBaseUrl + "category/{categoryId}",

        getTopVideo: API.apiBaseUrl + "today-top-videos",
        getTopVideoAll: API.apiBaseUrl + "secondary-today-top-videos",
        reportVideoMissing: API.apiBaseUrl + "video/missing-report/{videoParamId}",
        updateVideoViewCounts: API.apiBaseUrl + "video/view-count/{videoParamId}",
    }
}