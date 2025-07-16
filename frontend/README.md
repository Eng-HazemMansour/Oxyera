# Oxyera Healthcare Management System - Frontend

A modern healthcare management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Patient Management**: Add, view, and manage patient records
- **Medication Management**: Track medications with dosage and frequency
- **Treatment Assignments**: Assign medications to patients with treatment duration
- **Treatment Tracking**: Monitor remaining treatment days with color-coded status
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Query** - Server state management
- **React 19** - Latest React features

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The frontend connects to the NestJS backend running on port 8080. Make sure the backend server is running before using the frontend.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
├── components/            # React components
├── hooks/                 # Custom React hooks
├── services/             # API service functions
├── types/                # TypeScript type definitions
└── config/               # Configuration files
```
