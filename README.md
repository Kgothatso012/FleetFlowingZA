# FleetFlowingZA 🚛

> Fleet tracking logistics app built with Expo React Native — real-time vehicle monitoring for South African transport operators.

FleetFlowingZA brings real-time GPS tracking, driver communication, and delivery confirmation to South African logistics operators. Built for the SA market with support for local regulatory requirements.

## Features

- **Live Vehicle Tracking** — Real-time GPS on map for all fleet vehicles
- **Driver App** — Check-in, route navigation, delivery confirmation
- **Dispatch Console** — Fleet manager view with all active trips
- **SA Address Support** — Addresses autocomplete for South African locations
- **Proof of Delivery** — Photo + signature capture per delivery
- **Trip History** — Full audit trail of completed trips and routes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | React Native + Expo |
| Maps | react-native-maps |
| Backend | Supabase (Auth, DB, Realtime) |
| Navigation | React Navigation |
| State | Zustand |
| Push | Expo Notifications |

## Getting Started

```bash
# Clone
git clone https://github.com/Kgothatso012/FleetFlowingZA.git
cd FleetFlowingZA

# Install
npm install

# Run development
npx expo start

# Build for production
npx expo build:android --release
```

## Project Structure

```
FleetFlowingZA/
├── App.tsx
├── src/
│   ├── screens/
│   │   ├── driver/         # Driver app screens
│   │   └── dispatcher/     # Fleet manager screens
│   ├── components/
│   ├── services/           # Supabase + Maps
│   ├── store/
│   └── types/
└── supabase/
    └── schema.sql
```

## License

MIT
