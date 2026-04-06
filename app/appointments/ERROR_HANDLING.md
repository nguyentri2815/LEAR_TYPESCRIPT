# Production Error Handling Pattern

This document outlines the production-ready error handling patterns implemented in the appointments module.

## Overview

The error handling system classifies errors into two categories:
1. **Retryable errors** (network, 5xx) → Show "Retry" button
2. **Non-retryable errors** (4xx client) → Show guidance without retry

## Components

### 1. ErrorState Component
**Location:** `components/ui/ErrorState.tsx`

Used for query/fetch failures with retry capability.

```tsx
<ErrorState
  title="Unable to load"
  error={error}
  onRetry={handleRetry}
  isRetrying={isLoading}
  showDetails={isDevelopment}
/>
```

**Features:**
- Retry button (only if error is retryable)
- Reload page button (fallback)
- Error details (dev mode only)
- Accessible (role="alert")
- User-friendly messaging

**When to use:**
- Data fetching failures in AppointmentsSectionContent
- API call errors
- Any operation that can be retried

### 2. AlertError Component
**Location:** `components/ui/AlertError.tsx`

Simple inline error display for forms and mutations.

```tsx
<AlertError message="Failed to create appointment" />
```

**Features:**
- Minimal styling (red alert box)
- Accessible (role="alert")
- Quick message display

**When to use:**
- Form submission errors
- Mutation errors in modals
- Inline validation errors

## Error Classification

**Location:** `utils/errorClassification.ts`

Automatically classifies errors into actionable categories.

```tsx
const classified = classifyError(error);

if (classified.isRetryable) {
  // Show retry button
} else {
  // Show informational message
}
```

**Classification Logic:**

| Error Type | Status | Retryable | Example |
|---|---|---|---|
| Network Error | N/A | ✅ Yes | "Network connection failed" |
| Server Error | 5xx | ✅ Yes | "Something went wrong on our end" |
| Client Error | 4xx | ❌ No | "Invalid request", "Not found" |
| Unknown Error | N/A | ✅ Yes | Fallback to safe option |

## Integration Points

### Query Failures (AppointmentsSectionContent)
```tsx
// Hook provides:
appointments: {
  isError: boolean;
  errorMessage: string;
  isErrorRetryable: boolean;
  error: Error | null;
}

handlers: {
  refetch: () => Promise<void>;
}

// Usage:
if (appointments.isError) {
  return (
    <ErrorState
      error={appointments.errorMessage}
      onRetry={appointments.isErrorRetryable ? handlers.refetch : undefined}
    />
  );
}
```

### Mutation Failures (Modals)
```tsx
// Modal receives error from mutation:
createMutation.isError ? (
  <AlertError message={createMutation.error?.message} />
) : null
```

## Hook Updates

### useAppointmentsPageState
Now exposes:
- `appointments.errorMessage` - User-friendly message
- `appointments.isErrorRetryable` - Should show retry button
- `handlers.refetch()` - Async refetch with error handling

## Best Practices

### 1. Always Show Error to User
```tsx
// ❌ BAD: Silent failure
if (error) {
  return null; // User doesn't know why nothing loaded
}

// ✅ GOOD: Show error with recovery path
if (error) {
  return <ErrorState error={error} onRetry={handleRetry} />;
}
```

### 2. Classify Before Showing
```tsx
// ❌ BAD: Show same message for all errors
return <ErrorState error={error} />;

// ✅ GOOD: Use classification to customize UX
const classified = classifyError(error);
return (
  <ErrorState
    error={classified.userMessage}
    onRetry={classified.isRetryable ? retry : undefined}
  />
);
```

### 3. Provide Recovery Path
```tsx
// ❌ BAD: Dead end
<ErrorState title="Something went wrong" />

// ✅ GOOD: Options to recover
<ErrorState
  error={error}
  onRetry={retry}  // Retry the operation
  // OR reload page  (fallback)
/>
```

### 4. Consistent Messaging
```tsx
// Use error classification's standardized messages
// They're already user-friendly and translated/consistent

const classified = classifyError(error);
return <ErrorState error={classified.userMessage} />;
```

### 5. Accessibility
All error states include:
- `role="alert"` to announce to screen readers
- Clear visual styling (red styling)
- Semantic HTML

## Common Error Scenarios

### Scenario 1: Network Offline
```
Classification: Network error
Retryable: Yes
User sees: "Unable to connect. Check your internet."
Actions: Retry button available
```

### Scenario 2: Server Down (503)
```
Classification: Server error (5xx)
Retryable: Yes
User sees: "Something went wrong on our end. Try again."
Actions: Retry button available
```

### Scenario 3: Not Found (404)
```
Classification: Client error (4xx)
Retryable: No
User sees: "The requested resource was not found."
Actions: Only Reload Page button
```

### Scenario 4: Invalid Data (400)
```
Classification: Client error (4xx)
Retryable: No
User sees: "Invalid request. Check your input."
Actions: Only Reload Page button (user should fix form)
```

## Error Logging (Future)

For production monitoring, classify errors before logging:

```tsx
import { formatErrorForLogging } from "./errorClassification";

const classified = classifyError(error);
const logPayload = formatErrorForLogging(classified);

// Send to telemetry service
telemetry.logError(logPayload);
```

Log data includes:
- Error code (NETWORK_ERROR, HTTP_500, etc.)
- Whether it's retryable
- HTTP status if applicable
- Timestamp

## File Structure

```
app/appointments/
├── components/
│   ├── ui/
│   │   ├── ErrorState.tsx       # Query error display with retry
│   │   ├── AlertError.tsx        # Inline error alert
│   │   └── EmptyState.tsx        # True empty state (0 results)
│   ├── AppointmentsSectionContent.tsx  # Uses ErrorState for queries
│   └── AppointmentsSectionModals.tsx   # Uses AlertError for mutations
├── hooks/
│   └── useAppointmentsPageState.ts    # Exposes error classification
├── utils/
│   └── errorClassification.ts          # Error classification logic
└── ...
```

## Testing

### Test Error Classification
```tsx
import { classifyError } from "./errorClassification";

// Network error
const netError = new Error("Failed to fetch");
expect(classifyError(netError).isRetryable).toBe(true);

// 404 error
const notFoundError = { status: 404 };
expect(classifyError(notFoundError).isRetryable).toBe(false);

// 500 error
const serverError = { status: 500 };
expect(classifyError(serverError).isRetryable).toBe(true);
```

### Test ErrorState Rendering
```tsx
// Retryable error shows retry
<ErrorState
  error={{ message: "Network error" }}
  onRetry={mockRetry}
/>
expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();

// Non-retryable error hides retry
<ErrorState
  error={{ message: "Not found" }}
  onRetry={undefined}
/>
expect(screen.queryByRole("button", { name: /retry/i })).not.toBeInTheDocument();
```

## Migration Checklist

When integrating with other components:

- [ ] Replace EmptyState error usage with ErrorState
- [ ] Add AlertError to form/mutation error displays
- [ ] Update hook to expose error classification
- [ ] Pass handlers.refetch to ErrorState
- [ ] Test all 4 error types (network, 5xx, 4xx, unknown)
- [ ] Ensure role="alert" is present
- [ ] Verify error messages are user-friendly
- [ ] Add error logging/telemetry integration
