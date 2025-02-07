import React, { useState, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode } from "lexical";
import styles from "./Editor.module.css";
import Button from "../Button/Button";

const Placeholder = () => (
  <div
    className={styles.placeholder}
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
      <div
      className={styles.editor}
      >
        <ContentEditable
          className={styles.input}
          onKeyDownCapture={(event) => handleKeyDown(event, editor)}
        />
        <Button
        className={styles.sendButton}
        data-tab="11" aria-label="Отправить"
        onClick={() => handleSendMessage(editor)}
        >


          <span aria-hidden="true" data-icon="send" class="">
            <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enable-background="new 0 0 24 24">
              <title>send</title>
              <path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
              </svg>
            </span>
          </Button>
      </div>
    );
  };


  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className={styles.editorContainer}
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
