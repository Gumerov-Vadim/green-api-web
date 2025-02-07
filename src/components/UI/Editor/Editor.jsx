import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode } from "lexical";

const Placeholder = () => <div className="placeholder">Напишите сообщение...</div>;

const Editor = ({ onSendMessage }) => {
  const initialConfig = {
    namespace: "ChatEditor",
    onError: (error) => console.error(error),
    theme: {
      placeholder: "placeholder",
    },
  };

  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      console.log("Editor content updated!");
    });
  };

  const handleKeyDown = (event, editor) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const text = editor.getEditorState().read(() => {
        const root = $getRoot();
        return root.getTextContent();
      });

      if (onSendMessage) onSendMessage(text);
      // Очистка содержимого редактора
      editor.update(() => {
        const root = $getRoot();
        root.clear(); // Удаляем текущее содержимое
        root.append($createParagraphNode()); // Создаем новый пустой параграф
      });
    }
  };

  const EditorContent = () => {
    const [editor] = useLexicalComposerContext();

    return (
      <ContentEditable
        className="content-editable outline-none"
        style={{ whiteSpace: "pre-wrap" }}
        onKeyDown={(event) => handleKeyDown(event, editor)}
      />
    );
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className="editor-container border rounded p-2"
        style={{
          minHeight: "50px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <RichTextPlugin
          contentEditable={<EditorContent />}
          placeholder={<Placeholder />}
          errorBoundary={(error) => <div>Ошибка редактора: {error.message}</div>}
        />
        <OnChangePlugin onChange={handleEditorChange} />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};

export default Editor;
