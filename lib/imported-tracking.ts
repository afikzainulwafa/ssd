// Auto-generated imported tracking dataset from ADPE JAR.csv and ADPE PHH.csv
import { PatrolRunRecord } from './types';

export interface ImportedGpsPoint {
  time: string;
  lat: number;
  lng: number;
  speed: number;
}

export interface ImportedDailyTrack {
  date: string;
  vehicleId: string;
  nopol: string;
  estateId: string;
  vehicleType: 'Motorcycle';
  points: ImportedGpsPoint[];
}

export const IMPORTED_PATROL_RUNS: PatrolRunRecord[] = [
  {
    "id": "IMP_2026-09-02_V-JAR-01",
    "date": "2026-09-02",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 121.6,
    "actualDistanceKm": 128.0,
    "inRouteKm": 112.6,
    "outOfRouteKm": 15.4,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 1013.5,
    "stoppingTimeMinutes": 75.0,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-03_V-JAR-01",
    "date": "2026-09-03",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 103.4,
    "actualDistanceKm": 108.8,
    "inRouteKm": 95.7,
    "outOfRouteKm": 13.1,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 1088.5,
    "stoppingTimeMinutes": 77.5,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-04_V-JAR-01",
    "date": "2026-09-04",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 65.7,
    "actualDistanceKm": 69.2,
    "inRouteKm": 60.9,
    "outOfRouteKm": 8.3,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 773.5,
    "stoppingTimeMinutes": 64.0,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-05_V-JAR-01",
    "date": "2026-09-05",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 72.7,
    "actualDistanceKm": 76.5,
    "inRouteKm": 67.3,
    "outOfRouteKm": 9.2,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 600.0,
    "stoppingTimeMinutes": 42.5,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-06_V-JAR-01",
    "date": "2026-09-06",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 52.7,
    "actualDistanceKm": 55.5,
    "inRouteKm": 48.8,
    "outOfRouteKm": 6.7,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 439.0,
    "stoppingTimeMinutes": 23.0,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-07_V-JAR-01",
    "date": "2026-09-07",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 109.6,
    "actualDistanceKm": 115.4,
    "inRouteKm": 101.6,
    "outOfRouteKm": 13.8,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 732.0,
    "stoppingTimeMinutes": 49.5,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-08_V-JAR-01",
    "date": "2026-09-08",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 52.6,
    "actualDistanceKm": 55.4,
    "inRouteKm": 48.8,
    "outOfRouteKm": 6.6,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 402.0,
    "stoppingTimeMinutes": 43.0,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-09_V-JAR-01",
    "date": "2026-09-09",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 50.0,
    "actualDistanceKm": 52.6,
    "inRouteKm": 46.3,
    "outOfRouteKm": 6.3,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 269.0,
    "stoppingTimeMinutes": 23.5,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-10_V-JAR-01",
    "date": "2026-09-10",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 71.5,
    "actualDistanceKm": 75.3,
    "inRouteKm": 66.3,
    "outOfRouteKm": 9.0,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 573.0,
    "stoppingTimeMinutes": 40.0,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-01_V-PHH-01",
    "date": "2026-09-01",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 75.0,
    "actualDistanceKm": 78.9,
    "inRouteKm": 69.4,
    "outOfRouteKm": 9.5,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 658.5,
    "stoppingTimeMinutes": 54.5,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-02_V-PHH-01",
    "date": "2026-09-02",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 137.0,
    "actualDistanceKm": 144.2,
    "inRouteKm": 126.9,
    "outOfRouteKm": 17.3,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 1213.5,
    "stoppingTimeMinutes": 89.0,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-03_V-PHH-01",
    "date": "2026-09-03",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 103.4,
    "actualDistanceKm": 108.8,
    "inRouteKm": 95.7,
    "outOfRouteKm": 13.1,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 1088.5,
    "stoppingTimeMinutes": 77.5,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-04_V-PHH-01",
    "date": "2026-09-04",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 65.7,
    "actualDistanceKm": 69.2,
    "inRouteKm": 60.9,
    "outOfRouteKm": 8.3,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 773.5,
    "stoppingTimeMinutes": 64.0,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-05_V-PHH-01",
    "date": "2026-09-05",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 72.7,
    "actualDistanceKm": 76.5,
    "inRouteKm": 67.3,
    "outOfRouteKm": 9.2,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 600.0,
    "stoppingTimeMinutes": 42.5,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-06_V-PHH-01",
    "date": "2026-09-06",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 52.7,
    "actualDistanceKm": 55.5,
    "inRouteKm": 48.8,
    "outOfRouteKm": 6.7,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 439.0,
    "stoppingTimeMinutes": 23.0,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-07_V-PHH-01",
    "date": "2026-09-07",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 109.6,
    "actualDistanceKm": 115.4,
    "inRouteKm": 101.6,
    "outOfRouteKm": 13.8,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 732.0,
    "stoppingTimeMinutes": 49.5,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-08_V-PHH-01",
    "date": "2026-09-08",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 52.6,
    "actualDistanceKm": 55.4,
    "inRouteKm": 48.8,
    "outOfRouteKm": 6.6,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 402.0,
    "stoppingTimeMinutes": 43.0,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-09_V-PHH-01",
    "date": "2026-09-09",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 50.0,
    "actualDistanceKm": 52.6,
    "inRouteKm": 46.3,
    "outOfRouteKm": 6.3,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 269.0,
    "stoppingTimeMinutes": 23.5,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  },
  {
    "id": "IMP_2026-09-10_V-PHH-01",
    "date": "2026-09-10",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "targetDistanceKm": 71.5,
    "actualDistanceKm": 75.3,
    "inRouteKm": 66.3,
    "outOfRouteKm": 9.0,
    "unclassifiedKm": 0,
    "movingTimeMinutes": 573.0,
    "stoppingTimeMinutes": 40.0,
    "rawanBlocksCovered": 3,
    "nonRawanBlocksCovered": 4,
    "gpsTraceQuality": "Good",
    "isImported": true
  }
];

export const IMPORTED_TRACKS_MAP: Record<string, ImportedDailyTrack> = {
  "2026-09-02__V-JAR-01": {
    "date": "2026-09-02",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-02 05:36:42",
        "lat": 2.289433,
        "lng": 99.9076,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 05:37:26",
        "lat": 2.29259,
        "lng": 99.907956,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 05:38:26",
        "lat": 2.298573,
        "lng": 99.908951,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 05:39:28",
        "lat": 2.298787,
        "lng": 99.909324,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 06:26:00",
        "lat": 2.298706,
        "lng": 99.909378,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 06:26:38",
        "lat": 2.298728,
        "lng": 99.911822,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 06:27:38",
        "lat": 2.298806,
        "lng": 99.916436,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 06:28:38",
        "lat": 2.298907,
        "lng": 99.921316,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 06:29:48",
        "lat": 2.299012,
        "lng": 99.927013,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 06:30:48",
        "lat": 2.297281,
        "lng": 99.929413,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 06:31:58",
        "lat": 2.291961,
        "lng": 99.928693,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 06:33:53",
        "lat": 2.289667,
        "lng": 99.928382,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 06:34:14",
        "lat": 2.289963,
        "lng": 99.928418,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 06:35:18",
        "lat": 2.294502,
        "lng": 99.92904,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 06:36:23",
        "lat": 2.298964,
        "lng": 99.929831,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 06:37:02",
        "lat": 2.298836,
        "lng": 99.9324,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 06:37:55",
        "lat": 2.298444,
        "lng": 99.932453,
        "speed": 10.0
      },
      {
        "time": "2026-09-02 06:38:28",
        "lat": 2.298886,
        "lng": 99.933431,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 06:44:29",
        "lat": 2.2988,
        "lng": 99.933662,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 06:51:32",
        "lat": 2.298842,
        "lng": 99.933351,
        "speed": 14.0
      },
      {
        "time": "2026-09-02 06:52:33",
        "lat": 2.299059,
        "lng": 99.936507,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 06:53:43",
        "lat": 2.301048,
        "lng": 99.938916,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 06:54:53",
        "lat": 2.306179,
        "lng": 99.938809,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 06:56:23",
        "lat": 2.305311,
        "lng": 99.938818,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 06:57:33",
        "lat": 2.300137,
        "lng": 99.938951,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 06:58:43",
        "lat": 2.295368,
        "lng": 99.939031,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 06:59:53",
        "lat": 2.290504,
        "lng": 99.939164,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 09:08:21",
        "lat": 2.289857,
        "lng": 99.939698,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 09:09:31",
        "lat": 2.290003,
        "lng": 99.941209,
        "speed": 15.0
      },
      {
        "time": "2026-09-02 09:10:41",
        "lat": 2.294525,
        "lng": 99.941244,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 09:11:31",
        "lat": 2.298135,
        "lng": 99.941289,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 09:12:31",
        "lat": 2.299402,
        "lng": 99.944107,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 09:13:36",
        "lat": 2.299766,
        "lng": 99.948027,
        "speed": 14.0
      },
      {
        "time": "2026-09-02 09:14:29",
        "lat": 2.302983,
        "lng": 99.947796,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 09:15:21",
        "lat": 2.306349,
        "lng": 99.947591,
        "speed": 11.0
      },
      {
        "time": "2026-09-02 09:40:51",
        "lat": 2.303822,
        "lng": 99.947751,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 09:42:01",
        "lat": 2.29966,
        "lng": 99.948098,
        "speed": 10.0
      },
      {
        "time": "2026-09-02 09:43:11",
        "lat": 2.299784,
        "lng": 99.952809,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 09:44:21",
        "lat": 2.299886,
        "lng": 99.958364,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 09:45:31",
        "lat": 2.299979,
        "lng": 99.963849,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 09:46:31",
        "lat": 2.299916,
        "lng": 99.968133,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 09:47:41",
        "lat": 2.295081,
        "lng": 99.968178,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 09:48:41",
        "lat": 2.292821,
        "lng": 99.970302,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 09:49:51",
        "lat": 2.292587,
        "lng": 99.975324,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 09:51:01",
        "lat": 2.292206,
        "lng": 99.980871,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 09:52:11",
        "lat": 2.290698,
        "lng": 99.984444,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 09:53:21",
        "lat": 2.285775,
        "lng": 99.984489,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 09:54:42",
        "lat": 2.284831,
        "lng": 99.985724,
        "speed": 3.0
      },
      {
        "time": "2026-09-02 09:57:21",
        "lat": 2.284826,
        "lng": 99.984907,
        "speed": 11.0
      },
      {
        "time": "2026-09-02 09:58:21",
        "lat": 2.287322,
        "lng": 99.984471,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 09:59:31",
        "lat": 2.291963,
        "lng": 99.984418,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 10:00:31",
        "lat": 2.292302,
        "lng": 99.979911,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 10:01:41",
        "lat": 2.292668,
        "lng": 99.974053,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 10:02:51",
        "lat": 2.292906,
        "lng": 99.968364,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 10:03:51",
        "lat": 2.291045,
        "lng": 99.966267,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 10:05:01",
        "lat": 2.286118,
        "lng": 99.966436,
        "speed": 11.0
      },
      {
        "time": "2026-09-02 10:36:47",
        "lat": 2.286699,
        "lng": 99.966391,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 10:37:58",
        "lat": 2.292055,
        "lng": 99.966213,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 10:39:08",
        "lat": 2.298314,
        "lng": 99.966,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 10:39:58",
        "lat": 2.299992,
        "lng": 99.963591,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 10:41:08",
        "lat": 2.299874,
        "lng": 99.957076,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 10:42:18",
        "lat": 2.299788,
        "lng": 99.950684,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 10:43:18",
        "lat": 2.301467,
        "lng": 99.947911,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 10:51:30",
        "lat": 2.304467,
        "lng": 99.947689,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 11:03:01",
        "lat": 2.306534,
        "lng": 99.947511,
        "speed": 9.0
      },
      {
        "time": "2026-09-02 11:04:15",
        "lat": 2.306545,
        "lng": 99.9456,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 11:05:21",
        "lat": 2.302579,
        "lng": 99.945591,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 11:06:21",
        "lat": 2.299456,
        "lng": 99.94448,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 11:07:31",
        "lat": 2.299137,
        "lng": 99.938756,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 11:08:41",
        "lat": 2.298902,
        "lng": 99.933449,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 11:09:51",
        "lat": 2.299017,
        "lng": 99.927929,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 11:11:01",
        "lat": 2.298919,
        "lng": 99.92192,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 11:12:11",
        "lat": 2.298787,
        "lng": 99.915644,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 11:13:21",
        "lat": 2.298629,
        "lng": 99.909636,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 11:14:07",
        "lat": 2.298619,
        "lng": 99.909582,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 11:15:11",
        "lat": 2.298791,
        "lng": 99.914569,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 11:16:21",
        "lat": 2.298897,
        "lng": 99.920249,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 11:17:17",
        "lat": 2.298702,
        "lng": 99.922409,
        "speed": 6.0
      },
      {
        "time": "2026-09-02 12:37:03",
        "lat": 2.299003,
        "lng": 99.924267,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 12:38:13",
        "lat": 2.298973,
        "lng": 99.930453,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 12:39:00",
        "lat": 2.29877,
        "lng": 99.933476,
        "speed": 10.0
      },
      {
        "time": "2026-09-02 13:01:30",
        "lat": 2.298982,
        "lng": 99.934409,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 13:52:57",
        "lat": 2.298986,
        "lng": 99.934542,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 13:54:07",
        "lat": 2.299032,
        "lng": 99.928356,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 13:55:17",
        "lat": 2.298922,
        "lng": 99.921076,
        "speed": 48.0
      },
      {
        "time": "2026-09-02 13:56:27",
        "lat": 2.298737,
        "lng": 99.913378,
        "speed": 41.0
      },
      {
        "time": "2026-09-02 13:57:39",
        "lat": 2.298848,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 14:03:47",
        "lat": 2.298991,
        "lng": 99.909378,
        "speed": 8.0
      },
      {
        "time": "2026-09-02 14:04:37",
        "lat": 2.298756,
        "lng": 99.912258,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 14:05:47",
        "lat": 2.298857,
        "lng": 99.91792,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 14:06:57",
        "lat": 2.298974,
        "lng": 99.923138,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 14:08:07",
        "lat": 2.29906,
        "lng": 99.92832,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 14:09:17",
        "lat": 2.298908,
        "lng": 99.933253,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 14:10:27",
        "lat": 2.299135,
        "lng": 99.938036,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 14:11:37",
        "lat": 2.298072,
        "lng": 99.941262,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 14:12:47",
        "lat": 2.292236,
        "lng": 99.941262,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 14:15:06",
        "lat": 2.289988,
        "lng": 99.94128,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 14:15:57",
        "lat": 2.290049,
        "lng": 99.939227,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 14:17:07",
        "lat": 2.296123,
        "lng": 99.939031,
        "speed": 44.0
      },
      {
        "time": "2026-09-02 14:18:07",
        "lat": 2.299055,
        "lng": 99.936293,
        "speed": 43.0
      },
      {
        "time": "2026-09-02 14:19:17",
        "lat": 2.299009,
        "lng": 99.929573,
        "speed": 45.0
      },
      {
        "time": "2026-09-02 14:20:27",
        "lat": 2.298923,
        "lng": 99.922293,
        "speed": 42.0
      },
      {
        "time": "2026-09-02 14:21:37",
        "lat": 2.298764,
        "lng": 99.914569,
        "speed": 43.0
      },
      {
        "time": "2026-09-02 14:22:47",
        "lat": 2.298636,
        "lng": 99.909422,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 14:23:47",
        "lat": 2.298779,
        "lng": 99.913769,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 14:24:38",
        "lat": 2.298924,
        "lng": 99.917796,
        "speed": 14.0
      },
      {
        "time": "2026-09-02 14:25:47",
        "lat": 2.301358,
        "lng": 99.918116,
        "speed": 40.0
      },
      {
        "time": "2026-09-02 14:26:57",
        "lat": 2.306981,
        "lng": 99.919013,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 14:27:47",
        "lat": 2.307043,
        "lng": 99.920622,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 14:28:57",
        "lat": 2.307137,
        "lng": 99.923111,
        "speed": 7.0
      },
      {
        "time": "2026-09-02 14:30:07",
        "lat": 2.307198,
        "lng": 99.925396,
        "speed": 8.0
      },
      {
        "time": "2026-09-02 14:31:17",
        "lat": 2.304936,
        "lng": 99.925262,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 14:32:27",
        "lat": 2.299036,
        "lng": 99.924533,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 14:33:17",
        "lat": 2.298141,
        "lng": 99.926596,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 14:34:27",
        "lat": 2.291673,
        "lng": 99.925751,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 14:35:32",
        "lat": 2.289763,
        "lng": 99.926613,
        "speed": 11.0
      },
      {
        "time": "2026-09-02 14:36:27",
        "lat": 2.289711,
        "lng": 99.928302,
        "speed": 1.0
      },
      {
        "time": "2026-09-02 14:38:57",
        "lat": 2.290583,
        "lng": 99.928471,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 14:40:07",
        "lat": 2.295714,
        "lng": 99.929182,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 14:41:07",
        "lat": 2.298927,
        "lng": 99.930578,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 14:41:54",
        "lat": 2.298114,
        "lng": 99.932533,
        "speed": 10.0
      },
      {
        "time": "2026-09-02 14:43:57",
        "lat": 2.296799,
        "lng": 99.932302,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 14:45:07",
        "lat": 2.292086,
        "lng": 99.932142,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 14:47:07",
        "lat": 2.290169,
        "lng": 99.932116,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 14:48:17",
        "lat": 2.295786,
        "lng": 99.932293,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 14:49:07",
        "lat": 2.29847,
        "lng": 99.933351,
        "speed": 15.0
      },
      {
        "time": "2026-09-02 14:51:17",
        "lat": 2.298936,
        "lng": 99.934489,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 14:52:17",
        "lat": 2.300681,
        "lng": 99.936738,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 14:53:27",
        "lat": 2.306222,
        "lng": 99.936836,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 15:45:30",
        "lat": 2.306894,
        "lng": 99.937618,
        "speed": 15.0
      },
      {
        "time": "2026-09-02 15:46:40",
        "lat": 2.306501,
        "lng": 99.938738,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 15:47:40",
        "lat": 2.302921,
        "lng": 99.938862,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 15:48:50",
        "lat": 2.298174,
        "lng": 99.938969,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 15:50:00",
        "lat": 2.293101,
        "lng": 99.939076,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 15:51:17",
        "lat": 2.289928,
        "lng": 99.939369,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 15:59:15",
        "lat": 2.289921,
        "lng": 99.940116,
        "speed": 6.0
      },
      {
        "time": "2026-09-02 16:00:37",
        "lat": 2.290035,
        "lng": 99.94224,
        "speed": 14.0
      },
      {
        "time": "2026-09-02 16:01:47",
        "lat": 2.290893,
        "lng": 99.9436,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 16:02:57",
        "lat": 2.295983,
        "lng": 99.943502,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 16:03:57",
        "lat": 2.299422,
        "lng": 99.944409,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 16:04:57",
        "lat": 2.299252,
        "lng": 99.94808,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 16:06:07",
        "lat": 2.293715,
        "lng": 99.948551,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 16:07:03",
        "lat": 2.290936,
        "lng": 99.948747,
        "speed": 15.0
      },
      {
        "time": "2026-09-02 16:07:47",
        "lat": 2.29038,
        "lng": 99.948818,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 16:08:40",
        "lat": 2.290468,
        "lng": 99.951289,
        "speed": 15.0
      },
      {
        "time": "2026-09-02 16:09:27",
        "lat": 2.293434,
        "lng": 99.951902,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 16:10:37",
        "lat": 2.293126,
        "lng": 99.959733,
        "speed": 45.0
      },
      {
        "time": "2026-09-02 16:11:37",
        "lat": 2.294986,
        "lng": 99.963493,
        "speed": 44.0
      },
      {
        "time": "2026-09-02 16:12:37",
        "lat": 2.300008,
        "lng": 99.964569,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 16:13:27",
        "lat": 2.299712,
        "lng": 99.968329,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 16:21:12",
        "lat": 2.299701,
        "lng": 99.9688,
        "speed": 7.0
      },
      {
        "time": "2026-09-02 16:21:49",
        "lat": 2.299273,
        "lng": 99.96816,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 16:22:57",
        "lat": 2.293084,
        "lng": 99.968178,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 16:23:31",
        "lat": 2.292895,
        "lng": 99.96616,
        "speed": 14.0
      },
      {
        "time": "2026-09-02 16:24:37",
        "lat": 2.287339,
        "lng": 99.966373,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 16:49:50",
        "lat": 2.286133,
        "lng": 99.966436,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 16:50:55",
        "lat": 2.290663,
        "lng": 99.966276,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 16:52:05",
        "lat": 2.297485,
        "lng": 99.966018,
        "speed": 41.0
      },
      {
        "time": "2026-09-02 16:53:15",
        "lat": 2.299938,
        "lng": 99.962284,
        "speed": 42.0
      },
      {
        "time": "2026-09-02 16:54:25",
        "lat": 2.299798,
        "lng": 99.9548,
        "speed": 44.0
      },
      {
        "time": "2026-09-02 16:55:35",
        "lat": 2.299603,
        "lng": 99.947796,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 16:56:35",
        "lat": 2.300974,
        "lng": 99.945627,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 16:57:25",
        "lat": 2.304367,
        "lng": 99.945573,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 17:00:35",
        "lat": 2.306602,
        "lng": 99.945804,
        "speed": 11.0
      },
      {
        "time": "2026-09-02 17:01:25",
        "lat": 2.303956,
        "lng": 99.945591,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 17:02:07",
        "lat": 2.301688,
        "lng": 99.9456,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 17:03:05",
        "lat": 2.299573,
        "lng": 99.94704,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 17:04:15",
        "lat": 2.299797,
        "lng": 99.953111,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 17:05:15",
        "lat": 2.304011,
        "lng": 99.954204,
        "speed": 40.0
      },
      {
        "time": "2026-09-02 17:06:05",
        "lat": 2.306972,
        "lng": 99.955067,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 17:07:05",
        "lat": 2.308901,
        "lng": 99.958036,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 17:08:15",
        "lat": 2.308922,
        "lng": 99.96328,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 17:09:05",
        "lat": 2.312496,
        "lng": 99.963182,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 17:10:25",
        "lat": 2.318381,
        "lng": 99.963093,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 17:11:35",
        "lat": 2.324039,
        "lng": 99.962978,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 17:12:24",
        "lat": 2.325799,
        "lng": 99.962924,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 17:13:25",
        "lat": 2.321596,
        "lng": 99.963022,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 17:14:25",
        "lat": 2.319177,
        "lng": 99.965787,
        "speed": 43.0
      },
      {
        "time": "2026-09-02 17:15:35",
        "lat": 2.319301,
        "lng": 99.973271,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 17:16:45",
        "lat": 2.319071,
        "lng": 99.977253,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 17:18:25",
        "lat": 2.314863,
        "lng": 99.977396,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 17:19:25",
        "lat": 2.310509,
        "lng": 99.977511,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 17:49:53",
        "lat": 2.309028,
        "lng": 99.976249,
        "speed": 45.0
      },
      {
        "time": "2026-09-02 17:51:03",
        "lat": 2.30895,
        "lng": 99.967627,
        "speed": 51.0
      },
      {
        "time": "2026-09-02 17:52:13",
        "lat": 2.308908,
        "lng": 99.958827,
        "speed": 40.0
      },
      {
        "time": "2026-09-02 17:53:13",
        "lat": 2.306979,
        "lng": 99.955076,
        "speed": 41.0
      },
      {
        "time": "2026-09-02 17:54:13",
        "lat": 2.305251,
        "lng": 99.951271,
        "speed": 42.0
      },
      {
        "time": "2026-09-02 17:55:23",
        "lat": 2.299759,
        "lng": 99.949902,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 17:56:33",
        "lat": 2.299352,
        "lng": 99.942516,
        "speed": 53.0
      },
      {
        "time": "2026-09-02 17:57:43",
        "lat": 2.298983,
        "lng": 99.935618,
        "speed": 48.0
      },
      {
        "time": "2026-09-02 17:59:03",
        "lat": 2.298838,
        "lng": 99.932773,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 17:59:43",
        "lat": 2.299023,
        "lng": 99.927716,
        "speed": 56.0
      },
      {
        "time": "2026-09-02 18:00:33",
        "lat": 2.298886,
        "lng": 99.920853,
        "speed": 54.0
      },
      {
        "time": "2026-09-02 18:01:43",
        "lat": 2.298713,
        "lng": 99.911778,
        "speed": 54.0
      },
      {
        "time": "2026-09-02 18:02:43",
        "lat": 2.295236,
        "lng": 99.908302,
        "speed": 52.0
      },
      {
        "time": "2026-09-02 18:03:53",
        "lat": 2.289282,
        "lng": 99.907467,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 18:05:03",
        "lat": 2.284011,
        "lng": 99.902844,
        "speed": 40.0
      },
      {
        "time": "2026-09-02 18:06:13",
        "lat": 2.278095,
        "lng": 99.898391,
        "speed": 40.0
      },
      {
        "time": "2026-09-02 18:07:03",
        "lat": 2.275843,
        "lng": 99.893831,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 18:07:53",
        "lat": 2.274414,
        "lng": 99.89024,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 18:09:03",
        "lat": 2.270988,
        "lng": 99.885387,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 18:10:13",
        "lat": 2.266157,
        "lng": 99.88232,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 18:11:12",
        "lat": 2.262421,
        "lng": 99.88016,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 18:12:03",
        "lat": 2.263922,
        "lng": 99.875324,
        "speed": 43.0
      },
      {
        "time": "2026-09-02 18:13:13",
        "lat": 2.260777,
        "lng": 99.868569,
        "speed": 50.0
      },
      {
        "time": "2026-09-02 18:14:23",
        "lat": 2.264624,
        "lng": 99.860791,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 18:15:10",
        "lat": 2.266631,
        "lng": 99.857653,
        "speed": 11.0
      },
      {
        "time": "2026-09-02 18:15:49",
        "lat": 2.266899,
        "lng": 99.855929,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 18:16:43",
        "lat": 2.269104,
        "lng": 99.853138,
        "speed": 47.0
      },
      {
        "time": "2026-09-02 18:17:53",
        "lat": 2.271784,
        "lng": 99.845813,
        "speed": 53.0
      },
      {
        "time": "2026-09-02 18:18:43",
        "lat": 2.270427,
        "lng": 99.8416,
        "speed": 9.0
      },
      {
        "time": "2026-09-02 18:19:29",
        "lat": 2.273419,
        "lng": 99.843422,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 18:19:49",
        "lat": 2.274198,
        "lng": 99.844027,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 18:20:53",
        "lat": 2.278943,
        "lng": 99.844338,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 18:22:23",
        "lat": 2.27853,
        "lng": 99.844356,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 18:23:04",
        "lat": 2.276223,
        "lng": 99.844356,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 18:23:51",
        "lat": 2.273761,
        "lng": 99.843662,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 18:24:53",
        "lat": 2.270594,
        "lng": 99.841582,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 18:25:23",
        "lat": 2.270788,
        "lng": 99.842676,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 18:43:30",
        "lat": 2.270734,
        "lng": 99.842933,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 19:37:58",
        "lat": 2.270771,
        "lng": 99.842818,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 19:38:24",
        "lat": 2.270443,
        "lng": 99.841778,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 19:39:02",
        "lat": 2.272237,
        "lng": 99.842578,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 19:39:39",
        "lat": 2.273918,
        "lng": 99.843796,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 19:40:09",
        "lat": 2.275492,
        "lng": 99.844311,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 19:40:39",
        "lat": 2.277381,
        "lng": 99.844311,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 19:41:09",
        "lat": 2.279338,
        "lng": 99.844311,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 19:41:59",
        "lat": 2.28249,
        "lng": 99.844267,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 19:43:09",
        "lat": 2.287112,
        "lng": 99.844267,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 19:43:59",
        "lat": 2.290363,
        "lng": 99.844267,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 19:44:49",
        "lat": 2.293806,
        "lng": 99.844267,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 19:45:59",
        "lat": 2.298549,
        "lng": 99.844222,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 19:46:59",
        "lat": 2.30246,
        "lng": 99.84424,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 19:47:39",
        "lat": 2.304916,
        "lng": 99.84352,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 19:48:09",
        "lat": 2.30644,
        "lng": 99.84336,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 19:48:51",
        "lat": 2.308967,
        "lng": 99.843342,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 19:49:29",
        "lat": 2.311467,
        "lng": 99.843333,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 19:49:55",
        "lat": 2.312566,
        "lng": 99.843342,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 19:50:49",
        "lat": 2.315417,
        "lng": 99.84328,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 19:51:19",
        "lat": 2.315914,
        "lng": 99.844453,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 19:51:59",
        "lat": 2.31598,
        "lng": 99.846942,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 19:52:39",
        "lat": 2.315998,
        "lng": 99.849804,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 19:53:42",
        "lat": 2.316003,
        "lng": 99.85456,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 19:54:29",
        "lat": 2.316023,
        "lng": 99.857769,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 19:55:33",
        "lat": 2.316058,
        "lng": 99.862436,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 19:56:29",
        "lat": 2.316081,
        "lng": 99.866498,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 20:18:29",
        "lat": 2.316117,
        "lng": 99.86704,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 20:19:13",
        "lat": 2.318536,
        "lng": 99.867333,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 20:19:39",
        "lat": 2.318271,
        "lng": 99.869778,
        "speed": 42.0
      },
      {
        "time": "2026-09-02 20:20:13",
        "lat": 2.317829,
        "lng": 99.872818,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 20:20:36",
        "lat": 2.317814,
        "lng": 99.874027,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 20:21:00",
        "lat": 2.315489,
        "lng": 99.874169,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 20:21:39",
        "lat": 2.311699,
        "lng": 99.874338,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 20:22:19",
        "lat": 2.307889,
        "lng": 99.87448,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 20:22:47",
        "lat": 2.305183,
        "lng": 99.874409,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 20:23:19",
        "lat": 2.302166,
        "lng": 99.874382,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 20:24:02",
        "lat": 2.297996,
        "lng": 99.87424,
        "speed": 40.0
      },
      {
        "time": "2026-09-02 20:24:39",
        "lat": 2.294461,
        "lng": 99.874089,
        "speed": 43.0
      },
      {
        "time": "2026-09-02 20:25:29",
        "lat": 2.288873,
        "lng": 99.873938,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 20:26:09",
        "lat": 2.285336,
        "lng": 99.873956,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 20:27:07",
        "lat": 2.279573,
        "lng": 99.873956,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 20:27:39",
        "lat": 2.277758,
        "lng": 99.874782,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 20:28:22",
        "lat": 2.274233,
        "lng": 99.876124,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 20:29:19",
        "lat": 2.269825,
        "lng": 99.878578,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 20:30:19",
        "lat": 2.266982,
        "lng": 99.882827,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 21:22:19",
        "lat": 2.267533,
        "lng": 99.883129,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 21:22:39",
        "lat": 2.268078,
        "lng": 99.883458,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 21:23:19",
        "lat": 2.269823,
        "lng": 99.884764,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 21:24:02",
        "lat": 2.271731,
        "lng": 99.886542,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 21:24:25",
        "lat": 2.27247,
        "lng": 99.887662,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 21:25:02",
        "lat": 2.273788,
        "lng": 99.889191,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 21:25:29",
        "lat": 2.274462,
        "lng": 99.890524,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 21:26:14",
        "lat": 2.275002,
        "lng": 99.892809,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 21:26:59",
        "lat": 2.276667,
        "lng": 99.894729,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 21:28:09",
        "lat": 2.278128,
        "lng": 99.898409,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 21:29:08",
        "lat": 2.281417,
        "lng": 99.900764,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 21:30:09",
        "lat": 2.284558,
        "lng": 99.903333,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 21:31:19",
        "lat": 2.288328,
        "lng": 99.906462,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 21:32:19",
        "lat": 2.290113,
        "lng": 99.907618,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 21:33:09",
        "lat": 2.292387,
        "lng": 99.907947,
        "speed": 14.0
      },
      {
        "time": "2026-09-02 21:34:17",
        "lat": 2.292627,
        "lng": 99.907858,
        "speed": 4.0
      },
      {
        "time": "2026-09-02 21:57:25",
        "lat": 2.293146,
        "lng": 99.908009,
        "speed": 14.0
      },
      {
        "time": "2026-09-02 21:58:05",
        "lat": 2.294742,
        "lng": 99.908231,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 21:58:32",
        "lat": 2.296017,
        "lng": 99.908382,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 21:59:01",
        "lat": 2.297417,
        "lng": 99.908578,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 21:59:41",
        "lat": 2.298592,
        "lng": 99.909351,
        "speed": 11.0
      },
      {
        "time": "2026-09-02 22:00:31",
        "lat": 2.298814,
        "lng": 99.909307,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 23:29:21",
        "lat": 2.298713,
        "lng": 99.910916,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 23:29:44",
        "lat": 2.298721,
        "lng": 99.912044,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 23:30:21",
        "lat": 2.298736,
        "lng": 99.913733,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 23:31:11",
        "lat": 2.298785,
        "lng": 99.915982,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 23:31:41",
        "lat": 2.29881,
        "lng": 99.917324,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 23:32:06",
        "lat": 2.298841,
        "lng": 99.918427,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 23:32:42",
        "lat": 2.298869,
        "lng": 99.920124,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 23:33:11",
        "lat": 2.298907,
        "lng": 99.921547,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 23:33:49",
        "lat": 2.298952,
        "lng": 99.923467,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 23:34:41",
        "lat": 2.298993,
        "lng": 99.926071,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 23:35:14",
        "lat": 2.299019,
        "lng": 99.927849,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 23:36:21",
        "lat": 2.298913,
        "lng": 99.931156,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 23:37:06",
        "lat": 2.298877,
        "lng": 99.933262,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 23:37:35",
        "lat": 2.298973,
        "lng": 99.934569,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 23:38:01",
        "lat": 2.299001,
        "lng": 99.93576,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 23:38:51",
        "lat": 2.299107,
        "lng": 99.938053,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 23:41:50",
        "lat": 2.299016,
        "lng": 99.938996,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 23:42:41",
        "lat": 2.295753,
        "lng": 99.939049,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 23:43:24",
        "lat": 2.292833,
        "lng": 99.939138,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 23:45:04",
        "lat": 2.289918,
        "lng": 99.939236,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 23:45:55",
        "lat": 2.290397,
        "lng": 99.939209,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 23:46:14",
        "lat": 2.291272,
        "lng": 99.939191,
        "speed": 15.0
      },
      {
        "time": "2026-09-02 23:47:01",
        "lat": 2.293671,
        "lng": 99.939129,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 23:48:11",
        "lat": 2.297696,
        "lng": 99.939031,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 23:48:55",
        "lat": 2.299046,
        "lng": 99.938996,
        "speed": 0.0
      }
    ]
  },
  "2026-09-03__V-JAR-01": {
    "date": "2026-09-03",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-03 00:01:58",
        "lat": 2.299107,
        "lng": 99.938969,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 00:02:26",
        "lat": 2.299752,
        "lng": 99.938969,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 00:03:16",
        "lat": 2.304422,
        "lng": 99.938853,
        "speed": 41.0
      },
      {
        "time": "2026-09-03 00:04:13",
        "lat": 2.306789,
        "lng": 99.938809,
        "speed": 15.0
      },
      {
        "time": "2026-09-03 00:04:53",
        "lat": 2.303504,
        "lng": 99.938862,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 00:05:46",
        "lat": 2.299139,
        "lng": 99.938764,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 00:06:36",
        "lat": 2.298964,
        "lng": 99.934427,
        "speed": 18.0
      },
      {
        "time": "2026-09-03 00:14:49",
        "lat": 2.298866,
        "lng": 99.932827,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 00:15:29",
        "lat": 2.298954,
        "lng": 99.930222,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 00:16:29",
        "lat": 2.294663,
        "lng": 99.929067,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 00:16:52",
        "lat": 2.292529,
        "lng": 99.928782,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 00:17:12",
        "lat": 2.290726,
        "lng": 99.928533,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 00:18:49",
        "lat": 2.290939,
        "lng": 99.928569,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 00:19:17",
        "lat": 2.293296,
        "lng": 99.928889,
        "speed": 32.0
      },
      {
        "time": "2026-09-03 00:19:39",
        "lat": 2.295289,
        "lng": 99.929156,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 00:20:12",
        "lat": 2.298356,
        "lng": 99.929556,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 00:20:39",
        "lat": 2.299012,
        "lng": 99.9284,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 00:21:14",
        "lat": 2.298997,
        "lng": 99.925609,
        "speed": 33.0
      },
      {
        "time": "2026-09-03 00:21:49",
        "lat": 2.298942,
        "lng": 99.922836,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 00:22:29",
        "lat": 2.298857,
        "lng": 99.919467,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 00:23:13",
        "lat": 2.298776,
        "lng": 99.915787,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 00:23:43",
        "lat": 2.29701,
        "lng": 99.915387,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 00:24:35",
        "lat": 2.293274,
        "lng": 99.91488,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 00:25:09",
        "lat": 2.291084,
        "lng": 99.914907,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 00:34:43",
        "lat": 2.289779,
        "lng": 99.915671,
        "speed": 18.0
      },
      {
        "time": "2026-09-03 00:35:56",
        "lat": 2.291299,
        "lng": 99.914747,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 00:36:23",
        "lat": 2.291794,
        "lng": 99.914471,
        "speed": 8.0
      },
      {
        "time": "2026-09-03 00:36:53",
        "lat": 2.292476,
        "lng": 99.914062,
        "speed": 12.0
      },
      {
        "time": "2026-09-03 00:37:23",
        "lat": 2.293441,
        "lng": 99.913493,
        "speed": 17.0
      },
      {
        "time": "2026-09-03 00:38:13",
        "lat": 2.295261,
        "lng": 99.912747,
        "speed": 18.0
      },
      {
        "time": "2026-09-03 00:39:12",
        "lat": 2.298496,
        "lng": 99.913244,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 00:39:53",
        "lat": 2.298704,
        "lng": 99.911129,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 00:40:21",
        "lat": 2.298582,
        "lng": 99.909564,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 00:41:03",
        "lat": 2.297199,
        "lng": 99.908533,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 00:41:43",
        "lat": 2.294981,
        "lng": 99.908249,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 00:42:06",
        "lat": 2.2939,
        "lng": 99.908133,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 00:42:26",
        "lat": 2.293076,
        "lng": 99.908027,
        "speed": 12.0
      },
      {
        "time": "2026-09-03 00:43:13",
        "lat": 2.291238,
        "lng": 99.907733,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 00:43:35",
        "lat": 2.290064,
        "lng": 99.9076,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 00:44:20",
        "lat": 2.289442,
        "lng": 99.90752,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 01:42:12",
        "lat": 2.291673,
        "lng": 99.907849,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 01:43:40",
        "lat": 2.292614,
        "lng": 99.907947,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 01:44:42",
        "lat": 2.291669,
        "lng": 99.907813,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 01:45:17",
        "lat": 2.289544,
        "lng": 99.907556,
        "speed": 4.0
      },
      {
        "time": "2026-09-03 05:37:39",
        "lat": 2.289399,
        "lng": 99.907556,
        "speed": 2.0
      },
      {
        "time": "2026-09-03 05:38:30",
        "lat": 2.293335,
        "lng": 99.908107,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 05:39:00",
        "lat": 2.296198,
        "lng": 99.908418,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 05:39:34",
        "lat": 2.298573,
        "lng": 99.909191,
        "speed": 20.0
      },
      {
        "time": "2026-09-03 05:39:58",
        "lat": 2.298784,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 06:10:13",
        "lat": 2.298812,
        "lng": 99.909307,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 06:10:53",
        "lat": 2.298625,
        "lng": 99.909867,
        "speed": 13.0
      },
      {
        "time": "2026-09-03 06:12:45",
        "lat": 2.299068,
        "lng": 99.909564,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 06:24:27",
        "lat": 2.29897,
        "lng": 99.90968,
        "speed": 10.0
      },
      {
        "time": "2026-09-03 06:40:37",
        "lat": 2.298571,
        "lng": 99.909813,
        "speed": 14.0
      },
      {
        "time": "2026-09-03 07:15:25",
        "lat": 2.298739,
        "lng": 99.909378,
        "speed": 15.0
      },
      {
        "time": "2026-09-03 07:16:05",
        "lat": 2.297578,
        "lng": 99.910969,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 07:17:15",
        "lat": 2.294112,
        "lng": 99.913084,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 07:18:25",
        "lat": 2.290426,
        "lng": 99.91528,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 10:06:59",
        "lat": 2.289626,
        "lng": 99.916507,
        "speed": 15.0
      },
      {
        "time": "2026-09-03 10:08:04",
        "lat": 2.293359,
        "lng": 99.917102,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 10:09:14",
        "lat": 2.298558,
        "lng": 99.917769,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 10:10:25",
        "lat": 2.298874,
        "lng": 99.921831,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 10:11:35",
        "lat": 2.298976,
        "lng": 99.926907,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 10:12:45",
        "lat": 2.298841,
        "lng": 99.932444,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 10:14:21",
        "lat": 2.298588,
        "lng": 99.933431,
        "speed": 8.0
      },
      {
        "time": "2026-09-03 10:20:45",
        "lat": 2.298963,
        "lng": 99.935689,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 10:21:45",
        "lat": 2.297326,
        "lng": 99.938978,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 10:22:55",
        "lat": 2.291113,
        "lng": 99.939164,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 10:24:25",
        "lat": 2.289919,
        "lng": 99.940818,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 10:26:25",
        "lat": 2.293315,
        "lng": 99.941244,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 10:27:20",
        "lat": 2.296888,
        "lng": 99.941244,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 10:31:35",
        "lat": 2.29911,
        "lng": 99.941324,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 10:32:35",
        "lat": 2.299417,
        "lng": 99.94408,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 10:33:35",
        "lat": 2.300812,
        "lng": 99.945627,
        "speed": 14.0
      },
      {
        "time": "2026-09-03 10:34:45",
        "lat": 2.303999,
        "lng": 99.945591,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 10:35:55",
        "lat": 2.306494,
        "lng": 99.946124,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 10:37:06",
        "lat": 2.306459,
        "lng": 99.947529,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 10:52:09",
        "lat": 2.306041,
        "lng": 99.949867,
        "speed": 17.0
      },
      {
        "time": "2026-09-03 10:53:29",
        "lat": 2.306359,
        "lng": 99.95304,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 10:54:24",
        "lat": 2.308888,
        "lng": 99.955049,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 10:54:46",
        "lat": 2.308961,
        "lng": 99.956409,
        "speed": 12.0
      },
      {
        "time": "2026-09-03 10:55:09",
        "lat": 2.309881,
        "lng": 99.956382,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 10:56:19",
        "lat": 2.317273,
        "lng": 99.956284,
        "speed": 46.0
      },
      {
        "time": "2026-09-03 10:57:00",
        "lat": 2.319016,
        "lng": 99.957307,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 10:57:46",
        "lat": 2.319073,
        "lng": 99.960364,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 10:58:19",
        "lat": 2.319109,
        "lng": 99.962658,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 10:59:15",
        "lat": 2.319177,
        "lng": 99.96664,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 11:00:09",
        "lat": 2.319243,
        "lng": 99.970391,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 11:01:09",
        "lat": 2.322272,
        "lng": 99.970738,
        "speed": 32.0
      },
      {
        "time": "2026-09-03 11:01:59",
        "lat": 2.325981,
        "lng": 99.970747,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 11:17:26",
        "lat": 2.326066,
        "lng": 99.971796,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 11:18:46",
        "lat": 2.323828,
        "lng": 99.972427,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 11:19:56",
        "lat": 2.319618,
        "lng": 99.972524,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 11:21:06",
        "lat": 2.319359,
        "lng": 99.97616,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 11:22:16",
        "lat": 2.319454,
        "lng": 99.9812,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 11:23:01",
        "lat": 2.319484,
        "lng": 99.984293,
        "speed": 14.0
      },
      {
        "time": "2026-09-03 11:23:45",
        "lat": 2.318391,
        "lng": 99.984356,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 13:43:43",
        "lat": 2.313764,
        "lng": 99.984302,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 13:44:34",
        "lat": 2.309172,
        "lng": 99.984302,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 13:45:34",
        "lat": 2.309072,
        "lng": 99.97928,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 13:46:44",
        "lat": 2.308994,
        "lng": 99.972187,
        "speed": 43.0
      },
      {
        "time": "2026-09-03 13:47:54",
        "lat": 2.308936,
        "lng": 99.964329,
        "speed": 48.0
      },
      {
        "time": "2026-09-03 13:49:04",
        "lat": 2.308936,
        "lng": 99.956951,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 13:49:54",
        "lat": 2.303875,
        "lng": 99.956444,
        "speed": 44.0
      },
      {
        "time": "2026-09-03 13:50:44",
        "lat": 2.299853,
        "lng": 99.955956,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 13:51:54",
        "lat": 2.299743,
        "lng": 99.949573,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 13:52:26",
        "lat": 2.299579,
        "lng": 99.947369,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 13:52:54",
        "lat": 2.299517,
        "lng": 99.9456,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 13:54:04",
        "lat": 2.299149,
        "lng": 99.938756,
        "speed": 41.0
      },
      {
        "time": "2026-09-03 13:55:04",
        "lat": 2.298907,
        "lng": 99.933493,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 13:56:07",
        "lat": 2.299037,
        "lng": 99.928453,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 13:56:54",
        "lat": 2.29895,
        "lng": 99.923893,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 13:57:24",
        "lat": 2.298878,
        "lng": 99.92088,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 13:57:58",
        "lat": 2.298713,
        "lng": 99.917796,
        "speed": 18.0
      },
      {
        "time": "2026-09-03 13:59:04",
        "lat": 2.292376,
        "lng": 99.91696,
        "speed": 42.0
      },
      {
        "time": "2026-09-03 13:59:39",
        "lat": 2.289589,
        "lng": 99.916587,
        "speed": 3.0
      },
      {
        "time": "2026-09-03 14:05:27",
        "lat": 2.289557,
        "lng": 99.91584,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 14:06:04",
        "lat": 2.290668,
        "lng": 99.915138,
        "speed": 32.0
      },
      {
        "time": "2026-09-03 14:06:34",
        "lat": 2.292421,
        "lng": 99.91408,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 14:07:01",
        "lat": 2.294068,
        "lng": 99.913102,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 14:07:43",
        "lat": 2.297728,
        "lng": 99.910889,
        "speed": 42.0
      },
      {
        "time": "2026-09-03 14:08:18",
        "lat": 2.298762,
        "lng": 99.909396,
        "speed": 16.0
      },
      {
        "time": "2026-09-03 14:11:47",
        "lat": 2.298798,
        "lng": 99.909342,
        "speed": 5.0
      },
      {
        "time": "2026-09-03 14:12:42",
        "lat": 2.298744,
        "lng": 99.911689,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 14:13:14",
        "lat": 2.298758,
        "lng": 99.913689,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 14:14:14",
        "lat": 2.298835,
        "lng": 99.917378,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 14:14:48",
        "lat": 2.29889,
        "lng": 99.91952,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 14:15:24",
        "lat": 2.298938,
        "lng": 99.921662,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 14:16:24",
        "lat": 2.299002,
        "lng": 99.92528,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 14:17:04",
        "lat": 2.298316,
        "lng": 99.92664,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 14:17:46",
        "lat": 2.295911,
        "lng": 99.926382,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 14:18:54",
        "lat": 2.291651,
        "lng": 99.925778,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 14:19:30",
        "lat": 2.289813,
        "lng": 99.925502,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 14:36:18",
        "lat": 2.289673,
        "lng": 99.925716,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 14:37:34",
        "lat": 2.291615,
        "lng": 99.925769,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 14:38:47",
        "lat": 2.295908,
        "lng": 99.926382,
        "speed": 5.0
      },
      {
        "time": "2026-09-03 14:39:34",
        "lat": 2.295593,
        "lng": 99.926444,
        "speed": 12.0
      },
      {
        "time": "2026-09-03 14:40:00",
        "lat": 2.296551,
        "lng": 99.926498,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 14:40:34",
        "lat": 2.298797,
        "lng": 99.926756,
        "speed": 16.0
      },
      {
        "time": "2026-09-03 14:41:14",
        "lat": 2.299043,
        "lng": 99.928924,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 14:41:54",
        "lat": 2.298911,
        "lng": 99.931653,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 14:43:24",
        "lat": 2.298925,
        "lng": 99.933511,
        "speed": 20.0
      },
      {
        "time": "2026-09-03 14:43:54",
        "lat": 2.298947,
        "lng": 99.933884,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 14:44:54",
        "lat": 2.299104,
        "lng": 99.937671,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 14:45:44",
        "lat": 2.29931,
        "lng": 99.941449,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 14:46:34",
        "lat": 2.299502,
        "lng": 99.945342,
        "speed": 20.0
      },
      {
        "time": "2026-09-03 14:47:04",
        "lat": 2.298304,
        "lng": 99.945627,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 14:48:14",
        "lat": 2.293292,
        "lng": 99.945751,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 14:48:50",
        "lat": 2.291423,
        "lng": 99.945867,
        "speed": 6.0
      },
      {
        "time": "2026-09-03 15:39:00",
        "lat": 2.291378,
        "lng": 99.945884,
        "speed": 8.0
      },
      {
        "time": "2026-09-03 15:39:30",
        "lat": 2.293195,
        "lng": 99.945769,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 15:40:14",
        "lat": 2.297027,
        "lng": 99.945689,
        "speed": 33.0
      },
      {
        "time": "2026-09-03 15:40:50",
        "lat": 2.299442,
        "lng": 99.945484,
        "speed": 15.0
      },
      {
        "time": "2026-09-03 15:41:30",
        "lat": 2.299338,
        "lng": 99.942729,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 15:42:02",
        "lat": 2.299221,
        "lng": 99.940151,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 15:42:30",
        "lat": 2.299098,
        "lng": 99.937947,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 15:43:10",
        "lat": 2.298978,
        "lng": 99.934711,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 15:44:00",
        "lat": 2.298874,
        "lng": 99.932533,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 15:44:55",
        "lat": 2.299004,
        "lng": 99.928782,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 15:45:40",
        "lat": 2.298984,
        "lng": 99.925796,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 15:46:10",
        "lat": 2.298955,
        "lng": 99.924,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 15:46:40",
        "lat": 2.2989,
        "lng": 99.922071,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 15:47:40",
        "lat": 2.298836,
        "lng": 99.918293,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 15:48:30",
        "lat": 2.298747,
        "lng": 99.915058,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 15:49:02",
        "lat": 2.298717,
        "lng": 99.913058,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 15:49:40",
        "lat": 2.298619,
        "lng": 99.910373,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 15:51:13",
        "lat": 2.298669,
        "lng": 99.909396,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 15:51:44",
        "lat": 2.298627,
        "lng": 99.910284,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 15:52:21",
        "lat": 2.298747,
        "lng": 99.913556,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 15:53:09",
        "lat": 2.298832,
        "lng": 99.918258,
        "speed": 42.0
      },
      {
        "time": "2026-09-03 15:53:44",
        "lat": 2.298921,
        "lng": 99.921973,
        "speed": 41.0
      },
      {
        "time": "2026-09-03 15:54:13",
        "lat": 2.298993,
        "lng": 99.925067,
        "speed": 42.0
      },
      {
        "time": "2026-09-03 15:54:40",
        "lat": 2.299046,
        "lng": 99.927991,
        "speed": 44.0
      },
      {
        "time": "2026-09-03 15:55:32",
        "lat": 2.298871,
        "lng": 99.932933,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 15:57:30",
        "lat": 2.298895,
        "lng": 99.931236,
        "speed": 39.0
      },
      {
        "time": "2026-09-03 15:58:05",
        "lat": 2.298995,
        "lng": 99.927831,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 15:58:38",
        "lat": 2.298948,
        "lng": 99.924676,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 15:59:20",
        "lat": 2.298865,
        "lng": 99.920756,
        "speed": 39.0
      },
      {
        "time": "2026-09-03 16:00:30",
        "lat": 2.298716,
        "lng": 99.913662,
        "speed": 41.0
      },
      {
        "time": "2026-09-03 16:01:10",
        "lat": 2.298573,
        "lng": 99.909769,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 18:54:15",
        "lat": 2.298838,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 19:54:09",
        "lat": 2.298669,
        "lng": 99.909404,
        "speed": 10.0
      },
      {
        "time": "2026-09-03 19:54:39",
        "lat": 2.298706,
        "lng": 99.910862,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 19:55:19",
        "lat": 2.298729,
        "lng": 99.913618,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 19:56:03",
        "lat": 2.298804,
        "lng": 99.916764,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 19:56:28",
        "lat": 2.298851,
        "lng": 99.918524,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 19:56:49",
        "lat": 2.298878,
        "lng": 99.919991,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 19:57:59",
        "lat": 2.298989,
        "lng": 99.924889,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 19:58:59",
        "lat": 2.299027,
        "lng": 99.92928,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 19:59:49",
        "lat": 2.298872,
        "lng": 99.932827,
        "speed": 20.0
      },
      {
        "time": "2026-09-03 20:00:15",
        "lat": 2.298982,
        "lng": 99.934329,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 20:00:52",
        "lat": 2.299088,
        "lng": 99.936853,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 20:01:37",
        "lat": 2.299269,
        "lng": 99.940231,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 20:02:15",
        "lat": 2.299413,
        "lng": 99.943129,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 20:03:09",
        "lat": 2.299608,
        "lng": 99.947467,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 20:03:49",
        "lat": 2.299802,
        "lng": 99.950649,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 20:04:29",
        "lat": 2.299824,
        "lng": 99.953858,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 20:05:08",
        "lat": 2.299951,
        "lng": 99.956462,
        "speed": 16.0
      },
      {
        "time": "2026-09-03 20:06:09",
        "lat": 2.304667,
        "lng": 99.956427,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 20:06:59",
        "lat": 2.309113,
        "lng": 99.956382,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 20:08:09",
        "lat": 2.315148,
        "lng": 99.956302,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 20:08:44",
        "lat": 2.318109,
        "lng": 99.956267,
        "speed": 33.0
      },
      {
        "time": "2026-09-03 20:09:49",
        "lat": 2.323552,
        "lng": 99.956187,
        "speed": 33.0
      },
      {
        "time": "2026-09-03 20:10:30",
        "lat": 2.326089,
        "lng": 99.955973,
        "speed": 8.0
      },
      {
        "time": "2026-09-03 20:59:35",
        "lat": 2.326117,
        "lng": 99.955876,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 21:00:10",
        "lat": 2.32612,
        "lng": 99.955938,
        "speed": 3.0
      },
      {
        "time": "2026-09-03 21:00:39",
        "lat": 2.324604,
        "lng": 99.956151,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:01:09",
        "lat": 2.321993,
        "lng": 99.956196,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 21:01:31",
        "lat": 2.319893,
        "lng": 99.956231,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 21:01:49",
        "lat": 2.318194,
        "lng": 99.956249,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 21:02:19",
        "lat": 2.315283,
        "lng": 99.956302,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 21:02:41",
        "lat": 2.313105,
        "lng": 99.956329,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 21:03:19",
        "lat": 2.309263,
        "lng": 99.956364,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:04:00",
        "lat": 2.308346,
        "lng": 99.954996,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 21:04:39",
        "lat": 2.306289,
        "lng": 99.954169,
        "speed": 32.0
      },
      {
        "time": "2026-09-03 21:05:29",
        "lat": 2.305267,
        "lng": 99.951271,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 21:05:59",
        "lat": 2.302584,
        "lng": 99.951076,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 21:06:45",
        "lat": 2.299744,
        "lng": 99.949956,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:07:03",
        "lat": 2.299637,
        "lng": 99.948444,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 21:07:39",
        "lat": 2.301894,
        "lng": 99.947911,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 21:08:18",
        "lat": 2.305474,
        "lng": 99.947636,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 21:09:40",
        "lat": 2.306491,
        "lng": 99.947422,
        "speed": 6.0
      },
      {
        "time": "2026-09-03 21:10:18",
        "lat": 2.30651,
        "lng": 99.946338,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 21:11:29",
        "lat": 2.306586,
        "lng": 99.945529,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 21:12:29",
        "lat": 2.306515,
        "lng": 99.943387,
        "speed": 7.0
      },
      {
        "time": "2026-09-03 21:13:03",
        "lat": 2.30657,
        "lng": 99.942516,
        "speed": 7.0
      },
      {
        "time": "2026-09-03 21:13:49",
        "lat": 2.306611,
        "lng": 99.94144,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 21:14:26",
        "lat": 2.306606,
        "lng": 99.940267,
        "speed": 13.0
      },
      {
        "time": "2026-09-03 21:14:57",
        "lat": 2.306552,
        "lng": 99.939209,
        "speed": 10.0
      },
      {
        "time": "2026-09-03 21:16:03",
        "lat": 2.306865,
        "lng": 99.938818,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 21:16:39",
        "lat": 2.305764,
        "lng": 99.938809,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 21:17:19",
        "lat": 2.303352,
        "lng": 99.938853,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 21:17:42",
        "lat": 2.301802,
        "lng": 99.938898,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 21:18:39",
        "lat": 2.298067,
        "lng": 99.938969,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 21:19:12",
        "lat": 2.295864,
        "lng": 99.939031,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 21:19:54",
        "lat": 2.292932,
        "lng": 99.939111,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 21:20:31",
        "lat": 2.290749,
        "lng": 99.939182,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 21:21:55",
        "lat": 2.289948,
        "lng": 99.939209,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 21:22:24",
        "lat": 2.291542,
        "lng": 99.939164,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 21:22:42",
        "lat": 2.292751,
        "lng": 99.939129,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 21:23:04",
        "lat": 2.294259,
        "lng": 99.939093,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 21:23:29",
        "lat": 2.295923,
        "lng": 99.939049,
        "speed": 20.0
      },
      {
        "time": "2026-09-03 21:23:59",
        "lat": 2.298023,
        "lng": 99.938996,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 21:24:31",
        "lat": 2.299064,
        "lng": 99.938151,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 21:25:02",
        "lat": 2.298989,
        "lng": 99.93584,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:25:29",
        "lat": 2.298923,
        "lng": 99.93408,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 21:25:59",
        "lat": 2.298888,
        "lng": 99.932329,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 21:26:33",
        "lat": 2.29897,
        "lng": 99.92992,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 21:27:11",
        "lat": 2.299004,
        "lng": 99.927031,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 21:27:49",
        "lat": 2.298959,
        "lng": 99.924116,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 21:28:29",
        "lat": 2.298883,
        "lng": 99.920987,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:29:11",
        "lat": 2.298812,
        "lng": 99.917627,
        "speed": 32.0
      },
      {
        "time": "2026-09-03 21:29:47",
        "lat": 2.298749,
        "lng": 99.914924,
        "speed": 7.0
      },
      {
        "time": "2026-09-03 21:30:19",
        "lat": 2.299607,
        "lng": 99.915671,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 21:30:49",
        "lat": 2.301829,
        "lng": 99.915947,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 21:31:19",
        "lat": 2.303838,
        "lng": 99.916213,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 21:32:14",
        "lat": 2.306791,
        "lng": 99.916604,
        "speed": 13.0
      },
      {
        "time": "2026-09-03 21:32:47",
        "lat": 2.304883,
        "lng": 99.916329,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 21:33:19",
        "lat": 2.302485,
        "lng": 99.916018,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:33:41",
        "lat": 2.300643,
        "lng": 99.915787,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 21:34:06",
        "lat": 2.298808,
        "lng": 99.915547,
        "speed": 14.0
      },
      {
        "time": "2026-09-03 21:34:39",
        "lat": 2.298739,
        "lng": 99.913449,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 21:35:39",
        "lat": 2.298775,
        "lng": 99.909378,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 22:05:05",
        "lat": 2.29872,
        "lng": 99.909396,
        "speed": 7.0
      },
      {
        "time": "2026-09-03 22:17:25",
        "lat": 2.298733,
        "lng": 99.913084,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 22:18:35",
        "lat": 2.298841,
        "lng": 99.918702,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 22:19:45",
        "lat": 2.298983,
        "lng": 99.924773,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 22:20:55",
        "lat": 2.298909,
        "lng": 99.931156,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 22:22:05",
        "lat": 2.299033,
        "lng": 99.936293,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 22:23:15",
        "lat": 2.299339,
        "lng": 99.942693,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 22:24:25",
        "lat": 2.299643,
        "lng": 99.948764,
        "speed": 33.0
      },
      {
        "time": "2026-09-03 22:25:35",
        "lat": 2.29982,
        "lng": 99.954818,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 22:26:45",
        "lat": 2.299904,
        "lng": 99.961049,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 22:27:55",
        "lat": 2.300037,
        "lng": 99.967387,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 22:28:55",
        "lat": 2.299766,
        "lng": 99.968862,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 22:29:35",
        "lat": 2.300026,
        "lng": 99.966276,
        "speed": 47.0
      },
      {
        "time": "2026-09-03 22:30:45",
        "lat": 2.299878,
        "lng": 99.958053,
        "speed": 51.0
      },
      {
        "time": "2026-09-03 22:31:55",
        "lat": 2.299642,
        "lng": 99.948444,
        "speed": 55.0
      },
      {
        "time": "2026-09-03 22:33:05",
        "lat": 2.299152,
        "lng": 99.938916,
        "speed": 53.0
      },
      {
        "time": "2026-09-03 22:34:15",
        "lat": 2.298938,
        "lng": 99.930782,
        "speed": 53.0
      },
      {
        "time": "2026-09-03 22:35:25",
        "lat": 2.298884,
        "lng": 99.920942,
        "speed": 54.0
      },
      {
        "time": "2026-09-03 22:36:35",
        "lat": 2.298716,
        "lng": 99.911502,
        "speed": 51.0
      },
      {
        "time": "2026-09-03 22:37:45",
        "lat": 2.300658,
        "lng": 99.909093,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 22:39:13",
        "lat": 2.307132,
        "lng": 99.909813,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 23:17:12",
        "lat": 2.307144,
        "lng": 99.912418,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:18:12",
        "lat": 2.305539,
        "lng": 99.914453,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:19:22",
        "lat": 2.300513,
        "lng": 99.913547,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 23:20:42",
        "lat": 2.298759,
        "lng": 99.913991,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 23:21:41",
        "lat": 2.298849,
        "lng": 99.91784,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:22:42",
        "lat": 2.298937,
        "lng": 99.921849,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:23:52",
        "lat": 2.299039,
        "lng": 99.926382,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:24:39",
        "lat": 2.299018,
        "lng": 99.929529,
        "speed": 17.0
      },
      {
        "time": "2026-09-03 23:25:42",
        "lat": 2.295346,
        "lng": 99.929129,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 23:26:52",
        "lat": 2.290562,
        "lng": 99.928498,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:27:38",
        "lat": 2.290031,
        "lng": 99.928436,
        "speed": 17.0
      },
      {
        "time": "2026-09-03 23:28:32",
        "lat": 2.293392,
        "lng": 99.928907,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 23:29:42",
        "lat": 2.298224,
        "lng": 99.929556,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 23:30:18",
        "lat": 2.298916,
        "lng": 99.93104,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 23:30:50",
        "lat": 2.298883,
        "lng": 99.933076,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 23:31:43",
        "lat": 2.298858,
        "lng": 99.934098,
        "speed": 5.0
      },
      {
        "time": "2026-09-03 23:32:13",
        "lat": 2.298999,
        "lng": 99.934489,
        "speed": 16.0
      },
      {
        "time": "2026-09-03 23:33:12",
        "lat": 2.299122,
        "lng": 99.938089,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:33:52",
        "lat": 2.30037,
        "lng": 99.938933,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 23:35:02",
        "lat": 2.304791,
        "lng": 99.938836,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:36:04",
        "lat": 2.306787,
        "lng": 99.938836,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 23:37:09",
        "lat": 2.305356,
        "lng": 99.938818,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 23:37:52",
        "lat": 2.302694,
        "lng": 99.93888,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:38:12",
        "lat": 2.301418,
        "lng": 99.938933,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 23:38:47",
        "lat": 2.299153,
        "lng": 99.938978,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 23:39:22",
        "lat": 2.296831,
        "lng": 99.939013,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:39:52",
        "lat": 2.294821,
        "lng": 99.939067,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:40:22",
        "lat": 2.292938,
        "lng": 99.939129,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:41:12",
        "lat": 2.290011,
        "lng": 99.939209,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 23:42:02",
        "lat": 2.289901,
        "lng": 99.939813,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 23:43:46",
        "lat": 2.289946,
        "lng": 99.941289,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 23:44:32",
        "lat": 2.292133,
        "lng": 99.941244,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:45:18",
        "lat": 2.29515,
        "lng": 99.941191,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:45:55",
        "lat": 2.297552,
        "lng": 99.94128,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 23:46:42",
        "lat": 2.298798,
        "lng": 99.941307,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 23:47:32",
        "lat": 2.299374,
        "lng": 99.943716,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 23:48:41",
        "lat": 2.299679,
        "lng": 99.948071,
        "speed": 12.0
      },
      {
        "time": "2026-09-03 23:49:35",
        "lat": 2.303167,
        "lng": 99.947822,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 23:50:12",
        "lat": 2.305516,
        "lng": 99.947636,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:51:30",
        "lat": 2.306395,
        "lng": 99.947591,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 23:52:32",
        "lat": 2.304296,
        "lng": 99.947707,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 23:53:22",
        "lat": 2.301151,
        "lng": 99.947929,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 23:54:22",
        "lat": 2.299532,
        "lng": 99.946071,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:55:22",
        "lat": 2.299339,
        "lng": 99.942124,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:56:08",
        "lat": 2.299171,
        "lng": 99.938996,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:56:48",
        "lat": 2.299037,
        "lng": 99.936267,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:57:42",
        "lat": 2.298894,
        "lng": 99.93328,
        "speed": 15.0
      },
      {
        "time": "2026-09-03 23:58:32",
        "lat": 2.298952,
        "lng": 99.930489,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:59:12",
        "lat": 2.299017,
        "lng": 99.927591,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 23:59:52",
        "lat": 2.298993,
        "lng": 99.924756,
        "speed": 26.0
      }
    ]
  },
  "2026-09-04__V-JAR-01": {
    "date": "2026-09-04",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-04 00:00:02",
        "lat": 2.298983,
        "lng": 99.924071,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 00:00:42",
        "lat": 2.298897,
        "lng": 99.921244,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 00:01:32",
        "lat": 2.298836,
        "lng": 99.917582,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 00:02:22",
        "lat": 2.298771,
        "lng": 99.913849,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 00:03:01",
        "lat": 2.298994,
        "lng": 99.913298,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 00:04:02",
        "lat": 2.299092,
        "lng": 99.913333,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 03:36:04",
        "lat": 2.300304,
        "lng": 99.913493,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 03:36:46",
        "lat": 2.302414,
        "lng": 99.913947,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 03:37:04",
        "lat": 2.303386,
        "lng": 99.914107,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 03:37:41",
        "lat": 2.305416,
        "lng": 99.914436,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 03:38:03",
        "lat": 2.30664,
        "lng": 99.914649,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 03:38:34",
        "lat": 2.307121,
        "lng": 99.913707,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 05:29:46",
        "lat": 2.307277,
        "lng": 99.912569,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 05:30:30",
        "lat": 2.307155,
        "lng": 99.910693,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 05:31:10",
        "lat": 2.305379,
        "lng": 99.9096,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 05:32:00",
        "lat": 2.300672,
        "lng": 99.909084,
        "speed": 35.0
      },
      {
        "time": "2026-09-04 05:32:30",
        "lat": 2.298787,
        "lng": 99.909342,
        "speed": 9.0
      },
      {
        "time": "2026-09-04 07:03:56",
        "lat": 2.298791,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 07:04:16",
        "lat": 2.298608,
        "lng": 99.9096,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 07:05:07",
        "lat": 2.298756,
        "lng": 99.915156,
        "speed": 36.0
      },
      {
        "time": "2026-09-04 07:06:09",
        "lat": 2.298911,
        "lng": 99.917796,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 07:06:47",
        "lat": 2.302223,
        "lng": 99.918213,
        "speed": 42.0
      },
      {
        "time": "2026-09-04 07:07:14",
        "lat": 2.304422,
        "lng": 99.918507,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 07:08:03",
        "lat": 2.300921,
        "lng": 99.918071,
        "speed": 39.0
      },
      {
        "time": "2026-09-04 07:08:22",
        "lat": 2.299129,
        "lng": 99.91784,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 07:08:57",
        "lat": 2.298895,
        "lng": 99.920284,
        "speed": 37.0
      },
      {
        "time": "2026-09-04 07:09:47",
        "lat": 2.299003,
        "lng": 99.925227,
        "speed": 39.0
      },
      {
        "time": "2026-09-04 07:10:17",
        "lat": 2.299039,
        "lng": 99.928178,
        "speed": 40.0
      },
      {
        "time": "2026-09-04 07:10:51",
        "lat": 2.298908,
        "lng": 99.931538,
        "speed": 41.0
      },
      {
        "time": "2026-09-04 07:11:27",
        "lat": 2.298514,
        "lng": 99.93328,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 07:52:04",
        "lat": 2.298647,
        "lng": 99.933476,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 07:52:50",
        "lat": 2.298837,
        "lng": 99.932587,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 08:04:57",
        "lat": 2.299116,
        "lng": 99.932391,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 08:05:34",
        "lat": 2.298871,
        "lng": 99.932018,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 08:06:19",
        "lat": 2.298859,
        "lng": 99.929644,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 08:07:04",
        "lat": 2.296448,
        "lng": 99.929298,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 08:07:44",
        "lat": 2.293895,
        "lng": 99.928951,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 08:08:34",
        "lat": 2.290589,
        "lng": 99.928498,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 08:31:16",
        "lat": 2.289627,
        "lng": 99.928382,
        "speed": 11.0
      },
      {
        "time": "2026-09-04 08:32:06",
        "lat": 2.289723,
        "lng": 99.927387,
        "speed": 8.0
      },
      {
        "time": "2026-09-04 08:32:31",
        "lat": 2.289731,
        "lng": 99.927049,
        "speed": 8.0
      },
      {
        "time": "2026-09-04 08:32:56",
        "lat": 2.289752,
        "lng": 99.926533,
        "speed": 8.0
      },
      {
        "time": "2026-09-04 08:35:11",
        "lat": 2.289761,
        "lng": 99.926053,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 08:35:36",
        "lat": 2.289773,
        "lng": 99.925582,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 08:35:48",
        "lat": 2.28999,
        "lng": 99.925502,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 08:36:26",
        "lat": 2.291985,
        "lng": 99.925813,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 08:36:56",
        "lat": 2.293693,
        "lng": 99.926044,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 08:37:37",
        "lat": 2.296123,
        "lng": 99.926418,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 08:38:00",
        "lat": 2.297448,
        "lng": 99.926587,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 08:38:20",
        "lat": 2.29863,
        "lng": 99.926711,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 08:38:53",
        "lat": 2.300092,
        "lng": 99.926907,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 08:39:07",
        "lat": 2.301006,
        "lng": 99.927004,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 08:39:26",
        "lat": 2.30217,
        "lng": 99.927147,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 08:40:06",
        "lat": 2.304769,
        "lng": 99.927493,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 08:40:36",
        "lat": 2.306816,
        "lng": 99.927733,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 08:46:06",
        "lat": 2.307031,
        "lng": 99.927982,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 08:46:56",
        "lat": 2.307053,
        "lng": 99.929476,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 08:47:20",
        "lat": 2.307073,
        "lng": 99.930249,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 08:48:08",
        "lat": 2.307068,
        "lng": 99.930676,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 09:51:29",
        "lat": 2.305747,
        "lng": 99.930516,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 09:51:50",
        "lat": 2.304304,
        "lng": 99.93032,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 09:52:30",
        "lat": 2.300765,
        "lng": 99.929849,
        "speed": 36.0
      },
      {
        "time": "2026-09-04 09:53:06",
        "lat": 2.299018,
        "lng": 99.928844,
        "speed": 36.0
      },
      {
        "time": "2026-09-04 09:53:40",
        "lat": 2.298953,
        "lng": 99.925502,
        "speed": 40.0
      },
      {
        "time": "2026-09-04 09:54:10",
        "lat": 2.298894,
        "lng": 99.922507,
        "speed": 45.0
      },
      {
        "time": "2026-09-04 09:54:58",
        "lat": 2.29878,
        "lng": 99.917209,
        "speed": 47.0
      },
      {
        "time": "2026-09-04 09:55:40",
        "lat": 2.298696,
        "lng": 99.912178,
        "speed": 47.0
      },
      {
        "time": "2026-09-04 09:56:14",
        "lat": 2.298722,
        "lng": 99.909396,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 10:10:10",
        "lat": 2.298791,
        "lng": 99.909324,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 10:10:38",
        "lat": 2.298594,
        "lng": 99.910071,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 10:11:28",
        "lat": 2.298744,
        "lng": 99.913902,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 10:12:18",
        "lat": 2.298836,
        "lng": 99.918356,
        "speed": 35.0
      },
      {
        "time": "2026-09-04 10:13:08",
        "lat": 2.298933,
        "lng": 99.922507,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 10:13:38",
        "lat": 2.298466,
        "lng": 99.922187,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 10:14:05",
        "lat": 2.298035,
        "lng": 99.922676,
        "speed": 7.0
      },
      {
        "time": "2026-09-04 13:41:32",
        "lat": 2.297977,
        "lng": 99.922507,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 13:42:06",
        "lat": 2.298902,
        "lng": 99.922053,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 13:42:52",
        "lat": 2.298824,
        "lng": 99.918444,
        "speed": 31.0
      },
      {
        "time": "2026-09-04 13:43:42",
        "lat": 2.298749,
        "lng": 99.914436,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 13:44:32",
        "lat": 2.298633,
        "lng": 99.910302,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 13:45:18",
        "lat": 2.298861,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 14:09:25",
        "lat": 2.298604,
        "lng": 99.910169,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 14:10:15",
        "lat": 2.298755,
        "lng": 99.913556,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 14:11:05",
        "lat": 2.298824,
        "lng": 99.917396,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 14:11:55",
        "lat": 2.298912,
        "lng": 99.921147,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 14:12:45",
        "lat": 2.299004,
        "lng": 99.925164,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 14:13:35",
        "lat": 2.299037,
        "lng": 99.929084,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 14:14:20",
        "lat": 2.298992,
        "lng": 99.9324,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 14:15:05",
        "lat": 2.301846,
        "lng": 99.932453,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 14:15:55",
        "lat": 2.305459,
        "lng": 99.932418,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 14:16:35",
        "lat": 2.307011,
        "lng": 99.932942,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 14:17:25",
        "lat": 2.307002,
        "lng": 99.934667,
        "speed": 9.0
      },
      {
        "time": "2026-09-04 14:18:15",
        "lat": 2.306942,
        "lng": 99.936133,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 14:18:57",
        "lat": 2.30645,
        "lng": 99.936818,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 14:20:35",
        "lat": 2.306251,
        "lng": 99.936853,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 14:21:05",
        "lat": 2.306837,
        "lng": 99.937253,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 14:21:55",
        "lat": 2.306919,
        "lng": 99.938347,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 14:22:40",
        "lat": 2.306332,
        "lng": 99.938764,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 14:23:15",
        "lat": 2.304432,
        "lng": 99.938836,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 14:24:05",
        "lat": 2.301239,
        "lng": 99.938916,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 14:24:55",
        "lat": 2.298176,
        "lng": 99.938969,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 14:25:45",
        "lat": 2.294585,
        "lng": 99.939049,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 14:26:35",
        "lat": 2.291137,
        "lng": 99.939164,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 14:27:36",
        "lat": 2.289861,
        "lng": 99.939369,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 14:44:22",
        "lat": 2.289873,
        "lng": 99.940169,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 14:45:45",
        "lat": 2.289987,
        "lng": 99.941307,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 14:53:28",
        "lat": 2.290894,
        "lng": 99.941307,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 14:54:18",
        "lat": 2.293015,
        "lng": 99.941244,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 14:55:08",
        "lat": 2.295283,
        "lng": 99.941191,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 14:55:58",
        "lat": 2.297646,
        "lng": 99.94128,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 14:56:38",
        "lat": 2.299243,
        "lng": 99.941476,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 14:57:28",
        "lat": 2.299415,
        "lng": 99.944418,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 14:58:18",
        "lat": 2.299518,
        "lng": 99.947022,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 14:59:02",
        "lat": 2.299456,
        "lng": 99.948071,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 14:59:38",
        "lat": 2.297734,
        "lng": 99.948196,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 15:00:28",
        "lat": 2.295064,
        "lng": 99.948444,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 15:01:18",
        "lat": 2.292228,
        "lng": 99.948658,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 15:01:54",
        "lat": 2.290212,
        "lng": 99.948844,
        "speed": 6.0
      },
      {
        "time": "2026-09-04 15:02:38",
        "lat": 2.290194,
        "lng": 99.949431,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 15:03:28",
        "lat": 2.290541,
        "lng": 99.951289,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 15:04:18",
        "lat": 2.293121,
        "lng": 99.951431,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 15:04:58",
        "lat": 2.293323,
        "lng": 99.953013,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 15:05:48",
        "lat": 2.293222,
        "lng": 99.954996,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 15:06:24",
        "lat": 2.293168,
        "lng": 99.956542,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 15:07:08",
        "lat": 2.293099,
        "lng": 99.958827,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 15:07:56",
        "lat": 2.293018,
        "lng": 99.961849,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 15:08:28",
        "lat": 2.292985,
        "lng": 99.963964,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 15:09:04",
        "lat": 2.292969,
        "lng": 99.966018,
        "speed": 5.0
      },
      {
        "time": "2026-09-04 15:09:23",
        "lat": 2.292965,
        "lng": 99.96608,
        "speed": 3.0
      },
      {
        "time": "2026-09-04 15:09:48",
        "lat": 2.292936,
        "lng": 99.964889,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 15:10:38",
        "lat": 2.293134,
        "lng": 99.96352,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 15:11:28",
        "lat": 2.296106,
        "lng": 99.963467,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 15:11:58",
        "lat": 2.298121,
        "lng": 99.963422,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 15:12:48",
        "lat": 2.301621,
        "lng": 99.96336,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 15:13:38",
        "lat": 2.3057,
        "lng": 99.963298,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 15:14:22",
        "lat": 2.308869,
        "lng": 99.963351,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 15:15:08",
        "lat": 2.308903,
        "lng": 99.96704,
        "speed": 37.0
      },
      {
        "time": "2026-09-04 15:15:58",
        "lat": 2.30893,
        "lng": 99.971173,
        "speed": 34.0
      },
      {
        "time": "2026-09-04 15:16:48",
        "lat": 2.308962,
        "lng": 99.975093,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 15:17:30",
        "lat": 2.309033,
        "lng": 99.977573,
        "speed": 11.0
      },
      {
        "time": "2026-09-04 15:28:40",
        "lat": 2.309281,
        "lng": 99.977573,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 15:29:22",
        "lat": 2.30898,
        "lng": 99.976302,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 15:30:12",
        "lat": 2.308954,
        "lng": 99.972542,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 15:30:42",
        "lat": 2.308937,
        "lng": 99.969956,
        "speed": 39.0
      },
      {
        "time": "2026-09-04 15:31:32",
        "lat": 2.308894,
        "lng": 99.965289,
        "speed": 36.0
      },
      {
        "time": "2026-09-04 15:32:22",
        "lat": 2.308879,
        "lng": 99.960453,
        "speed": 40.0
      },
      {
        "time": "2026-09-04 15:33:12",
        "lat": 2.308883,
        "lng": 99.955484,
        "speed": 38.0
      },
      {
        "time": "2026-09-04 15:33:50",
        "lat": 2.306228,
        "lng": 99.954951,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 15:34:32",
        "lat": 2.306224,
        "lng": 99.951351,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 15:35:22",
        "lat": 2.301952,
        "lng": 99.950996,
        "speed": 35.0
      },
      {
        "time": "2026-09-04 15:36:02",
        "lat": 2.299712,
        "lng": 99.949884,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 15:36:42",
        "lat": 2.300763,
        "lng": 99.947964,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 15:37:32",
        "lat": 2.305057,
        "lng": 99.947636,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 17:37:21",
        "lat": 2.306442,
        "lng": 99.947591,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 17:37:55",
        "lat": 2.305033,
        "lng": 99.947671,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 17:38:25",
        "lat": 2.303092,
        "lng": 99.947822,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 17:39:15",
        "lat": 2.299769,
        "lng": 99.948071,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 17:39:55",
        "lat": 2.299506,
        "lng": 99.945947,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 17:40:45",
        "lat": 2.299341,
        "lng": 99.942676,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 17:41:15",
        "lat": 2.299312,
        "lng": 99.941209,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 17:41:55",
        "lat": 2.296999,
        "lng": 99.941244,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 17:42:45",
        "lat": 2.293289,
        "lng": 99.941209,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 17:43:34",
        "lat": 2.289997,
        "lng": 99.941307,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 17:43:52",
        "lat": 2.29019,
        "lng": 99.941289,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 17:44:35",
        "lat": 2.292465,
        "lng": 99.941262,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 17:45:06",
        "lat": 2.294049,
        "lng": 99.941227,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 17:45:45",
        "lat": 2.295985,
        "lng": 99.941209,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 17:46:05",
        "lat": 2.297004,
        "lng": 99.941244,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 17:46:35",
        "lat": 2.298615,
        "lng": 99.941307,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 17:47:15",
        "lat": 2.299334,
        "lng": 99.942302,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 17:47:47",
        "lat": 2.299084,
        "lng": 99.943458,
        "speed": 11.0
      },
      {
        "time": "2026-09-04 17:59:02",
        "lat": 2.299026,
        "lng": 99.943573,
        "speed": 9.0
      },
      {
        "time": "2026-09-04 17:59:15",
        "lat": 2.299325,
        "lng": 99.943458,
        "speed": 4.0
      },
      {
        "time": "2026-09-04 17:59:52",
        "lat": 2.299349,
        "lng": 99.943182,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 18:00:32",
        "lat": 2.299218,
        "lng": 99.940462,
        "speed": 31.0
      },
      {
        "time": "2026-09-04 18:01:02",
        "lat": 2.299088,
        "lng": 99.93816,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 18:01:22",
        "lat": 2.299033,
        "lng": 99.936684,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 18:01:42",
        "lat": 2.298969,
        "lng": 99.935191,
        "speed": 31.0
      },
      {
        "time": "2026-09-04 18:02:12",
        "lat": 2.298878,
        "lng": 99.933307,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 18:02:52",
        "lat": 2.297393,
        "lng": 99.932347,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 18:03:20",
        "lat": 2.295391,
        "lng": 99.93224,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 18:03:42",
        "lat": 2.293867,
        "lng": 99.932196,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 18:04:17",
        "lat": 2.291477,
        "lng": 99.932142,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 18:04:46",
        "lat": 2.289748,
        "lng": 99.932133,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 18:05:12",
        "lat": 2.290342,
        "lng": 99.932133,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 18:05:42",
        "lat": 2.292001,
        "lng": 99.93216,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 18:06:22",
        "lat": 2.294716,
        "lng": 99.932213,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 18:07:12",
        "lat": 2.298193,
        "lng": 99.932373,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 18:07:52",
        "lat": 2.298916,
        "lng": 99.933867,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 18:08:42",
        "lat": 2.299044,
        "lng": 99.936898,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 18:08:55",
        "lat": 2.299089,
        "lng": 99.937742,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 18:09:21",
        "lat": 2.298926,
        "lng": 99.938969,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 18:12:57",
        "lat": 2.298786,
        "lng": 99.938978,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 18:13:17",
        "lat": 2.299152,
        "lng": 99.939093,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 18:13:42",
        "lat": 2.299249,
        "lng": 99.94056,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 18:14:32",
        "lat": 2.299395,
        "lng": 99.943991,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 18:16:56",
        "lat": 2.299114,
        "lng": 99.945716,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 18:55:49",
        "lat": 2.29878,
        "lng": 99.945644,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 18:56:06",
        "lat": 2.297871,
        "lng": 99.945653,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 18:56:29",
        "lat": 2.296588,
        "lng": 99.945671,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 18:57:09",
        "lat": 2.294067,
        "lng": 99.945716,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 18:57:22",
        "lat": 2.293238,
        "lng": 99.945751,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 18:57:59",
        "lat": 2.290829,
        "lng": 99.945813,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 18:59:41",
        "lat": 2.290148,
        "lng": 99.945867,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 19:00:10",
        "lat": 2.290897,
        "lng": 99.945831,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 19:00:25",
        "lat": 2.291661,
        "lng": 99.945813,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 19:00:59",
        "lat": 2.293655,
        "lng": 99.945733,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 19:01:29",
        "lat": 2.295519,
        "lng": 99.945689,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 19:01:51",
        "lat": 2.297019,
        "lng": 99.945671,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 19:02:18",
        "lat": 2.298829,
        "lng": 99.945644,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 19:02:43",
        "lat": 2.300331,
        "lng": 99.945644,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 19:03:03",
        "lat": 2.301665,
        "lng": 99.9456,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 19:03:19",
        "lat": 2.302713,
        "lng": 99.945591,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 19:03:44",
        "lat": 2.304398,
        "lng": 99.945556,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 19:04:25",
        "lat": 2.306596,
        "lng": 99.945787,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 19:05:13",
        "lat": 2.306514,
        "lng": 99.946507,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 19:05:49",
        "lat": 2.306535,
        "lng": 99.946889,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 19:06:18",
        "lat": 2.306448,
        "lng": 99.947369,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 19:06:30",
        "lat": 2.306491,
        "lng": 99.947413,
        "speed": 9.0
      },
      {
        "time": "2026-09-04 19:06:44",
        "lat": 2.306462,
        "lng": 99.947538,
        "speed": 5.0
      },
      {
        "time": "2026-09-04 19:07:15",
        "lat": 2.306376,
        "lng": 99.947538,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 19:07:29",
        "lat": 2.305749,
        "lng": 99.947591,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 19:07:59",
        "lat": 2.304238,
        "lng": 99.947707,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 19:08:10",
        "lat": 2.303633,
        "lng": 99.947751,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 19:08:29",
        "lat": 2.302532,
        "lng": 99.94784,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 19:09:00",
        "lat": 2.301179,
        "lng": 99.947911,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 19:09:19",
        "lat": 2.300479,
        "lng": 99.947982,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 19:09:43",
        "lat": 2.299615,
        "lng": 99.947911,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 19:09:59",
        "lat": 2.299546,
        "lng": 99.947138,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 19:10:19",
        "lat": 2.299497,
        "lng": 99.946089,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 19:11:00",
        "lat": 2.299394,
        "lng": 99.943893,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 19:11:30",
        "lat": 2.299319,
        "lng": 99.942311,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 19:11:59",
        "lat": 2.29925,
        "lng": 99.940773,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 19:12:29",
        "lat": 2.299153,
        "lng": 99.939129,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 19:12:52",
        "lat": 2.299103,
        "lng": 99.937956,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 19:13:09",
        "lat": 2.299069,
        "lng": 99.937191,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 19:13:31",
        "lat": 2.299017,
        "lng": 99.93608,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 19:14:03",
        "lat": 2.298827,
        "lng": 99.934702,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 19:24:35",
        "lat": 2.298672,
        "lng": 99.934667,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 19:25:55",
        "lat": 2.298984,
        "lng": 99.934569,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 19:26:35",
        "lat": 2.298881,
        "lng": 99.932507,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 19:27:25",
        "lat": 2.299013,
        "lng": 99.929022,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 19:27:55",
        "lat": 2.29899,
        "lng": 99.926844,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 19:28:25",
        "lat": 2.298971,
        "lng": 99.924773,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 19:28:54",
        "lat": 2.29893,
        "lng": 99.922836,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 19:29:19",
        "lat": 2.298882,
        "lng": 99.921058,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 19:29:45",
        "lat": 2.298834,
        "lng": 99.919156,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 19:30:35",
        "lat": 2.298748,
        "lng": 99.915316,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 19:31:09",
        "lat": 2.298706,
        "lng": 99.9128,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 19:31:35",
        "lat": 2.298687,
        "lng": 99.910844,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 19:31:58",
        "lat": 2.298613,
        "lng": 99.909467,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 19:32:08",
        "lat": 2.298823,
        "lng": 99.909324,
        "speed": 4.0
      },
      {
        "time": "2026-09-04 20:01:27",
        "lat": 2.298596,
        "lng": 99.909796,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 20:01:43",
        "lat": 2.298816,
        "lng": 99.909324,
        "speed": 7.0
      },
      {
        "time": "2026-09-04 20:02:26",
        "lat": 2.298751,
        "lng": 99.909378,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 20:03:03",
        "lat": 2.298733,
        "lng": 99.911022,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:03:33",
        "lat": 2.298751,
        "lng": 99.912871,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:03:53",
        "lat": 2.298771,
        "lng": 99.914062,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:04:23",
        "lat": 2.298794,
        "lng": 99.915947,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:05:03",
        "lat": 2.298851,
        "lng": 99.918444,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 20:05:23",
        "lat": 2.298879,
        "lng": 99.919742,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 20:05:53",
        "lat": 2.298921,
        "lng": 99.921733,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 20:06:31",
        "lat": 2.298994,
        "lng": 99.924284,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 20:07:03",
        "lat": 2.299012,
        "lng": 99.926382,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:07:23",
        "lat": 2.299526,
        "lng": 99.926827,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 20:07:53",
        "lat": 2.301287,
        "lng": 99.927049,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:08:23",
        "lat": 2.303162,
        "lng": 99.92728,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 20:08:46",
        "lat": 2.304638,
        "lng": 99.927458,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:09:23",
        "lat": 2.306884,
        "lng": 99.927733,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 20:10:19",
        "lat": 2.307052,
        "lng": 99.927778,
        "speed": 6.0
      },
      {
        "time": "2026-09-04 20:11:23",
        "lat": 2.307052,
        "lng": 99.928204,
        "speed": 8.0
      },
      {
        "time": "2026-09-04 20:11:53",
        "lat": 2.307081,
        "lng": 99.929058,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 20:12:43",
        "lat": 2.307156,
        "lng": 99.930533,
        "speed": 11.0
      },
      {
        "time": "2026-09-04 20:15:10",
        "lat": 2.306983,
        "lng": 99.930667,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 20:15:33",
        "lat": 2.305914,
        "lng": 99.930533,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:16:03",
        "lat": 2.304271,
        "lng": 99.93032,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:16:22",
        "lat": 2.303207,
        "lng": 99.930187,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 20:16:43",
        "lat": 2.301987,
        "lng": 99.930018,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:17:16",
        "lat": 2.30008,
        "lng": 99.929769,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:17:41",
        "lat": 2.298978,
        "lng": 99.929831,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:18:03",
        "lat": 2.298932,
        "lng": 99.9312,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 20:18:33",
        "lat": 2.298421,
        "lng": 99.932373,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 20:18:49",
        "lat": 2.297642,
        "lng": 99.932347,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:19:18",
        "lat": 2.296014,
        "lng": 99.932276,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:19:34",
        "lat": 2.295186,
        "lng": 99.932231,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 20:20:09",
        "lat": 2.293358,
        "lng": 99.932196,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 20:20:33",
        "lat": 2.292004,
        "lng": 99.93216,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 20:20:59",
        "lat": 2.290547,
        "lng": 99.932142,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:26:22",
        "lat": 2.289647,
        "lng": 99.932142,
        "speed": 4.0
      },
      {
        "time": "2026-09-04 20:26:43",
        "lat": 2.290267,
        "lng": 99.932133,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 20:27:27",
        "lat": 2.292248,
        "lng": 99.932196,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 20:28:03",
        "lat": 2.293989,
        "lng": 99.932213,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 20:28:29",
        "lat": 2.295311,
        "lng": 99.932258,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 20:28:52",
        "lat": 2.296564,
        "lng": 99.932329,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 20:29:13",
        "lat": 2.297644,
        "lng": 99.932373,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 20:29:40",
        "lat": 2.298888,
        "lng": 99.932347,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 20:29:53",
        "lat": 2.29889,
        "lng": 99.931671,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:30:21",
        "lat": 2.298958,
        "lng": 99.930044,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:30:56",
        "lat": 2.299018,
        "lng": 99.927982,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:31:33",
        "lat": 2.298999,
        "lng": 99.926151,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:32:12",
        "lat": 2.29897,
        "lng": 99.924071,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:32:35",
        "lat": 2.298934,
        "lng": 99.922676,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:32:53",
        "lat": 2.298903,
        "lng": 99.9216,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 20:33:33",
        "lat": 2.299518,
        "lng": 99.920196,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:57:48",
        "lat": 2.298913,
        "lng": 99.92008,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 20:58:28",
        "lat": 2.298816,
        "lng": 99.917156,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 20:59:18",
        "lat": 2.298736,
        "lng": 99.912969,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 21:00:06",
        "lat": 2.298712,
        "lng": 99.909422,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 21:00:46",
        "lat": 2.298866,
        "lng": 99.909378,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 22:21:03",
        "lat": 2.298862,
        "lng": 99.909396,
        "speed": 2.0
      },
      {
        "time": "2026-09-04 22:21:50",
        "lat": 2.298659,
        "lng": 99.90944,
        "speed": 7.0
      },
      {
        "time": "2026-09-04 22:22:10",
        "lat": 2.298647,
        "lng": 99.910302,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 22:22:32",
        "lat": 2.298749,
        "lng": 99.911556,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 22:23:10",
        "lat": 2.298751,
        "lng": 99.913964,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 22:23:30",
        "lat": 2.298779,
        "lng": 99.91544,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 22:23:52",
        "lat": 2.298828,
        "lng": 99.91704,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 22:24:30",
        "lat": 2.298898,
        "lng": 99.919876,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 22:25:00",
        "lat": 2.298943,
        "lng": 99.922116,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 22:25:20",
        "lat": 2.298986,
        "lng": 99.9236,
        "speed": 31.0
      },
      {
        "time": "2026-09-04 22:25:49",
        "lat": 2.29902,
        "lng": 99.925733,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 22:26:04",
        "lat": 2.299031,
        "lng": 99.926827,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 22:26:20",
        "lat": 2.299056,
        "lng": 99.927982,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 22:26:50",
        "lat": 2.298985,
        "lng": 99.930178,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 22:27:30",
        "lat": 2.29888,
        "lng": 99.932729,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 22:28:16",
        "lat": 2.29899,
        "lng": 99.934453,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 22:33:24",
        "lat": 2.298758,
        "lng": 99.934711,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 22:33:50",
        "lat": 2.298955,
        "lng": 99.934151,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 22:35:49",
        "lat": 2.298894,
        "lng": 99.932978,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 22:36:21",
        "lat": 2.299004,
        "lng": 99.934827,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 22:37:10",
        "lat": 2.299352,
        "lng": 99.936898,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 23:03:08",
        "lat": 2.299374,
        "lng": 99.936782,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 23:03:30",
        "lat": 2.299076,
        "lng": 99.93648,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 23:04:00",
        "lat": 2.299038,
        "lng": 99.934942,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 23:04:40",
        "lat": 2.298937,
        "lng": 99.933724,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 23:05:30",
        "lat": 2.298932,
        "lng": 99.931413,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 23:08:23",
        "lat": 2.299495,
        "lng": 99.929831,
        "speed": 0.0
      }
    ]
  },
  "2026-09-05__V-JAR-01": {
    "date": "2026-09-05",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-05 00:48:16",
        "lat": 2.299462,
        "lng": 99.929716,
        "speed": 8.0
      },
      {
        "time": "2026-09-05 00:48:36",
        "lat": 2.298986,
        "lng": 99.929769,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 00:49:16",
        "lat": 2.298905,
        "lng": 99.93184,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 00:49:56",
        "lat": 2.298938,
        "lng": 99.934,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 00:50:18",
        "lat": 2.298761,
        "lng": 99.934711,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 04:18:16",
        "lat": 2.298969,
        "lng": 99.934498,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 04:18:51",
        "lat": 2.298882,
        "lng": 99.932418,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 04:19:31",
        "lat": 2.299021,
        "lng": 99.928791,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 04:20:11",
        "lat": 2.29898,
        "lng": 99.925076,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 04:20:51",
        "lat": 2.298893,
        "lng": 99.921387,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 04:21:31",
        "lat": 2.298816,
        "lng": 99.917609,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 04:22:01",
        "lat": 2.298387,
        "lng": 99.915511,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 04:22:41",
        "lat": 2.294809,
        "lng": 99.915058,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 04:23:21",
        "lat": 2.291329,
        "lng": 99.914764,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 04:24:10",
        "lat": 2.289529,
        "lng": 99.915813,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 05:20:43",
        "lat": 2.291053,
        "lng": 99.91488,
        "speed": 38.0
      },
      {
        "time": "2026-09-05 05:21:23",
        "lat": 2.294672,
        "lng": 99.912729,
        "speed": 42.0
      },
      {
        "time": "2026-09-05 05:22:03",
        "lat": 2.298408,
        "lng": 99.91048,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 05:22:28",
        "lat": 2.29874,
        "lng": 99.909396,
        "speed": 16.0
      },
      {
        "time": "2026-09-05 06:31:45",
        "lat": 2.298611,
        "lng": 99.909458,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 06:32:25",
        "lat": 2.298724,
        "lng": 99.911618,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 06:33:05",
        "lat": 2.298767,
        "lng": 99.914142,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 06:34:05",
        "lat": 2.298792,
        "lng": 99.916027,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 06:34:45",
        "lat": 2.298846,
        "lng": 99.91856,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 06:35:25",
        "lat": 2.298895,
        "lng": 99.920933,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 06:36:05",
        "lat": 2.298953,
        "lng": 99.923458,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 06:36:45",
        "lat": 2.298993,
        "lng": 99.925911,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 06:37:25",
        "lat": 2.299029,
        "lng": 99.928418,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 06:38:05",
        "lat": 2.298918,
        "lng": 99.930924,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 06:38:45",
        "lat": 2.298846,
        "lng": 99.933138,
        "speed": 16.0
      },
      {
        "time": "2026-09-05 06:40:35",
        "lat": 2.298552,
        "lng": 99.933467,
        "speed": 7.0
      },
      {
        "time": "2026-09-05 06:41:05",
        "lat": 2.298908,
        "lng": 99.934071,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 06:41:45",
        "lat": 2.299044,
        "lng": 99.936507,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 06:42:25",
        "lat": 2.299162,
        "lng": 99.938898,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 06:42:55",
        "lat": 2.300541,
        "lng": 99.938951,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 06:43:35",
        "lat": 2.303123,
        "lng": 99.938862,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 06:44:15",
        "lat": 2.305806,
        "lng": 99.938818,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 07:35:38",
        "lat": 2.306558,
        "lng": 99.938809,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 07:37:37",
        "lat": 2.306782,
        "lng": 99.938933,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 07:38:18",
        "lat": 2.306708,
        "lng": 99.939973,
        "speed": 7.0
      },
      {
        "time": "2026-09-05 07:39:08",
        "lat": 2.306643,
        "lng": 99.941422,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 07:39:28",
        "lat": 2.306543,
        "lng": 99.941911,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 07:40:08",
        "lat": 2.306587,
        "lng": 99.943102,
        "speed": 10.0
      },
      {
        "time": "2026-09-05 07:40:58",
        "lat": 2.306526,
        "lng": 99.944062,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 07:41:38",
        "lat": 2.30658,
        "lng": 99.945458,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 07:42:48",
        "lat": 2.306512,
        "lng": 99.946764,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 07:46:11",
        "lat": 2.306495,
        "lng": 99.947591,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 07:47:02",
        "lat": 2.304002,
        "lng": 99.947742,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 07:47:42",
        "lat": 2.300964,
        "lng": 99.947964,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 07:48:12",
        "lat": 2.299653,
        "lng": 99.948569,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 07:48:52",
        "lat": 2.299756,
        "lng": 99.95176,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 07:49:32",
        "lat": 2.299818,
        "lng": 99.955164,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 07:50:12",
        "lat": 2.299873,
        "lng": 99.958498,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 07:50:52",
        "lat": 2.299928,
        "lng": 99.961982,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 07:51:32",
        "lat": 2.299999,
        "lng": 99.965564,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 07:52:07",
        "lat": 2.299949,
        "lng": 99.968133,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 07:52:32",
        "lat": 2.29959,
        "lng": 99.968702,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 09:18:26",
        "lat": 2.299674,
        "lng": 99.968418,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 09:18:46",
        "lat": 2.30003,
        "lng": 99.967991,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 09:19:26",
        "lat": 2.300011,
        "lng": 99.965591,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 09:20:06",
        "lat": 2.299954,
        "lng": 99.962693,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 09:20:46",
        "lat": 2.299899,
        "lng": 99.959644,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 09:21:26",
        "lat": 2.29984,
        "lng": 99.956658,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 09:22:06",
        "lat": 2.299792,
        "lng": 99.953831,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 09:22:46",
        "lat": 2.299747,
        "lng": 99.951058,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 09:23:26",
        "lat": 2.299628,
        "lng": 99.948418,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 09:24:06",
        "lat": 2.299499,
        "lng": 99.94632,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 09:24:46",
        "lat": 2.299394,
        "lng": 99.944089,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 09:25:26",
        "lat": 2.299293,
        "lng": 99.941778,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 09:26:01",
        "lat": 2.299193,
        "lng": 99.939956,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 09:28:48",
        "lat": 2.299137,
        "lng": 99.938933,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 09:29:28",
        "lat": 2.299026,
        "lng": 99.936276,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 09:30:08",
        "lat": 2.298906,
        "lng": 99.933884,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 09:30:38",
        "lat": 2.298856,
        "lng": 99.933004,
        "speed": 7.0
      },
      {
        "time": "2026-09-05 09:31:54",
        "lat": 2.298865,
        "lng": 99.933093,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 09:33:18",
        "lat": 2.298888,
        "lng": 99.933804,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 09:33:58",
        "lat": 2.299016,
        "lng": 99.93608,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 09:34:38",
        "lat": 2.299137,
        "lng": 99.939049,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 09:35:12",
        "lat": 2.299139,
        "lng": 99.941307,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 09:35:48",
        "lat": 2.296565,
        "lng": 99.941227,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 09:36:28",
        "lat": 2.293264,
        "lng": 99.941227,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 09:37:08",
        "lat": 2.290176,
        "lng": 99.941289,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 09:38:11",
        "lat": 2.289136,
        "lng": 99.941991,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 09:39:08",
        "lat": 2.28967,
        "lng": 99.941582,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 09:39:58",
        "lat": 2.291354,
        "lng": 99.941307,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 09:40:38",
        "lat": 2.295124,
        "lng": 99.941191,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 09:41:18",
        "lat": 2.298811,
        "lng": 99.941307,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 09:41:58",
        "lat": 2.299386,
        "lng": 99.943458,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 09:42:38",
        "lat": 2.299532,
        "lng": 99.946649,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 09:43:25",
        "lat": 2.29964,
        "lng": 99.948044,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 09:46:01",
        "lat": 2.301098,
        "lng": 99.947964,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 09:46:41",
        "lat": 2.304349,
        "lng": 99.947707,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 09:47:29",
        "lat": 2.306451,
        "lng": 99.947556,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 09:50:01",
        "lat": 2.306398,
        "lng": 99.946356,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 09:50:31",
        "lat": 2.306476,
        "lng": 99.945591,
        "speed": 8.0
      },
      {
        "time": "2026-09-05 09:51:01",
        "lat": 2.306607,
        "lng": 99.945804,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 09:51:41",
        "lat": 2.305364,
        "lng": 99.945573,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 09:52:21",
        "lat": 2.303718,
        "lng": 99.945573,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 09:53:01",
        "lat": 2.304772,
        "lng": 99.945556,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 09:53:51",
        "lat": 2.306602,
        "lng": 99.945689,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 09:54:31",
        "lat": 2.306523,
        "lng": 99.946578,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 09:55:11",
        "lat": 2.306557,
        "lng": 99.947467,
        "speed": 5.0
      },
      {
        "time": "2026-09-05 09:56:11",
        "lat": 2.306177,
        "lng": 99.947556,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 09:56:51",
        "lat": 2.303958,
        "lng": 99.947724,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 09:57:31",
        "lat": 2.301022,
        "lng": 99.947956,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 09:58:01",
        "lat": 2.299607,
        "lng": 99.947591,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 09:58:41",
        "lat": 2.299453,
        "lng": 99.944853,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 09:59:21",
        "lat": 2.299313,
        "lng": 99.941867,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 10:00:01",
        "lat": 2.299139,
        "lng": 99.938853,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 10:00:39",
        "lat": 2.29903,
        "lng": 99.938978,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 10:09:12",
        "lat": 2.299082,
        "lng": 99.937369,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 10:09:52",
        "lat": 2.298982,
        "lng": 99.934569,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 10:10:32",
        "lat": 2.298896,
        "lng": 99.932471,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 10:11:12",
        "lat": 2.299006,
        "lng": 99.929618,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 10:11:52",
        "lat": 2.299034,
        "lng": 99.927769,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 10:15:50",
        "lat": 2.298902,
        "lng": 99.926756,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 10:16:32",
        "lat": 2.29898,
        "lng": 99.925493,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 10:17:12",
        "lat": 2.298951,
        "lng": 99.923698,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 10:17:52",
        "lat": 2.298906,
        "lng": 99.921876,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 10:18:37",
        "lat": 2.298866,
        "lng": 99.920178,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 10:19:12",
        "lat": 2.298908,
        "lng": 99.921956,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 10:20:32",
        "lat": 2.298961,
        "lng": 99.923093,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 10:21:12",
        "lat": 2.298994,
        "lng": 99.924951,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 10:21:52",
        "lat": 2.298975,
        "lng": 99.926711,
        "speed": 10.0
      },
      {
        "time": "2026-09-05 10:34:08",
        "lat": 2.29903,
        "lng": 99.92696,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 10:34:46",
        "lat": 2.298872,
        "lng": 99.9296,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 10:35:18",
        "lat": 2.297589,
        "lng": 99.92944,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 10:35:58",
        "lat": 2.294878,
        "lng": 99.929067,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 10:36:38",
        "lat": 2.292377,
        "lng": 99.928738,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 10:37:18",
        "lat": 2.289661,
        "lng": 99.928382,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 10:38:00",
        "lat": 2.289738,
        "lng": 99.927573,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 10:43:28",
        "lat": 2.289744,
        "lng": 99.927067,
        "speed": 8.0
      },
      {
        "time": "2026-09-05 10:44:47",
        "lat": 2.29,
        "lng": 99.925538,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 10:45:28",
        "lat": 2.291573,
        "lng": 99.925778,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 10:46:08",
        "lat": 2.293731,
        "lng": 99.926053,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 10:47:18",
        "lat": 2.295688,
        "lng": 99.926356,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 10:47:58",
        "lat": 2.29793,
        "lng": 99.92664,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 10:55:14",
        "lat": 2.298657,
        "lng": 99.926729,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 10:55:46",
        "lat": 2.296866,
        "lng": 99.926498,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 10:56:26",
        "lat": 2.294431,
        "lng": 99.926107,
        "speed": 10.0
      },
      {
        "time": "2026-09-05 10:57:06",
        "lat": 2.292194,
        "lng": 99.925831,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 10:57:46",
        "lat": 2.29034,
        "lng": 99.92552,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 10:58:36",
        "lat": 2.290743,
        "lng": 99.925618,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 10:59:26",
        "lat": 2.293357,
        "lng": 99.926009,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 11:00:06",
        "lat": 2.295472,
        "lng": 99.926311,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 11:00:46",
        "lat": 2.297957,
        "lng": 99.92664,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 11:01:31",
        "lat": 2.298982,
        "lng": 99.926693,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 11:02:06",
        "lat": 2.298985,
        "lng": 99.925147,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 11:02:46",
        "lat": 2.298926,
        "lng": 99.922924,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 11:03:26",
        "lat": 2.299236,
        "lng": 99.922293,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 12:35:25",
        "lat": 2.299324,
        "lng": 99.922444,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 12:35:51",
        "lat": 2.298951,
        "lng": 99.922293,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 12:36:28",
        "lat": 2.298986,
        "lng": 99.924489,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 12:49:44",
        "lat": 2.299012,
        "lng": 99.925067,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 12:50:20",
        "lat": 2.298878,
        "lng": 99.926729,
        "speed": 3.0
      },
      {
        "time": "2026-09-05 13:05:45",
        "lat": 2.299029,
        "lng": 99.927404,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 13:06:25",
        "lat": 2.298988,
        "lng": 99.929716,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 13:07:05",
        "lat": 2.298907,
        "lng": 99.932373,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 13:07:45",
        "lat": 2.298992,
        "lng": 99.934471,
        "speed": 16.0
      },
      {
        "time": "2026-09-05 13:08:25",
        "lat": 2.299076,
        "lng": 99.937129,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 13:09:05",
        "lat": 2.298942,
        "lng": 99.938951,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 13:10:05",
        "lat": 2.29881,
        "lng": 99.939164,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 14:07:04",
        "lat": 2.299147,
        "lng": 99.938862,
        "speed": 16.0
      },
      {
        "time": "2026-09-05 14:07:44",
        "lat": 2.299042,
        "lng": 99.936364,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 14:08:24",
        "lat": 2.29894,
        "lng": 99.934053,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 14:09:04",
        "lat": 2.298899,
        "lng": 99.932276,
        "speed": 8.0
      },
      {
        "time": "2026-09-05 14:09:44",
        "lat": 2.298943,
        "lng": 99.93032,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 14:10:24",
        "lat": 2.299019,
        "lng": 99.928027,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 14:11:04",
        "lat": 2.299012,
        "lng": 99.925769,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 14:11:44",
        "lat": 2.298957,
        "lng": 99.923422,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 14:12:24",
        "lat": 2.298904,
        "lng": 99.921076,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 14:13:04",
        "lat": 2.298852,
        "lng": 99.918747,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 14:13:44",
        "lat": 2.298792,
        "lng": 99.916373,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 14:14:24",
        "lat": 2.298749,
        "lng": 99.913929,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 14:15:04",
        "lat": 2.298729,
        "lng": 99.911458,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 14:15:41",
        "lat": 2.298699,
        "lng": 99.909396,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 14:17:01",
        "lat": 2.298831,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 14:17:51",
        "lat": 2.298528,
        "lng": 99.910427,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 14:18:24",
        "lat": 2.29597,
        "lng": 99.911964,
        "speed": 40.0
      },
      {
        "time": "2026-09-05 14:19:04",
        "lat": 2.292666,
        "lng": 99.913964,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 14:19:44",
        "lat": 2.289687,
        "lng": 99.915707,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 14:39:26",
        "lat": 2.290036,
        "lng": 99.915511,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 14:39:56",
        "lat": 2.292041,
        "lng": 99.914684,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 14:40:36",
        "lat": 2.295904,
        "lng": 99.915218,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 14:41:11",
        "lat": 2.298793,
        "lng": 99.915742,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 14:41:46",
        "lat": 2.298841,
        "lng": 99.918773,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 14:42:26",
        "lat": 2.298918,
        "lng": 99.922329,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 14:43:06",
        "lat": 2.298999,
        "lng": 99.925911,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 14:43:36",
        "lat": 2.297773,
        "lng": 99.926587,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 14:44:16",
        "lat": 2.293902,
        "lng": 99.926044,
        "speed": 42.0
      },
      {
        "time": "2026-09-05 14:44:56",
        "lat": 2.290047,
        "lng": 99.925493,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 14:46:56",
        "lat": 2.289668,
        "lng": 99.925813,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 14:47:36",
        "lat": 2.289666,
        "lng": 99.926791,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 14:48:36",
        "lat": 2.289607,
        "lng": 99.927849,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 14:49:46",
        "lat": 2.291418,
        "lng": 99.928613,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 14:50:26",
        "lat": 2.294696,
        "lng": 99.929058,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 14:51:06",
        "lat": 2.297998,
        "lng": 99.929493,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 14:51:46",
        "lat": 2.300999,
        "lng": 99.929884,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 14:52:26",
        "lat": 2.304227,
        "lng": 99.93032,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 14:53:06",
        "lat": 2.307066,
        "lng": 99.930667,
        "speed": 7.0
      },
      {
        "time": "2026-09-05 14:54:06",
        "lat": 2.305785,
        "lng": 99.930489,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 14:54:46",
        "lat": 2.302448,
        "lng": 99.93008,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 14:55:26",
        "lat": 2.299101,
        "lng": 99.9296,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 14:55:56",
        "lat": 2.298922,
        "lng": 99.931653,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 14:56:26",
        "lat": 2.297708,
        "lng": 99.932347,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 14:57:06",
        "lat": 2.294289,
        "lng": 99.932196,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 14:57:46",
        "lat": 2.290762,
        "lng": 99.932133,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 14:58:36",
        "lat": 2.290508,
        "lng": 99.932133,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 14:59:16",
        "lat": 2.293949,
        "lng": 99.932213,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 14:59:56",
        "lat": 2.297312,
        "lng": 99.932329,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 15:00:26",
        "lat": 2.298839,
        "lng": 99.932604,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 15:01:06",
        "lat": 2.299002,
        "lng": 99.935093,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 15:01:46",
        "lat": 2.299126,
        "lng": 99.938302,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 15:02:16",
        "lat": 2.298592,
        "lng": 99.938951,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 15:03:06",
        "lat": 2.298924,
        "lng": 99.938969,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 15:03:46",
        "lat": 2.299327,
        "lng": 99.938969,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 15:04:26",
        "lat": 2.302777,
        "lng": 99.938862,
        "speed": 40.0
      },
      {
        "time": "2026-09-05 15:05:06",
        "lat": 2.306549,
        "lng": 99.938791,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 15:05:46",
        "lat": 2.306874,
        "lng": 99.937858,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 15:06:36",
        "lat": 2.305537,
        "lng": 99.936871,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 15:07:16",
        "lat": 2.302179,
        "lng": 99.9368,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 15:07:54",
        "lat": 2.299084,
        "lng": 99.936684,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 15:08:26",
        "lat": 2.298998,
        "lng": 99.934356,
        "speed": 16.0
      },
      {
        "time": "2026-09-05 15:09:06",
        "lat": 2.298902,
        "lng": 99.931804,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 15:09:36",
        "lat": 2.298717,
        "lng": 99.929591,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 15:10:16",
        "lat": 2.295044,
        "lng": 99.929102,
        "speed": 40.0
      },
      {
        "time": "2026-09-05 15:10:56",
        "lat": 2.290909,
        "lng": 99.928551,
        "speed": 42.0
      },
      {
        "time": "2026-09-05 15:11:31",
        "lat": 2.289558,
        "lng": 99.927849,
        "speed": 10.0
      },
      {
        "time": "2026-09-05 15:28:38",
        "lat": 2.289311,
        "lng": 99.927876,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 15:30:38",
        "lat": 2.28957,
        "lng": 99.928009,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 15:31:08",
        "lat": 2.290954,
        "lng": 99.928551,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 15:31:48",
        "lat": 2.295899,
        "lng": 99.929218,
        "speed": 47.0
      },
      {
        "time": "2026-09-05 15:32:23",
        "lat": 2.299012,
        "lng": 99.929493,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 15:32:58",
        "lat": 2.299014,
        "lng": 99.926258,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 15:33:38",
        "lat": 2.298913,
        "lng": 99.921849,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 15:34:18",
        "lat": 2.298885,
        "lng": 99.919707,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 15:34:58",
        "lat": 2.298819,
        "lng": 99.916907,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 15:35:38",
        "lat": 2.298751,
        "lng": 99.913431,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 15:36:08",
        "lat": 2.300448,
        "lng": 99.913556,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 15:36:48",
        "lat": 2.303878,
        "lng": 99.914204,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 15:37:26",
        "lat": 2.307136,
        "lng": 99.914631,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 15:37:57",
        "lat": 2.307141,
        "lng": 99.912569,
        "speed": 8.0
      },
      {
        "time": "2026-09-05 16:16:50",
        "lat": 2.307153,
        "lng": 99.912711,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 16:17:22",
        "lat": 2.307022,
        "lng": 99.914711,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 16:17:55",
        "lat": 2.304353,
        "lng": 99.914276,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 16:18:35",
        "lat": 2.300559,
        "lng": 99.913556,
        "speed": 38.0
      },
      {
        "time": "2026-09-05 16:19:15",
        "lat": 2.297447,
        "lng": 99.913084,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 16:19:55",
        "lat": 2.295028,
        "lng": 99.912711,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 16:20:25",
        "lat": 2.293052,
        "lng": 99.913716,
        "speed": 38.0
      },
      {
        "time": "2026-09-05 16:21:05",
        "lat": 2.289918,
        "lng": 99.915556,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 16:21:41",
        "lat": 2.289544,
        "lng": 99.915804,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 16:54:11",
        "lat": 2.290626,
        "lng": 99.915156,
        "speed": 40.0
      },
      {
        "time": "2026-09-05 16:54:41",
        "lat": 2.293319,
        "lng": 99.91488,
        "speed": 39.0
      },
      {
        "time": "2026-09-05 16:55:21",
        "lat": 2.297146,
        "lng": 99.915369,
        "speed": 38.0
      },
      {
        "time": "2026-09-05 16:55:51",
        "lat": 2.298746,
        "lng": 99.914951,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 16:56:11",
        "lat": 2.298795,
        "lng": 99.913244,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 16:56:41",
        "lat": 2.301098,
        "lng": 99.913689,
        "speed": 38.0
      },
      {
        "time": "2026-09-05 16:57:21",
        "lat": 2.305184,
        "lng": 99.914418,
        "speed": 42.0
      },
      {
        "time": "2026-09-05 16:57:51",
        "lat": 2.307154,
        "lng": 99.913982,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 16:58:47",
        "lat": 2.307152,
        "lng": 99.912551,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 17:44:38",
        "lat": 2.307143,
        "lng": 99.910969,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 17:51:53",
        "lat": 2.307114,
        "lng": 99.909867,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 17:52:41",
        "lat": 2.307135,
        "lng": 99.912516,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 19:43:50",
        "lat": 2.306499,
        "lng": 99.914622,
        "speed": 47.0
      },
      {
        "time": "2026-09-05 19:44:30",
        "lat": 2.301695,
        "lng": 99.913787,
        "speed": 47.0
      },
      {
        "time": "2026-09-05 19:45:04",
        "lat": 2.29874,
        "lng": 99.913378,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 19:45:40",
        "lat": 2.298824,
        "lng": 99.917938,
        "speed": 59.0
      },
      {
        "time": "2026-09-05 19:46:24",
        "lat": 2.298889,
        "lng": 99.921778,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 19:47:00",
        "lat": 2.298855,
        "lng": 99.919689,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 19:47:40",
        "lat": 2.298775,
        "lng": 99.916507,
        "speed": 49.0
      },
      {
        "time": "2026-09-05 19:48:14",
        "lat": 2.298854,
        "lng": 99.913262,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 19:48:50",
        "lat": 2.302632,
        "lng": 99.913991,
        "speed": 48.0
      },
      {
        "time": "2026-09-05 19:49:30",
        "lat": 2.307125,
        "lng": 99.914596,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 19:50:18",
        "lat": 2.307129,
        "lng": 99.912533,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 21:18:51",
        "lat": 2.30714,
        "lng": 99.912533,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 21:19:29",
        "lat": 2.30714,
        "lng": 99.910373,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 21:20:09",
        "lat": 2.304378,
        "lng": 99.909458,
        "speed": 41.0
      },
      {
        "time": "2026-09-05 21:20:48",
        "lat": 2.30049,
        "lng": 99.909182,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 21:21:10",
        "lat": 2.299155,
        "lng": 99.909467,
        "speed": 7.0
      },
      {
        "time": "2026-09-05 21:29:27",
        "lat": 2.300057,
        "lng": 99.909458,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 21:30:02",
        "lat": 2.302462,
        "lng": 99.909227,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 21:30:42",
        "lat": 2.305527,
        "lng": 99.909618,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 21:31:22",
        "lat": 2.307092,
        "lng": 99.909813,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 21:37:35",
        "lat": 2.307126,
        "lng": 99.911778,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 21:56:11",
        "lat": 2.307117,
        "lng": 99.91248,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 21:57:02",
        "lat": 2.307137,
        "lng": 99.912338,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 21:57:38",
        "lat": 2.307152,
        "lng": 99.910124,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 21:58:08",
        "lat": 2.305479,
        "lng": 99.9096,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 21:58:48",
        "lat": 2.302342,
        "lng": 99.909191,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 21:59:23",
        "lat": 2.299797,
        "lng": 99.909467,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 22:00:30",
        "lat": 2.2988,
        "lng": 99.909324,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 22:05:04",
        "lat": 2.299278,
        "lng": 99.90944,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 22:05:33",
        "lat": 2.301035,
        "lng": 99.909022,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 22:06:04",
        "lat": 2.303298,
        "lng": 99.909307,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 22:06:44",
        "lat": 2.306301,
        "lng": 99.909716,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 22:09:09",
        "lat": 2.307137,
        "lng": 99.909796,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 22:49:24",
        "lat": 2.307151,
        "lng": 99.910169,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 22:50:04",
        "lat": 2.307136,
        "lng": 99.9124,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 22:50:44",
        "lat": 2.307157,
        "lng": 99.914533,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 22:51:14",
        "lat": 2.30591,
        "lng": 99.914524,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 22:51:54",
        "lat": 2.304101,
        "lng": 99.914204,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 22:52:34",
        "lat": 2.302287,
        "lng": 99.91392,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 22:53:14",
        "lat": 2.300454,
        "lng": 99.913547,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 22:53:54",
        "lat": 2.298828,
        "lng": 99.913262,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 22:54:24",
        "lat": 2.298764,
        "lng": 99.914356,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 22:55:04",
        "lat": 2.298784,
        "lng": 99.916302,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 22:55:44",
        "lat": 2.298832,
        "lng": 99.918329,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 22:56:24",
        "lat": 2.298874,
        "lng": 99.920151,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 22:57:04",
        "lat": 2.298905,
        "lng": 99.921876,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 22:57:44",
        "lat": 2.298949,
        "lng": 99.923698,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 22:58:24",
        "lat": 2.298978,
        "lng": 99.925502,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 22:59:04",
        "lat": 2.299014,
        "lng": 99.927342,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 22:59:44",
        "lat": 2.299022,
        "lng": 99.929111,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 23:46:55",
        "lat": 2.299468,
        "lng": 99.929733,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 23:47:25",
        "lat": 2.299472,
        "lng": 99.929733,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 23:47:50",
        "lat": 2.298982,
        "lng": 99.929769,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 23:48:30",
        "lat": 2.2989,
        "lng": 99.932133,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 23:49:00",
        "lat": 2.298687,
        "lng": 99.933218,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 23:49:54",
        "lat": 2.298889,
        "lng": 99.933369,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 23:50:30",
        "lat": 2.299006,
        "lng": 99.935271,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 23:51:10",
        "lat": 2.299107,
        "lng": 99.937662,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 23:51:55",
        "lat": 2.29905,
        "lng": 99.938978,
        "speed": 0.0
      }
    ]
  },
  "2026-09-06__V-JAR-01": {
    "date": "2026-09-06",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-06 04:33:02",
        "lat": 2.299139,
        "lng": 99.939164,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 04:33:22",
        "lat": 2.299085,
        "lng": 99.937902,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 04:33:52",
        "lat": 2.298968,
        "lng": 99.935689,
        "speed": 31.0
      },
      {
        "time": "2026-09-06 04:34:22",
        "lat": 2.298893,
        "lng": 99.933689,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 04:35:06",
        "lat": 2.298808,
        "lng": 99.932862,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 04:43:04",
        "lat": 2.298875,
        "lng": 99.932018,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 04:43:34",
        "lat": 2.29895,
        "lng": 99.930027,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 04:44:04",
        "lat": 2.299012,
        "lng": 99.927876,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 04:44:34",
        "lat": 2.298988,
        "lng": 99.925813,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 04:45:04",
        "lat": 2.298955,
        "lng": 99.923831,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 04:45:34",
        "lat": 2.298894,
        "lng": 99.921733,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 04:46:04",
        "lat": 2.298859,
        "lng": 99.919582,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 04:46:34",
        "lat": 2.298802,
        "lng": 99.917307,
        "speed": 31.0
      },
      {
        "time": "2026-09-06 04:47:04",
        "lat": 2.298748,
        "lng": 99.914969,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 04:47:31",
        "lat": 2.298849,
        "lng": 99.913244,
        "speed": 18.0
      },
      {
        "time": "2026-09-06 04:47:54",
        "lat": 2.300546,
        "lng": 99.913556,
        "speed": 36.0
      },
      {
        "time": "2026-09-06 04:48:24",
        "lat": 2.303248,
        "lng": 99.914089,
        "speed": 38.0
      },
      {
        "time": "2026-09-06 04:48:54",
        "lat": 2.305624,
        "lng": 99.914507,
        "speed": 35.0
      },
      {
        "time": "2026-09-06 04:49:24",
        "lat": 2.307139,
        "lng": 99.913804,
        "speed": 35.0
      },
      {
        "time": "2026-09-06 04:49:54",
        "lat": 2.307143,
        "lng": 99.9112,
        "speed": 33.0
      },
      {
        "time": "2026-09-06 04:50:33",
        "lat": 2.307114,
        "lng": 99.909813,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 05:44:26",
        "lat": 2.306231,
        "lng": 99.909716,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 05:44:56",
        "lat": 2.304559,
        "lng": 99.909467,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 05:45:26",
        "lat": 2.302881,
        "lng": 99.909262,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 05:45:56",
        "lat": 2.301083,
        "lng": 99.909022,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 05:46:26",
        "lat": 2.299403,
        "lng": 99.909467,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 05:47:04",
        "lat": 2.29881,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 12:47:48",
        "lat": 2.29881,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 14:07:04",
        "lat": 2.298948,
        "lng": 99.90944,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 14:07:34",
        "lat": 2.300053,
        "lng": 99.909618,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 14:07:54",
        "lat": 2.300553,
        "lng": 99.910356,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 14:21:00",
        "lat": 2.300696,
        "lng": 99.910329,
        "speed": 10.0
      },
      {
        "time": "2026-09-06 14:21:30",
        "lat": 2.300039,
        "lng": 99.909556,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 14:22:06",
        "lat": 2.298754,
        "lng": 99.909396,
        "speed": 5.0
      },
      {
        "time": "2026-09-06 15:07:12",
        "lat": 2.298626,
        "lng": 99.909582,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 15:07:42",
        "lat": 2.298729,
        "lng": 99.911867,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 15:08:12",
        "lat": 2.298777,
        "lng": 99.91424,
        "speed": 38.0
      },
      {
        "time": "2026-09-06 15:08:42",
        "lat": 2.298837,
        "lng": 99.917307,
        "speed": 38.0
      },
      {
        "time": "2026-09-06 15:09:12",
        "lat": 2.298867,
        "lng": 99.920382,
        "speed": 43.0
      },
      {
        "time": "2026-09-06 15:09:42",
        "lat": 2.298961,
        "lng": 99.923858,
        "speed": 44.0
      },
      {
        "time": "2026-09-06 15:10:12",
        "lat": 2.299024,
        "lng": 99.92728,
        "speed": 46.0
      },
      {
        "time": "2026-09-06 15:10:42",
        "lat": 2.298953,
        "lng": 99.930693,
        "speed": 45.0
      },
      {
        "time": "2026-09-06 15:11:12",
        "lat": 2.298861,
        "lng": 99.933004,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 15:38:52",
        "lat": 2.298761,
        "lng": 99.93304,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 16:20:50",
        "lat": 2.298823,
        "lng": 99.932569,
        "speed": 18.0
      },
      {
        "time": "2026-09-06 16:21:20",
        "lat": 2.298896,
        "lng": 99.930676,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 16:21:50",
        "lat": 2.299007,
        "lng": 99.928178,
        "speed": 35.0
      },
      {
        "time": "2026-09-06 16:22:20",
        "lat": 2.298963,
        "lng": 99.925564,
        "speed": 33.0
      },
      {
        "time": "2026-09-06 16:22:50",
        "lat": 2.298914,
        "lng": 99.923129,
        "speed": 33.0
      },
      {
        "time": "2026-09-06 16:23:20",
        "lat": 2.298854,
        "lng": 99.920444,
        "speed": 36.0
      },
      {
        "time": "2026-09-06 16:23:50",
        "lat": 2.298808,
        "lng": 99.917804,
        "speed": 34.0
      },
      {
        "time": "2026-09-06 16:24:20",
        "lat": 2.29874,
        "lng": 99.915067,
        "speed": 37.0
      },
      {
        "time": "2026-09-06 16:24:50",
        "lat": 2.298699,
        "lng": 99.912356,
        "speed": 34.0
      },
      {
        "time": "2026-09-06 16:25:42",
        "lat": 2.298736,
        "lng": 99.911067,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 16:26:00",
        "lat": 2.298701,
        "lng": 99.910916,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 16:26:16",
        "lat": 2.298587,
        "lng": 99.909733,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 16:26:30",
        "lat": 2.298834,
        "lng": 99.909324,
        "speed": 7.0
      },
      {
        "time": "2026-09-06 19:47:59",
        "lat": 2.298747,
        "lng": 99.909378,
        "speed": 7.0
      },
      {
        "time": "2026-09-06 19:48:19",
        "lat": 2.298619,
        "lng": 99.909929,
        "speed": 17.0
      },
      {
        "time": "2026-09-06 19:48:49",
        "lat": 2.298732,
        "lng": 99.911591,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 19:49:19",
        "lat": 2.298748,
        "lng": 99.913316,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 19:49:49",
        "lat": 2.298775,
        "lng": 99.915067,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 19:50:19",
        "lat": 2.298812,
        "lng": 99.916889,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:50:49",
        "lat": 2.298858,
        "lng": 99.9188,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:51:19",
        "lat": 2.298893,
        "lng": 99.920658,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 19:51:49",
        "lat": 2.298941,
        "lng": 99.922436,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 19:52:19",
        "lat": 2.298998,
        "lng": 99.924267,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 19:52:49",
        "lat": 2.299019,
        "lng": 99.926187,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:53:19",
        "lat": 2.299053,
        "lng": 99.928027,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 19:53:49",
        "lat": 2.299001,
        "lng": 99.929769,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 19:54:19",
        "lat": 2.298917,
        "lng": 99.931538,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:54:49",
        "lat": 2.298881,
        "lng": 99.933058,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 19:55:19",
        "lat": 2.298978,
        "lng": 99.934489,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 19:55:49",
        "lat": 2.299049,
        "lng": 99.936178,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 19:56:19",
        "lat": 2.299138,
        "lng": 99.938116,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:56:49",
        "lat": 2.299226,
        "lng": 99.940071,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 19:57:19",
        "lat": 2.299327,
        "lng": 99.941964,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 19:57:49",
        "lat": 2.299389,
        "lng": 99.943893,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 19:58:19",
        "lat": 2.299493,
        "lng": 99.945849,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:58:49",
        "lat": 2.299584,
        "lng": 99.947689,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 19:59:19",
        "lat": 2.299704,
        "lng": 99.949573,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 19:59:46",
        "lat": 2.299962,
        "lng": 99.950827,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 20:00:09",
        "lat": 2.301277,
        "lng": 99.950916,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:00:39",
        "lat": 2.303239,
        "lng": 99.951156,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:01:09",
        "lat": 2.305211,
        "lng": 99.951289,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:01:39",
        "lat": 2.306372,
        "lng": 99.952036,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:02:09",
        "lat": 2.306295,
        "lng": 99.954036,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:02:29",
        "lat": 2.306397,
        "lng": 99.955076,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 20:02:59",
        "lat": 2.308269,
        "lng": 99.955013,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:03:19",
        "lat": 2.308899,
        "lng": 99.955538,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:03:49",
        "lat": 2.309531,
        "lng": 99.956364,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 20:04:19",
        "lat": 2.311525,
        "lng": 99.956347,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:04:49",
        "lat": 2.313751,
        "lng": 99.956311,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 20:05:19",
        "lat": 2.315963,
        "lng": 99.956284,
        "speed": 29.0
      },
      {
        "time": "2026-09-06 20:05:49",
        "lat": 2.318218,
        "lng": 99.956249,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 20:06:19",
        "lat": 2.320329,
        "lng": 99.956231,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:06:49",
        "lat": 2.322403,
        "lng": 99.956196,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 20:07:19",
        "lat": 2.324409,
        "lng": 99.956169,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:07:48",
        "lat": 2.326066,
        "lng": 99.956098,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 20:08:09",
        "lat": 2.326118,
        "lng": 99.955369,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 20:08:57",
        "lat": 2.326066,
        "lng": 99.954418,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 20:09:19",
        "lat": 2.326117,
        "lng": 99.955209,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 20:09:44",
        "lat": 2.326059,
        "lng": 99.956098,
        "speed": 7.0
      },
      {
        "time": "2026-09-06 20:32:34",
        "lat": 2.325917,
        "lng": 99.956151,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 20:33:00",
        "lat": 2.324597,
        "lng": 99.956151,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:33:30",
        "lat": 2.322702,
        "lng": 99.956187,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:34:00",
        "lat": 2.32071,
        "lng": 99.956213,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:34:30",
        "lat": 2.319012,
        "lng": 99.956284,
        "speed": 10.0
      },
      {
        "time": "2026-09-06 20:34:50",
        "lat": 2.319024,
        "lng": 99.957209,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:35:20",
        "lat": 2.319056,
        "lng": 99.959013,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:35:50",
        "lat": 2.319081,
        "lng": 99.961022,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:36:20",
        "lat": 2.319124,
        "lng": 99.963067,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:36:50",
        "lat": 2.319156,
        "lng": 99.965156,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:37:20",
        "lat": 2.319189,
        "lng": 99.967271,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 20:37:50",
        "lat": 2.319225,
        "lng": 99.969271,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:38:20",
        "lat": 2.319262,
        "lng": 99.971093,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:38:50",
        "lat": 2.319296,
        "lng": 99.973076,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:39:20",
        "lat": 2.319318,
        "lng": 99.974924,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:39:50",
        "lat": 2.319363,
        "lng": 99.976773,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:40:20",
        "lat": 2.319384,
        "lng": 99.978676,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:40:50",
        "lat": 2.319418,
        "lng": 99.980587,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:41:20",
        "lat": 2.319454,
        "lng": 99.982551,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:41:50",
        "lat": 2.319446,
        "lng": 99.984302,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 20:42:10",
        "lat": 2.318423,
        "lng": 99.984302,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:42:40",
        "lat": 2.316721,
        "lng": 99.984302,
        "speed": 11.0
      },
      {
        "time": "2026-09-06 20:43:10",
        "lat": 2.315372,
        "lng": 99.984302,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:43:40",
        "lat": 2.313491,
        "lng": 99.984293,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:44:10",
        "lat": 2.311627,
        "lng": 99.984276,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:44:40",
        "lat": 2.309833,
        "lng": 99.984293,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:45:00",
        "lat": 2.309113,
        "lng": 99.983982,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 20:45:30",
        "lat": 2.309069,
        "lng": 99.982098,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:46:00",
        "lat": 2.309045,
        "lng": 99.98016,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 20:46:30",
        "lat": 2.309029,
        "lng": 99.978471,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:47:00",
        "lat": 2.308994,
        "lng": 99.976596,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 20:47:30",
        "lat": 2.308988,
        "lng": 99.97472,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:48:00",
        "lat": 2.30897,
        "lng": 99.972738,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:48:30",
        "lat": 2.308956,
        "lng": 99.970996,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 20:49:00",
        "lat": 2.308944,
        "lng": 99.969067,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:49:30",
        "lat": 2.308929,
        "lng": 99.967156,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:50:00",
        "lat": 2.308903,
        "lng": 99.965102,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:50:30",
        "lat": 2.308903,
        "lng": 99.96304,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:51:00",
        "lat": 2.308888,
        "lng": 99.96104,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:51:30",
        "lat": 2.308889,
        "lng": 99.958987,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:52:00",
        "lat": 2.308899,
        "lng": 99.957111,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:52:20",
        "lat": 2.308458,
        "lng": 99.9564,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:52:50",
        "lat": 2.3064,
        "lng": 99.956409,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 20:53:20",
        "lat": 2.304266,
        "lng": 99.956427,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 20:53:50",
        "lat": 2.302108,
        "lng": 99.956462,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:54:20",
        "lat": 2.300038,
        "lng": 99.956471,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 20:54:40",
        "lat": 2.29983,
        "lng": 99.955653,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:55:10",
        "lat": 2.299787,
        "lng": 99.953884,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:55:40",
        "lat": 2.299756,
        "lng": 99.952,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:56:10",
        "lat": 2.299754,
        "lng": 99.950169,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:56:40",
        "lat": 2.299627,
        "lng": 99.948391,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 20:57:00",
        "lat": 2.300177,
        "lng": 99.948027,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 20:57:30",
        "lat": 2.302098,
        "lng": 99.947902,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:58:00",
        "lat": 2.304123,
        "lng": 99.947751,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:58:30",
        "lat": 2.305995,
        "lng": 99.947609,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 20:59:10",
        "lat": 2.305526,
        "lng": 99.947627,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 20:59:40",
        "lat": 2.303803,
        "lng": 99.947751,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 21:00:10",
        "lat": 2.301927,
        "lng": 99.947884,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:00:40",
        "lat": 2.299969,
        "lng": 99.948044,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 21:01:00",
        "lat": 2.299582,
        "lng": 99.947511,
        "speed": 18.0
      },
      {
        "time": "2026-09-06 21:01:30",
        "lat": 2.299508,
        "lng": 99.945902,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:02:00",
        "lat": 2.299419,
        "lng": 99.944133,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 21:02:30",
        "lat": 2.299347,
        "lng": 99.942311,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:03:00",
        "lat": 2.299242,
        "lng": 99.940462,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 21:03:30",
        "lat": 2.299134,
        "lng": 99.938578,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 21:04:00",
        "lat": 2.299051,
        "lng": 99.936738,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 21:04:30",
        "lat": 2.298978,
        "lng": 99.934844,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:05:00",
        "lat": 2.298887,
        "lng": 99.933378,
        "speed": 13.0
      },
      {
        "time": "2026-09-06 21:05:30",
        "lat": 2.298876,
        "lng": 99.931911,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 21:06:00",
        "lat": 2.29896,
        "lng": 99.930018,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 21:06:30",
        "lat": 2.299016,
        "lng": 99.928178,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 21:07:00",
        "lat": 2.298982,
        "lng": 99.926427,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:07:30",
        "lat": 2.298969,
        "lng": 99.924658,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 21:08:00",
        "lat": 2.298938,
        "lng": 99.922898,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:08:30",
        "lat": 2.298886,
        "lng": 99.920987,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 21:09:00",
        "lat": 2.298837,
        "lng": 99.919147,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 21:09:30",
        "lat": 2.298798,
        "lng": 99.917218,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 21:10:00",
        "lat": 2.298758,
        "lng": 99.915316,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:10:30",
        "lat": 2.298733,
        "lng": 99.913413,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 21:11:00",
        "lat": 2.298716,
        "lng": 99.91152,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 21:11:30",
        "lat": 2.298604,
        "lng": 99.909618,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 21:12:38",
        "lat": 2.298831,
        "lng": 99.909378,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 22:13:43",
        "lat": 2.298571,
        "lng": 99.908853,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 22:14:03",
        "lat": 2.297694,
        "lng": 99.908596,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 22:14:33",
        "lat": 2.295967,
        "lng": 99.908364,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:15:03",
        "lat": 2.29423,
        "lng": 99.90816,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 22:16:03",
        "lat": 2.292356,
        "lng": 99.907911,
        "speed": 13.0
      },
      {
        "time": "2026-09-06 22:16:23",
        "lat": 2.292146,
        "lng": 99.907858,
        "speed": 18.0
      },
      {
        "time": "2026-09-06 22:16:53",
        "lat": 2.293897,
        "lng": 99.908133,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:17:23",
        "lat": 2.296061,
        "lng": 99.908382,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 22:17:53",
        "lat": 2.298188,
        "lng": 99.908676,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:18:13",
        "lat": 2.298569,
        "lng": 99.909458,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:18:43",
        "lat": 2.298694,
        "lng": 99.911404,
        "speed": 29.0
      },
      {
        "time": "2026-09-06 22:19:13",
        "lat": 2.298717,
        "lng": 99.913733,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 22:19:43",
        "lat": 2.298769,
        "lng": 99.916018,
        "speed": 31.0
      },
      {
        "time": "2026-09-06 22:20:13",
        "lat": 2.298817,
        "lng": 99.918311,
        "speed": 31.0
      },
      {
        "time": "2026-09-06 22:20:43",
        "lat": 2.298868,
        "lng": 99.920604,
        "speed": 31.0
      },
      {
        "time": "2026-09-06 22:21:13",
        "lat": 2.298929,
        "lng": 99.922924,
        "speed": 32.0
      },
      {
        "time": "2026-09-06 22:21:43",
        "lat": 2.298973,
        "lng": 99.92528,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 22:22:13",
        "lat": 2.298987,
        "lng": 99.927573,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 22:22:43",
        "lat": 2.298938,
        "lng": 99.92976,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 22:23:13",
        "lat": 2.298864,
        "lng": 99.932,
        "speed": 34.0
      },
      {
        "time": "2026-09-06 22:23:37",
        "lat": 2.298684,
        "lng": 99.933218,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 22:23:49",
        "lat": 2.298492,
        "lng": 99.933396,
        "speed": 3.0
      },
      {
        "time": "2026-09-06 22:24:53",
        "lat": 2.298622,
        "lng": 99.933431,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 22:25:23",
        "lat": 2.298916,
        "lng": 99.934391,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 22:25:53",
        "lat": 2.299008,
        "lng": 99.936053,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:26:23",
        "lat": 2.299083,
        "lng": 99.938,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 22:26:43",
        "lat": 2.299325,
        "lng": 99.938933,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 22:27:13",
        "lat": 2.300834,
        "lng": 99.938898,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 22:27:43",
        "lat": 2.302873,
        "lng": 99.938862,
        "speed": 29.0
      },
      {
        "time": "2026-09-06 22:28:13",
        "lat": 2.304979,
        "lng": 99.938809,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 22:28:43",
        "lat": 2.306787,
        "lng": 99.938764,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 22:31:29",
        "lat": 2.306722,
        "lng": 99.938791,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 22:31:53",
        "lat": 2.305619,
        "lng": 99.938809,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 22:32:13",
        "lat": 2.304486,
        "lng": 99.938836,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 22:32:43",
        "lat": 2.30245,
        "lng": 99.93888,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:32:58",
        "lat": 2.301443,
        "lng": 99.938916,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 22:33:23",
        "lat": 2.299701,
        "lng": 99.938951,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 22:33:43",
        "lat": 2.299199,
        "lng": 99.939467,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 22:34:13",
        "lat": 2.299256,
        "lng": 99.941324,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:34:43",
        "lat": 2.299366,
        "lng": 99.943378,
        "speed": 29.0
      },
      {
        "time": "2026-09-06 22:35:13",
        "lat": 2.299461,
        "lng": 99.945476,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 22:35:25",
        "lat": 2.299895,
        "lng": 99.945591,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 22:35:53",
        "lat": 2.301653,
        "lng": 99.945573,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:36:23",
        "lat": 2.303241,
        "lng": 99.945556,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 22:36:53",
        "lat": 2.305441,
        "lng": 99.945538,
        "speed": 29.0
      },
      {
        "time": "2026-09-06 22:37:19",
        "lat": 2.306571,
        "lng": 99.945769,
        "speed": 14.0
      },
      {
        "time": "2026-09-06 22:37:30",
        "lat": 2.306536,
        "lng": 99.945911,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 22:38:03",
        "lat": 2.306516,
        "lng": 99.946676,
        "speed": 11.0
      },
      {
        "time": "2026-09-06 22:38:23",
        "lat": 2.306517,
        "lng": 99.947351,
        "speed": 9.0
      },
      {
        "time": "2026-09-06 22:38:43",
        "lat": 2.30639,
        "lng": 99.947467,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 22:39:13",
        "lat": 2.304861,
        "lng": 99.947653,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 22:39:43",
        "lat": 2.302948,
        "lng": 99.947796,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:40:13",
        "lat": 2.300981,
        "lng": 99.947956,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 22:40:39",
        "lat": 2.299619,
        "lng": 99.947929,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 22:41:03",
        "lat": 2.299537,
        "lng": 99.946809,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 22:41:33",
        "lat": 2.299463,
        "lng": 99.945102,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:42:03",
        "lat": 2.299382,
        "lng": 99.943378,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:42:33",
        "lat": 2.299292,
        "lng": 99.941609,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:42:41",
        "lat": 2.299155,
        "lng": 99.941324,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 22:43:03",
        "lat": 2.298041,
        "lng": 99.94128,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:43:33",
        "lat": 2.296373,
        "lng": 99.941227,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:44:03",
        "lat": 2.294578,
        "lng": 99.941209,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:44:33",
        "lat": 2.292778,
        "lng": 99.941244,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:45:03",
        "lat": 2.290952,
        "lng": 99.941289,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 22:45:16",
        "lat": 2.29017,
        "lng": 99.941307,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 22:46:03",
        "lat": 2.289982,
        "lng": 99.941093,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 22:46:33",
        "lat": 2.289912,
        "lng": 99.940347,
        "speed": 11.0
      },
      {
        "time": "2026-09-06 22:47:13",
        "lat": 2.289852,
        "lng": 99.939324,
        "speed": 10.0
      },
      {
        "time": "2026-09-06 22:48:03",
        "lat": 2.290816,
        "lng": 99.939182,
        "speed": 18.0
      },
      {
        "time": "2026-09-06 22:48:33",
        "lat": 2.292337,
        "lng": 99.939129,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:49:03",
        "lat": 2.293919,
        "lng": 99.939093,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 22:49:33",
        "lat": 2.295497,
        "lng": 99.939049,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 22:50:03",
        "lat": 2.297039,
        "lng": 99.939013,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 22:50:33",
        "lat": 2.298625,
        "lng": 99.938978,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 22:51:03",
        "lat": 2.300113,
        "lng": 99.938933,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 22:51:33",
        "lat": 2.301849,
        "lng": 99.938898,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:52:03",
        "lat": 2.303668,
        "lng": 99.938853,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 22:52:33",
        "lat": 2.30554,
        "lng": 99.938809,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:53:23",
        "lat": 2.306869,
        "lng": 99.938693,
        "speed": 9.0
      },
      {
        "time": "2026-09-06 22:53:53",
        "lat": 2.306875,
        "lng": 99.937742,
        "speed": 13.0
      },
      {
        "time": "2026-09-06 22:54:20",
        "lat": 2.306736,
        "lng": 99.936898,
        "speed": 13.0
      },
      {
        "time": "2026-09-06 22:54:43",
        "lat": 2.305627,
        "lng": 99.936836,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:55:13",
        "lat": 2.304002,
        "lng": 99.9368,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 22:55:43",
        "lat": 2.302354,
        "lng": 99.936782,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:56:13",
        "lat": 2.300613,
        "lng": 99.936782,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:56:42",
        "lat": 2.299062,
        "lng": 99.936667,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 22:57:03",
        "lat": 2.298999,
        "lng": 99.935476,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 22:57:23",
        "lat": 2.298974,
        "lng": 99.934409,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 22:57:57",
        "lat": 2.298864,
        "lng": 99.934098,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 22:58:48",
        "lat": 2.298864,
        "lng": 99.93408,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 22:59:23",
        "lat": 2.298872,
        "lng": 99.933236,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 22:59:53",
        "lat": 2.298883,
        "lng": 99.931707,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 23:00:23",
        "lat": 2.298959,
        "lng": 99.92992,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 23:00:43",
        "lat": 2.298231,
        "lng": 99.929556,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 23:01:13",
        "lat": 2.296354,
        "lng": 99.92928,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 23:01:43",
        "lat": 2.294468,
        "lng": 99.929022,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 23:02:13",
        "lat": 2.292578,
        "lng": 99.928756,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 23:02:43",
        "lat": 2.290577,
        "lng": 99.92848,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 23:03:09",
        "lat": 2.289689,
        "lng": 99.928382,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 23:03:39",
        "lat": 2.289677,
        "lng": 99.928364,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 23:04:03",
        "lat": 2.290098,
        "lng": 99.928418,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 23:04:33",
        "lat": 2.291838,
        "lng": 99.928667,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 23:05:03",
        "lat": 2.293745,
        "lng": 99.928907,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 23:05:33",
        "lat": 2.295692,
        "lng": 99.929164,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 23:06:03",
        "lat": 2.297679,
        "lng": 99.92944,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 23:06:27",
        "lat": 2.298975,
        "lng": 99.929431,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 23:06:53",
        "lat": 2.298999,
        "lng": 99.927964,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 23:07:23",
        "lat": 2.298982,
        "lng": 99.926124,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 23:07:53",
        "lat": 2.298972,
        "lng": 99.924364,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 23:08:22",
        "lat": 2.298922,
        "lng": 99.92248,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 23:08:43",
        "lat": 2.298888,
        "lng": 99.921111,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 23:09:13",
        "lat": 2.298846,
        "lng": 99.919173,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 23:09:43",
        "lat": 2.298793,
        "lng": 99.917076,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 23:10:13",
        "lat": 2.298745,
        "lng": 99.914924,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 23:10:43",
        "lat": 2.298728,
        "lng": 99.912747,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 23:11:13",
        "lat": 2.298676,
        "lng": 99.910542,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 23:11:43",
        "lat": 2.298579,
        "lng": 99.909067,
        "speed": 13.0
      },
      {
        "time": "2026-09-06 23:11:53",
        "lat": 2.298454,
        "lng": 99.90872,
        "speed": 14.0
      },
      {
        "time": "2026-09-06 23:12:23",
        "lat": 2.296799,
        "lng": 99.90848,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 23:12:53",
        "lat": 2.294959,
        "lng": 99.908276,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 23:13:23",
        "lat": 2.293064,
        "lng": 99.908027,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 23:13:54",
        "lat": 2.292393,
        "lng": 99.907911,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 23:14:03",
        "lat": 2.292312,
        "lng": 99.907956,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 23:14:25",
        "lat": 2.292328,
        "lng": 99.908009,
        "speed": 0.0
      }
    ]
  },
  "2026-09-07__V-JAR-01": {
    "date": "2026-09-07",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-07 05:42:11",
        "lat": 2.292276,
        "lng": 99.907991,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 05:43:40",
        "lat": 2.295731,
        "lng": 99.908347,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 05:44:20",
        "lat": 2.298576,
        "lng": 99.909209,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 05:44:50",
        "lat": 2.298714,
        "lng": 99.911404,
        "speed": 38.0
      },
      {
        "time": "2026-09-07 05:45:40",
        "lat": 2.298783,
        "lng": 99.91616,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 05:46:30",
        "lat": 2.298917,
        "lng": 99.921013,
        "speed": 39.0
      },
      {
        "time": "2026-09-07 05:47:20",
        "lat": 2.299018,
        "lng": 99.926107,
        "speed": 43.0
      },
      {
        "time": "2026-09-07 05:48:10",
        "lat": 2.298897,
        "lng": 99.931511,
        "speed": 46.0
      },
      {
        "time": "2026-09-07 05:49:10",
        "lat": 2.299026,
        "lng": 99.936107,
        "speed": 52.0
      },
      {
        "time": "2026-09-07 05:50:00",
        "lat": 2.299374,
        "lng": 99.94352,
        "speed": 58.0
      },
      {
        "time": "2026-09-07 05:50:50",
        "lat": 2.299766,
        "lng": 99.950764,
        "speed": 52.0
      },
      {
        "time": "2026-09-07 05:51:40",
        "lat": 2.299862,
        "lng": 99.957778,
        "speed": 55.0
      },
      {
        "time": "2026-09-07 05:52:30",
        "lat": 2.300017,
        "lng": 99.965902,
        "speed": 69.0
      },
      {
        "time": "2026-09-07 05:53:50",
        "lat": 2.300051,
        "lng": 99.968578,
        "speed": 11.0
      },
      {
        "time": "2026-09-07 05:57:06",
        "lat": 2.300059,
        "lng": 99.969324,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 05:57:44",
        "lat": 2.300063,
        "lng": 99.968684,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 05:58:22",
        "lat": 2.300051,
        "lng": 99.969253,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 05:58:34",
        "lat": 2.300063,
        "lng": 99.968667,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 05:59:00",
        "lat": 2.300031,
        "lng": 99.966684,
        "speed": 47.0
      },
      {
        "time": "2026-09-07 05:59:50",
        "lat": 2.299894,
        "lng": 99.960533,
        "speed": 52.0
      },
      {
        "time": "2026-09-07 06:00:40",
        "lat": 2.299786,
        "lng": 99.953902,
        "speed": 53.0
      },
      {
        "time": "2026-09-07 06:01:30",
        "lat": 2.299542,
        "lng": 99.947164,
        "speed": 50.0
      },
      {
        "time": "2026-09-07 06:02:20",
        "lat": 2.299255,
        "lng": 99.940542,
        "speed": 52.0
      },
      {
        "time": "2026-09-07 06:03:10",
        "lat": 2.298959,
        "lng": 99.934427,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 06:03:46",
        "lat": 2.298142,
        "lng": 99.933982,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 06:10:06",
        "lat": 2.292328,
        "lng": 99.908009,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 06:14:43",
        "lat": 2.298457,
        "lng": 99.933369,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 06:19:47",
        "lat": 2.298489,
        "lng": 99.933369,
        "speed": 10.0
      },
      {
        "time": "2026-09-07 06:20:08",
        "lat": 2.292328,
        "lng": 99.908009,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 06:20:57",
        "lat": 2.298995,
        "lng": 99.927244,
        "speed": 46.0
      },
      {
        "time": "2026-09-07 06:21:47",
        "lat": 2.298853,
        "lng": 99.920756,
        "speed": 53.0
      },
      {
        "time": "2026-09-07 06:22:37",
        "lat": 2.298713,
        "lng": 99.913769,
        "speed": 60.0
      },
      {
        "time": "2026-09-07 06:23:17",
        "lat": 2.298771,
        "lng": 99.909378,
        "speed": 9.0
      },
      {
        "time": "2026-09-07 09:11:05",
        "lat": 2.298859,
        "lng": 99.909307,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 09:11:37",
        "lat": 2.298707,
        "lng": 99.910649,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 09:12:27",
        "lat": 2.298767,
        "lng": 99.914569,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 09:13:17",
        "lat": 2.298844,
        "lng": 99.918604,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 09:14:07",
        "lat": 2.298918,
        "lng": 99.922222,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 09:14:57",
        "lat": 2.298982,
        "lng": 99.925698,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 09:15:48",
        "lat": 2.29902,
        "lng": 99.929022,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 09:16:38",
        "lat": 2.298854,
        "lng": 99.932516,
        "speed": 18.0
      },
      {
        "time": "2026-09-07 09:17:10",
        "lat": 2.298496,
        "lng": 99.933493,
        "speed": 1.0
      },
      {
        "time": "2026-09-07 09:19:10",
        "lat": 2.298884,
        "lng": 99.933982,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 09:19:51",
        "lat": 2.298998,
        "lng": 99.93672,
        "speed": 10.0
      },
      {
        "time": "2026-09-07 09:20:50",
        "lat": 2.299116,
        "lng": 99.938249,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 09:21:40",
        "lat": 2.299321,
        "lng": 99.942036,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 09:22:30",
        "lat": 2.299517,
        "lng": 99.94616,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 09:23:20",
        "lat": 2.299751,
        "lng": 99.950116,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 09:24:10",
        "lat": 2.299811,
        "lng": 99.954676,
        "speed": 36.0
      },
      {
        "time": "2026-09-07 09:25:00",
        "lat": 2.299879,
        "lng": 99.959084,
        "speed": 36.0
      },
      {
        "time": "2026-09-07 09:25:50",
        "lat": 2.299966,
        "lng": 99.963689,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 09:26:40",
        "lat": 2.300049,
        "lng": 99.968036,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 09:27:13",
        "lat": 2.299606,
        "lng": 99.968898,
        "speed": 9.0
      },
      {
        "time": "2026-09-07 10:04:07",
        "lat": 2.300017,
        "lng": 99.968133,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 10:04:47",
        "lat": 2.299992,
        "lng": 99.965378,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 10:05:37",
        "lat": 2.299915,
        "lng": 99.961422,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 10:06:27",
        "lat": 2.299839,
        "lng": 99.957449,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 10:07:17",
        "lat": 2.299782,
        "lng": 99.953644,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 10:08:07",
        "lat": 2.299704,
        "lng": 99.949689,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 10:08:57",
        "lat": 2.299493,
        "lng": 99.945929,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 10:09:47",
        "lat": 2.299335,
        "lng": 99.942151,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 10:10:37",
        "lat": 2.29911,
        "lng": 99.938204,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 10:11:27",
        "lat": 2.298974,
        "lng": 99.934498,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 10:12:17",
        "lat": 2.298884,
        "lng": 99.931751,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 10:12:57",
        "lat": 2.298473,
        "lng": 99.929573,
        "speed": 11.0
      },
      {
        "time": "2026-09-07 10:13:57",
        "lat": 2.298082,
        "lng": 99.929511,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 10:14:47",
        "lat": 2.294796,
        "lng": 99.929067,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 10:15:47",
        "lat": 2.291997,
        "lng": 99.928693,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 10:16:37",
        "lat": 2.289601,
        "lng": 99.927911,
        "speed": 14.0
      },
      {
        "time": "2026-09-07 10:17:37",
        "lat": 2.289756,
        "lng": 99.926498,
        "speed": 10.0
      },
      {
        "time": "2026-09-07 10:18:27",
        "lat": 2.289982,
        "lng": 99.925538,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 10:20:07",
        "lat": 2.290818,
        "lng": 99.925467,
        "speed": 9.0
      },
      {
        "time": "2026-09-07 10:20:57",
        "lat": 2.290779,
        "lng": 99.924044,
        "speed": 10.0
      },
      {
        "time": "2026-09-07 10:22:15",
        "lat": 2.291323,
        "lng": 99.923458,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 10:23:17",
        "lat": 2.291371,
        "lng": 99.922524,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 10:24:17",
        "lat": 2.291669,
        "lng": 99.921316,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 10:25:07",
        "lat": 2.294248,
        "lng": 99.921627,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 10:25:57",
        "lat": 2.297416,
        "lng": 99.922053,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 10:27:51",
        "lat": 2.298261,
        "lng": 99.922347,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 11:39:20",
        "lat": 2.298904,
        "lng": 99.922382,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 11:40:10",
        "lat": 2.298979,
        "lng": 99.925564,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 11:41:00",
        "lat": 2.299016,
        "lng": 99.92936,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 11:41:50",
        "lat": 2.298883,
        "lng": 99.93272,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 11:42:40",
        "lat": 2.299007,
        "lng": 99.935351,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 11:43:19",
        "lat": 2.298714,
        "lng": 99.936818,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 12:40:59",
        "lat": 2.298667,
        "lng": 99.937369,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 12:43:06",
        "lat": 2.299042,
        "lng": 99.936898,
        "speed": 18.0
      },
      {
        "time": "2026-09-07 12:43:52",
        "lat": 2.299193,
        "lng": 99.939564,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 12:44:42",
        "lat": 2.299364,
        "lng": 99.943013,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 12:45:32",
        "lat": 2.299521,
        "lng": 99.946631,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:46:22",
        "lat": 2.299759,
        "lng": 99.949956,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 12:47:12",
        "lat": 2.299792,
        "lng": 99.953529,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:48:02",
        "lat": 2.299855,
        "lng": 99.957173,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:48:52",
        "lat": 2.299898,
        "lng": 99.960613,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:49:42",
        "lat": 2.299981,
        "lng": 99.964356,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:50:22",
        "lat": 2.298711,
        "lng": 99.965964,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 12:51:12",
        "lat": 2.294388,
        "lng": 99.966133,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 12:52:03",
        "lat": 2.292871,
        "lng": 99.968213,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 12:52:53",
        "lat": 2.292726,
        "lng": 99.972133,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 12:53:43",
        "lat": 2.292548,
        "lng": 99.976062,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:54:33",
        "lat": 2.292272,
        "lng": 99.979867,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 12:55:23",
        "lat": 2.291976,
        "lng": 99.983858,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 12:56:03",
        "lat": 2.290154,
        "lng": 99.984471,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 12:56:53",
        "lat": 2.286308,
        "lng": 99.984507,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 12:58:32",
        "lat": 2.284848,
        "lng": 99.985698,
        "speed": 4.0
      },
      {
        "time": "2026-09-07 13:10:07",
        "lat": 2.284802,
        "lng": 99.98496,
        "speed": 7.0
      },
      {
        "time": "2026-09-07 13:11:07",
        "lat": 2.287152,
        "lng": 99.984489,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 13:11:57",
        "lat": 2.290249,
        "lng": 99.984462,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 13:12:37",
        "lat": 2.29199,
        "lng": 99.983716,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 13:13:27",
        "lat": 2.292286,
        "lng": 99.979822,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 13:14:17",
        "lat": 2.292593,
        "lng": 99.975573,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 13:15:07",
        "lat": 2.292774,
        "lng": 99.971538,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 13:15:57",
        "lat": 2.292912,
        "lng": 99.967609,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 13:16:27",
        "lat": 2.293503,
        "lng": 99.96616,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 13:17:17",
        "lat": 2.296969,
        "lng": 99.966053,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 13:18:11",
        "lat": 2.300012,
        "lng": 99.966098,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 13:19:37",
        "lat": 2.299702,
        "lng": 99.968391,
        "speed": 18.0
      },
      {
        "time": "2026-09-07 13:20:45",
        "lat": 2.300069,
        "lng": 99.968036,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 13:21:37",
        "lat": 2.299998,
        "lng": 99.96496,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 13:22:27",
        "lat": 2.299887,
        "lng": 99.959618,
        "speed": 46.0
      },
      {
        "time": "2026-09-07 13:23:17",
        "lat": 2.299793,
        "lng": 99.954071,
        "speed": 43.0
      },
      {
        "time": "2026-09-07 13:24:07",
        "lat": 2.299637,
        "lng": 99.948604,
        "speed": 44.0
      },
      {
        "time": "2026-09-07 13:24:57",
        "lat": 2.299382,
        "lng": 99.943316,
        "speed": 45.0
      },
      {
        "time": "2026-09-07 13:25:47",
        "lat": 2.299091,
        "lng": 99.937467,
        "speed": 46.0
      },
      {
        "time": "2026-09-07 13:26:37",
        "lat": 2.298866,
        "lng": 99.93312,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 13:27:27",
        "lat": 2.299022,
        "lng": 99.928693,
        "speed": 43.0
      },
      {
        "time": "2026-09-07 13:28:17",
        "lat": 2.298923,
        "lng": 99.923342,
        "speed": 45.0
      },
      {
        "time": "2026-09-07 13:29:07",
        "lat": 2.29882,
        "lng": 99.916996,
        "speed": 53.0
      },
      {
        "time": "2026-09-07 13:29:47",
        "lat": 2.298563,
        "lng": 99.913218,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 13:30:37",
        "lat": 2.294992,
        "lng": 99.912551,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 13:31:27",
        "lat": 2.297723,
        "lng": 99.910889,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 13:32:07",
        "lat": 2.298593,
        "lng": 99.909404,
        "speed": 9.0
      },
      {
        "time": "2026-09-07 13:32:47",
        "lat": 2.296457,
        "lng": 99.908444,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 13:33:37",
        "lat": 2.292312,
        "lng": 99.907911,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 13:34:21",
        "lat": 2.289427,
        "lng": 99.9076,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 13:50:08",
        "lat": 2.291125,
        "lng": 99.907733,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 13:50:58",
        "lat": 2.295648,
        "lng": 99.90832,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 13:51:38",
        "lat": 2.298578,
        "lng": 99.909227,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 14:12:47",
        "lat": 2.298757,
        "lng": 99.909324,
        "speed": 7.0
      },
      {
        "time": "2026-09-07 14:13:37",
        "lat": 2.298698,
        "lng": 99.910578,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 14:14:27",
        "lat": 2.298764,
        "lng": 99.913591,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 14:15:17",
        "lat": 2.29881,
        "lng": 99.916489,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 14:16:07",
        "lat": 2.298887,
        "lng": 99.919529,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 14:16:52",
        "lat": 2.298873,
        "lng": 99.920249,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 14:17:37",
        "lat": 2.29897,
        "lng": 99.92288,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 14:18:37",
        "lat": 2.299038,
        "lng": 99.925849,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 14:19:27",
        "lat": 2.299081,
        "lng": 99.928782,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 14:20:17",
        "lat": 2.298928,
        "lng": 99.931964,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 14:21:07",
        "lat": 2.296882,
        "lng": 99.932302,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 14:21:57",
        "lat": 2.293799,
        "lng": 99.932178,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 14:22:47",
        "lat": 2.290726,
        "lng": 99.932133,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 14:23:49",
        "lat": 2.289632,
        "lng": 99.932329,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 14:26:01",
        "lat": 2.291012,
        "lng": 99.932142,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 14:26:51",
        "lat": 2.294529,
        "lng": 99.932213,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 14:27:41",
        "lat": 2.298017,
        "lng": 99.932391,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 14:28:31",
        "lat": 2.298912,
        "lng": 99.933964,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 14:29:21",
        "lat": 2.299065,
        "lng": 99.937084,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 14:30:11",
        "lat": 2.299267,
        "lng": 99.940756,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 14:31:00",
        "lat": 2.29925,
        "lng": 99.94344,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 14:32:21",
        "lat": 2.299441,
        "lng": 99.944676,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 14:33:11",
        "lat": 2.299636,
        "lng": 99.948124,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 14:33:56",
        "lat": 2.29991,
        "lng": 99.950809,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 14:34:41",
        "lat": 2.30272,
        "lng": 99.951102,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 14:35:31",
        "lat": 2.306221,
        "lng": 99.951369,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 14:47:47",
        "lat": 2.306377,
        "lng": 99.951822,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 14:48:37",
        "lat": 2.306261,
        "lng": 99.954978,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 14:49:17",
        "lat": 2.308768,
        "lng": 99.955013,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 14:49:47",
        "lat": 2.309021,
        "lng": 99.9564,
        "speed": 17.0
      },
      {
        "time": "2026-09-07 14:50:37",
        "lat": 2.312602,
        "lng": 99.956347,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 14:51:27",
        "lat": 2.316803,
        "lng": 99.956302,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 14:52:17",
        "lat": 2.320838,
        "lng": 99.956249,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 14:53:07",
        "lat": 2.324556,
        "lng": 99.956169,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 15:04:59",
        "lat": 2.325968,
        "lng": 99.956169,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 15:05:49",
        "lat": 2.323165,
        "lng": 99.956169,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 15:06:39",
        "lat": 2.319985,
        "lng": 99.956231,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 15:07:19",
        "lat": 2.319019,
        "lng": 99.957404,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 15:08:09",
        "lat": 2.319064,
        "lng": 99.960738,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 15:08:59",
        "lat": 2.319126,
        "lng": 99.964284,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 15:09:49",
        "lat": 2.319181,
        "lng": 99.96776,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 15:10:39",
        "lat": 2.319171,
        "lng": 99.97072,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 15:11:29",
        "lat": 2.316134,
        "lng": 99.970702,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 15:12:19",
        "lat": 2.312667,
        "lng": 99.970702,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 15:13:09",
        "lat": 2.30923,
        "lng": 99.970684,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 15:13:59",
        "lat": 2.306284,
        "lng": 99.970684,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 15:14:49",
        "lat": 2.302493,
        "lng": 99.970658,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 15:15:39",
        "lat": 2.300108,
        "lng": 99.970133,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 15:16:11",
        "lat": 2.29973,
        "lng": 99.969111,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 15:49:03",
        "lat": 2.29964,
        "lng": 99.968853,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 16:45:33",
        "lat": 2.299348,
        "lng": 99.96872,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 16:46:23",
        "lat": 2.299998,
        "lng": 99.967778,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 16:47:13",
        "lat": 2.299956,
        "lng": 99.96408,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 16:48:03",
        "lat": 2.299881,
        "lng": 99.960044,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 16:48:53",
        "lat": 2.299812,
        "lng": 99.955929,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 16:49:43",
        "lat": 2.299743,
        "lng": 99.951973,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 16:50:33",
        "lat": 2.299588,
        "lng": 99.94808,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 16:51:14",
        "lat": 2.299425,
        "lng": 99.944987,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 16:51:38",
        "lat": 2.29937,
        "lng": 99.943964,
        "speed": 18.0
      },
      {
        "time": "2026-09-07 16:52:23",
        "lat": 2.299454,
        "lng": 99.944711,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 16:53:33",
        "lat": 2.299389,
        "lng": 99.944062,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 16:54:23",
        "lat": 2.299229,
        "lng": 99.940747,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 16:55:13",
        "lat": 2.299023,
        "lng": 99.936916,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 16:56:03",
        "lat": 2.298875,
        "lng": 99.933742,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 16:56:41",
        "lat": 2.298182,
        "lng": 99.933173,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 17:01:11",
        "lat": 2.298121,
        "lng": 99.933004,
        "speed": 7.0
      },
      {
        "time": "2026-09-07 17:01:45",
        "lat": 2.298794,
        "lng": 99.933102,
        "speed": 17.0
      },
      {
        "time": "2026-09-07 17:02:31",
        "lat": 2.297413,
        "lng": 99.932347,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 17:03:21",
        "lat": 2.294181,
        "lng": 99.932213,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 17:04:11",
        "lat": 2.291528,
        "lng": 99.932133,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 17:05:09",
        "lat": 2.289631,
        "lng": 99.932178,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 17:37:02",
        "lat": 2.290608,
        "lng": 99.932142,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 17:37:52",
        "lat": 2.293303,
        "lng": 99.932196,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 17:38:42",
        "lat": 2.296204,
        "lng": 99.932293,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 17:39:32",
        "lat": 2.298059,
        "lng": 99.932729,
        "speed": 8.0
      },
      {
        "time": "2026-09-07 17:40:02",
        "lat": 2.298477,
        "lng": 99.932373,
        "speed": 17.0
      },
      {
        "time": "2026-09-07 17:40:52",
        "lat": 2.298926,
        "lng": 99.930302,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 17:41:32",
        "lat": 2.297989,
        "lng": 99.929493,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 17:42:22",
        "lat": 2.294117,
        "lng": 99.928951,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 17:43:12",
        "lat": 2.290087,
        "lng": 99.928418,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 18:04:10",
        "lat": 2.290452,
        "lng": 99.92848,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 18:05:00",
        "lat": 2.29314,
        "lng": 99.928871,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 18:05:48",
        "lat": 2.295759,
        "lng": 99.929218,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 18:06:00",
        "lat": 2.296472,
        "lng": 99.929333,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 18:06:30",
        "lat": 2.298219,
        "lng": 99.929556,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 18:07:28",
        "lat": 2.298878,
        "lng": 99.929653,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 19:06:09",
        "lat": 2.298949,
        "lng": 99.929547,
        "speed": 14.0
      },
      {
        "time": "2026-09-07 19:06:53",
        "lat": 2.298985,
        "lng": 99.926933,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 19:07:43",
        "lat": 2.298944,
        "lng": 99.9236,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 19:08:33",
        "lat": 2.298859,
        "lng": 99.920133,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 19:09:23",
        "lat": 2.298782,
        "lng": 99.916373,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 19:10:13",
        "lat": 2.298711,
        "lng": 99.912498,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 19:11:03",
        "lat": 2.298573,
        "lng": 99.909067,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 19:11:48",
        "lat": 2.296025,
        "lng": 99.908382,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 19:12:18",
        "lat": 2.293794,
        "lng": 99.908107,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 19:12:43",
        "lat": 2.291976,
        "lng": 99.907849,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 19:13:12",
        "lat": 2.289932,
        "lng": 99.907573,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 20:27:42",
        "lat": 2.289408,
        "lng": 99.907556,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 20:28:41",
        "lat": 2.291439,
        "lng": 99.907796,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 20:29:31",
        "lat": 2.294896,
        "lng": 99.908249,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 20:30:01",
        "lat": 2.296963,
        "lng": 99.908516,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 20:30:21",
        "lat": 2.298273,
        "lng": 99.908676,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 20:30:45",
        "lat": 2.29863,
        "lng": 99.909396,
        "speed": 9.0
      },
      {
        "time": "2026-09-07 20:31:19",
        "lat": 2.298776,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 20:50:47",
        "lat": 2.298683,
        "lng": 99.911538,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 20:51:37",
        "lat": 2.29876,
        "lng": 99.916187,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 20:52:27",
        "lat": 2.298862,
        "lng": 99.920871,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 20:53:17",
        "lat": 2.298959,
        "lng": 99.92528,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 20:54:07",
        "lat": 2.299007,
        "lng": 99.928844,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 20:54:57",
        "lat": 2.298843,
        "lng": 99.932791,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 20:55:34",
        "lat": 2.298721,
        "lng": 99.933822,
        "speed": 3.0
      },
      {
        "time": "2026-09-07 20:59:40",
        "lat": 2.298785,
        "lng": 99.93384,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 21:00:27",
        "lat": 2.298846,
        "lng": 99.931556,
        "speed": 36.0
      },
      {
        "time": "2026-09-07 21:01:17",
        "lat": 2.298968,
        "lng": 99.926613,
        "speed": 42.0
      },
      {
        "time": "2026-09-07 21:02:07",
        "lat": 2.298875,
        "lng": 99.921342,
        "speed": 42.0
      },
      {
        "time": "2026-09-07 21:02:57",
        "lat": 2.298763,
        "lng": 99.91608,
        "speed": 42.0
      },
      {
        "time": "2026-09-07 21:03:45",
        "lat": 2.298813,
        "lng": 99.913262,
        "speed": 17.0
      },
      {
        "time": "2026-09-07 21:04:17",
        "lat": 2.298706,
        "lng": 99.912773,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 21:05:01",
        "lat": 2.298664,
        "lng": 99.909404,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 22:09:38",
        "lat": 2.298754,
        "lng": 99.909378,
        "speed": 6.0
      },
      {
        "time": "2026-09-07 22:10:11",
        "lat": 2.298679,
        "lng": 99.910533,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 22:11:01",
        "lat": 2.298731,
        "lng": 99.913413,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 22:11:50",
        "lat": 2.298785,
        "lng": 99.916276,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 22:12:18",
        "lat": 2.298881,
        "lng": 99.917822,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 22:13:01",
        "lat": 2.301337,
        "lng": 99.918116,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 22:13:31",
        "lat": 2.303112,
        "lng": 99.918356,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 22:14:02",
        "lat": 2.305019,
        "lng": 99.918604,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 22:14:28",
        "lat": 2.306703,
        "lng": 99.918827,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 22:17:01",
        "lat": 2.305843,
        "lng": 99.91872,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 22:17:49",
        "lat": 2.302811,
        "lng": 99.918329,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 22:18:21",
        "lat": 2.300651,
        "lng": 99.918018,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 22:18:45",
        "lat": 2.298986,
        "lng": 99.917804,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 22:19:01",
        "lat": 2.298883,
        "lng": 99.91856,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 22:19:41",
        "lat": 2.298898,
        "lng": 99.921209,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 22:20:21",
        "lat": 2.300435,
        "lng": 99.92248,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 22:21:04",
        "lat": 2.303617,
        "lng": 99.92288,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 22:21:43",
        "lat": 2.306531,
        "lng": 99.923307,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 22:23:01",
        "lat": 2.306778,
        "lng": 99.923342,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 22:23:21",
        "lat": 2.305383,
        "lng": 99.923129,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 22:23:51",
        "lat": 2.302959,
        "lng": 99.922809,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 22:24:21",
        "lat": 2.300559,
        "lng": 99.922489,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 22:24:41",
        "lat": 2.299031,
        "lng": 99.922267,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 22:25:03",
        "lat": 2.298986,
        "lng": 99.923582,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 22:25:41",
        "lat": 2.299021,
        "lng": 99.92648,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 22:26:11",
        "lat": 2.299032,
        "lng": 99.928756,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 22:26:41",
        "lat": 2.297767,
        "lng": 99.929458,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 22:27:03",
        "lat": 2.295919,
        "lng": 99.929227,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 22:27:41",
        "lat": 2.292502,
        "lng": 99.928782,
        "speed": 36.0
      },
      {
        "time": "2026-09-07 22:28:14",
        "lat": 2.289721,
        "lng": 99.928436,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 22:28:27",
        "lat": 2.289653,
        "lng": 99.928382,
        "speed": 6.0
      },
      {
        "time": "2026-09-07 22:28:45",
        "lat": 2.290583,
        "lng": 99.928533,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 22:29:11",
        "lat": 2.292522,
        "lng": 99.928791,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 22:29:31",
        "lat": 2.294188,
        "lng": 99.929022,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 22:29:54",
        "lat": 2.296184,
        "lng": 99.92928,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 22:30:21",
        "lat": 2.298546,
        "lng": 99.9296,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 22:30:39",
        "lat": 2.299942,
        "lng": 99.929787,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 22:31:01",
        "lat": 2.301852,
        "lng": 99.930044,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 22:31:22",
        "lat": 2.303577,
        "lng": 99.930276,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 22:31:51",
        "lat": 2.305931,
        "lng": 99.930569,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 22:33:05",
        "lat": 2.307098,
        "lng": 99.930711,
        "speed": 6.0
      },
      {
        "time": "2026-09-07 22:33:41",
        "lat": 2.305006,
        "lng": 99.930436,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 22:34:23",
        "lat": 2.301869,
        "lng": 99.930018,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 22:34:49",
        "lat": 2.299754,
        "lng": 99.929716,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 22:34:56",
        "lat": 2.299194,
        "lng": 99.929653,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 22:35:24",
        "lat": 2.29903,
        "lng": 99.927778,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 22:36:11",
        "lat": 2.298969,
        "lng": 99.92368,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 22:36:41",
        "lat": 2.298893,
        "lng": 99.921111,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 22:37:31",
        "lat": 2.298808,
        "lng": 99.916729,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 22:38:01",
        "lat": 2.298749,
        "lng": 99.914062,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 22:38:31",
        "lat": 2.298726,
        "lng": 99.911396,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 22:39:01",
        "lat": 2.298799,
        "lng": 99.909378,
        "speed": 8.0
      },
      {
        "time": "2026-09-07 23:39:45",
        "lat": 2.298573,
        "lng": 99.909227,
        "speed": 18.0
      },
      {
        "time": "2026-09-07 23:40:05",
        "lat": 2.298186,
        "lng": 99.908676,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 23:40:55",
        "lat": 2.293111,
        "lng": 99.908027,
        "speed": 43.0
      },
      {
        "time": "2026-09-07 23:41:30",
        "lat": 2.291747,
        "lng": 99.907876,
        "speed": 6.0
      },
      {
        "time": "2026-09-07 23:41:57",
        "lat": 2.29177,
        "lng": 99.907956,
        "speed": 0.0
      }
    ]
  },
  "2026-09-08__V-JAR-01": {
    "date": "2026-09-08",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-08 05:28:42",
        "lat": 2.291768,
        "lng": 99.907947,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 05:29:38",
        "lat": 2.291762,
        "lng": 99.907947,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 05:29:45",
        "lat": 2.291742,
        "lng": 99.907876,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 05:29:52",
        "lat": 2.291964,
        "lng": 99.907858,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 05:30:12",
        "lat": 2.293156,
        "lng": 99.908027,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 05:30:32",
        "lat": 2.295302,
        "lng": 99.908276,
        "speed": 49.0
      },
      {
        "time": "2026-09-08 05:30:51",
        "lat": 2.297686,
        "lng": 99.908578,
        "speed": 48.0
      },
      {
        "time": "2026-09-08 05:30:53",
        "lat": 2.297922,
        "lng": 99.908596,
        "speed": 44.0
      },
      {
        "time": "2026-09-08 05:31:12",
        "lat": 2.298595,
        "lng": 99.909342,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 05:31:51",
        "lat": 2.298807,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 06:38:00",
        "lat": 2.298831,
        "lng": 99.909324,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 06:38:15",
        "lat": 2.298757,
        "lng": 99.909378,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 06:38:25",
        "lat": 2.298632,
        "lng": 99.90968,
        "speed": 21.0
      },
      {
        "time": "2026-09-08 06:38:40",
        "lat": 2.298539,
        "lng": 99.910418,
        "speed": 21.0
      },
      {
        "time": "2026-09-08 06:38:55",
        "lat": 2.297677,
        "lng": 99.910907,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 06:39:15",
        "lat": 2.29641,
        "lng": 99.911689,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 06:39:35",
        "lat": 2.29522,
        "lng": 99.912418,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 06:39:55",
        "lat": 2.294111,
        "lng": 99.913067,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 06:40:15",
        "lat": 2.292946,
        "lng": 99.913769,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 06:40:35",
        "lat": 2.291715,
        "lng": 99.914507,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 06:40:55",
        "lat": 2.290544,
        "lng": 99.9152,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 06:41:12",
        "lat": 2.289628,
        "lng": 99.915724,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 06:41:15",
        "lat": 2.289536,
        "lng": 99.915769,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 06:41:39",
        "lat": 2.289527,
        "lng": 99.915813,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:00:16",
        "lat": 2.290172,
        "lng": 99.915413,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 08:00:36",
        "lat": 2.291476,
        "lng": 99.914649,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 08:00:56",
        "lat": 2.293003,
        "lng": 99.913716,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 08:01:16",
        "lat": 2.294994,
        "lng": 99.912533,
        "speed": 50.0
      },
      {
        "time": "2026-09-08 08:01:36",
        "lat": 2.297126,
        "lng": 99.911236,
        "speed": 47.0
      },
      {
        "time": "2026-09-08 08:01:50",
        "lat": 2.297431,
        "lng": 99.910818,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:02:06",
        "lat": 2.295654,
        "lng": 99.910613,
        "speed": 42.0
      },
      {
        "time": "2026-09-08 08:02:26",
        "lat": 2.293152,
        "lng": 99.910267,
        "speed": 52.0
      },
      {
        "time": "2026-09-08 08:02:46",
        "lat": 2.290581,
        "lng": 99.909947,
        "speed": 50.0
      },
      {
        "time": "2026-09-08 08:03:04",
        "lat": 2.289289,
        "lng": 99.909716,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:03:16",
        "lat": 2.289272,
        "lng": 99.909378,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 08:03:46",
        "lat": 2.289242,
        "lng": 99.908382,
        "speed": 18.0
      },
      {
        "time": "2026-09-08 08:04:11",
        "lat": 2.289268,
        "lng": 99.907733,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:12:32",
        "lat": 2.289292,
        "lng": 99.907698,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:12:49",
        "lat": 2.289243,
        "lng": 99.908116,
        "speed": 15.0
      },
      {
        "time": "2026-09-08 08:13:29",
        "lat": 2.289251,
        "lng": 99.909209,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 08:13:49",
        "lat": 2.289316,
        "lng": 99.909751,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 08:14:09",
        "lat": 2.291287,
        "lng": 99.910009,
        "speed": 46.0
      },
      {
        "time": "2026-09-08 08:14:29",
        "lat": 2.293572,
        "lng": 99.91032,
        "speed": 47.0
      },
      {
        "time": "2026-09-08 08:14:49",
        "lat": 2.295993,
        "lng": 99.910649,
        "speed": 48.0
      },
      {
        "time": "2026-09-08 08:15:02",
        "lat": 2.297413,
        "lng": 99.910818,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 08:15:08",
        "lat": 2.297626,
        "lng": 99.910916,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 08:15:19",
        "lat": 2.296984,
        "lng": 99.911307,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 08:15:39",
        "lat": 2.295147,
        "lng": 99.912436,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 08:15:59",
        "lat": 2.293218,
        "lng": 99.913609,
        "speed": 45.0
      },
      {
        "time": "2026-09-08 08:16:19",
        "lat": 2.291657,
        "lng": 99.914533,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 08:16:25",
        "lat": 2.291292,
        "lng": 99.914747,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:16:39",
        "lat": 2.290539,
        "lng": 99.9152,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 08:16:59",
        "lat": 2.289493,
        "lng": 99.915804,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 08:26:18",
        "lat": 2.289532,
        "lng": 99.91584,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:26:35",
        "lat": 2.289858,
        "lng": 99.915609,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:27:11",
        "lat": 2.290486,
        "lng": 99.915236,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:27:45",
        "lat": 2.290715,
        "lng": 99.915067,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 08:28:04",
        "lat": 2.291639,
        "lng": 99.914667,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 08:28:15",
        "lat": 2.292319,
        "lng": 99.914764,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 08:28:35",
        "lat": 2.293549,
        "lng": 99.914924,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 08:28:55",
        "lat": 2.294861,
        "lng": 99.915084,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:29:15",
        "lat": 2.296198,
        "lng": 99.915271,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:29:35",
        "lat": 2.297493,
        "lng": 99.915431,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 08:29:53",
        "lat": 2.298587,
        "lng": 99.915573,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 08:29:55",
        "lat": 2.298661,
        "lng": 99.9156,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:30:05",
        "lat": 2.298756,
        "lng": 99.915973,
        "speed": 21.0
      },
      {
        "time": "2026-09-08 08:30:25",
        "lat": 2.298788,
        "lng": 99.917209,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:30:45",
        "lat": 2.298811,
        "lng": 99.918569,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:31:05",
        "lat": 2.298839,
        "lng": 99.919956,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:31:25",
        "lat": 2.298873,
        "lng": 99.921342,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:31:45",
        "lat": 2.298909,
        "lng": 99.922756,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:32:05",
        "lat": 2.298932,
        "lng": 99.924213,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 08:32:15",
        "lat": 2.299145,
        "lng": 99.92448,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 08:32:35",
        "lat": 2.30043,
        "lng": 99.924658,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:32:55",
        "lat": 2.301764,
        "lng": 99.924836,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:33:15",
        "lat": 2.303124,
        "lng": 99.925022,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:33:35",
        "lat": 2.304517,
        "lng": 99.925191,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:33:55",
        "lat": 2.305809,
        "lng": 99.92536,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:34:15",
        "lat": 2.306869,
        "lng": 99.92552,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 08:34:37",
        "lat": 2.306928,
        "lng": 99.925538,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:34:55",
        "lat": 2.30704,
        "lng": 99.925716,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 08:35:15",
        "lat": 2.307086,
        "lng": 99.926444,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 08:35:35",
        "lat": 2.30712,
        "lng": 99.927173,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 08:35:45",
        "lat": 2.307058,
        "lng": 99.927449,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 08:35:48",
        "lat": 2.307082,
        "lng": 99.92752,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 08:35:58",
        "lat": 2.307077,
        "lng": 99.927653,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 08:36:05",
        "lat": 2.307102,
        "lng": 99.927778,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:36:15",
        "lat": 2.307081,
        "lng": 99.928089,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:36:35",
        "lat": 2.307067,
        "lng": 99.928889,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 08:36:55",
        "lat": 2.307078,
        "lng": 99.929716,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 08:37:15",
        "lat": 2.307116,
        "lng": 99.930489,
        "speed": 10.0
      },
      {
        "time": "2026-09-08 08:37:42",
        "lat": 2.307087,
        "lng": 99.930649,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 08:37:55",
        "lat": 2.306503,
        "lng": 99.930578,
        "speed": 24.0
      },
      {
        "time": "2026-09-08 08:38:15",
        "lat": 2.305145,
        "lng": 99.930418,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:38:35",
        "lat": 2.303697,
        "lng": 99.930249,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:38:55",
        "lat": 2.30228,
        "lng": 99.93008,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:39:15",
        "lat": 2.300801,
        "lng": 99.929867,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:39:35",
        "lat": 2.299351,
        "lng": 99.929689,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 08:39:40",
        "lat": 2.299074,
        "lng": 99.929653,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 08:39:55",
        "lat": 2.298964,
        "lng": 99.930293,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:40:15",
        "lat": 2.298894,
        "lng": 99.931689,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:40:29",
        "lat": 2.298798,
        "lng": 99.932391,
        "speed": 7.0
      },
      {
        "time": "2026-09-08 08:41:32",
        "lat": 2.298779,
        "lng": 99.9324,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:41:40",
        "lat": 2.298779,
        "lng": 99.9324,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:42:05",
        "lat": 2.297793,
        "lng": 99.932356,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:42:25",
        "lat": 2.296336,
        "lng": 99.932302,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:42:45",
        "lat": 2.294843,
        "lng": 99.932231,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:43:05",
        "lat": 2.293322,
        "lng": 99.932213,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 08:43:25",
        "lat": 2.291742,
        "lng": 99.93216,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 08:43:45",
        "lat": 2.290223,
        "lng": 99.932142,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:44:06",
        "lat": 2.289668,
        "lng": 99.932142,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:44:25",
        "lat": 2.289992,
        "lng": 99.932133,
        "speed": 18.0
      },
      {
        "time": "2026-09-08 08:44:45",
        "lat": 2.291065,
        "lng": 99.932133,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 08:45:05",
        "lat": 2.292363,
        "lng": 99.93216,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:45:25",
        "lat": 2.293777,
        "lng": 99.932213,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:45:45",
        "lat": 2.29511,
        "lng": 99.93224,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:46:05",
        "lat": 2.296506,
        "lng": 99.932302,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:46:25",
        "lat": 2.297842,
        "lng": 99.932373,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 08:46:35",
        "lat": 2.298001,
        "lng": 99.93272,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 08:46:49",
        "lat": 2.298224,
        "lng": 99.933236,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 08:47:04",
        "lat": 2.298788,
        "lng": 99.933093,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:47:07",
        "lat": 2.298779,
        "lng": 99.933022,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 08:47:11",
        "lat": 2.298723,
        "lng": 99.933004,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 08:53:35",
        "lat": 2.298753,
        "lng": 99.933022,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:56:45",
        "lat": 2.298788,
        "lng": 99.933022,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:58:05",
        "lat": 2.298823,
        "lng": 99.93304,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 08:58:15",
        "lat": 2.29885,
        "lng": 99.933431,
        "speed": 15.0
      },
      {
        "time": "2026-09-08 08:58:35",
        "lat": 2.298933,
        "lng": 99.934524,
        "speed": 18.0
      },
      {
        "time": "2026-09-08 08:58:55",
        "lat": 2.298957,
        "lng": 99.935804,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:59:12",
        "lat": 2.29911,
        "lng": 99.936738,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 08:59:25",
        "lat": 2.299927,
        "lng": 99.936756,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:59:45",
        "lat": 2.301427,
        "lng": 99.9368,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 09:00:05",
        "lat": 2.302941,
        "lng": 99.936818,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 09:00:25",
        "lat": 2.304468,
        "lng": 99.936853,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 09:00:45",
        "lat": 2.306,
        "lng": 99.936871,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 09:01:05",
        "lat": 2.306771,
        "lng": 99.936996,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 09:01:25",
        "lat": 2.306838,
        "lng": 99.937716,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 09:01:45",
        "lat": 2.306864,
        "lng": 99.938604,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 09:02:15",
        "lat": 2.306793,
        "lng": 99.939182,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 09:02:35",
        "lat": 2.306695,
        "lng": 99.939796,
        "speed": 10.0
      },
      {
        "time": "2026-09-08 09:02:55",
        "lat": 2.306657,
        "lng": 99.940578,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 09:03:05",
        "lat": 2.306604,
        "lng": 99.940889,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 09:03:19",
        "lat": 2.306648,
        "lng": 99.94144,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 09:03:35",
        "lat": 2.306526,
        "lng": 99.941653,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 09:03:55",
        "lat": 2.306569,
        "lng": 99.942516,
        "speed": 15.0
      },
      {
        "time": "2026-09-08 09:04:13",
        "lat": 2.306636,
        "lng": 99.9432,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 09:04:19",
        "lat": 2.306488,
        "lng": 99.943244,
        "speed": 3.0
      },
      {
        "time": "2026-09-08 09:04:35",
        "lat": 2.306499,
        "lng": 99.943751,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 09:04:55",
        "lat": 2.306527,
        "lng": 99.944693,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 09:05:15",
        "lat": 2.306545,
        "lng": 99.945538,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 09:05:35",
        "lat": 2.306471,
        "lng": 99.945964,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 09:05:55",
        "lat": 2.306476,
        "lng": 99.946613,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 09:06:05",
        "lat": 2.30649,
        "lng": 99.947004,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 09:06:24",
        "lat": 2.306346,
        "lng": 99.947476,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 09:06:35",
        "lat": 2.305797,
        "lng": 99.947538,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 09:06:55",
        "lat": 2.304587,
        "lng": 99.947671,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 09:07:15",
        "lat": 2.302945,
        "lng": 99.947796,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 09:07:35",
        "lat": 2.301237,
        "lng": 99.947929,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 09:07:55",
        "lat": 2.299662,
        "lng": 99.948044,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 09:08:03",
        "lat": 2.299465,
        "lng": 99.948071,
        "speed": 1.0
      },
      {
        "time": "2026-09-08 09:08:29",
        "lat": 2.29935,
        "lng": 99.948098,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:20:00",
        "lat": 2.299342,
        "lng": 99.948124,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 09:20:05",
        "lat": 2.299457,
        "lng": 99.948116,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 09:20:15",
        "lat": 2.299579,
        "lng": 99.948311,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 09:20:35",
        "lat": 2.299658,
        "lng": 99.949609,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 09:20:55",
        "lat": 2.299705,
        "lng": 99.951076,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 09:21:15",
        "lat": 2.299738,
        "lng": 99.952702,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 09:21:35",
        "lat": 2.299775,
        "lng": 99.954391,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 09:21:55",
        "lat": 2.299806,
        "lng": 99.956187,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 09:22:15",
        "lat": 2.299833,
        "lng": 99.958027,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 09:22:35",
        "lat": 2.299858,
        "lng": 99.959858,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 09:22:55",
        "lat": 2.299889,
        "lng": 99.961867,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 09:23:15",
        "lat": 2.299932,
        "lng": 99.963884,
        "speed": 40.0
      },
      {
        "time": "2026-09-08 09:23:35",
        "lat": 2.29998,
        "lng": 99.96592,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 09:23:55",
        "lat": 2.300014,
        "lng": 99.967902,
        "speed": 40.0
      },
      {
        "time": "2026-09-08 09:24:12",
        "lat": 2.300016,
        "lng": 99.96896,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 09:26:36",
        "lat": 2.300028,
        "lng": 99.968996,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:26:49",
        "lat": 2.300052,
        "lng": 99.968996,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 09:27:05",
        "lat": 2.300074,
        "lng": 99.96816,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 09:27:25",
        "lat": 2.301457,
        "lng": 99.968151,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 09:27:45",
        "lat": 2.302783,
        "lng": 99.968116,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 09:28:05",
        "lat": 2.304179,
        "lng": 99.968089,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 09:28:25",
        "lat": 2.305704,
        "lng": 99.968062,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 09:28:45",
        "lat": 2.307317,
        "lng": 99.968044,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 09:29:05",
        "lat": 2.308917,
        "lng": 99.968036,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 09:29:25",
        "lat": 2.310561,
        "lng": 99.967991,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 09:29:45",
        "lat": 2.312382,
        "lng": 99.967947,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 09:30:05",
        "lat": 2.314257,
        "lng": 99.96792,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 09:30:25",
        "lat": 2.316094,
        "lng": 99.967876,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 09:30:45",
        "lat": 2.317889,
        "lng": 99.96784,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 09:31:01",
        "lat": 2.318514,
        "lng": 99.967822,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:31:15",
        "lat": 2.318831,
        "lng": 99.967822,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 09:31:25",
        "lat": 2.319148,
        "lng": 99.967707,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 09:31:45",
        "lat": 2.319131,
        "lng": 99.96592,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 09:32:05",
        "lat": 2.319104,
        "lng": 99.963787,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 09:32:25",
        "lat": 2.319069,
        "lng": 99.961653,
        "speed": 45.0
      },
      {
        "time": "2026-09-08 09:32:45",
        "lat": 2.319032,
        "lng": 99.95936,
        "speed": 45.0
      },
      {
        "time": "2026-09-08 09:33:05",
        "lat": 2.318994,
        "lng": 99.957227,
        "speed": 46.0
      },
      {
        "time": "2026-09-08 09:33:19",
        "lat": 2.319064,
        "lng": 99.956249,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 09:33:35",
        "lat": 2.320238,
        "lng": 99.956249,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 09:33:55",
        "lat": 2.322278,
        "lng": 99.956196,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 09:34:15",
        "lat": 2.324442,
        "lng": 99.956169,
        "speed": 42.0
      },
      {
        "time": "2026-09-08 09:34:22",
        "lat": 2.325143,
        "lng": 99.956151,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 09:35:05",
        "lat": 2.325642,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:35:15",
        "lat": 2.325676,
        "lng": 99.956169,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 09:35:26",
        "lat": 2.325916,
        "lng": 99.956169,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 09:43:20",
        "lat": 2.326003,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:44:25",
        "lat": 2.325671,
        "lng": 99.956169,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 09:44:45",
        "lat": 2.324596,
        "lng": 99.956169,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 09:44:52",
        "lat": 2.324121,
        "lng": 99.956169,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 09:45:05",
        "lat": 2.323179,
        "lng": 99.956187,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 09:45:25",
        "lat": 2.321689,
        "lng": 99.956196,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 09:45:45",
        "lat": 2.320139,
        "lng": 99.956231,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 09:46:01",
        "lat": 2.31906,
        "lng": 99.956231,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 09:55:08",
        "lat": 2.318992,
        "lng": 99.956267,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:55:13",
        "lat": 2.318992,
        "lng": 99.956267,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:56:00",
        "lat": 2.319074,
        "lng": 99.956249,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 09:56:15",
        "lat": 2.319897,
        "lng": 99.956231,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 09:56:35",
        "lat": 2.321412,
        "lng": 99.956213,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 09:56:55",
        "lat": 2.323007,
        "lng": 99.956187,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 09:57:15",
        "lat": 2.324606,
        "lng": 99.956151,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 09:57:35",
        "lat": 2.325782,
        "lng": 99.956142,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 09:58:27",
        "lat": 2.326003,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 10:39:11",
        "lat": 2.326064,
        "lng": 99.956196,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 11:19:42",
        "lat": 2.325909,
        "lng": 99.956213,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 12:03:40",
        "lat": 2.325908,
        "lng": 99.956196,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 12:38:33",
        "lat": 2.325848,
        "lng": 99.956169,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 12:38:45",
        "lat": 2.325029,
        "lng": 99.956169,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 12:39:05",
        "lat": 2.322869,
        "lng": 99.956187,
        "speed": 47.0
      },
      {
        "time": "2026-09-08 12:39:25",
        "lat": 2.320503,
        "lng": 99.956231,
        "speed": 42.0
      },
      {
        "time": "2026-09-08 12:39:43",
        "lat": 2.318982,
        "lng": 99.956329,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 12:39:55",
        "lat": 2.319017,
        "lng": 99.957289,
        "speed": 40.0
      },
      {
        "time": "2026-09-08 12:40:15",
        "lat": 2.319059,
        "lng": 99.959404,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 12:40:35",
        "lat": 2.319093,
        "lng": 99.961627,
        "speed": 46.0
      },
      {
        "time": "2026-09-08 12:40:55",
        "lat": 2.319135,
        "lng": 99.963911,
        "speed": 45.0
      },
      {
        "time": "2026-09-08 12:41:15",
        "lat": 2.319178,
        "lng": 99.966222,
        "speed": 46.0
      },
      {
        "time": "2026-09-08 12:41:35",
        "lat": 2.319213,
        "lng": 99.968524,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 12:41:55",
        "lat": 2.319245,
        "lng": 99.970604,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 12:42:15",
        "lat": 2.319293,
        "lng": 99.97264,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 12:42:35",
        "lat": 2.319328,
        "lng": 99.97464,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 12:42:55",
        "lat": 2.319363,
        "lng": 99.976302,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 12:43:10",
        "lat": 2.319284,
        "lng": 99.977262,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 12:43:25",
        "lat": 2.318031,
        "lng": 99.97728,
        "speed": 40.0
      },
      {
        "time": "2026-09-08 12:43:45",
        "lat": 2.316041,
        "lng": 99.977342,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 12:44:05",
        "lat": 2.314063,
        "lng": 99.977422,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 12:44:25",
        "lat": 2.312071,
        "lng": 99.977467,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 12:44:45",
        "lat": 2.310294,
        "lng": 99.977538,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 12:45:03",
        "lat": 2.309352,
        "lng": 99.977609,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 12:59:28",
        "lat": 2.309321,
        "lng": 99.977609,
        "speed": 7.0
      },
      {
        "time": "2026-09-08 12:59:42",
        "lat": 2.309964,
        "lng": 99.977556,
        "speed": 24.0
      },
      {
        "time": "2026-09-08 13:00:02",
        "lat": 2.31144,
        "lng": 99.977493,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 13:00:22",
        "lat": 2.312999,
        "lng": 99.97744,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 13:00:42",
        "lat": 2.314656,
        "lng": 99.977396,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 13:01:02",
        "lat": 2.316387,
        "lng": 99.977342,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 13:01:22",
        "lat": 2.318049,
        "lng": 99.97728,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 13:01:41",
        "lat": 2.319371,
        "lng": 99.9772,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 13:01:52",
        "lat": 2.319358,
        "lng": 99.976533,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 13:02:12",
        "lat": 2.319319,
        "lng": 99.974933,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 13:02:32",
        "lat": 2.319292,
        "lng": 99.973271,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 13:02:52",
        "lat": 2.319262,
        "lng": 99.971564,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 13:03:12",
        "lat": 2.319219,
        "lng": 99.96984,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 13:03:32",
        "lat": 2.319193,
        "lng": 99.968062,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 13:03:52",
        "lat": 2.319166,
        "lng": 99.96616,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 13:04:12",
        "lat": 2.319131,
        "lng": 99.964258,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 13:04:32",
        "lat": 2.319097,
        "lng": 99.962302,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 13:04:52",
        "lat": 2.319063,
        "lng": 99.960453,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 13:05:12",
        "lat": 2.319027,
        "lng": 99.958622,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 13:05:32",
        "lat": 2.318999,
        "lng": 99.956702,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 13:05:42",
        "lat": 2.31913,
        "lng": 99.956249,
        "speed": 18.0
      },
      {
        "time": "2026-09-08 13:06:02",
        "lat": 2.320889,
        "lng": 99.956231,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 13:06:22",
        "lat": 2.322759,
        "lng": 99.956187,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 13:06:56",
        "lat": 2.323421,
        "lng": 99.956196,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 13:07:02",
        "lat": 2.323483,
        "lng": 99.956187,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 13:07:22",
        "lat": 2.325201,
        "lng": 99.956169,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 13:07:50",
        "lat": 2.325864,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 13:45:43",
        "lat": 2.325878,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 14:26:17",
        "lat": 2.3259,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:05:08",
        "lat": 2.325816,
        "lng": 99.956187,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 15:05:14",
        "lat": 2.325527,
        "lng": 99.956169,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 15:05:34",
        "lat": 2.323887,
        "lng": 99.956187,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 15:05:54",
        "lat": 2.322346,
        "lng": 99.956213,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 15:06:14",
        "lat": 2.320839,
        "lng": 99.956231,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 15:06:34",
        "lat": 2.319507,
        "lng": 99.956249,
        "speed": 21.0
      },
      {
        "time": "2026-09-08 15:06:48",
        "lat": 2.319031,
        "lng": 99.956471,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 15:07:04",
        "lat": 2.319048,
        "lng": 99.958267,
        "speed": 51.0
      },
      {
        "time": "2026-09-08 15:07:24",
        "lat": 2.319096,
        "lng": 99.961111,
        "speed": 59.0
      },
      {
        "time": "2026-09-08 15:07:44",
        "lat": 2.319141,
        "lng": 99.964027,
        "speed": 56.0
      },
      {
        "time": "2026-09-08 15:08:04",
        "lat": 2.319187,
        "lng": 99.966969,
        "speed": 57.0
      },
      {
        "time": "2026-09-08 15:08:18",
        "lat": 2.318968,
        "lng": 99.96784,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 15:08:34",
        "lat": 2.317152,
        "lng": 99.96784,
        "speed": 56.0
      },
      {
        "time": "2026-09-08 15:08:54",
        "lat": 2.314089,
        "lng": 99.96792,
        "speed": 61.0
      },
      {
        "time": "2026-09-08 15:09:14",
        "lat": 2.310928,
        "lng": 99.967991,
        "speed": 62.0
      },
      {
        "time": "2026-09-08 15:09:34",
        "lat": 2.308887,
        "lng": 99.968018,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 15:09:54",
        "lat": 2.306651,
        "lng": 99.968044,
        "speed": 55.0
      },
      {
        "time": "2026-09-08 15:10:14",
        "lat": 2.303806,
        "lng": 99.968089,
        "speed": 54.0
      },
      {
        "time": "2026-09-08 15:10:30",
        "lat": 2.301856,
        "lng": 99.968116,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 15:10:34",
        "lat": 2.301622,
        "lng": 99.968116,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 15:10:49",
        "lat": 2.300411,
        "lng": 99.968133,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 15:10:55",
        "lat": 2.300086,
        "lng": 99.968151,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 15:11:04",
        "lat": 2.300094,
        "lng": 99.96872,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 15:11:20",
        "lat": 2.300094,
        "lng": 99.96968,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 15:11:24",
        "lat": 2.300067,
        "lng": 99.96984,
        "speed": 15.0
      },
      {
        "time": "2026-09-08 15:11:34",
        "lat": 2.300039,
        "lng": 99.970098,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 15:11:49",
        "lat": 2.300202,
        "lng": 99.970631,
        "speed": 15.0
      },
      {
        "time": "2026-09-08 15:11:53",
        "lat": 2.300365,
        "lng": 99.970631,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 15:12:00",
        "lat": 2.30049,
        "lng": 99.970658,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 15:12:13",
        "lat": 2.300106,
        "lng": 99.970578,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 15:13:04",
        "lat": 2.299967,
        "lng": 99.970036,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 15:13:14",
        "lat": 2.300094,
        "lng": 99.969662,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 15:13:33",
        "lat": 2.29972,
        "lng": 99.969271,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 15:13:44",
        "lat": 2.299329,
        "lng": 99.969369,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 15:13:54",
        "lat": 2.299089,
        "lng": 99.968924,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 15:14:08",
        "lat": 2.299119,
        "lng": 99.968133,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 15:14:24",
        "lat": 2.299729,
        "lng": 99.968133,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 15:14:47",
        "lat": 2.300037,
        "lng": 99.968151,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 15:14:54",
        "lat": 2.300051,
        "lng": 99.968462,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 15:15:38",
        "lat": 2.300049,
        "lng": 99.969173,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:15:44",
        "lat": 2.299889,
        "lng": 99.969191,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 15:15:52",
        "lat": 2.299742,
        "lng": 99.968996,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 15:16:04",
        "lat": 2.299744,
        "lng": 99.968507,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 15:16:14",
        "lat": 2.299843,
        "lng": 99.968151,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 15:16:24",
        "lat": 2.300068,
        "lng": 99.96792,
        "speed": 24.0
      },
      {
        "time": "2026-09-08 15:16:44",
        "lat": 2.300032,
        "lng": 99.966311,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 15:17:04",
        "lat": 2.299992,
        "lng": 99.964471,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 15:17:12",
        "lat": 2.299989,
        "lng": 99.964196,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 15:17:24",
        "lat": 2.30001,
        "lng": 99.964844,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 15:17:44",
        "lat": 2.300046,
        "lng": 99.966969,
        "speed": 47.0
      },
      {
        "time": "2026-09-08 15:18:04",
        "lat": 2.300078,
        "lng": 99.968836,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 15:18:21",
        "lat": 2.300003,
        "lng": 99.969813,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 15:18:27",
        "lat": 2.299992,
        "lng": 99.969813,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:18:58",
        "lat": 2.299991,
        "lng": 99.969813,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:19:40",
        "lat": 2.299994,
        "lng": 99.969813,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:20:07",
        "lat": 2.300097,
        "lng": 99.969769,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 15:20:24",
        "lat": 2.300066,
        "lng": 99.968898,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 15:20:44",
        "lat": 2.300038,
        "lng": 99.967627,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 15:21:04",
        "lat": 2.300006,
        "lng": 99.965964,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 15:21:24",
        "lat": 2.299969,
        "lng": 99.964062,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 15:21:44",
        "lat": 2.299922,
        "lng": 99.962142,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 15:22:04",
        "lat": 2.299887,
        "lng": 99.960133,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 15:22:24",
        "lat": 2.299858,
        "lng": 99.958124,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 15:22:44",
        "lat": 2.299825,
        "lng": 99.956187,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 15:23:04",
        "lat": 2.299782,
        "lng": 99.954258,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 15:23:24",
        "lat": 2.299748,
        "lng": 99.952178,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 15:23:44",
        "lat": 2.299748,
        "lng": 99.950276,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 15:24:04",
        "lat": 2.299606,
        "lng": 99.948231,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 15:24:24",
        "lat": 2.299524,
        "lng": 99.946356,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 15:24:44",
        "lat": 2.299431,
        "lng": 99.94432,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 15:25:04",
        "lat": 2.299338,
        "lng": 99.942187,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 15:25:24",
        "lat": 2.299216,
        "lng": 99.939956,
        "speed": 45.0
      },
      {
        "time": "2026-09-08 15:25:44",
        "lat": 2.299098,
        "lng": 99.93776,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 15:26:04",
        "lat": 2.298986,
        "lng": 99.935591,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 15:26:24",
        "lat": 2.298912,
        "lng": 99.93392,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 15:26:44",
        "lat": 2.298869,
        "lng": 99.932533,
        "speed": 18.0
      },
      {
        "time": "2026-09-08 15:27:04",
        "lat": 2.298919,
        "lng": 99.930693,
        "speed": 46.0
      },
      {
        "time": "2026-09-08 15:27:24",
        "lat": 2.298998,
        "lng": 99.928293,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 15:27:44",
        "lat": 2.29897,
        "lng": 99.926124,
        "speed": 42.0
      },
      {
        "time": "2026-09-08 15:28:04",
        "lat": 2.298946,
        "lng": 99.924071,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 15:28:24",
        "lat": 2.298896,
        "lng": 99.922151,
        "speed": 42.0
      },
      {
        "time": "2026-09-08 15:28:44",
        "lat": 2.298842,
        "lng": 99.919822,
        "speed": 51.0
      },
      {
        "time": "2026-09-08 15:29:04",
        "lat": 2.298814,
        "lng": 99.917209,
        "speed": 50.0
      },
      {
        "time": "2026-09-08 15:29:24",
        "lat": 2.298743,
        "lng": 99.914533,
        "speed": 54.0
      },
      {
        "time": "2026-09-08 15:29:44",
        "lat": 2.298699,
        "lng": 99.911867,
        "speed": 54.0
      },
      {
        "time": "2026-09-08 15:30:04",
        "lat": 2.298563,
        "lng": 99.909698,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 15:30:06",
        "lat": 2.298574,
        "lng": 99.909564,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 15:30:26",
        "lat": 2.298721,
        "lng": 99.909404,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:30:34",
        "lat": 2.29879,
        "lng": 99.909351,
        "speed": 10.0
      },
      {
        "time": "2026-09-08 15:31:03",
        "lat": 2.298816,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 17:00:05",
        "lat": 2.29937,
        "lng": 99.909458,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 17:00:13",
        "lat": 2.299725,
        "lng": 99.909467,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 17:00:23",
        "lat": 2.300059,
        "lng": 99.909636,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 17:00:35",
        "lat": 2.300348,
        "lng": 99.910044,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 17:01:06",
        "lat": 2.300534,
        "lng": 99.91032,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 17:02:21",
        "lat": 2.30055,
        "lng": 99.910329,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 17:02:34",
        "lat": 2.300496,
        "lng": 99.91024,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 17:02:45",
        "lat": 2.300182,
        "lng": 99.909831,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 17:02:51",
        "lat": 2.300093,
        "lng": 99.909618,
        "speed": 7.0
      },
      {
        "time": "2026-09-08 17:03:32",
        "lat": 2.29986,
        "lng": 99.909511,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 17:03:50",
        "lat": 2.299847,
        "lng": 99.909493,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 17:04:25",
        "lat": 2.29969,
        "lng": 99.909493,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 17:04:45",
        "lat": 2.299153,
        "lng": 99.909538,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 17:05:55",
        "lat": 2.298623,
        "lng": 99.909813,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 17:06:15",
        "lat": 2.298765,
        "lng": 99.909378,
        "speed": 10.0
      },
      {
        "time": "2026-09-08 17:06:44",
        "lat": 2.298824,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 21:58:47",
        "lat": 2.298783,
        "lng": 99.909582,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 21:59:10",
        "lat": 2.298803,
        "lng": 99.909636,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 21:59:24",
        "lat": 2.298729,
        "lng": 99.909947,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 21:59:27",
        "lat": 2.298734,
        "lng": 99.910071,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 21:59:56",
        "lat": 2.298678,
        "lng": 99.910747,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 22:00:16",
        "lat": 2.298677,
        "lng": 99.911911,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 22:00:36",
        "lat": 2.298687,
        "lng": 99.9132,
        "speed": 24.0
      },
      {
        "time": "2026-09-08 22:00:56",
        "lat": 2.298709,
        "lng": 99.914418,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 22:01:16",
        "lat": 2.298719,
        "lng": 99.91576,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:01:36",
        "lat": 2.298751,
        "lng": 99.917156,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:01:46",
        "lat": 2.298778,
        "lng": 99.917822,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 22:01:57",
        "lat": 2.298797,
        "lng": 99.918542,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 22:02:06",
        "lat": 2.298812,
        "lng": 99.919147,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 22:02:16",
        "lat": 2.298823,
        "lng": 99.919804,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:02:25",
        "lat": 2.298832,
        "lng": 99.920409,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:02:36",
        "lat": 2.298862,
        "lng": 99.921173,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 22:02:42",
        "lat": 2.298862,
        "lng": 99.921582,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:02:49",
        "lat": 2.298881,
        "lng": 99.922071,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:03:00",
        "lat": 2.298901,
        "lng": 99.922818,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:03:06",
        "lat": 2.298907,
        "lng": 99.923244,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:03:26",
        "lat": 2.298937,
        "lng": 99.924604,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:03:46",
        "lat": 2.298948,
        "lng": 99.926027,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:04:06",
        "lat": 2.298973,
        "lng": 99.927458,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:04:26",
        "lat": 2.299002,
        "lng": 99.928889,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:04:36",
        "lat": 2.298962,
        "lng": 99.9296,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:04:56",
        "lat": 2.298883,
        "lng": 99.93104,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:05:06",
        "lat": 2.298861,
        "lng": 99.931742,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:05:16",
        "lat": 2.298856,
        "lng": 99.932391,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 22:05:20",
        "lat": 2.298836,
        "lng": 99.932516,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 22:05:26",
        "lat": 2.298812,
        "lng": 99.932507,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 22:06:48",
        "lat": 2.298807,
        "lng": 99.932489,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 22:07:16",
        "lat": 2.298837,
        "lng": 99.93312,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 22:07:36",
        "lat": 2.298937,
        "lng": 99.934373,
        "speed": 24.0
      },
      {
        "time": "2026-09-08 22:07:56",
        "lat": 2.298964,
        "lng": 99.935778,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 22:08:16",
        "lat": 2.299049,
        "lng": 99.937369,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 22:08:36",
        "lat": 2.29912,
        "lng": 99.939093,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 22:08:56",
        "lat": 2.299219,
        "lng": 99.940747,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 22:09:16",
        "lat": 2.299296,
        "lng": 99.942302,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 22:09:36",
        "lat": 2.299356,
        "lng": 99.943876,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 22:09:56",
        "lat": 2.299441,
        "lng": 99.945476,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 22:10:16",
        "lat": 2.299501,
        "lng": 99.947067,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 22:10:36",
        "lat": 2.299621,
        "lng": 99.948604,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 22:10:56",
        "lat": 2.299729,
        "lng": 99.950196,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 22:11:16",
        "lat": 2.299729,
        "lng": 99.951822,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 22:11:36",
        "lat": 2.299761,
        "lng": 99.953467,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 22:11:56",
        "lat": 2.299781,
        "lng": 99.95512,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 22:12:16",
        "lat": 2.29986,
        "lng": 99.956471,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 22:12:36",
        "lat": 2.301289,
        "lng": 99.956462,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 22:12:56",
        "lat": 2.303131,
        "lng": 99.956462,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 22:13:16",
        "lat": 2.305036,
        "lng": 99.956444,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 22:13:36",
        "lat": 2.30687,
        "lng": 99.956427,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 22:13:56",
        "lat": 2.308679,
        "lng": 99.956409,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 22:14:16",
        "lat": 2.31039,
        "lng": 99.956382,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 22:14:36",
        "lat": 2.312253,
        "lng": 99.956364,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 22:14:56",
        "lat": 2.314091,
        "lng": 99.956329,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 22:15:16",
        "lat": 2.315895,
        "lng": 99.956311,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 22:15:36",
        "lat": 2.317723,
        "lng": 99.956284,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 22:15:56",
        "lat": 2.319561,
        "lng": 99.956249,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 22:16:16",
        "lat": 2.321363,
        "lng": 99.956231,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 22:16:36",
        "lat": 2.323144,
        "lng": 99.956196,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 22:16:56",
        "lat": 2.324937,
        "lng": 99.956187,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 22:17:21",
        "lat": 2.326003,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 22:17:51",
        "lat": 2.325998,
        "lng": 99.956151,
        "speed": 0.0
      }
    ]
  },
  "2026-09-09__V-JAR-01": {
    "date": "2026-09-09",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-09 05:09:21",
        "lat": 2.325998,
        "lng": 99.956151,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:14:21",
        "lat": 2.325998,
        "lng": 99.956151,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:19:22",
        "lat": 2.325998,
        "lng": 99.956151,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:24:23",
        "lat": 2.325998,
        "lng": 99.956151,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:39:53",
        "lat": 2.325909,
        "lng": 99.957102,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:39:58",
        "lat": 2.325909,
        "lng": 99.957102,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:40:25",
        "lat": 2.325917,
        "lng": 99.957191,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:46:50",
        "lat": 2.325944,
        "lng": 99.957262,
        "speed": 4.0
      },
      {
        "time": "2026-09-09 05:47:01",
        "lat": 2.325932,
        "lng": 99.957307,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:47:10",
        "lat": 2.325932,
        "lng": 99.957191,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 05:47:14",
        "lat": 2.325926,
        "lng": 99.957129,
        "speed": 8.0
      },
      {
        "time": "2026-09-09 05:47:15",
        "lat": 2.325926,
        "lng": 99.957102,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 05:47:24",
        "lat": 2.325937,
        "lng": 99.956853,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 05:47:34",
        "lat": 2.325939,
        "lng": 99.956542,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 05:47:44",
        "lat": 2.325932,
        "lng": 99.956231,
        "speed": 8.0
      },
      {
        "time": "2026-09-09 05:47:50",
        "lat": 2.326008,
        "lng": 99.956187,
        "speed": 5.0
      },
      {
        "time": "2026-09-09 05:48:12",
        "lat": 2.326032,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 06:26:12",
        "lat": 2.325982,
        "lng": 99.956187,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 06:26:22",
        "lat": 2.325658,
        "lng": 99.956151,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 06:26:32",
        "lat": 2.324963,
        "lng": 99.956169,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 06:26:42",
        "lat": 2.32415,
        "lng": 99.956187,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 06:26:52",
        "lat": 2.323309,
        "lng": 99.956196,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 06:27:02",
        "lat": 2.322398,
        "lng": 99.956213,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 06:27:12",
        "lat": 2.321447,
        "lng": 99.956213,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 06:27:22",
        "lat": 2.320588,
        "lng": 99.956249,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 06:27:32",
        "lat": 2.319838,
        "lng": 99.956231,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 06:27:42",
        "lat": 2.319057,
        "lng": 99.956249,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 06:27:46",
        "lat": 2.318988,
        "lng": 99.956347,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 06:27:52",
        "lat": 2.319005,
        "lng": 99.956702,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 06:28:02",
        "lat": 2.319013,
        "lng": 99.9576,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 06:28:12",
        "lat": 2.319031,
        "lng": 99.958658,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 06:28:22",
        "lat": 2.319057,
        "lng": 99.959716,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 06:28:32",
        "lat": 2.319074,
        "lng": 99.960809,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 06:28:42",
        "lat": 2.319093,
        "lng": 99.961902,
        "speed": 44.0
      },
      {
        "time": "2026-09-09 06:28:52",
        "lat": 2.319113,
        "lng": 99.963004,
        "speed": 45.0
      },
      {
        "time": "2026-09-09 06:29:02",
        "lat": 2.319128,
        "lng": 99.964116,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 06:29:12",
        "lat": 2.319141,
        "lng": 99.9652,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 06:29:22",
        "lat": 2.319164,
        "lng": 99.966267,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 06:29:32",
        "lat": 2.319179,
        "lng": 99.967351,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 06:29:41",
        "lat": 2.319106,
        "lng": 99.967858,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 06:29:42",
        "lat": 2.319054,
        "lng": 99.967858,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 06:29:52",
        "lat": 2.318132,
        "lng": 99.96784,
        "speed": 47.0
      },
      {
        "time": "2026-09-09 06:30:02",
        "lat": 2.316935,
        "lng": 99.967858,
        "speed": 49.0
      },
      {
        "time": "2026-09-09 06:30:12",
        "lat": 2.315708,
        "lng": 99.967884,
        "speed": 48.0
      },
      {
        "time": "2026-09-09 06:30:22",
        "lat": 2.314502,
        "lng": 99.96792,
        "speed": 47.0
      },
      {
        "time": "2026-09-09 06:30:32",
        "lat": 2.313326,
        "lng": 99.967938,
        "speed": 46.0
      },
      {
        "time": "2026-09-09 06:30:42",
        "lat": 2.312159,
        "lng": 99.967973,
        "speed": 44.0
      },
      {
        "time": "2026-09-09 06:30:52",
        "lat": 2.310991,
        "lng": 99.967991,
        "speed": 46.0
      },
      {
        "time": "2026-09-09 06:31:02",
        "lat": 2.310043,
        "lng": 99.968,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 06:31:12",
        "lat": 2.309113,
        "lng": 99.968018,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 06:31:22",
        "lat": 2.308479,
        "lng": 99.968036,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 06:31:32",
        "lat": 2.307488,
        "lng": 99.968036,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 06:31:42",
        "lat": 2.306447,
        "lng": 99.968044,
        "speed": 42.0
      },
      {
        "time": "2026-09-09 06:31:52",
        "lat": 2.305399,
        "lng": 99.968044,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 06:32:02",
        "lat": 2.304327,
        "lng": 99.968089,
        "speed": 42.0
      },
      {
        "time": "2026-09-09 06:32:12",
        "lat": 2.303249,
        "lng": 99.968098,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 06:32:22",
        "lat": 2.302187,
        "lng": 99.968116,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 06:32:32",
        "lat": 2.301099,
        "lng": 99.968116,
        "speed": 42.0
      },
      {
        "time": "2026-09-09 06:32:42",
        "lat": 2.30021,
        "lng": 99.968133,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 06:32:52",
        "lat": 2.299793,
        "lng": 99.968133,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 06:32:56",
        "lat": 2.29969,
        "lng": 99.968231,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 06:33:02",
        "lat": 2.299706,
        "lng": 99.968551,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 06:33:09",
        "lat": 2.299613,
        "lng": 99.968702,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 06:33:12",
        "lat": 2.299551,
        "lng": 99.96872,
        "speed": 7.0
      },
      {
        "time": "2026-09-09 06:33:18",
        "lat": 2.299553,
        "lng": 99.968836,
        "speed": 5.0
      },
      {
        "time": "2026-09-09 06:33:40",
        "lat": 2.299559,
        "lng": 99.968862,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 07:03:20",
        "lat": 2.299586,
        "lng": 99.96896,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 07:03:30",
        "lat": 2.299672,
        "lng": 99.968818,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 07:03:40",
        "lat": 2.299671,
        "lng": 99.968462,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 07:03:48",
        "lat": 2.299756,
        "lng": 99.968231,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 07:03:50",
        "lat": 2.299831,
        "lng": 99.968231,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 07:03:57",
        "lat": 2.300028,
        "lng": 99.968133,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 07:04:00",
        "lat": 2.30003,
        "lng": 99.967991,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 07:04:10",
        "lat": 2.300023,
        "lng": 99.967333,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 07:04:20",
        "lat": 2.300005,
        "lng": 99.966569,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 07:04:30",
        "lat": 2.299995,
        "lng": 99.965733,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 07:04:40",
        "lat": 2.299976,
        "lng": 99.964871,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:04:50",
        "lat": 2.299948,
        "lng": 99.964,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:05:00",
        "lat": 2.299934,
        "lng": 99.963067,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:05:10",
        "lat": 2.299915,
        "lng": 99.96216,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:05:20",
        "lat": 2.299892,
        "lng": 99.9612,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:05:30",
        "lat": 2.299872,
        "lng": 99.96024,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:05:40",
        "lat": 2.299854,
        "lng": 99.959271,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:05:50",
        "lat": 2.299836,
        "lng": 99.958338,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 07:06:00",
        "lat": 2.299828,
        "lng": 99.957404,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:06:10",
        "lat": 2.299816,
        "lng": 99.956444,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:06:20",
        "lat": 2.299804,
        "lng": 99.95552,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:06:30",
        "lat": 2.299778,
        "lng": 99.95456,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:06:40",
        "lat": 2.299764,
        "lng": 99.953609,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:06:50",
        "lat": 2.299736,
        "lng": 99.952649,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:07:00",
        "lat": 2.299722,
        "lng": 99.951707,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:07:10",
        "lat": 2.299741,
        "lng": 99.950782,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 07:07:20",
        "lat": 2.299719,
        "lng": 99.949902,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:07:30",
        "lat": 2.299647,
        "lng": 99.94896,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:07:40",
        "lat": 2.299584,
        "lng": 99.947982,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:07:50",
        "lat": 2.299514,
        "lng": 99.947049,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 07:08:00",
        "lat": 2.299477,
        "lng": 99.946124,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:08:10",
        "lat": 2.299444,
        "lng": 99.945182,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:08:20",
        "lat": 2.299395,
        "lng": 99.944222,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:08:30",
        "lat": 2.299352,
        "lng": 99.943271,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:08:40",
        "lat": 2.299306,
        "lng": 99.942338,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:08:50",
        "lat": 2.299266,
        "lng": 99.94136,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:09:00",
        "lat": 2.299205,
        "lng": 99.940364,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:09:10",
        "lat": 2.299149,
        "lng": 99.939369,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:09:20",
        "lat": 2.299096,
        "lng": 99.938391,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:09:30",
        "lat": 2.29906,
        "lng": 99.937511,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 07:09:40",
        "lat": 2.29903,
        "lng": 99.936596,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:09:50",
        "lat": 2.298961,
        "lng": 99.935627,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:10:00",
        "lat": 2.298954,
        "lng": 99.934711,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 07:10:10",
        "lat": 2.298925,
        "lng": 99.934284,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 07:10:20",
        "lat": 2.298872,
        "lng": 99.933689,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 07:10:30",
        "lat": 2.298853,
        "lng": 99.933173,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 07:10:40",
        "lat": 2.298861,
        "lng": 99.932551,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 07:10:50",
        "lat": 2.298863,
        "lng": 99.931964,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 07:11:00",
        "lat": 2.298892,
        "lng": 99.93112,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 07:11:10",
        "lat": 2.298946,
        "lng": 99.930204,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 07:11:20",
        "lat": 2.298991,
        "lng": 99.929316,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:11:30",
        "lat": 2.299013,
        "lng": 99.928356,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 07:11:40",
        "lat": 2.298991,
        "lng": 99.927404,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:11:50",
        "lat": 2.298982,
        "lng": 99.92648,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:12:00",
        "lat": 2.298972,
        "lng": 99.925556,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 07:12:10",
        "lat": 2.29895,
        "lng": 99.924604,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:12:20",
        "lat": 2.298942,
        "lng": 99.92368,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:12:30",
        "lat": 2.298914,
        "lng": 99.922738,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:12:40",
        "lat": 2.298884,
        "lng": 99.921804,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:12:50",
        "lat": 2.298863,
        "lng": 99.920853,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:13:00",
        "lat": 2.298848,
        "lng": 99.91992,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:13:10",
        "lat": 2.298828,
        "lng": 99.91896,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:13:20",
        "lat": 2.298814,
        "lng": 99.918018,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:13:30",
        "lat": 2.298797,
        "lng": 99.917058,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:13:40",
        "lat": 2.298784,
        "lng": 99.91608,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:13:50",
        "lat": 2.298752,
        "lng": 99.915084,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:14:00",
        "lat": 2.298737,
        "lng": 99.914107,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:14:10",
        "lat": 2.298721,
        "lng": 99.913156,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:14:20",
        "lat": 2.298703,
        "lng": 99.91232,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 07:14:30",
        "lat": 2.298701,
        "lng": 99.911404,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:14:40",
        "lat": 2.298652,
        "lng": 99.91048,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:14:50",
        "lat": 2.298573,
        "lng": 99.909796,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 07:15:00",
        "lat": 2.298642,
        "lng": 99.909404,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 07:15:02",
        "lat": 2.298707,
        "lng": 99.909396,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 07:15:07",
        "lat": 2.298763,
        "lng": 99.909342,
        "speed": 1.0
      },
      {
        "time": "2026-09-09 07:15:19",
        "lat": 2.298786,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 07:15:36",
        "lat": 2.298783,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:06:36",
        "lat": 2.298783,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:09:48",
        "lat": 2.298711,
        "lng": 99.910649,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 14:09:58",
        "lat": 2.298717,
        "lng": 99.911004,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 14:10:08",
        "lat": 2.298728,
        "lng": 99.911422,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 14:10:18",
        "lat": 2.29873,
        "lng": 99.911867,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 14:10:28",
        "lat": 2.298738,
        "lng": 99.912364,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 14:10:38",
        "lat": 2.298753,
        "lng": 99.912924,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 14:10:48",
        "lat": 2.298759,
        "lng": 99.913458,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 14:10:58",
        "lat": 2.298768,
        "lng": 99.913947,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 14:11:08",
        "lat": 2.298782,
        "lng": 99.91448,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:11:18",
        "lat": 2.298793,
        "lng": 99.915058,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:11:28",
        "lat": 2.298798,
        "lng": 99.915627,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 14:11:36",
        "lat": 2.298783,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:11:38",
        "lat": 2.298812,
        "lng": 99.916213,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 14:11:48",
        "lat": 2.298822,
        "lng": 99.916836,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 14:11:58",
        "lat": 2.298836,
        "lng": 99.917449,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 14:12:08",
        "lat": 2.298853,
        "lng": 99.918098,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:12:18",
        "lat": 2.298867,
        "lng": 99.918773,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:12:28",
        "lat": 2.298887,
        "lng": 99.919449,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:12:38",
        "lat": 2.298899,
        "lng": 99.920124,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 14:12:48",
        "lat": 2.298911,
        "lng": 99.9208,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:12:58",
        "lat": 2.298923,
        "lng": 99.921502,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:13:08",
        "lat": 2.298936,
        "lng": 99.922169,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:13:18",
        "lat": 2.298956,
        "lng": 99.922782,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:13:28",
        "lat": 2.298971,
        "lng": 99.92344,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:13:38",
        "lat": 2.298993,
        "lng": 99.924107,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 14:13:48",
        "lat": 2.299,
        "lng": 99.924773,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 14:13:58",
        "lat": 2.29901,
        "lng": 99.92544,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 14:14:08",
        "lat": 2.299017,
        "lng": 99.926142,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:14:18",
        "lat": 2.299023,
        "lng": 99.926844,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:14:28",
        "lat": 2.299033,
        "lng": 99.927573,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:14:38",
        "lat": 2.299051,
        "lng": 99.92832,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:14:48",
        "lat": 2.299046,
        "lng": 99.929084,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:14:58",
        "lat": 2.298999,
        "lng": 99.929831,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:15:08",
        "lat": 2.298957,
        "lng": 99.930596,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:15:18",
        "lat": 2.298927,
        "lng": 99.931369,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:15:28",
        "lat": 2.298913,
        "lng": 99.932098,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:15:36",
        "lat": 2.298782,
        "lng": 99.9324,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 14:15:38",
        "lat": 2.298671,
        "lng": 99.932391,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 14:15:48",
        "lat": 2.298136,
        "lng": 99.932356,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 14:15:52",
        "lat": 2.29808,
        "lng": 99.932507,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 14:15:58",
        "lat": 2.298091,
        "lng": 99.932818,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:16:08",
        "lat": 2.298162,
        "lng": 99.933191,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 14:16:12",
        "lat": 2.298314,
        "lng": 99.933253,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 14:16:18",
        "lat": 2.298472,
        "lng": 99.933333,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 14:16:27",
        "lat": 2.298504,
        "lng": 99.933511,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:16:37",
        "lat": 2.298783,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:16:46",
        "lat": 2.298506,
        "lng": 99.933511,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:20:22",
        "lat": 2.298496,
        "lng": 99.933467,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 14:20:25",
        "lat": 2.298485,
        "lng": 99.933378,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 14:20:31",
        "lat": 2.298591,
        "lng": 99.933253,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 14:20:35",
        "lat": 2.298732,
        "lng": 99.933218,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 14:20:42",
        "lat": 2.298868,
        "lng": 99.933316,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 14:20:45",
        "lat": 2.298887,
        "lng": 99.933431,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 14:20:55",
        "lat": 2.298924,
        "lng": 99.933982,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 14:21:05",
        "lat": 2.29898,
        "lng": 99.934551,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 14:21:15",
        "lat": 2.299004,
        "lng": 99.935156,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:21:25",
        "lat": 2.299004,
        "lng": 99.935858,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:21:35",
        "lat": 2.299058,
        "lng": 99.936596,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:21:39",
        "lat": 2.298783,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:21:45",
        "lat": 2.299091,
        "lng": 99.937342,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:21:55",
        "lat": 2.29912,
        "lng": 99.938089,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:22:05",
        "lat": 2.299149,
        "lng": 99.938836,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:22:15",
        "lat": 2.299196,
        "lng": 99.9396,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:22:25",
        "lat": 2.299248,
        "lng": 99.940364,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:22:35",
        "lat": 2.299288,
        "lng": 99.941129,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:22:45",
        "lat": 2.299326,
        "lng": 99.941911,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:22:55",
        "lat": 2.299362,
        "lng": 99.942693,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:23:05",
        "lat": 2.299393,
        "lng": 99.94344,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:23:15",
        "lat": 2.299423,
        "lng": 99.944187,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:23:25",
        "lat": 2.299468,
        "lng": 99.944942,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:23:35",
        "lat": 2.299505,
        "lng": 99.945716,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:23:45",
        "lat": 2.299534,
        "lng": 99.946453,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:23:55",
        "lat": 2.29957,
        "lng": 99.947236,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:24:05",
        "lat": 2.299632,
        "lng": 99.948,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:24:15",
        "lat": 2.299687,
        "lng": 99.9488,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 14:24:25",
        "lat": 2.299738,
        "lng": 99.949609,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 14:24:35",
        "lat": 2.299785,
        "lng": 99.950356,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 14:24:45",
        "lat": 2.299849,
        "lng": 99.9508,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 14:24:55",
        "lat": 2.300461,
        "lng": 99.950827,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:25:05",
        "lat": 2.301242,
        "lng": 99.950898,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 14:25:15",
        "lat": 2.302035,
        "lng": 99.951013,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 14:25:25",
        "lat": 2.302832,
        "lng": 99.951084,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:25:35",
        "lat": 2.303599,
        "lng": 99.951156,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:25:45",
        "lat": 2.304369,
        "lng": 99.951218,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:25:55",
        "lat": 2.305163,
        "lng": 99.951271,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:26:05",
        "lat": 2.305936,
        "lng": 99.951333,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:26:15",
        "lat": 2.306385,
        "lng": 99.951511,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 14:26:25",
        "lat": 2.306377,
        "lng": 99.952151,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:26:35",
        "lat": 2.306364,
        "lng": 99.952853,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:26:45",
        "lat": 2.306343,
        "lng": 99.953502,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 14:26:55",
        "lat": 2.306294,
        "lng": 99.954151,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:27:05",
        "lat": 2.306252,
        "lng": 99.954836,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 14:27:10",
        "lat": 2.306361,
        "lng": 99.955049,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 14:27:15",
        "lat": 2.306634,
        "lng": 99.955067,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 14:27:25",
        "lat": 2.307296,
        "lng": 99.955049,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:27:35",
        "lat": 2.308013,
        "lng": 99.955013,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:27:45",
        "lat": 2.308637,
        "lng": 99.954978,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 14:27:52",
        "lat": 2.308874,
        "lng": 99.955067,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 14:27:55",
        "lat": 2.308909,
        "lng": 99.955173,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 14:28:05",
        "lat": 2.308908,
        "lng": 99.955778,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 14:28:15",
        "lat": 2.308906,
        "lng": 99.956311,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 14:28:19",
        "lat": 2.309036,
        "lng": 99.956364,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:28:25",
        "lat": 2.309442,
        "lng": 99.956364,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:28:35",
        "lat": 2.310216,
        "lng": 99.956347,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:28:55",
        "lat": 2.310382,
        "lng": 99.956347,
        "speed": 8.0
      },
      {
        "time": "2026-09-09 14:29:05",
        "lat": 2.310939,
        "lng": 99.956347,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:29:15",
        "lat": 2.311811,
        "lng": 99.956347,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 14:29:25",
        "lat": 2.312754,
        "lng": 99.956329,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 14:29:35",
        "lat": 2.313809,
        "lng": 99.956329,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:29:45",
        "lat": 2.314925,
        "lng": 99.956311,
        "speed": 44.0
      },
      {
        "time": "2026-09-09 14:29:55",
        "lat": 2.316032,
        "lng": 99.956302,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:30:05",
        "lat": 2.317092,
        "lng": 99.956284,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:30:15",
        "lat": 2.318164,
        "lng": 99.956267,
        "speed": 42.0
      },
      {
        "time": "2026-09-09 14:30:25",
        "lat": 2.319208,
        "lng": 99.956249,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 14:30:35",
        "lat": 2.320292,
        "lng": 99.956231,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:30:45",
        "lat": 2.321387,
        "lng": 99.956213,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:30:55",
        "lat": 2.322469,
        "lng": 99.956196,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:31:05",
        "lat": 2.32353,
        "lng": 99.956187,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 14:31:15",
        "lat": 2.324569,
        "lng": 99.956187,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:31:25",
        "lat": 2.325551,
        "lng": 99.956169,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:31:36",
        "lat": 2.326036,
        "lng": 99.956169,
        "speed": 4.0
      },
      {
        "time": "2026-09-09 14:31:58",
        "lat": 2.326047,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 15:09:49",
        "lat": 2.326061,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:26:30",
        "lat": 2.326044,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:27:33",
        "lat": 2.326039,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:28:03",
        "lat": 2.325827,
        "lng": 99.956151,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 16:28:06",
        "lat": 2.325712,
        "lng": 99.956151,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 16:28:16",
        "lat": 2.325122,
        "lng": 99.956151,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 16:28:26",
        "lat": 2.324311,
        "lng": 99.956187,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 16:28:36",
        "lat": 2.323336,
        "lng": 99.956187,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 16:28:46",
        "lat": 2.322335,
        "lng": 99.956196,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 16:28:56",
        "lat": 2.321334,
        "lng": 99.956213,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 16:29:06",
        "lat": 2.320309,
        "lng": 99.956231,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 16:29:16",
        "lat": 2.319366,
        "lng": 99.956231,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 16:29:25",
        "lat": 2.318988,
        "lng": 99.956311,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 16:29:26",
        "lat": 2.318991,
        "lng": 99.956364,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:29:36",
        "lat": 2.319013,
        "lng": 99.957147,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 16:29:46",
        "lat": 2.319023,
        "lng": 99.958124,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 16:29:56",
        "lat": 2.319045,
        "lng": 99.959147,
        "speed": 42.0
      },
      {
        "time": "2026-09-09 16:30:06",
        "lat": 2.319058,
        "lng": 99.960222,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 16:30:16",
        "lat": 2.319076,
        "lng": 99.961324,
        "speed": 46.0
      },
      {
        "time": "2026-09-09 16:30:26",
        "lat": 2.319103,
        "lng": 99.962649,
        "speed": 52.0
      },
      {
        "time": "2026-09-09 16:30:36",
        "lat": 2.319122,
        "lng": 99.963884,
        "speed": 51.0
      },
      {
        "time": "2026-09-09 16:30:46",
        "lat": 2.319141,
        "lng": 99.965218,
        "speed": 53.0
      },
      {
        "time": "2026-09-09 16:30:56",
        "lat": 2.319169,
        "lng": 99.966569,
        "speed": 53.0
      },
      {
        "time": "2026-09-09 16:31:06",
        "lat": 2.319189,
        "lng": 99.96784,
        "speed": 47.0
      },
      {
        "time": "2026-09-09 16:31:16",
        "lat": 2.319206,
        "lng": 99.969076,
        "speed": 50.0
      },
      {
        "time": "2026-09-09 16:31:26",
        "lat": 2.319233,
        "lng": 99.970258,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 16:31:36",
        "lat": 2.319253,
        "lng": 99.971351,
        "speed": 45.0
      },
      {
        "time": "2026-09-09 16:31:46",
        "lat": 2.319283,
        "lng": 99.972444,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 16:31:56",
        "lat": 2.319291,
        "lng": 99.973076,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 16:32:06",
        "lat": 2.319302,
        "lng": 99.97368,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:32:16",
        "lat": 2.319313,
        "lng": 99.974293,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 16:32:26",
        "lat": 2.319317,
        "lng": 99.974871,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 16:32:35",
        "lat": 2.319429,
        "lng": 99.975147,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 16:32:36",
        "lat": 2.319469,
        "lng": 99.975147,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 16:32:46",
        "lat": 2.320026,
        "lng": 99.975111,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:32:56",
        "lat": 2.320705,
        "lng": 99.975093,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 16:33:06",
        "lat": 2.321429,
        "lng": 99.975084,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 16:33:22",
        "lat": 2.321804,
        "lng": 99.975084,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 16:33:26",
        "lat": 2.321649,
        "lng": 99.975084,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 16:34:06",
        "lat": 2.321581,
        "lng": 99.975084,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 16:34:16",
        "lat": 2.322026,
        "lng": 99.975067,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:34:26",
        "lat": 2.322653,
        "lng": 99.975049,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 16:34:36",
        "lat": 2.323394,
        "lng": 99.975049,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 16:34:46",
        "lat": 2.324172,
        "lng": 99.975031,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 16:34:56",
        "lat": 2.324944,
        "lng": 99.975013,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 16:35:06",
        "lat": 2.325448,
        "lng": 99.974996,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 16:35:13",
        "lat": 2.325709,
        "lng": 99.974996,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 16:35:31",
        "lat": 2.325776,
        "lng": 99.975013,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:42:13",
        "lat": 2.325891,
        "lng": 99.975013,
        "speed": 5.0
      },
      {
        "time": "2026-09-09 16:42:16",
        "lat": 2.325901,
        "lng": 99.974996,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:42:19",
        "lat": 2.3259,
        "lng": 99.974996,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:43:36",
        "lat": 2.325893,
        "lng": 99.974996,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:43:44",
        "lat": 2.325893,
        "lng": 99.974996,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:43:45",
        "lat": 2.325893,
        "lng": 99.974996,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:43:48",
        "lat": 2.325859,
        "lng": 99.974987,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 16:43:49",
        "lat": 2.325839,
        "lng": 99.974996,
        "speed": 8.0
      },
      {
        "time": "2026-09-09 16:43:52",
        "lat": 2.325768,
        "lng": 99.974996,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 16:43:53",
        "lat": 2.325733,
        "lng": 99.974996,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 16:43:57",
        "lat": 2.325581,
        "lng": 99.974996,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 16:43:58",
        "lat": 2.325536,
        "lng": 99.974996,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 16:44:00",
        "lat": 2.325448,
        "lng": 99.974996,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 16:44:07",
        "lat": 2.325135,
        "lng": 99.974996,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 16:44:08",
        "lat": 2.325092,
        "lng": 99.974996,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 16:44:10",
        "lat": 2.325004,
        "lng": 99.975013,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 16:44:17",
        "lat": 2.324839,
        "lng": 99.975013,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:44:21",
        "lat": 2.324838,
        "lng": 99.975013,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:44:24",
        "lat": 2.324783,
        "lng": 99.975013,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 16:44:28",
        "lat": 2.324691,
        "lng": 99.975013,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 16:44:30",
        "lat": 2.324622,
        "lng": 99.975013,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 16:44:32",
        "lat": 2.32455,
        "lng": 99.975013,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 16:44:38",
        "lat": 2.324272,
        "lng": 99.975031,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:44:48",
        "lat": 2.323789,
        "lng": 99.975031,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:44:58",
        "lat": 2.323262,
        "lng": 99.975049,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:45:08",
        "lat": 2.322724,
        "lng": 99.975067,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 16:45:10",
        "lat": 2.322604,
        "lng": 99.975067,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:45:14",
        "lat": 2.32238,
        "lng": 99.975067,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 16:45:18",
        "lat": 2.322145,
        "lng": 99.975084,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:45:28",
        "lat": 2.321528,
        "lng": 99.975093,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:45:36",
        "lat": 2.321031,
        "lng": 99.975111,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:45:38",
        "lat": 2.320907,
        "lng": 99.975093,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:45:39",
        "lat": 2.320843,
        "lng": 99.975093,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 16:45:45",
        "lat": 2.320457,
        "lng": 99.975093,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 16:45:46",
        "lat": 2.320393,
        "lng": 99.975093,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 16:45:48",
        "lat": 2.320264,
        "lng": 99.975093,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 16:45:58",
        "lat": 2.319624,
        "lng": 99.975111,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:46:11",
        "lat": 2.319324,
        "lng": 99.975209,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 16:46:18",
        "lat": 2.319343,
        "lng": 99.975538,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 16:46:23",
        "lat": 2.319344,
        "lng": 99.975813,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:46:25",
        "lat": 2.319346,
        "lng": 99.975947,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 16:46:28",
        "lat": 2.319347,
        "lng": 99.976107,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 16:46:38",
        "lat": 2.319359,
        "lng": 99.976631,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 16:46:48",
        "lat": 2.319367,
        "lng": 99.977182,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 16:47:04",
        "lat": 2.319359,
        "lng": 99.977324,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 16:47:13",
        "lat": 2.319487,
        "lng": 99.977253,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 16:47:15",
        "lat": 2.319579,
        "lng": 99.977253,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:47:18",
        "lat": 2.319747,
        "lng": 99.977227,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 16:47:20",
        "lat": 2.319872,
        "lng": 99.977227,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 16:47:28",
        "lat": 2.320437,
        "lng": 99.977209,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 16:47:38",
        "lat": 2.321213,
        "lng": 99.977182,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 16:47:48",
        "lat": 2.322066,
        "lng": 99.977164,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 16:47:58",
        "lat": 2.322933,
        "lng": 99.977138,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 16:48:08",
        "lat": 2.323775,
        "lng": 99.977093,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 16:48:18",
        "lat": 2.324581,
        "lng": 99.977067,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 16:48:28",
        "lat": 2.325206,
        "lng": 99.977031,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 16:48:38",
        "lat": 2.325639,
        "lng": 99.977022,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 16:49:04",
        "lat": 2.325719,
        "lng": 99.977031,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:56:53",
        "lat": 2.325734,
        "lng": 99.977031,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:57:08",
        "lat": 2.325707,
        "lng": 99.977031,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 16:57:18",
        "lat": 2.325316,
        "lng": 99.977049,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:57:28",
        "lat": 2.324823,
        "lng": 99.977067,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 16:57:38",
        "lat": 2.324203,
        "lng": 99.977084,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 16:57:48",
        "lat": 2.323338,
        "lng": 99.97712,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 16:57:58",
        "lat": 2.322368,
        "lng": 99.977147,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 16:58:08",
        "lat": 2.321429,
        "lng": 99.977182,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 16:58:18",
        "lat": 2.320507,
        "lng": 99.977209,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 16:58:28",
        "lat": 2.319684,
        "lng": 99.977253,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 16:58:37",
        "lat": 2.319367,
        "lng": 99.977342,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 16:58:38",
        "lat": 2.319366,
        "lng": 99.977396,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 16:58:48",
        "lat": 2.319389,
        "lng": 99.978071,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 16:58:58",
        "lat": 2.319399,
        "lng": 99.97896,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 16:59:08",
        "lat": 2.319412,
        "lng": 99.979849,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 16:59:18",
        "lat": 2.319426,
        "lng": 99.980667,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 16:59:28",
        "lat": 2.319447,
        "lng": 99.981573,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 16:59:38",
        "lat": 2.319463,
        "lng": 99.982622,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 16:59:48",
        "lat": 2.319479,
        "lng": 99.983556,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 16:59:58",
        "lat": 2.319444,
        "lng": 99.984302,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 17:00:02",
        "lat": 2.319203,
        "lng": 99.984329,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 17:00:08",
        "lat": 2.318691,
        "lng": 99.984329,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 17:00:13",
        "lat": 2.318375,
        "lng": 99.984329,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 17:00:18",
        "lat": 2.318306,
        "lng": 99.984444,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 17:01:20",
        "lat": 2.318328,
        "lng": 99.984782,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 17:01:50",
        "lat": 2.31833,
        "lng": 99.984782,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 17:01:53",
        "lat": 2.31833,
        "lng": 99.984782,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 17:01:54",
        "lat": 2.318331,
        "lng": 99.984782,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 17:01:57",
        "lat": 2.318332,
        "lng": 99.984791,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 17:02:08",
        "lat": 2.318327,
        "lng": 99.984747,
        "speed": 9.0
      },
      {
        "time": "2026-09-09 17:02:18",
        "lat": 2.318312,
        "lng": 99.984418,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 17:02:23",
        "lat": 2.318398,
        "lng": 99.984329,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 17:02:28",
        "lat": 2.318657,
        "lng": 99.984347,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 17:02:38",
        "lat": 2.319362,
        "lng": 99.984347,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 17:02:42",
        "lat": 2.319482,
        "lng": 99.984249,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 17:02:48",
        "lat": 2.319479,
        "lng": 99.983822,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 17:02:58",
        "lat": 2.319456,
        "lng": 99.982827,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 17:03:08",
        "lat": 2.319447,
        "lng": 99.981733,
        "speed": 45.0
      },
      {
        "time": "2026-09-09 17:03:18",
        "lat": 2.319422,
        "lng": 99.980667,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 17:03:27",
        "lat": 2.319423,
        "lng": 99.980711,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 17:03:28",
        "lat": 2.319423,
        "lng": 99.9808,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 17:03:38",
        "lat": 2.319451,
        "lng": 99.98208,
        "speed": 64.0
      },
      {
        "time": "2026-09-09 17:03:48",
        "lat": 2.319477,
        "lng": 99.98344,
        "speed": 49.0
      },
      {
        "time": "2026-09-09 17:03:58",
        "lat": 2.319434,
        "lng": 99.984329,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 17:04:02",
        "lat": 2.319159,
        "lng": 99.984329,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 17:04:08",
        "lat": 2.318607,
        "lng": 99.984329,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 17:04:14",
        "lat": 2.31838,
        "lng": 99.984347,
        "speed": 3.0
      },
      {
        "time": "2026-09-09 17:04:34",
        "lat": 2.318376,
        "lng": 99.984356,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 18:06:26",
        "lat": 2.318373,
        "lng": 99.984347,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 18:06:39",
        "lat": 2.318424,
        "lng": 99.984329,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 18:06:41",
        "lat": 2.318507,
        "lng": 99.984329,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 18:06:49",
        "lat": 2.319022,
        "lng": 99.984347,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 18:06:51",
        "lat": 2.319159,
        "lng": 99.984347,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 18:06:55",
        "lat": 2.319383,
        "lng": 99.984347,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 18:06:59",
        "lat": 2.319485,
        "lng": 99.984249,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 18:07:01",
        "lat": 2.319485,
        "lng": 99.984133,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 18:07:11",
        "lat": 2.319477,
        "lng": 99.983298,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 18:07:21",
        "lat": 2.319458,
        "lng": 99.982453,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 18:07:31",
        "lat": 2.319451,
        "lng": 99.981591,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 18:07:41",
        "lat": 2.319434,
        "lng": 99.980747,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:07:42",
        "lat": 2.319434,
        "lng": 99.98064,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 18:07:43",
        "lat": 2.319429,
        "lng": 99.980569,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 18:07:51",
        "lat": 2.319409,
        "lng": 99.979938,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 18:08:01",
        "lat": 2.319399,
        "lng": 99.979164,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 18:08:11",
        "lat": 2.319388,
        "lng": 99.978284,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:08:21",
        "lat": 2.319371,
        "lng": 99.977413,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 18:08:31",
        "lat": 2.31936,
        "lng": 99.976631,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 18:08:41",
        "lat": 2.319342,
        "lng": 99.975858,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 18:08:42",
        "lat": 2.319341,
        "lng": 99.97576,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 18:08:43",
        "lat": 2.31934,
        "lng": 99.975689,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 18:08:51",
        "lat": 2.319318,
        "lng": 99.975067,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 18:09:01",
        "lat": 2.319308,
        "lng": 99.974338,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 18:09:03",
        "lat": 2.319313,
        "lng": 99.974187,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 18:09:08",
        "lat": 2.319304,
        "lng": 99.973858,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 18:09:11",
        "lat": 2.319298,
        "lng": 99.973644,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 18:09:21",
        "lat": 2.319278,
        "lng": 99.972969,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 18:09:31",
        "lat": 2.319264,
        "lng": 99.972187,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 18:09:41",
        "lat": 2.319254,
        "lng": 99.971324,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 18:09:51",
        "lat": 2.319238,
        "lng": 99.970524,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 18:10:01",
        "lat": 2.319219,
        "lng": 99.969662,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:10:11",
        "lat": 2.319206,
        "lng": 99.968862,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 18:10:21",
        "lat": 2.319193,
        "lng": 99.968018,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 18:10:31",
        "lat": 2.319179,
        "lng": 99.967111,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 18:10:41",
        "lat": 2.31916,
        "lng": 99.966133,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 18:10:51",
        "lat": 2.319145,
        "lng": 99.965173,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:11:01",
        "lat": 2.319127,
        "lng": 99.964258,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:11:11",
        "lat": 2.319112,
        "lng": 99.96336,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:11:21",
        "lat": 2.319095,
        "lng": 99.962444,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 18:11:31",
        "lat": 2.319076,
        "lng": 99.961493,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 18:11:41",
        "lat": 2.319067,
        "lng": 99.960551,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 18:11:51",
        "lat": 2.319047,
        "lng": 99.959538,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 18:12:01",
        "lat": 2.319023,
        "lng": 99.958613,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 18:12:11",
        "lat": 2.319006,
        "lng": 99.957591,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 18:12:21",
        "lat": 2.318993,
        "lng": 99.956738,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 18:12:31",
        "lat": 2.319039,
        "lng": 99.956267,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 18:14:11",
        "lat": 2.319399,
        "lng": 99.956231,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 18:14:21",
        "lat": 2.31996,
        "lng": 99.956231,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 18:14:31",
        "lat": 2.320591,
        "lng": 99.956231,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 18:14:41",
        "lat": 2.32128,
        "lng": 99.956213,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 18:14:51",
        "lat": 2.321986,
        "lng": 99.956213,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 18:15:01",
        "lat": 2.322687,
        "lng": 99.956196,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 18:15:11",
        "lat": 2.323409,
        "lng": 99.956196,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 18:15:21",
        "lat": 2.324146,
        "lng": 99.956187,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 18:15:31",
        "lat": 2.324873,
        "lng": 99.956169,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 18:15:41",
        "lat": 2.325559,
        "lng": 99.956169,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 18:17:13",
        "lat": 2.326029,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 18:17:30",
        "lat": 2.326029,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 21:56:19",
        "lat": 2.325855,
        "lng": 99.956187,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 21:56:29",
        "lat": 2.325541,
        "lng": 99.956187,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 21:56:39",
        "lat": 2.325114,
        "lng": 99.956187,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 21:56:49",
        "lat": 2.324582,
        "lng": 99.956187,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 21:56:59",
        "lat": 2.323987,
        "lng": 99.956196,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 21:57:09",
        "lat": 2.323323,
        "lng": 99.956196,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 21:57:19",
        "lat": 2.322642,
        "lng": 99.956213,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 21:57:29",
        "lat": 2.321942,
        "lng": 99.956231,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 21:57:39",
        "lat": 2.321236,
        "lng": 99.956231,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 21:57:49",
        "lat": 2.320514,
        "lng": 99.956231,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 21:57:59",
        "lat": 2.319803,
        "lng": 99.956249,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 21:58:09",
        "lat": 2.319069,
        "lng": 99.956249,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 21:58:19",
        "lat": 2.318306,
        "lng": 99.956267,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 21:58:29",
        "lat": 2.317506,
        "lng": 99.956284,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 21:58:39",
        "lat": 2.316703,
        "lng": 99.956302,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 21:58:49",
        "lat": 2.315921,
        "lng": 99.956311,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 21:58:59",
        "lat": 2.315115,
        "lng": 99.956311,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 21:59:09",
        "lat": 2.314295,
        "lng": 99.956329,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 21:59:19",
        "lat": 2.313462,
        "lng": 99.956329,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 21:59:29",
        "lat": 2.31264,
        "lng": 99.956347,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 21:59:39",
        "lat": 2.31178,
        "lng": 99.956347,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 21:59:49",
        "lat": 2.310943,
        "lng": 99.956364,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 21:59:59",
        "lat": 2.310122,
        "lng": 99.956382,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:00:09",
        "lat": 2.309301,
        "lng": 99.9564,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:00:19",
        "lat": 2.308513,
        "lng": 99.956409,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:00:29",
        "lat": 2.307702,
        "lng": 99.956409,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 22:00:39",
        "lat": 2.306893,
        "lng": 99.956427,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:00:49",
        "lat": 2.306231,
        "lng": 99.956427,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 22:00:59",
        "lat": 2.305619,
        "lng": 99.956444,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:01:09",
        "lat": 2.304898,
        "lng": 99.956444,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:01:19",
        "lat": 2.304181,
        "lng": 99.956444,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:01:29",
        "lat": 2.303437,
        "lng": 99.956462,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:01:39",
        "lat": 2.302687,
        "lng": 99.956462,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:01:49",
        "lat": 2.301917,
        "lng": 99.956471,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:01:59",
        "lat": 2.301132,
        "lng": 99.956471,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:02:09",
        "lat": 2.300354,
        "lng": 99.956498,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:02:19",
        "lat": 2.299869,
        "lng": 99.956409,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 22:02:29",
        "lat": 2.299862,
        "lng": 99.955893,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 22:02:39",
        "lat": 2.299848,
        "lng": 99.955289,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 22:02:49",
        "lat": 2.299838,
        "lng": 99.954622,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 22:02:59",
        "lat": 2.299808,
        "lng": 99.953956,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:03:09",
        "lat": 2.299797,
        "lng": 99.953253,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:03:19",
        "lat": 2.29978,
        "lng": 99.952533,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:03:29",
        "lat": 2.299773,
        "lng": 99.95184,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:03:39",
        "lat": 2.299768,
        "lng": 99.951129,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:03:49",
        "lat": 2.299764,
        "lng": 99.950436,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 22:03:59",
        "lat": 2.299728,
        "lng": 99.949751,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:04:09",
        "lat": 2.29969,
        "lng": 99.949022,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:04:19",
        "lat": 2.299628,
        "lng": 99.948284,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:04:29",
        "lat": 2.299586,
        "lng": 99.947582,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:04:39",
        "lat": 2.299548,
        "lng": 99.947022,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 22:04:49",
        "lat": 2.299518,
        "lng": 99.946533,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 22:04:59",
        "lat": 2.299504,
        "lng": 99.945902,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:05:09",
        "lat": 2.299487,
        "lng": 99.945244,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:05:19",
        "lat": 2.299433,
        "lng": 99.944578,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:05:29",
        "lat": 2.299389,
        "lng": 99.943876,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:05:39",
        "lat": 2.299372,
        "lng": 99.943164,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:05:49",
        "lat": 2.299336,
        "lng": 99.94248,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:05:59",
        "lat": 2.299302,
        "lng": 99.941813,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:06:09",
        "lat": 2.299261,
        "lng": 99.941093,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:06:19",
        "lat": 2.299229,
        "lng": 99.940364,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:06:29",
        "lat": 2.299191,
        "lng": 99.939618,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:06:39",
        "lat": 2.299136,
        "lng": 99.938836,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:06:49",
        "lat": 2.299109,
        "lng": 99.938053,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:06:59",
        "lat": 2.299082,
        "lng": 99.937324,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:07:09",
        "lat": 2.299037,
        "lng": 99.936596,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:07:19",
        "lat": 2.298987,
        "lng": 99.935822,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:07:29",
        "lat": 2.298985,
        "lng": 99.935093,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:07:39",
        "lat": 2.298958,
        "lng": 99.934453,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 22:07:49",
        "lat": 2.298901,
        "lng": 99.933938,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 22:07:59",
        "lat": 2.298878,
        "lng": 99.933351,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 22:08:09",
        "lat": 2.298867,
        "lng": 99.932818,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 22:08:19",
        "lat": 2.298882,
        "lng": 99.932347,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 22:08:29",
        "lat": 2.298886,
        "lng": 99.931742,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:08:39",
        "lat": 2.298906,
        "lng": 99.93104,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:08:49",
        "lat": 2.298941,
        "lng": 99.93032,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:08:59",
        "lat": 2.298971,
        "lng": 99.929573,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:09:09",
        "lat": 2.299023,
        "lng": 99.928809,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:09:19",
        "lat": 2.299014,
        "lng": 99.928089,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 22:09:29",
        "lat": 2.298999,
        "lng": 99.927458,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:09:39",
        "lat": 2.298977,
        "lng": 99.926827,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 22:09:49",
        "lat": 2.298978,
        "lng": 99.926204,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:09:59",
        "lat": 2.298977,
        "lng": 99.92552,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:10:09",
        "lat": 2.298954,
        "lng": 99.924871,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:10:19",
        "lat": 2.298956,
        "lng": 99.924204,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:10:29",
        "lat": 2.298938,
        "lng": 99.923502,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:10:39",
        "lat": 2.29893,
        "lng": 99.922764,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:10:49",
        "lat": 2.298903,
        "lng": 99.922036,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:10:59",
        "lat": 2.298882,
        "lng": 99.921289,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:11:09",
        "lat": 2.298865,
        "lng": 99.920524,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:11:19",
        "lat": 2.298854,
        "lng": 99.919804,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:11:29",
        "lat": 2.29883,
        "lng": 99.919093,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:11:39",
        "lat": 2.29882,
        "lng": 99.918347,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:11:49",
        "lat": 2.298807,
        "lng": 99.917564,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:11:59",
        "lat": 2.298786,
        "lng": 99.916764,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:12:09",
        "lat": 2.298767,
        "lng": 99.915973,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:12:19",
        "lat": 2.298752,
        "lng": 99.9152,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:12:29",
        "lat": 2.298736,
        "lng": 99.914418,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:12:39",
        "lat": 2.298724,
        "lng": 99.913618,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:12:49",
        "lat": 2.298725,
        "lng": 99.912809,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:12:59",
        "lat": 2.298708,
        "lng": 99.912027,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:13:09",
        "lat": 2.298706,
        "lng": 99.911182,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 22:17:48",
        "lat": 2.298673,
        "lng": 99.910578,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 22:18:06",
        "lat": 2.298674,
        "lng": 99.910578,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 22:25:37",
        "lat": 2.298999,
        "lng": 99.909564,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 22:25:43",
        "lat": 2.298998,
        "lng": 99.909564,
        "speed": 0.0
      }
    ]
  },
  "2026-09-10__V-JAR-01": {
    "date": "2026-09-10",
    "vehicleId": "V-JAR-01",
    "nopol": "BK 1001 JAR",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-10 05:16:45",
        "lat": 2.298998,
        "lng": 99.909564,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 06:34:33",
        "lat": 2.298989,
        "lng": 99.9096,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 07:25:14",
        "lat": 2.298948,
        "lng": 99.909636,
        "speed": 9.0
      },
      {
        "time": "2026-09-10 07:25:33",
        "lat": 2.298585,
        "lng": 99.91,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 07:28:15",
        "lat": 2.298589,
        "lng": 99.910382,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 07:30:04",
        "lat": 2.298608,
        "lng": 99.909422,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 07:30:49",
        "lat": 2.298702,
        "lng": 99.909396,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 07:31:34",
        "lat": 2.298581,
        "lng": 99.909182,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 07:32:04",
        "lat": 2.297351,
        "lng": 99.90856,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 07:32:44",
        "lat": 2.294064,
        "lng": 99.90816,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 07:33:24",
        "lat": 2.290546,
        "lng": 99.90768,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 07:34:04",
        "lat": 2.288203,
        "lng": 99.906347,
        "speed": 38.0
      },
      {
        "time": "2026-09-10 07:34:44",
        "lat": 2.284745,
        "lng": 99.90352,
        "speed": 44.0
      },
      {
        "time": "2026-09-10 07:35:24",
        "lat": 2.281671,
        "lng": 99.900978,
        "speed": 37.0
      },
      {
        "time": "2026-09-10 07:36:04",
        "lat": 2.278829,
        "lng": 99.898969,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 07:36:44",
        "lat": 2.27704,
        "lng": 99.895787,
        "speed": 41.0
      },
      {
        "time": "2026-09-10 07:37:24",
        "lat": 2.274806,
        "lng": 99.892018,
        "speed": 42.0
      },
      {
        "time": "2026-09-10 07:38:04",
        "lat": 2.272923,
        "lng": 99.888329,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 07:38:44",
        "lat": 2.270605,
        "lng": 99.885156,
        "speed": 41.0
      },
      {
        "time": "2026-09-10 07:39:24",
        "lat": 2.267147,
        "lng": 99.882898,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 07:39:54",
        "lat": 2.264359,
        "lng": 99.881449,
        "speed": 48.0
      },
      {
        "time": "2026-09-10 07:40:20",
        "lat": 2.262209,
        "lng": 99.880302,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 07:43:28",
        "lat": 2.262222,
        "lng": 99.880329,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 07:44:01",
        "lat": 2.262686,
        "lng": 99.880569,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 07:46:24",
        "lat": 2.263337,
        "lng": 99.880844,
        "speed": 41.0
      },
      {
        "time": "2026-09-10 07:47:01",
        "lat": 2.266676,
        "lng": 99.882613,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 07:48:04",
        "lat": 2.267584,
        "lng": 99.883138,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 07:48:34",
        "lat": 2.269292,
        "lng": 99.884507,
        "speed": 33.0
      },
      {
        "time": "2026-09-10 07:49:14",
        "lat": 2.271694,
        "lng": 99.886471,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 07:49:54",
        "lat": 2.273815,
        "lng": 99.889209,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 07:50:34",
        "lat": 2.274949,
        "lng": 99.892791,
        "speed": 37.0
      },
      {
        "time": "2026-09-10 07:51:14",
        "lat": 2.277195,
        "lng": 99.896062,
        "speed": 42.0
      },
      {
        "time": "2026-09-10 07:51:44",
        "lat": 2.278938,
        "lng": 99.898996,
        "speed": 50.0
      },
      {
        "time": "2026-09-10 07:52:24",
        "lat": 2.282376,
        "lng": 99.9016,
        "speed": 38.0
      },
      {
        "time": "2026-09-10 07:53:04",
        "lat": 2.285929,
        "lng": 99.90456,
        "speed": 46.0
      },
      {
        "time": "2026-09-10 07:53:44",
        "lat": 2.289209,
        "lng": 99.907369,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 07:54:14",
        "lat": 2.291743,
        "lng": 99.907813,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 07:54:54",
        "lat": 2.295198,
        "lng": 99.908276,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 07:55:34",
        "lat": 2.298545,
        "lng": 99.908791,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 07:56:01",
        "lat": 2.298836,
        "lng": 99.909751,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 07:56:40",
        "lat": 2.299081,
        "lng": 99.909511,
        "speed": 11.0
      },
      {
        "time": "2026-09-10 13:55:18",
        "lat": 2.298659,
        "lng": 99.909147,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 13:55:48",
        "lat": 2.298751,
        "lng": 99.911031,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 13:56:28",
        "lat": 2.298792,
        "lng": 99.914293,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 13:57:08",
        "lat": 2.29887,
        "lng": 99.918018,
        "speed": 38.0
      },
      {
        "time": "2026-09-10 13:57:58",
        "lat": 2.298908,
        "lng": 99.920311,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 13:58:38",
        "lat": 2.299003,
        "lng": 99.923973,
        "speed": 37.0
      },
      {
        "time": "2026-09-10 13:59:18",
        "lat": 2.299055,
        "lng": 99.927573,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 13:59:58",
        "lat": 2.298945,
        "lng": 99.931316,
        "speed": 38.0
      },
      {
        "time": "2026-09-10 14:00:18",
        "lat": 2.298896,
        "lng": 99.932862,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 14:00:42",
        "lat": 2.299012,
        "lng": 99.934524,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 14:01:18",
        "lat": 2.299137,
        "lng": 99.93672,
        "speed": 9.0
      },
      {
        "time": "2026-09-10 14:02:38",
        "lat": 2.299064,
        "lng": 99.93672,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 14:03:08",
        "lat": 2.299433,
        "lng": 99.934684,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 14:03:48",
        "lat": 2.303848,
        "lng": 99.934684,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 14:04:18",
        "lat": 2.305266,
        "lng": 99.93496,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 14:21:53",
        "lat": 2.305337,
        "lng": 99.935689,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 14:22:11",
        "lat": 2.305194,
        "lng": 99.934702,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 14:22:43",
        "lat": 2.301262,
        "lng": 99.934684,
        "speed": 58.0
      },
      {
        "time": "2026-09-10 14:23:13",
        "lat": 2.299026,
        "lng": 99.935591,
        "speed": 44.0
      },
      {
        "time": "2026-09-10 14:23:43",
        "lat": 2.299256,
        "lng": 99.936756,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 14:25:53",
        "lat": 2.299052,
        "lng": 99.93664,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 14:26:33",
        "lat": 2.298853,
        "lng": 99.933467,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 14:27:33",
        "lat": 2.298524,
        "lng": 99.933529,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 14:28:13",
        "lat": 2.298837,
        "lng": 99.933093,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 14:28:53",
        "lat": 2.298957,
        "lng": 99.934196,
        "speed": 36.0
      },
      {
        "time": "2026-09-10 14:29:27",
        "lat": 2.29914,
        "lng": 99.934667,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 14:29:43",
        "lat": 2.299018,
        "lng": 99.934987,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 14:30:17",
        "lat": 2.299203,
        "lng": 99.936756,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 14:35:13",
        "lat": 2.299172,
        "lng": 99.936756,
        "speed": 8.0
      },
      {
        "time": "2026-09-10 14:35:43",
        "lat": 2.298957,
        "lng": 99.934329,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 14:36:23",
        "lat": 2.298962,
        "lng": 99.930107,
        "speed": 54.0
      },
      {
        "time": "2026-09-10 14:37:03",
        "lat": 2.298998,
        "lng": 99.92456,
        "speed": 49.0
      },
      {
        "time": "2026-09-10 14:37:43",
        "lat": 2.298843,
        "lng": 99.919058,
        "speed": 55.0
      },
      {
        "time": "2026-09-10 14:38:23",
        "lat": 2.298732,
        "lng": 99.913591,
        "speed": 54.0
      },
      {
        "time": "2026-09-10 14:39:02",
        "lat": 2.298736,
        "lng": 99.909396,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 14:48:04",
        "lat": 2.298794,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 15:32:37",
        "lat": 2.298619,
        "lng": 99.909467,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 15:33:17",
        "lat": 2.298744,
        "lng": 99.912267,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 15:33:57",
        "lat": 2.298781,
        "lng": 99.915396,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 15:34:37",
        "lat": 2.298872,
        "lng": 99.918542,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 15:35:17",
        "lat": 2.298937,
        "lng": 99.921716,
        "speed": 31.0
      },
      {
        "time": "2026-09-10 15:35:57",
        "lat": 2.298999,
        "lng": 99.924693,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 15:36:37",
        "lat": 2.299037,
        "lng": 99.927591,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 15:37:17",
        "lat": 2.298954,
        "lng": 99.930667,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 15:37:43",
        "lat": 2.298812,
        "lng": 99.9324,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 15:38:17",
        "lat": 2.297071,
        "lng": 99.932329,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 15:38:57",
        "lat": 2.293961,
        "lng": 99.932196,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 15:39:37",
        "lat": 2.290989,
        "lng": 99.932142,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 15:40:55",
        "lat": 2.289662,
        "lng": 99.932133,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 15:41:17",
        "lat": 2.289829,
        "lng": 99.932178,
        "speed": 9.0
      },
      {
        "time": "2026-09-10 15:42:11",
        "lat": 2.289858,
        "lng": 99.933076,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 15:42:39",
        "lat": 2.289692,
        "lng": 99.932213,
        "speed": 13.0
      },
      {
        "time": "2026-09-10 15:43:27",
        "lat": 2.289741,
        "lng": 99.933529,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 15:44:22",
        "lat": 2.289727,
        "lng": 99.934587,
        "speed": 2.0
      },
      {
        "time": "2026-09-10 15:45:07",
        "lat": 2.291101,
        "lng": 99.93464,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 15:45:47",
        "lat": 2.29279,
        "lng": 99.93464,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 15:46:27",
        "lat": 2.294433,
        "lng": 99.93464,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 15:47:07",
        "lat": 2.296202,
        "lng": 99.934658,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 15:47:47",
        "lat": 2.298144,
        "lng": 99.934667,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 15:48:17",
        "lat": 2.298919,
        "lng": 99.934053,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 15:48:39",
        "lat": 2.298664,
        "lng": 99.933476,
        "speed": 4.0
      },
      {
        "time": "2026-09-10 15:54:41",
        "lat": 2.298527,
        "lng": 99.933742,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 15:55:42",
        "lat": 2.298909,
        "lng": 99.933902,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 15:56:18",
        "lat": 2.299063,
        "lng": 99.936604,
        "speed": 36.0
      },
      {
        "time": "2026-09-10 15:56:58",
        "lat": 2.299764,
        "lng": 99.938933,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 15:57:38",
        "lat": 2.302951,
        "lng": 99.938853,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 15:58:18",
        "lat": 2.306206,
        "lng": 99.938791,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 15:58:30",
        "lat": 2.306817,
        "lng": 99.938791,
        "speed": 6.0
      },
      {
        "time": "2026-09-10 16:11:20",
        "lat": 2.30677,
        "lng": 99.939796,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 16:12:00",
        "lat": 2.306659,
        "lng": 99.94128,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 16:14:34",
        "lat": 2.306582,
        "lng": 99.941609,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 16:15:00",
        "lat": 2.306591,
        "lng": 99.942222,
        "speed": 10.0
      },
      {
        "time": "2026-09-10 16:15:36",
        "lat": 2.306594,
        "lng": 99.943342,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 16:16:10",
        "lat": 2.306574,
        "lng": 99.944436,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 16:16:46",
        "lat": 2.306527,
        "lng": 99.945929,
        "speed": 11.0
      },
      {
        "time": "2026-09-10 16:17:08",
        "lat": 2.306497,
        "lng": 99.946613,
        "speed": 4.0
      },
      {
        "time": "2026-09-10 16:17:20",
        "lat": 2.306549,
        "lng": 99.947004,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 16:17:30",
        "lat": 2.306564,
        "lng": 99.947396,
        "speed": 9.0
      },
      {
        "time": "2026-09-10 16:19:20",
        "lat": 2.304746,
        "lng": 99.947671,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:20:00",
        "lat": 2.301731,
        "lng": 99.947902,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:20:40",
        "lat": 2.299678,
        "lng": 99.948587,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 16:21:20",
        "lat": 2.299765,
        "lng": 99.951218,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 16:22:00",
        "lat": 2.299805,
        "lng": 99.953938,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 16:22:40",
        "lat": 2.299851,
        "lng": 99.956587,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:23:20",
        "lat": 2.299888,
        "lng": 99.959182,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 16:24:00",
        "lat": 2.299947,
        "lng": 99.962044,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 16:24:40",
        "lat": 2.3,
        "lng": 99.964916,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 16:25:20",
        "lat": 2.300054,
        "lng": 99.967742,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 16:26:00",
        "lat": 2.300109,
        "lng": 99.970311,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:26:30",
        "lat": 2.298604,
        "lng": 99.970631,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:26:58",
        "lat": 2.296739,
        "lng": 99.970622,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 16:27:09",
        "lat": 2.296392,
        "lng": 99.970604,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 16:30:09",
        "lat": 2.295675,
        "lng": 99.970604,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 16:30:50",
        "lat": 2.293818,
        "lng": 99.970578,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 16:31:08",
        "lat": 2.292818,
        "lng": 99.970702,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 16:31:40",
        "lat": 2.292687,
        "lng": 99.973076,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 16:32:20",
        "lat": 2.292539,
        "lng": 99.976391,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 16:33:00",
        "lat": 2.292282,
        "lng": 99.979822,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 16:33:40",
        "lat": 2.292041,
        "lng": 99.983182,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:34:10",
        "lat": 2.291554,
        "lng": 99.984418,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 16:34:50",
        "lat": 2.289273,
        "lng": 99.984444,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 16:35:30",
        "lat": 2.286803,
        "lng": 99.984471,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 16:36:20",
        "lat": 2.284798,
        "lng": 99.98488,
        "speed": 8.0
      },
      {
        "time": "2026-09-10 16:36:56",
        "lat": 2.28485,
        "lng": 99.985644,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 16:38:18",
        "lat": 2.284864,
        "lng": 99.985796,
        "speed": 2.0
      },
      {
        "time": "2026-09-10 16:39:20",
        "lat": 2.284802,
        "lng": 99.984836,
        "speed": 8.0
      },
      {
        "time": "2026-09-10 16:39:50",
        "lat": 2.285474,
        "lng": 99.984516,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 16:40:30",
        "lat": 2.287763,
        "lng": 99.984489,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 16:41:10",
        "lat": 2.290258,
        "lng": 99.984462,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 16:41:50",
        "lat": 2.292817,
        "lng": 99.984444,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:42:10",
        "lat": 2.294212,
        "lng": 99.984418,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 16:42:50",
        "lat": 2.297203,
        "lng": 99.984409,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:43:30",
        "lat": 2.300458,
        "lng": 99.984391,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:44:10",
        "lat": 2.303662,
        "lng": 99.984356,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 16:44:50",
        "lat": 2.306654,
        "lng": 99.984347,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 16:45:20",
        "lat": 2.308769,
        "lng": 99.984329,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 16:45:40",
        "lat": 2.309093,
        "lng": 99.983627,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:46:00",
        "lat": 2.309078,
        "lng": 99.982249,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 16:46:40",
        "lat": 2.309053,
        "lng": 99.979262,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:47:20",
        "lat": 2.309004,
        "lng": 99.976444,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:48:00",
        "lat": 2.308998,
        "lng": 99.973476,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:48:40",
        "lat": 2.308967,
        "lng": 99.970302,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 16:49:20",
        "lat": 2.308943,
        "lng": 99.96704,
        "speed": 33.0
      },
      {
        "time": "2026-09-10 16:50:00",
        "lat": 2.308923,
        "lng": 99.963751,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 16:50:44",
        "lat": 2.309092,
        "lng": 99.96104,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 16:51:20",
        "lat": 2.311775,
        "lng": 99.961004,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 16:52:00",
        "lat": 2.315277,
        "lng": 99.960951,
        "speed": 33.0
      },
      {
        "time": "2026-09-10 16:52:40",
        "lat": 2.318674,
        "lng": 99.960907,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 16:53:10",
        "lat": 2.319062,
        "lng": 99.95976,
        "speed": 36.0
      },
      {
        "time": "2026-09-10 17:02:20",
        "lat": 2.319034,
        "lng": 99.958676,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 17:03:00",
        "lat": 2.319088,
        "lng": 99.961573,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 17:03:25",
        "lat": 2.319007,
        "lng": 99.963067,
        "speed": 13.0
      },
      {
        "time": "2026-09-10 17:28:47",
        "lat": 2.318993,
        "lng": 99.963067,
        "speed": 6.0
      },
      {
        "time": "2026-09-10 17:29:16",
        "lat": 2.319101,
        "lng": 99.961769,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 17:29:56",
        "lat": 2.319047,
        "lng": 99.958658,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 17:30:26",
        "lat": 2.320107,
        "lng": 99.958596,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 17:31:06",
        "lat": 2.322153,
        "lng": 99.958578,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 17:31:46",
        "lat": 2.324534,
        "lng": 99.958542,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 17:33:17",
        "lat": 2.325984,
        "lng": 99.958524,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 17:55:59",
        "lat": 2.325328,
        "lng": 99.958498,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 17:56:39",
        "lat": 2.322006,
        "lng": 99.958542,
        "speed": 31.0
      },
      {
        "time": "2026-09-10 17:57:18",
        "lat": 2.319029,
        "lng": 99.958516,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 17:57:46",
        "lat": 2.318836,
        "lng": 99.956249,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 17:58:19",
        "lat": 2.315303,
        "lng": 99.956302,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 17:58:59",
        "lat": 2.310938,
        "lng": 99.956347,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 17:59:39",
        "lat": 2.306599,
        "lng": 99.9564,
        "speed": 46.0
      },
      {
        "time": "2026-09-10 18:00:19",
        "lat": 2.301967,
        "lng": 99.956444,
        "speed": 44.0
      },
      {
        "time": "2026-09-10 18:00:49",
        "lat": 2.299836,
        "lng": 99.95584,
        "speed": 39.0
      },
      {
        "time": "2026-09-10 18:01:29",
        "lat": 2.299757,
        "lng": 99.951573,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 18:02:09",
        "lat": 2.29955,
        "lng": 99.947369,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 18:02:49",
        "lat": 2.299374,
        "lng": 99.943476,
        "speed": 40.0
      },
      {
        "time": "2026-09-10 18:03:29",
        "lat": 2.299182,
        "lng": 99.939716,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 18:04:09",
        "lat": 2.299068,
        "lng": 99.937084,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 18:04:49",
        "lat": 2.298931,
        "lng": 99.934124,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 18:05:21",
        "lat": 2.298496,
        "lng": 99.933369,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 18:09:19",
        "lat": 2.298483,
        "lng": 99.933422,
        "speed": 11.0
      },
      {
        "time": "2026-09-10 18:09:39",
        "lat": 2.298092,
        "lng": 99.932684,
        "speed": 40.0
      },
      {
        "time": "2026-09-10 18:10:19",
        "lat": 2.298117,
        "lng": 99.932373,
        "speed": 31.0
      },
      {
        "time": "2026-09-10 18:10:59",
        "lat": 2.294472,
        "lng": 99.932196,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 18:15:29",
        "lat": 2.294032,
        "lng": 99.932213,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 18:16:02",
        "lat": 2.296801,
        "lng": 99.932302,
        "speed": 36.0
      },
      {
        "time": "2026-09-10 18:20:08",
        "lat": 2.298433,
        "lng": 99.9324,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 18:21:02",
        "lat": 2.298479,
        "lng": 99.933333,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 21:41:18",
        "lat": 2.298792,
        "lng": 99.933218,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 21:41:48",
        "lat": 2.298861,
        "lng": 99.932,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 21:42:28",
        "lat": 2.298948,
        "lng": 99.930044,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 21:43:08",
        "lat": 2.299005,
        "lng": 99.928009,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 21:43:48",
        "lat": 2.298974,
        "lng": 99.925929,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 21:44:28",
        "lat": 2.298938,
        "lng": 99.92384,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 21:45:08",
        "lat": 2.298878,
        "lng": 99.921778,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 21:46:01",
        "lat": 2.298832,
        "lng": 99.920124,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 21:47:08",
        "lat": 2.298798,
        "lng": 99.918,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 21:47:48",
        "lat": 2.298744,
        "lng": 99.915316,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 21:48:28",
        "lat": 2.298693,
        "lng": 99.912551,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 21:49:08",
        "lat": 2.298566,
        "lng": 99.90984,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 22:19:36",
        "lat": 2.298736,
        "lng": 99.909378,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 22:20:07",
        "lat": 2.298538,
        "lng": 99.908773,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 22:20:37",
        "lat": 2.296026,
        "lng": 99.908364,
        "speed": 42.0
      },
      {
        "time": "2026-09-10 22:21:17",
        "lat": 2.292258,
        "lng": 99.907893,
        "speed": 38.0
      },
      {
        "time": "2026-09-10 22:21:57",
        "lat": 2.289384,
        "lng": 99.907538,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 22:22:47",
        "lat": 2.291287,
        "lng": 99.90776,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:23:27",
        "lat": 2.294064,
        "lng": 99.90816,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 22:24:07",
        "lat": 2.296979,
        "lng": 99.908489,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 22:24:37",
        "lat": 2.298574,
        "lng": 99.909049,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 22:32:32",
        "lat": 2.298774,
        "lng": 99.909378,
        "speed": 8.0
      },
      {
        "time": "2026-09-10 22:32:57",
        "lat": 2.298588,
        "lng": 99.909538,
        "speed": 13.0
      },
      {
        "time": "2026-09-10 22:33:22",
        "lat": 2.298417,
        "lng": 99.908693,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 22:34:12",
        "lat": 2.296361,
        "lng": 99.908418,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 22:34:52",
        "lat": 2.294396,
        "lng": 99.908187,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 22:35:32",
        "lat": 2.292692,
        "lng": 99.907956,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 22:38:32",
        "lat": 2.292417,
        "lng": 99.907929,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 22:39:12",
        "lat": 2.294261,
        "lng": 99.908187,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 22:39:52",
        "lat": 2.296417,
        "lng": 99.908436,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 22:40:32",
        "lat": 2.298505,
        "lng": 99.908791,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 22:41:02",
        "lat": 2.298554,
        "lng": 99.910089,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 22:41:42",
        "lat": 2.298695,
        "lng": 99.912587,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:42:22",
        "lat": 2.298741,
        "lng": 99.914693,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 22:43:02",
        "lat": 2.298789,
        "lng": 99.917138,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 22:43:42",
        "lat": 2.298842,
        "lng": 99.919662,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:44:22",
        "lat": 2.298899,
        "lng": 99.922187,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:45:02",
        "lat": 2.298961,
        "lng": 99.924631,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:45:42",
        "lat": 2.298995,
        "lng": 99.926969,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 22:46:22",
        "lat": 2.299001,
        "lng": 99.929333,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 22:46:52",
        "lat": 2.300079,
        "lng": 99.929769,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 22:47:32",
        "lat": 2.302398,
        "lng": 99.930107,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:48:12",
        "lat": 2.304846,
        "lng": 99.930418,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 22:49:22",
        "lat": 2.306841,
        "lng": 99.930631,
        "speed": 11.0
      },
      {
        "time": "2026-09-10 22:50:02",
        "lat": 2.304908,
        "lng": 99.930391,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 22:50:42",
        "lat": 2.302556,
        "lng": 99.93008,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:51:22",
        "lat": 2.300036,
        "lng": 99.929733,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:52:02",
        "lat": 2.297733,
        "lng": 99.929431,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 22:52:42",
        "lat": 2.295111,
        "lng": 99.929084,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 22:53:22",
        "lat": 2.292522,
        "lng": 99.928738,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 22:54:02",
        "lat": 2.289915,
        "lng": 99.928382,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 22:55:02",
        "lat": 2.290859,
        "lng": 99.928551,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:55:42",
        "lat": 2.293399,
        "lng": 99.928889,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 22:56:22",
        "lat": 2.296074,
        "lng": 99.929244,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 22:57:02",
        "lat": 2.29877,
        "lng": 99.929618,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 22:57:32",
        "lat": 2.298878,
        "lng": 99.931138,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 22:58:12",
        "lat": 2.298886,
        "lng": 99.933369,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 22:58:52",
        "lat": 2.298981,
        "lng": 99.935529,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 22:59:32",
        "lat": 2.299122,
        "lng": 99.937991,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:00:02",
        "lat": 2.299796,
        "lng": 99.938933,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:00:42",
        "lat": 2.302269,
        "lng": 99.93888,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 23:01:22",
        "lat": 2.304776,
        "lng": 99.938836,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 23:02:52",
        "lat": 2.306776,
        "lng": 99.938818,
        "speed": 10.0
      },
      {
        "time": "2026-09-10 23:03:32",
        "lat": 2.304713,
        "lng": 99.938818,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 23:04:12",
        "lat": 2.301941,
        "lng": 99.938898,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 23:04:52",
        "lat": 2.299281,
        "lng": 99.938969,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:05:32",
        "lat": 2.296758,
        "lng": 99.939013,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 23:06:12",
        "lat": 2.294325,
        "lng": 99.939076,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 23:06:52",
        "lat": 2.292031,
        "lng": 99.939129,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:08:16",
        "lat": 2.289893,
        "lng": 99.939191,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 23:10:22",
        "lat": 2.290067,
        "lng": 99.939191,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 23:11:02",
        "lat": 2.292083,
        "lng": 99.939129,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 23:11:42",
        "lat": 2.294407,
        "lng": 99.939076,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 23:12:22",
        "lat": 2.296821,
        "lng": 99.939031,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 23:13:02",
        "lat": 2.299107,
        "lng": 99.939067,
        "speed": 13.0
      },
      {
        "time": "2026-09-10 23:13:42",
        "lat": 2.299269,
        "lng": 99.941076,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 23:14:12",
        "lat": 2.297967,
        "lng": 99.941262,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:14:52",
        "lat": 2.295417,
        "lng": 99.941191,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:15:32",
        "lat": 2.29281,
        "lng": 99.941244,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:16:12",
        "lat": 2.290268,
        "lng": 99.941289,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 23:17:12",
        "lat": 2.291531,
        "lng": 99.94128,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:17:52",
        "lat": 2.294018,
        "lng": 99.941244,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:18:32",
        "lat": 2.296687,
        "lng": 99.941244,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:19:12",
        "lat": 2.299239,
        "lng": 99.941387,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 23:19:42",
        "lat": 2.299333,
        "lng": 99.942871,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:20:22",
        "lat": 2.299473,
        "lng": 99.945227,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:21:02",
        "lat": 2.299547,
        "lng": 99.947316,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 23:21:32",
        "lat": 2.300264,
        "lng": 99.948,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 23:22:12",
        "lat": 2.302952,
        "lng": 99.947822,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 23:22:52",
        "lat": 2.305536,
        "lng": 99.947636,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 23:23:53",
        "lat": 2.305432,
        "lng": 99.947627,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 23:24:33",
        "lat": 2.303137,
        "lng": 99.947769,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 23:25:13",
        "lat": 2.300621,
        "lng": 99.947964,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 23:25:43",
        "lat": 2.299601,
        "lng": 99.94744,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 23:26:23",
        "lat": 2.299507,
        "lng": 99.945591,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 23:27:03",
        "lat": 2.299374,
        "lng": 99.943164,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:27:43",
        "lat": 2.299273,
        "lng": 99.940773,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 23:28:23",
        "lat": 2.299137,
        "lng": 99.938364,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 23:29:03",
        "lat": 2.299002,
        "lng": 99.935618,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 23:29:43",
        "lat": 2.298896,
        "lng": 99.933396,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 23:30:23",
        "lat": 2.298917,
        "lng": 99.931156,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 23:31:03",
        "lat": 2.299025,
        "lng": 99.92832,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 23:31:43",
        "lat": 2.299013,
        "lng": 99.925733,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 23:31:53",
        "lat": 2.298988,
        "lng": 99.925067,
        "speed": 27.0
      }
    ]
  },
  "2026-09-01__V-PHH-01": {
    "date": "2026-09-01",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-01 04:48:30",
        "lat": 2.29881,
        "lng": 99.909378,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 13:57:02",
        "lat": 2.298853,
        "lng": 99.909396,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 13:57:20",
        "lat": 2.298639,
        "lng": 99.909671,
        "speed": 21.0
      },
      {
        "time": "2026-09-01 13:58:00",
        "lat": 2.29877,
        "lng": 99.912178,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 13:58:40",
        "lat": 2.29881,
        "lng": 99.914782,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 13:59:20",
        "lat": 2.298864,
        "lng": 99.917609,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 14:00:00",
        "lat": 2.298931,
        "lng": 99.920684,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 14:00:30",
        "lat": 2.299228,
        "lng": 99.922249,
        "speed": 21.0
      },
      {
        "time": "2026-09-01 14:01:10",
        "lat": 2.302054,
        "lng": 99.922649,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 14:01:50",
        "lat": 2.305037,
        "lng": 99.923067,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 14:02:40",
        "lat": 2.307105,
        "lng": 99.923653,
        "speed": 9.0
      },
      {
        "time": "2026-09-01 14:03:30",
        "lat": 2.307153,
        "lng": 99.924907,
        "speed": 10.0
      },
      {
        "time": "2026-09-01 14:04:12",
        "lat": 2.307158,
        "lng": 99.925493,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 14:07:20",
        "lat": 2.307153,
        "lng": 99.926142,
        "speed": 8.0
      },
      {
        "time": "2026-09-01 14:08:00",
        "lat": 2.307201,
        "lng": 99.927342,
        "speed": 12.0
      },
      {
        "time": "2026-09-01 14:08:40",
        "lat": 2.307086,
        "lng": 99.928302,
        "speed": 9.0
      },
      {
        "time": "2026-09-01 14:09:20",
        "lat": 2.307116,
        "lng": 99.929573,
        "speed": 12.0
      },
      {
        "time": "2026-09-01 14:10:10",
        "lat": 2.306897,
        "lng": 99.930596,
        "speed": 11.0
      },
      {
        "time": "2026-09-01 14:10:50",
        "lat": 2.304669,
        "lng": 99.930391,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 14:11:30",
        "lat": 2.301815,
        "lng": 99.930018,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 14:12:01",
        "lat": 2.299424,
        "lng": 99.929707,
        "speed": 23.0
      },
      {
        "time": "2026-09-01 14:12:30",
        "lat": 2.297828,
        "lng": 99.929493,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 14:13:10",
        "lat": 2.29476,
        "lng": 99.929067,
        "speed": 22.0
      },
      {
        "time": "2026-09-01 14:13:30",
        "lat": 2.29421,
        "lng": 99.928987,
        "speed": 19.0
      },
      {
        "time": "2026-09-01 14:13:50",
        "lat": 2.292996,
        "lng": 99.928827,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 14:14:30",
        "lat": 2.289948,
        "lng": 99.928418,
        "speed": 18.0
      },
      {
        "time": "2026-09-01 14:30:18",
        "lat": 2.289894,
        "lng": 99.9284,
        "speed": 17.0
      },
      {
        "time": "2026-09-01 14:30:58",
        "lat": 2.292689,
        "lng": 99.928782,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 14:31:38",
        "lat": 2.294775,
        "lng": 99.929067,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 14:32:18",
        "lat": 2.298016,
        "lng": 99.929493,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 14:32:38",
        "lat": 2.298977,
        "lng": 99.929787,
        "speed": 18.0
      },
      {
        "time": "2026-09-01 14:33:18",
        "lat": 2.298881,
        "lng": 99.932649,
        "speed": 23.0
      },
      {
        "time": "2026-09-01 14:34:04",
        "lat": 2.298558,
        "lng": 99.933431,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 14:36:08",
        "lat": 2.298844,
        "lng": 99.933547,
        "speed": 18.0
      },
      {
        "time": "2026-09-01 14:36:48",
        "lat": 2.299042,
        "lng": 99.936116,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 14:37:28",
        "lat": 2.299204,
        "lng": 99.939538,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 14:38:08",
        "lat": 2.299366,
        "lng": 99.942498,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 14:38:48",
        "lat": 2.299527,
        "lng": 99.945884,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 14:39:28",
        "lat": 2.300177,
        "lng": 99.948009,
        "speed": 25.0
      },
      {
        "time": "2026-09-01 14:40:08",
        "lat": 2.303393,
        "lng": 99.947787,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 14:40:50",
        "lat": 2.306439,
        "lng": 99.947556,
        "speed": 2.0
      },
      {
        "time": "2026-09-01 15:34:42",
        "lat": 2.306051,
        "lng": 99.947591,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 15:35:17",
        "lat": 2.302821,
        "lng": 99.947822,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 15:35:57",
        "lat": 2.299387,
        "lng": 99.948098,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 15:36:51",
        "lat": 2.296724,
        "lng": 99.948311,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 15:37:51",
        "lat": 2.296887,
        "lng": 99.948284,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 15:38:27",
        "lat": 2.300272,
        "lng": 99.948009,
        "speed": 42.0
      },
      {
        "time": "2026-09-01 15:39:07",
        "lat": 2.304749,
        "lng": 99.947671,
        "speed": 48.0
      },
      {
        "time": "2026-09-01 15:39:27",
        "lat": 2.306302,
        "lng": 99.947591,
        "speed": 7.0
      },
      {
        "time": "2026-09-01 16:01:30",
        "lat": 2.305566,
        "lng": 99.947609,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 16:02:10",
        "lat": 2.302223,
        "lng": 99.947849,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 16:02:46",
        "lat": 2.29964,
        "lng": 99.948116,
        "speed": 15.0
      },
      {
        "time": "2026-09-01 16:03:20",
        "lat": 2.299802,
        "lng": 99.950587,
        "speed": 22.0
      },
      {
        "time": "2026-09-01 16:03:50",
        "lat": 2.301522,
        "lng": 99.950924,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 16:04:29",
        "lat": 2.304587,
        "lng": 99.951244,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 16:05:20",
        "lat": 2.305683,
        "lng": 99.951298,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 16:52:32",
        "lat": 2.306406,
        "lng": 99.951573,
        "speed": 2.0
      },
      {
        "time": "2026-09-01 16:53:20",
        "lat": 2.306391,
        "lng": 99.952311,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 16:54:00",
        "lat": 2.306252,
        "lng": 99.954818,
        "speed": 20.0
      },
      {
        "time": "2026-09-01 16:54:30",
        "lat": 2.30807,
        "lng": 99.954996,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 16:55:00",
        "lat": 2.308906,
        "lng": 99.956036,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 16:55:30",
        "lat": 2.309792,
        "lng": 99.956364,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 16:56:10",
        "lat": 2.312699,
        "lng": 99.956329,
        "speed": 20.0
      },
      {
        "time": "2026-09-01 16:57:24",
        "lat": 2.313098,
        "lng": 99.956347,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 16:58:10",
        "lat": 2.315514,
        "lng": 99.956311,
        "speed": 39.0
      },
      {
        "time": "2026-09-01 16:58:50",
        "lat": 2.318983,
        "lng": 99.956347,
        "speed": 19.0
      },
      {
        "time": "2026-09-01 16:59:30",
        "lat": 2.319053,
        "lng": 99.959102,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 17:00:10",
        "lat": 2.319119,
        "lng": 99.962773,
        "speed": 39.0
      },
      {
        "time": "2026-09-01 17:00:50",
        "lat": 2.319179,
        "lng": 99.966684,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 17:01:30",
        "lat": 2.319261,
        "lng": 99.970462,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 17:01:57",
        "lat": 2.319304,
        "lng": 99.972498,
        "speed": 9.0
      },
      {
        "time": "2026-09-01 17:02:30",
        "lat": 2.321231,
        "lng": 99.972498,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 17:03:10",
        "lat": 2.324387,
        "lng": 99.972427,
        "speed": 25.0
      },
      {
        "time": "2026-09-01 17:03:45",
        "lat": 2.325889,
        "lng": 99.9724,
        "speed": 9.0
      },
      {
        "time": "2026-09-01 17:14:09",
        "lat": 2.326084,
        "lng": 99.97168,
        "speed": 21.0
      },
      {
        "time": "2026-09-01 17:14:41",
        "lat": 2.326164,
        "lng": 99.970747,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 17:49:21",
        "lat": 2.326165,
        "lng": 99.97072,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 17:49:59",
        "lat": 2.326185,
        "lng": 99.970098,
        "speed": 10.0
      },
      {
        "time": "2026-09-01 17:50:39",
        "lat": 2.326168,
        "lng": 99.969111,
        "speed": 12.0
      },
      {
        "time": "2026-09-01 17:51:19",
        "lat": 2.326147,
        "lng": 99.967973,
        "speed": 11.0
      },
      {
        "time": "2026-09-01 17:51:49",
        "lat": 2.325011,
        "lng": 99.967778,
        "speed": 18.0
      },
      {
        "time": "2026-09-01 17:52:29",
        "lat": 2.322681,
        "lng": 99.967822,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 17:53:09",
        "lat": 2.319729,
        "lng": 99.96784,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 17:53:39",
        "lat": 2.319211,
        "lng": 99.966471,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 17:54:19",
        "lat": 2.319153,
        "lng": 99.964569,
        "speed": 25.0
      },
      {
        "time": "2026-09-01 17:54:59",
        "lat": 2.319092,
        "lng": 99.96128,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 17:55:39",
        "lat": 2.319032,
        "lng": 99.957778,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 17:56:03",
        "lat": 2.318823,
        "lng": 99.956267,
        "speed": 15.0
      },
      {
        "time": "2026-09-01 17:56:39",
        "lat": 2.316158,
        "lng": 99.956302,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 17:57:19",
        "lat": 2.312669,
        "lng": 99.956347,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 17:57:59",
        "lat": 2.309324,
        "lng": 99.956382,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 17:58:33",
        "lat": 2.308821,
        "lng": 99.955013,
        "speed": 17.0
      },
      {
        "time": "2026-09-01 17:59:09",
        "lat": 2.306434,
        "lng": 99.955067,
        "speed": 18.0
      },
      {
        "time": "2026-09-01 17:59:39",
        "lat": 2.306366,
        "lng": 99.953209,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 18:00:09",
        "lat": 2.3062,
        "lng": 99.951387,
        "speed": 21.0
      },
      {
        "time": "2026-09-01 18:00:49",
        "lat": 2.303412,
        "lng": 99.951138,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 18:01:29",
        "lat": 2.300361,
        "lng": 99.950827,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 18:01:59",
        "lat": 2.299712,
        "lng": 99.949591,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 18:02:29",
        "lat": 2.299339,
        "lng": 99.948098,
        "speed": 19.0
      },
      {
        "time": "2026-09-01 18:03:09",
        "lat": 2.296512,
        "lng": 99.948329,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 18:03:49",
        "lat": 2.293503,
        "lng": 99.948569,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 18:04:29",
        "lat": 2.290657,
        "lng": 99.948773,
        "speed": 20.0
      },
      {
        "time": "2026-09-01 18:04:49",
        "lat": 2.290464,
        "lng": 99.948818,
        "speed": 17.0
      },
      {
        "time": "2026-09-01 18:05:29",
        "lat": 2.293201,
        "lng": 99.948604,
        "speed": 36.0
      },
      {
        "time": "2026-09-01 18:06:09",
        "lat": 2.296531,
        "lng": 99.948329,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 18:06:43",
        "lat": 2.2994,
        "lng": 99.948098,
        "speed": 21.0
      },
      {
        "time": "2026-09-01 18:07:09",
        "lat": 2.301297,
        "lng": 99.947929,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 18:07:49",
        "lat": 2.304911,
        "lng": 99.947671,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 18:08:29",
        "lat": 2.306422,
        "lng": 99.947582,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 18:33:46",
        "lat": 2.306419,
        "lng": 99.947582,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 18:34:34",
        "lat": 2.304928,
        "lng": 99.947653,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 18:35:14",
        "lat": 2.302231,
        "lng": 99.94784,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 18:35:54",
        "lat": 2.299702,
        "lng": 99.948027,
        "speed": 8.0
      },
      {
        "time": "2026-09-01 18:36:24",
        "lat": 2.299552,
        "lng": 99.94632,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 18:37:04",
        "lat": 2.299394,
        "lng": 99.943573,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 18:37:44",
        "lat": 2.299269,
        "lng": 99.940631,
        "speed": 39.0
      },
      {
        "time": "2026-09-01 18:38:14",
        "lat": 2.299088,
        "lng": 99.937156,
        "speed": 44.0
      },
      {
        "time": "2026-09-01 18:38:37",
        "lat": 2.298982,
        "lng": 99.93464,
        "speed": 22.0
      },
      {
        "time": "2026-09-01 18:38:52",
        "lat": 2.298926,
        "lng": 99.934124,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 18:39:54",
        "lat": 2.298908,
        "lng": 99.933742,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 18:40:34",
        "lat": 2.298928,
        "lng": 99.930862,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 18:41:12",
        "lat": 2.299024,
        "lng": 99.927689,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 18:41:21",
        "lat": 2.298994,
        "lng": 99.926969,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 18:41:51",
        "lat": 2.299001,
        "lng": 99.924631,
        "speed": 19.0
      },
      {
        "time": "2026-09-01 18:42:04",
        "lat": 2.299456,
        "lng": 99.92456,
        "speed": 21.0
      },
      {
        "time": "2026-09-01 18:43:04",
        "lat": 2.299507,
        "lng": 99.924578,
        "speed": 21.0
      },
      {
        "time": "2026-09-01 18:43:34",
        "lat": 2.298971,
        "lng": 99.922969,
        "speed": 36.0
      },
      {
        "time": "2026-09-01 18:44:14",
        "lat": 2.298857,
        "lng": 99.919173,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 18:44:54",
        "lat": 2.298792,
        "lng": 99.915218,
        "speed": 40.0
      },
      {
        "time": "2026-09-01 18:45:17",
        "lat": 2.298749,
        "lng": 99.912969,
        "speed": 39.0
      },
      {
        "time": "2026-09-01 18:45:54",
        "lat": 2.298614,
        "lng": 99.9096,
        "speed": 23.0
      },
      {
        "time": "2026-09-01 18:46:04",
        "lat": 2.298808,
        "lng": 99.909351,
        "speed": 11.0
      },
      {
        "time": "2026-09-01 19:06:25",
        "lat": 2.298665,
        "lng": 99.909396,
        "speed": 10.0
      },
      {
        "time": "2026-09-01 19:06:55",
        "lat": 2.298736,
        "lng": 99.911884,
        "speed": 38.0
      },
      {
        "time": "2026-09-01 19:07:35",
        "lat": 2.298795,
        "lng": 99.915689,
        "speed": 36.0
      },
      {
        "time": "2026-09-01 19:08:15",
        "lat": 2.29887,
        "lng": 99.91952,
        "speed": 38.0
      },
      {
        "time": "2026-09-01 19:08:55",
        "lat": 2.298957,
        "lng": 99.923342,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 19:09:25",
        "lat": 2.299957,
        "lng": 99.924587,
        "speed": 40.0
      },
      {
        "time": "2026-09-01 19:10:05",
        "lat": 2.303114,
        "lng": 99.925004,
        "speed": 39.0
      },
      {
        "time": "2026-09-01 19:10:45",
        "lat": 2.306803,
        "lng": 99.925467,
        "speed": 19.0
      },
      {
        "time": "2026-09-01 19:12:35",
        "lat": 2.306924,
        "lng": 99.925493,
        "speed": 22.0
      },
      {
        "time": "2026-09-01 19:13:07",
        "lat": 2.304191,
        "lng": 99.925147,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 19:13:35",
        "lat": 2.301544,
        "lng": 99.924809,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 19:16:05",
        "lat": 2.298979,
        "lng": 99.924693,
        "speed": 25.0
      },
      {
        "time": "2026-09-01 19:16:45",
        "lat": 2.299038,
        "lng": 99.928364,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 19:17:23",
        "lat": 2.298898,
        "lng": 99.932018,
        "speed": 42.0
      },
      {
        "time": "2026-09-01 19:17:45",
        "lat": 2.29892,
        "lng": 99.933796,
        "speed": 43.0
      },
      {
        "time": "2026-09-01 19:18:25",
        "lat": 2.299119,
        "lng": 99.938151,
        "speed": 49.0
      },
      {
        "time": "2026-09-01 19:19:05",
        "lat": 2.299374,
        "lng": 99.942987,
        "speed": 47.0
      },
      {
        "time": "2026-09-01 19:19:45",
        "lat": 2.299613,
        "lng": 99.947884,
        "speed": 50.0
      },
      {
        "time": "2026-09-01 19:20:06",
        "lat": 2.299786,
        "lng": 99.950373,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 19:20:17",
        "lat": 2.299603,
        "lng": 99.950827,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 19:38:00",
        "lat": 2.299469,
        "lng": 99.950844,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 19:38:34",
        "lat": 2.299684,
        "lng": 99.950862,
        "speed": 15.0
      },
      {
        "time": "2026-09-01 19:39:04",
        "lat": 2.299789,
        "lng": 99.952604,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 19:39:44",
        "lat": 2.299846,
        "lng": 99.955858,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 19:40:24",
        "lat": 2.299901,
        "lng": 99.959387,
        "speed": 36.0
      },
      {
        "time": "2026-09-01 19:41:04",
        "lat": 2.299969,
        "lng": 99.963022,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 19:41:28",
        "lat": 2.300019,
        "lng": 99.965244,
        "speed": 38.0
      },
      {
        "time": "2026-09-01 19:42:21",
        "lat": 2.299907,
        "lng": 99.965938,
        "speed": 14.0
      },
      {
        "time": "2026-09-01 19:42:44",
        "lat": 2.300057,
        "lng": 99.967271,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 19:43:08",
        "lat": 2.299708,
        "lng": 99.968213,
        "speed": 10.0
      },
      {
        "time": "2026-09-01 19:43:29",
        "lat": 2.299707,
        "lng": 99.968818,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 19:58:13",
        "lat": 2.299718,
        "lng": 99.968747,
        "speed": 7.0
      },
      {
        "time": "2026-09-01 19:58:43",
        "lat": 2.300033,
        "lng": 99.968133,
        "speed": 14.0
      },
      {
        "time": "2026-09-01 19:59:13",
        "lat": 2.300035,
        "lng": 99.96616,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 19:59:39",
        "lat": 2.299991,
        "lng": 99.96408,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 19:59:50",
        "lat": 2.299976,
        "lng": 99.963147,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 20:00:03",
        "lat": 2.299956,
        "lng": 99.962009,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 20:00:31",
        "lat": 2.299902,
        "lng": 99.959573,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 20:00:49",
        "lat": 2.299884,
        "lng": 99.958036,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 20:01:08",
        "lat": 2.299863,
        "lng": 99.956471,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 20:01:23",
        "lat": 2.299844,
        "lng": 99.955191,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 20:01:53",
        "lat": 2.299786,
        "lng": 99.95248,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 20:02:15",
        "lat": 2.299719,
        "lng": 99.95088,
        "speed": 15.0
      },
      {
        "time": "2026-09-01 20:35:27",
        "lat": 2.299457,
        "lng": 99.95088,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 20:36:49",
        "lat": 2.299548,
        "lng": 99.950844,
        "speed": 17.0
      },
      {
        "time": "2026-09-01 20:37:14",
        "lat": 2.299769,
        "lng": 99.951991,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 20:37:54",
        "lat": 2.299816,
        "lng": 99.954951,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 20:38:14",
        "lat": 2.299841,
        "lng": 99.956516,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 20:38:54",
        "lat": 2.299889,
        "lng": 99.959636,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 20:39:34",
        "lat": 2.29996,
        "lng": 99.962924,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 20:40:14",
        "lat": 2.299947,
        "lng": 99.965938,
        "speed": 17.0
      },
      {
        "time": "2026-09-01 20:40:54",
        "lat": 2.29686,
        "lng": 99.966053,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 20:41:19",
        "lat": 2.294652,
        "lng": 99.966107,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 20:41:34",
        "lat": 2.293359,
        "lng": 99.96616,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 20:42:04",
        "lat": 2.292887,
        "lng": 99.967902,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 20:42:44",
        "lat": 2.292774,
        "lng": 99.971387,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 20:43:24",
        "lat": 2.292609,
        "lng": 99.974756,
        "speed": 36.0
      },
      {
        "time": "2026-09-01 20:44:04",
        "lat": 2.292403,
        "lng": 99.978302,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 20:44:24",
        "lat": 2.292258,
        "lng": 99.980107,
        "speed": 36.0
      },
      {
        "time": "2026-09-01 20:44:48",
        "lat": 2.292101,
        "lng": 99.982249,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 20:45:14",
        "lat": 2.291957,
        "lng": 99.984373,
        "speed": 16.0
      },
      {
        "time": "2026-09-01 20:45:44",
        "lat": 2.290244,
        "lng": 99.984444,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 20:46:05",
        "lat": 2.288722,
        "lng": 99.984462,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 20:46:44",
        "lat": 2.285957,
        "lng": 99.984489,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 20:47:07",
        "lat": 2.284834,
        "lng": 99.984489,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 20:47:26",
        "lat": 2.285052,
        "lng": 99.984489,
        "speed": 12.0
      },
      {
        "time": "2026-09-01 20:48:04",
        "lat": 2.288177,
        "lng": 99.984471,
        "speed": 40.0
      },
      {
        "time": "2026-09-01 20:48:42",
        "lat": 2.291792,
        "lng": 99.984462,
        "speed": 25.0
      },
      {
        "time": "2026-09-01 20:49:04",
        "lat": 2.292023,
        "lng": 99.983316,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 20:49:44",
        "lat": 2.292268,
        "lng": 99.980027,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 20:50:24",
        "lat": 2.292534,
        "lng": 99.976418,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 20:50:54",
        "lat": 2.292665,
        "lng": 99.973636,
        "speed": 40.0
      },
      {
        "time": "2026-09-01 20:51:18",
        "lat": 2.292776,
        "lng": 99.971564,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 20:51:54",
        "lat": 2.292888,
        "lng": 99.968436,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 20:52:34",
        "lat": 2.292899,
        "lng": 99.966196,
        "speed": 11.0
      },
      {
        "time": "2026-09-01 20:53:14",
        "lat": 2.290143,
        "lng": 99.966293,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 20:53:34",
        "lat": 2.288716,
        "lng": 99.966338,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 20:54:07",
        "lat": 2.286621,
        "lng": 99.966409,
        "speed": 4.0
      },
      {
        "time": "2026-09-01 21:02:44",
        "lat": 2.286702,
        "lng": 99.966391,
        "speed": 13.0
      },
      {
        "time": "2026-09-01 21:03:12",
        "lat": 2.288055,
        "lng": 99.966356,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 21:03:34",
        "lat": 2.289383,
        "lng": 99.96632,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 21:04:04",
        "lat": 2.291294,
        "lng": 99.96624,
        "speed": 25.0
      },
      {
        "time": "2026-09-01 21:04:44",
        "lat": 2.293981,
        "lng": 99.96616,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 21:05:24",
        "lat": 2.296714,
        "lng": 99.966062,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 21:06:04",
        "lat": 2.299495,
        "lng": 99.965964,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 21:06:44",
        "lat": 2.299952,
        "lng": 99.963947,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 21:07:24",
        "lat": 2.299891,
        "lng": 99.960596,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 21:08:04",
        "lat": 2.299843,
        "lng": 99.957076,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 21:08:42",
        "lat": 2.299781,
        "lng": 99.953724,
        "speed": 36.0
      },
      {
        "time": "2026-09-01 21:08:58",
        "lat": 2.299756,
        "lng": 99.952347,
        "speed": 34.0
      },
      {
        "time": "2026-09-01 21:09:14",
        "lat": 2.299747,
        "lng": 99.95104,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 21:09:47",
        "lat": 2.299459,
        "lng": 99.950844,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 21:11:34",
        "lat": 2.299469,
        "lng": 99.950844,
        "speed": 8.0
      },
      {
        "time": "2026-09-01 21:12:04",
        "lat": 2.299679,
        "lng": 99.949413,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 21:12:29",
        "lat": 2.299574,
        "lng": 99.947538,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 21:13:04",
        "lat": 2.299452,
        "lng": 99.945164,
        "speed": 25.0
      },
      {
        "time": "2026-09-01 21:13:34",
        "lat": 2.299353,
        "lng": 99.943111,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 21:13:50",
        "lat": 2.299311,
        "lng": 99.942027,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 21:14:14",
        "lat": 2.299236,
        "lng": 99.940427,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 21:14:54",
        "lat": 2.299087,
        "lng": 99.937947,
        "speed": 22.0
      },
      {
        "time": "2026-09-01 21:15:14",
        "lat": 2.299033,
        "lng": 99.93672,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 21:15:54",
        "lat": 2.298911,
        "lng": 99.934124,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 21:16:34",
        "lat": 2.298865,
        "lng": 99.931787,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 21:17:14",
        "lat": 2.299021,
        "lng": 99.928631,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 21:17:54",
        "lat": 2.298969,
        "lng": 99.925378,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 21:18:34",
        "lat": 2.298904,
        "lng": 99.922231,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 21:19:14",
        "lat": 2.29883,
        "lng": 99.91896,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 21:19:54",
        "lat": 2.298759,
        "lng": 99.915547,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 21:20:34",
        "lat": 2.298708,
        "lng": 99.912044,
        "speed": 36.0
      },
      {
        "time": "2026-09-01 21:21:14",
        "lat": 2.298588,
        "lng": 99.909227,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 21:21:54",
        "lat": 2.29628,
        "lng": 99.908418,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 21:22:34",
        "lat": 2.293259,
        "lng": 99.908044,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 21:23:14",
        "lat": 2.290441,
        "lng": 99.907627,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 21:23:50",
        "lat": 2.289427,
        "lng": 99.90752,
        "speed": 8.0
      },
      {
        "time": "2026-09-01 22:12:51",
        "lat": 2.289449,
        "lng": 99.907556,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 22:13:19",
        "lat": 2.289904,
        "lng": 99.907573,
        "speed": 18.0
      },
      {
        "time": "2026-09-01 22:13:59",
        "lat": 2.291724,
        "lng": 99.907831,
        "speed": 20.0
      },
      {
        "time": "2026-09-01 22:14:39",
        "lat": 2.293629,
        "lng": 99.908089,
        "speed": 19.0
      },
      {
        "time": "2026-09-01 22:15:19",
        "lat": 2.295668,
        "lng": 99.908329,
        "speed": 20.0
      },
      {
        "time": "2026-09-01 22:15:59",
        "lat": 2.297613,
        "lng": 99.908578,
        "speed": 18.0
      },
      {
        "time": "2026-09-01 22:16:29",
        "lat": 2.298583,
        "lng": 99.909004,
        "speed": 14.0
      },
      {
        "time": "2026-09-01 22:16:46",
        "lat": 2.298748,
        "lng": 99.909378,
        "speed": 10.0
      },
      {
        "time": "2026-09-01 22:17:07",
        "lat": 2.298707,
        "lng": 99.909164,
        "speed": 7.0
      },
      {
        "time": "2026-09-01 22:17:46",
        "lat": 2.298802,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 22:52:05",
        "lat": 2.298598,
        "lng": 99.910124,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 22:52:45",
        "lat": 2.298718,
        "lng": 99.913769,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 22:53:05",
        "lat": 2.298757,
        "lng": 99.915644,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 22:53:37",
        "lat": 2.298834,
        "lng": 99.918702,
        "speed": 39.0
      },
      {
        "time": "2026-09-01 22:54:05",
        "lat": 2.298875,
        "lng": 99.921271,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 22:54:25",
        "lat": 2.298929,
        "lng": 99.923129,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 22:54:45",
        "lat": 2.298966,
        "lng": 99.924969,
        "speed": 36.0
      },
      {
        "time": "2026-09-01 22:55:25",
        "lat": 2.299034,
        "lng": 99.928667,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 22:56:05",
        "lat": 2.298878,
        "lng": 99.9324,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 22:56:19",
        "lat": 2.298868,
        "lng": 99.933253,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 22:56:29",
        "lat": 2.298896,
        "lng": 99.933884,
        "speed": 21.0
      },
      {
        "time": "2026-09-01 22:58:15",
        "lat": 2.298865,
        "lng": 99.934053,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 22:58:35",
        "lat": 2.298976,
        "lng": 99.934702,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 22:58:55",
        "lat": 2.299036,
        "lng": 99.936276,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 22:59:18",
        "lat": 2.299107,
        "lng": 99.93832,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 22:59:45",
        "lat": 2.300358,
        "lng": 99.938933,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 23:00:25",
        "lat": 2.303991,
        "lng": 99.938836,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 23:01:05",
        "lat": 2.306832,
        "lng": 99.938791,
        "speed": 7.0
      },
      {
        "time": "2026-09-01 23:02:25",
        "lat": 2.30563,
        "lng": 99.938809,
        "speed": 22.0
      },
      {
        "time": "2026-09-01 23:03:05",
        "lat": 2.302462,
        "lng": 99.93888,
        "speed": 36.0
      },
      {
        "time": "2026-09-01 23:03:35",
        "lat": 2.299922,
        "lng": 99.938951,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 23:04:15",
        "lat": 2.299099,
        "lng": 99.937547,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 23:04:55",
        "lat": 2.298969,
        "lng": 99.934489,
        "speed": 18.0
      },
      {
        "time": "2026-09-01 23:09:34",
        "lat": 2.298901,
        "lng": 99.934116,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 23:10:04",
        "lat": 2.298854,
        "lng": 99.933004,
        "speed": 21.0
      },
      {
        "time": "2026-09-01 23:10:25",
        "lat": 2.298867,
        "lng": 99.931867,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 23:10:43",
        "lat": 2.298928,
        "lng": 99.930578,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 23:10:55",
        "lat": 2.29896,
        "lng": 99.929804,
        "speed": 17.0
      },
      {
        "time": "2026-09-01 23:11:15",
        "lat": 2.298003,
        "lng": 99.929511,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 23:11:45",
        "lat": 2.296172,
        "lng": 99.929271,
        "speed": 9.0
      },
      {
        "time": "2026-09-01 23:12:01",
        "lat": 2.295308,
        "lng": 99.929129,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 23:12:06",
        "lat": 2.294974,
        "lng": 99.929084,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 23:12:25",
        "lat": 2.293647,
        "lng": 99.928924,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 23:12:45",
        "lat": 2.29222,
        "lng": 99.928738,
        "speed": 29.0
      },
      {
        "time": "2026-09-01 23:13:05",
        "lat": 2.290734,
        "lng": 99.928533,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 23:14:22",
        "lat": 2.289886,
        "lng": 99.928418,
        "speed": 19.0
      },
      {
        "time": "2026-09-01 23:14:34",
        "lat": 2.290621,
        "lng": 99.928516,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 23:14:45",
        "lat": 2.291462,
        "lng": 99.928631,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 23:15:25",
        "lat": 2.294648,
        "lng": 99.929058,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 23:16:05",
        "lat": 2.29786,
        "lng": 99.929476,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 23:17:31",
        "lat": 2.299001,
        "lng": 99.929378,
        "speed": 12.0
      },
      {
        "time": "2026-09-01 23:17:44",
        "lat": 2.298967,
        "lng": 99.929929,
        "speed": 19.0
      },
      {
        "time": "2026-09-01 23:17:55",
        "lat": 2.298935,
        "lng": 99.930507,
        "speed": 20.0
      },
      {
        "time": "2026-09-01 23:18:25",
        "lat": 2.298886,
        "lng": 99.93208,
        "speed": 20.0
      },
      {
        "time": "2026-09-01 23:18:56",
        "lat": 2.298859,
        "lng": 99.932471,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 23:19:12",
        "lat": 2.298881,
        "lng": 99.9324,
        "speed": 15.0
      },
      {
        "time": "2026-09-01 23:19:25",
        "lat": 2.298887,
        "lng": 99.931591,
        "speed": 32.0
      },
      {
        "time": "2026-09-01 23:19:59",
        "lat": 2.299026,
        "lng": 99.928382,
        "speed": 38.0
      },
      {
        "time": "2026-09-01 23:20:10",
        "lat": 2.299012,
        "lng": 99.927387,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 23:20:25",
        "lat": 2.298986,
        "lng": 99.925982,
        "speed": 39.0
      },
      {
        "time": "2026-09-01 23:20:50",
        "lat": 2.298954,
        "lng": 99.923618,
        "speed": 38.0
      },
      {
        "time": "2026-09-01 23:21:25",
        "lat": 2.298869,
        "lng": 99.919796,
        "speed": 41.0
      },
      {
        "time": "2026-09-01 23:21:45",
        "lat": 2.298816,
        "lng": 99.917804,
        "speed": 39.0
      },
      {
        "time": "2026-09-01 23:22:08",
        "lat": 2.298771,
        "lng": 99.915431,
        "speed": 41.0
      },
      {
        "time": "2026-09-01 23:22:25",
        "lat": 2.298724,
        "lng": 99.913707,
        "speed": 35.0
      },
      {
        "time": "2026-09-01 23:22:55",
        "lat": 2.300692,
        "lng": 99.913591,
        "speed": 43.0
      },
      {
        "time": "2026-09-01 23:23:15",
        "lat": 2.302664,
        "lng": 99.913991,
        "speed": 40.0
      },
      {
        "time": "2026-09-01 23:23:54",
        "lat": 2.306401,
        "lng": 99.914596,
        "speed": 37.0
      },
      {
        "time": "2026-09-01 23:24:09",
        "lat": 2.307132,
        "lng": 99.914373,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 23:24:40",
        "lat": 2.307155,
        "lng": 99.911538,
        "speed": 31.0
      },
      {
        "time": "2026-09-01 23:25:05",
        "lat": 2.307166,
        "lng": 99.909867,
        "speed": 8.0
      },
      {
        "time": "2026-09-01 23:37:27",
        "lat": 2.307163,
        "lng": 99.909982,
        "speed": 17.0
      },
      {
        "time": "2026-09-01 23:38:07",
        "lat": 2.307147,
        "lng": 99.912924,
        "speed": 33.0
      },
      {
        "time": "2026-09-01 23:38:33",
        "lat": 2.306922,
        "lng": 99.914711,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:38:57",
        "lat": 2.305436,
        "lng": 99.914453,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 23:39:17",
        "lat": 2.304114,
        "lng": 99.914222,
        "speed": 28.0
      },
      {
        "time": "2026-09-01 23:39:47",
        "lat": 2.301952,
        "lng": 99.913849,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 23:40:15",
        "lat": 2.299766,
        "lng": 99.913413,
        "speed": 30.0
      },
      {
        "time": "2026-09-01 23:40:29",
        "lat": 2.298882,
        "lng": 99.913262,
        "speed": 11.0
      },
      {
        "time": "2026-09-01 23:41:17",
        "lat": 2.298728,
        "lng": 99.912693,
        "speed": 17.0
      },
      {
        "time": "2026-09-01 23:41:37",
        "lat": 2.298726,
        "lng": 99.911769,
        "speed": 19.0
      },
      {
        "time": "2026-09-01 23:44:40",
        "lat": 2.29873,
        "lng": 99.911049,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 23:45:07",
        "lat": 2.298635,
        "lng": 99.910258,
        "speed": 19.0
      },
      {
        "time": "2026-09-01 23:45:31",
        "lat": 2.298724,
        "lng": 99.909404,
        "speed": 1.0
      },
      {
        "time": "2026-09-01 23:46:49",
        "lat": 2.298704,
        "lng": 99.909404,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 23:47:07",
        "lat": 2.298602,
        "lng": 99.909093,
        "speed": 16.0
      },
      {
        "time": "2026-09-01 23:47:17",
        "lat": 2.298319,
        "lng": 99.908693,
        "speed": 27.0
      },
      {
        "time": "2026-09-01 23:47:37",
        "lat": 2.29696,
        "lng": 99.908516,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 23:48:07",
        "lat": 2.295008,
        "lng": 99.908276,
        "speed": 26.0
      },
      {
        "time": "2026-09-01 23:48:50",
        "lat": 2.292642,
        "lng": 99.907893,
        "speed": 10.0
      },
      {
        "time": "2026-09-01 23:50:07",
        "lat": 2.292835,
        "lng": 99.907991,
        "speed": 16.0
      },
      {
        "time": "2026-09-01 23:50:47",
        "lat": 2.295138,
        "lng": 99.908284,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:51:27",
        "lat": 2.297402,
        "lng": 99.90856,
        "speed": 21.0
      },
      {
        "time": "2026-09-01 23:51:57",
        "lat": 2.298579,
        "lng": 99.909031,
        "speed": 15.0
      },
      {
        "time": "2026-09-01 23:52:54",
        "lat": 2.298689,
        "lng": 99.909378,
        "speed": 0.0
      },
      {
        "time": "2026-09-01 23:53:13",
        "lat": 2.298629,
        "lng": 99.909404,
        "speed": 10.0
      },
      {
        "time": "2026-09-01 23:53:39",
        "lat": 2.298703,
        "lng": 99.910676,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:54:17",
        "lat": 2.298734,
        "lng": 99.913067,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:54:47",
        "lat": 2.298766,
        "lng": 99.914827,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:55:20",
        "lat": 2.298803,
        "lng": 99.916844,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:55:38",
        "lat": 2.298827,
        "lng": 99.917964,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:56:17",
        "lat": 2.298881,
        "lng": 99.920329,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:56:47",
        "lat": 2.29892,
        "lng": 99.922169,
        "speed": 23.0
      },
      {
        "time": "2026-09-01 23:57:07",
        "lat": 2.298953,
        "lng": 99.923369,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:57:27",
        "lat": 2.298986,
        "lng": 99.924578,
        "speed": 23.0
      },
      {
        "time": "2026-09-01 23:57:52",
        "lat": 2.298997,
        "lng": 99.926098,
        "speed": 23.0
      },
      {
        "time": "2026-09-01 23:58:13",
        "lat": 2.299016,
        "lng": 99.927387,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:58:27",
        "lat": 2.299027,
        "lng": 99.92824,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:58:51",
        "lat": 2.298983,
        "lng": 99.929689,
        "speed": 24.0
      },
      {
        "time": "2026-09-01 23:59:07",
        "lat": 2.298935,
        "lng": 99.930649,
        "speed": 23.0
      },
      {
        "time": "2026-09-01 23:59:47",
        "lat": 2.298874,
        "lng": 99.932747,
        "speed": 18.0
      },
      {
        "time": "2026-09-01 23:59:57",
        "lat": 2.298892,
        "lng": 99.933262,
        "speed": 20.0
      }
    ]
  },
  "2026-09-02__V-PHH-01": {
    "date": "2026-09-02",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-02 00:00:00",
        "lat": 2.298894,
        "lng": 99.933378,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 00:00:37",
        "lat": 2.298999,
        "lng": 99.9352,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 00:01:17",
        "lat": 2.299093,
        "lng": 99.937698,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 00:02:17",
        "lat": 2.297278,
        "lng": 99.938996,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 00:02:55",
        "lat": 2.295149,
        "lng": 99.939067,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 00:03:23",
        "lat": 2.293626,
        "lng": 99.939111,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 00:03:57",
        "lat": 2.291946,
        "lng": 99.939138,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 00:04:42",
        "lat": 2.290085,
        "lng": 99.939209,
        "speed": 9.0
      },
      {
        "time": "2026-09-02 00:13:29",
        "lat": 2.289853,
        "lng": 99.939449,
        "speed": 9.0
      },
      {
        "time": "2026-09-02 00:14:09",
        "lat": 2.289905,
        "lng": 99.940347,
        "speed": 11.0
      },
      {
        "time": "2026-09-02 00:16:06",
        "lat": 2.290337,
        "lng": 99.94128,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 00:16:39",
        "lat": 2.291967,
        "lng": 99.94128,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 00:17:34",
        "lat": 2.295095,
        "lng": 99.941209,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 00:18:19",
        "lat": 2.297737,
        "lng": 99.941289,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 00:19:39",
        "lat": 2.299401,
        "lng": 99.944267,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 00:20:59",
        "lat": 2.30205,
        "lng": 99.945573,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 00:22:19",
        "lat": 2.306207,
        "lng": 99.945538,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 00:36:47",
        "lat": 2.305384,
        "lng": 99.945573,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 00:37:47",
        "lat": 2.302057,
        "lng": 99.945627,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 00:38:37",
        "lat": 2.299506,
        "lng": 99.94536,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 00:39:07",
        "lat": 2.299403,
        "lng": 99.94376,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 00:39:56",
        "lat": 2.299278,
        "lng": 99.941031,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 00:41:03",
        "lat": 2.299069,
        "lng": 99.937084,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 00:41:57",
        "lat": 2.298968,
        "lng": 99.934551,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 00:42:59",
        "lat": 2.298902,
        "lng": 99.931396,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 00:43:38",
        "lat": 2.299027,
        "lng": 99.928844,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 00:44:37",
        "lat": 2.29898,
        "lng": 99.925022,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 00:45:37",
        "lat": 2.298886,
        "lng": 99.921244,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 00:46:37",
        "lat": 2.298809,
        "lng": 99.91728,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 00:47:43",
        "lat": 2.296514,
        "lng": 99.915316,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 00:48:20",
        "lat": 2.294154,
        "lng": 99.914996,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 00:49:17",
        "lat": 2.291228,
        "lng": 99.914809,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 00:54:23",
        "lat": 2.289532,
        "lng": 99.915813,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 00:55:47",
        "lat": 2.292384,
        "lng": 99.914142,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 00:57:07",
        "lat": 2.296439,
        "lng": 99.911707,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 00:58:27",
        "lat": 2.298732,
        "lng": 99.911031,
        "speed": 9.0
      },
      {
        "time": "2026-09-02 00:59:58",
        "lat": 2.301123,
        "lng": 99.911404,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 01:01:18",
        "lat": 2.306046,
        "lng": 99.912044,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 01:02:10",
        "lat": 2.307152,
        "lng": 99.910471,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 01:04:14",
        "lat": 2.306696,
        "lng": 99.909787,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 01:05:08",
        "lat": 2.303542,
        "lng": 99.909342,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 01:06:08",
        "lat": 2.299891,
        "lng": 99.909511,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 01:06:58",
        "lat": 2.298563,
        "lng": 99.908791,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 01:07:41",
        "lat": 2.296427,
        "lng": 99.908436,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 01:08:58",
        "lat": 2.292538,
        "lng": 99.907956,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 01:09:28",
        "lat": 2.291064,
        "lng": 99.907733,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 01:10:24",
        "lat": 2.289503,
        "lng": 99.907538,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 01:30:35",
        "lat": 2.291129,
        "lng": 99.90776,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 01:31:55",
        "lat": 2.295196,
        "lng": 99.90832,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 01:32:55",
        "lat": 2.29852,
        "lng": 99.908818,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 02:07:41",
        "lat": 2.298608,
        "lng": 99.909262,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 02:08:48",
        "lat": 2.293406,
        "lng": 99.908071,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 02:10:26",
        "lat": 2.292514,
        "lng": 99.907947,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 02:11:01",
        "lat": 2.290502,
        "lng": 99.907671,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 05:36:56",
        "lat": 2.289934,
        "lng": 99.907573,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 05:38:16",
        "lat": 2.297954,
        "lng": 99.908622,
        "speed": 46.0
      },
      {
        "time": "2026-09-02 05:39:26",
        "lat": 2.298787,
        "lng": 99.909324,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 06:26:00",
        "lat": 2.298706,
        "lng": 99.909378,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 06:26:47",
        "lat": 2.298739,
        "lng": 99.912533,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 06:27:58",
        "lat": 2.298847,
        "lng": 99.918071,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 06:29:08",
        "lat": 2.298971,
        "lng": 99.923787,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 06:30:23",
        "lat": 2.298874,
        "lng": 99.929618,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 06:31:38",
        "lat": 2.293587,
        "lng": 99.928924,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 06:33:51",
        "lat": 2.289668,
        "lng": 99.928382,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 06:34:14",
        "lat": 2.289963,
        "lng": 99.928418,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 06:35:28",
        "lat": 2.295274,
        "lng": 99.929129,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 06:36:34",
        "lat": 2.298932,
        "lng": 99.930569,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 06:37:10",
        "lat": 2.298485,
        "lng": 99.932373,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 06:38:18",
        "lat": 2.298859,
        "lng": 99.932907,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 06:44:21",
        "lat": 2.298877,
        "lng": 99.933902,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 06:51:23",
        "lat": 2.298651,
        "lng": 99.933236,
        "speed": 11.0
      },
      {
        "time": "2026-09-02 06:52:33",
        "lat": 2.299059,
        "lng": 99.936507,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 06:53:53",
        "lat": 2.301764,
        "lng": 99.938898,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 06:55:43",
        "lat": 2.306868,
        "lng": 99.938809,
        "speed": 8.0
      },
      {
        "time": "2026-09-02 06:56:53",
        "lat": 2.303185,
        "lng": 99.938862,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 06:58:13",
        "lat": 2.297605,
        "lng": 99.938978,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 06:59:33",
        "lat": 2.291877,
        "lng": 99.939129,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 09:08:11",
        "lat": 2.289853,
        "lng": 99.939387,
        "speed": 10.0
      },
      {
        "time": "2026-09-02 09:09:31",
        "lat": 2.290003,
        "lng": 99.941209,
        "speed": 15.0
      },
      {
        "time": "2026-09-02 09:10:51",
        "lat": 2.295246,
        "lng": 99.941227,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 09:11:51",
        "lat": 2.29923,
        "lng": 99.94144,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 09:13:01",
        "lat": 2.299506,
        "lng": 99.946187,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 09:14:01",
        "lat": 2.301155,
        "lng": 99.947911,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 09:15:01",
        "lat": 2.305107,
        "lng": 99.947671,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 09:40:41",
        "lat": 2.304365,
        "lng": 99.947724,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 09:42:01",
        "lat": 2.29966,
        "lng": 99.948098,
        "speed": 10.0
      },
      {
        "time": "2026-09-02 09:43:21",
        "lat": 2.299803,
        "lng": 99.953609,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 09:44:41",
        "lat": 2.299911,
        "lng": 99.959964,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 09:46:01",
        "lat": 2.300028,
        "lng": 99.96624,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 09:47:11",
        "lat": 2.297372,
        "lng": 99.96816,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 09:48:21",
        "lat": 2.292875,
        "lng": 99.9688,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 09:49:41",
        "lat": 2.292623,
        "lng": 99.974507,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 09:51:01",
        "lat": 2.292206,
        "lng": 99.980871,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 09:52:21",
        "lat": 2.290006,
        "lng": 99.984444,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 09:53:41",
        "lat": 2.2848,
        "lng": 99.984551,
        "speed": 9.0
      },
      {
        "time": "2026-09-02 09:56:41",
        "lat": 2.284854,
        "lng": 99.98576,
        "speed": 8.0
      },
      {
        "time": "2026-09-02 09:57:51",
        "lat": 2.285458,
        "lng": 99.984507,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 09:59:11",
        "lat": 2.290738,
        "lng": 99.984462,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 10:00:21",
        "lat": 2.292248,
        "lng": 99.980747,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 10:01:41",
        "lat": 2.292668,
        "lng": 99.974053,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 10:03:01",
        "lat": 2.292924,
        "lng": 99.967627,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 10:04:11",
        "lat": 2.289521,
        "lng": 99.966311,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 10:36:17",
        "lat": 2.286073,
        "lng": 99.96648,
        "speed": 7.0
      },
      {
        "time": "2026-09-02 10:37:27",
        "lat": 2.289386,
        "lng": 99.96632,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 10:38:48",
        "lat": 2.296457,
        "lng": 99.966062,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 10:39:48",
        "lat": 2.300014,
        "lng": 99.964489,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 10:41:08",
        "lat": 2.299874,
        "lng": 99.957076,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 10:42:28",
        "lat": 2.299738,
        "lng": 99.949778,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 10:43:38",
        "lat": 2.303076,
        "lng": 99.947787,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 10:51:52",
        "lat": 2.305669,
        "lng": 99.947591,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 11:03:33",
        "lat": 2.306527,
        "lng": 99.946613,
        "speed": 11.0
      },
      {
        "time": "2026-09-02 11:05:01",
        "lat": 2.303909,
        "lng": 99.945573,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 11:06:11",
        "lat": 2.299513,
        "lng": 99.945227,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 11:07:31",
        "lat": 2.299137,
        "lng": 99.938756,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 11:08:51",
        "lat": 2.298867,
        "lng": 99.932862,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 11:10:11",
        "lat": 2.299007,
        "lng": 99.926267,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 11:11:31",
        "lat": 2.298861,
        "lng": 99.919271,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 11:12:51",
        "lat": 2.298743,
        "lng": 99.912027,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 11:14:00",
        "lat": 2.298774,
        "lng": 99.909396,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 11:15:01",
        "lat": 2.298774,
        "lng": 99.913751,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 11:16:21",
        "lat": 2.298897,
        "lng": 99.920249,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 11:17:25",
        "lat": 2.298717,
        "lng": 99.922444,
        "speed": 8.0
      },
      {
        "time": "2026-09-02 12:37:23",
        "lat": 2.299025,
        "lng": 99.925956,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 12:38:31",
        "lat": 2.298926,
        "lng": 99.932178,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 13:01:10",
        "lat": 2.298792,
        "lng": 99.933476,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 13:02:08",
        "lat": 2.29867,
        "lng": 99.934729,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 13:53:57",
        "lat": 2.299014,
        "lng": 99.92936,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 13:55:17",
        "lat": 2.298922,
        "lng": 99.921076,
        "speed": 48.0
      },
      {
        "time": "2026-09-02 13:56:37",
        "lat": 2.298736,
        "lng": 99.912311,
        "speed": 43.0
      },
      {
        "time": "2026-09-02 13:58:04",
        "lat": 2.298852,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 14:04:01",
        "lat": 2.298613,
        "lng": 99.909511,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 14:05:17",
        "lat": 2.298801,
        "lng": 99.915529,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 14:06:37",
        "lat": 2.298936,
        "lng": 99.921618,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 14:07:57",
        "lat": 2.299042,
        "lng": 99.927573,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 14:09:17",
        "lat": 2.298908,
        "lng": 99.933253,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 14:10:37",
        "lat": 2.299166,
        "lng": 99.938764,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 14:11:57",
        "lat": 2.296406,
        "lng": 99.941209,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 14:13:17",
        "lat": 2.290041,
        "lng": 99.941307,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 14:15:37",
        "lat": 2.28992,
        "lng": 99.939991,
        "speed": 15.0
      },
      {
        "time": "2026-09-02 14:16:47",
        "lat": 2.293957,
        "lng": 99.939093,
        "speed": 41.0
      },
      {
        "time": "2026-09-02 14:17:57",
        "lat": 2.299099,
        "lng": 99.937342,
        "speed": 41.0
      },
      {
        "time": "2026-09-02 14:19:17",
        "lat": 2.299009,
        "lng": 99.929573,
        "speed": 45.0
      },
      {
        "time": "2026-09-02 14:20:37",
        "lat": 2.298903,
        "lng": 99.921209,
        "speed": 44.0
      },
      {
        "time": "2026-09-02 14:21:57",
        "lat": 2.298732,
        "lng": 99.9124,
        "speed": 44.0
      },
      {
        "time": "2026-09-02 14:23:07",
        "lat": 2.298724,
        "lng": 99.910676,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 14:24:27",
        "lat": 2.298842,
        "lng": 99.917191,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 14:25:27",
        "lat": 2.299576,
        "lng": 99.917884,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 14:26:47",
        "lat": 2.30695,
        "lng": 99.918827,
        "speed": 8.0
      },
      {
        "time": "2026-09-02 14:27:47",
        "lat": 2.307043,
        "lng": 99.920622,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 14:29:05",
        "lat": 2.307102,
        "lng": 99.923298,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 14:30:28",
        "lat": 2.307133,
        "lng": 99.925467,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 14:31:47",
        "lat": 2.302318,
        "lng": 99.924916,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 14:32:57",
        "lat": 2.299036,
        "lng": 99.926613,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 14:34:07",
        "lat": 2.293608,
        "lng": 99.926009,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 14:35:27",
        "lat": 2.289744,
        "lng": 99.92648,
        "speed": 8.0
      },
      {
        "time": "2026-09-02 14:36:27",
        "lat": 2.289711,
        "lng": 99.928302,
        "speed": 1.0
      },
      {
        "time": "2026-09-02 14:39:07",
        "lat": 2.291131,
        "lng": 99.928551,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 14:40:27",
        "lat": 2.297444,
        "lng": 99.929413,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 14:41:34",
        "lat": 2.29878,
        "lng": 99.932373,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 14:43:36",
        "lat": 2.297928,
        "lng": 99.932356,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 14:44:47",
        "lat": 2.29353,
        "lng": 99.932178,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 14:46:57",
        "lat": 2.289779,
        "lng": 99.932116,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 14:48:17",
        "lat": 2.295786,
        "lng": 99.932293,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 14:49:11",
        "lat": 2.298488,
        "lng": 99.933449,
        "speed": 7.0
      },
      {
        "time": "2026-09-02 14:51:37",
        "lat": 2.299006,
        "lng": 99.935787,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 14:52:47",
        "lat": 2.302903,
        "lng": 99.936782,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 15:45:02",
        "lat": 2.306862,
        "lng": 99.937342,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 15:46:32",
        "lat": 2.306787,
        "lng": 99.93872,
        "speed": 4.0
      },
      {
        "time": "2026-09-02 15:47:30",
        "lat": 2.303607,
        "lng": 99.938836,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 15:48:50",
        "lat": 2.298174,
        "lng": 99.938969,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 15:50:10",
        "lat": 2.292397,
        "lng": 99.939076,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 15:58:24",
        "lat": 2.289882,
        "lng": 99.939387,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 15:59:37",
        "lat": 2.289956,
        "lng": 99.940676,
        "speed": 8.0
      },
      {
        "time": "2026-09-02 16:01:15",
        "lat": 2.290124,
        "lng": 99.943493,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 16:02:37",
        "lat": 2.294305,
        "lng": 99.943538,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 16:03:47",
        "lat": 2.299382,
        "lng": 99.943778,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 16:04:57",
        "lat": 2.299252,
        "lng": 99.94808,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 16:06:17",
        "lat": 2.292888,
        "lng": 99.948613,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 16:07:07",
        "lat": 2.291096,
        "lng": 99.948747,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 16:08:17",
        "lat": 2.290248,
        "lng": 99.950169,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 16:09:07",
        "lat": 2.292638,
        "lng": 99.951413,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 16:10:17",
        "lat": 2.293161,
        "lng": 99.95752,
        "speed": 44.0
      },
      {
        "time": "2026-09-02 16:11:27",
        "lat": 2.293951,
        "lng": 99.963511,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 16:12:37",
        "lat": 2.300008,
        "lng": 99.964569,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 16:13:37",
        "lat": 2.299727,
        "lng": 99.968747,
        "speed": 2.0
      },
      {
        "time": "2026-09-02 16:21:23",
        "lat": 2.299565,
        "lng": 99.969013,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 16:22:17",
        "lat": 2.297,
        "lng": 99.968178,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 16:23:21",
        "lat": 2.292936,
        "lng": 99.966747,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 16:24:17",
        "lat": 2.289079,
        "lng": 99.966311,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 16:49:49",
        "lat": 2.286133,
        "lng": 99.966436,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 16:50:55",
        "lat": 2.290663,
        "lng": 99.966276,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 16:52:15",
        "lat": 2.298534,
        "lng": 99.965982,
        "speed": 41.0
      },
      {
        "time": "2026-09-02 16:53:35",
        "lat": 2.299893,
        "lng": 99.960124,
        "speed": 43.0
      },
      {
        "time": "2026-09-02 16:54:55",
        "lat": 2.299747,
        "lng": 99.951511,
        "speed": 42.0
      },
      {
        "time": "2026-09-02 16:56:13",
        "lat": 2.299577,
        "lng": 99.945653,
        "speed": 10.0
      },
      {
        "time": "2026-09-02 16:57:05",
        "lat": 2.302643,
        "lng": 99.9456,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 17:00:07",
        "lat": 2.306596,
        "lng": 99.945849,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 17:01:25",
        "lat": 2.303956,
        "lng": 99.945591,
        "speed": 34.0
      },
      {
        "time": "2026-09-02 17:02:15",
        "lat": 2.301273,
        "lng": 99.9456,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 17:03:25",
        "lat": 2.299669,
        "lng": 99.948533,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 17:04:35",
        "lat": 2.300157,
        "lng": 99.954213,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 17:05:45",
        "lat": 2.306264,
        "lng": 99.954373,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 17:06:45",
        "lat": 2.308908,
        "lng": 99.956124,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 17:08:09",
        "lat": 2.308914,
        "lng": 99.963609,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 17:09:05",
        "lat": 2.312496,
        "lng": 99.963182,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 17:10:35",
        "lat": 2.319093,
        "lng": 99.963067,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 17:11:55",
        "lat": 2.325489,
        "lng": 99.962933,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 17:12:45",
        "lat": 2.324542,
        "lng": 99.96296,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 17:13:58",
        "lat": 2.319136,
        "lng": 99.963164,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 17:15:15",
        "lat": 2.319277,
        "lng": 99.971271,
        "speed": 41.0
      },
      {
        "time": "2026-09-02 17:16:42",
        "lat": 2.319216,
        "lng": 99.977227,
        "speed": 14.0
      },
      {
        "time": "2026-09-02 17:18:25",
        "lat": 2.314863,
        "lng": 99.977396,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 17:19:35",
        "lat": 2.309775,
        "lng": 99.97752,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 17:50:13",
        "lat": 2.30901,
        "lng": 99.973831,
        "speed": 49.0
      },
      {
        "time": "2026-09-02 17:51:33",
        "lat": 2.308925,
        "lng": 99.963751,
        "speed": 51.0
      },
      {
        "time": "2026-09-02 17:52:53",
        "lat": 2.308877,
        "lng": 99.955067,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 17:54:01",
        "lat": 2.306291,
        "lng": 99.951369,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 17:55:13",
        "lat": 2.299772,
        "lng": 99.950711,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 17:56:33",
        "lat": 2.299352,
        "lng": 99.942516,
        "speed": 53.0
      },
      {
        "time": "2026-09-02 17:57:53",
        "lat": 2.298959,
        "lng": 99.934498,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 17:59:13",
        "lat": 2.298874,
        "lng": 99.931884,
        "speed": 46.0
      },
      {
        "time": "2026-09-02 18:00:13",
        "lat": 2.298947,
        "lng": 99.923502,
        "speed": 53.0
      },
      {
        "time": "2026-09-02 18:01:13",
        "lat": 2.298787,
        "lng": 99.915689,
        "speed": 50.0
      },
      {
        "time": "2026-09-02 18:02:23",
        "lat": 2.297631,
        "lng": 99.908596,
        "speed": 42.0
      },
      {
        "time": "2026-09-02 18:03:52",
        "lat": 2.289307,
        "lng": 99.907502,
        "speed": 14.0
      },
      {
        "time": "2026-09-02 18:05:03",
        "lat": 2.284011,
        "lng": 99.902844,
        "speed": 40.0
      },
      {
        "time": "2026-09-02 18:06:23",
        "lat": 2.277673,
        "lng": 99.897413,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 18:07:23",
        "lat": 2.274881,
        "lng": 99.892436,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 18:08:23",
        "lat": 2.272917,
        "lng": 99.888284,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 18:09:43",
        "lat": 2.267912,
        "lng": 99.883387,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 18:10:53",
        "lat": 2.262955,
        "lng": 99.880791,
        "speed": 35.0
      },
      {
        "time": "2026-09-02 18:11:53",
        "lat": 2.264268,
        "lng": 99.876338,
        "speed": 51.0
      },
      {
        "time": "2026-09-02 18:13:13",
        "lat": 2.260777,
        "lng": 99.868569,
        "speed": 50.0
      },
      {
        "time": "2026-09-02 18:14:33",
        "lat": 2.265302,
        "lng": 99.859876,
        "speed": 46.0
      },
      {
        "time": "2026-09-02 18:15:14",
        "lat": 2.266639,
        "lng": 99.857564,
        "speed": 10.0
      },
      {
        "time": "2026-09-02 18:16:13",
        "lat": 2.267123,
        "lng": 99.854462,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 18:17:23",
        "lat": 2.272247,
        "lng": 99.84984,
        "speed": 49.0
      },
      {
        "time": "2026-09-02 18:18:33",
        "lat": 2.270595,
        "lng": 99.842169,
        "speed": 30.0
      },
      {
        "time": "2026-09-02 18:19:23",
        "lat": 2.273115,
        "lng": 99.843182,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 18:19:49",
        "lat": 2.274198,
        "lng": 99.844027,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 18:21:03",
        "lat": 2.279377,
        "lng": 99.844338,
        "speed": 7.0
      },
      {
        "time": "2026-09-02 18:22:43",
        "lat": 2.277113,
        "lng": 99.844356,
        "speed": 27.0
      },
      {
        "time": "2026-09-02 18:23:32",
        "lat": 2.274578,
        "lng": 99.844267,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 18:24:23",
        "lat": 2.272399,
        "lng": 99.842676,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 18:25:19",
        "lat": 2.270728,
        "lng": 99.842462,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 18:26:48",
        "lat": 2.270756,
        "lng": 99.842853,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 19:37:58",
        "lat": 2.270771,
        "lng": 99.842818,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 19:38:25",
        "lat": 2.270438,
        "lng": 99.841724,
        "speed": 15.0
      },
      {
        "time": "2026-09-02 19:39:09",
        "lat": 2.272627,
        "lng": 99.842844,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 19:39:49",
        "lat": 2.27432,
        "lng": 99.844089,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 19:40:25",
        "lat": 2.276508,
        "lng": 99.84432,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 19:41:02",
        "lat": 2.278861,
        "lng": 99.844311,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 19:41:49",
        "lat": 2.281849,
        "lng": 99.844284,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 19:43:09",
        "lat": 2.287112,
        "lng": 99.844267,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 19:44:06",
        "lat": 2.290871,
        "lng": 99.844267,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 19:45:09",
        "lat": 2.295204,
        "lng": 99.844267,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 19:46:29",
        "lat": 2.300477,
        "lng": 99.844222,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 19:47:22",
        "lat": 2.303936,
        "lng": 99.844124,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 19:47:57",
        "lat": 2.305792,
        "lng": 99.843378,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 19:48:49",
        "lat": 2.308835,
        "lng": 99.84336,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 19:49:29",
        "lat": 2.311467,
        "lng": 99.843333,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 19:49:59",
        "lat": 2.312756,
        "lng": 99.843342,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 19:51:03",
        "lat": 2.315957,
        "lng": 99.843422,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 19:51:37",
        "lat": 2.315947,
        "lng": 99.845476,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 19:52:29",
        "lat": 2.315992,
        "lng": 99.849076,
        "speed": 28.0
      },
      {
        "time": "2026-09-02 19:53:29",
        "lat": 2.316005,
        "lng": 99.85368,
        "speed": 31.0
      },
      {
        "time": "2026-09-02 19:54:19",
        "lat": 2.316031,
        "lng": 99.85728,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 19:55:33",
        "lat": 2.316058,
        "lng": 99.862436,
        "speed": 29.0
      },
      {
        "time": "2026-09-02 19:56:39",
        "lat": 2.316112,
        "lng": 99.867013,
        "speed": 8.0
      },
      {
        "time": "2026-09-02 20:18:37",
        "lat": 2.316136,
        "lng": 99.867191,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 20:19:29",
        "lat": 2.318412,
        "lng": 99.868702,
        "speed": 44.0
      },
      {
        "time": "2026-09-02 20:19:59",
        "lat": 2.317829,
        "lng": 99.871724,
        "speed": 42.0
      },
      {
        "time": "2026-09-02 20:20:29",
        "lat": 2.318279,
        "lng": 99.873822,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 20:20:59",
        "lat": 2.315583,
        "lng": 99.874169,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 20:21:39",
        "lat": 2.311699,
        "lng": 99.874338,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 20:22:25",
        "lat": 2.307305,
        "lng": 99.874498,
        "speed": 37.0
      },
      {
        "time": "2026-09-02 20:22:59",
        "lat": 2.303979,
        "lng": 99.874364,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 20:23:39",
        "lat": 2.300152,
        "lng": 99.874302,
        "speed": 36.0
      },
      {
        "time": "2026-09-02 20:24:29",
        "lat": 2.295357,
        "lng": 99.874142,
        "speed": 33.0
      },
      {
        "time": "2026-09-02 20:25:14",
        "lat": 2.290426,
        "lng": 99.873973,
        "speed": 43.0
      },
      {
        "time": "2026-09-02 20:25:59",
        "lat": 2.286189,
        "lng": 99.873973,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 20:27:07",
        "lat": 2.279573,
        "lng": 99.873956,
        "speed": 39.0
      },
      {
        "time": "2026-09-02 20:27:48",
        "lat": 2.276912,
        "lng": 99.874782,
        "speed": 32.0
      },
      {
        "time": "2026-09-02 20:28:29",
        "lat": 2.273674,
        "lng": 99.876418,
        "speed": 38.0
      },
      {
        "time": "2026-09-02 20:29:49",
        "lat": 2.267669,
        "lng": 99.881138,
        "speed": 45.0
      },
      {
        "time": "2026-09-02 21:22:01",
        "lat": 2.267463,
        "lng": 99.883182,
        "speed": 2.0
      },
      {
        "time": "2026-09-02 21:22:34",
        "lat": 2.267857,
        "lng": 99.883298,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 21:23:17",
        "lat": 2.269702,
        "lng": 99.884693,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 21:24:02",
        "lat": 2.271731,
        "lng": 99.886542,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 21:24:29",
        "lat": 2.272605,
        "lng": 99.887822,
        "speed": 21.0
      },
      {
        "time": "2026-09-02 21:25:09",
        "lat": 2.274041,
        "lng": 99.889476,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 21:25:59",
        "lat": 2.27479,
        "lng": 99.891973,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 21:26:29",
        "lat": 2.275559,
        "lng": 99.893484,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 21:27:49",
        "lat": 2.277675,
        "lng": 99.897396,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 21:29:06",
        "lat": 2.281314,
        "lng": 99.900667,
        "speed": 25.0
      },
      {
        "time": "2026-09-02 21:30:09",
        "lat": 2.284558,
        "lng": 99.903333,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 21:31:29",
        "lat": 2.288868,
        "lng": 99.906898,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 21:32:29",
        "lat": 2.290619,
        "lng": 99.90768,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 21:34:07",
        "lat": 2.292621,
        "lng": 99.907876,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 21:57:11",
        "lat": 2.292657,
        "lng": 99.907956,
        "speed": 10.0
      },
      {
        "time": "2026-09-02 21:57:51",
        "lat": 2.294144,
        "lng": 99.908169,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 21:58:31",
        "lat": 2.29597,
        "lng": 99.908382,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 21:59:01",
        "lat": 2.297417,
        "lng": 99.908578,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 21:59:43",
        "lat": 2.298641,
        "lng": 99.909396,
        "speed": 12.0
      },
      {
        "time": "2026-09-02 22:00:50",
        "lat": 2.298815,
        "lng": 99.909307,
        "speed": 0.0
      },
      {
        "time": "2026-09-02 23:29:31",
        "lat": 2.29872,
        "lng": 99.911422,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 23:30:01",
        "lat": 2.298731,
        "lng": 99.912853,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 23:30:53",
        "lat": 2.298765,
        "lng": 99.915164,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 23:31:39",
        "lat": 2.298806,
        "lng": 99.917236,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 23:32:06",
        "lat": 2.298841,
        "lng": 99.918427,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 23:32:47",
        "lat": 2.298878,
        "lng": 99.920364,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 23:33:17",
        "lat": 2.298918,
        "lng": 99.921858,
        "speed": 20.0
      },
      {
        "time": "2026-09-02 23:34:10",
        "lat": 2.298981,
        "lng": 99.924533,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 23:35:06",
        "lat": 2.299016,
        "lng": 99.927404,
        "speed": 22.0
      },
      {
        "time": "2026-09-02 23:36:01",
        "lat": 2.298953,
        "lng": 99.930178,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 23:37:03",
        "lat": 2.298869,
        "lng": 99.933138,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 23:37:35",
        "lat": 2.298973,
        "lng": 99.934569,
        "speed": 16.0
      },
      {
        "time": "2026-09-02 23:38:11",
        "lat": 2.299033,
        "lng": 99.936213,
        "speed": 18.0
      },
      {
        "time": "2026-09-02 23:39:11",
        "lat": 2.299133,
        "lng": 99.938649,
        "speed": 13.0
      },
      {
        "time": "2026-09-02 23:42:01",
        "lat": 2.298481,
        "lng": 99.938978,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 23:43:01",
        "lat": 2.294374,
        "lng": 99.939093,
        "speed": 26.0
      },
      {
        "time": "2026-09-02 23:44:09",
        "lat": 2.290416,
        "lng": 99.939209,
        "speed": 19.0
      },
      {
        "time": "2026-09-02 23:45:51",
        "lat": 2.290219,
        "lng": 99.939209,
        "speed": 17.0
      },
      {
        "time": "2026-09-02 23:46:14",
        "lat": 2.291272,
        "lng": 99.939191,
        "speed": 15.0
      },
      {
        "time": "2026-09-02 23:47:11",
        "lat": 2.294263,
        "lng": 99.939111,
        "speed": 23.0
      },
      {
        "time": "2026-09-02 23:48:21",
        "lat": 2.298294,
        "lng": 99.939013,
        "speed": 24.0
      },
      {
        "time": "2026-09-02 23:48:55",
        "lat": 2.299046,
        "lng": 99.938996,
        "speed": 0.0
      }
    ]
  },
  "2026-09-03__V-PHH-01": {
    "date": "2026-09-03",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-03 00:01:58",
        "lat": 2.299107,
        "lng": 99.938969,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 00:02:26",
        "lat": 2.299752,
        "lng": 99.938969,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 00:03:16",
        "lat": 2.304422,
        "lng": 99.938853,
        "speed": 41.0
      },
      {
        "time": "2026-09-03 00:04:13",
        "lat": 2.306789,
        "lng": 99.938809,
        "speed": 15.0
      },
      {
        "time": "2026-09-03 00:04:53",
        "lat": 2.303504,
        "lng": 99.938862,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 00:05:46",
        "lat": 2.299139,
        "lng": 99.938764,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 00:06:36",
        "lat": 2.298964,
        "lng": 99.934427,
        "speed": 18.0
      },
      {
        "time": "2026-09-03 00:14:49",
        "lat": 2.298866,
        "lng": 99.932827,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 00:15:29",
        "lat": 2.298954,
        "lng": 99.930222,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 00:16:29",
        "lat": 2.294663,
        "lng": 99.929067,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 00:16:52",
        "lat": 2.292529,
        "lng": 99.928782,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 00:17:12",
        "lat": 2.290726,
        "lng": 99.928533,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 00:18:49",
        "lat": 2.290939,
        "lng": 99.928569,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 00:19:17",
        "lat": 2.293296,
        "lng": 99.928889,
        "speed": 32.0
      },
      {
        "time": "2026-09-03 00:19:39",
        "lat": 2.295289,
        "lng": 99.929156,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 00:20:12",
        "lat": 2.298356,
        "lng": 99.929556,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 00:20:39",
        "lat": 2.299012,
        "lng": 99.9284,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 00:21:14",
        "lat": 2.298997,
        "lng": 99.925609,
        "speed": 33.0
      },
      {
        "time": "2026-09-03 00:21:49",
        "lat": 2.298942,
        "lng": 99.922836,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 00:22:29",
        "lat": 2.298857,
        "lng": 99.919467,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 00:23:13",
        "lat": 2.298776,
        "lng": 99.915787,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 00:23:43",
        "lat": 2.29701,
        "lng": 99.915387,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 00:24:35",
        "lat": 2.293274,
        "lng": 99.91488,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 00:25:09",
        "lat": 2.291084,
        "lng": 99.914907,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 00:34:43",
        "lat": 2.289779,
        "lng": 99.915671,
        "speed": 18.0
      },
      {
        "time": "2026-09-03 00:35:56",
        "lat": 2.291299,
        "lng": 99.914747,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 00:36:23",
        "lat": 2.291794,
        "lng": 99.914471,
        "speed": 8.0
      },
      {
        "time": "2026-09-03 00:36:53",
        "lat": 2.292476,
        "lng": 99.914062,
        "speed": 12.0
      },
      {
        "time": "2026-09-03 00:37:23",
        "lat": 2.293441,
        "lng": 99.913493,
        "speed": 17.0
      },
      {
        "time": "2026-09-03 00:38:13",
        "lat": 2.295261,
        "lng": 99.912747,
        "speed": 18.0
      },
      {
        "time": "2026-09-03 00:39:12",
        "lat": 2.298496,
        "lng": 99.913244,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 00:39:53",
        "lat": 2.298704,
        "lng": 99.911129,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 00:40:21",
        "lat": 2.298582,
        "lng": 99.909564,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 00:41:03",
        "lat": 2.297199,
        "lng": 99.908533,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 00:41:43",
        "lat": 2.294981,
        "lng": 99.908249,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 00:42:06",
        "lat": 2.2939,
        "lng": 99.908133,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 00:42:26",
        "lat": 2.293076,
        "lng": 99.908027,
        "speed": 12.0
      },
      {
        "time": "2026-09-03 00:43:13",
        "lat": 2.291238,
        "lng": 99.907733,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 00:43:35",
        "lat": 2.290064,
        "lng": 99.9076,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 00:44:20",
        "lat": 2.289442,
        "lng": 99.90752,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 01:42:12",
        "lat": 2.291673,
        "lng": 99.907849,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 01:43:40",
        "lat": 2.292614,
        "lng": 99.907947,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 01:44:42",
        "lat": 2.291669,
        "lng": 99.907813,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 01:45:17",
        "lat": 2.289544,
        "lng": 99.907556,
        "speed": 4.0
      },
      {
        "time": "2026-09-03 05:37:39",
        "lat": 2.289399,
        "lng": 99.907556,
        "speed": 2.0
      },
      {
        "time": "2026-09-03 05:38:30",
        "lat": 2.293335,
        "lng": 99.908107,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 05:39:00",
        "lat": 2.296198,
        "lng": 99.908418,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 05:39:34",
        "lat": 2.298573,
        "lng": 99.909191,
        "speed": 20.0
      },
      {
        "time": "2026-09-03 05:39:58",
        "lat": 2.298784,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 06:10:13",
        "lat": 2.298812,
        "lng": 99.909307,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 06:10:53",
        "lat": 2.298625,
        "lng": 99.909867,
        "speed": 13.0
      },
      {
        "time": "2026-09-03 06:12:45",
        "lat": 2.299068,
        "lng": 99.909564,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 06:24:27",
        "lat": 2.29897,
        "lng": 99.90968,
        "speed": 10.0
      },
      {
        "time": "2026-09-03 06:40:37",
        "lat": 2.298571,
        "lng": 99.909813,
        "speed": 14.0
      },
      {
        "time": "2026-09-03 07:15:25",
        "lat": 2.298739,
        "lng": 99.909378,
        "speed": 15.0
      },
      {
        "time": "2026-09-03 07:16:05",
        "lat": 2.297578,
        "lng": 99.910969,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 07:17:15",
        "lat": 2.294112,
        "lng": 99.913084,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 07:18:25",
        "lat": 2.290426,
        "lng": 99.91528,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 10:06:59",
        "lat": 2.289626,
        "lng": 99.916507,
        "speed": 15.0
      },
      {
        "time": "2026-09-03 10:08:04",
        "lat": 2.293359,
        "lng": 99.917102,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 10:09:14",
        "lat": 2.298558,
        "lng": 99.917769,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 10:10:25",
        "lat": 2.298874,
        "lng": 99.921831,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 10:11:35",
        "lat": 2.298976,
        "lng": 99.926907,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 10:12:45",
        "lat": 2.298841,
        "lng": 99.932444,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 10:14:21",
        "lat": 2.298588,
        "lng": 99.933431,
        "speed": 8.0
      },
      {
        "time": "2026-09-03 10:20:45",
        "lat": 2.298963,
        "lng": 99.935689,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 10:21:45",
        "lat": 2.297326,
        "lng": 99.938978,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 10:22:55",
        "lat": 2.291113,
        "lng": 99.939164,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 10:24:25",
        "lat": 2.289919,
        "lng": 99.940818,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 10:26:25",
        "lat": 2.293315,
        "lng": 99.941244,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 10:27:20",
        "lat": 2.296888,
        "lng": 99.941244,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 10:31:35",
        "lat": 2.29911,
        "lng": 99.941324,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 10:32:35",
        "lat": 2.299417,
        "lng": 99.94408,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 10:33:35",
        "lat": 2.300812,
        "lng": 99.945627,
        "speed": 14.0
      },
      {
        "time": "2026-09-03 10:34:45",
        "lat": 2.303999,
        "lng": 99.945591,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 10:35:55",
        "lat": 2.306494,
        "lng": 99.946124,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 10:37:06",
        "lat": 2.306459,
        "lng": 99.947529,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 10:52:09",
        "lat": 2.306041,
        "lng": 99.949867,
        "speed": 17.0
      },
      {
        "time": "2026-09-03 10:53:29",
        "lat": 2.306359,
        "lng": 99.95304,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 10:54:24",
        "lat": 2.308888,
        "lng": 99.955049,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 10:54:46",
        "lat": 2.308961,
        "lng": 99.956409,
        "speed": 12.0
      },
      {
        "time": "2026-09-03 10:55:09",
        "lat": 2.309881,
        "lng": 99.956382,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 10:56:19",
        "lat": 2.317273,
        "lng": 99.956284,
        "speed": 46.0
      },
      {
        "time": "2026-09-03 10:57:00",
        "lat": 2.319016,
        "lng": 99.957307,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 10:57:46",
        "lat": 2.319073,
        "lng": 99.960364,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 10:58:19",
        "lat": 2.319109,
        "lng": 99.962658,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 10:59:15",
        "lat": 2.319177,
        "lng": 99.96664,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 11:00:09",
        "lat": 2.319243,
        "lng": 99.970391,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 11:01:09",
        "lat": 2.322272,
        "lng": 99.970738,
        "speed": 32.0
      },
      {
        "time": "2026-09-03 11:01:59",
        "lat": 2.325981,
        "lng": 99.970747,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 11:17:26",
        "lat": 2.326066,
        "lng": 99.971796,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 11:18:46",
        "lat": 2.323828,
        "lng": 99.972427,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 11:19:56",
        "lat": 2.319618,
        "lng": 99.972524,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 11:21:06",
        "lat": 2.319359,
        "lng": 99.97616,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 11:22:16",
        "lat": 2.319454,
        "lng": 99.9812,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 11:23:01",
        "lat": 2.319484,
        "lng": 99.984293,
        "speed": 14.0
      },
      {
        "time": "2026-09-03 11:23:45",
        "lat": 2.318391,
        "lng": 99.984356,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 13:43:43",
        "lat": 2.313764,
        "lng": 99.984302,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 13:44:34",
        "lat": 2.309172,
        "lng": 99.984302,
        "speed": 19.0
      },
      {
        "time": "2026-09-03 13:45:34",
        "lat": 2.309072,
        "lng": 99.97928,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 13:46:44",
        "lat": 2.308994,
        "lng": 99.972187,
        "speed": 43.0
      },
      {
        "time": "2026-09-03 13:47:54",
        "lat": 2.308936,
        "lng": 99.964329,
        "speed": 48.0
      },
      {
        "time": "2026-09-03 13:49:04",
        "lat": 2.308936,
        "lng": 99.956951,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 13:49:54",
        "lat": 2.303875,
        "lng": 99.956444,
        "speed": 44.0
      },
      {
        "time": "2026-09-03 13:50:44",
        "lat": 2.299853,
        "lng": 99.955956,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 13:51:54",
        "lat": 2.299743,
        "lng": 99.949573,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 13:52:26",
        "lat": 2.299579,
        "lng": 99.947369,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 13:52:54",
        "lat": 2.299517,
        "lng": 99.9456,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 13:54:04",
        "lat": 2.299149,
        "lng": 99.938756,
        "speed": 41.0
      },
      {
        "time": "2026-09-03 13:55:04",
        "lat": 2.298907,
        "lng": 99.933493,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 13:56:07",
        "lat": 2.299037,
        "lng": 99.928453,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 13:56:54",
        "lat": 2.29895,
        "lng": 99.923893,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 13:57:24",
        "lat": 2.298878,
        "lng": 99.92088,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 13:57:58",
        "lat": 2.298713,
        "lng": 99.917796,
        "speed": 18.0
      },
      {
        "time": "2026-09-03 13:59:04",
        "lat": 2.292376,
        "lng": 99.91696,
        "speed": 42.0
      },
      {
        "time": "2026-09-03 13:59:39",
        "lat": 2.289589,
        "lng": 99.916587,
        "speed": 3.0
      },
      {
        "time": "2026-09-03 14:05:27",
        "lat": 2.289557,
        "lng": 99.91584,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 14:06:04",
        "lat": 2.290668,
        "lng": 99.915138,
        "speed": 32.0
      },
      {
        "time": "2026-09-03 14:06:34",
        "lat": 2.292421,
        "lng": 99.91408,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 14:07:01",
        "lat": 2.294068,
        "lng": 99.913102,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 14:07:43",
        "lat": 2.297728,
        "lng": 99.910889,
        "speed": 42.0
      },
      {
        "time": "2026-09-03 14:08:18",
        "lat": 2.298762,
        "lng": 99.909396,
        "speed": 16.0
      },
      {
        "time": "2026-09-03 14:11:47",
        "lat": 2.298798,
        "lng": 99.909342,
        "speed": 5.0
      },
      {
        "time": "2026-09-03 14:12:42",
        "lat": 2.298744,
        "lng": 99.911689,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 14:13:14",
        "lat": 2.298758,
        "lng": 99.913689,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 14:14:14",
        "lat": 2.298835,
        "lng": 99.917378,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 14:14:48",
        "lat": 2.29889,
        "lng": 99.91952,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 14:15:24",
        "lat": 2.298938,
        "lng": 99.921662,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 14:16:24",
        "lat": 2.299002,
        "lng": 99.92528,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 14:17:04",
        "lat": 2.298316,
        "lng": 99.92664,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 14:17:46",
        "lat": 2.295911,
        "lng": 99.926382,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 14:18:54",
        "lat": 2.291651,
        "lng": 99.925778,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 14:19:30",
        "lat": 2.289813,
        "lng": 99.925502,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 14:36:18",
        "lat": 2.289673,
        "lng": 99.925716,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 14:37:34",
        "lat": 2.291615,
        "lng": 99.925769,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 14:38:47",
        "lat": 2.295908,
        "lng": 99.926382,
        "speed": 5.0
      },
      {
        "time": "2026-09-03 14:39:34",
        "lat": 2.295593,
        "lng": 99.926444,
        "speed": 12.0
      },
      {
        "time": "2026-09-03 14:40:00",
        "lat": 2.296551,
        "lng": 99.926498,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 14:40:34",
        "lat": 2.298797,
        "lng": 99.926756,
        "speed": 16.0
      },
      {
        "time": "2026-09-03 14:41:14",
        "lat": 2.299043,
        "lng": 99.928924,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 14:41:54",
        "lat": 2.298911,
        "lng": 99.931653,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 14:43:24",
        "lat": 2.298925,
        "lng": 99.933511,
        "speed": 20.0
      },
      {
        "time": "2026-09-03 14:43:54",
        "lat": 2.298947,
        "lng": 99.933884,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 14:44:54",
        "lat": 2.299104,
        "lng": 99.937671,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 14:45:44",
        "lat": 2.29931,
        "lng": 99.941449,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 14:46:34",
        "lat": 2.299502,
        "lng": 99.945342,
        "speed": 20.0
      },
      {
        "time": "2026-09-03 14:47:04",
        "lat": 2.298304,
        "lng": 99.945627,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 14:48:14",
        "lat": 2.293292,
        "lng": 99.945751,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 14:48:50",
        "lat": 2.291423,
        "lng": 99.945867,
        "speed": 6.0
      },
      {
        "time": "2026-09-03 15:39:00",
        "lat": 2.291378,
        "lng": 99.945884,
        "speed": 8.0
      },
      {
        "time": "2026-09-03 15:39:30",
        "lat": 2.293195,
        "lng": 99.945769,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 15:40:14",
        "lat": 2.297027,
        "lng": 99.945689,
        "speed": 33.0
      },
      {
        "time": "2026-09-03 15:40:50",
        "lat": 2.299442,
        "lng": 99.945484,
        "speed": 15.0
      },
      {
        "time": "2026-09-03 15:41:30",
        "lat": 2.299338,
        "lng": 99.942729,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 15:42:02",
        "lat": 2.299221,
        "lng": 99.940151,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 15:42:30",
        "lat": 2.299098,
        "lng": 99.937947,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 15:43:10",
        "lat": 2.298978,
        "lng": 99.934711,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 15:44:00",
        "lat": 2.298874,
        "lng": 99.932533,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 15:44:55",
        "lat": 2.299004,
        "lng": 99.928782,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 15:45:40",
        "lat": 2.298984,
        "lng": 99.925796,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 15:46:10",
        "lat": 2.298955,
        "lng": 99.924,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 15:46:40",
        "lat": 2.2989,
        "lng": 99.922071,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 15:47:40",
        "lat": 2.298836,
        "lng": 99.918293,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 15:48:30",
        "lat": 2.298747,
        "lng": 99.915058,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 15:49:02",
        "lat": 2.298717,
        "lng": 99.913058,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 15:49:40",
        "lat": 2.298619,
        "lng": 99.910373,
        "speed": 37.0
      },
      {
        "time": "2026-09-03 15:51:13",
        "lat": 2.298669,
        "lng": 99.909396,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 15:51:44",
        "lat": 2.298627,
        "lng": 99.910284,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 15:52:21",
        "lat": 2.298747,
        "lng": 99.913556,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 15:53:09",
        "lat": 2.298832,
        "lng": 99.918258,
        "speed": 42.0
      },
      {
        "time": "2026-09-03 15:53:44",
        "lat": 2.298921,
        "lng": 99.921973,
        "speed": 41.0
      },
      {
        "time": "2026-09-03 15:54:13",
        "lat": 2.298993,
        "lng": 99.925067,
        "speed": 42.0
      },
      {
        "time": "2026-09-03 15:54:40",
        "lat": 2.299046,
        "lng": 99.927991,
        "speed": 44.0
      },
      {
        "time": "2026-09-03 15:55:32",
        "lat": 2.298871,
        "lng": 99.932933,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 15:57:30",
        "lat": 2.298895,
        "lng": 99.931236,
        "speed": 39.0
      },
      {
        "time": "2026-09-03 15:58:05",
        "lat": 2.298995,
        "lng": 99.927831,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 15:58:38",
        "lat": 2.298948,
        "lng": 99.924676,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 15:59:20",
        "lat": 2.298865,
        "lng": 99.920756,
        "speed": 39.0
      },
      {
        "time": "2026-09-03 16:00:30",
        "lat": 2.298716,
        "lng": 99.913662,
        "speed": 41.0
      },
      {
        "time": "2026-09-03 16:01:10",
        "lat": 2.298573,
        "lng": 99.909769,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 18:54:15",
        "lat": 2.298838,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 19:54:09",
        "lat": 2.298669,
        "lng": 99.909404,
        "speed": 10.0
      },
      {
        "time": "2026-09-03 19:54:39",
        "lat": 2.298706,
        "lng": 99.910862,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 19:55:19",
        "lat": 2.298729,
        "lng": 99.913618,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 19:56:03",
        "lat": 2.298804,
        "lng": 99.916764,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 19:56:28",
        "lat": 2.298851,
        "lng": 99.918524,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 19:56:49",
        "lat": 2.298878,
        "lng": 99.919991,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 19:57:59",
        "lat": 2.298989,
        "lng": 99.924889,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 19:58:59",
        "lat": 2.299027,
        "lng": 99.92928,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 19:59:49",
        "lat": 2.298872,
        "lng": 99.932827,
        "speed": 20.0
      },
      {
        "time": "2026-09-03 20:00:15",
        "lat": 2.298982,
        "lng": 99.934329,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 20:00:52",
        "lat": 2.299088,
        "lng": 99.936853,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 20:01:37",
        "lat": 2.299269,
        "lng": 99.940231,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 20:02:15",
        "lat": 2.299413,
        "lng": 99.943129,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 20:03:09",
        "lat": 2.299608,
        "lng": 99.947467,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 20:03:49",
        "lat": 2.299802,
        "lng": 99.950649,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 20:04:29",
        "lat": 2.299824,
        "lng": 99.953858,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 20:05:08",
        "lat": 2.299951,
        "lng": 99.956462,
        "speed": 16.0
      },
      {
        "time": "2026-09-03 20:06:09",
        "lat": 2.304667,
        "lng": 99.956427,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 20:06:59",
        "lat": 2.309113,
        "lng": 99.956382,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 20:08:09",
        "lat": 2.315148,
        "lng": 99.956302,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 20:08:44",
        "lat": 2.318109,
        "lng": 99.956267,
        "speed": 33.0
      },
      {
        "time": "2026-09-03 20:09:49",
        "lat": 2.323552,
        "lng": 99.956187,
        "speed": 33.0
      },
      {
        "time": "2026-09-03 20:10:30",
        "lat": 2.326089,
        "lng": 99.955973,
        "speed": 8.0
      },
      {
        "time": "2026-09-03 20:59:35",
        "lat": 2.326117,
        "lng": 99.955876,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 21:00:10",
        "lat": 2.32612,
        "lng": 99.955938,
        "speed": 3.0
      },
      {
        "time": "2026-09-03 21:00:39",
        "lat": 2.324604,
        "lng": 99.956151,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:01:09",
        "lat": 2.321993,
        "lng": 99.956196,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 21:01:31",
        "lat": 2.319893,
        "lng": 99.956231,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 21:01:49",
        "lat": 2.318194,
        "lng": 99.956249,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 21:02:19",
        "lat": 2.315283,
        "lng": 99.956302,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 21:02:41",
        "lat": 2.313105,
        "lng": 99.956329,
        "speed": 40.0
      },
      {
        "time": "2026-09-03 21:03:19",
        "lat": 2.309263,
        "lng": 99.956364,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:04:00",
        "lat": 2.308346,
        "lng": 99.954996,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 21:04:39",
        "lat": 2.306289,
        "lng": 99.954169,
        "speed": 32.0
      },
      {
        "time": "2026-09-03 21:05:29",
        "lat": 2.305267,
        "lng": 99.951271,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 21:05:59",
        "lat": 2.302584,
        "lng": 99.951076,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 21:06:45",
        "lat": 2.299744,
        "lng": 99.949956,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:07:03",
        "lat": 2.299637,
        "lng": 99.948444,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 21:07:39",
        "lat": 2.301894,
        "lng": 99.947911,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 21:08:18",
        "lat": 2.305474,
        "lng": 99.947636,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 21:09:40",
        "lat": 2.306491,
        "lng": 99.947422,
        "speed": 6.0
      },
      {
        "time": "2026-09-03 21:10:18",
        "lat": 2.30651,
        "lng": 99.946338,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 21:11:29",
        "lat": 2.306586,
        "lng": 99.945529,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 21:12:29",
        "lat": 2.306515,
        "lng": 99.943387,
        "speed": 7.0
      },
      {
        "time": "2026-09-03 21:13:03",
        "lat": 2.30657,
        "lng": 99.942516,
        "speed": 7.0
      },
      {
        "time": "2026-09-03 21:13:49",
        "lat": 2.306611,
        "lng": 99.94144,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 21:14:26",
        "lat": 2.306606,
        "lng": 99.940267,
        "speed": 13.0
      },
      {
        "time": "2026-09-03 21:14:57",
        "lat": 2.306552,
        "lng": 99.939209,
        "speed": 10.0
      },
      {
        "time": "2026-09-03 21:16:03",
        "lat": 2.306865,
        "lng": 99.938818,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 21:16:39",
        "lat": 2.305764,
        "lng": 99.938809,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 21:17:19",
        "lat": 2.303352,
        "lng": 99.938853,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 21:17:42",
        "lat": 2.301802,
        "lng": 99.938898,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 21:18:39",
        "lat": 2.298067,
        "lng": 99.938969,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 21:19:12",
        "lat": 2.295864,
        "lng": 99.939031,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 21:19:54",
        "lat": 2.292932,
        "lng": 99.939111,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 21:20:31",
        "lat": 2.290749,
        "lng": 99.939182,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 21:21:55",
        "lat": 2.289948,
        "lng": 99.939209,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 21:22:24",
        "lat": 2.291542,
        "lng": 99.939164,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 21:22:42",
        "lat": 2.292751,
        "lng": 99.939129,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 21:23:04",
        "lat": 2.294259,
        "lng": 99.939093,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 21:23:29",
        "lat": 2.295923,
        "lng": 99.939049,
        "speed": 20.0
      },
      {
        "time": "2026-09-03 21:23:59",
        "lat": 2.298023,
        "lng": 99.938996,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 21:24:31",
        "lat": 2.299064,
        "lng": 99.938151,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 21:25:02",
        "lat": 2.298989,
        "lng": 99.93584,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:25:29",
        "lat": 2.298923,
        "lng": 99.93408,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 21:25:59",
        "lat": 2.298888,
        "lng": 99.932329,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 21:26:33",
        "lat": 2.29897,
        "lng": 99.92992,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 21:27:11",
        "lat": 2.299004,
        "lng": 99.927031,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 21:27:49",
        "lat": 2.298959,
        "lng": 99.924116,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 21:28:29",
        "lat": 2.298883,
        "lng": 99.920987,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:29:11",
        "lat": 2.298812,
        "lng": 99.917627,
        "speed": 32.0
      },
      {
        "time": "2026-09-03 21:29:47",
        "lat": 2.298749,
        "lng": 99.914924,
        "speed": 7.0
      },
      {
        "time": "2026-09-03 21:30:19",
        "lat": 2.299607,
        "lng": 99.915671,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 21:30:49",
        "lat": 2.301829,
        "lng": 99.915947,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 21:31:19",
        "lat": 2.303838,
        "lng": 99.916213,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 21:32:14",
        "lat": 2.306791,
        "lng": 99.916604,
        "speed": 13.0
      },
      {
        "time": "2026-09-03 21:32:47",
        "lat": 2.304883,
        "lng": 99.916329,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 21:33:19",
        "lat": 2.302485,
        "lng": 99.916018,
        "speed": 31.0
      },
      {
        "time": "2026-09-03 21:33:41",
        "lat": 2.300643,
        "lng": 99.915787,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 21:34:06",
        "lat": 2.298808,
        "lng": 99.915547,
        "speed": 14.0
      },
      {
        "time": "2026-09-03 21:34:39",
        "lat": 2.298739,
        "lng": 99.913449,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 21:35:39",
        "lat": 2.298775,
        "lng": 99.909378,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 22:05:05",
        "lat": 2.29872,
        "lng": 99.909396,
        "speed": 7.0
      },
      {
        "time": "2026-09-03 22:17:25",
        "lat": 2.298733,
        "lng": 99.913084,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 22:18:35",
        "lat": 2.298841,
        "lng": 99.918702,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 22:19:45",
        "lat": 2.298983,
        "lng": 99.924773,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 22:20:55",
        "lat": 2.298909,
        "lng": 99.931156,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 22:22:05",
        "lat": 2.299033,
        "lng": 99.936293,
        "speed": 35.0
      },
      {
        "time": "2026-09-03 22:23:15",
        "lat": 2.299339,
        "lng": 99.942693,
        "speed": 34.0
      },
      {
        "time": "2026-09-03 22:24:25",
        "lat": 2.299643,
        "lng": 99.948764,
        "speed": 33.0
      },
      {
        "time": "2026-09-03 22:25:35",
        "lat": 2.29982,
        "lng": 99.954818,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 22:26:45",
        "lat": 2.299904,
        "lng": 99.961049,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 22:27:55",
        "lat": 2.300037,
        "lng": 99.967387,
        "speed": 36.0
      },
      {
        "time": "2026-09-03 22:28:55",
        "lat": 2.299766,
        "lng": 99.968862,
        "speed": 11.0
      },
      {
        "time": "2026-09-03 22:29:35",
        "lat": 2.300026,
        "lng": 99.966276,
        "speed": 47.0
      },
      {
        "time": "2026-09-03 22:30:45",
        "lat": 2.299878,
        "lng": 99.958053,
        "speed": 51.0
      },
      {
        "time": "2026-09-03 22:31:55",
        "lat": 2.299642,
        "lng": 99.948444,
        "speed": 55.0
      },
      {
        "time": "2026-09-03 22:33:05",
        "lat": 2.299152,
        "lng": 99.938916,
        "speed": 53.0
      },
      {
        "time": "2026-09-03 22:34:15",
        "lat": 2.298938,
        "lng": 99.930782,
        "speed": 53.0
      },
      {
        "time": "2026-09-03 22:35:25",
        "lat": 2.298884,
        "lng": 99.920942,
        "speed": 54.0
      },
      {
        "time": "2026-09-03 22:36:35",
        "lat": 2.298716,
        "lng": 99.911502,
        "speed": 51.0
      },
      {
        "time": "2026-09-03 22:37:45",
        "lat": 2.300658,
        "lng": 99.909093,
        "speed": 38.0
      },
      {
        "time": "2026-09-03 22:39:13",
        "lat": 2.307132,
        "lng": 99.909813,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 23:17:12",
        "lat": 2.307144,
        "lng": 99.912418,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:18:12",
        "lat": 2.305539,
        "lng": 99.914453,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:19:22",
        "lat": 2.300513,
        "lng": 99.913547,
        "speed": 29.0
      },
      {
        "time": "2026-09-03 23:20:42",
        "lat": 2.298759,
        "lng": 99.913991,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 23:21:41",
        "lat": 2.298849,
        "lng": 99.91784,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:22:42",
        "lat": 2.298937,
        "lng": 99.921849,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:23:52",
        "lat": 2.299039,
        "lng": 99.926382,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:24:39",
        "lat": 2.299018,
        "lng": 99.929529,
        "speed": 17.0
      },
      {
        "time": "2026-09-03 23:25:42",
        "lat": 2.295346,
        "lng": 99.929129,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 23:26:52",
        "lat": 2.290562,
        "lng": 99.928498,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:27:38",
        "lat": 2.290031,
        "lng": 99.928436,
        "speed": 17.0
      },
      {
        "time": "2026-09-03 23:28:32",
        "lat": 2.293392,
        "lng": 99.928907,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 23:29:42",
        "lat": 2.298224,
        "lng": 99.929556,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 23:30:18",
        "lat": 2.298916,
        "lng": 99.93104,
        "speed": 28.0
      },
      {
        "time": "2026-09-03 23:30:50",
        "lat": 2.298883,
        "lng": 99.933076,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 23:31:43",
        "lat": 2.298858,
        "lng": 99.934098,
        "speed": 5.0
      },
      {
        "time": "2026-09-03 23:32:13",
        "lat": 2.298999,
        "lng": 99.934489,
        "speed": 16.0
      },
      {
        "time": "2026-09-03 23:33:12",
        "lat": 2.299122,
        "lng": 99.938089,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:33:52",
        "lat": 2.30037,
        "lng": 99.938933,
        "speed": 23.0
      },
      {
        "time": "2026-09-03 23:35:02",
        "lat": 2.304791,
        "lng": 99.938836,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:36:04",
        "lat": 2.306787,
        "lng": 99.938836,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 23:37:09",
        "lat": 2.305356,
        "lng": 99.938818,
        "speed": 22.0
      },
      {
        "time": "2026-09-03 23:37:52",
        "lat": 2.302694,
        "lng": 99.93888,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:38:12",
        "lat": 2.301418,
        "lng": 99.938933,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 23:38:47",
        "lat": 2.299153,
        "lng": 99.938978,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 23:39:22",
        "lat": 2.296831,
        "lng": 99.939013,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:39:52",
        "lat": 2.294821,
        "lng": 99.939067,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:40:22",
        "lat": 2.292938,
        "lng": 99.939129,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:41:12",
        "lat": 2.290011,
        "lng": 99.939209,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 23:42:02",
        "lat": 2.289901,
        "lng": 99.939813,
        "speed": 9.0
      },
      {
        "time": "2026-09-03 23:43:46",
        "lat": 2.289946,
        "lng": 99.941289,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 23:44:32",
        "lat": 2.292133,
        "lng": 99.941244,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:45:18",
        "lat": 2.29515,
        "lng": 99.941191,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:45:55",
        "lat": 2.297552,
        "lng": 99.94128,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 23:46:42",
        "lat": 2.298798,
        "lng": 99.941307,
        "speed": 21.0
      },
      {
        "time": "2026-09-03 23:47:32",
        "lat": 2.299374,
        "lng": 99.943716,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 23:48:41",
        "lat": 2.299679,
        "lng": 99.948071,
        "speed": 12.0
      },
      {
        "time": "2026-09-03 23:49:35",
        "lat": 2.303167,
        "lng": 99.947822,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 23:50:12",
        "lat": 2.305516,
        "lng": 99.947636,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:51:30",
        "lat": 2.306395,
        "lng": 99.947591,
        "speed": 0.0
      },
      {
        "time": "2026-09-03 23:52:32",
        "lat": 2.304296,
        "lng": 99.947707,
        "speed": 24.0
      },
      {
        "time": "2026-09-03 23:53:22",
        "lat": 2.301151,
        "lng": 99.947929,
        "speed": 26.0
      },
      {
        "time": "2026-09-03 23:54:22",
        "lat": 2.299532,
        "lng": 99.946071,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:55:22",
        "lat": 2.299339,
        "lng": 99.942124,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:56:08",
        "lat": 2.299171,
        "lng": 99.938996,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:56:48",
        "lat": 2.299037,
        "lng": 99.936267,
        "speed": 27.0
      },
      {
        "time": "2026-09-03 23:57:42",
        "lat": 2.298894,
        "lng": 99.93328,
        "speed": 15.0
      },
      {
        "time": "2026-09-03 23:58:32",
        "lat": 2.298952,
        "lng": 99.930489,
        "speed": 25.0
      },
      {
        "time": "2026-09-03 23:59:12",
        "lat": 2.299017,
        "lng": 99.927591,
        "speed": 30.0
      },
      {
        "time": "2026-09-03 23:59:52",
        "lat": 2.298993,
        "lng": 99.924756,
        "speed": 26.0
      }
    ]
  },
  "2026-09-04__V-PHH-01": {
    "date": "2026-09-04",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-04 00:00:02",
        "lat": 2.298983,
        "lng": 99.924071,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 00:00:42",
        "lat": 2.298897,
        "lng": 99.921244,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 00:01:32",
        "lat": 2.298836,
        "lng": 99.917582,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 00:02:22",
        "lat": 2.298771,
        "lng": 99.913849,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 00:03:01",
        "lat": 2.298994,
        "lng": 99.913298,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 00:04:02",
        "lat": 2.299092,
        "lng": 99.913333,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 03:36:04",
        "lat": 2.300304,
        "lng": 99.913493,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 03:36:46",
        "lat": 2.302414,
        "lng": 99.913947,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 03:37:04",
        "lat": 2.303386,
        "lng": 99.914107,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 03:37:41",
        "lat": 2.305416,
        "lng": 99.914436,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 03:38:03",
        "lat": 2.30664,
        "lng": 99.914649,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 03:38:34",
        "lat": 2.307121,
        "lng": 99.913707,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 05:29:46",
        "lat": 2.307277,
        "lng": 99.912569,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 05:30:30",
        "lat": 2.307155,
        "lng": 99.910693,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 05:31:10",
        "lat": 2.305379,
        "lng": 99.9096,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 05:32:00",
        "lat": 2.300672,
        "lng": 99.909084,
        "speed": 35.0
      },
      {
        "time": "2026-09-04 05:32:30",
        "lat": 2.298787,
        "lng": 99.909342,
        "speed": 9.0
      },
      {
        "time": "2026-09-04 07:03:56",
        "lat": 2.298791,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 07:04:16",
        "lat": 2.298608,
        "lng": 99.9096,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 07:05:07",
        "lat": 2.298756,
        "lng": 99.915156,
        "speed": 36.0
      },
      {
        "time": "2026-09-04 07:06:09",
        "lat": 2.298911,
        "lng": 99.917796,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 07:06:47",
        "lat": 2.302223,
        "lng": 99.918213,
        "speed": 42.0
      },
      {
        "time": "2026-09-04 07:07:14",
        "lat": 2.304422,
        "lng": 99.918507,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 07:08:03",
        "lat": 2.300921,
        "lng": 99.918071,
        "speed": 39.0
      },
      {
        "time": "2026-09-04 07:08:22",
        "lat": 2.299129,
        "lng": 99.91784,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 07:08:57",
        "lat": 2.298895,
        "lng": 99.920284,
        "speed": 37.0
      },
      {
        "time": "2026-09-04 07:09:47",
        "lat": 2.299003,
        "lng": 99.925227,
        "speed": 39.0
      },
      {
        "time": "2026-09-04 07:10:17",
        "lat": 2.299039,
        "lng": 99.928178,
        "speed": 40.0
      },
      {
        "time": "2026-09-04 07:10:51",
        "lat": 2.298908,
        "lng": 99.931538,
        "speed": 41.0
      },
      {
        "time": "2026-09-04 07:11:27",
        "lat": 2.298514,
        "lng": 99.93328,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 07:52:04",
        "lat": 2.298647,
        "lng": 99.933476,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 07:52:50",
        "lat": 2.298837,
        "lng": 99.932587,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 08:04:57",
        "lat": 2.299116,
        "lng": 99.932391,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 08:05:34",
        "lat": 2.298871,
        "lng": 99.932018,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 08:06:19",
        "lat": 2.298859,
        "lng": 99.929644,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 08:07:04",
        "lat": 2.296448,
        "lng": 99.929298,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 08:07:44",
        "lat": 2.293895,
        "lng": 99.928951,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 08:08:34",
        "lat": 2.290589,
        "lng": 99.928498,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 08:31:16",
        "lat": 2.289627,
        "lng": 99.928382,
        "speed": 11.0
      },
      {
        "time": "2026-09-04 08:32:06",
        "lat": 2.289723,
        "lng": 99.927387,
        "speed": 8.0
      },
      {
        "time": "2026-09-04 08:32:31",
        "lat": 2.289731,
        "lng": 99.927049,
        "speed": 8.0
      },
      {
        "time": "2026-09-04 08:32:56",
        "lat": 2.289752,
        "lng": 99.926533,
        "speed": 8.0
      },
      {
        "time": "2026-09-04 08:35:11",
        "lat": 2.289761,
        "lng": 99.926053,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 08:35:36",
        "lat": 2.289773,
        "lng": 99.925582,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 08:35:48",
        "lat": 2.28999,
        "lng": 99.925502,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 08:36:26",
        "lat": 2.291985,
        "lng": 99.925813,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 08:36:56",
        "lat": 2.293693,
        "lng": 99.926044,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 08:37:37",
        "lat": 2.296123,
        "lng": 99.926418,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 08:38:00",
        "lat": 2.297448,
        "lng": 99.926587,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 08:38:20",
        "lat": 2.29863,
        "lng": 99.926711,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 08:38:53",
        "lat": 2.300092,
        "lng": 99.926907,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 08:39:07",
        "lat": 2.301006,
        "lng": 99.927004,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 08:39:26",
        "lat": 2.30217,
        "lng": 99.927147,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 08:40:06",
        "lat": 2.304769,
        "lng": 99.927493,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 08:40:36",
        "lat": 2.306816,
        "lng": 99.927733,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 08:46:06",
        "lat": 2.307031,
        "lng": 99.927982,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 08:46:56",
        "lat": 2.307053,
        "lng": 99.929476,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 08:47:20",
        "lat": 2.307073,
        "lng": 99.930249,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 08:48:08",
        "lat": 2.307068,
        "lng": 99.930676,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 09:51:29",
        "lat": 2.305747,
        "lng": 99.930516,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 09:51:50",
        "lat": 2.304304,
        "lng": 99.93032,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 09:52:30",
        "lat": 2.300765,
        "lng": 99.929849,
        "speed": 36.0
      },
      {
        "time": "2026-09-04 09:53:06",
        "lat": 2.299018,
        "lng": 99.928844,
        "speed": 36.0
      },
      {
        "time": "2026-09-04 09:53:40",
        "lat": 2.298953,
        "lng": 99.925502,
        "speed": 40.0
      },
      {
        "time": "2026-09-04 09:54:10",
        "lat": 2.298894,
        "lng": 99.922507,
        "speed": 45.0
      },
      {
        "time": "2026-09-04 09:54:58",
        "lat": 2.29878,
        "lng": 99.917209,
        "speed": 47.0
      },
      {
        "time": "2026-09-04 09:55:40",
        "lat": 2.298696,
        "lng": 99.912178,
        "speed": 47.0
      },
      {
        "time": "2026-09-04 09:56:14",
        "lat": 2.298722,
        "lng": 99.909396,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 10:10:10",
        "lat": 2.298791,
        "lng": 99.909324,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 10:10:38",
        "lat": 2.298594,
        "lng": 99.910071,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 10:11:28",
        "lat": 2.298744,
        "lng": 99.913902,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 10:12:18",
        "lat": 2.298836,
        "lng": 99.918356,
        "speed": 35.0
      },
      {
        "time": "2026-09-04 10:13:08",
        "lat": 2.298933,
        "lng": 99.922507,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 10:13:38",
        "lat": 2.298466,
        "lng": 99.922187,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 10:14:05",
        "lat": 2.298035,
        "lng": 99.922676,
        "speed": 7.0
      },
      {
        "time": "2026-09-04 13:41:32",
        "lat": 2.297977,
        "lng": 99.922507,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 13:42:06",
        "lat": 2.298902,
        "lng": 99.922053,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 13:42:52",
        "lat": 2.298824,
        "lng": 99.918444,
        "speed": 31.0
      },
      {
        "time": "2026-09-04 13:43:42",
        "lat": 2.298749,
        "lng": 99.914436,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 13:44:32",
        "lat": 2.298633,
        "lng": 99.910302,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 13:45:18",
        "lat": 2.298861,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 14:09:25",
        "lat": 2.298604,
        "lng": 99.910169,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 14:10:15",
        "lat": 2.298755,
        "lng": 99.913556,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 14:11:05",
        "lat": 2.298824,
        "lng": 99.917396,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 14:11:55",
        "lat": 2.298912,
        "lng": 99.921147,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 14:12:45",
        "lat": 2.299004,
        "lng": 99.925164,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 14:13:35",
        "lat": 2.299037,
        "lng": 99.929084,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 14:14:20",
        "lat": 2.298992,
        "lng": 99.9324,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 14:15:05",
        "lat": 2.301846,
        "lng": 99.932453,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 14:15:55",
        "lat": 2.305459,
        "lng": 99.932418,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 14:16:35",
        "lat": 2.307011,
        "lng": 99.932942,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 14:17:25",
        "lat": 2.307002,
        "lng": 99.934667,
        "speed": 9.0
      },
      {
        "time": "2026-09-04 14:18:15",
        "lat": 2.306942,
        "lng": 99.936133,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 14:18:57",
        "lat": 2.30645,
        "lng": 99.936818,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 14:20:35",
        "lat": 2.306251,
        "lng": 99.936853,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 14:21:05",
        "lat": 2.306837,
        "lng": 99.937253,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 14:21:55",
        "lat": 2.306919,
        "lng": 99.938347,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 14:22:40",
        "lat": 2.306332,
        "lng": 99.938764,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 14:23:15",
        "lat": 2.304432,
        "lng": 99.938836,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 14:24:05",
        "lat": 2.301239,
        "lng": 99.938916,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 14:24:55",
        "lat": 2.298176,
        "lng": 99.938969,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 14:25:45",
        "lat": 2.294585,
        "lng": 99.939049,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 14:26:35",
        "lat": 2.291137,
        "lng": 99.939164,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 14:27:36",
        "lat": 2.289861,
        "lng": 99.939369,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 14:44:22",
        "lat": 2.289873,
        "lng": 99.940169,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 14:45:45",
        "lat": 2.289987,
        "lng": 99.941307,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 14:53:28",
        "lat": 2.290894,
        "lng": 99.941307,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 14:54:18",
        "lat": 2.293015,
        "lng": 99.941244,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 14:55:08",
        "lat": 2.295283,
        "lng": 99.941191,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 14:55:58",
        "lat": 2.297646,
        "lng": 99.94128,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 14:56:38",
        "lat": 2.299243,
        "lng": 99.941476,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 14:57:28",
        "lat": 2.299415,
        "lng": 99.944418,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 14:58:18",
        "lat": 2.299518,
        "lng": 99.947022,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 14:59:02",
        "lat": 2.299456,
        "lng": 99.948071,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 14:59:38",
        "lat": 2.297734,
        "lng": 99.948196,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 15:00:28",
        "lat": 2.295064,
        "lng": 99.948444,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 15:01:18",
        "lat": 2.292228,
        "lng": 99.948658,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 15:01:54",
        "lat": 2.290212,
        "lng": 99.948844,
        "speed": 6.0
      },
      {
        "time": "2026-09-04 15:02:38",
        "lat": 2.290194,
        "lng": 99.949431,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 15:03:28",
        "lat": 2.290541,
        "lng": 99.951289,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 15:04:18",
        "lat": 2.293121,
        "lng": 99.951431,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 15:04:58",
        "lat": 2.293323,
        "lng": 99.953013,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 15:05:48",
        "lat": 2.293222,
        "lng": 99.954996,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 15:06:24",
        "lat": 2.293168,
        "lng": 99.956542,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 15:07:08",
        "lat": 2.293099,
        "lng": 99.958827,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 15:07:56",
        "lat": 2.293018,
        "lng": 99.961849,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 15:08:28",
        "lat": 2.292985,
        "lng": 99.963964,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 15:09:04",
        "lat": 2.292969,
        "lng": 99.966018,
        "speed": 5.0
      },
      {
        "time": "2026-09-04 15:09:23",
        "lat": 2.292965,
        "lng": 99.96608,
        "speed": 3.0
      },
      {
        "time": "2026-09-04 15:09:48",
        "lat": 2.292936,
        "lng": 99.964889,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 15:10:38",
        "lat": 2.293134,
        "lng": 99.96352,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 15:11:28",
        "lat": 2.296106,
        "lng": 99.963467,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 15:11:58",
        "lat": 2.298121,
        "lng": 99.963422,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 15:12:48",
        "lat": 2.301621,
        "lng": 99.96336,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 15:13:38",
        "lat": 2.3057,
        "lng": 99.963298,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 15:14:22",
        "lat": 2.308869,
        "lng": 99.963351,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 15:15:08",
        "lat": 2.308903,
        "lng": 99.96704,
        "speed": 37.0
      },
      {
        "time": "2026-09-04 15:15:58",
        "lat": 2.30893,
        "lng": 99.971173,
        "speed": 34.0
      },
      {
        "time": "2026-09-04 15:16:48",
        "lat": 2.308962,
        "lng": 99.975093,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 15:17:30",
        "lat": 2.309033,
        "lng": 99.977573,
        "speed": 11.0
      },
      {
        "time": "2026-09-04 15:28:40",
        "lat": 2.309281,
        "lng": 99.977573,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 15:29:22",
        "lat": 2.30898,
        "lng": 99.976302,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 15:30:12",
        "lat": 2.308954,
        "lng": 99.972542,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 15:30:42",
        "lat": 2.308937,
        "lng": 99.969956,
        "speed": 39.0
      },
      {
        "time": "2026-09-04 15:31:32",
        "lat": 2.308894,
        "lng": 99.965289,
        "speed": 36.0
      },
      {
        "time": "2026-09-04 15:32:22",
        "lat": 2.308879,
        "lng": 99.960453,
        "speed": 40.0
      },
      {
        "time": "2026-09-04 15:33:12",
        "lat": 2.308883,
        "lng": 99.955484,
        "speed": 38.0
      },
      {
        "time": "2026-09-04 15:33:50",
        "lat": 2.306228,
        "lng": 99.954951,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 15:34:32",
        "lat": 2.306224,
        "lng": 99.951351,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 15:35:22",
        "lat": 2.301952,
        "lng": 99.950996,
        "speed": 35.0
      },
      {
        "time": "2026-09-04 15:36:02",
        "lat": 2.299712,
        "lng": 99.949884,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 15:36:42",
        "lat": 2.300763,
        "lng": 99.947964,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 15:37:32",
        "lat": 2.305057,
        "lng": 99.947636,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 17:37:21",
        "lat": 2.306442,
        "lng": 99.947591,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 17:37:55",
        "lat": 2.305033,
        "lng": 99.947671,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 17:38:25",
        "lat": 2.303092,
        "lng": 99.947822,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 17:39:15",
        "lat": 2.299769,
        "lng": 99.948071,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 17:39:55",
        "lat": 2.299506,
        "lng": 99.945947,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 17:40:45",
        "lat": 2.299341,
        "lng": 99.942676,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 17:41:15",
        "lat": 2.299312,
        "lng": 99.941209,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 17:41:55",
        "lat": 2.296999,
        "lng": 99.941244,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 17:42:45",
        "lat": 2.293289,
        "lng": 99.941209,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 17:43:34",
        "lat": 2.289997,
        "lng": 99.941307,
        "speed": 10.0
      },
      {
        "time": "2026-09-04 17:43:52",
        "lat": 2.29019,
        "lng": 99.941289,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 17:44:35",
        "lat": 2.292465,
        "lng": 99.941262,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 17:45:06",
        "lat": 2.294049,
        "lng": 99.941227,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 17:45:45",
        "lat": 2.295985,
        "lng": 99.941209,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 17:46:05",
        "lat": 2.297004,
        "lng": 99.941244,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 17:46:35",
        "lat": 2.298615,
        "lng": 99.941307,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 17:47:15",
        "lat": 2.299334,
        "lng": 99.942302,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 17:47:47",
        "lat": 2.299084,
        "lng": 99.943458,
        "speed": 11.0
      },
      {
        "time": "2026-09-04 17:59:02",
        "lat": 2.299026,
        "lng": 99.943573,
        "speed": 9.0
      },
      {
        "time": "2026-09-04 17:59:15",
        "lat": 2.299325,
        "lng": 99.943458,
        "speed": 4.0
      },
      {
        "time": "2026-09-04 17:59:52",
        "lat": 2.299349,
        "lng": 99.943182,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 18:00:32",
        "lat": 2.299218,
        "lng": 99.940462,
        "speed": 31.0
      },
      {
        "time": "2026-09-04 18:01:02",
        "lat": 2.299088,
        "lng": 99.93816,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 18:01:22",
        "lat": 2.299033,
        "lng": 99.936684,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 18:01:42",
        "lat": 2.298969,
        "lng": 99.935191,
        "speed": 31.0
      },
      {
        "time": "2026-09-04 18:02:12",
        "lat": 2.298878,
        "lng": 99.933307,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 18:02:52",
        "lat": 2.297393,
        "lng": 99.932347,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 18:03:20",
        "lat": 2.295391,
        "lng": 99.93224,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 18:03:42",
        "lat": 2.293867,
        "lng": 99.932196,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 18:04:17",
        "lat": 2.291477,
        "lng": 99.932142,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 18:04:46",
        "lat": 2.289748,
        "lng": 99.932133,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 18:05:12",
        "lat": 2.290342,
        "lng": 99.932133,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 18:05:42",
        "lat": 2.292001,
        "lng": 99.93216,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 18:06:22",
        "lat": 2.294716,
        "lng": 99.932213,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 18:07:12",
        "lat": 2.298193,
        "lng": 99.932373,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 18:07:52",
        "lat": 2.298916,
        "lng": 99.933867,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 18:08:42",
        "lat": 2.299044,
        "lng": 99.936898,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 18:08:55",
        "lat": 2.299089,
        "lng": 99.937742,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 18:09:21",
        "lat": 2.298926,
        "lng": 99.938969,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 18:12:57",
        "lat": 2.298786,
        "lng": 99.938978,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 18:13:17",
        "lat": 2.299152,
        "lng": 99.939093,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 18:13:42",
        "lat": 2.299249,
        "lng": 99.94056,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 18:14:32",
        "lat": 2.299395,
        "lng": 99.943991,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 18:16:56",
        "lat": 2.299114,
        "lng": 99.945716,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 18:55:49",
        "lat": 2.29878,
        "lng": 99.945644,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 18:56:06",
        "lat": 2.297871,
        "lng": 99.945653,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 18:56:29",
        "lat": 2.296588,
        "lng": 99.945671,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 18:57:09",
        "lat": 2.294067,
        "lng": 99.945716,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 18:57:22",
        "lat": 2.293238,
        "lng": 99.945751,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 18:57:59",
        "lat": 2.290829,
        "lng": 99.945813,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 18:59:41",
        "lat": 2.290148,
        "lng": 99.945867,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 19:00:10",
        "lat": 2.290897,
        "lng": 99.945831,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 19:00:25",
        "lat": 2.291661,
        "lng": 99.945813,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 19:00:59",
        "lat": 2.293655,
        "lng": 99.945733,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 19:01:29",
        "lat": 2.295519,
        "lng": 99.945689,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 19:01:51",
        "lat": 2.297019,
        "lng": 99.945671,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 19:02:18",
        "lat": 2.298829,
        "lng": 99.945644,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 19:02:43",
        "lat": 2.300331,
        "lng": 99.945644,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 19:03:03",
        "lat": 2.301665,
        "lng": 99.9456,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 19:03:19",
        "lat": 2.302713,
        "lng": 99.945591,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 19:03:44",
        "lat": 2.304398,
        "lng": 99.945556,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 19:04:25",
        "lat": 2.306596,
        "lng": 99.945787,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 19:05:13",
        "lat": 2.306514,
        "lng": 99.946507,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 19:05:49",
        "lat": 2.306535,
        "lng": 99.946889,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 19:06:18",
        "lat": 2.306448,
        "lng": 99.947369,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 19:06:30",
        "lat": 2.306491,
        "lng": 99.947413,
        "speed": 9.0
      },
      {
        "time": "2026-09-04 19:06:44",
        "lat": 2.306462,
        "lng": 99.947538,
        "speed": 5.0
      },
      {
        "time": "2026-09-04 19:07:15",
        "lat": 2.306376,
        "lng": 99.947538,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 19:07:29",
        "lat": 2.305749,
        "lng": 99.947591,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 19:07:59",
        "lat": 2.304238,
        "lng": 99.947707,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 19:08:10",
        "lat": 2.303633,
        "lng": 99.947751,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 19:08:29",
        "lat": 2.302532,
        "lng": 99.94784,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 19:09:00",
        "lat": 2.301179,
        "lng": 99.947911,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 19:09:19",
        "lat": 2.300479,
        "lng": 99.947982,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 19:09:43",
        "lat": 2.299615,
        "lng": 99.947911,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 19:09:59",
        "lat": 2.299546,
        "lng": 99.947138,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 19:10:19",
        "lat": 2.299497,
        "lng": 99.946089,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 19:11:00",
        "lat": 2.299394,
        "lng": 99.943893,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 19:11:30",
        "lat": 2.299319,
        "lng": 99.942311,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 19:11:59",
        "lat": 2.29925,
        "lng": 99.940773,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 19:12:29",
        "lat": 2.299153,
        "lng": 99.939129,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 19:12:52",
        "lat": 2.299103,
        "lng": 99.937956,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 19:13:09",
        "lat": 2.299069,
        "lng": 99.937191,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 19:13:31",
        "lat": 2.299017,
        "lng": 99.93608,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 19:14:03",
        "lat": 2.298827,
        "lng": 99.934702,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 19:24:35",
        "lat": 2.298672,
        "lng": 99.934667,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 19:25:55",
        "lat": 2.298984,
        "lng": 99.934569,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 19:26:35",
        "lat": 2.298881,
        "lng": 99.932507,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 19:27:25",
        "lat": 2.299013,
        "lng": 99.929022,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 19:27:55",
        "lat": 2.29899,
        "lng": 99.926844,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 19:28:25",
        "lat": 2.298971,
        "lng": 99.924773,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 19:28:54",
        "lat": 2.29893,
        "lng": 99.922836,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 19:29:19",
        "lat": 2.298882,
        "lng": 99.921058,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 19:29:45",
        "lat": 2.298834,
        "lng": 99.919156,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 19:30:35",
        "lat": 2.298748,
        "lng": 99.915316,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 19:31:09",
        "lat": 2.298706,
        "lng": 99.9128,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 19:31:35",
        "lat": 2.298687,
        "lng": 99.910844,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 19:31:58",
        "lat": 2.298613,
        "lng": 99.909467,
        "speed": 17.0
      },
      {
        "time": "2026-09-04 19:32:08",
        "lat": 2.298823,
        "lng": 99.909324,
        "speed": 4.0
      },
      {
        "time": "2026-09-04 20:01:27",
        "lat": 2.298596,
        "lng": 99.909796,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 20:01:43",
        "lat": 2.298816,
        "lng": 99.909324,
        "speed": 7.0
      },
      {
        "time": "2026-09-04 20:02:26",
        "lat": 2.298751,
        "lng": 99.909378,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 20:03:03",
        "lat": 2.298733,
        "lng": 99.911022,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:03:33",
        "lat": 2.298751,
        "lng": 99.912871,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:03:53",
        "lat": 2.298771,
        "lng": 99.914062,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:04:23",
        "lat": 2.298794,
        "lng": 99.915947,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:05:03",
        "lat": 2.298851,
        "lng": 99.918444,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 20:05:23",
        "lat": 2.298879,
        "lng": 99.919742,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 20:05:53",
        "lat": 2.298921,
        "lng": 99.921733,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 20:06:31",
        "lat": 2.298994,
        "lng": 99.924284,
        "speed": 27.0
      },
      {
        "time": "2026-09-04 20:07:03",
        "lat": 2.299012,
        "lng": 99.926382,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:07:23",
        "lat": 2.299526,
        "lng": 99.926827,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 20:07:53",
        "lat": 2.301287,
        "lng": 99.927049,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:08:23",
        "lat": 2.303162,
        "lng": 99.92728,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 20:08:46",
        "lat": 2.304638,
        "lng": 99.927458,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:09:23",
        "lat": 2.306884,
        "lng": 99.927733,
        "speed": 16.0
      },
      {
        "time": "2026-09-04 20:10:19",
        "lat": 2.307052,
        "lng": 99.927778,
        "speed": 6.0
      },
      {
        "time": "2026-09-04 20:11:23",
        "lat": 2.307052,
        "lng": 99.928204,
        "speed": 8.0
      },
      {
        "time": "2026-09-04 20:11:53",
        "lat": 2.307081,
        "lng": 99.929058,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 20:12:43",
        "lat": 2.307156,
        "lng": 99.930533,
        "speed": 11.0
      },
      {
        "time": "2026-09-04 20:15:10",
        "lat": 2.306983,
        "lng": 99.930667,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 20:15:33",
        "lat": 2.305914,
        "lng": 99.930533,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:16:03",
        "lat": 2.304271,
        "lng": 99.93032,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:16:22",
        "lat": 2.303207,
        "lng": 99.930187,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 20:16:43",
        "lat": 2.301987,
        "lng": 99.930018,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:17:16",
        "lat": 2.30008,
        "lng": 99.929769,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:17:41",
        "lat": 2.298978,
        "lng": 99.929831,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:18:03",
        "lat": 2.298932,
        "lng": 99.9312,
        "speed": 26.0
      },
      {
        "time": "2026-09-04 20:18:33",
        "lat": 2.298421,
        "lng": 99.932373,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 20:18:49",
        "lat": 2.297642,
        "lng": 99.932347,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:19:18",
        "lat": 2.296014,
        "lng": 99.932276,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:19:34",
        "lat": 2.295186,
        "lng": 99.932231,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 20:20:09",
        "lat": 2.293358,
        "lng": 99.932196,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 20:20:33",
        "lat": 2.292004,
        "lng": 99.93216,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 20:20:59",
        "lat": 2.290547,
        "lng": 99.932142,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:26:22",
        "lat": 2.289647,
        "lng": 99.932142,
        "speed": 4.0
      },
      {
        "time": "2026-09-04 20:26:43",
        "lat": 2.290267,
        "lng": 99.932133,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 20:27:27",
        "lat": 2.292248,
        "lng": 99.932196,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 20:28:03",
        "lat": 2.293989,
        "lng": 99.932213,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 20:28:29",
        "lat": 2.295311,
        "lng": 99.932258,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 20:28:52",
        "lat": 2.296564,
        "lng": 99.932329,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 20:29:13",
        "lat": 2.297644,
        "lng": 99.932373,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 20:29:40",
        "lat": 2.298888,
        "lng": 99.932347,
        "speed": 13.0
      },
      {
        "time": "2026-09-04 20:29:53",
        "lat": 2.29889,
        "lng": 99.931671,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:30:21",
        "lat": 2.298958,
        "lng": 99.930044,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 20:30:56",
        "lat": 2.299018,
        "lng": 99.927982,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:31:33",
        "lat": 2.298999,
        "lng": 99.926151,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:32:12",
        "lat": 2.29897,
        "lng": 99.924071,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:32:35",
        "lat": 2.298934,
        "lng": 99.922676,
        "speed": 23.0
      },
      {
        "time": "2026-09-04 20:32:53",
        "lat": 2.298903,
        "lng": 99.9216,
        "speed": 25.0
      },
      {
        "time": "2026-09-04 20:33:33",
        "lat": 2.299518,
        "lng": 99.920196,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 20:57:48",
        "lat": 2.298913,
        "lng": 99.92008,
        "speed": 14.0
      },
      {
        "time": "2026-09-04 20:58:28",
        "lat": 2.298816,
        "lng": 99.917156,
        "speed": 32.0
      },
      {
        "time": "2026-09-04 20:59:18",
        "lat": 2.298736,
        "lng": 99.912969,
        "speed": 33.0
      },
      {
        "time": "2026-09-04 21:00:06",
        "lat": 2.298712,
        "lng": 99.909422,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 21:00:46",
        "lat": 2.298866,
        "lng": 99.909378,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 22:21:03",
        "lat": 2.298862,
        "lng": 99.909396,
        "speed": 2.0
      },
      {
        "time": "2026-09-04 22:21:50",
        "lat": 2.298659,
        "lng": 99.90944,
        "speed": 7.0
      },
      {
        "time": "2026-09-04 22:22:10",
        "lat": 2.298647,
        "lng": 99.910302,
        "speed": 20.0
      },
      {
        "time": "2026-09-04 22:22:32",
        "lat": 2.298749,
        "lng": 99.911556,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 22:23:10",
        "lat": 2.298751,
        "lng": 99.913964,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 22:23:30",
        "lat": 2.298779,
        "lng": 99.91544,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 22:23:52",
        "lat": 2.298828,
        "lng": 99.91704,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 22:24:30",
        "lat": 2.298898,
        "lng": 99.919876,
        "speed": 30.0
      },
      {
        "time": "2026-09-04 22:25:00",
        "lat": 2.298943,
        "lng": 99.922116,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 22:25:20",
        "lat": 2.298986,
        "lng": 99.9236,
        "speed": 31.0
      },
      {
        "time": "2026-09-04 22:25:49",
        "lat": 2.29902,
        "lng": 99.925733,
        "speed": 29.0
      },
      {
        "time": "2026-09-04 22:26:04",
        "lat": 2.299031,
        "lng": 99.926827,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 22:26:20",
        "lat": 2.299056,
        "lng": 99.927982,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 22:26:50",
        "lat": 2.298985,
        "lng": 99.930178,
        "speed": 28.0
      },
      {
        "time": "2026-09-04 22:27:30",
        "lat": 2.29888,
        "lng": 99.932729,
        "speed": 21.0
      },
      {
        "time": "2026-09-04 22:28:16",
        "lat": 2.29899,
        "lng": 99.934453,
        "speed": 12.0
      },
      {
        "time": "2026-09-04 22:33:24",
        "lat": 2.298758,
        "lng": 99.934711,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 22:33:50",
        "lat": 2.298955,
        "lng": 99.934151,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 22:35:49",
        "lat": 2.298894,
        "lng": 99.932978,
        "speed": 18.0
      },
      {
        "time": "2026-09-04 22:36:21",
        "lat": 2.299004,
        "lng": 99.934827,
        "speed": 24.0
      },
      {
        "time": "2026-09-04 22:37:10",
        "lat": 2.299352,
        "lng": 99.936898,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 23:03:08",
        "lat": 2.299374,
        "lng": 99.936782,
        "speed": 0.0
      },
      {
        "time": "2026-09-04 23:03:30",
        "lat": 2.299076,
        "lng": 99.93648,
        "speed": 15.0
      },
      {
        "time": "2026-09-04 23:04:00",
        "lat": 2.299038,
        "lng": 99.934942,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 23:04:40",
        "lat": 2.298937,
        "lng": 99.933724,
        "speed": 19.0
      },
      {
        "time": "2026-09-04 23:05:30",
        "lat": 2.298932,
        "lng": 99.931413,
        "speed": 22.0
      },
      {
        "time": "2026-09-04 23:08:23",
        "lat": 2.299495,
        "lng": 99.929831,
        "speed": 0.0
      }
    ]
  },
  "2026-09-05__V-PHH-01": {
    "date": "2026-09-05",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-05 00:48:16",
        "lat": 2.299462,
        "lng": 99.929716,
        "speed": 8.0
      },
      {
        "time": "2026-09-05 00:48:36",
        "lat": 2.298986,
        "lng": 99.929769,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 00:49:16",
        "lat": 2.298905,
        "lng": 99.93184,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 00:49:56",
        "lat": 2.298938,
        "lng": 99.934,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 00:50:18",
        "lat": 2.298761,
        "lng": 99.934711,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 04:18:16",
        "lat": 2.298969,
        "lng": 99.934498,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 04:18:51",
        "lat": 2.298882,
        "lng": 99.932418,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 04:19:31",
        "lat": 2.299021,
        "lng": 99.928791,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 04:20:11",
        "lat": 2.29898,
        "lng": 99.925076,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 04:20:51",
        "lat": 2.298893,
        "lng": 99.921387,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 04:21:31",
        "lat": 2.298816,
        "lng": 99.917609,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 04:22:01",
        "lat": 2.298387,
        "lng": 99.915511,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 04:22:41",
        "lat": 2.294809,
        "lng": 99.915058,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 04:23:21",
        "lat": 2.291329,
        "lng": 99.914764,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 04:24:10",
        "lat": 2.289529,
        "lng": 99.915813,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 05:20:43",
        "lat": 2.291053,
        "lng": 99.91488,
        "speed": 38.0
      },
      {
        "time": "2026-09-05 05:21:23",
        "lat": 2.294672,
        "lng": 99.912729,
        "speed": 42.0
      },
      {
        "time": "2026-09-05 05:22:03",
        "lat": 2.298408,
        "lng": 99.91048,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 05:22:28",
        "lat": 2.29874,
        "lng": 99.909396,
        "speed": 16.0
      },
      {
        "time": "2026-09-05 06:31:45",
        "lat": 2.298611,
        "lng": 99.909458,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 06:32:25",
        "lat": 2.298724,
        "lng": 99.911618,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 06:33:05",
        "lat": 2.298767,
        "lng": 99.914142,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 06:34:05",
        "lat": 2.298792,
        "lng": 99.916027,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 06:34:45",
        "lat": 2.298846,
        "lng": 99.91856,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 06:35:25",
        "lat": 2.298895,
        "lng": 99.920933,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 06:36:05",
        "lat": 2.298953,
        "lng": 99.923458,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 06:36:45",
        "lat": 2.298993,
        "lng": 99.925911,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 06:37:25",
        "lat": 2.299029,
        "lng": 99.928418,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 06:38:05",
        "lat": 2.298918,
        "lng": 99.930924,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 06:38:45",
        "lat": 2.298846,
        "lng": 99.933138,
        "speed": 16.0
      },
      {
        "time": "2026-09-05 06:40:35",
        "lat": 2.298552,
        "lng": 99.933467,
        "speed": 7.0
      },
      {
        "time": "2026-09-05 06:41:05",
        "lat": 2.298908,
        "lng": 99.934071,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 06:41:45",
        "lat": 2.299044,
        "lng": 99.936507,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 06:42:25",
        "lat": 2.299162,
        "lng": 99.938898,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 06:42:55",
        "lat": 2.300541,
        "lng": 99.938951,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 06:43:35",
        "lat": 2.303123,
        "lng": 99.938862,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 06:44:15",
        "lat": 2.305806,
        "lng": 99.938818,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 07:35:38",
        "lat": 2.306558,
        "lng": 99.938809,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 07:37:37",
        "lat": 2.306782,
        "lng": 99.938933,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 07:38:18",
        "lat": 2.306708,
        "lng": 99.939973,
        "speed": 7.0
      },
      {
        "time": "2026-09-05 07:39:08",
        "lat": 2.306643,
        "lng": 99.941422,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 07:39:28",
        "lat": 2.306543,
        "lng": 99.941911,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 07:40:08",
        "lat": 2.306587,
        "lng": 99.943102,
        "speed": 10.0
      },
      {
        "time": "2026-09-05 07:40:58",
        "lat": 2.306526,
        "lng": 99.944062,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 07:41:38",
        "lat": 2.30658,
        "lng": 99.945458,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 07:42:48",
        "lat": 2.306512,
        "lng": 99.946764,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 07:46:11",
        "lat": 2.306495,
        "lng": 99.947591,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 07:47:02",
        "lat": 2.304002,
        "lng": 99.947742,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 07:47:42",
        "lat": 2.300964,
        "lng": 99.947964,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 07:48:12",
        "lat": 2.299653,
        "lng": 99.948569,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 07:48:52",
        "lat": 2.299756,
        "lng": 99.95176,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 07:49:32",
        "lat": 2.299818,
        "lng": 99.955164,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 07:50:12",
        "lat": 2.299873,
        "lng": 99.958498,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 07:50:52",
        "lat": 2.299928,
        "lng": 99.961982,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 07:51:32",
        "lat": 2.299999,
        "lng": 99.965564,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 07:52:07",
        "lat": 2.299949,
        "lng": 99.968133,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 07:52:32",
        "lat": 2.29959,
        "lng": 99.968702,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 09:18:26",
        "lat": 2.299674,
        "lng": 99.968418,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 09:18:46",
        "lat": 2.30003,
        "lng": 99.967991,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 09:19:26",
        "lat": 2.300011,
        "lng": 99.965591,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 09:20:06",
        "lat": 2.299954,
        "lng": 99.962693,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 09:20:46",
        "lat": 2.299899,
        "lng": 99.959644,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 09:21:26",
        "lat": 2.29984,
        "lng": 99.956658,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 09:22:06",
        "lat": 2.299792,
        "lng": 99.953831,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 09:22:46",
        "lat": 2.299747,
        "lng": 99.951058,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 09:23:26",
        "lat": 2.299628,
        "lng": 99.948418,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 09:24:06",
        "lat": 2.299499,
        "lng": 99.94632,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 09:24:46",
        "lat": 2.299394,
        "lng": 99.944089,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 09:25:26",
        "lat": 2.299293,
        "lng": 99.941778,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 09:26:01",
        "lat": 2.299193,
        "lng": 99.939956,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 09:28:48",
        "lat": 2.299137,
        "lng": 99.938933,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 09:29:28",
        "lat": 2.299026,
        "lng": 99.936276,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 09:30:08",
        "lat": 2.298906,
        "lng": 99.933884,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 09:30:38",
        "lat": 2.298856,
        "lng": 99.933004,
        "speed": 7.0
      },
      {
        "time": "2026-09-05 09:31:54",
        "lat": 2.298865,
        "lng": 99.933093,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 09:33:18",
        "lat": 2.298888,
        "lng": 99.933804,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 09:33:58",
        "lat": 2.299016,
        "lng": 99.93608,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 09:34:38",
        "lat": 2.299137,
        "lng": 99.939049,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 09:35:12",
        "lat": 2.299139,
        "lng": 99.941307,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 09:35:48",
        "lat": 2.296565,
        "lng": 99.941227,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 09:36:28",
        "lat": 2.293264,
        "lng": 99.941227,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 09:37:08",
        "lat": 2.290176,
        "lng": 99.941289,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 09:38:11",
        "lat": 2.289136,
        "lng": 99.941991,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 09:39:08",
        "lat": 2.28967,
        "lng": 99.941582,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 09:39:58",
        "lat": 2.291354,
        "lng": 99.941307,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 09:40:38",
        "lat": 2.295124,
        "lng": 99.941191,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 09:41:18",
        "lat": 2.298811,
        "lng": 99.941307,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 09:41:58",
        "lat": 2.299386,
        "lng": 99.943458,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 09:42:38",
        "lat": 2.299532,
        "lng": 99.946649,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 09:43:25",
        "lat": 2.29964,
        "lng": 99.948044,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 09:46:01",
        "lat": 2.301098,
        "lng": 99.947964,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 09:46:41",
        "lat": 2.304349,
        "lng": 99.947707,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 09:47:29",
        "lat": 2.306451,
        "lng": 99.947556,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 09:50:01",
        "lat": 2.306398,
        "lng": 99.946356,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 09:50:31",
        "lat": 2.306476,
        "lng": 99.945591,
        "speed": 8.0
      },
      {
        "time": "2026-09-05 09:51:01",
        "lat": 2.306607,
        "lng": 99.945804,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 09:51:41",
        "lat": 2.305364,
        "lng": 99.945573,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 09:52:21",
        "lat": 2.303718,
        "lng": 99.945573,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 09:53:01",
        "lat": 2.304772,
        "lng": 99.945556,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 09:53:51",
        "lat": 2.306602,
        "lng": 99.945689,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 09:54:31",
        "lat": 2.306523,
        "lng": 99.946578,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 09:55:11",
        "lat": 2.306557,
        "lng": 99.947467,
        "speed": 5.0
      },
      {
        "time": "2026-09-05 09:56:11",
        "lat": 2.306177,
        "lng": 99.947556,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 09:56:51",
        "lat": 2.303958,
        "lng": 99.947724,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 09:57:31",
        "lat": 2.301022,
        "lng": 99.947956,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 09:58:01",
        "lat": 2.299607,
        "lng": 99.947591,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 09:58:41",
        "lat": 2.299453,
        "lng": 99.944853,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 09:59:21",
        "lat": 2.299313,
        "lng": 99.941867,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 10:00:01",
        "lat": 2.299139,
        "lng": 99.938853,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 10:00:39",
        "lat": 2.29903,
        "lng": 99.938978,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 10:09:12",
        "lat": 2.299082,
        "lng": 99.937369,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 10:09:52",
        "lat": 2.298982,
        "lng": 99.934569,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 10:10:32",
        "lat": 2.298896,
        "lng": 99.932471,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 10:11:12",
        "lat": 2.299006,
        "lng": 99.929618,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 10:11:52",
        "lat": 2.299034,
        "lng": 99.927769,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 10:15:50",
        "lat": 2.298902,
        "lng": 99.926756,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 10:16:32",
        "lat": 2.29898,
        "lng": 99.925493,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 10:17:12",
        "lat": 2.298951,
        "lng": 99.923698,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 10:17:52",
        "lat": 2.298906,
        "lng": 99.921876,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 10:18:37",
        "lat": 2.298866,
        "lng": 99.920178,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 10:19:12",
        "lat": 2.298908,
        "lng": 99.921956,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 10:20:32",
        "lat": 2.298961,
        "lng": 99.923093,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 10:21:12",
        "lat": 2.298994,
        "lng": 99.924951,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 10:21:52",
        "lat": 2.298975,
        "lng": 99.926711,
        "speed": 10.0
      },
      {
        "time": "2026-09-05 10:34:08",
        "lat": 2.29903,
        "lng": 99.92696,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 10:34:46",
        "lat": 2.298872,
        "lng": 99.9296,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 10:35:18",
        "lat": 2.297589,
        "lng": 99.92944,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 10:35:58",
        "lat": 2.294878,
        "lng": 99.929067,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 10:36:38",
        "lat": 2.292377,
        "lng": 99.928738,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 10:37:18",
        "lat": 2.289661,
        "lng": 99.928382,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 10:38:00",
        "lat": 2.289738,
        "lng": 99.927573,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 10:43:28",
        "lat": 2.289744,
        "lng": 99.927067,
        "speed": 8.0
      },
      {
        "time": "2026-09-05 10:44:47",
        "lat": 2.29,
        "lng": 99.925538,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 10:45:28",
        "lat": 2.291573,
        "lng": 99.925778,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 10:46:08",
        "lat": 2.293731,
        "lng": 99.926053,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 10:47:18",
        "lat": 2.295688,
        "lng": 99.926356,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 10:47:58",
        "lat": 2.29793,
        "lng": 99.92664,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 10:55:14",
        "lat": 2.298657,
        "lng": 99.926729,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 10:55:46",
        "lat": 2.296866,
        "lng": 99.926498,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 10:56:26",
        "lat": 2.294431,
        "lng": 99.926107,
        "speed": 10.0
      },
      {
        "time": "2026-09-05 10:57:06",
        "lat": 2.292194,
        "lng": 99.925831,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 10:57:46",
        "lat": 2.29034,
        "lng": 99.92552,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 10:58:36",
        "lat": 2.290743,
        "lng": 99.925618,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 10:59:26",
        "lat": 2.293357,
        "lng": 99.926009,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 11:00:06",
        "lat": 2.295472,
        "lng": 99.926311,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 11:00:46",
        "lat": 2.297957,
        "lng": 99.92664,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 11:01:31",
        "lat": 2.298982,
        "lng": 99.926693,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 11:02:06",
        "lat": 2.298985,
        "lng": 99.925147,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 11:02:46",
        "lat": 2.298926,
        "lng": 99.922924,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 11:03:26",
        "lat": 2.299236,
        "lng": 99.922293,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 12:35:25",
        "lat": 2.299324,
        "lng": 99.922444,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 12:35:51",
        "lat": 2.298951,
        "lng": 99.922293,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 12:36:28",
        "lat": 2.298986,
        "lng": 99.924489,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 12:49:44",
        "lat": 2.299012,
        "lng": 99.925067,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 12:50:20",
        "lat": 2.298878,
        "lng": 99.926729,
        "speed": 3.0
      },
      {
        "time": "2026-09-05 13:05:45",
        "lat": 2.299029,
        "lng": 99.927404,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 13:06:25",
        "lat": 2.298988,
        "lng": 99.929716,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 13:07:05",
        "lat": 2.298907,
        "lng": 99.932373,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 13:07:45",
        "lat": 2.298992,
        "lng": 99.934471,
        "speed": 16.0
      },
      {
        "time": "2026-09-05 13:08:25",
        "lat": 2.299076,
        "lng": 99.937129,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 13:09:05",
        "lat": 2.298942,
        "lng": 99.938951,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 13:10:05",
        "lat": 2.29881,
        "lng": 99.939164,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 14:07:04",
        "lat": 2.299147,
        "lng": 99.938862,
        "speed": 16.0
      },
      {
        "time": "2026-09-05 14:07:44",
        "lat": 2.299042,
        "lng": 99.936364,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 14:08:24",
        "lat": 2.29894,
        "lng": 99.934053,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 14:09:04",
        "lat": 2.298899,
        "lng": 99.932276,
        "speed": 8.0
      },
      {
        "time": "2026-09-05 14:09:44",
        "lat": 2.298943,
        "lng": 99.93032,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 14:10:24",
        "lat": 2.299019,
        "lng": 99.928027,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 14:11:04",
        "lat": 2.299012,
        "lng": 99.925769,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 14:11:44",
        "lat": 2.298957,
        "lng": 99.923422,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 14:12:24",
        "lat": 2.298904,
        "lng": 99.921076,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 14:13:04",
        "lat": 2.298852,
        "lng": 99.918747,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 14:13:44",
        "lat": 2.298792,
        "lng": 99.916373,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 14:14:24",
        "lat": 2.298749,
        "lng": 99.913929,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 14:15:04",
        "lat": 2.298729,
        "lng": 99.911458,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 14:15:41",
        "lat": 2.298699,
        "lng": 99.909396,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 14:17:01",
        "lat": 2.298831,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 14:17:51",
        "lat": 2.298528,
        "lng": 99.910427,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 14:18:24",
        "lat": 2.29597,
        "lng": 99.911964,
        "speed": 40.0
      },
      {
        "time": "2026-09-05 14:19:04",
        "lat": 2.292666,
        "lng": 99.913964,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 14:19:44",
        "lat": 2.289687,
        "lng": 99.915707,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 14:39:26",
        "lat": 2.290036,
        "lng": 99.915511,
        "speed": 27.0
      },
      {
        "time": "2026-09-05 14:39:56",
        "lat": 2.292041,
        "lng": 99.914684,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 14:40:36",
        "lat": 2.295904,
        "lng": 99.915218,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 14:41:11",
        "lat": 2.298793,
        "lng": 99.915742,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 14:41:46",
        "lat": 2.298841,
        "lng": 99.918773,
        "speed": 37.0
      },
      {
        "time": "2026-09-05 14:42:26",
        "lat": 2.298918,
        "lng": 99.922329,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 14:43:06",
        "lat": 2.298999,
        "lng": 99.925911,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 14:43:36",
        "lat": 2.297773,
        "lng": 99.926587,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 14:44:16",
        "lat": 2.293902,
        "lng": 99.926044,
        "speed": 42.0
      },
      {
        "time": "2026-09-05 14:44:56",
        "lat": 2.290047,
        "lng": 99.925493,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 14:46:56",
        "lat": 2.289668,
        "lng": 99.925813,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 14:47:36",
        "lat": 2.289666,
        "lng": 99.926791,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 14:48:36",
        "lat": 2.289607,
        "lng": 99.927849,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 14:49:46",
        "lat": 2.291418,
        "lng": 99.928613,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 14:50:26",
        "lat": 2.294696,
        "lng": 99.929058,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 14:51:06",
        "lat": 2.297998,
        "lng": 99.929493,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 14:51:46",
        "lat": 2.300999,
        "lng": 99.929884,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 14:52:26",
        "lat": 2.304227,
        "lng": 99.93032,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 14:53:06",
        "lat": 2.307066,
        "lng": 99.930667,
        "speed": 7.0
      },
      {
        "time": "2026-09-05 14:54:06",
        "lat": 2.305785,
        "lng": 99.930489,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 14:54:46",
        "lat": 2.302448,
        "lng": 99.93008,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 14:55:26",
        "lat": 2.299101,
        "lng": 99.9296,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 14:55:56",
        "lat": 2.298922,
        "lng": 99.931653,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 14:56:26",
        "lat": 2.297708,
        "lng": 99.932347,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 14:57:06",
        "lat": 2.294289,
        "lng": 99.932196,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 14:57:46",
        "lat": 2.290762,
        "lng": 99.932133,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 14:58:36",
        "lat": 2.290508,
        "lng": 99.932133,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 14:59:16",
        "lat": 2.293949,
        "lng": 99.932213,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 14:59:56",
        "lat": 2.297312,
        "lng": 99.932329,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 15:00:26",
        "lat": 2.298839,
        "lng": 99.932604,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 15:01:06",
        "lat": 2.299002,
        "lng": 99.935093,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 15:01:46",
        "lat": 2.299126,
        "lng": 99.938302,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 15:02:16",
        "lat": 2.298592,
        "lng": 99.938951,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 15:03:06",
        "lat": 2.298924,
        "lng": 99.938969,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 15:03:46",
        "lat": 2.299327,
        "lng": 99.938969,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 15:04:26",
        "lat": 2.302777,
        "lng": 99.938862,
        "speed": 40.0
      },
      {
        "time": "2026-09-05 15:05:06",
        "lat": 2.306549,
        "lng": 99.938791,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 15:05:46",
        "lat": 2.306874,
        "lng": 99.937858,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 15:06:36",
        "lat": 2.305537,
        "lng": 99.936871,
        "speed": 31.0
      },
      {
        "time": "2026-09-05 15:07:16",
        "lat": 2.302179,
        "lng": 99.9368,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 15:07:54",
        "lat": 2.299084,
        "lng": 99.936684,
        "speed": 14.0
      },
      {
        "time": "2026-09-05 15:08:26",
        "lat": 2.298998,
        "lng": 99.934356,
        "speed": 16.0
      },
      {
        "time": "2026-09-05 15:09:06",
        "lat": 2.298902,
        "lng": 99.931804,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 15:09:36",
        "lat": 2.298717,
        "lng": 99.929591,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 15:10:16",
        "lat": 2.295044,
        "lng": 99.929102,
        "speed": 40.0
      },
      {
        "time": "2026-09-05 15:10:56",
        "lat": 2.290909,
        "lng": 99.928551,
        "speed": 42.0
      },
      {
        "time": "2026-09-05 15:11:31",
        "lat": 2.289558,
        "lng": 99.927849,
        "speed": 10.0
      },
      {
        "time": "2026-09-05 15:28:38",
        "lat": 2.289311,
        "lng": 99.927876,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 15:30:38",
        "lat": 2.28957,
        "lng": 99.928009,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 15:31:08",
        "lat": 2.290954,
        "lng": 99.928551,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 15:31:48",
        "lat": 2.295899,
        "lng": 99.929218,
        "speed": 47.0
      },
      {
        "time": "2026-09-05 15:32:23",
        "lat": 2.299012,
        "lng": 99.929493,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 15:32:58",
        "lat": 2.299014,
        "lng": 99.926258,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 15:33:38",
        "lat": 2.298913,
        "lng": 99.921849,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 15:34:18",
        "lat": 2.298885,
        "lng": 99.919707,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 15:34:58",
        "lat": 2.298819,
        "lng": 99.916907,
        "speed": 34.0
      },
      {
        "time": "2026-09-05 15:35:38",
        "lat": 2.298751,
        "lng": 99.913431,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 15:36:08",
        "lat": 2.300448,
        "lng": 99.913556,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 15:36:48",
        "lat": 2.303878,
        "lng": 99.914204,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 15:37:26",
        "lat": 2.307136,
        "lng": 99.914631,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 15:37:57",
        "lat": 2.307141,
        "lng": 99.912569,
        "speed": 8.0
      },
      {
        "time": "2026-09-05 16:16:50",
        "lat": 2.307153,
        "lng": 99.912711,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 16:17:22",
        "lat": 2.307022,
        "lng": 99.914711,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 16:17:55",
        "lat": 2.304353,
        "lng": 99.914276,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 16:18:35",
        "lat": 2.300559,
        "lng": 99.913556,
        "speed": 38.0
      },
      {
        "time": "2026-09-05 16:19:15",
        "lat": 2.297447,
        "lng": 99.913084,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 16:19:55",
        "lat": 2.295028,
        "lng": 99.912711,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 16:20:25",
        "lat": 2.293052,
        "lng": 99.913716,
        "speed": 38.0
      },
      {
        "time": "2026-09-05 16:21:05",
        "lat": 2.289918,
        "lng": 99.915556,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 16:21:41",
        "lat": 2.289544,
        "lng": 99.915804,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 16:54:11",
        "lat": 2.290626,
        "lng": 99.915156,
        "speed": 40.0
      },
      {
        "time": "2026-09-05 16:54:41",
        "lat": 2.293319,
        "lng": 99.91488,
        "speed": 39.0
      },
      {
        "time": "2026-09-05 16:55:21",
        "lat": 2.297146,
        "lng": 99.915369,
        "speed": 38.0
      },
      {
        "time": "2026-09-05 16:55:51",
        "lat": 2.298746,
        "lng": 99.914951,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 16:56:11",
        "lat": 2.298795,
        "lng": 99.913244,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 16:56:41",
        "lat": 2.301098,
        "lng": 99.913689,
        "speed": 38.0
      },
      {
        "time": "2026-09-05 16:57:21",
        "lat": 2.305184,
        "lng": 99.914418,
        "speed": 42.0
      },
      {
        "time": "2026-09-05 16:57:51",
        "lat": 2.307154,
        "lng": 99.913982,
        "speed": 35.0
      },
      {
        "time": "2026-09-05 16:58:47",
        "lat": 2.307152,
        "lng": 99.912551,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 17:44:38",
        "lat": 2.307143,
        "lng": 99.910969,
        "speed": 22.0
      },
      {
        "time": "2026-09-05 17:51:53",
        "lat": 2.307114,
        "lng": 99.909867,
        "speed": 11.0
      },
      {
        "time": "2026-09-05 17:52:41",
        "lat": 2.307135,
        "lng": 99.912516,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 19:43:50",
        "lat": 2.306499,
        "lng": 99.914622,
        "speed": 47.0
      },
      {
        "time": "2026-09-05 19:44:30",
        "lat": 2.301695,
        "lng": 99.913787,
        "speed": 47.0
      },
      {
        "time": "2026-09-05 19:45:04",
        "lat": 2.29874,
        "lng": 99.913378,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 19:45:40",
        "lat": 2.298824,
        "lng": 99.917938,
        "speed": 59.0
      },
      {
        "time": "2026-09-05 19:46:24",
        "lat": 2.298889,
        "lng": 99.921778,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 19:47:00",
        "lat": 2.298855,
        "lng": 99.919689,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 19:47:40",
        "lat": 2.298775,
        "lng": 99.916507,
        "speed": 49.0
      },
      {
        "time": "2026-09-05 19:48:14",
        "lat": 2.298854,
        "lng": 99.913262,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 19:48:50",
        "lat": 2.302632,
        "lng": 99.913991,
        "speed": 48.0
      },
      {
        "time": "2026-09-05 19:49:30",
        "lat": 2.307125,
        "lng": 99.914596,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 19:50:18",
        "lat": 2.307129,
        "lng": 99.912533,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 21:18:51",
        "lat": 2.30714,
        "lng": 99.912533,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 21:19:29",
        "lat": 2.30714,
        "lng": 99.910373,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 21:20:09",
        "lat": 2.304378,
        "lng": 99.909458,
        "speed": 41.0
      },
      {
        "time": "2026-09-05 21:20:48",
        "lat": 2.30049,
        "lng": 99.909182,
        "speed": 36.0
      },
      {
        "time": "2026-09-05 21:21:10",
        "lat": 2.299155,
        "lng": 99.909467,
        "speed": 7.0
      },
      {
        "time": "2026-09-05 21:29:27",
        "lat": 2.300057,
        "lng": 99.909458,
        "speed": 25.0
      },
      {
        "time": "2026-09-05 21:30:02",
        "lat": 2.302462,
        "lng": 99.909227,
        "speed": 29.0
      },
      {
        "time": "2026-09-05 21:30:42",
        "lat": 2.305527,
        "lng": 99.909618,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 21:31:22",
        "lat": 2.307092,
        "lng": 99.909813,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 21:37:35",
        "lat": 2.307126,
        "lng": 99.911778,
        "speed": 26.0
      },
      {
        "time": "2026-09-05 21:56:11",
        "lat": 2.307117,
        "lng": 99.91248,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 21:57:02",
        "lat": 2.307137,
        "lng": 99.912338,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 21:57:38",
        "lat": 2.307152,
        "lng": 99.910124,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 21:58:08",
        "lat": 2.305479,
        "lng": 99.9096,
        "speed": 32.0
      },
      {
        "time": "2026-09-05 21:58:48",
        "lat": 2.302342,
        "lng": 99.909191,
        "speed": 33.0
      },
      {
        "time": "2026-09-05 21:59:23",
        "lat": 2.299797,
        "lng": 99.909467,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 22:00:30",
        "lat": 2.2988,
        "lng": 99.909324,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 22:05:04",
        "lat": 2.299278,
        "lng": 99.90944,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 22:05:33",
        "lat": 2.301035,
        "lng": 99.909022,
        "speed": 28.0
      },
      {
        "time": "2026-09-05 22:06:04",
        "lat": 2.303298,
        "lng": 99.909307,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 22:06:44",
        "lat": 2.306301,
        "lng": 99.909716,
        "speed": 30.0
      },
      {
        "time": "2026-09-05 22:09:09",
        "lat": 2.307137,
        "lng": 99.909796,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 22:49:24",
        "lat": 2.307151,
        "lng": 99.910169,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 22:50:04",
        "lat": 2.307136,
        "lng": 99.9124,
        "speed": 15.0
      },
      {
        "time": "2026-09-05 22:50:44",
        "lat": 2.307157,
        "lng": 99.914533,
        "speed": 20.0
      },
      {
        "time": "2026-09-05 22:51:14",
        "lat": 2.30591,
        "lng": 99.914524,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 22:51:54",
        "lat": 2.304101,
        "lng": 99.914204,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 22:52:34",
        "lat": 2.302287,
        "lng": 99.91392,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 22:53:14",
        "lat": 2.300454,
        "lng": 99.913547,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 22:53:54",
        "lat": 2.298828,
        "lng": 99.913262,
        "speed": 9.0
      },
      {
        "time": "2026-09-05 22:54:24",
        "lat": 2.298764,
        "lng": 99.914356,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 22:55:04",
        "lat": 2.298784,
        "lng": 99.916302,
        "speed": 21.0
      },
      {
        "time": "2026-09-05 22:55:44",
        "lat": 2.298832,
        "lng": 99.918329,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 22:56:24",
        "lat": 2.298874,
        "lng": 99.920151,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 22:57:04",
        "lat": 2.298905,
        "lng": 99.921876,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 22:57:44",
        "lat": 2.298949,
        "lng": 99.923698,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 22:58:24",
        "lat": 2.298978,
        "lng": 99.925502,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 22:59:04",
        "lat": 2.299014,
        "lng": 99.927342,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 22:59:44",
        "lat": 2.299022,
        "lng": 99.929111,
        "speed": 13.0
      },
      {
        "time": "2026-09-05 23:46:55",
        "lat": 2.299468,
        "lng": 99.929733,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 23:47:25",
        "lat": 2.299472,
        "lng": 99.929733,
        "speed": 0.0
      },
      {
        "time": "2026-09-05 23:47:50",
        "lat": 2.298982,
        "lng": 99.929769,
        "speed": 18.0
      },
      {
        "time": "2026-09-05 23:48:30",
        "lat": 2.2989,
        "lng": 99.932133,
        "speed": 19.0
      },
      {
        "time": "2026-09-05 23:49:00",
        "lat": 2.298687,
        "lng": 99.933218,
        "speed": 12.0
      },
      {
        "time": "2026-09-05 23:49:54",
        "lat": 2.298889,
        "lng": 99.933369,
        "speed": 17.0
      },
      {
        "time": "2026-09-05 23:50:30",
        "lat": 2.299006,
        "lng": 99.935271,
        "speed": 23.0
      },
      {
        "time": "2026-09-05 23:51:10",
        "lat": 2.299107,
        "lng": 99.937662,
        "speed": 24.0
      },
      {
        "time": "2026-09-05 23:51:55",
        "lat": 2.29905,
        "lng": 99.938978,
        "speed": 0.0
      }
    ]
  },
  "2026-09-06__V-PHH-01": {
    "date": "2026-09-06",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-06 04:33:02",
        "lat": 2.299139,
        "lng": 99.939164,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 04:33:22",
        "lat": 2.299085,
        "lng": 99.937902,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 04:33:52",
        "lat": 2.298968,
        "lng": 99.935689,
        "speed": 31.0
      },
      {
        "time": "2026-09-06 04:34:22",
        "lat": 2.298893,
        "lng": 99.933689,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 04:35:06",
        "lat": 2.298808,
        "lng": 99.932862,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 04:43:04",
        "lat": 2.298875,
        "lng": 99.932018,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 04:43:34",
        "lat": 2.29895,
        "lng": 99.930027,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 04:44:04",
        "lat": 2.299012,
        "lng": 99.927876,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 04:44:34",
        "lat": 2.298988,
        "lng": 99.925813,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 04:45:04",
        "lat": 2.298955,
        "lng": 99.923831,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 04:45:34",
        "lat": 2.298894,
        "lng": 99.921733,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 04:46:04",
        "lat": 2.298859,
        "lng": 99.919582,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 04:46:34",
        "lat": 2.298802,
        "lng": 99.917307,
        "speed": 31.0
      },
      {
        "time": "2026-09-06 04:47:04",
        "lat": 2.298748,
        "lng": 99.914969,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 04:47:31",
        "lat": 2.298849,
        "lng": 99.913244,
        "speed": 18.0
      },
      {
        "time": "2026-09-06 04:47:54",
        "lat": 2.300546,
        "lng": 99.913556,
        "speed": 36.0
      },
      {
        "time": "2026-09-06 04:48:24",
        "lat": 2.303248,
        "lng": 99.914089,
        "speed": 38.0
      },
      {
        "time": "2026-09-06 04:48:54",
        "lat": 2.305624,
        "lng": 99.914507,
        "speed": 35.0
      },
      {
        "time": "2026-09-06 04:49:24",
        "lat": 2.307139,
        "lng": 99.913804,
        "speed": 35.0
      },
      {
        "time": "2026-09-06 04:49:54",
        "lat": 2.307143,
        "lng": 99.9112,
        "speed": 33.0
      },
      {
        "time": "2026-09-06 04:50:33",
        "lat": 2.307114,
        "lng": 99.909813,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 05:44:26",
        "lat": 2.306231,
        "lng": 99.909716,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 05:44:56",
        "lat": 2.304559,
        "lng": 99.909467,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 05:45:26",
        "lat": 2.302881,
        "lng": 99.909262,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 05:45:56",
        "lat": 2.301083,
        "lng": 99.909022,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 05:46:26",
        "lat": 2.299403,
        "lng": 99.909467,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 05:47:04",
        "lat": 2.29881,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 12:47:48",
        "lat": 2.29881,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 14:07:04",
        "lat": 2.298948,
        "lng": 99.90944,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 14:07:34",
        "lat": 2.300053,
        "lng": 99.909618,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 14:07:54",
        "lat": 2.300553,
        "lng": 99.910356,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 14:21:00",
        "lat": 2.300696,
        "lng": 99.910329,
        "speed": 10.0
      },
      {
        "time": "2026-09-06 14:21:30",
        "lat": 2.300039,
        "lng": 99.909556,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 14:22:06",
        "lat": 2.298754,
        "lng": 99.909396,
        "speed": 5.0
      },
      {
        "time": "2026-09-06 15:07:12",
        "lat": 2.298626,
        "lng": 99.909582,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 15:07:42",
        "lat": 2.298729,
        "lng": 99.911867,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 15:08:12",
        "lat": 2.298777,
        "lng": 99.91424,
        "speed": 38.0
      },
      {
        "time": "2026-09-06 15:08:42",
        "lat": 2.298837,
        "lng": 99.917307,
        "speed": 38.0
      },
      {
        "time": "2026-09-06 15:09:12",
        "lat": 2.298867,
        "lng": 99.920382,
        "speed": 43.0
      },
      {
        "time": "2026-09-06 15:09:42",
        "lat": 2.298961,
        "lng": 99.923858,
        "speed": 44.0
      },
      {
        "time": "2026-09-06 15:10:12",
        "lat": 2.299024,
        "lng": 99.92728,
        "speed": 46.0
      },
      {
        "time": "2026-09-06 15:10:42",
        "lat": 2.298953,
        "lng": 99.930693,
        "speed": 45.0
      },
      {
        "time": "2026-09-06 15:11:12",
        "lat": 2.298861,
        "lng": 99.933004,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 15:38:52",
        "lat": 2.298761,
        "lng": 99.93304,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 16:20:50",
        "lat": 2.298823,
        "lng": 99.932569,
        "speed": 18.0
      },
      {
        "time": "2026-09-06 16:21:20",
        "lat": 2.298896,
        "lng": 99.930676,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 16:21:50",
        "lat": 2.299007,
        "lng": 99.928178,
        "speed": 35.0
      },
      {
        "time": "2026-09-06 16:22:20",
        "lat": 2.298963,
        "lng": 99.925564,
        "speed": 33.0
      },
      {
        "time": "2026-09-06 16:22:50",
        "lat": 2.298914,
        "lng": 99.923129,
        "speed": 33.0
      },
      {
        "time": "2026-09-06 16:23:20",
        "lat": 2.298854,
        "lng": 99.920444,
        "speed": 36.0
      },
      {
        "time": "2026-09-06 16:23:50",
        "lat": 2.298808,
        "lng": 99.917804,
        "speed": 34.0
      },
      {
        "time": "2026-09-06 16:24:20",
        "lat": 2.29874,
        "lng": 99.915067,
        "speed": 37.0
      },
      {
        "time": "2026-09-06 16:24:50",
        "lat": 2.298699,
        "lng": 99.912356,
        "speed": 34.0
      },
      {
        "time": "2026-09-06 16:25:42",
        "lat": 2.298736,
        "lng": 99.911067,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 16:26:00",
        "lat": 2.298701,
        "lng": 99.910916,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 16:26:16",
        "lat": 2.298587,
        "lng": 99.909733,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 16:26:30",
        "lat": 2.298834,
        "lng": 99.909324,
        "speed": 7.0
      },
      {
        "time": "2026-09-06 19:47:59",
        "lat": 2.298747,
        "lng": 99.909378,
        "speed": 7.0
      },
      {
        "time": "2026-09-06 19:48:19",
        "lat": 2.298619,
        "lng": 99.909929,
        "speed": 17.0
      },
      {
        "time": "2026-09-06 19:48:49",
        "lat": 2.298732,
        "lng": 99.911591,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 19:49:19",
        "lat": 2.298748,
        "lng": 99.913316,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 19:49:49",
        "lat": 2.298775,
        "lng": 99.915067,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 19:50:19",
        "lat": 2.298812,
        "lng": 99.916889,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:50:49",
        "lat": 2.298858,
        "lng": 99.9188,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:51:19",
        "lat": 2.298893,
        "lng": 99.920658,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 19:51:49",
        "lat": 2.298941,
        "lng": 99.922436,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 19:52:19",
        "lat": 2.298998,
        "lng": 99.924267,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 19:52:49",
        "lat": 2.299019,
        "lng": 99.926187,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:53:19",
        "lat": 2.299053,
        "lng": 99.928027,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 19:53:49",
        "lat": 2.299001,
        "lng": 99.929769,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 19:54:19",
        "lat": 2.298917,
        "lng": 99.931538,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:54:49",
        "lat": 2.298881,
        "lng": 99.933058,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 19:55:19",
        "lat": 2.298978,
        "lng": 99.934489,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 19:55:49",
        "lat": 2.299049,
        "lng": 99.936178,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 19:56:19",
        "lat": 2.299138,
        "lng": 99.938116,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:56:49",
        "lat": 2.299226,
        "lng": 99.940071,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 19:57:19",
        "lat": 2.299327,
        "lng": 99.941964,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 19:57:49",
        "lat": 2.299389,
        "lng": 99.943893,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 19:58:19",
        "lat": 2.299493,
        "lng": 99.945849,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 19:58:49",
        "lat": 2.299584,
        "lng": 99.947689,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 19:59:19",
        "lat": 2.299704,
        "lng": 99.949573,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 19:59:46",
        "lat": 2.299962,
        "lng": 99.950827,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 20:00:09",
        "lat": 2.301277,
        "lng": 99.950916,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:00:39",
        "lat": 2.303239,
        "lng": 99.951156,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:01:09",
        "lat": 2.305211,
        "lng": 99.951289,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:01:39",
        "lat": 2.306372,
        "lng": 99.952036,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:02:09",
        "lat": 2.306295,
        "lng": 99.954036,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:02:29",
        "lat": 2.306397,
        "lng": 99.955076,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 20:02:59",
        "lat": 2.308269,
        "lng": 99.955013,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:03:19",
        "lat": 2.308899,
        "lng": 99.955538,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:03:49",
        "lat": 2.309531,
        "lng": 99.956364,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 20:04:19",
        "lat": 2.311525,
        "lng": 99.956347,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:04:49",
        "lat": 2.313751,
        "lng": 99.956311,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 20:05:19",
        "lat": 2.315963,
        "lng": 99.956284,
        "speed": 29.0
      },
      {
        "time": "2026-09-06 20:05:49",
        "lat": 2.318218,
        "lng": 99.956249,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 20:06:19",
        "lat": 2.320329,
        "lng": 99.956231,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:06:49",
        "lat": 2.322403,
        "lng": 99.956196,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 20:07:19",
        "lat": 2.324409,
        "lng": 99.956169,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:07:48",
        "lat": 2.326066,
        "lng": 99.956098,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 20:08:09",
        "lat": 2.326118,
        "lng": 99.955369,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 20:08:57",
        "lat": 2.326066,
        "lng": 99.954418,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 20:09:19",
        "lat": 2.326117,
        "lng": 99.955209,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 20:09:44",
        "lat": 2.326059,
        "lng": 99.956098,
        "speed": 7.0
      },
      {
        "time": "2026-09-06 20:32:34",
        "lat": 2.325917,
        "lng": 99.956151,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 20:33:00",
        "lat": 2.324597,
        "lng": 99.956151,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:33:30",
        "lat": 2.322702,
        "lng": 99.956187,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:34:00",
        "lat": 2.32071,
        "lng": 99.956213,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:34:30",
        "lat": 2.319012,
        "lng": 99.956284,
        "speed": 10.0
      },
      {
        "time": "2026-09-06 20:34:50",
        "lat": 2.319024,
        "lng": 99.957209,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:35:20",
        "lat": 2.319056,
        "lng": 99.959013,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:35:50",
        "lat": 2.319081,
        "lng": 99.961022,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:36:20",
        "lat": 2.319124,
        "lng": 99.963067,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:36:50",
        "lat": 2.319156,
        "lng": 99.965156,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:37:20",
        "lat": 2.319189,
        "lng": 99.967271,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 20:37:50",
        "lat": 2.319225,
        "lng": 99.969271,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:38:20",
        "lat": 2.319262,
        "lng": 99.971093,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:38:50",
        "lat": 2.319296,
        "lng": 99.973076,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:39:20",
        "lat": 2.319318,
        "lng": 99.974924,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:39:50",
        "lat": 2.319363,
        "lng": 99.976773,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:40:20",
        "lat": 2.319384,
        "lng": 99.978676,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:40:50",
        "lat": 2.319418,
        "lng": 99.980587,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:41:20",
        "lat": 2.319454,
        "lng": 99.982551,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:41:50",
        "lat": 2.319446,
        "lng": 99.984302,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 20:42:10",
        "lat": 2.318423,
        "lng": 99.984302,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:42:40",
        "lat": 2.316721,
        "lng": 99.984302,
        "speed": 11.0
      },
      {
        "time": "2026-09-06 20:43:10",
        "lat": 2.315372,
        "lng": 99.984302,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:43:40",
        "lat": 2.313491,
        "lng": 99.984293,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:44:10",
        "lat": 2.311627,
        "lng": 99.984276,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:44:40",
        "lat": 2.309833,
        "lng": 99.984293,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:45:00",
        "lat": 2.309113,
        "lng": 99.983982,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 20:45:30",
        "lat": 2.309069,
        "lng": 99.982098,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:46:00",
        "lat": 2.309045,
        "lng": 99.98016,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 20:46:30",
        "lat": 2.309029,
        "lng": 99.978471,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:47:00",
        "lat": 2.308994,
        "lng": 99.976596,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 20:47:30",
        "lat": 2.308988,
        "lng": 99.97472,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:48:00",
        "lat": 2.30897,
        "lng": 99.972738,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:48:30",
        "lat": 2.308956,
        "lng": 99.970996,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 20:49:00",
        "lat": 2.308944,
        "lng": 99.969067,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:49:30",
        "lat": 2.308929,
        "lng": 99.967156,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:50:00",
        "lat": 2.308903,
        "lng": 99.965102,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:50:30",
        "lat": 2.308903,
        "lng": 99.96304,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:51:00",
        "lat": 2.308888,
        "lng": 99.96104,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:51:30",
        "lat": 2.308889,
        "lng": 99.958987,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:52:00",
        "lat": 2.308899,
        "lng": 99.957111,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:52:20",
        "lat": 2.308458,
        "lng": 99.9564,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:52:50",
        "lat": 2.3064,
        "lng": 99.956409,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 20:53:20",
        "lat": 2.304266,
        "lng": 99.956427,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 20:53:50",
        "lat": 2.302108,
        "lng": 99.956462,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 20:54:20",
        "lat": 2.300038,
        "lng": 99.956471,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 20:54:40",
        "lat": 2.29983,
        "lng": 99.955653,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:55:10",
        "lat": 2.299787,
        "lng": 99.953884,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:55:40",
        "lat": 2.299756,
        "lng": 99.952,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 20:56:10",
        "lat": 2.299754,
        "lng": 99.950169,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 20:56:40",
        "lat": 2.299627,
        "lng": 99.948391,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 20:57:00",
        "lat": 2.300177,
        "lng": 99.948027,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 20:57:30",
        "lat": 2.302098,
        "lng": 99.947902,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 20:58:00",
        "lat": 2.304123,
        "lng": 99.947751,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 20:58:30",
        "lat": 2.305995,
        "lng": 99.947609,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 20:59:10",
        "lat": 2.305526,
        "lng": 99.947627,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 20:59:40",
        "lat": 2.303803,
        "lng": 99.947751,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 21:00:10",
        "lat": 2.301927,
        "lng": 99.947884,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:00:40",
        "lat": 2.299969,
        "lng": 99.948044,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 21:01:00",
        "lat": 2.299582,
        "lng": 99.947511,
        "speed": 18.0
      },
      {
        "time": "2026-09-06 21:01:30",
        "lat": 2.299508,
        "lng": 99.945902,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:02:00",
        "lat": 2.299419,
        "lng": 99.944133,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 21:02:30",
        "lat": 2.299347,
        "lng": 99.942311,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:03:00",
        "lat": 2.299242,
        "lng": 99.940462,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 21:03:30",
        "lat": 2.299134,
        "lng": 99.938578,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 21:04:00",
        "lat": 2.299051,
        "lng": 99.936738,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 21:04:30",
        "lat": 2.298978,
        "lng": 99.934844,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:05:00",
        "lat": 2.298887,
        "lng": 99.933378,
        "speed": 13.0
      },
      {
        "time": "2026-09-06 21:05:30",
        "lat": 2.298876,
        "lng": 99.931911,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 21:06:00",
        "lat": 2.29896,
        "lng": 99.930018,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 21:06:30",
        "lat": 2.299016,
        "lng": 99.928178,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 21:07:00",
        "lat": 2.298982,
        "lng": 99.926427,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:07:30",
        "lat": 2.298969,
        "lng": 99.924658,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 21:08:00",
        "lat": 2.298938,
        "lng": 99.922898,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:08:30",
        "lat": 2.298886,
        "lng": 99.920987,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 21:09:00",
        "lat": 2.298837,
        "lng": 99.919147,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 21:09:30",
        "lat": 2.298798,
        "lng": 99.917218,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 21:10:00",
        "lat": 2.298758,
        "lng": 99.915316,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 21:10:30",
        "lat": 2.298733,
        "lng": 99.913413,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 21:11:00",
        "lat": 2.298716,
        "lng": 99.91152,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 21:11:30",
        "lat": 2.298604,
        "lng": 99.909618,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 21:12:38",
        "lat": 2.298831,
        "lng": 99.909378,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 22:13:43",
        "lat": 2.298571,
        "lng": 99.908853,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 22:14:03",
        "lat": 2.297694,
        "lng": 99.908596,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 22:14:33",
        "lat": 2.295967,
        "lng": 99.908364,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:15:03",
        "lat": 2.29423,
        "lng": 99.90816,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 22:16:03",
        "lat": 2.292356,
        "lng": 99.907911,
        "speed": 13.0
      },
      {
        "time": "2026-09-06 22:16:23",
        "lat": 2.292146,
        "lng": 99.907858,
        "speed": 18.0
      },
      {
        "time": "2026-09-06 22:16:53",
        "lat": 2.293897,
        "lng": 99.908133,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:17:23",
        "lat": 2.296061,
        "lng": 99.908382,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 22:17:53",
        "lat": 2.298188,
        "lng": 99.908676,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:18:13",
        "lat": 2.298569,
        "lng": 99.909458,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:18:43",
        "lat": 2.298694,
        "lng": 99.911404,
        "speed": 29.0
      },
      {
        "time": "2026-09-06 22:19:13",
        "lat": 2.298717,
        "lng": 99.913733,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 22:19:43",
        "lat": 2.298769,
        "lng": 99.916018,
        "speed": 31.0
      },
      {
        "time": "2026-09-06 22:20:13",
        "lat": 2.298817,
        "lng": 99.918311,
        "speed": 31.0
      },
      {
        "time": "2026-09-06 22:20:43",
        "lat": 2.298868,
        "lng": 99.920604,
        "speed": 31.0
      },
      {
        "time": "2026-09-06 22:21:13",
        "lat": 2.298929,
        "lng": 99.922924,
        "speed": 32.0
      },
      {
        "time": "2026-09-06 22:21:43",
        "lat": 2.298973,
        "lng": 99.92528,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 22:22:13",
        "lat": 2.298987,
        "lng": 99.927573,
        "speed": 30.0
      },
      {
        "time": "2026-09-06 22:22:43",
        "lat": 2.298938,
        "lng": 99.92976,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 22:23:13",
        "lat": 2.298864,
        "lng": 99.932,
        "speed": 34.0
      },
      {
        "time": "2026-09-06 22:23:37",
        "lat": 2.298684,
        "lng": 99.933218,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 22:23:49",
        "lat": 2.298492,
        "lng": 99.933396,
        "speed": 3.0
      },
      {
        "time": "2026-09-06 22:24:53",
        "lat": 2.298622,
        "lng": 99.933431,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 22:25:23",
        "lat": 2.298916,
        "lng": 99.934391,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 22:25:53",
        "lat": 2.299008,
        "lng": 99.936053,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:26:23",
        "lat": 2.299083,
        "lng": 99.938,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 22:26:43",
        "lat": 2.299325,
        "lng": 99.938933,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 22:27:13",
        "lat": 2.300834,
        "lng": 99.938898,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 22:27:43",
        "lat": 2.302873,
        "lng": 99.938862,
        "speed": 29.0
      },
      {
        "time": "2026-09-06 22:28:13",
        "lat": 2.304979,
        "lng": 99.938809,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 22:28:43",
        "lat": 2.306787,
        "lng": 99.938764,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 22:31:29",
        "lat": 2.306722,
        "lng": 99.938791,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 22:31:53",
        "lat": 2.305619,
        "lng": 99.938809,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 22:32:13",
        "lat": 2.304486,
        "lng": 99.938836,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 22:32:43",
        "lat": 2.30245,
        "lng": 99.93888,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:32:58",
        "lat": 2.301443,
        "lng": 99.938916,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 22:33:23",
        "lat": 2.299701,
        "lng": 99.938951,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 22:33:43",
        "lat": 2.299199,
        "lng": 99.939467,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 22:34:13",
        "lat": 2.299256,
        "lng": 99.941324,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:34:43",
        "lat": 2.299366,
        "lng": 99.943378,
        "speed": 29.0
      },
      {
        "time": "2026-09-06 22:35:13",
        "lat": 2.299461,
        "lng": 99.945476,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 22:35:25",
        "lat": 2.299895,
        "lng": 99.945591,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 22:35:53",
        "lat": 2.301653,
        "lng": 99.945573,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:36:23",
        "lat": 2.303241,
        "lng": 99.945556,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 22:36:53",
        "lat": 2.305441,
        "lng": 99.945538,
        "speed": 29.0
      },
      {
        "time": "2026-09-06 22:37:19",
        "lat": 2.306571,
        "lng": 99.945769,
        "speed": 14.0
      },
      {
        "time": "2026-09-06 22:37:30",
        "lat": 2.306536,
        "lng": 99.945911,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 22:38:03",
        "lat": 2.306516,
        "lng": 99.946676,
        "speed": 11.0
      },
      {
        "time": "2026-09-06 22:38:23",
        "lat": 2.306517,
        "lng": 99.947351,
        "speed": 9.0
      },
      {
        "time": "2026-09-06 22:38:43",
        "lat": 2.30639,
        "lng": 99.947467,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 22:39:13",
        "lat": 2.304861,
        "lng": 99.947653,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 22:39:43",
        "lat": 2.302948,
        "lng": 99.947796,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 22:40:13",
        "lat": 2.300981,
        "lng": 99.947956,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 22:40:39",
        "lat": 2.299619,
        "lng": 99.947929,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 22:41:03",
        "lat": 2.299537,
        "lng": 99.946809,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 22:41:33",
        "lat": 2.299463,
        "lng": 99.945102,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:42:03",
        "lat": 2.299382,
        "lng": 99.943378,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:42:33",
        "lat": 2.299292,
        "lng": 99.941609,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:42:41",
        "lat": 2.299155,
        "lng": 99.941324,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 22:43:03",
        "lat": 2.298041,
        "lng": 99.94128,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:43:33",
        "lat": 2.296373,
        "lng": 99.941227,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:44:03",
        "lat": 2.294578,
        "lng": 99.941209,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:44:33",
        "lat": 2.292778,
        "lng": 99.941244,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:45:03",
        "lat": 2.290952,
        "lng": 99.941289,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 22:45:16",
        "lat": 2.29017,
        "lng": 99.941307,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 22:46:03",
        "lat": 2.289982,
        "lng": 99.941093,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 22:46:33",
        "lat": 2.289912,
        "lng": 99.940347,
        "speed": 11.0
      },
      {
        "time": "2026-09-06 22:47:13",
        "lat": 2.289852,
        "lng": 99.939324,
        "speed": 10.0
      },
      {
        "time": "2026-09-06 22:48:03",
        "lat": 2.290816,
        "lng": 99.939182,
        "speed": 18.0
      },
      {
        "time": "2026-09-06 22:48:33",
        "lat": 2.292337,
        "lng": 99.939129,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:49:03",
        "lat": 2.293919,
        "lng": 99.939093,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 22:49:33",
        "lat": 2.295497,
        "lng": 99.939049,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 22:50:03",
        "lat": 2.297039,
        "lng": 99.939013,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 22:50:33",
        "lat": 2.298625,
        "lng": 99.938978,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 22:51:03",
        "lat": 2.300113,
        "lng": 99.938933,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 22:51:33",
        "lat": 2.301849,
        "lng": 99.938898,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:52:03",
        "lat": 2.303668,
        "lng": 99.938853,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 22:52:33",
        "lat": 2.30554,
        "lng": 99.938809,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:53:23",
        "lat": 2.306869,
        "lng": 99.938693,
        "speed": 9.0
      },
      {
        "time": "2026-09-06 22:53:53",
        "lat": 2.306875,
        "lng": 99.937742,
        "speed": 13.0
      },
      {
        "time": "2026-09-06 22:54:20",
        "lat": 2.306736,
        "lng": 99.936898,
        "speed": 13.0
      },
      {
        "time": "2026-09-06 22:54:43",
        "lat": 2.305627,
        "lng": 99.936836,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:55:13",
        "lat": 2.304002,
        "lng": 99.9368,
        "speed": 21.0
      },
      {
        "time": "2026-09-06 22:55:43",
        "lat": 2.302354,
        "lng": 99.936782,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 22:56:13",
        "lat": 2.300613,
        "lng": 99.936782,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 22:56:42",
        "lat": 2.299062,
        "lng": 99.936667,
        "speed": 15.0
      },
      {
        "time": "2026-09-06 22:57:03",
        "lat": 2.298999,
        "lng": 99.935476,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 22:57:23",
        "lat": 2.298974,
        "lng": 99.934409,
        "speed": 12.0
      },
      {
        "time": "2026-09-06 22:57:57",
        "lat": 2.298864,
        "lng": 99.934098,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 22:58:48",
        "lat": 2.298864,
        "lng": 99.93408,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 22:59:23",
        "lat": 2.298872,
        "lng": 99.933236,
        "speed": 16.0
      },
      {
        "time": "2026-09-06 22:59:53",
        "lat": 2.298883,
        "lng": 99.931707,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 23:00:23",
        "lat": 2.298959,
        "lng": 99.92992,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 23:00:43",
        "lat": 2.298231,
        "lng": 99.929556,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 23:01:13",
        "lat": 2.296354,
        "lng": 99.92928,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 23:01:43",
        "lat": 2.294468,
        "lng": 99.929022,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 23:02:13",
        "lat": 2.292578,
        "lng": 99.928756,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 23:02:43",
        "lat": 2.290577,
        "lng": 99.92848,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 23:03:09",
        "lat": 2.289689,
        "lng": 99.928382,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 23:03:39",
        "lat": 2.289677,
        "lng": 99.928364,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 23:04:03",
        "lat": 2.290098,
        "lng": 99.928418,
        "speed": 20.0
      },
      {
        "time": "2026-09-06 23:04:33",
        "lat": 2.291838,
        "lng": 99.928667,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 23:05:03",
        "lat": 2.293745,
        "lng": 99.928907,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 23:05:33",
        "lat": 2.295692,
        "lng": 99.929164,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 23:06:03",
        "lat": 2.297679,
        "lng": 99.92944,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 23:06:27",
        "lat": 2.298975,
        "lng": 99.929431,
        "speed": 19.0
      },
      {
        "time": "2026-09-06 23:06:53",
        "lat": 2.298999,
        "lng": 99.927964,
        "speed": 22.0
      },
      {
        "time": "2026-09-06 23:07:23",
        "lat": 2.298982,
        "lng": 99.926124,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 23:07:53",
        "lat": 2.298972,
        "lng": 99.924364,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 23:08:22",
        "lat": 2.298922,
        "lng": 99.92248,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 23:08:43",
        "lat": 2.298888,
        "lng": 99.921111,
        "speed": 26.0
      },
      {
        "time": "2026-09-06 23:09:13",
        "lat": 2.298846,
        "lng": 99.919173,
        "speed": 25.0
      },
      {
        "time": "2026-09-06 23:09:43",
        "lat": 2.298793,
        "lng": 99.917076,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 23:10:13",
        "lat": 2.298745,
        "lng": 99.914924,
        "speed": 28.0
      },
      {
        "time": "2026-09-06 23:10:43",
        "lat": 2.298728,
        "lng": 99.912747,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 23:11:13",
        "lat": 2.298676,
        "lng": 99.910542,
        "speed": 27.0
      },
      {
        "time": "2026-09-06 23:11:43",
        "lat": 2.298579,
        "lng": 99.909067,
        "speed": 13.0
      },
      {
        "time": "2026-09-06 23:11:53",
        "lat": 2.298454,
        "lng": 99.90872,
        "speed": 14.0
      },
      {
        "time": "2026-09-06 23:12:23",
        "lat": 2.296799,
        "lng": 99.90848,
        "speed": 23.0
      },
      {
        "time": "2026-09-06 23:12:53",
        "lat": 2.294959,
        "lng": 99.908276,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 23:13:23",
        "lat": 2.293064,
        "lng": 99.908027,
        "speed": 24.0
      },
      {
        "time": "2026-09-06 23:13:54",
        "lat": 2.292393,
        "lng": 99.907911,
        "speed": 0.0
      },
      {
        "time": "2026-09-06 23:14:03",
        "lat": 2.292312,
        "lng": 99.907956,
        "speed": 8.0
      },
      {
        "time": "2026-09-06 23:14:25",
        "lat": 2.292328,
        "lng": 99.908009,
        "speed": 0.0
      }
    ]
  },
  "2026-09-07__V-PHH-01": {
    "date": "2026-09-07",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-07 05:42:11",
        "lat": 2.292276,
        "lng": 99.907991,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 05:43:40",
        "lat": 2.295731,
        "lng": 99.908347,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 05:44:20",
        "lat": 2.298576,
        "lng": 99.909209,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 05:44:50",
        "lat": 2.298714,
        "lng": 99.911404,
        "speed": 38.0
      },
      {
        "time": "2026-09-07 05:45:40",
        "lat": 2.298783,
        "lng": 99.91616,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 05:46:30",
        "lat": 2.298917,
        "lng": 99.921013,
        "speed": 39.0
      },
      {
        "time": "2026-09-07 05:47:20",
        "lat": 2.299018,
        "lng": 99.926107,
        "speed": 43.0
      },
      {
        "time": "2026-09-07 05:48:10",
        "lat": 2.298897,
        "lng": 99.931511,
        "speed": 46.0
      },
      {
        "time": "2026-09-07 05:49:10",
        "lat": 2.299026,
        "lng": 99.936107,
        "speed": 52.0
      },
      {
        "time": "2026-09-07 05:50:00",
        "lat": 2.299374,
        "lng": 99.94352,
        "speed": 58.0
      },
      {
        "time": "2026-09-07 05:50:50",
        "lat": 2.299766,
        "lng": 99.950764,
        "speed": 52.0
      },
      {
        "time": "2026-09-07 05:51:40",
        "lat": 2.299862,
        "lng": 99.957778,
        "speed": 55.0
      },
      {
        "time": "2026-09-07 05:52:30",
        "lat": 2.300017,
        "lng": 99.965902,
        "speed": 69.0
      },
      {
        "time": "2026-09-07 05:53:50",
        "lat": 2.300051,
        "lng": 99.968578,
        "speed": 11.0
      },
      {
        "time": "2026-09-07 05:57:06",
        "lat": 2.300059,
        "lng": 99.969324,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 05:57:44",
        "lat": 2.300063,
        "lng": 99.968684,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 05:58:22",
        "lat": 2.300051,
        "lng": 99.969253,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 05:58:34",
        "lat": 2.300063,
        "lng": 99.968667,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 05:59:00",
        "lat": 2.300031,
        "lng": 99.966684,
        "speed": 47.0
      },
      {
        "time": "2026-09-07 05:59:50",
        "lat": 2.299894,
        "lng": 99.960533,
        "speed": 52.0
      },
      {
        "time": "2026-09-07 06:00:40",
        "lat": 2.299786,
        "lng": 99.953902,
        "speed": 53.0
      },
      {
        "time": "2026-09-07 06:01:30",
        "lat": 2.299542,
        "lng": 99.947164,
        "speed": 50.0
      },
      {
        "time": "2026-09-07 06:02:20",
        "lat": 2.299255,
        "lng": 99.940542,
        "speed": 52.0
      },
      {
        "time": "2026-09-07 06:03:10",
        "lat": 2.298959,
        "lng": 99.934427,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 06:03:46",
        "lat": 2.298142,
        "lng": 99.933982,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 06:10:06",
        "lat": 2.292328,
        "lng": 99.908009,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 06:14:43",
        "lat": 2.298457,
        "lng": 99.933369,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 06:19:47",
        "lat": 2.298489,
        "lng": 99.933369,
        "speed": 10.0
      },
      {
        "time": "2026-09-07 06:20:08",
        "lat": 2.292328,
        "lng": 99.908009,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 06:20:57",
        "lat": 2.298995,
        "lng": 99.927244,
        "speed": 46.0
      },
      {
        "time": "2026-09-07 06:21:47",
        "lat": 2.298853,
        "lng": 99.920756,
        "speed": 53.0
      },
      {
        "time": "2026-09-07 06:22:37",
        "lat": 2.298713,
        "lng": 99.913769,
        "speed": 60.0
      },
      {
        "time": "2026-09-07 06:23:17",
        "lat": 2.298771,
        "lng": 99.909378,
        "speed": 9.0
      },
      {
        "time": "2026-09-07 09:11:05",
        "lat": 2.298859,
        "lng": 99.909307,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 09:11:37",
        "lat": 2.298707,
        "lng": 99.910649,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 09:12:27",
        "lat": 2.298767,
        "lng": 99.914569,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 09:13:17",
        "lat": 2.298844,
        "lng": 99.918604,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 09:14:07",
        "lat": 2.298918,
        "lng": 99.922222,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 09:14:57",
        "lat": 2.298982,
        "lng": 99.925698,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 09:15:48",
        "lat": 2.29902,
        "lng": 99.929022,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 09:16:38",
        "lat": 2.298854,
        "lng": 99.932516,
        "speed": 18.0
      },
      {
        "time": "2026-09-07 09:17:10",
        "lat": 2.298496,
        "lng": 99.933493,
        "speed": 1.0
      },
      {
        "time": "2026-09-07 09:19:10",
        "lat": 2.298884,
        "lng": 99.933982,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 09:19:51",
        "lat": 2.298998,
        "lng": 99.93672,
        "speed": 10.0
      },
      {
        "time": "2026-09-07 09:20:50",
        "lat": 2.299116,
        "lng": 99.938249,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 09:21:40",
        "lat": 2.299321,
        "lng": 99.942036,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 09:22:30",
        "lat": 2.299517,
        "lng": 99.94616,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 09:23:20",
        "lat": 2.299751,
        "lng": 99.950116,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 09:24:10",
        "lat": 2.299811,
        "lng": 99.954676,
        "speed": 36.0
      },
      {
        "time": "2026-09-07 09:25:00",
        "lat": 2.299879,
        "lng": 99.959084,
        "speed": 36.0
      },
      {
        "time": "2026-09-07 09:25:50",
        "lat": 2.299966,
        "lng": 99.963689,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 09:26:40",
        "lat": 2.300049,
        "lng": 99.968036,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 09:27:13",
        "lat": 2.299606,
        "lng": 99.968898,
        "speed": 9.0
      },
      {
        "time": "2026-09-07 10:04:07",
        "lat": 2.300017,
        "lng": 99.968133,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 10:04:47",
        "lat": 2.299992,
        "lng": 99.965378,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 10:05:37",
        "lat": 2.299915,
        "lng": 99.961422,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 10:06:27",
        "lat": 2.299839,
        "lng": 99.957449,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 10:07:17",
        "lat": 2.299782,
        "lng": 99.953644,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 10:08:07",
        "lat": 2.299704,
        "lng": 99.949689,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 10:08:57",
        "lat": 2.299493,
        "lng": 99.945929,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 10:09:47",
        "lat": 2.299335,
        "lng": 99.942151,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 10:10:37",
        "lat": 2.29911,
        "lng": 99.938204,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 10:11:27",
        "lat": 2.298974,
        "lng": 99.934498,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 10:12:17",
        "lat": 2.298884,
        "lng": 99.931751,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 10:12:57",
        "lat": 2.298473,
        "lng": 99.929573,
        "speed": 11.0
      },
      {
        "time": "2026-09-07 10:13:57",
        "lat": 2.298082,
        "lng": 99.929511,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 10:14:47",
        "lat": 2.294796,
        "lng": 99.929067,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 10:15:47",
        "lat": 2.291997,
        "lng": 99.928693,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 10:16:37",
        "lat": 2.289601,
        "lng": 99.927911,
        "speed": 14.0
      },
      {
        "time": "2026-09-07 10:17:37",
        "lat": 2.289756,
        "lng": 99.926498,
        "speed": 10.0
      },
      {
        "time": "2026-09-07 10:18:27",
        "lat": 2.289982,
        "lng": 99.925538,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 10:20:07",
        "lat": 2.290818,
        "lng": 99.925467,
        "speed": 9.0
      },
      {
        "time": "2026-09-07 10:20:57",
        "lat": 2.290779,
        "lng": 99.924044,
        "speed": 10.0
      },
      {
        "time": "2026-09-07 10:22:15",
        "lat": 2.291323,
        "lng": 99.923458,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 10:23:17",
        "lat": 2.291371,
        "lng": 99.922524,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 10:24:17",
        "lat": 2.291669,
        "lng": 99.921316,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 10:25:07",
        "lat": 2.294248,
        "lng": 99.921627,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 10:25:57",
        "lat": 2.297416,
        "lng": 99.922053,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 10:27:51",
        "lat": 2.298261,
        "lng": 99.922347,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 11:39:20",
        "lat": 2.298904,
        "lng": 99.922382,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 11:40:10",
        "lat": 2.298979,
        "lng": 99.925564,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 11:41:00",
        "lat": 2.299016,
        "lng": 99.92936,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 11:41:50",
        "lat": 2.298883,
        "lng": 99.93272,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 11:42:40",
        "lat": 2.299007,
        "lng": 99.935351,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 11:43:19",
        "lat": 2.298714,
        "lng": 99.936818,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 12:40:59",
        "lat": 2.298667,
        "lng": 99.937369,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 12:43:06",
        "lat": 2.299042,
        "lng": 99.936898,
        "speed": 18.0
      },
      {
        "time": "2026-09-07 12:43:52",
        "lat": 2.299193,
        "lng": 99.939564,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 12:44:42",
        "lat": 2.299364,
        "lng": 99.943013,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 12:45:32",
        "lat": 2.299521,
        "lng": 99.946631,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:46:22",
        "lat": 2.299759,
        "lng": 99.949956,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 12:47:12",
        "lat": 2.299792,
        "lng": 99.953529,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:48:02",
        "lat": 2.299855,
        "lng": 99.957173,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:48:52",
        "lat": 2.299898,
        "lng": 99.960613,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:49:42",
        "lat": 2.299981,
        "lng": 99.964356,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:50:22",
        "lat": 2.298711,
        "lng": 99.965964,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 12:51:12",
        "lat": 2.294388,
        "lng": 99.966133,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 12:52:03",
        "lat": 2.292871,
        "lng": 99.968213,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 12:52:53",
        "lat": 2.292726,
        "lng": 99.972133,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 12:53:43",
        "lat": 2.292548,
        "lng": 99.976062,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 12:54:33",
        "lat": 2.292272,
        "lng": 99.979867,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 12:55:23",
        "lat": 2.291976,
        "lng": 99.983858,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 12:56:03",
        "lat": 2.290154,
        "lng": 99.984471,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 12:56:53",
        "lat": 2.286308,
        "lng": 99.984507,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 12:58:32",
        "lat": 2.284848,
        "lng": 99.985698,
        "speed": 4.0
      },
      {
        "time": "2026-09-07 13:10:07",
        "lat": 2.284802,
        "lng": 99.98496,
        "speed": 7.0
      },
      {
        "time": "2026-09-07 13:11:07",
        "lat": 2.287152,
        "lng": 99.984489,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 13:11:57",
        "lat": 2.290249,
        "lng": 99.984462,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 13:12:37",
        "lat": 2.29199,
        "lng": 99.983716,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 13:13:27",
        "lat": 2.292286,
        "lng": 99.979822,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 13:14:17",
        "lat": 2.292593,
        "lng": 99.975573,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 13:15:07",
        "lat": 2.292774,
        "lng": 99.971538,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 13:15:57",
        "lat": 2.292912,
        "lng": 99.967609,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 13:16:27",
        "lat": 2.293503,
        "lng": 99.96616,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 13:17:17",
        "lat": 2.296969,
        "lng": 99.966053,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 13:18:11",
        "lat": 2.300012,
        "lng": 99.966098,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 13:19:37",
        "lat": 2.299702,
        "lng": 99.968391,
        "speed": 18.0
      },
      {
        "time": "2026-09-07 13:20:45",
        "lat": 2.300069,
        "lng": 99.968036,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 13:21:37",
        "lat": 2.299998,
        "lng": 99.96496,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 13:22:27",
        "lat": 2.299887,
        "lng": 99.959618,
        "speed": 46.0
      },
      {
        "time": "2026-09-07 13:23:17",
        "lat": 2.299793,
        "lng": 99.954071,
        "speed": 43.0
      },
      {
        "time": "2026-09-07 13:24:07",
        "lat": 2.299637,
        "lng": 99.948604,
        "speed": 44.0
      },
      {
        "time": "2026-09-07 13:24:57",
        "lat": 2.299382,
        "lng": 99.943316,
        "speed": 45.0
      },
      {
        "time": "2026-09-07 13:25:47",
        "lat": 2.299091,
        "lng": 99.937467,
        "speed": 46.0
      },
      {
        "time": "2026-09-07 13:26:37",
        "lat": 2.298866,
        "lng": 99.93312,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 13:27:27",
        "lat": 2.299022,
        "lng": 99.928693,
        "speed": 43.0
      },
      {
        "time": "2026-09-07 13:28:17",
        "lat": 2.298923,
        "lng": 99.923342,
        "speed": 45.0
      },
      {
        "time": "2026-09-07 13:29:07",
        "lat": 2.29882,
        "lng": 99.916996,
        "speed": 53.0
      },
      {
        "time": "2026-09-07 13:29:47",
        "lat": 2.298563,
        "lng": 99.913218,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 13:30:37",
        "lat": 2.294992,
        "lng": 99.912551,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 13:31:27",
        "lat": 2.297723,
        "lng": 99.910889,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 13:32:07",
        "lat": 2.298593,
        "lng": 99.909404,
        "speed": 9.0
      },
      {
        "time": "2026-09-07 13:32:47",
        "lat": 2.296457,
        "lng": 99.908444,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 13:33:37",
        "lat": 2.292312,
        "lng": 99.907911,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 13:34:21",
        "lat": 2.289427,
        "lng": 99.9076,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 13:50:08",
        "lat": 2.291125,
        "lng": 99.907733,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 13:50:58",
        "lat": 2.295648,
        "lng": 99.90832,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 13:51:38",
        "lat": 2.298578,
        "lng": 99.909227,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 14:12:47",
        "lat": 2.298757,
        "lng": 99.909324,
        "speed": 7.0
      },
      {
        "time": "2026-09-07 14:13:37",
        "lat": 2.298698,
        "lng": 99.910578,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 14:14:27",
        "lat": 2.298764,
        "lng": 99.913591,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 14:15:17",
        "lat": 2.29881,
        "lng": 99.916489,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 14:16:07",
        "lat": 2.298887,
        "lng": 99.919529,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 14:16:52",
        "lat": 2.298873,
        "lng": 99.920249,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 14:17:37",
        "lat": 2.29897,
        "lng": 99.92288,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 14:18:37",
        "lat": 2.299038,
        "lng": 99.925849,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 14:19:27",
        "lat": 2.299081,
        "lng": 99.928782,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 14:20:17",
        "lat": 2.298928,
        "lng": 99.931964,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 14:21:07",
        "lat": 2.296882,
        "lng": 99.932302,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 14:21:57",
        "lat": 2.293799,
        "lng": 99.932178,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 14:22:47",
        "lat": 2.290726,
        "lng": 99.932133,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 14:23:49",
        "lat": 2.289632,
        "lng": 99.932329,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 14:26:01",
        "lat": 2.291012,
        "lng": 99.932142,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 14:26:51",
        "lat": 2.294529,
        "lng": 99.932213,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 14:27:41",
        "lat": 2.298017,
        "lng": 99.932391,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 14:28:31",
        "lat": 2.298912,
        "lng": 99.933964,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 14:29:21",
        "lat": 2.299065,
        "lng": 99.937084,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 14:30:11",
        "lat": 2.299267,
        "lng": 99.940756,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 14:31:00",
        "lat": 2.29925,
        "lng": 99.94344,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 14:32:21",
        "lat": 2.299441,
        "lng": 99.944676,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 14:33:11",
        "lat": 2.299636,
        "lng": 99.948124,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 14:33:56",
        "lat": 2.29991,
        "lng": 99.950809,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 14:34:41",
        "lat": 2.30272,
        "lng": 99.951102,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 14:35:31",
        "lat": 2.306221,
        "lng": 99.951369,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 14:47:47",
        "lat": 2.306377,
        "lng": 99.951822,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 14:48:37",
        "lat": 2.306261,
        "lng": 99.954978,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 14:49:17",
        "lat": 2.308768,
        "lng": 99.955013,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 14:49:47",
        "lat": 2.309021,
        "lng": 99.9564,
        "speed": 17.0
      },
      {
        "time": "2026-09-07 14:50:37",
        "lat": 2.312602,
        "lng": 99.956347,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 14:51:27",
        "lat": 2.316803,
        "lng": 99.956302,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 14:52:17",
        "lat": 2.320838,
        "lng": 99.956249,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 14:53:07",
        "lat": 2.324556,
        "lng": 99.956169,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 15:04:59",
        "lat": 2.325968,
        "lng": 99.956169,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 15:05:49",
        "lat": 2.323165,
        "lng": 99.956169,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 15:06:39",
        "lat": 2.319985,
        "lng": 99.956231,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 15:07:19",
        "lat": 2.319019,
        "lng": 99.957404,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 15:08:09",
        "lat": 2.319064,
        "lng": 99.960738,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 15:08:59",
        "lat": 2.319126,
        "lng": 99.964284,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 15:09:49",
        "lat": 2.319181,
        "lng": 99.96776,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 15:10:39",
        "lat": 2.319171,
        "lng": 99.97072,
        "speed": 12.0
      },
      {
        "time": "2026-09-07 15:11:29",
        "lat": 2.316134,
        "lng": 99.970702,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 15:12:19",
        "lat": 2.312667,
        "lng": 99.970702,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 15:13:09",
        "lat": 2.30923,
        "lng": 99.970684,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 15:13:59",
        "lat": 2.306284,
        "lng": 99.970684,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 15:14:49",
        "lat": 2.302493,
        "lng": 99.970658,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 15:15:39",
        "lat": 2.300108,
        "lng": 99.970133,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 15:16:11",
        "lat": 2.29973,
        "lng": 99.969111,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 15:49:03",
        "lat": 2.29964,
        "lng": 99.968853,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 16:45:33",
        "lat": 2.299348,
        "lng": 99.96872,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 16:46:23",
        "lat": 2.299998,
        "lng": 99.967778,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 16:47:13",
        "lat": 2.299956,
        "lng": 99.96408,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 16:48:03",
        "lat": 2.299881,
        "lng": 99.960044,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 16:48:53",
        "lat": 2.299812,
        "lng": 99.955929,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 16:49:43",
        "lat": 2.299743,
        "lng": 99.951973,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 16:50:33",
        "lat": 2.299588,
        "lng": 99.94808,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 16:51:14",
        "lat": 2.299425,
        "lng": 99.944987,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 16:51:38",
        "lat": 2.29937,
        "lng": 99.943964,
        "speed": 18.0
      },
      {
        "time": "2026-09-07 16:52:23",
        "lat": 2.299454,
        "lng": 99.944711,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 16:53:33",
        "lat": 2.299389,
        "lng": 99.944062,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 16:54:23",
        "lat": 2.299229,
        "lng": 99.940747,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 16:55:13",
        "lat": 2.299023,
        "lng": 99.936916,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 16:56:03",
        "lat": 2.298875,
        "lng": 99.933742,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 16:56:41",
        "lat": 2.298182,
        "lng": 99.933173,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 17:01:11",
        "lat": 2.298121,
        "lng": 99.933004,
        "speed": 7.0
      },
      {
        "time": "2026-09-07 17:01:45",
        "lat": 2.298794,
        "lng": 99.933102,
        "speed": 17.0
      },
      {
        "time": "2026-09-07 17:02:31",
        "lat": 2.297413,
        "lng": 99.932347,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 17:03:21",
        "lat": 2.294181,
        "lng": 99.932213,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 17:04:11",
        "lat": 2.291528,
        "lng": 99.932133,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 17:05:09",
        "lat": 2.289631,
        "lng": 99.932178,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 17:37:02",
        "lat": 2.290608,
        "lng": 99.932142,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 17:37:52",
        "lat": 2.293303,
        "lng": 99.932196,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 17:38:42",
        "lat": 2.296204,
        "lng": 99.932293,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 17:39:32",
        "lat": 2.298059,
        "lng": 99.932729,
        "speed": 8.0
      },
      {
        "time": "2026-09-07 17:40:02",
        "lat": 2.298477,
        "lng": 99.932373,
        "speed": 17.0
      },
      {
        "time": "2026-09-07 17:40:52",
        "lat": 2.298926,
        "lng": 99.930302,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 17:41:32",
        "lat": 2.297989,
        "lng": 99.929493,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 17:42:22",
        "lat": 2.294117,
        "lng": 99.928951,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 17:43:12",
        "lat": 2.290087,
        "lng": 99.928418,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 18:04:10",
        "lat": 2.290452,
        "lng": 99.92848,
        "speed": 16.0
      },
      {
        "time": "2026-09-07 18:05:00",
        "lat": 2.29314,
        "lng": 99.928871,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 18:05:48",
        "lat": 2.295759,
        "lng": 99.929218,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 18:06:00",
        "lat": 2.296472,
        "lng": 99.929333,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 18:06:30",
        "lat": 2.298219,
        "lng": 99.929556,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 18:07:28",
        "lat": 2.298878,
        "lng": 99.929653,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 19:06:09",
        "lat": 2.298949,
        "lng": 99.929547,
        "speed": 14.0
      },
      {
        "time": "2026-09-07 19:06:53",
        "lat": 2.298985,
        "lng": 99.926933,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 19:07:43",
        "lat": 2.298944,
        "lng": 99.9236,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 19:08:33",
        "lat": 2.298859,
        "lng": 99.920133,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 19:09:23",
        "lat": 2.298782,
        "lng": 99.916373,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 19:10:13",
        "lat": 2.298711,
        "lng": 99.912498,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 19:11:03",
        "lat": 2.298573,
        "lng": 99.909067,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 19:11:48",
        "lat": 2.296025,
        "lng": 99.908382,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 19:12:18",
        "lat": 2.293794,
        "lng": 99.908107,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 19:12:43",
        "lat": 2.291976,
        "lng": 99.907849,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 19:13:12",
        "lat": 2.289932,
        "lng": 99.907573,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 20:27:42",
        "lat": 2.289408,
        "lng": 99.907556,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 20:28:41",
        "lat": 2.291439,
        "lng": 99.907796,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 20:29:31",
        "lat": 2.294896,
        "lng": 99.908249,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 20:30:01",
        "lat": 2.296963,
        "lng": 99.908516,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 20:30:21",
        "lat": 2.298273,
        "lng": 99.908676,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 20:30:45",
        "lat": 2.29863,
        "lng": 99.909396,
        "speed": 9.0
      },
      {
        "time": "2026-09-07 20:31:19",
        "lat": 2.298776,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 20:50:47",
        "lat": 2.298683,
        "lng": 99.911538,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 20:51:37",
        "lat": 2.29876,
        "lng": 99.916187,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 20:52:27",
        "lat": 2.298862,
        "lng": 99.920871,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 20:53:17",
        "lat": 2.298959,
        "lng": 99.92528,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 20:54:07",
        "lat": 2.299007,
        "lng": 99.928844,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 20:54:57",
        "lat": 2.298843,
        "lng": 99.932791,
        "speed": 21.0
      },
      {
        "time": "2026-09-07 20:55:34",
        "lat": 2.298721,
        "lng": 99.933822,
        "speed": 3.0
      },
      {
        "time": "2026-09-07 20:59:40",
        "lat": 2.298785,
        "lng": 99.93384,
        "speed": 0.0
      },
      {
        "time": "2026-09-07 21:00:27",
        "lat": 2.298846,
        "lng": 99.931556,
        "speed": 36.0
      },
      {
        "time": "2026-09-07 21:01:17",
        "lat": 2.298968,
        "lng": 99.926613,
        "speed": 42.0
      },
      {
        "time": "2026-09-07 21:02:07",
        "lat": 2.298875,
        "lng": 99.921342,
        "speed": 42.0
      },
      {
        "time": "2026-09-07 21:02:57",
        "lat": 2.298763,
        "lng": 99.91608,
        "speed": 42.0
      },
      {
        "time": "2026-09-07 21:03:45",
        "lat": 2.298813,
        "lng": 99.913262,
        "speed": 17.0
      },
      {
        "time": "2026-09-07 21:04:17",
        "lat": 2.298706,
        "lng": 99.912773,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 21:05:01",
        "lat": 2.298664,
        "lng": 99.909404,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 22:09:38",
        "lat": 2.298754,
        "lng": 99.909378,
        "speed": 6.0
      },
      {
        "time": "2026-09-07 22:10:11",
        "lat": 2.298679,
        "lng": 99.910533,
        "speed": 22.0
      },
      {
        "time": "2026-09-07 22:11:01",
        "lat": 2.298731,
        "lng": 99.913413,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 22:11:50",
        "lat": 2.298785,
        "lng": 99.916276,
        "speed": 25.0
      },
      {
        "time": "2026-09-07 22:12:18",
        "lat": 2.298881,
        "lng": 99.917822,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 22:13:01",
        "lat": 2.301337,
        "lng": 99.918116,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 22:13:31",
        "lat": 2.303112,
        "lng": 99.918356,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 22:14:02",
        "lat": 2.305019,
        "lng": 99.918604,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 22:14:28",
        "lat": 2.306703,
        "lng": 99.918827,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 22:17:01",
        "lat": 2.305843,
        "lng": 99.91872,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 22:17:49",
        "lat": 2.302811,
        "lng": 99.918329,
        "speed": 23.0
      },
      {
        "time": "2026-09-07 22:18:21",
        "lat": 2.300651,
        "lng": 99.918018,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 22:18:45",
        "lat": 2.298986,
        "lng": 99.917804,
        "speed": 19.0
      },
      {
        "time": "2026-09-07 22:19:01",
        "lat": 2.298883,
        "lng": 99.91856,
        "speed": 26.0
      },
      {
        "time": "2026-09-07 22:19:41",
        "lat": 2.298898,
        "lng": 99.921209,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 22:20:21",
        "lat": 2.300435,
        "lng": 99.92248,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 22:21:04",
        "lat": 2.303617,
        "lng": 99.92288,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 22:21:43",
        "lat": 2.306531,
        "lng": 99.923307,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 22:23:01",
        "lat": 2.306778,
        "lng": 99.923342,
        "speed": 20.0
      },
      {
        "time": "2026-09-07 22:23:21",
        "lat": 2.305383,
        "lng": 99.923129,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 22:23:51",
        "lat": 2.302959,
        "lng": 99.922809,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 22:24:21",
        "lat": 2.300559,
        "lng": 99.922489,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 22:24:41",
        "lat": 2.299031,
        "lng": 99.922267,
        "speed": 13.0
      },
      {
        "time": "2026-09-07 22:25:03",
        "lat": 2.298986,
        "lng": 99.923582,
        "speed": 29.0
      },
      {
        "time": "2026-09-07 22:25:41",
        "lat": 2.299021,
        "lng": 99.92648,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 22:26:11",
        "lat": 2.299032,
        "lng": 99.928756,
        "speed": 30.0
      },
      {
        "time": "2026-09-07 22:26:41",
        "lat": 2.297767,
        "lng": 99.929458,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 22:27:03",
        "lat": 2.295919,
        "lng": 99.929227,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 22:27:41",
        "lat": 2.292502,
        "lng": 99.928782,
        "speed": 36.0
      },
      {
        "time": "2026-09-07 22:28:14",
        "lat": 2.289721,
        "lng": 99.928436,
        "speed": 15.0
      },
      {
        "time": "2026-09-07 22:28:27",
        "lat": 2.289653,
        "lng": 99.928382,
        "speed": 6.0
      },
      {
        "time": "2026-09-07 22:28:45",
        "lat": 2.290583,
        "lng": 99.928533,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 22:29:11",
        "lat": 2.292522,
        "lng": 99.928791,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 22:29:31",
        "lat": 2.294188,
        "lng": 99.929022,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 22:29:54",
        "lat": 2.296184,
        "lng": 99.92928,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 22:30:21",
        "lat": 2.298546,
        "lng": 99.9296,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 22:30:39",
        "lat": 2.299942,
        "lng": 99.929787,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 22:31:01",
        "lat": 2.301852,
        "lng": 99.930044,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 22:31:22",
        "lat": 2.303577,
        "lng": 99.930276,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 22:31:51",
        "lat": 2.305931,
        "lng": 99.930569,
        "speed": 31.0
      },
      {
        "time": "2026-09-07 22:33:05",
        "lat": 2.307098,
        "lng": 99.930711,
        "speed": 6.0
      },
      {
        "time": "2026-09-07 22:33:41",
        "lat": 2.305006,
        "lng": 99.930436,
        "speed": 28.0
      },
      {
        "time": "2026-09-07 22:34:23",
        "lat": 2.301869,
        "lng": 99.930018,
        "speed": 32.0
      },
      {
        "time": "2026-09-07 22:34:49",
        "lat": 2.299754,
        "lng": 99.929716,
        "speed": 33.0
      },
      {
        "time": "2026-09-07 22:34:56",
        "lat": 2.299194,
        "lng": 99.929653,
        "speed": 24.0
      },
      {
        "time": "2026-09-07 22:35:24",
        "lat": 2.29903,
        "lng": 99.927778,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 22:36:11",
        "lat": 2.298969,
        "lng": 99.92368,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 22:36:41",
        "lat": 2.298893,
        "lng": 99.921111,
        "speed": 34.0
      },
      {
        "time": "2026-09-07 22:37:31",
        "lat": 2.298808,
        "lng": 99.916729,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 22:38:01",
        "lat": 2.298749,
        "lng": 99.914062,
        "speed": 35.0
      },
      {
        "time": "2026-09-07 22:38:31",
        "lat": 2.298726,
        "lng": 99.911396,
        "speed": 37.0
      },
      {
        "time": "2026-09-07 22:39:01",
        "lat": 2.298799,
        "lng": 99.909378,
        "speed": 8.0
      },
      {
        "time": "2026-09-07 23:39:45",
        "lat": 2.298573,
        "lng": 99.909227,
        "speed": 18.0
      },
      {
        "time": "2026-09-07 23:40:05",
        "lat": 2.298186,
        "lng": 99.908676,
        "speed": 27.0
      },
      {
        "time": "2026-09-07 23:40:55",
        "lat": 2.293111,
        "lng": 99.908027,
        "speed": 43.0
      },
      {
        "time": "2026-09-07 23:41:30",
        "lat": 2.291747,
        "lng": 99.907876,
        "speed": 6.0
      },
      {
        "time": "2026-09-07 23:41:57",
        "lat": 2.29177,
        "lng": 99.907956,
        "speed": 0.0
      }
    ]
  },
  "2026-09-08__V-PHH-01": {
    "date": "2026-09-08",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-08 05:28:42",
        "lat": 2.291768,
        "lng": 99.907947,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 05:29:38",
        "lat": 2.291762,
        "lng": 99.907947,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 05:29:45",
        "lat": 2.291742,
        "lng": 99.907876,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 05:29:52",
        "lat": 2.291964,
        "lng": 99.907858,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 05:30:12",
        "lat": 2.293156,
        "lng": 99.908027,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 05:30:32",
        "lat": 2.295302,
        "lng": 99.908276,
        "speed": 49.0
      },
      {
        "time": "2026-09-08 05:30:51",
        "lat": 2.297686,
        "lng": 99.908578,
        "speed": 48.0
      },
      {
        "time": "2026-09-08 05:30:53",
        "lat": 2.297922,
        "lng": 99.908596,
        "speed": 44.0
      },
      {
        "time": "2026-09-08 05:31:12",
        "lat": 2.298595,
        "lng": 99.909342,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 05:31:51",
        "lat": 2.298807,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 06:38:00",
        "lat": 2.298831,
        "lng": 99.909324,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 06:38:15",
        "lat": 2.298757,
        "lng": 99.909378,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 06:38:25",
        "lat": 2.298632,
        "lng": 99.90968,
        "speed": 21.0
      },
      {
        "time": "2026-09-08 06:38:40",
        "lat": 2.298539,
        "lng": 99.910418,
        "speed": 21.0
      },
      {
        "time": "2026-09-08 06:38:55",
        "lat": 2.297677,
        "lng": 99.910907,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 06:39:15",
        "lat": 2.29641,
        "lng": 99.911689,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 06:39:35",
        "lat": 2.29522,
        "lng": 99.912418,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 06:39:55",
        "lat": 2.294111,
        "lng": 99.913067,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 06:40:15",
        "lat": 2.292946,
        "lng": 99.913769,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 06:40:35",
        "lat": 2.291715,
        "lng": 99.914507,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 06:40:55",
        "lat": 2.290544,
        "lng": 99.9152,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 06:41:12",
        "lat": 2.289628,
        "lng": 99.915724,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 06:41:15",
        "lat": 2.289536,
        "lng": 99.915769,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 06:41:39",
        "lat": 2.289527,
        "lng": 99.915813,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:00:16",
        "lat": 2.290172,
        "lng": 99.915413,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 08:00:36",
        "lat": 2.291476,
        "lng": 99.914649,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 08:00:56",
        "lat": 2.293003,
        "lng": 99.913716,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 08:01:16",
        "lat": 2.294994,
        "lng": 99.912533,
        "speed": 50.0
      },
      {
        "time": "2026-09-08 08:01:36",
        "lat": 2.297126,
        "lng": 99.911236,
        "speed": 47.0
      },
      {
        "time": "2026-09-08 08:01:50",
        "lat": 2.297431,
        "lng": 99.910818,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:02:06",
        "lat": 2.295654,
        "lng": 99.910613,
        "speed": 42.0
      },
      {
        "time": "2026-09-08 08:02:26",
        "lat": 2.293152,
        "lng": 99.910267,
        "speed": 52.0
      },
      {
        "time": "2026-09-08 08:02:46",
        "lat": 2.290581,
        "lng": 99.909947,
        "speed": 50.0
      },
      {
        "time": "2026-09-08 08:03:04",
        "lat": 2.289289,
        "lng": 99.909716,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:03:16",
        "lat": 2.289272,
        "lng": 99.909378,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 08:03:46",
        "lat": 2.289242,
        "lng": 99.908382,
        "speed": 18.0
      },
      {
        "time": "2026-09-08 08:04:11",
        "lat": 2.289268,
        "lng": 99.907733,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:12:32",
        "lat": 2.289292,
        "lng": 99.907698,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:12:49",
        "lat": 2.289243,
        "lng": 99.908116,
        "speed": 15.0
      },
      {
        "time": "2026-09-08 08:13:29",
        "lat": 2.289251,
        "lng": 99.909209,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 08:13:49",
        "lat": 2.289316,
        "lng": 99.909751,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 08:14:09",
        "lat": 2.291287,
        "lng": 99.910009,
        "speed": 46.0
      },
      {
        "time": "2026-09-08 08:14:29",
        "lat": 2.293572,
        "lng": 99.91032,
        "speed": 47.0
      },
      {
        "time": "2026-09-08 08:14:49",
        "lat": 2.295993,
        "lng": 99.910649,
        "speed": 48.0
      },
      {
        "time": "2026-09-08 08:15:02",
        "lat": 2.297413,
        "lng": 99.910818,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 08:15:08",
        "lat": 2.297626,
        "lng": 99.910916,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 08:15:19",
        "lat": 2.296984,
        "lng": 99.911307,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 08:15:39",
        "lat": 2.295147,
        "lng": 99.912436,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 08:15:59",
        "lat": 2.293218,
        "lng": 99.913609,
        "speed": 45.0
      },
      {
        "time": "2026-09-08 08:16:19",
        "lat": 2.291657,
        "lng": 99.914533,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 08:16:25",
        "lat": 2.291292,
        "lng": 99.914747,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:16:39",
        "lat": 2.290539,
        "lng": 99.9152,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 08:16:59",
        "lat": 2.289493,
        "lng": 99.915804,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 08:26:18",
        "lat": 2.289532,
        "lng": 99.91584,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:26:35",
        "lat": 2.289858,
        "lng": 99.915609,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:27:11",
        "lat": 2.290486,
        "lng": 99.915236,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:27:45",
        "lat": 2.290715,
        "lng": 99.915067,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 08:28:04",
        "lat": 2.291639,
        "lng": 99.914667,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 08:28:15",
        "lat": 2.292319,
        "lng": 99.914764,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 08:28:35",
        "lat": 2.293549,
        "lng": 99.914924,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 08:28:55",
        "lat": 2.294861,
        "lng": 99.915084,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:29:15",
        "lat": 2.296198,
        "lng": 99.915271,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:29:35",
        "lat": 2.297493,
        "lng": 99.915431,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 08:29:53",
        "lat": 2.298587,
        "lng": 99.915573,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 08:29:55",
        "lat": 2.298661,
        "lng": 99.9156,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:30:05",
        "lat": 2.298756,
        "lng": 99.915973,
        "speed": 21.0
      },
      {
        "time": "2026-09-08 08:30:25",
        "lat": 2.298788,
        "lng": 99.917209,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:30:45",
        "lat": 2.298811,
        "lng": 99.918569,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:31:05",
        "lat": 2.298839,
        "lng": 99.919956,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:31:25",
        "lat": 2.298873,
        "lng": 99.921342,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:31:45",
        "lat": 2.298909,
        "lng": 99.922756,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:32:05",
        "lat": 2.298932,
        "lng": 99.924213,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 08:32:15",
        "lat": 2.299145,
        "lng": 99.92448,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 08:32:35",
        "lat": 2.30043,
        "lng": 99.924658,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:32:55",
        "lat": 2.301764,
        "lng": 99.924836,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:33:15",
        "lat": 2.303124,
        "lng": 99.925022,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:33:35",
        "lat": 2.304517,
        "lng": 99.925191,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:33:55",
        "lat": 2.305809,
        "lng": 99.92536,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:34:15",
        "lat": 2.306869,
        "lng": 99.92552,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 08:34:37",
        "lat": 2.306928,
        "lng": 99.925538,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:34:55",
        "lat": 2.30704,
        "lng": 99.925716,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 08:35:15",
        "lat": 2.307086,
        "lng": 99.926444,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 08:35:35",
        "lat": 2.30712,
        "lng": 99.927173,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 08:35:45",
        "lat": 2.307058,
        "lng": 99.927449,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 08:35:48",
        "lat": 2.307082,
        "lng": 99.92752,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 08:35:58",
        "lat": 2.307077,
        "lng": 99.927653,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 08:36:05",
        "lat": 2.307102,
        "lng": 99.927778,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:36:15",
        "lat": 2.307081,
        "lng": 99.928089,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:36:35",
        "lat": 2.307067,
        "lng": 99.928889,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 08:36:55",
        "lat": 2.307078,
        "lng": 99.929716,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 08:37:15",
        "lat": 2.307116,
        "lng": 99.930489,
        "speed": 10.0
      },
      {
        "time": "2026-09-08 08:37:42",
        "lat": 2.307087,
        "lng": 99.930649,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 08:37:55",
        "lat": 2.306503,
        "lng": 99.930578,
        "speed": 24.0
      },
      {
        "time": "2026-09-08 08:38:15",
        "lat": 2.305145,
        "lng": 99.930418,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:38:35",
        "lat": 2.303697,
        "lng": 99.930249,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:38:55",
        "lat": 2.30228,
        "lng": 99.93008,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:39:15",
        "lat": 2.300801,
        "lng": 99.929867,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:39:35",
        "lat": 2.299351,
        "lng": 99.929689,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 08:39:40",
        "lat": 2.299074,
        "lng": 99.929653,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 08:39:55",
        "lat": 2.298964,
        "lng": 99.930293,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:40:15",
        "lat": 2.298894,
        "lng": 99.931689,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:40:29",
        "lat": 2.298798,
        "lng": 99.932391,
        "speed": 7.0
      },
      {
        "time": "2026-09-08 08:41:32",
        "lat": 2.298779,
        "lng": 99.9324,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:41:40",
        "lat": 2.298779,
        "lng": 99.9324,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:42:05",
        "lat": 2.297793,
        "lng": 99.932356,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:42:25",
        "lat": 2.296336,
        "lng": 99.932302,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 08:42:45",
        "lat": 2.294843,
        "lng": 99.932231,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:43:05",
        "lat": 2.293322,
        "lng": 99.932213,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 08:43:25",
        "lat": 2.291742,
        "lng": 99.93216,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 08:43:45",
        "lat": 2.290223,
        "lng": 99.932142,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:44:06",
        "lat": 2.289668,
        "lng": 99.932142,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:44:25",
        "lat": 2.289992,
        "lng": 99.932133,
        "speed": 18.0
      },
      {
        "time": "2026-09-08 08:44:45",
        "lat": 2.291065,
        "lng": 99.932133,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 08:45:05",
        "lat": 2.292363,
        "lng": 99.93216,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:45:25",
        "lat": 2.293777,
        "lng": 99.932213,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:45:45",
        "lat": 2.29511,
        "lng": 99.93224,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:46:05",
        "lat": 2.296506,
        "lng": 99.932302,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 08:46:25",
        "lat": 2.297842,
        "lng": 99.932373,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 08:46:35",
        "lat": 2.298001,
        "lng": 99.93272,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 08:46:49",
        "lat": 2.298224,
        "lng": 99.933236,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 08:47:04",
        "lat": 2.298788,
        "lng": 99.933093,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 08:47:07",
        "lat": 2.298779,
        "lng": 99.933022,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 08:47:11",
        "lat": 2.298723,
        "lng": 99.933004,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 08:53:35",
        "lat": 2.298753,
        "lng": 99.933022,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:56:45",
        "lat": 2.298788,
        "lng": 99.933022,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 08:58:05",
        "lat": 2.298823,
        "lng": 99.93304,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 08:58:15",
        "lat": 2.29885,
        "lng": 99.933431,
        "speed": 15.0
      },
      {
        "time": "2026-09-08 08:58:35",
        "lat": 2.298933,
        "lng": 99.934524,
        "speed": 18.0
      },
      {
        "time": "2026-09-08 08:58:55",
        "lat": 2.298957,
        "lng": 99.935804,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 08:59:12",
        "lat": 2.29911,
        "lng": 99.936738,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 08:59:25",
        "lat": 2.299927,
        "lng": 99.936756,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 08:59:45",
        "lat": 2.301427,
        "lng": 99.9368,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 09:00:05",
        "lat": 2.302941,
        "lng": 99.936818,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 09:00:25",
        "lat": 2.304468,
        "lng": 99.936853,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 09:00:45",
        "lat": 2.306,
        "lng": 99.936871,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 09:01:05",
        "lat": 2.306771,
        "lng": 99.936996,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 09:01:25",
        "lat": 2.306838,
        "lng": 99.937716,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 09:01:45",
        "lat": 2.306864,
        "lng": 99.938604,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 09:02:15",
        "lat": 2.306793,
        "lng": 99.939182,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 09:02:35",
        "lat": 2.306695,
        "lng": 99.939796,
        "speed": 10.0
      },
      {
        "time": "2026-09-08 09:02:55",
        "lat": 2.306657,
        "lng": 99.940578,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 09:03:05",
        "lat": 2.306604,
        "lng": 99.940889,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 09:03:19",
        "lat": 2.306648,
        "lng": 99.94144,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 09:03:35",
        "lat": 2.306526,
        "lng": 99.941653,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 09:03:55",
        "lat": 2.306569,
        "lng": 99.942516,
        "speed": 15.0
      },
      {
        "time": "2026-09-08 09:04:13",
        "lat": 2.306636,
        "lng": 99.9432,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 09:04:19",
        "lat": 2.306488,
        "lng": 99.943244,
        "speed": 3.0
      },
      {
        "time": "2026-09-08 09:04:35",
        "lat": 2.306499,
        "lng": 99.943751,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 09:04:55",
        "lat": 2.306527,
        "lng": 99.944693,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 09:05:15",
        "lat": 2.306545,
        "lng": 99.945538,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 09:05:35",
        "lat": 2.306471,
        "lng": 99.945964,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 09:05:55",
        "lat": 2.306476,
        "lng": 99.946613,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 09:06:05",
        "lat": 2.30649,
        "lng": 99.947004,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 09:06:24",
        "lat": 2.306346,
        "lng": 99.947476,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 09:06:35",
        "lat": 2.305797,
        "lng": 99.947538,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 09:06:55",
        "lat": 2.304587,
        "lng": 99.947671,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 09:07:15",
        "lat": 2.302945,
        "lng": 99.947796,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 09:07:35",
        "lat": 2.301237,
        "lng": 99.947929,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 09:07:55",
        "lat": 2.299662,
        "lng": 99.948044,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 09:08:03",
        "lat": 2.299465,
        "lng": 99.948071,
        "speed": 1.0
      },
      {
        "time": "2026-09-08 09:08:29",
        "lat": 2.29935,
        "lng": 99.948098,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:20:00",
        "lat": 2.299342,
        "lng": 99.948124,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 09:20:05",
        "lat": 2.299457,
        "lng": 99.948116,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 09:20:15",
        "lat": 2.299579,
        "lng": 99.948311,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 09:20:35",
        "lat": 2.299658,
        "lng": 99.949609,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 09:20:55",
        "lat": 2.299705,
        "lng": 99.951076,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 09:21:15",
        "lat": 2.299738,
        "lng": 99.952702,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 09:21:35",
        "lat": 2.299775,
        "lng": 99.954391,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 09:21:55",
        "lat": 2.299806,
        "lng": 99.956187,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 09:22:15",
        "lat": 2.299833,
        "lng": 99.958027,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 09:22:35",
        "lat": 2.299858,
        "lng": 99.959858,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 09:22:55",
        "lat": 2.299889,
        "lng": 99.961867,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 09:23:15",
        "lat": 2.299932,
        "lng": 99.963884,
        "speed": 40.0
      },
      {
        "time": "2026-09-08 09:23:35",
        "lat": 2.29998,
        "lng": 99.96592,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 09:23:55",
        "lat": 2.300014,
        "lng": 99.967902,
        "speed": 40.0
      },
      {
        "time": "2026-09-08 09:24:12",
        "lat": 2.300016,
        "lng": 99.96896,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 09:26:36",
        "lat": 2.300028,
        "lng": 99.968996,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:26:49",
        "lat": 2.300052,
        "lng": 99.968996,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 09:27:05",
        "lat": 2.300074,
        "lng": 99.96816,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 09:27:25",
        "lat": 2.301457,
        "lng": 99.968151,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 09:27:45",
        "lat": 2.302783,
        "lng": 99.968116,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 09:28:05",
        "lat": 2.304179,
        "lng": 99.968089,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 09:28:25",
        "lat": 2.305704,
        "lng": 99.968062,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 09:28:45",
        "lat": 2.307317,
        "lng": 99.968044,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 09:29:05",
        "lat": 2.308917,
        "lng": 99.968036,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 09:29:25",
        "lat": 2.310561,
        "lng": 99.967991,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 09:29:45",
        "lat": 2.312382,
        "lng": 99.967947,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 09:30:05",
        "lat": 2.314257,
        "lng": 99.96792,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 09:30:25",
        "lat": 2.316094,
        "lng": 99.967876,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 09:30:45",
        "lat": 2.317889,
        "lng": 99.96784,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 09:31:01",
        "lat": 2.318514,
        "lng": 99.967822,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:31:15",
        "lat": 2.318831,
        "lng": 99.967822,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 09:31:25",
        "lat": 2.319148,
        "lng": 99.967707,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 09:31:45",
        "lat": 2.319131,
        "lng": 99.96592,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 09:32:05",
        "lat": 2.319104,
        "lng": 99.963787,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 09:32:25",
        "lat": 2.319069,
        "lng": 99.961653,
        "speed": 45.0
      },
      {
        "time": "2026-09-08 09:32:45",
        "lat": 2.319032,
        "lng": 99.95936,
        "speed": 45.0
      },
      {
        "time": "2026-09-08 09:33:05",
        "lat": 2.318994,
        "lng": 99.957227,
        "speed": 46.0
      },
      {
        "time": "2026-09-08 09:33:19",
        "lat": 2.319064,
        "lng": 99.956249,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 09:33:35",
        "lat": 2.320238,
        "lng": 99.956249,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 09:33:55",
        "lat": 2.322278,
        "lng": 99.956196,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 09:34:15",
        "lat": 2.324442,
        "lng": 99.956169,
        "speed": 42.0
      },
      {
        "time": "2026-09-08 09:34:22",
        "lat": 2.325143,
        "lng": 99.956151,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 09:35:05",
        "lat": 2.325642,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:35:15",
        "lat": 2.325676,
        "lng": 99.956169,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 09:35:26",
        "lat": 2.325916,
        "lng": 99.956169,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 09:43:20",
        "lat": 2.326003,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:44:25",
        "lat": 2.325671,
        "lng": 99.956169,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 09:44:45",
        "lat": 2.324596,
        "lng": 99.956169,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 09:44:52",
        "lat": 2.324121,
        "lng": 99.956169,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 09:45:05",
        "lat": 2.323179,
        "lng": 99.956187,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 09:45:25",
        "lat": 2.321689,
        "lng": 99.956196,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 09:45:45",
        "lat": 2.320139,
        "lng": 99.956231,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 09:46:01",
        "lat": 2.31906,
        "lng": 99.956231,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 09:55:08",
        "lat": 2.318992,
        "lng": 99.956267,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:55:13",
        "lat": 2.318992,
        "lng": 99.956267,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 09:56:00",
        "lat": 2.319074,
        "lng": 99.956249,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 09:56:15",
        "lat": 2.319897,
        "lng": 99.956231,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 09:56:35",
        "lat": 2.321412,
        "lng": 99.956213,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 09:56:55",
        "lat": 2.323007,
        "lng": 99.956187,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 09:57:15",
        "lat": 2.324606,
        "lng": 99.956151,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 09:57:35",
        "lat": 2.325782,
        "lng": 99.956142,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 09:58:27",
        "lat": 2.326003,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 10:39:11",
        "lat": 2.326064,
        "lng": 99.956196,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 11:19:42",
        "lat": 2.325909,
        "lng": 99.956213,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 12:03:40",
        "lat": 2.325908,
        "lng": 99.956196,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 12:38:33",
        "lat": 2.325848,
        "lng": 99.956169,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 12:38:45",
        "lat": 2.325029,
        "lng": 99.956169,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 12:39:05",
        "lat": 2.322869,
        "lng": 99.956187,
        "speed": 47.0
      },
      {
        "time": "2026-09-08 12:39:25",
        "lat": 2.320503,
        "lng": 99.956231,
        "speed": 42.0
      },
      {
        "time": "2026-09-08 12:39:43",
        "lat": 2.318982,
        "lng": 99.956329,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 12:39:55",
        "lat": 2.319017,
        "lng": 99.957289,
        "speed": 40.0
      },
      {
        "time": "2026-09-08 12:40:15",
        "lat": 2.319059,
        "lng": 99.959404,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 12:40:35",
        "lat": 2.319093,
        "lng": 99.961627,
        "speed": 46.0
      },
      {
        "time": "2026-09-08 12:40:55",
        "lat": 2.319135,
        "lng": 99.963911,
        "speed": 45.0
      },
      {
        "time": "2026-09-08 12:41:15",
        "lat": 2.319178,
        "lng": 99.966222,
        "speed": 46.0
      },
      {
        "time": "2026-09-08 12:41:35",
        "lat": 2.319213,
        "lng": 99.968524,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 12:41:55",
        "lat": 2.319245,
        "lng": 99.970604,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 12:42:15",
        "lat": 2.319293,
        "lng": 99.97264,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 12:42:35",
        "lat": 2.319328,
        "lng": 99.97464,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 12:42:55",
        "lat": 2.319363,
        "lng": 99.976302,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 12:43:10",
        "lat": 2.319284,
        "lng": 99.977262,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 12:43:25",
        "lat": 2.318031,
        "lng": 99.97728,
        "speed": 40.0
      },
      {
        "time": "2026-09-08 12:43:45",
        "lat": 2.316041,
        "lng": 99.977342,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 12:44:05",
        "lat": 2.314063,
        "lng": 99.977422,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 12:44:25",
        "lat": 2.312071,
        "lng": 99.977467,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 12:44:45",
        "lat": 2.310294,
        "lng": 99.977538,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 12:45:03",
        "lat": 2.309352,
        "lng": 99.977609,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 12:59:28",
        "lat": 2.309321,
        "lng": 99.977609,
        "speed": 7.0
      },
      {
        "time": "2026-09-08 12:59:42",
        "lat": 2.309964,
        "lng": 99.977556,
        "speed": 24.0
      },
      {
        "time": "2026-09-08 13:00:02",
        "lat": 2.31144,
        "lng": 99.977493,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 13:00:22",
        "lat": 2.312999,
        "lng": 99.97744,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 13:00:42",
        "lat": 2.314656,
        "lng": 99.977396,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 13:01:02",
        "lat": 2.316387,
        "lng": 99.977342,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 13:01:22",
        "lat": 2.318049,
        "lng": 99.97728,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 13:01:41",
        "lat": 2.319371,
        "lng": 99.9772,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 13:01:52",
        "lat": 2.319358,
        "lng": 99.976533,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 13:02:12",
        "lat": 2.319319,
        "lng": 99.974933,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 13:02:32",
        "lat": 2.319292,
        "lng": 99.973271,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 13:02:52",
        "lat": 2.319262,
        "lng": 99.971564,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 13:03:12",
        "lat": 2.319219,
        "lng": 99.96984,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 13:03:32",
        "lat": 2.319193,
        "lng": 99.968062,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 13:03:52",
        "lat": 2.319166,
        "lng": 99.96616,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 13:04:12",
        "lat": 2.319131,
        "lng": 99.964258,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 13:04:32",
        "lat": 2.319097,
        "lng": 99.962302,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 13:04:52",
        "lat": 2.319063,
        "lng": 99.960453,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 13:05:12",
        "lat": 2.319027,
        "lng": 99.958622,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 13:05:32",
        "lat": 2.318999,
        "lng": 99.956702,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 13:05:42",
        "lat": 2.31913,
        "lng": 99.956249,
        "speed": 18.0
      },
      {
        "time": "2026-09-08 13:06:02",
        "lat": 2.320889,
        "lng": 99.956231,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 13:06:22",
        "lat": 2.322759,
        "lng": 99.956187,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 13:06:56",
        "lat": 2.323421,
        "lng": 99.956196,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 13:07:02",
        "lat": 2.323483,
        "lng": 99.956187,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 13:07:22",
        "lat": 2.325201,
        "lng": 99.956169,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 13:07:50",
        "lat": 2.325864,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 13:45:43",
        "lat": 2.325878,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 14:26:17",
        "lat": 2.3259,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:05:08",
        "lat": 2.325816,
        "lng": 99.956187,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 15:05:14",
        "lat": 2.325527,
        "lng": 99.956169,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 15:05:34",
        "lat": 2.323887,
        "lng": 99.956187,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 15:05:54",
        "lat": 2.322346,
        "lng": 99.956213,
        "speed": 29.0
      },
      {
        "time": "2026-09-08 15:06:14",
        "lat": 2.320839,
        "lng": 99.956231,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 15:06:34",
        "lat": 2.319507,
        "lng": 99.956249,
        "speed": 21.0
      },
      {
        "time": "2026-09-08 15:06:48",
        "lat": 2.319031,
        "lng": 99.956471,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 15:07:04",
        "lat": 2.319048,
        "lng": 99.958267,
        "speed": 51.0
      },
      {
        "time": "2026-09-08 15:07:24",
        "lat": 2.319096,
        "lng": 99.961111,
        "speed": 59.0
      },
      {
        "time": "2026-09-08 15:07:44",
        "lat": 2.319141,
        "lng": 99.964027,
        "speed": 56.0
      },
      {
        "time": "2026-09-08 15:08:04",
        "lat": 2.319187,
        "lng": 99.966969,
        "speed": 57.0
      },
      {
        "time": "2026-09-08 15:08:18",
        "lat": 2.318968,
        "lng": 99.96784,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 15:08:34",
        "lat": 2.317152,
        "lng": 99.96784,
        "speed": 56.0
      },
      {
        "time": "2026-09-08 15:08:54",
        "lat": 2.314089,
        "lng": 99.96792,
        "speed": 61.0
      },
      {
        "time": "2026-09-08 15:09:14",
        "lat": 2.310928,
        "lng": 99.967991,
        "speed": 62.0
      },
      {
        "time": "2026-09-08 15:09:34",
        "lat": 2.308887,
        "lng": 99.968018,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 15:09:54",
        "lat": 2.306651,
        "lng": 99.968044,
        "speed": 55.0
      },
      {
        "time": "2026-09-08 15:10:14",
        "lat": 2.303806,
        "lng": 99.968089,
        "speed": 54.0
      },
      {
        "time": "2026-09-08 15:10:30",
        "lat": 2.301856,
        "lng": 99.968116,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 15:10:34",
        "lat": 2.301622,
        "lng": 99.968116,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 15:10:49",
        "lat": 2.300411,
        "lng": 99.968133,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 15:10:55",
        "lat": 2.300086,
        "lng": 99.968151,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 15:11:04",
        "lat": 2.300094,
        "lng": 99.96872,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 15:11:20",
        "lat": 2.300094,
        "lng": 99.96968,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 15:11:24",
        "lat": 2.300067,
        "lng": 99.96984,
        "speed": 15.0
      },
      {
        "time": "2026-09-08 15:11:34",
        "lat": 2.300039,
        "lng": 99.970098,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 15:11:49",
        "lat": 2.300202,
        "lng": 99.970631,
        "speed": 15.0
      },
      {
        "time": "2026-09-08 15:11:53",
        "lat": 2.300365,
        "lng": 99.970631,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 15:12:00",
        "lat": 2.30049,
        "lng": 99.970658,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 15:12:13",
        "lat": 2.300106,
        "lng": 99.970578,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 15:13:04",
        "lat": 2.299967,
        "lng": 99.970036,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 15:13:14",
        "lat": 2.300094,
        "lng": 99.969662,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 15:13:33",
        "lat": 2.29972,
        "lng": 99.969271,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 15:13:44",
        "lat": 2.299329,
        "lng": 99.969369,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 15:13:54",
        "lat": 2.299089,
        "lng": 99.968924,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 15:14:08",
        "lat": 2.299119,
        "lng": 99.968133,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 15:14:24",
        "lat": 2.299729,
        "lng": 99.968133,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 15:14:47",
        "lat": 2.300037,
        "lng": 99.968151,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 15:14:54",
        "lat": 2.300051,
        "lng": 99.968462,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 15:15:38",
        "lat": 2.300049,
        "lng": 99.969173,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:15:44",
        "lat": 2.299889,
        "lng": 99.969191,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 15:15:52",
        "lat": 2.299742,
        "lng": 99.968996,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 15:16:04",
        "lat": 2.299744,
        "lng": 99.968507,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 15:16:14",
        "lat": 2.299843,
        "lng": 99.968151,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 15:16:24",
        "lat": 2.300068,
        "lng": 99.96792,
        "speed": 24.0
      },
      {
        "time": "2026-09-08 15:16:44",
        "lat": 2.300032,
        "lng": 99.966311,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 15:17:04",
        "lat": 2.299992,
        "lng": 99.964471,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 15:17:12",
        "lat": 2.299989,
        "lng": 99.964196,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 15:17:24",
        "lat": 2.30001,
        "lng": 99.964844,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 15:17:44",
        "lat": 2.300046,
        "lng": 99.966969,
        "speed": 47.0
      },
      {
        "time": "2026-09-08 15:18:04",
        "lat": 2.300078,
        "lng": 99.968836,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 15:18:21",
        "lat": 2.300003,
        "lng": 99.969813,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 15:18:27",
        "lat": 2.299992,
        "lng": 99.969813,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:18:58",
        "lat": 2.299991,
        "lng": 99.969813,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:19:40",
        "lat": 2.299994,
        "lng": 99.969813,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:20:07",
        "lat": 2.300097,
        "lng": 99.969769,
        "speed": 19.0
      },
      {
        "time": "2026-09-08 15:20:24",
        "lat": 2.300066,
        "lng": 99.968898,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 15:20:44",
        "lat": 2.300038,
        "lng": 99.967627,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 15:21:04",
        "lat": 2.300006,
        "lng": 99.965964,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 15:21:24",
        "lat": 2.299969,
        "lng": 99.964062,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 15:21:44",
        "lat": 2.299922,
        "lng": 99.962142,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 15:22:04",
        "lat": 2.299887,
        "lng": 99.960133,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 15:22:24",
        "lat": 2.299858,
        "lng": 99.958124,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 15:22:44",
        "lat": 2.299825,
        "lng": 99.956187,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 15:23:04",
        "lat": 2.299782,
        "lng": 99.954258,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 15:23:24",
        "lat": 2.299748,
        "lng": 99.952178,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 15:23:44",
        "lat": 2.299748,
        "lng": 99.950276,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 15:24:04",
        "lat": 2.299606,
        "lng": 99.948231,
        "speed": 39.0
      },
      {
        "time": "2026-09-08 15:24:24",
        "lat": 2.299524,
        "lng": 99.946356,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 15:24:44",
        "lat": 2.299431,
        "lng": 99.94432,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 15:25:04",
        "lat": 2.299338,
        "lng": 99.942187,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 15:25:24",
        "lat": 2.299216,
        "lng": 99.939956,
        "speed": 45.0
      },
      {
        "time": "2026-09-08 15:25:44",
        "lat": 2.299098,
        "lng": 99.93776,
        "speed": 41.0
      },
      {
        "time": "2026-09-08 15:26:04",
        "lat": 2.298986,
        "lng": 99.935591,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 15:26:24",
        "lat": 2.298912,
        "lng": 99.93392,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 15:26:44",
        "lat": 2.298869,
        "lng": 99.932533,
        "speed": 18.0
      },
      {
        "time": "2026-09-08 15:27:04",
        "lat": 2.298919,
        "lng": 99.930693,
        "speed": 46.0
      },
      {
        "time": "2026-09-08 15:27:24",
        "lat": 2.298998,
        "lng": 99.928293,
        "speed": 43.0
      },
      {
        "time": "2026-09-08 15:27:44",
        "lat": 2.29897,
        "lng": 99.926124,
        "speed": 42.0
      },
      {
        "time": "2026-09-08 15:28:04",
        "lat": 2.298946,
        "lng": 99.924071,
        "speed": 38.0
      },
      {
        "time": "2026-09-08 15:28:24",
        "lat": 2.298896,
        "lng": 99.922151,
        "speed": 42.0
      },
      {
        "time": "2026-09-08 15:28:44",
        "lat": 2.298842,
        "lng": 99.919822,
        "speed": 51.0
      },
      {
        "time": "2026-09-08 15:29:04",
        "lat": 2.298814,
        "lng": 99.917209,
        "speed": 50.0
      },
      {
        "time": "2026-09-08 15:29:24",
        "lat": 2.298743,
        "lng": 99.914533,
        "speed": 54.0
      },
      {
        "time": "2026-09-08 15:29:44",
        "lat": 2.298699,
        "lng": 99.911867,
        "speed": 54.0
      },
      {
        "time": "2026-09-08 15:30:04",
        "lat": 2.298563,
        "lng": 99.909698,
        "speed": 22.0
      },
      {
        "time": "2026-09-08 15:30:06",
        "lat": 2.298574,
        "lng": 99.909564,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 15:30:26",
        "lat": 2.298721,
        "lng": 99.909404,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 15:30:34",
        "lat": 2.29879,
        "lng": 99.909351,
        "speed": 10.0
      },
      {
        "time": "2026-09-08 15:31:03",
        "lat": 2.298816,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 17:00:05",
        "lat": 2.29937,
        "lng": 99.909458,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 17:00:13",
        "lat": 2.299725,
        "lng": 99.909467,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 17:00:23",
        "lat": 2.300059,
        "lng": 99.909636,
        "speed": 16.0
      },
      {
        "time": "2026-09-08 17:00:35",
        "lat": 2.300348,
        "lng": 99.910044,
        "speed": 17.0
      },
      {
        "time": "2026-09-08 17:01:06",
        "lat": 2.300534,
        "lng": 99.91032,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 17:02:21",
        "lat": 2.30055,
        "lng": 99.910329,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 17:02:34",
        "lat": 2.300496,
        "lng": 99.91024,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 17:02:45",
        "lat": 2.300182,
        "lng": 99.909831,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 17:02:51",
        "lat": 2.300093,
        "lng": 99.909618,
        "speed": 7.0
      },
      {
        "time": "2026-09-08 17:03:32",
        "lat": 2.29986,
        "lng": 99.909511,
        "speed": 4.0
      },
      {
        "time": "2026-09-08 17:03:50",
        "lat": 2.299847,
        "lng": 99.909493,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 17:04:25",
        "lat": 2.29969,
        "lng": 99.909493,
        "speed": 13.0
      },
      {
        "time": "2026-09-08 17:04:45",
        "lat": 2.299153,
        "lng": 99.909538,
        "speed": 9.0
      },
      {
        "time": "2026-09-08 17:05:55",
        "lat": 2.298623,
        "lng": 99.909813,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 17:06:15",
        "lat": 2.298765,
        "lng": 99.909378,
        "speed": 10.0
      },
      {
        "time": "2026-09-08 17:06:44",
        "lat": 2.298824,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 21:58:47",
        "lat": 2.298783,
        "lng": 99.909582,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 21:59:10",
        "lat": 2.298803,
        "lng": 99.909636,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 21:59:24",
        "lat": 2.298729,
        "lng": 99.909947,
        "speed": 12.0
      },
      {
        "time": "2026-09-08 21:59:27",
        "lat": 2.298734,
        "lng": 99.910071,
        "speed": 11.0
      },
      {
        "time": "2026-09-08 21:59:56",
        "lat": 2.298678,
        "lng": 99.910747,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 22:00:16",
        "lat": 2.298677,
        "lng": 99.911911,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 22:00:36",
        "lat": 2.298687,
        "lng": 99.9132,
        "speed": 24.0
      },
      {
        "time": "2026-09-08 22:00:56",
        "lat": 2.298709,
        "lng": 99.914418,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 22:01:16",
        "lat": 2.298719,
        "lng": 99.91576,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:01:36",
        "lat": 2.298751,
        "lng": 99.917156,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:01:46",
        "lat": 2.298778,
        "lng": 99.917822,
        "speed": 25.0
      },
      {
        "time": "2026-09-08 22:01:57",
        "lat": 2.298797,
        "lng": 99.918542,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 22:02:06",
        "lat": 2.298812,
        "lng": 99.919147,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 22:02:16",
        "lat": 2.298823,
        "lng": 99.919804,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:02:25",
        "lat": 2.298832,
        "lng": 99.920409,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:02:36",
        "lat": 2.298862,
        "lng": 99.921173,
        "speed": 26.0
      },
      {
        "time": "2026-09-08 22:02:42",
        "lat": 2.298862,
        "lng": 99.921582,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:02:49",
        "lat": 2.298881,
        "lng": 99.922071,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:03:00",
        "lat": 2.298901,
        "lng": 99.922818,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:03:06",
        "lat": 2.298907,
        "lng": 99.923244,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:03:26",
        "lat": 2.298937,
        "lng": 99.924604,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:03:46",
        "lat": 2.298948,
        "lng": 99.926027,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:04:06",
        "lat": 2.298973,
        "lng": 99.927458,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:04:26",
        "lat": 2.299002,
        "lng": 99.928889,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:04:36",
        "lat": 2.298962,
        "lng": 99.9296,
        "speed": 27.0
      },
      {
        "time": "2026-09-08 22:04:56",
        "lat": 2.298883,
        "lng": 99.93104,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:05:06",
        "lat": 2.298861,
        "lng": 99.931742,
        "speed": 28.0
      },
      {
        "time": "2026-09-08 22:05:16",
        "lat": 2.298856,
        "lng": 99.932391,
        "speed": 20.0
      },
      {
        "time": "2026-09-08 22:05:20",
        "lat": 2.298836,
        "lng": 99.932516,
        "speed": 6.0
      },
      {
        "time": "2026-09-08 22:05:26",
        "lat": 2.298812,
        "lng": 99.932507,
        "speed": 8.0
      },
      {
        "time": "2026-09-08 22:06:48",
        "lat": 2.298807,
        "lng": 99.932489,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 22:07:16",
        "lat": 2.298837,
        "lng": 99.93312,
        "speed": 23.0
      },
      {
        "time": "2026-09-08 22:07:36",
        "lat": 2.298937,
        "lng": 99.934373,
        "speed": 24.0
      },
      {
        "time": "2026-09-08 22:07:56",
        "lat": 2.298964,
        "lng": 99.935778,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 22:08:16",
        "lat": 2.299049,
        "lng": 99.937369,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 22:08:36",
        "lat": 2.29912,
        "lng": 99.939093,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 22:08:56",
        "lat": 2.299219,
        "lng": 99.940747,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 22:09:16",
        "lat": 2.299296,
        "lng": 99.942302,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 22:09:36",
        "lat": 2.299356,
        "lng": 99.943876,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 22:09:56",
        "lat": 2.299441,
        "lng": 99.945476,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 22:10:16",
        "lat": 2.299501,
        "lng": 99.947067,
        "speed": 30.0
      },
      {
        "time": "2026-09-08 22:10:36",
        "lat": 2.299621,
        "lng": 99.948604,
        "speed": 31.0
      },
      {
        "time": "2026-09-08 22:10:56",
        "lat": 2.299729,
        "lng": 99.950196,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 22:11:16",
        "lat": 2.299729,
        "lng": 99.951822,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 22:11:36",
        "lat": 2.299761,
        "lng": 99.953467,
        "speed": 32.0
      },
      {
        "time": "2026-09-08 22:11:56",
        "lat": 2.299781,
        "lng": 99.95512,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 22:12:16",
        "lat": 2.29986,
        "lng": 99.956471,
        "speed": 14.0
      },
      {
        "time": "2026-09-08 22:12:36",
        "lat": 2.301289,
        "lng": 99.956462,
        "speed": 33.0
      },
      {
        "time": "2026-09-08 22:12:56",
        "lat": 2.303131,
        "lng": 99.956462,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 22:13:16",
        "lat": 2.305036,
        "lng": 99.956444,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 22:13:36",
        "lat": 2.30687,
        "lng": 99.956427,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 22:13:56",
        "lat": 2.308679,
        "lng": 99.956409,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 22:14:16",
        "lat": 2.31039,
        "lng": 99.956382,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 22:14:36",
        "lat": 2.312253,
        "lng": 99.956364,
        "speed": 37.0
      },
      {
        "time": "2026-09-08 22:14:56",
        "lat": 2.314091,
        "lng": 99.956329,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 22:15:16",
        "lat": 2.315895,
        "lng": 99.956311,
        "speed": 36.0
      },
      {
        "time": "2026-09-08 22:15:36",
        "lat": 2.317723,
        "lng": 99.956284,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 22:15:56",
        "lat": 2.319561,
        "lng": 99.956249,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 22:16:16",
        "lat": 2.321363,
        "lng": 99.956231,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 22:16:36",
        "lat": 2.323144,
        "lng": 99.956196,
        "speed": 34.0
      },
      {
        "time": "2026-09-08 22:16:56",
        "lat": 2.324937,
        "lng": 99.956187,
        "speed": 35.0
      },
      {
        "time": "2026-09-08 22:17:21",
        "lat": 2.326003,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-08 22:17:51",
        "lat": 2.325998,
        "lng": 99.956151,
        "speed": 0.0
      }
    ]
  },
  "2026-09-09__V-PHH-01": {
    "date": "2026-09-09",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-09 05:09:21",
        "lat": 2.325998,
        "lng": 99.956151,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:14:21",
        "lat": 2.325998,
        "lng": 99.956151,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:19:22",
        "lat": 2.325998,
        "lng": 99.956151,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:24:23",
        "lat": 2.325998,
        "lng": 99.956151,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:39:53",
        "lat": 2.325909,
        "lng": 99.957102,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:39:58",
        "lat": 2.325909,
        "lng": 99.957102,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:40:25",
        "lat": 2.325917,
        "lng": 99.957191,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:46:50",
        "lat": 2.325944,
        "lng": 99.957262,
        "speed": 4.0
      },
      {
        "time": "2026-09-09 05:47:01",
        "lat": 2.325932,
        "lng": 99.957307,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 05:47:10",
        "lat": 2.325932,
        "lng": 99.957191,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 05:47:14",
        "lat": 2.325926,
        "lng": 99.957129,
        "speed": 8.0
      },
      {
        "time": "2026-09-09 05:47:15",
        "lat": 2.325926,
        "lng": 99.957102,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 05:47:24",
        "lat": 2.325937,
        "lng": 99.956853,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 05:47:34",
        "lat": 2.325939,
        "lng": 99.956542,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 05:47:44",
        "lat": 2.325932,
        "lng": 99.956231,
        "speed": 8.0
      },
      {
        "time": "2026-09-09 05:47:50",
        "lat": 2.326008,
        "lng": 99.956187,
        "speed": 5.0
      },
      {
        "time": "2026-09-09 05:48:12",
        "lat": 2.326032,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 06:26:12",
        "lat": 2.325982,
        "lng": 99.956187,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 06:26:22",
        "lat": 2.325658,
        "lng": 99.956151,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 06:26:32",
        "lat": 2.324963,
        "lng": 99.956169,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 06:26:42",
        "lat": 2.32415,
        "lng": 99.956187,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 06:26:52",
        "lat": 2.323309,
        "lng": 99.956196,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 06:27:02",
        "lat": 2.322398,
        "lng": 99.956213,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 06:27:12",
        "lat": 2.321447,
        "lng": 99.956213,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 06:27:22",
        "lat": 2.320588,
        "lng": 99.956249,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 06:27:32",
        "lat": 2.319838,
        "lng": 99.956231,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 06:27:42",
        "lat": 2.319057,
        "lng": 99.956249,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 06:27:46",
        "lat": 2.318988,
        "lng": 99.956347,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 06:27:52",
        "lat": 2.319005,
        "lng": 99.956702,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 06:28:02",
        "lat": 2.319013,
        "lng": 99.9576,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 06:28:12",
        "lat": 2.319031,
        "lng": 99.958658,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 06:28:22",
        "lat": 2.319057,
        "lng": 99.959716,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 06:28:32",
        "lat": 2.319074,
        "lng": 99.960809,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 06:28:42",
        "lat": 2.319093,
        "lng": 99.961902,
        "speed": 44.0
      },
      {
        "time": "2026-09-09 06:28:52",
        "lat": 2.319113,
        "lng": 99.963004,
        "speed": 45.0
      },
      {
        "time": "2026-09-09 06:29:02",
        "lat": 2.319128,
        "lng": 99.964116,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 06:29:12",
        "lat": 2.319141,
        "lng": 99.9652,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 06:29:22",
        "lat": 2.319164,
        "lng": 99.966267,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 06:29:32",
        "lat": 2.319179,
        "lng": 99.967351,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 06:29:41",
        "lat": 2.319106,
        "lng": 99.967858,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 06:29:42",
        "lat": 2.319054,
        "lng": 99.967858,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 06:29:52",
        "lat": 2.318132,
        "lng": 99.96784,
        "speed": 47.0
      },
      {
        "time": "2026-09-09 06:30:02",
        "lat": 2.316935,
        "lng": 99.967858,
        "speed": 49.0
      },
      {
        "time": "2026-09-09 06:30:12",
        "lat": 2.315708,
        "lng": 99.967884,
        "speed": 48.0
      },
      {
        "time": "2026-09-09 06:30:22",
        "lat": 2.314502,
        "lng": 99.96792,
        "speed": 47.0
      },
      {
        "time": "2026-09-09 06:30:32",
        "lat": 2.313326,
        "lng": 99.967938,
        "speed": 46.0
      },
      {
        "time": "2026-09-09 06:30:42",
        "lat": 2.312159,
        "lng": 99.967973,
        "speed": 44.0
      },
      {
        "time": "2026-09-09 06:30:52",
        "lat": 2.310991,
        "lng": 99.967991,
        "speed": 46.0
      },
      {
        "time": "2026-09-09 06:31:02",
        "lat": 2.310043,
        "lng": 99.968,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 06:31:12",
        "lat": 2.309113,
        "lng": 99.968018,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 06:31:22",
        "lat": 2.308479,
        "lng": 99.968036,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 06:31:32",
        "lat": 2.307488,
        "lng": 99.968036,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 06:31:42",
        "lat": 2.306447,
        "lng": 99.968044,
        "speed": 42.0
      },
      {
        "time": "2026-09-09 06:31:52",
        "lat": 2.305399,
        "lng": 99.968044,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 06:32:02",
        "lat": 2.304327,
        "lng": 99.968089,
        "speed": 42.0
      },
      {
        "time": "2026-09-09 06:32:12",
        "lat": 2.303249,
        "lng": 99.968098,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 06:32:22",
        "lat": 2.302187,
        "lng": 99.968116,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 06:32:32",
        "lat": 2.301099,
        "lng": 99.968116,
        "speed": 42.0
      },
      {
        "time": "2026-09-09 06:32:42",
        "lat": 2.30021,
        "lng": 99.968133,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 06:32:52",
        "lat": 2.299793,
        "lng": 99.968133,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 06:32:56",
        "lat": 2.29969,
        "lng": 99.968231,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 06:33:02",
        "lat": 2.299706,
        "lng": 99.968551,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 06:33:09",
        "lat": 2.299613,
        "lng": 99.968702,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 06:33:12",
        "lat": 2.299551,
        "lng": 99.96872,
        "speed": 7.0
      },
      {
        "time": "2026-09-09 06:33:18",
        "lat": 2.299553,
        "lng": 99.968836,
        "speed": 5.0
      },
      {
        "time": "2026-09-09 06:33:40",
        "lat": 2.299559,
        "lng": 99.968862,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 07:03:20",
        "lat": 2.299586,
        "lng": 99.96896,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 07:03:30",
        "lat": 2.299672,
        "lng": 99.968818,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 07:03:40",
        "lat": 2.299671,
        "lng": 99.968462,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 07:03:48",
        "lat": 2.299756,
        "lng": 99.968231,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 07:03:50",
        "lat": 2.299831,
        "lng": 99.968231,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 07:03:57",
        "lat": 2.300028,
        "lng": 99.968133,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 07:04:00",
        "lat": 2.30003,
        "lng": 99.967991,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 07:04:10",
        "lat": 2.300023,
        "lng": 99.967333,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 07:04:20",
        "lat": 2.300005,
        "lng": 99.966569,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 07:04:30",
        "lat": 2.299995,
        "lng": 99.965733,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 07:04:40",
        "lat": 2.299976,
        "lng": 99.964871,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:04:50",
        "lat": 2.299948,
        "lng": 99.964,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:05:00",
        "lat": 2.299934,
        "lng": 99.963067,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:05:10",
        "lat": 2.299915,
        "lng": 99.96216,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:05:20",
        "lat": 2.299892,
        "lng": 99.9612,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:05:30",
        "lat": 2.299872,
        "lng": 99.96024,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:05:40",
        "lat": 2.299854,
        "lng": 99.959271,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:05:50",
        "lat": 2.299836,
        "lng": 99.958338,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 07:06:00",
        "lat": 2.299828,
        "lng": 99.957404,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:06:10",
        "lat": 2.299816,
        "lng": 99.956444,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:06:20",
        "lat": 2.299804,
        "lng": 99.95552,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:06:30",
        "lat": 2.299778,
        "lng": 99.95456,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:06:40",
        "lat": 2.299764,
        "lng": 99.953609,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:06:50",
        "lat": 2.299736,
        "lng": 99.952649,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:07:00",
        "lat": 2.299722,
        "lng": 99.951707,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:07:10",
        "lat": 2.299741,
        "lng": 99.950782,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 07:07:20",
        "lat": 2.299719,
        "lng": 99.949902,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:07:30",
        "lat": 2.299647,
        "lng": 99.94896,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:07:40",
        "lat": 2.299584,
        "lng": 99.947982,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:07:50",
        "lat": 2.299514,
        "lng": 99.947049,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 07:08:00",
        "lat": 2.299477,
        "lng": 99.946124,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:08:10",
        "lat": 2.299444,
        "lng": 99.945182,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:08:20",
        "lat": 2.299395,
        "lng": 99.944222,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:08:30",
        "lat": 2.299352,
        "lng": 99.943271,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:08:40",
        "lat": 2.299306,
        "lng": 99.942338,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:08:50",
        "lat": 2.299266,
        "lng": 99.94136,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:09:00",
        "lat": 2.299205,
        "lng": 99.940364,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:09:10",
        "lat": 2.299149,
        "lng": 99.939369,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:09:20",
        "lat": 2.299096,
        "lng": 99.938391,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:09:30",
        "lat": 2.29906,
        "lng": 99.937511,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 07:09:40",
        "lat": 2.29903,
        "lng": 99.936596,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:09:50",
        "lat": 2.298961,
        "lng": 99.935627,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:10:00",
        "lat": 2.298954,
        "lng": 99.934711,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 07:10:10",
        "lat": 2.298925,
        "lng": 99.934284,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 07:10:20",
        "lat": 2.298872,
        "lng": 99.933689,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 07:10:30",
        "lat": 2.298853,
        "lng": 99.933173,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 07:10:40",
        "lat": 2.298861,
        "lng": 99.932551,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 07:10:50",
        "lat": 2.298863,
        "lng": 99.931964,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 07:11:00",
        "lat": 2.298892,
        "lng": 99.93112,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 07:11:10",
        "lat": 2.298946,
        "lng": 99.930204,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 07:11:20",
        "lat": 2.298991,
        "lng": 99.929316,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:11:30",
        "lat": 2.299013,
        "lng": 99.928356,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 07:11:40",
        "lat": 2.298991,
        "lng": 99.927404,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:11:50",
        "lat": 2.298982,
        "lng": 99.92648,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:12:00",
        "lat": 2.298972,
        "lng": 99.925556,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 07:12:10",
        "lat": 2.29895,
        "lng": 99.924604,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:12:20",
        "lat": 2.298942,
        "lng": 99.92368,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:12:30",
        "lat": 2.298914,
        "lng": 99.922738,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:12:40",
        "lat": 2.298884,
        "lng": 99.921804,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:12:50",
        "lat": 2.298863,
        "lng": 99.920853,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:13:00",
        "lat": 2.298848,
        "lng": 99.91992,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:13:10",
        "lat": 2.298828,
        "lng": 99.91896,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:13:20",
        "lat": 2.298814,
        "lng": 99.918018,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:13:30",
        "lat": 2.298797,
        "lng": 99.917058,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:13:40",
        "lat": 2.298784,
        "lng": 99.91608,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:13:50",
        "lat": 2.298752,
        "lng": 99.915084,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 07:14:00",
        "lat": 2.298737,
        "lng": 99.914107,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 07:14:10",
        "lat": 2.298721,
        "lng": 99.913156,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:14:20",
        "lat": 2.298703,
        "lng": 99.91232,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 07:14:30",
        "lat": 2.298701,
        "lng": 99.911404,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 07:14:40",
        "lat": 2.298652,
        "lng": 99.91048,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 07:14:50",
        "lat": 2.298573,
        "lng": 99.909796,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 07:15:00",
        "lat": 2.298642,
        "lng": 99.909404,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 07:15:02",
        "lat": 2.298707,
        "lng": 99.909396,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 07:15:07",
        "lat": 2.298763,
        "lng": 99.909342,
        "speed": 1.0
      },
      {
        "time": "2026-09-09 07:15:19",
        "lat": 2.298786,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 07:15:36",
        "lat": 2.298783,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:06:36",
        "lat": 2.298783,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:09:48",
        "lat": 2.298711,
        "lng": 99.910649,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 14:09:58",
        "lat": 2.298717,
        "lng": 99.911004,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 14:10:08",
        "lat": 2.298728,
        "lng": 99.911422,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 14:10:18",
        "lat": 2.29873,
        "lng": 99.911867,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 14:10:28",
        "lat": 2.298738,
        "lng": 99.912364,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 14:10:38",
        "lat": 2.298753,
        "lng": 99.912924,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 14:10:48",
        "lat": 2.298759,
        "lng": 99.913458,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 14:10:58",
        "lat": 2.298768,
        "lng": 99.913947,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 14:11:08",
        "lat": 2.298782,
        "lng": 99.91448,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:11:18",
        "lat": 2.298793,
        "lng": 99.915058,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:11:28",
        "lat": 2.298798,
        "lng": 99.915627,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 14:11:36",
        "lat": 2.298783,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:11:38",
        "lat": 2.298812,
        "lng": 99.916213,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 14:11:48",
        "lat": 2.298822,
        "lng": 99.916836,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 14:11:58",
        "lat": 2.298836,
        "lng": 99.917449,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 14:12:08",
        "lat": 2.298853,
        "lng": 99.918098,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:12:18",
        "lat": 2.298867,
        "lng": 99.918773,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:12:28",
        "lat": 2.298887,
        "lng": 99.919449,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:12:38",
        "lat": 2.298899,
        "lng": 99.920124,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 14:12:48",
        "lat": 2.298911,
        "lng": 99.9208,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:12:58",
        "lat": 2.298923,
        "lng": 99.921502,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:13:08",
        "lat": 2.298936,
        "lng": 99.922169,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:13:18",
        "lat": 2.298956,
        "lng": 99.922782,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:13:28",
        "lat": 2.298971,
        "lng": 99.92344,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:13:38",
        "lat": 2.298993,
        "lng": 99.924107,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 14:13:48",
        "lat": 2.299,
        "lng": 99.924773,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 14:13:58",
        "lat": 2.29901,
        "lng": 99.92544,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 14:14:08",
        "lat": 2.299017,
        "lng": 99.926142,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:14:18",
        "lat": 2.299023,
        "lng": 99.926844,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:14:28",
        "lat": 2.299033,
        "lng": 99.927573,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:14:38",
        "lat": 2.299051,
        "lng": 99.92832,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:14:48",
        "lat": 2.299046,
        "lng": 99.929084,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:14:58",
        "lat": 2.298999,
        "lng": 99.929831,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:15:08",
        "lat": 2.298957,
        "lng": 99.930596,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:15:18",
        "lat": 2.298927,
        "lng": 99.931369,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:15:28",
        "lat": 2.298913,
        "lng": 99.932098,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:15:36",
        "lat": 2.298782,
        "lng": 99.9324,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 14:15:38",
        "lat": 2.298671,
        "lng": 99.932391,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 14:15:48",
        "lat": 2.298136,
        "lng": 99.932356,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 14:15:52",
        "lat": 2.29808,
        "lng": 99.932507,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 14:15:58",
        "lat": 2.298091,
        "lng": 99.932818,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:16:08",
        "lat": 2.298162,
        "lng": 99.933191,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 14:16:12",
        "lat": 2.298314,
        "lng": 99.933253,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 14:16:18",
        "lat": 2.298472,
        "lng": 99.933333,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 14:16:27",
        "lat": 2.298504,
        "lng": 99.933511,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:16:37",
        "lat": 2.298783,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:16:46",
        "lat": 2.298506,
        "lng": 99.933511,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:20:22",
        "lat": 2.298496,
        "lng": 99.933467,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 14:20:25",
        "lat": 2.298485,
        "lng": 99.933378,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 14:20:31",
        "lat": 2.298591,
        "lng": 99.933253,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 14:20:35",
        "lat": 2.298732,
        "lng": 99.933218,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 14:20:42",
        "lat": 2.298868,
        "lng": 99.933316,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 14:20:45",
        "lat": 2.298887,
        "lng": 99.933431,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 14:20:55",
        "lat": 2.298924,
        "lng": 99.933982,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 14:21:05",
        "lat": 2.29898,
        "lng": 99.934551,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 14:21:15",
        "lat": 2.299004,
        "lng": 99.935156,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:21:25",
        "lat": 2.299004,
        "lng": 99.935858,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:21:35",
        "lat": 2.299058,
        "lng": 99.936596,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:21:39",
        "lat": 2.298783,
        "lng": 99.909342,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 14:21:45",
        "lat": 2.299091,
        "lng": 99.937342,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:21:55",
        "lat": 2.29912,
        "lng": 99.938089,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:22:05",
        "lat": 2.299149,
        "lng": 99.938836,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:22:15",
        "lat": 2.299196,
        "lng": 99.9396,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:22:25",
        "lat": 2.299248,
        "lng": 99.940364,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:22:35",
        "lat": 2.299288,
        "lng": 99.941129,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:22:45",
        "lat": 2.299326,
        "lng": 99.941911,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:22:55",
        "lat": 2.299362,
        "lng": 99.942693,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:23:05",
        "lat": 2.299393,
        "lng": 99.94344,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:23:15",
        "lat": 2.299423,
        "lng": 99.944187,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:23:25",
        "lat": 2.299468,
        "lng": 99.944942,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:23:35",
        "lat": 2.299505,
        "lng": 99.945716,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:23:45",
        "lat": 2.299534,
        "lng": 99.946453,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:23:55",
        "lat": 2.29957,
        "lng": 99.947236,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:24:05",
        "lat": 2.299632,
        "lng": 99.948,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:24:15",
        "lat": 2.299687,
        "lng": 99.9488,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 14:24:25",
        "lat": 2.299738,
        "lng": 99.949609,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 14:24:35",
        "lat": 2.299785,
        "lng": 99.950356,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 14:24:45",
        "lat": 2.299849,
        "lng": 99.9508,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 14:24:55",
        "lat": 2.300461,
        "lng": 99.950827,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 14:25:05",
        "lat": 2.301242,
        "lng": 99.950898,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 14:25:15",
        "lat": 2.302035,
        "lng": 99.951013,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 14:25:25",
        "lat": 2.302832,
        "lng": 99.951084,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:25:35",
        "lat": 2.303599,
        "lng": 99.951156,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:25:45",
        "lat": 2.304369,
        "lng": 99.951218,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:25:55",
        "lat": 2.305163,
        "lng": 99.951271,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:26:05",
        "lat": 2.305936,
        "lng": 99.951333,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:26:15",
        "lat": 2.306385,
        "lng": 99.951511,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 14:26:25",
        "lat": 2.306377,
        "lng": 99.952151,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:26:35",
        "lat": 2.306364,
        "lng": 99.952853,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:26:45",
        "lat": 2.306343,
        "lng": 99.953502,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 14:26:55",
        "lat": 2.306294,
        "lng": 99.954151,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:27:05",
        "lat": 2.306252,
        "lng": 99.954836,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 14:27:10",
        "lat": 2.306361,
        "lng": 99.955049,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 14:27:15",
        "lat": 2.306634,
        "lng": 99.955067,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 14:27:25",
        "lat": 2.307296,
        "lng": 99.955049,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 14:27:35",
        "lat": 2.308013,
        "lng": 99.955013,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 14:27:45",
        "lat": 2.308637,
        "lng": 99.954978,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 14:27:52",
        "lat": 2.308874,
        "lng": 99.955067,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 14:27:55",
        "lat": 2.308909,
        "lng": 99.955173,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 14:28:05",
        "lat": 2.308908,
        "lng": 99.955778,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 14:28:15",
        "lat": 2.308906,
        "lng": 99.956311,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 14:28:19",
        "lat": 2.309036,
        "lng": 99.956364,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:28:25",
        "lat": 2.309442,
        "lng": 99.956364,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 14:28:35",
        "lat": 2.310216,
        "lng": 99.956347,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 14:28:55",
        "lat": 2.310382,
        "lng": 99.956347,
        "speed": 8.0
      },
      {
        "time": "2026-09-09 14:29:05",
        "lat": 2.310939,
        "lng": 99.956347,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:29:15",
        "lat": 2.311811,
        "lng": 99.956347,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 14:29:25",
        "lat": 2.312754,
        "lng": 99.956329,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 14:29:35",
        "lat": 2.313809,
        "lng": 99.956329,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:29:45",
        "lat": 2.314925,
        "lng": 99.956311,
        "speed": 44.0
      },
      {
        "time": "2026-09-09 14:29:55",
        "lat": 2.316032,
        "lng": 99.956302,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:30:05",
        "lat": 2.317092,
        "lng": 99.956284,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:30:15",
        "lat": 2.318164,
        "lng": 99.956267,
        "speed": 42.0
      },
      {
        "time": "2026-09-09 14:30:25",
        "lat": 2.319208,
        "lng": 99.956249,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 14:30:35",
        "lat": 2.320292,
        "lng": 99.956231,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:30:45",
        "lat": 2.321387,
        "lng": 99.956213,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:30:55",
        "lat": 2.322469,
        "lng": 99.956196,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:31:05",
        "lat": 2.32353,
        "lng": 99.956187,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 14:31:15",
        "lat": 2.324569,
        "lng": 99.956187,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 14:31:25",
        "lat": 2.325551,
        "lng": 99.956169,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 14:31:36",
        "lat": 2.326036,
        "lng": 99.956169,
        "speed": 4.0
      },
      {
        "time": "2026-09-09 14:31:58",
        "lat": 2.326047,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 15:09:49",
        "lat": 2.326061,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:26:30",
        "lat": 2.326044,
        "lng": 99.956187,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:27:33",
        "lat": 2.326039,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:28:03",
        "lat": 2.325827,
        "lng": 99.956151,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 16:28:06",
        "lat": 2.325712,
        "lng": 99.956151,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 16:28:16",
        "lat": 2.325122,
        "lng": 99.956151,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 16:28:26",
        "lat": 2.324311,
        "lng": 99.956187,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 16:28:36",
        "lat": 2.323336,
        "lng": 99.956187,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 16:28:46",
        "lat": 2.322335,
        "lng": 99.956196,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 16:28:56",
        "lat": 2.321334,
        "lng": 99.956213,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 16:29:06",
        "lat": 2.320309,
        "lng": 99.956231,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 16:29:16",
        "lat": 2.319366,
        "lng": 99.956231,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 16:29:25",
        "lat": 2.318988,
        "lng": 99.956311,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 16:29:26",
        "lat": 2.318991,
        "lng": 99.956364,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:29:36",
        "lat": 2.319013,
        "lng": 99.957147,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 16:29:46",
        "lat": 2.319023,
        "lng": 99.958124,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 16:29:56",
        "lat": 2.319045,
        "lng": 99.959147,
        "speed": 42.0
      },
      {
        "time": "2026-09-09 16:30:06",
        "lat": 2.319058,
        "lng": 99.960222,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 16:30:16",
        "lat": 2.319076,
        "lng": 99.961324,
        "speed": 46.0
      },
      {
        "time": "2026-09-09 16:30:26",
        "lat": 2.319103,
        "lng": 99.962649,
        "speed": 52.0
      },
      {
        "time": "2026-09-09 16:30:36",
        "lat": 2.319122,
        "lng": 99.963884,
        "speed": 51.0
      },
      {
        "time": "2026-09-09 16:30:46",
        "lat": 2.319141,
        "lng": 99.965218,
        "speed": 53.0
      },
      {
        "time": "2026-09-09 16:30:56",
        "lat": 2.319169,
        "lng": 99.966569,
        "speed": 53.0
      },
      {
        "time": "2026-09-09 16:31:06",
        "lat": 2.319189,
        "lng": 99.96784,
        "speed": 47.0
      },
      {
        "time": "2026-09-09 16:31:16",
        "lat": 2.319206,
        "lng": 99.969076,
        "speed": 50.0
      },
      {
        "time": "2026-09-09 16:31:26",
        "lat": 2.319233,
        "lng": 99.970258,
        "speed": 43.0
      },
      {
        "time": "2026-09-09 16:31:36",
        "lat": 2.319253,
        "lng": 99.971351,
        "speed": 45.0
      },
      {
        "time": "2026-09-09 16:31:46",
        "lat": 2.319283,
        "lng": 99.972444,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 16:31:56",
        "lat": 2.319291,
        "lng": 99.973076,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 16:32:06",
        "lat": 2.319302,
        "lng": 99.97368,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:32:16",
        "lat": 2.319313,
        "lng": 99.974293,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 16:32:26",
        "lat": 2.319317,
        "lng": 99.974871,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 16:32:35",
        "lat": 2.319429,
        "lng": 99.975147,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 16:32:36",
        "lat": 2.319469,
        "lng": 99.975147,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 16:32:46",
        "lat": 2.320026,
        "lng": 99.975111,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:32:56",
        "lat": 2.320705,
        "lng": 99.975093,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 16:33:06",
        "lat": 2.321429,
        "lng": 99.975084,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 16:33:22",
        "lat": 2.321804,
        "lng": 99.975084,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 16:33:26",
        "lat": 2.321649,
        "lng": 99.975084,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 16:34:06",
        "lat": 2.321581,
        "lng": 99.975084,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 16:34:16",
        "lat": 2.322026,
        "lng": 99.975067,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:34:26",
        "lat": 2.322653,
        "lng": 99.975049,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 16:34:36",
        "lat": 2.323394,
        "lng": 99.975049,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 16:34:46",
        "lat": 2.324172,
        "lng": 99.975031,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 16:34:56",
        "lat": 2.324944,
        "lng": 99.975013,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 16:35:06",
        "lat": 2.325448,
        "lng": 99.974996,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 16:35:13",
        "lat": 2.325709,
        "lng": 99.974996,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 16:35:31",
        "lat": 2.325776,
        "lng": 99.975013,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:42:13",
        "lat": 2.325891,
        "lng": 99.975013,
        "speed": 5.0
      },
      {
        "time": "2026-09-09 16:42:16",
        "lat": 2.325901,
        "lng": 99.974996,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:42:19",
        "lat": 2.3259,
        "lng": 99.974996,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:43:36",
        "lat": 2.325893,
        "lng": 99.974996,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:43:44",
        "lat": 2.325893,
        "lng": 99.974996,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:43:45",
        "lat": 2.325893,
        "lng": 99.974996,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:43:48",
        "lat": 2.325859,
        "lng": 99.974987,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 16:43:49",
        "lat": 2.325839,
        "lng": 99.974996,
        "speed": 8.0
      },
      {
        "time": "2026-09-09 16:43:52",
        "lat": 2.325768,
        "lng": 99.974996,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 16:43:53",
        "lat": 2.325733,
        "lng": 99.974996,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 16:43:57",
        "lat": 2.325581,
        "lng": 99.974996,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 16:43:58",
        "lat": 2.325536,
        "lng": 99.974996,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 16:44:00",
        "lat": 2.325448,
        "lng": 99.974996,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 16:44:07",
        "lat": 2.325135,
        "lng": 99.974996,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 16:44:08",
        "lat": 2.325092,
        "lng": 99.974996,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 16:44:10",
        "lat": 2.325004,
        "lng": 99.975013,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 16:44:17",
        "lat": 2.324839,
        "lng": 99.975013,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:44:21",
        "lat": 2.324838,
        "lng": 99.975013,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:44:24",
        "lat": 2.324783,
        "lng": 99.975013,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 16:44:28",
        "lat": 2.324691,
        "lng": 99.975013,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 16:44:30",
        "lat": 2.324622,
        "lng": 99.975013,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 16:44:32",
        "lat": 2.32455,
        "lng": 99.975013,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 16:44:38",
        "lat": 2.324272,
        "lng": 99.975031,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:44:48",
        "lat": 2.323789,
        "lng": 99.975031,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:44:58",
        "lat": 2.323262,
        "lng": 99.975049,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:45:08",
        "lat": 2.322724,
        "lng": 99.975067,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 16:45:10",
        "lat": 2.322604,
        "lng": 99.975067,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:45:14",
        "lat": 2.32238,
        "lng": 99.975067,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 16:45:18",
        "lat": 2.322145,
        "lng": 99.975084,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:45:28",
        "lat": 2.321528,
        "lng": 99.975093,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:45:36",
        "lat": 2.321031,
        "lng": 99.975111,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:45:38",
        "lat": 2.320907,
        "lng": 99.975093,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:45:39",
        "lat": 2.320843,
        "lng": 99.975093,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 16:45:45",
        "lat": 2.320457,
        "lng": 99.975093,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 16:45:46",
        "lat": 2.320393,
        "lng": 99.975093,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 16:45:48",
        "lat": 2.320264,
        "lng": 99.975093,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 16:45:58",
        "lat": 2.319624,
        "lng": 99.975111,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:46:11",
        "lat": 2.319324,
        "lng": 99.975209,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 16:46:18",
        "lat": 2.319343,
        "lng": 99.975538,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 16:46:23",
        "lat": 2.319344,
        "lng": 99.975813,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 16:46:25",
        "lat": 2.319346,
        "lng": 99.975947,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 16:46:28",
        "lat": 2.319347,
        "lng": 99.976107,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 16:46:38",
        "lat": 2.319359,
        "lng": 99.976631,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 16:46:48",
        "lat": 2.319367,
        "lng": 99.977182,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 16:47:04",
        "lat": 2.319359,
        "lng": 99.977324,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 16:47:13",
        "lat": 2.319487,
        "lng": 99.977253,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 16:47:15",
        "lat": 2.319579,
        "lng": 99.977253,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:47:18",
        "lat": 2.319747,
        "lng": 99.977227,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 16:47:20",
        "lat": 2.319872,
        "lng": 99.977227,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 16:47:28",
        "lat": 2.320437,
        "lng": 99.977209,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 16:47:38",
        "lat": 2.321213,
        "lng": 99.977182,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 16:47:48",
        "lat": 2.322066,
        "lng": 99.977164,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 16:47:58",
        "lat": 2.322933,
        "lng": 99.977138,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 16:48:08",
        "lat": 2.323775,
        "lng": 99.977093,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 16:48:18",
        "lat": 2.324581,
        "lng": 99.977067,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 16:48:28",
        "lat": 2.325206,
        "lng": 99.977031,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 16:48:38",
        "lat": 2.325639,
        "lng": 99.977022,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 16:49:04",
        "lat": 2.325719,
        "lng": 99.977031,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:56:53",
        "lat": 2.325734,
        "lng": 99.977031,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 16:57:08",
        "lat": 2.325707,
        "lng": 99.977031,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 16:57:18",
        "lat": 2.325316,
        "lng": 99.977049,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 16:57:28",
        "lat": 2.324823,
        "lng": 99.977067,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 16:57:38",
        "lat": 2.324203,
        "lng": 99.977084,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 16:57:48",
        "lat": 2.323338,
        "lng": 99.97712,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 16:57:58",
        "lat": 2.322368,
        "lng": 99.977147,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 16:58:08",
        "lat": 2.321429,
        "lng": 99.977182,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 16:58:18",
        "lat": 2.320507,
        "lng": 99.977209,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 16:58:28",
        "lat": 2.319684,
        "lng": 99.977253,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 16:58:37",
        "lat": 2.319367,
        "lng": 99.977342,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 16:58:38",
        "lat": 2.319366,
        "lng": 99.977396,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 16:58:48",
        "lat": 2.319389,
        "lng": 99.978071,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 16:58:58",
        "lat": 2.319399,
        "lng": 99.97896,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 16:59:08",
        "lat": 2.319412,
        "lng": 99.979849,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 16:59:18",
        "lat": 2.319426,
        "lng": 99.980667,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 16:59:28",
        "lat": 2.319447,
        "lng": 99.981573,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 16:59:38",
        "lat": 2.319463,
        "lng": 99.982622,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 16:59:48",
        "lat": 2.319479,
        "lng": 99.983556,
        "speed": 40.0
      },
      {
        "time": "2026-09-09 16:59:58",
        "lat": 2.319444,
        "lng": 99.984302,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 17:00:02",
        "lat": 2.319203,
        "lng": 99.984329,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 17:00:08",
        "lat": 2.318691,
        "lng": 99.984329,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 17:00:13",
        "lat": 2.318375,
        "lng": 99.984329,
        "speed": 13.0
      },
      {
        "time": "2026-09-09 17:00:18",
        "lat": 2.318306,
        "lng": 99.984444,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 17:01:20",
        "lat": 2.318328,
        "lng": 99.984782,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 17:01:50",
        "lat": 2.31833,
        "lng": 99.984782,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 17:01:53",
        "lat": 2.31833,
        "lng": 99.984782,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 17:01:54",
        "lat": 2.318331,
        "lng": 99.984782,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 17:01:57",
        "lat": 2.318332,
        "lng": 99.984791,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 17:02:08",
        "lat": 2.318327,
        "lng": 99.984747,
        "speed": 9.0
      },
      {
        "time": "2026-09-09 17:02:18",
        "lat": 2.318312,
        "lng": 99.984418,
        "speed": 14.0
      },
      {
        "time": "2026-09-09 17:02:23",
        "lat": 2.318398,
        "lng": 99.984329,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 17:02:28",
        "lat": 2.318657,
        "lng": 99.984347,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 17:02:38",
        "lat": 2.319362,
        "lng": 99.984347,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 17:02:42",
        "lat": 2.319482,
        "lng": 99.984249,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 17:02:48",
        "lat": 2.319479,
        "lng": 99.983822,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 17:02:58",
        "lat": 2.319456,
        "lng": 99.982827,
        "speed": 41.0
      },
      {
        "time": "2026-09-09 17:03:08",
        "lat": 2.319447,
        "lng": 99.981733,
        "speed": 45.0
      },
      {
        "time": "2026-09-09 17:03:18",
        "lat": 2.319422,
        "lng": 99.980667,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 17:03:27",
        "lat": 2.319423,
        "lng": 99.980711,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 17:03:28",
        "lat": 2.319423,
        "lng": 99.9808,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 17:03:38",
        "lat": 2.319451,
        "lng": 99.98208,
        "speed": 64.0
      },
      {
        "time": "2026-09-09 17:03:48",
        "lat": 2.319477,
        "lng": 99.98344,
        "speed": 49.0
      },
      {
        "time": "2026-09-09 17:03:58",
        "lat": 2.319434,
        "lng": 99.984329,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 17:04:02",
        "lat": 2.319159,
        "lng": 99.984329,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 17:04:08",
        "lat": 2.318607,
        "lng": 99.984329,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 17:04:14",
        "lat": 2.31838,
        "lng": 99.984347,
        "speed": 3.0
      },
      {
        "time": "2026-09-09 17:04:34",
        "lat": 2.318376,
        "lng": 99.984356,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 18:06:26",
        "lat": 2.318373,
        "lng": 99.984347,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 18:06:39",
        "lat": 2.318424,
        "lng": 99.984329,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 18:06:41",
        "lat": 2.318507,
        "lng": 99.984329,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 18:06:49",
        "lat": 2.319022,
        "lng": 99.984347,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 18:06:51",
        "lat": 2.319159,
        "lng": 99.984347,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 18:06:55",
        "lat": 2.319383,
        "lng": 99.984347,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 18:06:59",
        "lat": 2.319485,
        "lng": 99.984249,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 18:07:01",
        "lat": 2.319485,
        "lng": 99.984133,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 18:07:11",
        "lat": 2.319477,
        "lng": 99.983298,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 18:07:21",
        "lat": 2.319458,
        "lng": 99.982453,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 18:07:31",
        "lat": 2.319451,
        "lng": 99.981591,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 18:07:41",
        "lat": 2.319434,
        "lng": 99.980747,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:07:42",
        "lat": 2.319434,
        "lng": 99.98064,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 18:07:43",
        "lat": 2.319429,
        "lng": 99.980569,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 18:07:51",
        "lat": 2.319409,
        "lng": 99.979938,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 18:08:01",
        "lat": 2.319399,
        "lng": 99.979164,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 18:08:11",
        "lat": 2.319388,
        "lng": 99.978284,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:08:21",
        "lat": 2.319371,
        "lng": 99.977413,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 18:08:31",
        "lat": 2.31936,
        "lng": 99.976631,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 18:08:41",
        "lat": 2.319342,
        "lng": 99.975858,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 18:08:42",
        "lat": 2.319341,
        "lng": 99.97576,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 18:08:43",
        "lat": 2.31934,
        "lng": 99.975689,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 18:08:51",
        "lat": 2.319318,
        "lng": 99.975067,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 18:09:01",
        "lat": 2.319308,
        "lng": 99.974338,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 18:09:03",
        "lat": 2.319313,
        "lng": 99.974187,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 18:09:08",
        "lat": 2.319304,
        "lng": 99.973858,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 18:09:11",
        "lat": 2.319298,
        "lng": 99.973644,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 18:09:21",
        "lat": 2.319278,
        "lng": 99.972969,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 18:09:31",
        "lat": 2.319264,
        "lng": 99.972187,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 18:09:41",
        "lat": 2.319254,
        "lng": 99.971324,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 18:09:51",
        "lat": 2.319238,
        "lng": 99.970524,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 18:10:01",
        "lat": 2.319219,
        "lng": 99.969662,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:10:11",
        "lat": 2.319206,
        "lng": 99.968862,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 18:10:21",
        "lat": 2.319193,
        "lng": 99.968018,
        "speed": 35.0
      },
      {
        "time": "2026-09-09 18:10:31",
        "lat": 2.319179,
        "lng": 99.967111,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 18:10:41",
        "lat": 2.31916,
        "lng": 99.966133,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 18:10:51",
        "lat": 2.319145,
        "lng": 99.965173,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:11:01",
        "lat": 2.319127,
        "lng": 99.964258,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:11:11",
        "lat": 2.319112,
        "lng": 99.96336,
        "speed": 36.0
      },
      {
        "time": "2026-09-09 18:11:21",
        "lat": 2.319095,
        "lng": 99.962444,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 18:11:31",
        "lat": 2.319076,
        "lng": 99.961493,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 18:11:41",
        "lat": 2.319067,
        "lng": 99.960551,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 18:11:51",
        "lat": 2.319047,
        "lng": 99.959538,
        "speed": 38.0
      },
      {
        "time": "2026-09-09 18:12:01",
        "lat": 2.319023,
        "lng": 99.958613,
        "speed": 37.0
      },
      {
        "time": "2026-09-09 18:12:11",
        "lat": 2.319006,
        "lng": 99.957591,
        "speed": 39.0
      },
      {
        "time": "2026-09-09 18:12:21",
        "lat": 2.318993,
        "lng": 99.956738,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 18:12:31",
        "lat": 2.319039,
        "lng": 99.956267,
        "speed": 10.0
      },
      {
        "time": "2026-09-09 18:14:11",
        "lat": 2.319399,
        "lng": 99.956231,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 18:14:21",
        "lat": 2.31996,
        "lng": 99.956231,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 18:14:31",
        "lat": 2.320591,
        "lng": 99.956231,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 18:14:41",
        "lat": 2.32128,
        "lng": 99.956213,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 18:14:51",
        "lat": 2.321986,
        "lng": 99.956213,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 18:15:01",
        "lat": 2.322687,
        "lng": 99.956196,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 18:15:11",
        "lat": 2.323409,
        "lng": 99.956196,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 18:15:21",
        "lat": 2.324146,
        "lng": 99.956187,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 18:15:31",
        "lat": 2.324873,
        "lng": 99.956169,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 18:15:41",
        "lat": 2.325559,
        "lng": 99.956169,
        "speed": 21.0
      },
      {
        "time": "2026-09-09 18:17:13",
        "lat": 2.326029,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 18:17:30",
        "lat": 2.326029,
        "lng": 99.956169,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 21:56:19",
        "lat": 2.325855,
        "lng": 99.956187,
        "speed": 11.0
      },
      {
        "time": "2026-09-09 21:56:29",
        "lat": 2.325541,
        "lng": 99.956187,
        "speed": 15.0
      },
      {
        "time": "2026-09-09 21:56:39",
        "lat": 2.325114,
        "lng": 99.956187,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 21:56:49",
        "lat": 2.324582,
        "lng": 99.956187,
        "speed": 23.0
      },
      {
        "time": "2026-09-09 21:56:59",
        "lat": 2.323987,
        "lng": 99.956196,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 21:57:09",
        "lat": 2.323323,
        "lng": 99.956196,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 21:57:19",
        "lat": 2.322642,
        "lng": 99.956213,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 21:57:29",
        "lat": 2.321942,
        "lng": 99.956231,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 21:57:39",
        "lat": 2.321236,
        "lng": 99.956231,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 21:57:49",
        "lat": 2.320514,
        "lng": 99.956231,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 21:57:59",
        "lat": 2.319803,
        "lng": 99.956249,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 21:58:09",
        "lat": 2.319069,
        "lng": 99.956249,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 21:58:19",
        "lat": 2.318306,
        "lng": 99.956267,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 21:58:29",
        "lat": 2.317506,
        "lng": 99.956284,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 21:58:39",
        "lat": 2.316703,
        "lng": 99.956302,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 21:58:49",
        "lat": 2.315921,
        "lng": 99.956311,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 21:58:59",
        "lat": 2.315115,
        "lng": 99.956311,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 21:59:09",
        "lat": 2.314295,
        "lng": 99.956329,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 21:59:19",
        "lat": 2.313462,
        "lng": 99.956329,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 21:59:29",
        "lat": 2.31264,
        "lng": 99.956347,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 21:59:39",
        "lat": 2.31178,
        "lng": 99.956347,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 21:59:49",
        "lat": 2.310943,
        "lng": 99.956364,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 21:59:59",
        "lat": 2.310122,
        "lng": 99.956382,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:00:09",
        "lat": 2.309301,
        "lng": 99.9564,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:00:19",
        "lat": 2.308513,
        "lng": 99.956409,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:00:29",
        "lat": 2.307702,
        "lng": 99.956409,
        "speed": 33.0
      },
      {
        "time": "2026-09-09 22:00:39",
        "lat": 2.306893,
        "lng": 99.956427,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:00:49",
        "lat": 2.306231,
        "lng": 99.956427,
        "speed": 20.0
      },
      {
        "time": "2026-09-09 22:00:59",
        "lat": 2.305619,
        "lng": 99.956444,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:01:09",
        "lat": 2.304898,
        "lng": 99.956444,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:01:19",
        "lat": 2.304181,
        "lng": 99.956444,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:01:29",
        "lat": 2.303437,
        "lng": 99.956462,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:01:39",
        "lat": 2.302687,
        "lng": 99.956462,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:01:49",
        "lat": 2.301917,
        "lng": 99.956471,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:01:59",
        "lat": 2.301132,
        "lng": 99.956471,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:02:09",
        "lat": 2.300354,
        "lng": 99.956498,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:02:19",
        "lat": 2.299869,
        "lng": 99.956409,
        "speed": 18.0
      },
      {
        "time": "2026-09-09 22:02:29",
        "lat": 2.299862,
        "lng": 99.955893,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 22:02:39",
        "lat": 2.299848,
        "lng": 99.955289,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 22:02:49",
        "lat": 2.299838,
        "lng": 99.954622,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 22:02:59",
        "lat": 2.299808,
        "lng": 99.953956,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:03:09",
        "lat": 2.299797,
        "lng": 99.953253,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:03:19",
        "lat": 2.29978,
        "lng": 99.952533,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:03:29",
        "lat": 2.299773,
        "lng": 99.95184,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:03:39",
        "lat": 2.299768,
        "lng": 99.951129,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:03:49",
        "lat": 2.299764,
        "lng": 99.950436,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 22:03:59",
        "lat": 2.299728,
        "lng": 99.949751,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:04:09",
        "lat": 2.29969,
        "lng": 99.949022,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:04:19",
        "lat": 2.299628,
        "lng": 99.948284,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:04:29",
        "lat": 2.299586,
        "lng": 99.947582,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:04:39",
        "lat": 2.299548,
        "lng": 99.947022,
        "speed": 16.0
      },
      {
        "time": "2026-09-09 22:04:49",
        "lat": 2.299518,
        "lng": 99.946533,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 22:04:59",
        "lat": 2.299504,
        "lng": 99.945902,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:05:09",
        "lat": 2.299487,
        "lng": 99.945244,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:05:19",
        "lat": 2.299433,
        "lng": 99.944578,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:05:29",
        "lat": 2.299389,
        "lng": 99.943876,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:05:39",
        "lat": 2.299372,
        "lng": 99.943164,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:05:49",
        "lat": 2.299336,
        "lng": 99.94248,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:05:59",
        "lat": 2.299302,
        "lng": 99.941813,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:06:09",
        "lat": 2.299261,
        "lng": 99.941093,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:06:19",
        "lat": 2.299229,
        "lng": 99.940364,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:06:29",
        "lat": 2.299191,
        "lng": 99.939618,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:06:39",
        "lat": 2.299136,
        "lng": 99.938836,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:06:49",
        "lat": 2.299109,
        "lng": 99.938053,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:06:59",
        "lat": 2.299082,
        "lng": 99.937324,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:07:09",
        "lat": 2.299037,
        "lng": 99.936596,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:07:19",
        "lat": 2.298987,
        "lng": 99.935822,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:07:29",
        "lat": 2.298985,
        "lng": 99.935093,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:07:39",
        "lat": 2.298958,
        "lng": 99.934453,
        "speed": 12.0
      },
      {
        "time": "2026-09-09 22:07:49",
        "lat": 2.298901,
        "lng": 99.933938,
        "speed": 25.0
      },
      {
        "time": "2026-09-09 22:07:59",
        "lat": 2.298878,
        "lng": 99.933351,
        "speed": 17.0
      },
      {
        "time": "2026-09-09 22:08:09",
        "lat": 2.298867,
        "lng": 99.932818,
        "speed": 22.0
      },
      {
        "time": "2026-09-09 22:08:19",
        "lat": 2.298882,
        "lng": 99.932347,
        "speed": 19.0
      },
      {
        "time": "2026-09-09 22:08:29",
        "lat": 2.298886,
        "lng": 99.931742,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:08:39",
        "lat": 2.298906,
        "lng": 99.93104,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:08:49",
        "lat": 2.298941,
        "lng": 99.93032,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:08:59",
        "lat": 2.298971,
        "lng": 99.929573,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:09:09",
        "lat": 2.299023,
        "lng": 99.928809,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:09:19",
        "lat": 2.299014,
        "lng": 99.928089,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 22:09:29",
        "lat": 2.298999,
        "lng": 99.927458,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:09:39",
        "lat": 2.298977,
        "lng": 99.926827,
        "speed": 24.0
      },
      {
        "time": "2026-09-09 22:09:49",
        "lat": 2.298978,
        "lng": 99.926204,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:09:59",
        "lat": 2.298977,
        "lng": 99.92552,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:10:09",
        "lat": 2.298954,
        "lng": 99.924871,
        "speed": 26.0
      },
      {
        "time": "2026-09-09 22:10:19",
        "lat": 2.298956,
        "lng": 99.924204,
        "speed": 27.0
      },
      {
        "time": "2026-09-09 22:10:29",
        "lat": 2.298938,
        "lng": 99.923502,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:10:39",
        "lat": 2.29893,
        "lng": 99.922764,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:10:49",
        "lat": 2.298903,
        "lng": 99.922036,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:10:59",
        "lat": 2.298882,
        "lng": 99.921289,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:11:09",
        "lat": 2.298865,
        "lng": 99.920524,
        "speed": 29.0
      },
      {
        "time": "2026-09-09 22:11:19",
        "lat": 2.298854,
        "lng": 99.919804,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:11:29",
        "lat": 2.29883,
        "lng": 99.919093,
        "speed": 28.0
      },
      {
        "time": "2026-09-09 22:11:39",
        "lat": 2.29882,
        "lng": 99.918347,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:11:49",
        "lat": 2.298807,
        "lng": 99.917564,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:11:59",
        "lat": 2.298786,
        "lng": 99.916764,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:12:09",
        "lat": 2.298767,
        "lng": 99.915973,
        "speed": 31.0
      },
      {
        "time": "2026-09-09 22:12:19",
        "lat": 2.298752,
        "lng": 99.9152,
        "speed": 30.0
      },
      {
        "time": "2026-09-09 22:12:29",
        "lat": 2.298736,
        "lng": 99.914418,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:12:39",
        "lat": 2.298724,
        "lng": 99.913618,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:12:49",
        "lat": 2.298725,
        "lng": 99.912809,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:12:59",
        "lat": 2.298708,
        "lng": 99.912027,
        "speed": 32.0
      },
      {
        "time": "2026-09-09 22:13:09",
        "lat": 2.298706,
        "lng": 99.911182,
        "speed": 34.0
      },
      {
        "time": "2026-09-09 22:17:48",
        "lat": 2.298673,
        "lng": 99.910578,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 22:18:06",
        "lat": 2.298674,
        "lng": 99.910578,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 22:25:37",
        "lat": 2.298999,
        "lng": 99.909564,
        "speed": 0.0
      },
      {
        "time": "2026-09-09 22:25:43",
        "lat": 2.298998,
        "lng": 99.909564,
        "speed": 0.0
      }
    ]
  },
  "2026-09-10__V-PHH-01": {
    "date": "2026-09-10",
    "vehicleId": "V-PHH-01",
    "nopol": "BK 2002 PHH",
    "estateId": "Estate A",
    "vehicleType": "Motorcycle",
    "points": [
      {
        "time": "2026-09-10 05:16:45",
        "lat": 2.298998,
        "lng": 99.909564,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 06:34:33",
        "lat": 2.298989,
        "lng": 99.9096,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 07:25:14",
        "lat": 2.298948,
        "lng": 99.909636,
        "speed": 9.0
      },
      {
        "time": "2026-09-10 07:25:33",
        "lat": 2.298585,
        "lng": 99.91,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 07:28:15",
        "lat": 2.298589,
        "lng": 99.910382,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 07:30:04",
        "lat": 2.298608,
        "lng": 99.909422,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 07:30:49",
        "lat": 2.298702,
        "lng": 99.909396,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 07:31:34",
        "lat": 2.298581,
        "lng": 99.909182,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 07:32:04",
        "lat": 2.297351,
        "lng": 99.90856,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 07:32:44",
        "lat": 2.294064,
        "lng": 99.90816,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 07:33:24",
        "lat": 2.290546,
        "lng": 99.90768,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 07:34:04",
        "lat": 2.288203,
        "lng": 99.906347,
        "speed": 38.0
      },
      {
        "time": "2026-09-10 07:34:44",
        "lat": 2.284745,
        "lng": 99.90352,
        "speed": 44.0
      },
      {
        "time": "2026-09-10 07:35:24",
        "lat": 2.281671,
        "lng": 99.900978,
        "speed": 37.0
      },
      {
        "time": "2026-09-10 07:36:04",
        "lat": 2.278829,
        "lng": 99.898969,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 07:36:44",
        "lat": 2.27704,
        "lng": 99.895787,
        "speed": 41.0
      },
      {
        "time": "2026-09-10 07:37:24",
        "lat": 2.274806,
        "lng": 99.892018,
        "speed": 42.0
      },
      {
        "time": "2026-09-10 07:38:04",
        "lat": 2.272923,
        "lng": 99.888329,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 07:38:44",
        "lat": 2.270605,
        "lng": 99.885156,
        "speed": 41.0
      },
      {
        "time": "2026-09-10 07:39:24",
        "lat": 2.267147,
        "lng": 99.882898,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 07:39:54",
        "lat": 2.264359,
        "lng": 99.881449,
        "speed": 48.0
      },
      {
        "time": "2026-09-10 07:40:20",
        "lat": 2.262209,
        "lng": 99.880302,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 07:43:28",
        "lat": 2.262222,
        "lng": 99.880329,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 07:44:01",
        "lat": 2.262686,
        "lng": 99.880569,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 07:46:24",
        "lat": 2.263337,
        "lng": 99.880844,
        "speed": 41.0
      },
      {
        "time": "2026-09-10 07:47:01",
        "lat": 2.266676,
        "lng": 99.882613,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 07:48:04",
        "lat": 2.267584,
        "lng": 99.883138,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 07:48:34",
        "lat": 2.269292,
        "lng": 99.884507,
        "speed": 33.0
      },
      {
        "time": "2026-09-10 07:49:14",
        "lat": 2.271694,
        "lng": 99.886471,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 07:49:54",
        "lat": 2.273815,
        "lng": 99.889209,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 07:50:34",
        "lat": 2.274949,
        "lng": 99.892791,
        "speed": 37.0
      },
      {
        "time": "2026-09-10 07:51:14",
        "lat": 2.277195,
        "lng": 99.896062,
        "speed": 42.0
      },
      {
        "time": "2026-09-10 07:51:44",
        "lat": 2.278938,
        "lng": 99.898996,
        "speed": 50.0
      },
      {
        "time": "2026-09-10 07:52:24",
        "lat": 2.282376,
        "lng": 99.9016,
        "speed": 38.0
      },
      {
        "time": "2026-09-10 07:53:04",
        "lat": 2.285929,
        "lng": 99.90456,
        "speed": 46.0
      },
      {
        "time": "2026-09-10 07:53:44",
        "lat": 2.289209,
        "lng": 99.907369,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 07:54:14",
        "lat": 2.291743,
        "lng": 99.907813,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 07:54:54",
        "lat": 2.295198,
        "lng": 99.908276,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 07:55:34",
        "lat": 2.298545,
        "lng": 99.908791,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 07:56:01",
        "lat": 2.298836,
        "lng": 99.909751,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 07:56:40",
        "lat": 2.299081,
        "lng": 99.909511,
        "speed": 11.0
      },
      {
        "time": "2026-09-10 13:55:18",
        "lat": 2.298659,
        "lng": 99.909147,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 13:55:48",
        "lat": 2.298751,
        "lng": 99.911031,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 13:56:28",
        "lat": 2.298792,
        "lng": 99.914293,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 13:57:08",
        "lat": 2.29887,
        "lng": 99.918018,
        "speed": 38.0
      },
      {
        "time": "2026-09-10 13:57:58",
        "lat": 2.298908,
        "lng": 99.920311,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 13:58:38",
        "lat": 2.299003,
        "lng": 99.923973,
        "speed": 37.0
      },
      {
        "time": "2026-09-10 13:59:18",
        "lat": 2.299055,
        "lng": 99.927573,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 13:59:58",
        "lat": 2.298945,
        "lng": 99.931316,
        "speed": 38.0
      },
      {
        "time": "2026-09-10 14:00:18",
        "lat": 2.298896,
        "lng": 99.932862,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 14:00:42",
        "lat": 2.299012,
        "lng": 99.934524,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 14:01:18",
        "lat": 2.299137,
        "lng": 99.93672,
        "speed": 9.0
      },
      {
        "time": "2026-09-10 14:02:38",
        "lat": 2.299064,
        "lng": 99.93672,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 14:03:08",
        "lat": 2.299433,
        "lng": 99.934684,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 14:03:48",
        "lat": 2.303848,
        "lng": 99.934684,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 14:04:18",
        "lat": 2.305266,
        "lng": 99.93496,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 14:21:53",
        "lat": 2.305337,
        "lng": 99.935689,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 14:22:11",
        "lat": 2.305194,
        "lng": 99.934702,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 14:22:43",
        "lat": 2.301262,
        "lng": 99.934684,
        "speed": 58.0
      },
      {
        "time": "2026-09-10 14:23:13",
        "lat": 2.299026,
        "lng": 99.935591,
        "speed": 44.0
      },
      {
        "time": "2026-09-10 14:23:43",
        "lat": 2.299256,
        "lng": 99.936756,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 14:25:53",
        "lat": 2.299052,
        "lng": 99.93664,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 14:26:33",
        "lat": 2.298853,
        "lng": 99.933467,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 14:27:33",
        "lat": 2.298524,
        "lng": 99.933529,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 14:28:13",
        "lat": 2.298837,
        "lng": 99.933093,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 14:28:53",
        "lat": 2.298957,
        "lng": 99.934196,
        "speed": 36.0
      },
      {
        "time": "2026-09-10 14:29:27",
        "lat": 2.29914,
        "lng": 99.934667,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 14:29:43",
        "lat": 2.299018,
        "lng": 99.934987,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 14:30:17",
        "lat": 2.299203,
        "lng": 99.936756,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 14:35:13",
        "lat": 2.299172,
        "lng": 99.936756,
        "speed": 8.0
      },
      {
        "time": "2026-09-10 14:35:43",
        "lat": 2.298957,
        "lng": 99.934329,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 14:36:23",
        "lat": 2.298962,
        "lng": 99.930107,
        "speed": 54.0
      },
      {
        "time": "2026-09-10 14:37:03",
        "lat": 2.298998,
        "lng": 99.92456,
        "speed": 49.0
      },
      {
        "time": "2026-09-10 14:37:43",
        "lat": 2.298843,
        "lng": 99.919058,
        "speed": 55.0
      },
      {
        "time": "2026-09-10 14:38:23",
        "lat": 2.298732,
        "lng": 99.913591,
        "speed": 54.0
      },
      {
        "time": "2026-09-10 14:39:02",
        "lat": 2.298736,
        "lng": 99.909396,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 14:48:04",
        "lat": 2.298794,
        "lng": 99.909351,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 15:32:37",
        "lat": 2.298619,
        "lng": 99.909467,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 15:33:17",
        "lat": 2.298744,
        "lng": 99.912267,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 15:33:57",
        "lat": 2.298781,
        "lng": 99.915396,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 15:34:37",
        "lat": 2.298872,
        "lng": 99.918542,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 15:35:17",
        "lat": 2.298937,
        "lng": 99.921716,
        "speed": 31.0
      },
      {
        "time": "2026-09-10 15:35:57",
        "lat": 2.298999,
        "lng": 99.924693,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 15:36:37",
        "lat": 2.299037,
        "lng": 99.927591,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 15:37:17",
        "lat": 2.298954,
        "lng": 99.930667,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 15:37:43",
        "lat": 2.298812,
        "lng": 99.9324,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 15:38:17",
        "lat": 2.297071,
        "lng": 99.932329,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 15:38:57",
        "lat": 2.293961,
        "lng": 99.932196,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 15:39:37",
        "lat": 2.290989,
        "lng": 99.932142,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 15:40:55",
        "lat": 2.289662,
        "lng": 99.932133,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 15:41:17",
        "lat": 2.289829,
        "lng": 99.932178,
        "speed": 9.0
      },
      {
        "time": "2026-09-10 15:42:11",
        "lat": 2.289858,
        "lng": 99.933076,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 15:42:39",
        "lat": 2.289692,
        "lng": 99.932213,
        "speed": 13.0
      },
      {
        "time": "2026-09-10 15:43:27",
        "lat": 2.289741,
        "lng": 99.933529,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 15:44:22",
        "lat": 2.289727,
        "lng": 99.934587,
        "speed": 2.0
      },
      {
        "time": "2026-09-10 15:45:07",
        "lat": 2.291101,
        "lng": 99.93464,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 15:45:47",
        "lat": 2.29279,
        "lng": 99.93464,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 15:46:27",
        "lat": 2.294433,
        "lng": 99.93464,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 15:47:07",
        "lat": 2.296202,
        "lng": 99.934658,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 15:47:47",
        "lat": 2.298144,
        "lng": 99.934667,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 15:48:17",
        "lat": 2.298919,
        "lng": 99.934053,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 15:48:39",
        "lat": 2.298664,
        "lng": 99.933476,
        "speed": 4.0
      },
      {
        "time": "2026-09-10 15:54:41",
        "lat": 2.298527,
        "lng": 99.933742,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 15:55:42",
        "lat": 2.298909,
        "lng": 99.933902,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 15:56:18",
        "lat": 2.299063,
        "lng": 99.936604,
        "speed": 36.0
      },
      {
        "time": "2026-09-10 15:56:58",
        "lat": 2.299764,
        "lng": 99.938933,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 15:57:38",
        "lat": 2.302951,
        "lng": 99.938853,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 15:58:18",
        "lat": 2.306206,
        "lng": 99.938791,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 15:58:30",
        "lat": 2.306817,
        "lng": 99.938791,
        "speed": 6.0
      },
      {
        "time": "2026-09-10 16:11:20",
        "lat": 2.30677,
        "lng": 99.939796,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 16:12:00",
        "lat": 2.306659,
        "lng": 99.94128,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 16:14:34",
        "lat": 2.306582,
        "lng": 99.941609,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 16:15:00",
        "lat": 2.306591,
        "lng": 99.942222,
        "speed": 10.0
      },
      {
        "time": "2026-09-10 16:15:36",
        "lat": 2.306594,
        "lng": 99.943342,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 16:16:10",
        "lat": 2.306574,
        "lng": 99.944436,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 16:16:46",
        "lat": 2.306527,
        "lng": 99.945929,
        "speed": 11.0
      },
      {
        "time": "2026-09-10 16:17:08",
        "lat": 2.306497,
        "lng": 99.946613,
        "speed": 4.0
      },
      {
        "time": "2026-09-10 16:17:20",
        "lat": 2.306549,
        "lng": 99.947004,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 16:17:30",
        "lat": 2.306564,
        "lng": 99.947396,
        "speed": 9.0
      },
      {
        "time": "2026-09-10 16:19:20",
        "lat": 2.304746,
        "lng": 99.947671,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:20:00",
        "lat": 2.301731,
        "lng": 99.947902,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:20:40",
        "lat": 2.299678,
        "lng": 99.948587,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 16:21:20",
        "lat": 2.299765,
        "lng": 99.951218,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 16:22:00",
        "lat": 2.299805,
        "lng": 99.953938,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 16:22:40",
        "lat": 2.299851,
        "lng": 99.956587,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:23:20",
        "lat": 2.299888,
        "lng": 99.959182,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 16:24:00",
        "lat": 2.299947,
        "lng": 99.962044,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 16:24:40",
        "lat": 2.3,
        "lng": 99.964916,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 16:25:20",
        "lat": 2.300054,
        "lng": 99.967742,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 16:26:00",
        "lat": 2.300109,
        "lng": 99.970311,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:26:30",
        "lat": 2.298604,
        "lng": 99.970631,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:26:58",
        "lat": 2.296739,
        "lng": 99.970622,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 16:27:09",
        "lat": 2.296392,
        "lng": 99.970604,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 16:30:09",
        "lat": 2.295675,
        "lng": 99.970604,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 16:30:50",
        "lat": 2.293818,
        "lng": 99.970578,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 16:31:08",
        "lat": 2.292818,
        "lng": 99.970702,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 16:31:40",
        "lat": 2.292687,
        "lng": 99.973076,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 16:32:20",
        "lat": 2.292539,
        "lng": 99.976391,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 16:33:00",
        "lat": 2.292282,
        "lng": 99.979822,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 16:33:40",
        "lat": 2.292041,
        "lng": 99.983182,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:34:10",
        "lat": 2.291554,
        "lng": 99.984418,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 16:34:50",
        "lat": 2.289273,
        "lng": 99.984444,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 16:35:30",
        "lat": 2.286803,
        "lng": 99.984471,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 16:36:20",
        "lat": 2.284798,
        "lng": 99.98488,
        "speed": 8.0
      },
      {
        "time": "2026-09-10 16:36:56",
        "lat": 2.28485,
        "lng": 99.985644,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 16:38:18",
        "lat": 2.284864,
        "lng": 99.985796,
        "speed": 2.0
      },
      {
        "time": "2026-09-10 16:39:20",
        "lat": 2.284802,
        "lng": 99.984836,
        "speed": 8.0
      },
      {
        "time": "2026-09-10 16:39:50",
        "lat": 2.285474,
        "lng": 99.984516,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 16:40:30",
        "lat": 2.287763,
        "lng": 99.984489,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 16:41:10",
        "lat": 2.290258,
        "lng": 99.984462,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 16:41:50",
        "lat": 2.292817,
        "lng": 99.984444,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:42:10",
        "lat": 2.294212,
        "lng": 99.984418,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 16:42:50",
        "lat": 2.297203,
        "lng": 99.984409,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:43:30",
        "lat": 2.300458,
        "lng": 99.984391,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:44:10",
        "lat": 2.303662,
        "lng": 99.984356,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 16:44:50",
        "lat": 2.306654,
        "lng": 99.984347,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 16:45:20",
        "lat": 2.308769,
        "lng": 99.984329,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 16:45:40",
        "lat": 2.309093,
        "lng": 99.983627,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:46:00",
        "lat": 2.309078,
        "lng": 99.982249,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 16:46:40",
        "lat": 2.309053,
        "lng": 99.979262,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 16:47:20",
        "lat": 2.309004,
        "lng": 99.976444,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:48:00",
        "lat": 2.308998,
        "lng": 99.973476,
        "speed": 30.0
      },
      {
        "time": "2026-09-10 16:48:40",
        "lat": 2.308967,
        "lng": 99.970302,
        "speed": 34.0
      },
      {
        "time": "2026-09-10 16:49:20",
        "lat": 2.308943,
        "lng": 99.96704,
        "speed": 33.0
      },
      {
        "time": "2026-09-10 16:50:00",
        "lat": 2.308923,
        "lng": 99.963751,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 16:50:44",
        "lat": 2.309092,
        "lng": 99.96104,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 16:51:20",
        "lat": 2.311775,
        "lng": 99.961004,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 16:52:00",
        "lat": 2.315277,
        "lng": 99.960951,
        "speed": 33.0
      },
      {
        "time": "2026-09-10 16:52:40",
        "lat": 2.318674,
        "lng": 99.960907,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 16:53:10",
        "lat": 2.319062,
        "lng": 99.95976,
        "speed": 36.0
      },
      {
        "time": "2026-09-10 17:02:20",
        "lat": 2.319034,
        "lng": 99.958676,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 17:03:00",
        "lat": 2.319088,
        "lng": 99.961573,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 17:03:25",
        "lat": 2.319007,
        "lng": 99.963067,
        "speed": 13.0
      },
      {
        "time": "2026-09-10 17:28:47",
        "lat": 2.318993,
        "lng": 99.963067,
        "speed": 6.0
      },
      {
        "time": "2026-09-10 17:29:16",
        "lat": 2.319101,
        "lng": 99.961769,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 17:29:56",
        "lat": 2.319047,
        "lng": 99.958658,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 17:30:26",
        "lat": 2.320107,
        "lng": 99.958596,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 17:31:06",
        "lat": 2.322153,
        "lng": 99.958578,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 17:31:46",
        "lat": 2.324534,
        "lng": 99.958542,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 17:33:17",
        "lat": 2.325984,
        "lng": 99.958524,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 17:55:59",
        "lat": 2.325328,
        "lng": 99.958498,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 17:56:39",
        "lat": 2.322006,
        "lng": 99.958542,
        "speed": 31.0
      },
      {
        "time": "2026-09-10 17:57:18",
        "lat": 2.319029,
        "lng": 99.958516,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 17:57:46",
        "lat": 2.318836,
        "lng": 99.956249,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 17:58:19",
        "lat": 2.315303,
        "lng": 99.956302,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 17:58:59",
        "lat": 2.310938,
        "lng": 99.956347,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 17:59:39",
        "lat": 2.306599,
        "lng": 99.9564,
        "speed": 46.0
      },
      {
        "time": "2026-09-10 18:00:19",
        "lat": 2.301967,
        "lng": 99.956444,
        "speed": 44.0
      },
      {
        "time": "2026-09-10 18:00:49",
        "lat": 2.299836,
        "lng": 99.95584,
        "speed": 39.0
      },
      {
        "time": "2026-09-10 18:01:29",
        "lat": 2.299757,
        "lng": 99.951573,
        "speed": 43.0
      },
      {
        "time": "2026-09-10 18:02:09",
        "lat": 2.29955,
        "lng": 99.947369,
        "speed": 32.0
      },
      {
        "time": "2026-09-10 18:02:49",
        "lat": 2.299374,
        "lng": 99.943476,
        "speed": 40.0
      },
      {
        "time": "2026-09-10 18:03:29",
        "lat": 2.299182,
        "lng": 99.939716,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 18:04:09",
        "lat": 2.299068,
        "lng": 99.937084,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 18:04:49",
        "lat": 2.298931,
        "lng": 99.934124,
        "speed": 35.0
      },
      {
        "time": "2026-09-10 18:05:21",
        "lat": 2.298496,
        "lng": 99.933369,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 18:09:19",
        "lat": 2.298483,
        "lng": 99.933422,
        "speed": 11.0
      },
      {
        "time": "2026-09-10 18:09:39",
        "lat": 2.298092,
        "lng": 99.932684,
        "speed": 40.0
      },
      {
        "time": "2026-09-10 18:10:19",
        "lat": 2.298117,
        "lng": 99.932373,
        "speed": 31.0
      },
      {
        "time": "2026-09-10 18:10:59",
        "lat": 2.294472,
        "lng": 99.932196,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 18:15:29",
        "lat": 2.294032,
        "lng": 99.932213,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 18:16:02",
        "lat": 2.296801,
        "lng": 99.932302,
        "speed": 36.0
      },
      {
        "time": "2026-09-10 18:20:08",
        "lat": 2.298433,
        "lng": 99.9324,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 18:21:02",
        "lat": 2.298479,
        "lng": 99.933333,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 21:41:18",
        "lat": 2.298792,
        "lng": 99.933218,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 21:41:48",
        "lat": 2.298861,
        "lng": 99.932,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 21:42:28",
        "lat": 2.298948,
        "lng": 99.930044,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 21:43:08",
        "lat": 2.299005,
        "lng": 99.928009,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 21:43:48",
        "lat": 2.298974,
        "lng": 99.925929,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 21:44:28",
        "lat": 2.298938,
        "lng": 99.92384,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 21:45:08",
        "lat": 2.298878,
        "lng": 99.921778,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 21:46:01",
        "lat": 2.298832,
        "lng": 99.920124,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 21:47:08",
        "lat": 2.298798,
        "lng": 99.918,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 21:47:48",
        "lat": 2.298744,
        "lng": 99.915316,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 21:48:28",
        "lat": 2.298693,
        "lng": 99.912551,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 21:49:08",
        "lat": 2.298566,
        "lng": 99.90984,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 22:19:36",
        "lat": 2.298736,
        "lng": 99.909378,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 22:20:07",
        "lat": 2.298538,
        "lng": 99.908773,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 22:20:37",
        "lat": 2.296026,
        "lng": 99.908364,
        "speed": 42.0
      },
      {
        "time": "2026-09-10 22:21:17",
        "lat": 2.292258,
        "lng": 99.907893,
        "speed": 38.0
      },
      {
        "time": "2026-09-10 22:21:57",
        "lat": 2.289384,
        "lng": 99.907538,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 22:22:47",
        "lat": 2.291287,
        "lng": 99.90776,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:23:27",
        "lat": 2.294064,
        "lng": 99.90816,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 22:24:07",
        "lat": 2.296979,
        "lng": 99.908489,
        "speed": 29.0
      },
      {
        "time": "2026-09-10 22:24:37",
        "lat": 2.298574,
        "lng": 99.909049,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 22:32:32",
        "lat": 2.298774,
        "lng": 99.909378,
        "speed": 8.0
      },
      {
        "time": "2026-09-10 22:32:57",
        "lat": 2.298588,
        "lng": 99.909538,
        "speed": 13.0
      },
      {
        "time": "2026-09-10 22:33:22",
        "lat": 2.298417,
        "lng": 99.908693,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 22:34:12",
        "lat": 2.296361,
        "lng": 99.908418,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 22:34:52",
        "lat": 2.294396,
        "lng": 99.908187,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 22:35:32",
        "lat": 2.292692,
        "lng": 99.907956,
        "speed": 7.0
      },
      {
        "time": "2026-09-10 22:38:32",
        "lat": 2.292417,
        "lng": 99.907929,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 22:39:12",
        "lat": 2.294261,
        "lng": 99.908187,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 22:39:52",
        "lat": 2.296417,
        "lng": 99.908436,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 22:40:32",
        "lat": 2.298505,
        "lng": 99.908791,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 22:41:02",
        "lat": 2.298554,
        "lng": 99.910089,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 22:41:42",
        "lat": 2.298695,
        "lng": 99.912587,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:42:22",
        "lat": 2.298741,
        "lng": 99.914693,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 22:43:02",
        "lat": 2.298789,
        "lng": 99.917138,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 22:43:42",
        "lat": 2.298842,
        "lng": 99.919662,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:44:22",
        "lat": 2.298899,
        "lng": 99.922187,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:45:02",
        "lat": 2.298961,
        "lng": 99.924631,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:45:42",
        "lat": 2.298995,
        "lng": 99.926969,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 22:46:22",
        "lat": 2.299001,
        "lng": 99.929333,
        "speed": 19.0
      },
      {
        "time": "2026-09-10 22:46:52",
        "lat": 2.300079,
        "lng": 99.929769,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 22:47:32",
        "lat": 2.302398,
        "lng": 99.930107,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:48:12",
        "lat": 2.304846,
        "lng": 99.930418,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 22:49:22",
        "lat": 2.306841,
        "lng": 99.930631,
        "speed": 11.0
      },
      {
        "time": "2026-09-10 22:50:02",
        "lat": 2.304908,
        "lng": 99.930391,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 22:50:42",
        "lat": 2.302556,
        "lng": 99.93008,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:51:22",
        "lat": 2.300036,
        "lng": 99.929733,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:52:02",
        "lat": 2.297733,
        "lng": 99.929431,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 22:52:42",
        "lat": 2.295111,
        "lng": 99.929084,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 22:53:22",
        "lat": 2.292522,
        "lng": 99.928738,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 22:54:02",
        "lat": 2.289915,
        "lng": 99.928382,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 22:55:02",
        "lat": 2.290859,
        "lng": 99.928551,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 22:55:42",
        "lat": 2.293399,
        "lng": 99.928889,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 22:56:22",
        "lat": 2.296074,
        "lng": 99.929244,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 22:57:02",
        "lat": 2.29877,
        "lng": 99.929618,
        "speed": 17.0
      },
      {
        "time": "2026-09-10 22:57:32",
        "lat": 2.298878,
        "lng": 99.931138,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 22:58:12",
        "lat": 2.298886,
        "lng": 99.933369,
        "speed": 15.0
      },
      {
        "time": "2026-09-10 22:58:52",
        "lat": 2.298981,
        "lng": 99.935529,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 22:59:32",
        "lat": 2.299122,
        "lng": 99.937991,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:00:02",
        "lat": 2.299796,
        "lng": 99.938933,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:00:42",
        "lat": 2.302269,
        "lng": 99.93888,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 23:01:22",
        "lat": 2.304776,
        "lng": 99.938836,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 23:02:52",
        "lat": 2.306776,
        "lng": 99.938818,
        "speed": 10.0
      },
      {
        "time": "2026-09-10 23:03:32",
        "lat": 2.304713,
        "lng": 99.938818,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 23:04:12",
        "lat": 2.301941,
        "lng": 99.938898,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 23:04:52",
        "lat": 2.299281,
        "lng": 99.938969,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:05:32",
        "lat": 2.296758,
        "lng": 99.939013,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 23:06:12",
        "lat": 2.294325,
        "lng": 99.939076,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 23:06:52",
        "lat": 2.292031,
        "lng": 99.939129,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:08:16",
        "lat": 2.289893,
        "lng": 99.939191,
        "speed": 0.0
      },
      {
        "time": "2026-09-10 23:10:22",
        "lat": 2.290067,
        "lng": 99.939191,
        "speed": 14.0
      },
      {
        "time": "2026-09-10 23:11:02",
        "lat": 2.292083,
        "lng": 99.939129,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 23:11:42",
        "lat": 2.294407,
        "lng": 99.939076,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 23:12:22",
        "lat": 2.296821,
        "lng": 99.939031,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 23:13:02",
        "lat": 2.299107,
        "lng": 99.939067,
        "speed": 13.0
      },
      {
        "time": "2026-09-10 23:13:42",
        "lat": 2.299269,
        "lng": 99.941076,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 23:14:12",
        "lat": 2.297967,
        "lng": 99.941262,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:14:52",
        "lat": 2.295417,
        "lng": 99.941191,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:15:32",
        "lat": 2.29281,
        "lng": 99.941244,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:16:12",
        "lat": 2.290268,
        "lng": 99.941289,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 23:17:12",
        "lat": 2.291531,
        "lng": 99.94128,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:17:52",
        "lat": 2.294018,
        "lng": 99.941244,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:18:32",
        "lat": 2.296687,
        "lng": 99.941244,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:19:12",
        "lat": 2.299239,
        "lng": 99.941387,
        "speed": 12.0
      },
      {
        "time": "2026-09-10 23:19:42",
        "lat": 2.299333,
        "lng": 99.942871,
        "speed": 22.0
      },
      {
        "time": "2026-09-10 23:20:22",
        "lat": 2.299473,
        "lng": 99.945227,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:21:02",
        "lat": 2.299547,
        "lng": 99.947316,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 23:21:32",
        "lat": 2.300264,
        "lng": 99.948,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 23:22:12",
        "lat": 2.302952,
        "lng": 99.947822,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 23:22:52",
        "lat": 2.305536,
        "lng": 99.947636,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 23:23:53",
        "lat": 2.305432,
        "lng": 99.947627,
        "speed": 20.0
      },
      {
        "time": "2026-09-10 23:24:33",
        "lat": 2.303137,
        "lng": 99.947769,
        "speed": 21.0
      },
      {
        "time": "2026-09-10 23:25:13",
        "lat": 2.300621,
        "lng": 99.947964,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 23:25:43",
        "lat": 2.299601,
        "lng": 99.94744,
        "speed": 18.0
      },
      {
        "time": "2026-09-10 23:26:23",
        "lat": 2.299507,
        "lng": 99.945591,
        "speed": 23.0
      },
      {
        "time": "2026-09-10 23:27:03",
        "lat": 2.299374,
        "lng": 99.943164,
        "speed": 26.0
      },
      {
        "time": "2026-09-10 23:27:43",
        "lat": 2.299273,
        "lng": 99.940773,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 23:28:23",
        "lat": 2.299137,
        "lng": 99.938364,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 23:29:03",
        "lat": 2.299002,
        "lng": 99.935618,
        "speed": 28.0
      },
      {
        "time": "2026-09-10 23:29:43",
        "lat": 2.298896,
        "lng": 99.933396,
        "speed": 16.0
      },
      {
        "time": "2026-09-10 23:30:23",
        "lat": 2.298917,
        "lng": 99.931156,
        "speed": 27.0
      },
      {
        "time": "2026-09-10 23:31:03",
        "lat": 2.299025,
        "lng": 99.92832,
        "speed": 24.0
      },
      {
        "time": "2026-09-10 23:31:43",
        "lat": 2.299013,
        "lng": 99.925733,
        "speed": 25.0
      },
      {
        "time": "2026-09-10 23:31:53",
        "lat": 2.298988,
        "lng": 99.925067,
        "speed": 27.0
      }
    ]
  }
};

export const AVAILABLE_IMPORTED_DATES = [
  '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04', '2026-09-05',
  '2026-09-06', '2026-09-07', '2026-09-08', '2026-09-09', '2026-09-10'
];
