import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = `localhost:3000`;

  constructor(private http: HttpClient) {}

  getRegion(): Observable<IRegion[]> {
    return of([
      {
        id: 1,
        region: '北部',
        createDate: '2001-01-01',
      },
      // {
      //   id: 2,
      //   region: "中部",
      //   createDate: "2002-01-01"
      // },
      {
        id: 3,
        region: '南部',
        createDate: '2003-01-01',
      },
      {
        id: 4,
        region: '東部',
        createDate: '2004-01-01',
      },
    ]);
  }

  getLocation(): Observable<ILocation[]> {
    return of([
      {
        id: '5',
        location: '宜蘭',
        locationNumber: '900',
        region: '東部',
        address: '宜蘭縣宜蘭路',
        isValid: true,
        phone: '06-00000000',
        createDate: '1/1/2004',
      },
      {
        id: '6',
        location: '花蓮',
        locationNumber: '1000',
        region: '東部',
        address: '花蓮縣花蓮鄉花蓮路',
        isValid: true,
        phone: '07-0000000',
        createDate: '1/1/2004',
      },
      {
        id: '12',
        location: '新北',
        locationNumber: '1600',
        region: '北部',
        address: '新北市新北路',
        isValid: true,
        phone: '02-0000000',
        createDate: '1/1/2004',
      },
      {
        id: '13',
        location: '新竹',
        locationNumber: '1700',
        region: '北部',
        address: '新竹市新竹區新竹路',
        isValid: true,
        phone: '03-43213333',
        createDate: '1/1/2004',
      },
      {
        id: '18',
        location: '台南',
        locationNumber: '2200',
        region: '南部',
        address: '台南市官田區官田路',
        isValid: true,
        phone: '06-5555555',
        createDate: '1/1/2004',
      },
      {
        id: '19',
        location: '高雄',
        locationNumber: '2300',
        region: '南部',
        address: '高雄市七賢路',
        isValid: true,
        phone: '07-1112444',
        createDate: '1/1/2004',
      },
    ]);
  }

  /** 區域人員列表 */
  postUserAddressBook(region: string): Observable<Staff[]> {
    return this.getFieldStaff().pipe(
      map((data) => {
        return data.filter((data) => data.region === region);
      }),
    );
  }
  /**組織人員資料 */
  getFieldStaff(): Observable<Staff[]> {
    return of([
      {
        id: 1,
        userName: '戰車',
        userId: 'WM616',
        locationNumber: '900',
        region: '東部',
        location: '宜蘭縣宜蘭路',
        gender: '女',
        phone: '968836117',
        jobName: '業務員',
        arrivalDate: '9/6/2022',
        isValid: true,
        superiorNumber: 'XV693',
      },
      {
        id: 2,
        userName: '白起',
        userId: 'AQ467',
        locationNumber: '900',
        region: '東部',
        location: '宜蘭縣宜蘭路',
        gender: '男',
        phone: '944583424',
        jobName: '業務員',
        arrivalDate: '6/16/2022',
        isValid: true,
        superiorNumber: 'XV693',
      },
      {
        id: 3,
        userName: '許墨',
        userId: 'BF0467',
        locationNumber: '900',
        region: '東部',
        location: '宜蘭縣宜蘭路',
        gender: '男',
        phone: '958439141',
        jobName: '業務員',
        arrivalDate: '6/16/2022',
        isValid: true,
        superiorNumber: 'XV693',
      },
      {
        id: 4,
        userName: '宿儺',
        userId: 'XV693',
        locationNumber: '1000',
        region: '東部',
        location: '花蓮縣花蓮鄉花蓮路',
        gender: '女',
        phone: '935699074',
        jobName: '區經理',
        arrivalDate: '7/15/2022',
        isValid: true,
        superiorNumber: '',
      },
      {
        id: 5,
        userName: '虎杖',
        userId: 'BF0468',
        locationNumber: '1000',
        region: '東部',
        location: '花蓮縣花蓮鄉花蓮路',
        gender: '男',
        phone: '9123456789',
        jobName: '業務員',
        arrivalDate: '8/13/2022',
        isValid: true,
        superiorNumber: 'XV695',
      },
      {
        id: 6,
        userName: '伏黑',
        userId: 'XV694',
        locationNumber: '1600',
        region: '北部',
        location: '新北市新北路',
        gender: '男',
        phone: '9234567890',
        jobName: '業務員',
        arrivalDate: '9/11/2022',
        isValid: true,
        superiorNumber: 'XV695',
      },
      {
        id: 7,
        userName: '釘琪',
        userId: 'BF0469',
        locationNumber: '1600',
        region: '北部',
        location: '新北市新北路',
        gender: '女',
        phone: '9345678991',
        jobName: '業務員',
        arrivalDate: '10/10/2022',
        isValid: true,
        superiorNumber: 'XV695',
      },
      {
        id: 8,
        userName: '五條',
        userId: 'XV695',
        locationNumber: '1600',
        region: '北部',
        location: '新北市新北路',
        gender: '男',
        phone: '9456790092',
        jobName: '區經理',
        arrivalDate: '11/8/2022',
        isValid: true,
        superiorNumber: '',
      },
      {
        id: 9,
        userName: '娜娜明',
        userId: 'BF0470',
        locationNumber: '1700',
        region: '北部',
        location: '新竹市新竹區新竹路',
        gender: '男',
        phone: '9567901193',
        jobName: '業務員',
        arrivalDate: '12/7/2022',
        isValid: true,
        superiorNumber: 'XV696',
      },
      {
        id: 10,
        userName: '火山頭',
        userId: 'XV696',
        locationNumber: '1700',
        region: '北部',
        location: '新竹市新竹區新竹路',
        gender: '男',
        phone: '9679012294',
        jobName: '業務員',
        arrivalDate: '1/5/2023',
        isValid: true,
        superiorNumber: 'BF0471',
      },
      {
        id: 11,
        userName: '九十九由基',
        userId: 'BF0471',
        locationNumber: '1700',
        region: '北部',
        location: '新竹市新竹區新竹路',
        gender: '女',
        phone: '9790123395',
        jobName: '業務員',
        arrivalDate: '2/3/2023',
        isValid: true,
        superiorNumber: '',
      },
      {
        id: 12,
        userName: '夏由傑',
        userId: 'XV697',
        locationNumber: '2200',
        region: '南部',
        location: '台南市官田區官田路',
        gender: '男',
        phone: '9901234496',
        jobName: '區經理',
        arrivalDate: '3/4/2023',
        isValid: true,
        superiorNumber: '',
      },
      {
        id: 13,
        userName: '新世紀福音戰士',
        userId: 'BF0472',
        locationNumber: '2200',
        region: '南部',
        location: '台南市官田區官田路',
        gender: '男',
        phone: '9012345597',
        jobName: '業務員',
        arrivalDate: '4/2/2023',
        isValid: true,
        superiorNumber: 'XV697',
      },
      {
        id: 14,
        userName: 'Mike',
        userId: 'XV698',
        locationNumber: '2300',
        region: '南部',
        location: '高雄市七賢路',
        gender: '男',
        phone: '9123456698',
        jobName: '業務員',
        arrivalDate: '5/1/2023',
        isValid: true,
        superiorNumber: 'XV699',
      },
      {
        id: 15,
        userName: 'Tina',
        userId: 'BF0473',
        locationNumber: '2300',
        region: '南部',
        location: '高雄市七賢路',
        gender: '女',
        phone: '9234567799',
        jobName: '業務員',
        arrivalDate: '5/30/2023',
        isValid: true,
        superiorNumber: 'XV698',
      },
      {
        id: 16,
        userName: 'Andy',
        userId: 'XV699',
        locationNumber: '2300',
        region: '南部',
        location: '高雄市七賢路',
        gender: '男',
        phone: '9345678900',
        jobName: '區經理',
        arrivalDate: '6/28/2023',
        isValid: true,
        superiorNumber: '',
      },
      {
        id: 17,
        userName: 'Daisy',
        userId: 'BF0474',
        locationNumber: '2300',
        region: '南部',
        location: '高雄市七賢路',
        gender: '女',
        phone: '9456790001',
        jobName: '業務員',
        arrivalDate: '7/27/2023',
        isValid: true,
        superiorNumber: 'BF0473',
      },
      {
        id: 18,
        userName: '傑尼夫',
        userId: 'XV700',
        locationNumber: '2300',
        region: '南部',
        location: '高雄市七賢路',
        gender: '女',
        phone: '9456723466',
        jobName: '業務員',
        arrivalDate: '8/25/2023',
        isValid: true,
        superiorNumber: 'XV699',
      },
    ]);
  }
}

/** 區域 */
export interface IRegion {
  id: number;
  region: string;
  createDate: string;
}

/** 組織人員 */
export interface Staff {
  id: number;
  userName: string;
  userId: string;
  region: string;
  location: string;
  locationNumber: string;
  gender: string;
  phone: string;
  jobName: string;
  arrivalDate: string;
  isValid: boolean;
  superiorNumber: string;
}

export interface ILocation {
  id: string;
  location: string;
  locationNumber: string;
  region: string;
  address: string;
  phone: string;
  createDate: string;
}
