# Docsy

A collaborative document editor inspired by Google Docs, built with Next.js, Convex, and Liveblocks. Create, edit, and share documents in real-time with rich text editing, templates, and user presence features.

## Features

- **Real-time Collaboration:** Multiple users can edit documents simultaneously.
- **Rich Text Editing:** Supports formatting, font sizes, line heights, and more.
- **Document Templates:** Start quickly with pre-made templates (resumes, proposals, letters, etc.).
- **User Presence:** See who is currently viewing or editing a document.
- **Document Management:** Create, rename, and delete documents.
- **Responsive UI:** Works seamlessly on desktop and mobile devices.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Convex (serverless database & functions)
- **Real-time Collaboration:** Liveblocks
- **UI Components:** Custom and reusable components

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

## Project Structure

```
Docsy/
├── convex/                # Convex backend functions and schema
├── public/                # Static assets and SVG templates
├── src/
│   ├── app/               # Next.js app directory (pages, API routes)
│   ├── components/        # Shared React components
│   ├── constants/         # App-wide constants (templates, margins)
│   ├── extensions/        # Editor extensions (font size, line height)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── store/             # State management (editor store)
├── tailwind.config.ts     # Tailwind CSS configuration
├── package.json
└── README.md
```

## Scripts

- `npm run dev` — Start Next.js in development mode
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npx convex dev` — Start Convex backend locally

## Customization

- **Templates:** Add or modify document templates in `src/constants/templates.ts`.
- **Editor Extensions:** Extend editor functionality in `src/extensions/`.
- **UI Components:** Customize or add new components in `src/components/`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

[MIT](LICENSE)
