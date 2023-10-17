import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { HttpService } from "../common/http.service";
import { HomeList } from './../../models/common/home/home-list.model';
import { Dictionary } from "src/models/common/dictionary";


import { API } from "src/config/api";

@Injectable({
  providedIn: 'root'
})
export class VideoListingsService {
  private categoryeData:any;

  constructor(    private readonly _httpService: HttpService
    ) {    this.categoryeData = []; }
  public getCategoryRecords() {
    return this._httpService.get<HomeList[]>(API.categories.getAllData)
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
              }
              return this.categoryeData;
            })
        );
  }
  
  public getVideoRecords(searchKeyword:string) {
    var param = new Dictionary<any>();
    param.add("searchKey", searchKeyword)
    console.log(searchKeyword,"john");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing.replace('{videoSearchKey}', searchKeyword.toString()))

  //  return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing,param)
  //return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing+"")
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];

              }
              return this.categoryeData;
            })
        );
  }
  public getVideoRecordsViewAll(searchKeyword:string) {
    var param = new Dictionary<any>();
    param.add("searchKey", searchKeyword)
    console.log(searchKeyword,"john");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getAllVideoListingViewAll.replace('{videoSearchKey}', searchKeyword.toString()))

  //  return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing,param)
  //return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing+"")
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];

              }
              return this.categoryeData;
            })
        );
  }
  public getVideoRecordsViewAllForTopic(searchKeyword:string) {
    var param = new Dictionary<any>();
    param.add("searchKey", searchKeyword)
    console.log(searchKeyword,"john");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getAllVideoListingViewAllForTopic.replace('{videoSearchKey}', searchKeyword.toString()))

  //  return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing,param)
  //return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing+"")
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];

              }
              return this.categoryeData;
            })
        );
  }
  public getVideoRecordsViewAllPagination(searchKeyword:string) {
    var param = new Dictionary<any>();
    param.add("searchKey", searchKeyword)
    console.log(searchKeyword,"john");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(searchKeyword)

  //  return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing,param)
  //return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing+"")
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];

              }
              return this.categoryeData;
            })
        );
  }
  public getTopVideoRecord() {

    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getTopVideo)

  //  return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing,param)
  //return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing+"")
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];
              }
              return this.categoryeData;
            })
        );
  }
  public getTopVideoRecordAll() {

    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getTopVideoAll)

  //  return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing,param)
  //return this._httpService.get<HomeList[]>(API.categories.getAllVideoListing+"")
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];
              }
              return this.categoryeData;
            })
        );
  }
  
  public getVideoRecord(videoId:number):Observable<HomeList[]> {
    var param = new Dictionary<any>();
    param.add("searchKey", videoId)
    console.log(videoId,"dfsdf");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getVideoDetails.replace('{videoParamId}', videoId.toString()))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
              }
              return this.categoryeData;
            })
        );
  }
  public reportVideoMissing(videoId:number):Observable<HomeList[]> {
    var param = new Dictionary<any>();
    param.add("searchKey", videoId)
    console.log(videoId,"dfsdf");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.reportVideoMissing.replace('{videoParamId}', videoId.toString()))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
              }
              return this.categoryeData;
            })
        );
  }
  public updateVideoViewCount(videoId:number):Observable<HomeList[]> {
    var param = new Dictionary<any>();
    param.add("searchKey", videoId)
    console.log(videoId,"dfsdf");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.updateVideoViewCounts.replace('{videoParamId}', videoId.toString()))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
              }
              return this.categoryeData;
            })
        );
  }

}
