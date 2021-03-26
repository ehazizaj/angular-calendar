import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Songs} from './models/songs';
import {environment as env} from '../../../environments/environment';
import {formatDateForSongUpdate} from '../../shared/dateUtilis';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }


  getSongs(): Observable<Songs[]> {
    const url = `${env.api}${env.services.songs.url}`;
    return this.http.get<Songs[]>(url);
  }

  deleteSong(id: number | string): Observable<void> {
    const url = `${env.api}${env.services.songs.url}`;
    return this.http.delete<void>(`${url}/${id}`);
  }

  updateSong(data): Observable<Songs> {
    const dataForUpdate = {
      artist: data.artist,
      title: data.title,
      album: data.album,
      release_date: formatDateForSongUpdate(data.start),
    };
    const url = `${env.api}${env.services.songs.url}`;
    return this.http.put<Songs>(`${url}/${data.id}`, dataForUpdate);
  }

}
