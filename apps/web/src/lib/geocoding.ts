export interface DetectedLocation {
  latitude: number;
  longitude: number;
  division: string;
  district: string;
  area: string;
  formattedAddress: string;
}

// Fallback lookup table for Bangladesh coordinates bounding boxes
const BANGLADESH_REGIONS = [
  { nameEn: 'Dhaka', division: 'ঢাকা বিভাগ', district: 'ঢাকা উত্তর', latMin: 23.6, latMax: 24.0, lngMin: 90.2, lngMax: 90.6 },
  { nameEn: 'Chattogram', division: 'চট্টগ্রাম বিভাগ', district: 'চট্টগ্রাম সদর', latMin: 22.2, latMax: 22.6, lngMin: 91.7, lngMax: 92.1 },
  { nameEn: 'Sylhet', division: 'সিলেট বিভাগ', district: 'সিলেট সদর', latMin: 24.7, latMax: 25.0, lngMin: 91.7, lngMax: 92.0 },
  { nameEn: 'Rajshahi', division: 'রাজশাহী বিভাগ', district: 'রাজশাহী সদর', latMin: 24.3, latMax: 24.5, lngMin: 88.5, lngMax: 88.7 },
  { nameEn: 'Khulna', division: 'খুলনা বিভাগ', district: 'খুলনা সদর', latMin: 22.7, latMax: 23.0, lngMin: 89.4, lngMax: 89.7 },
  { nameEn: 'Barishal', division: 'বরিশাল বিভাগ', district: 'বরিশাল সদর', latMin: 22.6, latMax: 22.9, lngMin: 90.2, lngMax: 90.5 },
  { nameEn: 'Rangpur', division: 'রংপুর বিভাগ', district: 'রংপুর সদর', latMin: 25.6, latMax: 25.9, lngMin: 89.1, lngMax: 89.4 },
  { nameEn: 'Mymensingh', division: 'ময়মনসিংহ বিভাগ', district: 'ময়মনসিংহ সদর', latMin: 24.6, latMax: 24.9, lngMin: 90.3, lngMax: 90.6 },
];

export async function reverseGeocode(lat: number, lng: number): Promise<DetectedLocation> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`, {
      headers: {
        'Accept-Language': 'bn,en',
        'User-Agent': 'KajLagbe-BD-App/1.0',
      },
    });

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const district = addr.state_district || addr.district || addr.city || addr.county || 'ঢাকা উত্তর';
      const division = addr.state || 'ঢাকা বিভাগ';
      const area = addr.suburb || addr.neighbourhood || addr.residential || addr.town || addr.village || 'মিরপুর';

      return {
        latitude: lat,
        longitude: lng,
        division: division.includes('বিভাগ') ? division : `${division} বিভাগ`,
        district: district,
        area: area,
        formattedAddress: data.display_name || `${area}, ${district}`,
      };
    }
  } catch {
    // Fallback if Nominatim fails or network is offline
  }

  // Find closest matching Bangladesh region by coordinates
  const matched = BANGLADESH_REGIONS.find(
    (r) => lat >= r.latMin && lat <= r.latMax && lng >= r.lngMin && lng <= r.lngMax
  );

  if (matched) {
    return {
      latitude: lat,
      longitude: lng,
      division: matched.division,
      district: matched.district,
      area: matched.district,
      formattedAddress: `${matched.district}, ${matched.division}`,
    };
  }

  // Default fallback to Dhaka
  return {
    latitude: lat,
    longitude: lng,
    division: 'ঢাকা বিভাগ',
    district: 'ঢাকা উত্তর',
    area: 'মিরপুর-১০, ঢাকা',
    formattedAddress: 'মিরপুর-১০, ঢাকা উত্তর',
  };
}

