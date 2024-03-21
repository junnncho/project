// import '@blocknote/react/style.css';
import {
  BlockNoteView,
  useCreateBlockNote,
  DefaultReactSuggestionItem,
  SuggestionMenuController,
  SuggestionMenuProps,
  getDefaultReactSlashMenuItems,
} from '@blocknote/react';
import { useApi } from '@junblog/frontend/stores/server';
import { useEffect, useRef, useState } from 'react';
import { useFlowStore } from '@junblog/frontend/stores/client';
import { Ani } from '../common';
import { RiAlertFill } from 'react-icons/ri';
import { Alert } from './block/CheckBlock';
import { filterSuggestionItems, BlockNoteSchema, insertOrUpdateBlock, defaultBlockSpecs } from '@blocknote/core';

interface EditorViewProps {
  view?: boolean;
  data?: any;
}
function CustomSlashMenu(props: SuggestionMenuProps<DefaultReactSuggestionItem>) {
  console.log(props);
  return (
    <div className={'slash-menu grid grid-cols-3'}>
      {props.items.map((item, index) => (
        <Ani.ButtonY
          key={index}
          className={`slash-menu-item${props.selectedIndex === index ? ' selected' : ''} main-node slash-button`}
          onClick={() => {
            props.onItemClick?.(item);
          }}
        >
          {item.icon}
        </Ani.ButtonY>
      ))}
    </div>
  );
}
const schema =
  BlockNoteSchema &&
  BlockNoteSchema.create({
    blockSpecs: {
      // Adds all default blocks.
      ...defaultBlockSpecs,
      // Adds the Alert block.
      alert: Alert,
    },
  });

// Slash menu item to insert an Alert block
const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
  title: 'Alert',

  onItemClick: () => {
    console.log('!!!');
    insertOrUpdateBlock(editor, { type: 'alert' });
  },
  aliases: ['alert', 'notification', 'emphasize', 'warning', 'error', 'info', 'success'],
  group: 'Other',
  icon: <RiAlertFill />,
});

export const EditorView = ({ view = false, data }: EditorViewProps) => {
  const temp = useRef<any>(null);
  const currentNode = useFlowStore((state) => state.currentNode);
  const update = useApi.useUpdateText();

  const option = {
    ...(data && {
      initialContent: data.blocks,
      uploadFile: (file: File) => useApi.uploadFile(file),
    }),
    ...(schema && { schema }),
  };
  console.log('OP', option);

  const editor = useCreateBlockNote(option);

  useEffect(() => {
    temp.current = null;
    if (!view && currentNode) {
      if (editor) {
        const interval = setInterval(async () => {
          const blocks = editor.document;
          temp.current = blocks;
          blocks && blocks.length > 0 && update.mutate({ blocks, current: currentNode });
        }, 5000);
        return () => {
          temp.current && temp.current.length > 0 && update.mutate({ blocks: temp.current, current: currentNode });
          clearInterval(interval);
        };
        // }
      }
    }
  }, [currentNode, view, editor]);
  // Creates a new editor instance.

  return (
    <div className="h-full">
      <BlockNoteView editor={editor} editable={!view} className="custom" slashMenu={false}>
        <SuggestionMenuController
          triggerCharacter={'/'}
          suggestionMenuComponent={CustomSlashMenu}
          getItems={async (query) =>
            // Gets all default slash menu items and `insertAlert` item.
            filterSuggestionItems([...getDefaultReactSlashMenuItems(editor), insertAlert(editor as any)], query)
          }
        />
      </BlockNoteView>
    </div>
  );
};
