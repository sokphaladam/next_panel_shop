# Client-Side Pagination Components

This project includes several illustrative pagination components designed for client-side data pagination in React applications.

## Components

### 1. AdvancedPagination

A full-featured pagination component with comprehensive controls.

**Features:**

- Page number buttons with ellipsis for large page counts
- Jump to specific page input field
- Items per page selector with customizable options
- First/Last page quick navigation buttons
- Responsive design that adapts to different screen sizes
- Detailed item count display with formatting
- Accessibility features

**Usage:**

```tsx
import { AdvancedPagination } from "@/components/ui/advanced-pagination";

<AdvancedPagination
  currentPage={currentPage}
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
  onPageChange={setCurrentPage}
  onItemsPerPageChange={handleItemsPerPageChange}
  showJumpToPage={true}
  showItemsPerPageSelector={true}
  pageSizeOptions={[10, 25, 50, 100]}
/>;
```

### 2. SimplePagination

A clean and minimal pagination component for simpler use cases.

**Features:**

- Previous/Next navigation buttons
- Current page indicator with total pages
- Optional item count display
- First/Last page quick navigation
- Compact mode for space-constrained layouts
- Mobile-friendly responsive design

**Usage:**

```tsx
import { SimplePagination } from "@/components/ui/simple-pagination";

// Standard mode
<SimplePagination
  currentPage={currentPage}
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
  onPageChange={setCurrentPage}
  showItemCount={true}
  compact={false}
/>

// Compact mode
<SimplePagination
  currentPage={currentPage}
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
  onPageChange={setCurrentPage}
  showItemCount={true}
  compact={true}
/>
```

### 3. Base Pagination Components

Low-level pagination UI components based on shadcn/ui design system.

Located in `@/components/ui/pagination.tsx`, these provide the building blocks:

- `Pagination` - Container wrapper
- `PaginationContent` - Content wrapper
- `PaginationItem` - Individual page item
- `PaginationLink` - Clickable page link
- `PaginationNext` - Next button
- `PaginationPrevious` - Previous button
- `PaginationEllipsis` - Ellipsis indicator

## Hooks

### useClientPagination

A custom hook that manages pagination state and provides helper functions.

**Features:**

- Current page state management
- Items per page configuration
- Automatic page reset when changing page size
- Route change handling
- Pagination calculation utilities
- Data slicing helper

**Usage:**

```tsx
import { useClientPagination } from "@/hook/usePagination";

const {
  currentPage,
  setCurrentPage,
  itemsPerPage,
  handleItemsPerPageChange,
  getPaginatedData,
  getPaginationInfo,
} = useClientPagination();

// Use with data
const paginatedData = getPaginatedData(filteredData);
const paginationInfo = getPaginationInfo(filteredData.length);
```

## Implementation Examples

### UserListScreen

The original implementation showing basic client-side pagination with the AdvancedPagination component.

**File:** `src/screen/user/UserListScreen.tsx`

### UserListScreenWithHook

Enhanced implementation demonstrating the useClientPagination hook with multiple pagination styles.

**File:** `src/screen/user/UserListScreenWithHook.tsx`

**Features:**

- Dynamic pagination style switching
- Hook-based state management
- Enhanced filtering and search
- Multiple pagination component examples

### PaginationDemo

A comprehensive demo page showcasing all pagination components with sample data.

**File:** `src/components/PaginationDemo.tsx`
**Route:** `/pagination-demo`

## Key Features

### Client-Side Benefits

- **No Server Requests**: All pagination happens in the browser
- **Instant Response**: No loading time between pages
- **Enhanced UX**: Smooth transitions and immediate feedback
- **Offline Capability**: Works without network connection
- **Reduced Server Load**: Less API calls

### Responsive Design

- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly button sizes
- Collapsible controls on smaller screens

### Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management

### Performance

- Efficient data slicing
- Memoized calculations
- Optimized re-renders
- Lightweight components

## Customization

### Styling

All components use Tailwind CSS classes and can be customized through:

- `className` props for additional styling
- CSS custom properties
- Tailwind configuration
- Component style overrides

### Functionality

Components accept various props for customization:

- `showJumpToPage` - Enable/disable jump to page feature
- `showItemsPerPageSelector` - Show/hide page size selector
- `pageSizeOptions` - Customize available page sizes
- `compact` - Toggle compact mode for space-saving

### Integration

Easy integration with:

- GraphQL queries
- REST APIs
- Local state management
- Search and filtering systems
- URL-based pagination (with additional routing setup)

## Best Practices

1. **Data Fetching**: Fetch larger datasets upfront for better client-side performance
2. **Memory Management**: Consider virtualization for very large datasets
3. **User Experience**: Reset to page 1 when filters change
4. **Persistence**: Save pagination state in URL or local storage if needed
5. **Performance**: Use useMemo for expensive filtering operations
6. **Accessibility**: Always provide proper labels and keyboard navigation

## Browser Compatibility

- Modern browsers with ES6+ support
- React 18+
- Next.js 13+ (with app router)
- TypeScript support included
