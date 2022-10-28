import { EditorState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './texteditor.css';

const Texteditor = ({
  editorState,
  setEditorState,
  MAX_LENGTH,
  placeholder,
}) => {
  let editorClassName = 'editorClass';

  //If using any type of list in the editor as first option
  //placeholder will stick around
  //Remove placeholder by adding class to editor to set placeholder display to none
  const contentState = editorState.editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      editorClassName = editorClassName + ' editorClass-hidePlaceholder';
    }
  }

  const handleEditorChange = (e) => {
    setEditorState({ editorState: e });
  };

  //check if editor has exceeded max word count
  //return handled if it has
  const handleBeforeInput = (input) => {
    const inputLength = editorState.editorState
      .getCurrentContent()
      .getPlainText().length;
    if (input && inputLength >= MAX_LENGTH) {
      return 'handled';
    }
  };

  //handles copy paste
  //slice pasted content based on remaining word count
  const handlePastedText = (input) => {
    const length = editorState.editorState
      .getCurrentContent()
      .getPlainText().length;
    const remaining = MAX_LENGTH - length;
    if (input.length + length >= MAX_LENGTH) {
      const newContent = Modifier.insertText(
        editorState.editorState.getCurrentContent(),
        editorState.editorState.getSelection(),
        input.slice(0, remaining)
      );
      const neweditorState = EditorState.push(
        editorState.editorState,
        newContent,
        'insert-characters'
      );
      setEditorState({ editorState: neweditorState });
      return true;
    } else {
      return false;
    }
  };
  return (
    <Editor
      editorState={editorState.editorState}
      onEditorStateChange={handleEditorChange}
      wrapperClassName='wrapperClass'
      editorClassName={editorClassName}
      toolbarClassName='toolbarClass'
      handleBeforeInput={handleBeforeInput}
      handlePastedText={handlePastedText}
      stripPastedStyles={true}
      placeholder={placeholder}
      toolbar={{
        options: ['inline', 'list', 'link', 'emoji', 'fontSize'],
        list: {
          inDropdown: false,
          options: ['unordered', 'ordered'],
        },
        fontSize: {
          options: [10, 12, 14, 16, 18, 20, 24, 30],
        },
        link: {
          options: ['link'],
        },
        emoji: {
          emojis: [
            '😀',
            '😁',
            '😂',
            '😃',
            '😉',
            '😋',
            '😎',
            '😍',
            '😗',
            '🤗',
            '🤔',
            '😣',
            '😫',
            '😴',
            '😌',
            '🤓',
            '😛',
            '�',
            '😠',
            '😇',
            '😷',
            '😈',
            '👻',
            '😺',
            '😸',
            '😹',
            '😻',
            '😼',
            '😽',
            '🙀',
            '🙈',
            '🙉',
            '�',
            '👼',
            '👮',
            '🕵',
            '💂',
            '👳',
            '🎅',
            '👸',
            '👰',
            '👲',
            '🙍',
            '🙇',
            '🚶',
            '🏃',
            '💃',
            '⛷',
            '🏂',
            '🏌',
            '🏄',
            '🚣',
            '🏊',
            '⛹',
            '🏋',
            '🚴',
            '👫',
            '💪',
            '👈',
            '👉',
            '👉',
            '👆',
            '🖕',
            '👇',
            '',
            '🤘',
            '🖐',
            '👌',
            '👍',
            '👎',
            '✊',
            '👊',
            '👏',
            '🙌',
            '🙏',
            '🐵',
            '🐶',
            '🐇',
            '🐥',
            '🐸',
            '',
            '🐛',
            '🐜',
            '🐝',
            '🍉',
            '🍄',
            '🍔',
            '🍤',
            '🍨',
            '🍪',
            '🎂',
            '🍰',
            '🍾',
            '🍷',
            '🍸',
            '🍺',
            '🌍',
            '🚑',
            '⏰',
            '🌙',
            '🌝',
            '🌞',
            '⭐',
            '🌟',
            '🌠',
            '🌨',
            '🌩',
            '⛄',
            '🔥',
            '🎄',
            '🎈',
            '🎉',
            '🎊',
            '🎁',
            '🎗',
            '🏀',
            '🏈',
            '🎲',
            '🔇',
            '🔈',
            '📣',
            '🔔',
            '🎵',
            '🎷',
            '�',
            '🖊',
            '�',
            '✅',
            '❎',
            '💯',
          ],
        },
      }}
    />
  );
};

export default Texteditor;
