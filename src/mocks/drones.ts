import type { Drone } from '@/types/drone';

/**
 * Mock dataset of drones.  These values were gathered from publicly
 * available product pages and reviews (see accompanying citations in
 * the research notes).  Where exact figures were unavailable a
 * reasonable estimate has been used.  When adding additional models,
 * follow the same structure and supply as many specifications as
 * possible.
 */
export const drones: Drone[] = [
  {
    id: 'iflight-nazgul-evoque-f5d-v2',
    brand: 'iFlight',
    name: 'Nazgul Evoque F5D V2',
    image: '/images/iflight-nazgul-evoque-f5d-v2.png',
    price: 799,
    categories: {
      performance: {
        'topSpeed(km/h)': 130,
        'flightTime(min)': 8,
        'flightDistance(km)': 5,
        'altitude(m)': 5000,
      },
      video: {
        camera: 'DJI O3 Air Unit',
        resolution: '4K',
        'vtxPower': '50 Mbps',
      },
      battery: {
        cellCount: '6S',
        capacity: '1480 mAh',
      },
      dimensions: {
        weight: '445 g',
        takeoffWeight: '610 g',
        size: '180×180×80 mm',
        wheelbase: '223 mm',
      },
    },
  },
  {
    id: 'iflight-mach-r5-sport',
    brand: 'iFlight',
    name: 'Mach R5 Sport',
    image: '/images/iflight-mach-r5-sport.png',
    price: 329,
    categories: {
      performance: {
        'topSpeed(km/h)': 208,
        'flightTime(min)': 12,
        'flightDistance(km)': 5,
        'altitude(m)': 6000,
      },
      video: {
        camera: 'Analog VTX',
        resolution: 'Analog',
        vtxPower: '600 mW',
      },
      battery: {
        cellCount: '6S',
        capacity: '1400 mAh',
      },
      dimensions: {
        weight: '300 g',
        takeoffWeight: '525 g',
        size: '148×148×51 mm',
        wheelbase: '210 mm',
      },
    },
  },
  {
    id: 'iflight-defender-20-lite',
    brand: 'iFlight',
    name: 'Defender 20 Lite',
    image: '/images/iflight-defender-20-lite.png',
    price: 829,
    categories: {
      performance: {
        'topSpeed(km/h)': 75,
        'flightTime(min)': 7,
        'flightDistance(km)': 5,
        'altitude(m)': 2000,
      },
      video: {
        camera: 'DJI O4 Air Unit',
        resolution: '4K',
        vtxPower: '100 Mbps',
      },
      battery: {
        cellCount: '2S',
        capacity: '600 mAh',
      },
      dimensions: {
        weight: '69 g',
        takeoffWeight: '108 g',
        size: '125×125×44.5 mm',
        wheelbase: '87 mm',
      },
    },
  },
  {
    id: 'iflight-afterburner-sport',
    brand: 'iFlight',
    name: 'Afterburner Sport',
    image: '/images/iflight-afterburner-sport.png',
    price: 679,
    categories: {
      performance: {
        'topSpeed(km/h)': 150,
        'flightTime(min)': 10,
        'flightDistance(km)': 10,
        'altitude(m)': 5000,
      },
      video: {
        camera: 'DJI O4 Air Unit',
        resolution: '4K',
        vtxPower: '100 Mbps',
      },
      battery: {
        cellCount: '6S',
        capacity: '1500 mAh',
      },
      dimensions: {
        weight: '350 g',
        takeoffWeight: '600 g',
        size: '190×190×80 mm',
        wheelbase: '250 mm',
      },
    },
  },
  {
    id: 'geprc-cinelog30-v3',
    brand: 'GEPRC',
    name: 'Cinelog30 V3',
    image: '/images/geprc-cinelog30-v3.png',
    price: 399,
    categories: {
      performance: {
        'topSpeed(km/h)': 80,
        'flightTime(min)': 8.2,
        'flightDistance(km)': 5,
        'altitude(m)': 3000,
      },
      video: {
        camera: 'DJI O4 Air Unit Pro',
        resolution: '4K',
        vtxPower: '50 Mbps',
      },
      battery: {
        cellCount: '4S',
        capacity: '660 mAh',
      },
      dimensions: {
        weight: '187 g',
        takeoffWeight: '189 g',
        size: '180×180×60 mm',
        wheelbase: '150 mm',
      },
    },
  },
  {
    id: 'geprc-moz7-v2',
    brand: 'GEPRC',
    name: 'MOZ7 V2',
    image: '/images/geprc-moz7-v2.png',
    price: 674,
    categories: {
      performance: {
        'topSpeed(km/h)': 120,
        'flightTime(min)': 25,
        'flightDistance(km)': 12,
        'altitude(m)': 6000,
      },
      video: {
        camera: 'DJI O4 Air Unit Pro',
        resolution: '4K',
        vtxPower: '50 Mbps',
      },
      battery: {
        cellCount: '6S',
        capacity: '3300 mAh',
      },
      dimensions: {
        weight: '750 g',
        takeoffWeight: '800 g',
        size: '300×300×100 mm',
        wheelbase: '290 mm',
      },
    },
  },
  {
    id: 'geprc-cinelog20-hd-o3',
    brand: 'GEPRC',
    name: 'Cinelog20 HD O3',
    image: '/images/geprc-cinelog20-hd-o3.png',
    price: 448,
    categories: {
      performance: {
        'topSpeed(km/h)': 70,
        'flightTime(min)': 5,
        'flightDistance(km)': 2,
        'altitude(m)': 1000,
      },
      video: {
        camera: 'DJI O3 Air Unit',
        resolution: '4K',
        vtxPower: '50 Mbps',
      },
      battery: {
        cellCount: '4S',
        capacity: '660 mAh',
      },
      dimensions: {
        weight: '140 g',
        takeoffWeight: '200 g',
        size: '100×100×50 mm',
        wheelbase: '87 mm',
      },
    },
  },
  {
    id: 'geprc-vapor-d5',
    brand: 'GEPRC',
    name: 'Vapor D5',
    image: '/images/geprc-vapor-d5.png',
    price: 749,
    categories: {
      performance: {
        'topSpeed(km/h)': 180,
        'flightTime(min)': 16,
        'flightDistance(km)': 10,
        'altitude(m)': 4000,
      },
      video: {
        camera: 'DJI O4 Air Unit Pro',
        resolution: '4K',
        vtxPower: '50 Mbps',
      },
      battery: {
        cellCount: '6S',
        capacity: '1300 mAh',
      },
      dimensions: {
        weight: '488 g',
        takeoffWeight: '698 g',
        size: '250×250×80 mm',
        wheelbase: '238 mm',
      },
    },
  },
];