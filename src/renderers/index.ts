/**
 * Renderers module
 *
 * Re-exports all rendering/serialization functions
 */

// COMPACT serializer (AST -> COMPACT text)
export {
  serializeDocument,
  serializeWorkout,
  serializeContent,
  serializeDate,
  serializeWeight,
  serializeCustomFields,
} from './compact.js';

// Markdown renderer
export {
  renderDocumentToMarkdown,
  renderWorkoutToMarkdown,
  renderContentToMarkdown,
  type MarkdownOptions,
} from './markdown.js';

// Plain text renderer
export {
  renderDocumentToPlainText,
  renderWorkoutToPlainText,
  renderContentToPlainText,
  type PlainTextOptions,
} from './plaintext.js';
