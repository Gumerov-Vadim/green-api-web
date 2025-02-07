import React, { useState, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode } from "lexical";

const Placeholder = () => (
  <div
    className="placeholder"
    style={{
      position: "absolute",
      top: "8px",
      left: "8px",
      color: "#aaa",
      pointerEvents: "none",
      fontSize: "14px",
    }}
  >
    Введите сообщение...
  </div>
);

const Editor = ({ onSendMessage }) => {
  const [editorContent, setEditorContent] = useState("");

  const initialConfig = {
    namespace: "ChatEditor",
    onError: (error) => console.error(error),
    theme: {
      placeholder: "placeholder",
    },
  };

  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const content = root.getTextContent();
      setEditorContent(content);
    });
  };

  const handleKeyDown = (event, editor) => {
    console.log("Key pressed:", event.key);
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
        root.clear();
        root.append($createParagraphNode());
      });
    }
  };

  const handleSendMessage = (editor) => {
    if (onSendMessage && editorContent.trim()) {
      onSendMessage(editorContent);
      setEditorContent("");
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        root.append($createParagraphNode());
      });
    }
  };

  const EditorContent = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      editor.focus();
    }, [editor]);

    return (
      <div className="flex flex-col">
        {/* Используем onKeyDownCapture вместо onKeyDown */}
        <ContentEditable
          className="content-editable outline-none"
          onKeyDownCapture={(event) => handleKeyDown(event, editor)}
          style={{
            whiteSpace: "pre-wrap",
            padding: "8px",
            minHeight: "50px",
            outline: "none",
          }}
        />
        <button
          onClick={() => handleSendMessage(editor)}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Отправить
        </button>
      </div>
    );
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className="editor-container border rounded"
        style={{
          padding: "0",
          position: "relative",
          minHeight: "50px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #fff",
          borderRadius: "8px",
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
