# EduBot Smart Board – Software Architecture

## 1. Project Overview

EduBot Smart Board is a React-based educational web application designed to work with an AI Robot Teacher.

The application provides two different user interface modes based on students' age groups:

- **Kids Mode:** Ages 4–11
- **Teens Mode:** Ages 12–18

The teacher controls the selected mode and can change it before or during an active lesson.

The application uses one shared Board Engine with two different presentation experiences.

## 2. Technology Stack

### Core Technologies
- React
- TypeScript
- Vite
- HTML5 Canvas

### Development Tools
- ESLint
- Git
- VS Code

### Planned Technologies
- PDF.js: PDF document rendering.
- SignalR: Real-time communication with the backend and Robot Teacher.
- Zustand: Global application state management.

Planned technologies will be integrated when their implementation requirements are clear.

## 3. Architectural Principles

The project follows a modular architecture based on Separation of Concerns and SOLID principles.

Main principles:

- Single Responsibility Principle (SRP)
- Open/Closed Principle (OCP)
- Dependency Inversion Principle (DIP)
- Dependency Injection
- Reusability
- Loose Coupling
- High Cohesion

The architecture separates business rules, application workflows, external technologies, and user interface components.

## 4. Application Modes

The application supports two presentation modes.

### 4.1 Kids Mode (4–11)

Design characteristics:
- Colorful and friendly interface.
- Large buttons and interactive controls.
- Simple navigation.
- Playful visual elements.
- Child-friendly layouts.

### 4.2 Teens Mode (12–18)

Design characteristics:
- Modern and professional interface.
- More compact controls.
- Structured layouts.
- Advanced visual organization.
- Minimal and controlled animations.

### 4.3 Mode Management

The teacher is responsible for selecting the application mode.

Mode selection is supported in two situations:

1. Before starting a lesson.
2. During an active lesson.

Changing the mode must update the presentation without resetting the current lesson state.

The following data must remain preserved during a mode transition:

- Current lesson.
- Current PDF document.
- Current slide.
- Canvas drawings.
- Annotations.
- Active lesson progress.

The mode change affects the UI presentation, not the underlying educational logic or Board Engine.

## 5. Shared Board Engine

Both modes use the same underlying Board Engine.

Shared capabilities include:

- Canvas Rendering.
- Drawing and Erasing.
- Annotations and Highlighting.
- PDF Rendering.
- Slide Navigation.
- Robot Command Execution.
- Board State Management.

The Board Engine must remain independent of the Kids and Teens presentation components.

## 6. Architecture Layers

### 6.1 Domain Layer

Responsible for core business entities, rules, and interfaces.

Contains:
- Entities.
- Enums.
- Repository Interfaces.
- Domain Rules.

Examples:
- BoardMode.
- BoardSession.
- Slide.
- Drawing.
- ICanvasEngine.

The Domain Layer must not depend on React or external infrastructure libraries.

### 6.2 Application Layer

Responsible for application workflows and use cases.

Contains:
- Use Cases.
- Application Services.
- Application-level orchestration.

Examples:
- ChangeBoardMode.
- StartLesson.
- LoadLesson.
- NavigateSlides.
- ExecuteBoardCommand.

Application workflows coordinate Domain logic and infrastructure abstractions.

### 6.3 Infrastructure Layer

Responsible for implementing external technical integrations.

Contains:
- Canvas Engine.
- PDF Renderer.
- SignalR Client.
- Storage Implementations.

This layer implements interfaces defined by the Domain or Application layers.

### 6.4 Presentation Layer

Responsible for everything displayed and interacted with by users.

Contains:

- Kids Mode UI.
- Teens Mode UI.
- Shared Components.
- Layouts.
- Custom Hooks.
- Teacher Controls.

Presentation components must not contain complex business logic.

### 6.5 Shared Layer

Contains reusable utilities and definitions shared across modules.

Examples:
- Common Types.
- Constants.
- Utility Functions.

### 6.6 Store Layer

Responsible for application-wide state management.

Planned state:
- Current Board Mode.
- Current Lesson.
- Current Slide.
- Board Session Status.
- Drawing State.

State management must be separated from presentation components.

## 7. Folder Structure

```text
src/
│
├── app/
│   ├── App.tsx
│   ├── routes/
│   └── providers/
│
├── domain/
│   ├── entities/
│   ├── enums/
│   ├── interfaces/
│   └── rules/
│
├── application/
│   ├── use-cases/
│   └── services/
│
├── infrastructure/
│   ├── canvas/
│   ├── pdf/
│   ├── signalr/
│   └── storage/
│
├── presentation/
│   ├── modes/
│   │   ├── kids/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── styles/
│   │   │
│   │   └── teens/
│   │       ├── components/
│   │       ├── pages/
│   │       └── styles/
│   │
│   ├── components/
│   │   ├── board/
│   │   ├── toolbar/
│   │   └── slides/
│   │
│   ├── layouts/
│   └── hooks/
│
├── shared/
│   ├── types/
│   ├── constants/
│   └── utils/
│
├── store/
│   ├── modeStore.ts
│   └── boardStore.ts
│
├── main.tsx
└── index.css
```

## 8. Dependency Rules

The architecture follows these dependency rules:

- Presentation depends on Application.
- Application depends on Domain.
- Infrastructure implements abstractions defined by inner layers.
- Domain does not depend on external frameworks.
- Kids and Teens modes share the same Application and Board Engine.
- Shared utilities must not contain business-specific logic.

Dependencies should flow toward the core business logic.

## 9. Mode Switching Workflow

The mode switching process follows these steps:

1. The teacher selects a new mode.
2. The Presentation Layer sends the request to the Application Layer.
3. ChangeBoardMode validates and processes the request.
4. The application updates the current mode state.
5. The Presentation Layer renders the corresponding UI.
6. The existing Board Engine and lesson state remain active.

Mode switching must not recreate or unnecessarily reset the shared Board Engine.

## 10. Robot Integration

The Smart Board receives commands from the Robot Teacher through the communication layer.

Example commands:

- NEXT_SLIDE
- PREVIOUS_SLIDE
- DRAW_LINE
- HIGHLIGHT
- CLEAR_CANVAS

The communication layer is responsible for receiving and translating commands into application operations.

Robot communication must remain independent of the visual mode.

## 11. Development Strategy

Development will follow these stages:

1. Environment Setup.
2. Architecture and Project Structure.
3. Domain Models and Interfaces.
4. Application Use Cases.
5. Mode Management.
6. Shared Board Engine.
7. Kids Mode UI.
8. Teens Mode UI.
9. PDF Rendering.
10. Robot Integration.
11. Testing and Performance Optimization.

## 12. Quality Requirements

The application should prioritize:

- Maintainable and modular code.
- Reusable components.
- Responsive and consistent rendering.
- Smooth mode transitions.
- Reliable drawing operations.
- Stable real-time communication.
- Preservation of lesson state.
- Clear separation of responsibilities.

## 13. Architecture Goal

The main architectural goal is to build one extensible Smart Board platform that supports two distinct educational presentation experiences without duplicating the underlying business logic or Board Engine.

The system should remain maintainable, testable, and ready for future educational features.
