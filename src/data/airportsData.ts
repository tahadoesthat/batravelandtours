export interface AirportItem {
  code: string;
  city: string;
  country: string;
  name: string;
}

export const POPULAR_AIRPORTS: AirportItem[] = [
  // Pakistan
  { code: 'LHE', city: 'Lahore', country: 'Pakistan', name: 'Allama Iqbal International' },
  { code: 'KHI', city: 'Karachi', country: 'Pakistan', name: 'Jinnah International' },
  { code: 'ISB', city: 'Islamabad', country: 'Pakistan', name: 'Islamabad International' },
  { code: 'PEW', city: 'Peshawar', country: 'Pakistan', name: 'Bacha Khan International' },
  { code: 'MUX', city: 'Multan', country: 'Pakistan', name: 'Multan International' },
  { code: 'SKT', city: 'Sialkot', country: 'Pakistan', name: 'Sialkot International' },
  { code: 'UET', city: 'Quetta', country: 'Pakistan', name: 'Quetta International' },
  { code: 'LYP', city: 'Faisalabad', country: 'Pakistan', name: 'Faisalabad International' },
  { code: 'KDU', city: 'Skardu', country: 'Pakistan', name: 'Skardu International' },
  { code: 'GIL', city: 'Gilgit', country: 'Pakistan', name: 'Gilgit Airport' },

  // Southeast Asia
  { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia', name: 'Kuala Lumpur International (KLIA)' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', name: 'Suvarnabhumi Airport' },
  { code: 'DMK', city: 'Bangkok', country: 'Thailand', name: 'Don Mueang International' },
  { code: 'HKT', city: 'Phuket', country: 'Thailand', name: 'Phuket International' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Changi Airport' },
  { code: 'DPS', city: 'Bali (Denpasar)', country: 'Indonesia', name: 'Ngurah Rai International' },
  { code: 'CGK', city: 'Jakarta', country: 'Indonesia', name: 'Soekarno-Hatta International' },
  { code: 'HAN', city: 'Hanoi', country: 'Vietnam', name: 'Noi Bai International' },
  { code: 'SGN', city: 'Ho Chi Minh City', country: 'Vietnam', name: 'Tan Son Nhat International' },

  // Middle East & Gulf
  { code: 'DXB', city: 'Dubai', country: 'UAE', name: 'Dubai International' },
  { code: 'DWC', city: 'Dubai', country: 'UAE', name: 'Al Maktoum International' },
  { code: 'AUH', city: 'Abu Dhabi', country: 'UAE', name: 'Zayed International' },
  { code: 'SHJ', city: 'Sharjah', country: 'UAE', name: 'Sharjah International' },
  { code: 'DOH', city: 'Doha', country: 'Qatar', name: 'Hamad International' },
  { code: 'JED', city: 'Jeddah', country: 'Saudi Arabia', name: 'King Abdulaziz International' },
  { code: 'MED', city: 'Madinah', country: 'Saudi Arabia', name: 'Prince Mohammad Bin Abdulaziz' },
  { code: 'RUH', city: 'Riyadh', country: 'Saudi Arabia', name: 'King Khalid International' },
  { code: 'BAH', city: 'Manama', country: 'Bahrain', name: 'Bahrain International' },
  { code: 'KWI', city: 'Kuwait City', country: 'Kuwait', name: 'Kuwait International' },
  { code: 'MCT', city: 'Muscat', country: 'Oman', name: 'Muscat International' },
  { code: 'IST', city: 'Istanbul', country: 'Turkey', name: 'Istanbul Airport' },
  { code: 'SAW', city: 'Istanbul', country: 'Turkey', name: 'Sabiha Gokcen International' },
  { code: 'AYT', city: 'Antalya', country: 'Turkey', name: 'Antalya Airport' },
  { code: 'GYD', city: 'Baku', country: 'Azerbaijan', name: 'Heydar Aliyev International' },
  { code: 'TAS', city: 'Tashkent', country: 'Uzbekistan', name: 'Islam Karimov Tashkent' },

  // Europe
  { code: 'LHR', city: 'London', country: 'United Kingdom', name: 'Heathrow Airport' },
  { code: 'LGW', city: 'London', country: 'United Kingdom', name: 'Gatwick Airport' },
  { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', name: 'Amsterdam Airport Schiphol' },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany', name: 'Frankfurt Airport' },
  { code: 'MUC', city: 'Munich', country: 'Germany', name: 'Munich Airport' },
  { code: 'FCO', city: 'Rome', country: 'Italy', name: 'Leonardo da Vinci–Fiumicino' },
  { code: 'MXP', city: 'Milan', country: 'Italy', name: 'Milan Malpensa' },
  { code: 'NAP', city: 'Naples (Amalfi)', country: 'Italy', name: 'Naples International' },
  { code: 'ZRH', city: 'Zurich', country: 'Switzerland', name: 'Zurich Airport' },
  { code: 'GVA', city: 'Geneva', country: 'Switzerland', name: 'Geneva Airport' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain', name: 'Barcelona–El Prat' },
  { code: 'MAD', city: 'Madrid', country: 'Spain', name: 'Adolfo Suarez Madrid–Barajas' },
  { code: 'VIE', city: 'Vienna', country: 'Austria', name: 'Vienna International' },
  { code: 'ATH', city: 'Athens', country: 'Greece', name: 'Athens International' },

  // East Asia
  { code: 'HND', city: 'Tokyo', country: 'Japan', name: 'Haneda Airport' },
  { code: 'NRT', city: 'Tokyo', country: 'Japan', name: 'Narita International' },
  { code: 'KIX', city: 'Osaka (Kyoto)', country: 'Japan', name: 'Kansai International' },
  { code: 'ICN', city: 'Seoul', country: 'South Korea', name: 'Incheon International' },
  { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong', name: 'Hong Kong International' },

  // North America
  { code: 'JFK', city: 'New York', country: 'USA', name: 'John F. Kennedy International' },
  { code: 'IAD', city: 'Washington DC', country: 'USA', name: 'Dulles International' },
  { code: 'ORD', city: 'Chicago', country: 'USA', name: 'O\'Hare International' },
  { code: 'LAX', city: 'Los Angeles', country: 'USA', name: 'Los Angeles International' },
  { code: 'SFO', city: 'San Francisco', country: 'USA', name: 'San Francisco International' },
  { code: 'YYZ', city: 'Toronto', country: 'Canada', name: 'Toronto Pearson International' },
  { code: 'YVR', city: 'Vancouver', country: 'Canada', name: 'Vancouver International' },
  { code: 'YUL', city: 'Montreal', country: 'Canada', name: 'Montréal–Trudeau International' },

  // Oceania & Africa
  { code: 'SYD', city: 'Sydney', country: 'Australia', name: 'Sydney Kingsford Smith' },
  { code: 'MEL', city: 'Melbourne', country: 'Australia', name: 'Melbourne Airport' },
  { code: 'JNB', city: 'Johannesburg', country: 'South Africa', name: 'O. R. Tambo International' },
  { code: 'CPT', city: 'Cape Town', country: 'South Africa', name: 'Cape Town International' },
  { code: 'CAI', city: 'Cairo', country: 'Egypt', name: 'Cairo International' },
];
