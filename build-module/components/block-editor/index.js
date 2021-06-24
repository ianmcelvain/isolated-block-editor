import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withDispatch } from '@wordpress/data';
import { KeyboardShortcuts } from '@wordpress/components';
import { rawShortcut } from '@wordpress/keycodes';
import { BlockEditorKeyboardShortcuts } from '@wordpress/block-editor';
import { EditorNotices } from '@wordpress/editor';
import { ReusableBlocksMenuItems } from '@wordpress/reusable-blocks';
/**
 * Internal dependencies
 */

import VisualEditor from './visual-editor';
import TextEditor from './text-editor';
import FullscreenMode from './fullscreen-mode';
import './style.scss';
/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */

/**
 * Undo/redo
 * @callback OnHistory
 */

/**
 * The editor component. Contains the visual or text editor, along with keyboard handling.
 *
 * Note: the keyboard handling is specific to this editor and *not* global
 *
 * @param {object} props - Component props
 * @param {boolean} props.isEditing - Are we editing in this editor?
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {object} props.children - Child components
 * @param {OnHistory} props.undo
 * @param {OnHistory} props.redo
 */

function BlockEditor(props) {
  const {
    isEditing,
    editorMode,
    children,
    undo,
    redo
  } = props;
  return createElement(Fragment, null, createElement(FullscreenMode, null), createElement(EditorNotices, null), isEditing && createElement(Fragment, null, createElement(BlockEditorKeyboardShortcuts, null), createElement(BlockEditorKeyboardShortcuts.Register, null)), createElement(KeyboardShortcuts, {
    bindGlobal: false,
    shortcuts: {
      [rawShortcut.primary('z')]: undo,
      [rawShortcut.primaryShift('z')]: redo
    }
  }, editorMode === 'visual' && createElement(VisualEditor, null), editorMode === 'text' && createElement(TextEditor, null)), children);
}

export default withDispatch(dispatch => {
  const {
    redo,
    undo
  } = dispatch('isolated/editor');
  return {
    redo,
    undo
  };
})(BlockEditor);
//# sourceMappingURL=index.js.map