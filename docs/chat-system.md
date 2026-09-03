# KajLagbe Module 08 — Advanced Communication & Chat System

## Overview
Module 08 establishes a secure, database-backed, real-time messaging system for KajLagbe. It enables context-aware messaging between Customers, Providers, and Businesses based on marketplace relationships (Job Applications, Bookings, Work Orders).

---

## Data Models

```
Conversation
  ├── ConversationParticipant (userId, unreadCount, lastReadAt)
  └── Message (senderId, content, type: TEXT/IMAGE/FILE/SYSTEM, status)
        └── MessageAttachment (fileUrl, fileType, fileName, fileSize)
```

- **Conversation Context Types**: `DIRECT`, `JOB_APPLICATION`, `BOOKING`, `WORK_ORDER`, `SUPPORT`
- **Message Types**: `TEXT`, `IMAGE`, `FILE`, `SYSTEM`
- **Message Statuses**: `SENT`, `DELIVERED`, `READ`

---

## Architecture & Real-Time Strategy
1. **Server-Side Authorization**: Conversations cannot be initiated without an authorized relationship (e.g. active job application or booking). Participant membership is strictly verified server-side on every REST and WebSocket invocation.
2. **Real-Time Gateway**: `ChatGateway` (NestJS WebSocket Gateway / Supabase Realtime) handles live message broadcasting to active room participants.
3. **Unread Counter Tracking**: Participant unread counts increment automatically on recipient message arrival and reset when `markAsRead()` is called.

---

## API Endpoints
- `GET /chat/conversations` — Inbox list with unread counters
- `POST /chat/conversations` — Get or create conversation with user
- `GET /chat/conversations/:id` — Conversation details (membership-checked)
- `GET /chat/conversations/:id/messages` — Paginated message history
- `POST /chat/conversations/:id/messages` — Send message
- `POST /chat/conversations/:id/read` — Mark messages as read

---

## Frontend Portals
- `/messages` — Searchable Inbox with context badges and unread counts.
- `/messages/[id]` — Real-time Chat Window with system message pills, attachment support, auto-scrolling timeline, and mobile-first composer.

