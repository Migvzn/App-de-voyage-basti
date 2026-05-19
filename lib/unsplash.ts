const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export interface UnsplashPhoto {
  url: string;
  blurUrl: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
}

const DESTINATION_QUERIES: Record<string, string> = {
  'Paris': 'paris,eiffel-tower,seine,france',
  'Rome': 'rome,colosseum,italy,vatican',
  'Barcelone': 'barcelona,sagrada-familia,spain',
  'Amsterdam': 'amsterdam,canals,netherlands',
  'Lisbonne': 'lisbon,portugal,alfama,tram',
  'Tokyo': 'tokyo,japan,shibuya,temple',
  'Bangkok': 'bangkok,thailand,temple,street',
  'Bali': 'bali,indonesia,rice-terrace,temple',
  'Dubai': 'dubai,burj-khalifa,skyline',
  'Santorini': 'santorini,greece,white-buildings,sea',
  'Marrakech': 'marrakech,morocco,medina,souk',
  'New York': 'new-york,manhattan,skyline,central-park',
  'Londres': 'london,big-ben,thames,uk',
  'Kyoto': 'kyoto,japan,geisha,temple,bamboo',
  'Prague': 'prague,czech,old-town,bridge',
  'default': 'travel,destination,landscape,architecture',
};

export function getUnsplashUrl(destination: string, width = 1600, height = 900): string {
  const query = DESTINATION_QUERIES[destination] ||
    DESTINATION_QUERIES['default'];

  if (UNSPLASH_ACCESS_KEY) {
    return `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&w=${width}&h=${height}&fit=crop&client_id=${UNSPLASH_ACCESS_KEY}`;
  }

  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}`;
}

export function getDestinationImage(destination: string, width = 800, height = 600): string {
  const query = DESTINATION_QUERIES[destination] ||
    `${destination.toLowerCase()},travel,city`;
  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}`;
}

// Static high-quality images for known destinations (reliable, always work)
export const DESTINATION_IMAGES: Record<string, string> = {
  'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&h=900&fit=crop',
  'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&h=900&fit=crop',
  'Barcelone': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1600&h=900&fit=crop',
  'Amsterdam': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&h=900&fit=crop',
  'Lisbonne': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&h=900&fit=crop',
  'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&h=900&fit=crop',
  'Bangkok': 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1600&h=900&fit=crop',
  'Bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&h=900&fit=crop',
  'Dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&h=900&fit=crop',
  'Santorini': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&h=900&fit=crop',
  'Marrakech': 'https://images.unsplash.com/photo-1539020140153-e479b8b22e78?w=1600&h=900&fit=crop',
  'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1600&h=900&fit=crop',
  'Londres': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=900&fit=crop',
  'Kyoto': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&h=900&fit=crop',
  'Prague': 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1600&h=900&fit=crop',
};

export function getStaticDestinationImage(destination: string, width = 800, height = 600): string {
  if (DESTINATION_IMAGES[destination]) {
    return DESTINATION_IMAGES[destination].replace('w=1600&h=900', `w=${width}&h=${height}`);
  }
  return `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=${width}&h=${height}&fit=crop`;
}
