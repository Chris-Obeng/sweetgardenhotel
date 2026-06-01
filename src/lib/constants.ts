export const HOTEL = {
  name: "Sweet Garden Hotel",
  tagline: "A Garden Oasis",
  sub_tagline: "Where Luxury Meets Nature",
  description: "Nestled in the serene Danyame Estates of Kumasi, Sweet Garden Hotel is a tropical sanctuary where lush gardens meet world-class hospitality. With 25 beautifully appointed guestrooms, 5 private event spaces, an outdoor pool, spa, and multiple dining venues, we offer premium comfort at an accessible rate — the finest welcome in the Garden City.",
  phone: "+233 54 590 3454",
  address: "Danyame Estates, Kumasi, Ghana",
  location: "Danyame Estates, Kumasi, Ashanti Region, Ghana",
  checkIn: "14:00",
  checkOut: "11:30",
  email: "reservations@sweetgardenhotel.com"
};

export const NAV_LINKS = [
  { href: "#rooms", label: "Rooms" },
  { href: "#dining", label: "Dining" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#about", label: "About" },
];

export const ROOMS = [
  { id: 1, name: "Deluxe Double Room", description: "A serene retreat with garden views, a plush king-size bed, rainfall shower, and premium bedding crafted for deep rest.", size: 38, guests: 2, features: ["Garden View", "King Bed", "Rainfall Shower", "Mini Bar", "Smart TV", "Free WiFi"], imagePath: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
  { id: 2, name: "Deluxe Twin Room", description: "Elegant and versatile — ideal for two guests travelling together, with twin beds and a calming garden outlook.", size: 38, guests: 2, features: ["Garden View", "Twin Beds", "Work Desk", "Rainfall Shower", "Smart TV", "Free WiFi"], imagePath: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80" },
  { id: 3, name: "Executive Double Room", description: "Our most refined room — elevated finishes, a king bed, pool or garden view, and dedicated concierge service.", size: 48, guests: 2, features: ["Pool or Garden View", "King Bed", "Premium Amenities", "Lounge Chair", "24hr Room Service", "Free WiFi"], imagePath: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" },
];

export const DINING = [
  { title: "Main Restaurant", tag: "All-Day Dining", description: "Ghanaian specialties and international cuisine from breakfast through dinner, served in our signature dining room." },
  { title: "Poolside Bar & Grill", tag: "Pool & Garden", description: "BBQ, grills, spicy chicken wings, and cold Club beer served poolside under the open sky." },
  { title: "Chinese Kitchen", tag: "Specialty Kitchen", description: "Authentic Chinese cuisine: dim sum, stir-fries, soups, and seasonal chef's specials." },
  { title: "Garden Terrace", tag: "Garden Dining", description: "Al fresco breakfast with fresh Ghanaian fruit, continental spreads, and the morning garden in bloom." },
];

export const EVENTS = [
  { id: 1, title: "Corporate Meetings", category: "Business", description: "Private rooms with AV equipment, climate control, and dedicated catering service.", imagePath: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { id: 2, title: "Birthday Celebrations", category: "Celebration", description: "VIP rooms with karaoke, personalized décor, and signature menus.", imagePath: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80" },
  { id: 3, title: "Bridal Showers", category: "Celebration", description: "Intimate garden or VIP lounge settings with floral arrangements.", imagePath: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80" },
  { id: 4, title: "Proposal Nights", category: "Romance", description: "Candlelit pool terraces, bespoke menus, and floral arrangements for your perfect moment.", imagePath: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80" },
  { id: 5, title: "Anniversary Dinners", category: "Romance", description: "Restaurant VIP room or front garden under the stars with butler service.", imagePath: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" },
  { id: 6, title: "Corporate Dinners", category: "Business", description: "Private dining with international menus and dedicated butler service.", imagePath: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80" },
];

export const PRIVATE_SPACES = [
  { name: "Pool VIP Room", capacity: 50, highlight: "Direct pool access", imagePath: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80" },
  { name: "Rooftop VIP Room", capacity: 40, highlight: "Panoramic city views", imagePath: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" },
  { name: "Restaurant VIP Room", capacity: 60, highlight: "Full dining service", imagePath: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80" },
  { name: "Front Garden", capacity: 100, highlight: "Outdoor tropical setting", imagePath: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80" },
];

export const FACILITIES = [
  { name: "Outdoor Pool", icon: "Waves", description: "Shimmering centrepiece of the estate, open daily 6am–10pm." },
  { name: "Spa & Massage", icon: "Leaf", description: "Swedish, deep tissue, and local traditional treatments." },
  { name: "Fitness Center", icon: "Dumbbell", description: "Modern gym with cardio and weights, open 24 hours." },
  { name: "Pool Table & Games", icon: "Circle", description: "Full-size pool table and table tennis available all day." },
  { name: "Free Parking", icon: "Car", description: "Complimentary secure parking within the estate grounds." },
  { name: "Free WiFi", icon: "Wifi", description: "Superfast WiFi in all rooms and throughout the grounds." },
  { name: "24hr Room Service", icon: "UtensilsCrossed", description: "Full restaurant menu delivered to your room any time." },
  { name: "Laundry & Dry Cleaning", icon: "Wind", description: "Same-day service on request at the front desk." },
];

export const LOCATION_LANDMARKS = [
  { name: "Prempeh I International Airport", distance: "10 min", direction: "6.5 km" },
  { name: "Kumasi City Mall", distance: "5 min", direction: "drive" },
  { name: "Baba Yara Stadium", distance: "10 min", direction: "drive" },
  { name: "Adum Business District", distance: "12 min", direction: "drive" },
  { name: "Kumasi Golf Club", distance: "8 min", direction: "drive" },
  { name: "Ghana Armed Forces Museum", distance: "5 min", direction: "drive" },
  { name: "Kejetia Market", distance: "15 min", direction: "drive" },
  { name: "Okomfo Anokye Sword Site", distance: "18 min", direction: "drive" },
  { name: "Rattray Park", distance: "5 min", direction: "drive" },
];

export const STATS = [
  { number: "25", label: "Guest Rooms" },
  { number: "10+", label: "Years of Excellence" },
  { number: "5", label: "Private Event Spaces" },
  { number: "4.8", label: "Guest Rating" },
];

export const TESTIMONIALS = [
  { quote: "A garden oasis. My new go-to place in Kumasi. Great service and fantastic food. Nothing like an ice cold poolside drink with spicy chicken wings.", author: "David R.", source: "TripAdvisor" },
  { quote: "What a decent, serene and tranquil atmosphere. Perfect lights, a decent pool, an excellent place for events. The staff were gentle and hospitable.", author: "Kwame A.", source: "Google Reviews" },
  { quote: "Beautiful and clean environment, sparkling pool, nice food and friendly service. We loved everything about the hotel and will recommend to all visitors in Kumasi.", author: "Akosua & Family", source: "Booking.com" },
];