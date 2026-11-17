# Smart Board Web App - Architecture

## Stack
- Frontend: React + Vite + JavaScript 
- Architecture: Layered + Modular
- Principles: SOLID
- State: Zustand
- PDF: PDF.js
- Drawing: HTML5 Canvas
- Real-time: SignalR
- Styling: CSS
- Testing: Vitest + React Testing Library

## Layers & Dependency Direction
Presentation -> Application -> Domain <- Infrastructure

- Presentation: React Components, Pages, Hooks. No Business Logic. No direct SignalR / PDF.js calls.
- Application: Use Cases, Commands, Application Services. Orchestrates Domain + Infrastructure via Interfaces.
- Domain: Entities (Slide, Annotation, ClassroomSession), Business Rules, Interfaces. No external libraries.
- Infrastructure: SignalR, PDF.js, Browser APIs, Storage. Implements Domain Interfaces.
- Shared: Constants, Utils, Reusable UI.

## SOLID Rules (Must Follow)
1. No God Components / God Classes.
2. Every Component / Class has one clear responsibility.
3. No Business Logic inside React Components.
4. No direct SignalR calls from UI Components.
5. Domain Layer must NOT depend on external libraries.
6. Use Dependency Injection via Composition Root (src/app/composition.js).
7. Use Reusable Services and Custom Hooks when needed.
8. Write Unit Tests for Business Logic.
9. Use JavaScript ES Modules, No TypeScript.
10. No over-engineering with Design Patterns without real need.

## Tools - Open/Closed Example
DrawingEngine must NOT contain if/else for tools.
Every tool is a separate class with same contract: draw(context, points)
- PenTool, EraserTool, LaserPointerTool (future), ShapeTool (future)
Adding a new tool = adding a new class only.

## Folder Structure
board/
  src/
    app/ (App.jsx, routes, providers, composition.js)
    domain/ (entities/, interfaces/, rules/)
    application/ (use-cases/, services/)
    infrastructure/ (pdf/, canvas/, signalr/, storage/, adapters/)
    presentation/ (components/, layouts/, hooks/, pages/)
    shared/ (components/, constants/, utils/)
    store/
  ARCHITECTURE.md
  README.md

## Communication Contract
- UI talks only to Application Layer.
- Application talks to Domain Interfaces.
- Infrastructure implements those Interfaces.
- To replace SignalR with Mock for tests, change only Infrastructure + Composition Root.